import { Component, computed, inject } from '@angular/core';
import { CardService } from '../../services/card.service';
import { SearchBoxComponent } from '../../shared/organisms/search-box/search-box';
import { CardPreviewComponent } from '../../shared/molecules/card-preview/card-preview';
import { SkeletonCard } from "../../shared/molecules/skeleton-card/skeleton-card";
import { ErrorView } from "../../shared/organisms/error-view/error-view";
import { EmptyResultsView } from '../../shared/organisms/empty-results-view/empty-results-view';
import { Button } from "../../shared/atoms/button/button";

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [SearchBoxComponent, CardPreviewComponent, SkeletonCard, ErrorView, EmptyResultsView, Button],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogPage {
  readonly cardService = inject(CardService);
  readonly skeletonCount = Array(12).fill(0);

  readonly emptyResultsDescription = computed(() => `No pudimos encontrar cartas que coincidan con "${this.cardService.searchTerm()}". Intenta con otro término de búsqueda.`);

  onSearch(term: string): void {
    this.cardService.search(term);
  }
}
