import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardService } from '../../../services/card.service';
import { AtkDefPipe } from '../../pipes/atk-def.pipe';
import { CardPricePipe } from '../../pipes/card-price.pipe';
import { BadgeComponent } from '../../atoms/badge/badge';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-focused-card-banner',
  imports: [RouterLink, AtkDefPipe, CardPricePipe, BadgeComponent, Button],
  templateUrl: './focused-card-banner.html',
  styleUrl: './focused-card-banner.css',
})
export class FocusedCardBannerComponent {
  readonly cardService = inject(CardService);

  getBadgeType(type: string = ''): 'monster' | 'spell' | 'trap' {
    const t = type.toLowerCase();
    if (t.includes('spell')) return 'spell';
    if (t.includes('trap')) return 'trap';
    return 'monster';
  }

  onNotesInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardService.updateFocusedNotes(input.value);
  }
}

