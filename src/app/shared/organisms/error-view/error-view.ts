import { Component, input, output } from '@angular/core';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-error-view',
  imports: [Button],
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
