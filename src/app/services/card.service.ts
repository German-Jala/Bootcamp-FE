import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, map, Observable, of } from 'rxjs';
import { Card, ApiResponse } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  // State Signals
  readonly cards = signal<Card[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly searchTerm = signal<string>('');
  readonly offset = signal<number>(0);
  readonly limit = signal<number>(20);

  // Pagination computed properties
  readonly hasNextPage = computed(() => this.cards().length === this.limit());
  readonly hasPrevPage = computed(() => this.offset() > 0);
  readonly currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);

  constructor() {
    this.loadCards();
  }

  search(term: string): void {
    this.searchTerm.set(term);
    this.offset.set(0);
    this.loadCards();
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.offset.update((prev) => prev + this.limit());
      this.loadCards();
    }
  }

  prevPage(): void {
    if (this.hasPrevPage()) {
      this.offset.update((prev) => Math.max(0, prev - this.limit()));
      this.loadCards();
    }
  }

  loadCards(): void {
    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .set('num', this.limit().toString())
      .set('offset', this.offset().toString());

    const term = this.searchTerm().trim();
    if (term) {
      params = params.set('fname', term);
    }

    this.http
      .get<ApiResponse>(this.apiUrl, { params })
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.cards.set(response.data || []);
        },
        error: (err) => {
          if (err.status === 400 || (err.error && err.error.error === 'No card matching your query was found in the database.')) {
            this.cards.set([]);
          } else {
            this.error.set('Ocurrió un error al obtener las cartas. Inténtalo de nuevo.');
            this.cards.set([]);
          }
        },
      });
  }

  /**
   * Fetches a card by its ID from the API.
   * Can look at local cache (cards signal) first to avoid API call,
   * or perform HTTP request if not present.
   */
  getCardById(id: string): Observable<Card | null> {
    // Check if the card is already in the loaded catalog
    const cachedCard = this.cards().find(c => c.id.toString() === id);
    if (cachedCard) {
      return of(cachedCard);
    }

    // Otherwise, fetch it from the API
    const params = new HttpParams().set('id', id);
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map(response => response.data?.[0] || null)
    );
  }
}
