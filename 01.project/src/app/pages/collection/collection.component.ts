import { Component, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CardInfoService } from '../../services/card-info.service';
import { Card } from '../../models/Card';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-collection',
  imports: [AsyncPipe, CardComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent  {
  protected cards$ = new BehaviorSubject<Card[]>([]);

  private cardInfoService = inject(CardInfoService);

  protected apiRespondeObservable = this.cardInfoService.getBanListCards().pipe(
    map(response => response.data),
  ).subscribe({
    next: (newCards) => {
      console.log(newCards)
      this.cards$.next([...this.cards$.getValue(), ...newCards])
    },
  });

}
