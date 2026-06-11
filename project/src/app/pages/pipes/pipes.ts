import { Component, signal } from '@angular/core';
import { Product } from '../../models/product';
import { TruncatePipe } from "../../pipes/truncate-pipe";
import { SlicePipe } from '@angular/common';
import { QuantityPipe } from '../../pipes/quantity-pipe';
import { productList } from '../../mocks/productList';

@Component({
  selector: 'app-pipes',
  imports: [TruncatePipe, SlicePipe, QuantityPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class Pipes {
  products = signal<Product[]>([...productList]);
}
