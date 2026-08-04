import { Component, input, inject, signal, DestroyRef, computed } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Card } from '../../models/card.model';
import { ProfileService } from '../../services/profile.service';
import { BadgeComponent } from '../../shared/atoms/badge/badge';
import { TabsComponent, TabItem } from '../../shared/molecules/tabs/tabs';
import { Button } from "../../shared/atoms/button/button";
import { EmptyResultsView } from "../../shared/organisms/empty-results-view/empty-results-view";
import { SpinnerComponent } from '../../shared/atoms/spinner/spinner';
import { MarketPricesComponent } from './components/market-prices/market-prices';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  imports: [
    BadgeComponent,
    TabsComponent,
    Button,
    EmptyResultsView,
    SpinnerComponent,
    MarketPricesComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailPage {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly profileService = inject(ProfileService);

  toggleCollection(): void {
    const activeCard = this.card();
    if (!activeCard) return;

    if (this.profileService.isInCollection(activeCard.id)) {
      this.profileService.removeFromCollection(activeCard.id);
    } else {
      this.profileService.addToCollection(activeCard);
    }
  }

  readonly card = input<Card | null>(null);

  readonly error = computed(() => {
    if (!this.card()) {
      return 'La carta no existe en la base de datos o hubo un error al obtener la información.';
    }
    return null;
  });

  readonly tabs: TabItem[] = [
    { id: 'effect', label: 'Efecto' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'prices', label: 'Precios' },
  ];
  readonly activeTab = signal<string>('effect');

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.syncActiveTabWithUrl();
    });

    this.syncActiveTabWithUrl();
  }

  private syncActiveTabWithUrl(): void {
    const url = this.router.url;
    if (url.includes('/stats')) {
      this.activeTab.set('stats');
    } else if (url.includes('/prices')) {
      this.activeTab.set('prices');
    } else {
      this.activeTab.set('effect');
    }
  }

  onTabChange(tabId: string): void {
    const cardId = this.card()?.id;
    if (cardId) {
      this.router.navigate(['/card', cardId, tabId]);
    }
  }



  getBadgeType(type: string): 'monster' | 'spell' | 'trap' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'spell';
    if (t.includes('trap')) return 'trap';
    return 'monster';
  }
}
