import { Component, input, output, viewChild, ElementRef } from '@angular/core';
import { SpinnerComponent } from '../../atoms/spinner/spinner';

@Component({
  selector: 'app-search-box',
  imports: [SpinnerComponent],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBoxComponent {
  readonly placeholder = input<string>('Escribe para buscar...');
  readonly loading = input<boolean>(false);
  readonly showResultsInfo = input<boolean>(true);
  readonly autofocus = input<boolean>(true);

  // Step 3: Catch SearchSubmit
  readonly value = input<string>('');
  readonly searchSubmit = output<string>();
  readonly searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchSubmit.emit(val);
  }

  clear(): void {
    const input = this.searchInputElement()?.nativeElement;
    if (input) {
      input.value = '';
    }
    this.searchSubmit.emit('');
    input?.focus();
  }
}
