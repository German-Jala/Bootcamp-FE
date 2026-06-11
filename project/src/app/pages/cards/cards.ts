import { Component, signal } from '@angular/core';
import { productList } from '../../mocks/productList';
import { Product } from '../../models/product';
import { Card } from './card/card';

@Component({
  selector: 'app-cards',
  imports: [Card],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  products = signal<Product[]>([...productList]);
}
