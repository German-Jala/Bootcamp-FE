import { Component, input, output, OnInit, viewChild, ElementRef, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpinnerComponent } from '../../atoms/spinner/spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-box',
  imports: [SpinnerComponent],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  readonly destroyRef = inject(DestroyRef);
  readonly placeholder = input<string>('Escribe para buscar...');
  readonly loading = input<boolean>(false);
  readonly showResultsInfo = input<boolean>(true);
  readonly autofocus = input<boolean>(true);

  readonly value = input<string>('');
  readonly searchSubmit = output<string>();

  readonly searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private readonly inputSubject = new Subject<string>();
  private inputSubscription?: Subscription;

  ngOnInit(): void {
    this.inputSubscription = this.inputSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((val) => {
        this.searchSubmit.emit(val);
      });
  }

  ngAfterViewInit(): void {
    if (this.autofocus()) {
      setTimeout(() => {
        this.searchInputElement()?.nativeElement.focus();
      }, 100);
    }
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputSubject.next(val);
  }

  clear(): void {
    const input = this.searchInputElement()?.nativeElement;
    if (input) {
      input.value = '';
    }
    this.inputSubject.next('');
    this.searchSubmit.emit('');
    input?.focus();
  }
}
