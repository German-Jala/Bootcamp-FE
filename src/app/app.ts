import { Component, inject, OnInit, OnDestroy, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CardService } from './services/card.service';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardGridComponent, CardDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  readonly cardService = inject(CardService);
  
  // Template Reference to the search input for auto-focus
  searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  // Input debouncing using RxJS Subject
  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.cardService.search(term);
      });
  }

  ngAfterViewInit(): void {
    // Focus search input immediately on load (HU-02)
    setTimeout(() => {
      this.searchInputElement()?.nativeElement.focus();
    }, 100);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    const input = this.searchInputElement()?.nativeElement;
    if (input) {
      input.value = '';
      this.cardService.search('');
      input.focus();
    }
  }
}
