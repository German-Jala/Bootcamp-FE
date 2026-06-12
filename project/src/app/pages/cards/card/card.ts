import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductCard } from '../../../models/productCard';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  product = input.required<ProductCard, Product>({
    alias: 'setProduct',
    transform: this.productTransformToCard,
  });

  productTransformToCard(
    { description, id, image, price, title }: Product
  ): ProductCard {
    return {
      explanation: description,
      id,
      image,
      name: title,
      price: price,
    };
  }

}
