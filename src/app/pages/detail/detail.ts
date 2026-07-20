import { Component, input, inject, signal, DestroyRef } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CardService } from '../../services/card.service';
import { ProfileService } from '../../services/profile.service';
import { SpinnerComponent } from '../../shared/atoms/spinner/spinner';
import { BadgeComponent } from '../../shared/atoms/badge/badge';
import { TabsComponent, TabItem } from '../../shared/molecules/tabs/tabs';
import { Button } from "../../shared/atoms/button/button";
import { EmptyResultsView } from "../../shared/organisms/empty-results-view/empty-results-view";
import { toObservable, toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap, filter } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  imports: [SpinnerComponent, BadgeComponent, TabsComponent, Button, EmptyResultsView, RouterLink, RouterOutlet],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailPage {
  private readonly cardService = inject(CardService);
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

  readonly id = input.required<string>();

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

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
    this.router.navigate(['/card', this.id(), tabId]);
  }

  readonly card = toSignal(
    toObservable(this.id).pipe(
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap((cardId) =>
        this.cardService.getCardById(cardId).pipe(
          tap((cardData) => {
            this.loading.set(false);
            if (!cardData) {
              this.error.set('La carta no existe en la base de datos.');
            }
          }),
          catchError(() => {
            this.loading.set(false);
            this.error.set('Ocurrió un error al cargar los detalles de la carta.');
            return of(null);
          })
        )
      )
    ),
    { initialValue: null }
  );



  getBadgeType(type: string): 'monster' | 'spell' | 'trap' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'spell';
    if (t.includes('trap')) return 'trap';
    return 'monster';
  }
}
