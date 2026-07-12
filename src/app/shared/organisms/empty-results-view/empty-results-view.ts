import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-results-view',
  imports: [],
  templateUrl: './empty-results-view.html',
  styleUrl: './empty-results-view.css',
})
export class EmptyResultsView {
  readonly title = input<string>('');
  readonly description = input<string>('');
}
