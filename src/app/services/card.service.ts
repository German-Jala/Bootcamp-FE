import { signal, computed, inject, Service, linkedSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, Observable, of } from 'rxjs';
import { Card, ApiResponse, FocusedCardState } from '../models/card.model';

@Service()
export class CardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  readonly offset = signal<number>(0);
  readonly limit = signal<number>(20);

  // Step 3: RxJS & Signals Interoperability: toObservable -> debounceTime + distinctUntilChanged -> toSignal
  readonly searchTermInput = signal<string>('');
  private readonly debouncedSearch$ = toObservable(this.searchTermInput).pipe(
    debounceTime(350),
    distinctUntilChanged()
  );
  readonly searchTerm = toSignal(this.debouncedSearch$, { initialValue: '' });

  // Step 4: Multi-criteria filter signals
  readonly selectedType = signal<string>('');

  // Step 4: linkedSignal for editable derived state (resets attribute if type is Spell or Trap, but remains user writable)
  readonly selectedAttribute = linkedSignal<string, string>({
    source: this.selectedType,
    computation: (type, previous) => {
      if (type.includes('Spell') || type.includes('Trap')) {
        return '';
      }
      return previous?.value ?? '';
    },
  });

  readonly selectedRace = signal<string>('');

  // Step 2 & Step 4: rxResource combining multi-criteria search parameters into a single source of truth
  readonly cardsResource = rxResource<
    Card[],
    { limit: number; offset: number; searchTerm: string; type: string; attribute: string; race: string }
  >({
    params: () => ({
      limit: this.limit(),
      offset: this.offset(),
      searchTerm: this.searchTerm(),
      type: this.selectedType(),
      attribute: this.selectedAttribute(),
      race: this.selectedRace(),
    }),
    stream: ({ params }) => {
      let paramsMap = new HttpParams()
        .set('num', params.limit.toString())
        .set('offset', params.offset.toString());

      const term = params.searchTerm.trim();
      if (term) {
        paramsMap = paramsMap.set('fname', term);
      }
      if (params.type) {
        paramsMap = paramsMap.set('type', params.type);
      }
      if (params.attribute) {
        paramsMap = paramsMap.set('attribute', params.attribute);
      }
      if (params.race) {
        paramsMap = paramsMap.set('race', params.race);
      }

      return this.http.get<ApiResponse>(this.apiUrl, { params: paramsMap }).pipe(
        map((response) => response.data || [])
      );
    },
  });

  // Step 5: Linked Signal
  readonly focusedCardState = linkedSignal<Card[] | undefined, FocusedCardState | null>({
    source: () => this.cardsResource.value(),
    computation: (_cards, previous) => {
      if (previous && previous.value !== undefined) {
        return previous.value;
      }
      // By default, no card is focused until explicitly selected by the user
      return null;
    },
  });

  readonly focusedCard = computed<Card | null>(() => this.focusedCardState()?.card ?? null);
  readonly isFocusedCandidate = computed<boolean>(() => this.focusedCardState()?.isCandidate ?? false);
  readonly focusedNotes = computed<string>(() => this.focusedCardState()?.notes ?? '');

  // Step 5: Set focused card (when user clicks on a card)
  setFocusedCard(card: Card): void {
    this.focusedCardState.update((prev) => {
      if (prev && prev.card.id === card.id) {
        return prev;
      }
      return { card, isCandidate: false, notes: '' };
    });
  }

  // Step 5: Toggle focused card (when user clicks on the focus button)
  toggleFocusedCandidate(): void {
    this.focusedCardState.update((prev) => {
      if (!prev) return null;
      return { ...prev, isCandidate: !prev.isCandidate };
    });
  }

  // Step 5: Update focused card notes (when user writes notes in the focused card)
  updateFocusedNotes(notes: string): void {
    this.focusedCardState.update((prev) => {
      if (!prev) return null;
      return { ...prev, notes };
    });
  }

  // Step 5: Clear focused card (when user clicks the clear button)
  clearFocusedCard(): void {
    this.focusedCardState.set(null);
  }

  readonly cards = computed<Card[]>(() => this.cardsResource.value() || []);
  readonly loading = computed(() => this.cardsResource.isLoading());
  readonly error = computed(() => {
    const errObj = this.cardsResource.error();
    if (!errObj) return null;
    return errObj instanceof Error ? errObj.message : String('Ups! Algo salió mal, inténtalo más tarde');
  });

  readonly hasNextPage = computed(() => this.cards().length === this.limit());
  readonly hasPrevPage = computed(() => this.offset() > 0);
  readonly currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);

  readonly hasActiveFilters = computed(() => {
    return !!(this.searchTerm() || this.selectedType() || this.selectedAttribute() || this.selectedRace());
  });

  readonly activeFiltersSummary = computed(() => {
    const parts: string[] = [];
    if (this.searchTerm()) parts.push(`Nombre: "${this.searchTerm()}"`);
    if (this.selectedType()) parts.push(`Tipo: "${this.selectedType()}"`);
    if (this.selectedAttribute()) parts.push(`Atributo: "${this.selectedAttribute()}"`);
    if (this.selectedRace()) parts.push(`Clasificación: "${this.selectedRace()}"`);
    return parts.length > 0 ? parts.join(' • ') : '';
  });

  search(term: string): void {
    this.searchTermInput.set(term);
    this.offset.set(0);
  }

  // Step 4: Signals Variables
  setType(type: string): void {
    this.selectedType.set(type);
    this.offset.set(0);
  }

  setAttribute(attribute: string): void {
    this.selectedAttribute.set(attribute);
    this.offset.set(0);
  }

  setRace(race: string): void {
    this.selectedRace.set(race);
    this.offset.set(0);
  }
  // -------------

  resetFilters(): void {
    this.searchTermInput.set('');
    this.selectedType.set('');
    this.selectedAttribute.set('');
    this.selectedRace.set('');
    this.offset.set(0);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.offset.update((prev) => prev + this.limit());
    }
  }

  prevPage(): void {
    if (this.hasPrevPage()) {
      this.offset.update((prev) => Math.max(0, prev - this.limit()));
    }
  }

  loadCards(): void {
    this.cardsResource.reload();
  }

  getCardById(id: string): Observable<Card | null> {
    const cachedCard = this.cards().find((c) => c.id.toString() === id);
    if (cachedCard) {
      return of(cachedCard);
    }

    const params = new HttpParams().set('id', id);
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map((response) => response.data?.[0] || null)
    );
  }
}

