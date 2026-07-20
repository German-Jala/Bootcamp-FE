import { Component, computed, inject } from '@angular/core';
import { DetailPage } from '../../detail';
import { CardPrice } from '../../../../models/card.model';
import { BoxItem } from "../../../../shared/molecules/box-item/box-item";

@Component({
  selector: 'app-prices-section',
  imports: [BoxItem],
  templateUrl: './prices-section.html',
  styleUrl: './prices-section.css',
})
export class PricesSection {
  private readonly detailPage = inject(DetailPage);

  readonly prices = computed<CardPrice>(() => {
    return this.detailPage.card()?.card_prices?.[0] || {
      cardmarket_price: '0.00',
      tcgplayer_price: '0.00',
      ebay_price: '0.00',
      amazon_price: '0.00',
      coolstuffinc_price: '0.00',
    };
  });
}
