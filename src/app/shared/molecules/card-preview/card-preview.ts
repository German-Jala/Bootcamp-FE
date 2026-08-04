import { Component, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../models/card.model';
import { BadgeComponent } from '../../atoms/badge/badge';
import { HighlightCardDirective } from '../../directives/highlight-card.directive';
import { CardPricePipe } from '../../pipes/card-price.pipe';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-card-preview',
  imports: [BadgeComponent, RouterLink, HighlightCardDirective, CardPricePipe],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreviewComponent {
  readonly cardService = inject(CardService);
  readonly card = input.required<Card>();

  // Step 5: Signal for focus state
  readonly isFocused = computed(() => this.cardService.focusedCard()?.id === this.card().id);

  getSuperType(): 'MONSTER' | 'SPELL' | 'TRAP' {
    const t = this.card().type.toLowerCase();
    if (t.includes('spell')) return 'SPELL';
    if (t.includes('trap')) return 'TRAP';
    return 'MONSTER';
  }

  getBadgeType(): 'monster' | 'spell' | 'trap' {
    const superType = this.getSuperType();
    if (superType === 'SPELL') return 'spell';
    if (superType === 'TRAP') return 'trap';
    return 'monster';
  }
  // Step 5: Click handler to toggle focused card
  onFocusClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.isFocused()) {
      this.cardService.clearFocusedCard();
    } else {
      this.cardService.setFocusedCard(this.card());
    }
  }
}

