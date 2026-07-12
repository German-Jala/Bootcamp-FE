import { Component, inject, signal } from '@angular/core';
import { CardService } from '../../services/card.service';
import { TabsComponent, TabItem } from '../tabs/tabs.component';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [TabsComponent],
  template: `
    @if (cardService.selectedCard(); as card) {
      <div class="detail-container">
        <!-- Back button -->
        <button class="btn-back" (click)="cardService.selectCard(null)">
          ← Volver al catálogo
        </button>

        <div class="detail-content-layout">
          <!-- Card Image Section -->
          <div class="card-display-panel">
            <div class="card-image-outer">
              @if (card.card_images && card.card_images[0]) {
                <img
                  [src]="card.card_images[0].image_url"
                  [alt]="card.name"
                  class="card-large-img"
                />
              } @else {
                <div class="no-img">No disponible</div>
              }
            </div>
          </div>

          <!-- Card Details and Tabs Section -->
          <div class="card-info-panel">
            <div class="card-header-info">
              <h2 class="card-name">{{ card.name }}</h2>
              <div class="badges-row">
                <span class="badge type-badge" [attr.data-type]="getSuperType(card.type)">
                  {{ card.type }}
                </span>
                @if (card.attribute) {
                  <span class="badge attribute-badge">
                    {{ card.attribute }}
                  </span>
                }
                @if (card.race) {
                  <span class="badge race-badge">
                    {{ card.race }}
                  </span>
                }
              </div>
            </div>

            <!-- Reusable Tabs Component -->
            <app-tabs
              [tabs]="detailTabs"
              [(activeTabId)]="activeTab"
            />

            <!-- Tab Panels Content -->
            <div class="tab-panel-content" id="tab-panel-{{ activeTab() }}">
              <!-- Effect/Description Tab -->
              @if (activeTab() === 'effect') {
                <div class="panel-section fade-in">
                  <h3 class="section-title">Efecto / Descripción</h3>
                  <p class="card-desc">{{ card.desc }}</p>
                  @if (card.archetype) {
                    <div class="archetype-info">
                      <span class="info-label">Arquetipo:</span>
                      <span class="info-val">{{ card.archetype }}</span>
                    </div>
                  }
                </div>
              }

              <!-- Statistics Tab -->
              @if (activeTab() === 'stats') {
                <div class="panel-section fade-in">
                  <h3 class="section-title">Estadísticas de Combate</h3>
                  @if (getSuperType(card.type) === 'MONSTER') {
                    <div class="stats-grid">
                      <div class="stat-card">
                        <span class="stat-label">ATK</span>
                        <span class="stat-value atk">{{ card.atk !== undefined ? card.atk : '?' }}</span>
                      </div>
                      <div class="stat-card">
                        <span class="stat-label">DEF</span>
                        <span class="stat-value def">{{ card.def !== undefined ? card.def : '?' }}</span>
                      </div>
                      @if (card.level !== undefined) {
                        <div class="stat-card full-width">
                          <span class="stat-label">Nivel / Rango</span>
                          <span class="stat-value stars">
                            {{ card.level }} 🌟
                          </span>
                        </div>
                      }
                    </div>
                  } @else {
                    <div class="no-stats-fallback">
                      <p>Las cartas de tipo <strong>{{ getSuperType(card.type) }}</strong> no poseen estadísticas de ataque o defensa.</p>
                      <div class="stats-list-fallback">
                        <div class="fallback-item">
                          <span>Tipo de Carta:</span>
                          <strong>{{ card.type }}</strong>
                        </div>
                        @if (card.race) {
                          <div class="fallback-item">
                            <span>Clasificación:</span>
                            <strong>{{ card.race }}</strong>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- Prices Tab -->
              @if (activeTab() === 'prices') {
                <div class="panel-section fade-in">
                  <h3 class="section-title">Precios de Referencia</h3>
                  @if (card.card_prices && card.card_prices[0]) {
                    @let prices = card.card_prices[0];
                    <div class="prices-grid">
                      <div class="price-item cardmarket">
                        <span class="store-name">Cardmarket</span>
                        <span class="price-val">$ {{ prices.cardmarket_price }}</span>
                      </div>
                      <div class="price-item tcgplayer">
                        <span class="store-name">TCGPlayer</span>
                        <span class="price-val">$ {{ prices.tcgplayer_price }}</span>
                      </div>
                      <div class="price-item ebay">
                        <span class="store-name">eBay</span>
                        <span class="price-val">$ {{ prices.ebay_price }}</span>
                      </div>
                      <div class="price-item amazon">
                        <span class="store-name">Amazon</span>
                        <span class="price-val">$ {{ prices.amazon_price }}</span>
                      </div>
                    </div>
                  } @else {
                    <p class="no-prices">No hay datos de precios disponibles para esta carta.</p>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './card-detail.css',
})
export class CardDetailComponent {
  readonly cardService = inject(CardService);

  readonly detailTabs: TabItem[] = [
    { id: 'effect', label: 'Efecto' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'prices', label: 'Precios' },
  ];

  readonly activeTab = signal<string>('effect');

  getSuperType(type: string): 'MONSTER' | 'SPELL' | 'TRAP' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'SPELL';
    if (t.includes('trap')) return 'TRAP';
    return 'MONSTER';
  }
}
