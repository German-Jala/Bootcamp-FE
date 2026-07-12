import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-view',
  imports: [],
  templateUrl: './error-view.html',
  styleUrl: './error-view.css',
})
export class ErrorView {
  readonly errorMessage = input<string>('');
  readonly onRetry = output<void>();

  retry() {
    this.onRetry.emit();
  }
}
