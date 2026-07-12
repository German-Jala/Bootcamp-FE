import { Component, inject } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [],
  template: `
    <div class="grid-container">
      <!-- Loading Skeleton State -->
      @if (cardService.loading()) {
        <div class="cards-grid">
          @for (item of skeletonCount; track $index) {
            <div class="card-skeleton">
              <div class="skeleton-image"></div>
              <div class="skeleton-text title"></div>
              <div class="skeleton-text subtitle"></div>
            </div>
          }
        </div>
      } @else if (cardService.error()) {
        <!-- Error State -->
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <h3>¡Ups! Algo salió mal</h3>
          <p>{{ cardService.error() }}</p>
          <button class="btn-retry" (click)="cardService.loadCards()">Intentar de nuevo</button>
        </div>
      } @else if (cardService.cards().length === 0) {
        <!-- Empty State -->
        <div class="empty-container">
          <div class="empty-icon">🃏</div>
          <h3>No se encontraron cartas</h3>
          <p>No pudimos encontrar cartas que coincidan con "{{ cardService.searchTerm() }}". Intenta con otro término de búsqueda.</p>
        </div>
      } @else {
        <!-- Cards Grid -->
        <div class="cards-grid">
          @for (card of cardService.cards(); track card.id) {
            <div class="card-item" (click)="cardService.selectCard(card)">
              <div class="card-image-wrapper">
                @if (card.card_images && card.card_images[0]) {
                  <img
                    [src]="card.card_images[0].image_url_small"
                    [alt]="card.name"
                    loading="lazy"
                    class="card-img"
                  />
                } @else {
                  <div class="card-no-img">No Image Available</div>
                }
                <!-- Subtle type badge over image -->
                <span class="card-type-badge" [attr.data-type]="getSuperType(card.type)">
                  {{ getSuperType(card.type) }}
                </span>
              </div>
              <div class="card-info">
                <h4 class="card-title">{{ card.name }}</h4>
                <p class="card-subtitle">{{ card.type }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button
            class="btn-page"
            [disabled]="!cardService.hasPrevPage() || cardService.loading()"
            (click)="cardService.prevPage()"
          >
            ← Anterior
          </button>
          <span class="page-info">
            Página <strong>{{ cardService.currentPage() }}</strong>
          </span>
          <button
            class="btn-page"
            [disabled]="!cardService.hasNextPage() || cardService.loading()"
            (click)="cardService.nextPage()"
          >
            Siguiente →
          </button>
        </div>
      }
    </div>
  `,
  styleUrl: './card-grid.css',
})
export class CardGridComponent {
  readonly cardService = inject(CardService);
  readonly skeletonCount = Array(12).fill(0);

  getSuperType(type: string): 'MONSTER' | 'SPELL' | 'TRAP' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'SPELL';
    if (t.includes('trap')) return 'TRAP';
    return 'MONSTER';
  }
}
