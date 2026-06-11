import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { TruncatePipe } from "../../../pipes/truncate-pipe";

@Component({
  selector: 'app-card',
  imports: [TruncatePipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  product = input.required<Product>({ alias: 'setProduct' });

  productTransform = (product: Product) => {
    return product;
  }
}
