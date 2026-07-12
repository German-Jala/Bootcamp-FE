import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

export interface Card {
  id: number;
  name: string;
  type: string;
  frameType?: string;
  desc: string;
  atk?: number;
  def?: number;
  level?: number;
  race?: string;
  attribute?: string;
  archetype?: string;
  card_images: CardImage[];
  card_prices: CardPrice[];
}

export interface ApiResponse {
  data: Card[];
  meta?: {
    current_rows: number;
    total_rows?: number;
    next_page?: string;
    next_page_offset?: number;
  };
}

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
  readonly selectedCard = signal<Card | null>(null);

  // Pagination state computed properties
  readonly hasNextPage = computed(() => {
    // If we loaded less cards than the limit, we reached the end of results
    return this.cards().length === this.limit();
  });

  readonly hasPrevPage = computed(() => {
    return this.offset() > 0;
  });

  readonly currentPage = computed(() => {
    return Math.floor(this.offset() / this.limit()) + 1;
  });

  constructor() {
    // Load initial cards
    this.loadCards();
  }

  selectCard(card: Card | null): void {
    this.selectedCard.set(card);
  }

  search(term: string): void {
    this.searchTerm.set(term);
    this.offset.set(0); // Reset page on new search
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
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          this.cards.set(response.data || []);
        },
        error: (err) => {
          // YGOPRODeck API returns 400 when no cards match the filter/search term
          if (err.status === 400 || (err.error && err.error.error === 'No card matching your query was found in the database.')) {
            this.cards.set([]);
          } else {
            this.error.set('Ocurrió un error al obtener las cartas. Inténtalo de nuevo.');
            this.cards.set([]);
          }
        },
      });
  }
}
