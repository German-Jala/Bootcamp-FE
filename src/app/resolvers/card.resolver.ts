import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Card } from '../models/card.model';
import { CardService } from '../services/card.service';
import { catchError, of } from 'rxjs';

export const cardResolver: ResolveFn<Card | null> = (route) => {
  const cardService = inject(CardService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of(null);
  }

  return cardService.getCardById(id).pipe(
    catchError(() => {
      return of(null);
    })
  );
};
