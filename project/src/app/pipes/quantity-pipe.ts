import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity',
})
export class QuantityPipe implements PipeTransform {
  transform(products: string[]): number {
    return products.length;
  }
}
