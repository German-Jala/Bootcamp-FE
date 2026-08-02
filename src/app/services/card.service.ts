import { signal, computed, inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, of } from 'rxjs';
import { Card, ApiResponse } from '../models/card.model';

@Service()
export class CardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  readonly searchTerm = signal<string>('');
  readonly offset = signal<number>(0);
  readonly limit = signal<number>(20);

  // Step 2: Use rxResource for reactive requests
  readonly cardsResource = rxResource<
    Card[],
    { limit: number; offset: number; searchTerm: string }
  >({
    params: () => ({
      limit: this.limit(),
      offset: this.offset(),
      searchTerm: this.searchTerm(),
    }),
    stream: ({ params }) => {
      let paramsMap = new HttpParams()
        .set('num', params.limit.toString())
        .set('offset', params.offset.toString());

      const term = params.searchTerm.trim();
      if (term) {
        paramsMap = paramsMap.set('fname', term);
      }

      return this.http.get<ApiResponse>(this.apiUrl, { params: paramsMap }).pipe(
        map((response) => response.data || [])
      );
    },
  });

  // Step 2: Use at least RxSource and its derived computed properties
  readonly cards = computed<Card[]>(() => this.cardsResource.value() || []);
  readonly loading = computed(() => this.cardsResource.isLoading());
  readonly error = computed(() => {
    const errObj = this.cardsResource.error();
    if (!errObj) return null;
    return errObj instanceof Error ? errObj.message : String('Ups! Algo salio mal, intentalo mas tarde');
  });

  readonly hasNextPage = computed(() => this.cards().length === this.limit());
  readonly hasPrevPage = computed(() => this.offset() > 0);
  readonly currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);

  search(term: string): void {
    this.searchTerm.set(term);
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
    const cachedCard = this.cards().find(c => c.id.toString() === id);
    if (cachedCard) {
      return of(cachedCard);
    }

    const params = new HttpParams().set('id', id);
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map(response => response.data?.[0] || null)
    );
  }
}
