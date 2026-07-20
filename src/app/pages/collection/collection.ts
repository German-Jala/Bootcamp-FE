import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CardPreviewComponent } from '../../shared/molecules/card-preview/card-preview';
import { EmptyResultsView } from '../../shared/organisms/empty-results-view/empty-results-view';

@Component({
  selector: 'app-collection-page',
  imports: [CardPreviewComponent, EmptyResultsView],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class CollectionPage {
  readonly profileService = inject(ProfileService);
}
