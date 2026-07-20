import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../models/card.model';
import { BadgeComponent } from '../../atoms/badge/badge';

@Component({
  selector: 'app-card-preview',
  imports: [BadgeComponent, RouterLink],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreviewComponent {
  readonly card = input.required<Card>();

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
}
