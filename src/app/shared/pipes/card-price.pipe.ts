import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardPrice',
  pure: true,
  standalone: true,
})
export class CardPricePipe implements PipeTransform {
  transform(value: string | number | undefined | null): string {

    if (value === undefined || value === null) {
      return 'N/D';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue) || numValue <= 0) {
      return 'N/D';
    }

    // Format as USD currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numValue);
  }
}
