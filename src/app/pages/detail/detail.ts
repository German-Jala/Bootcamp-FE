import { Component, input, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { SpinnerComponent } from '../../shared/atoms/spinner/spinner';
import { BadgeComponent } from '../../shared/atoms/badge/badge';
import { TabsComponent, TabItem } from '../../shared/molecules/tabs/tabs';
import { StatsSection } from './components/stats-section/stats-section';
import { Button } from "../../shared/atoms/button/button";
import { EmptyResultsView } from "../../shared/organisms/empty-results-view/empty-results-view";
import { EffectSection } from "./components/effect-section/effect-section";
import { PricesSection } from "./components/prices-section/prices-section";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  imports: [SpinnerComponent, BadgeComponent, TabsComponent, StatsSection, Button, EmptyResultsView, EffectSection, PricesSection],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailPage {
  private readonly router = inject(Router);
  private readonly cardService = inject(CardService);

  readonly id = input.required<string>();

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly tabs: TabItem[] = [
    { id: 'effect', label: 'Efecto' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'prices', label: 'Precios' },
  ];
  readonly activeTab = signal<string>('effect');

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
