import { Component, input } from '@angular/core';
import { CardPrice } from '../../../../models/card.model';
import { BoxItem } from "../../../../shared/molecules/box-item/box-item";

@Component({
  selector: 'app-prices-section',
  imports: [BoxItem],
  templateUrl: './prices-section.html',
  styleUrl: './prices-section.css',
})
export class PricesSection {
  prices = input.required<CardPrice>();
}
