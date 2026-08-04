import { Component, input, computed } from '@angular/core';
import { CardPrice } from '../../../../models/card.model';
import { BoxItem } from '../../../../shared/molecules/box-item/box-item';
import { CardPricePipe } from '../../../../shared/pipes/card-price.pipe';

@Component({
  selector: 'app-market-prices',
  imports: [BoxItem, CardPricePipe],
  template: `
    <div class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 mt-4">
      <app-box-item title="Cardmarket" [text]="prices().cardmarket_price | cardPrice" />
      <app-box-item title="TCGPlayer" [text]="prices().tcgplayer_price | cardPrice" />
      <app-box-item title="eBay" [text]="prices().ebay_price | cardPrice" />
      <app-box-item title="Amazon" [text]="prices().amazon_price | cardPrice" />
    </div>
  `,
})
export class MarketPricesComponent {
  readonly cardPrice = input<CardPrice | undefined>(undefined);

  readonly prices = computed<CardPrice>(() => {
    return this.cardPrice() || {
      cardmarket_price: '0.00',
      tcgplayer_price: '0.00',
      ebay_price: '0.00',
      amazon_price: '0.00',
      coolstuffinc_price: '0.00',
    };
  });
}
