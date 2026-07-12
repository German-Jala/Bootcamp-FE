import { Component, input, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { SpinnerComponent } from '../../shared/atoms/spinner/spinner';
import { BadgeComponent } from '../../shared/atoms/badge/badge';
import { TabsComponent, TabItem } from '../../shared/molecules/tabs/tabs';
import { StatsGridComponent } from '../../shared/organisms/stats-grid/stats-grid';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [SpinnerComponent, BadgeComponent, TabsComponent, StatsGridComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailPage {
  private readonly router = inject(Router);
  private readonly cardService = inject(CardService);

  readonly id = input.required<string>();

  readonly card = signal<Card | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly tabs: TabItem[] = [
    { id: 'effect', label: 'Efecto' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'prices', label: 'Precios' },
  ];
  readonly activeTab = signal<string>('effect');

  constructor() {
    // Automatically load card details when the id signal changes
    effect(() => {
      const cardId = this.id();
      if (cardId) {
        this.loadCard(cardId);
      }
    });
  }

  loadCard(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.card.set(null);

    this.cardService.getCardById(id).subscribe({
      next: (cardData) => {
        if (cardData) {
          this.card.set(cardData);
        } else {
          this.error.set('La carta no existe en la base de datos.');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Ocurrió un error al cargar los detalles de la carta.');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getBadgeType(type: string): 'monster' | 'spell' | 'trap' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'spell';
    if (t.includes('trap')) return 'trap';
    return 'monster';
  }
}
