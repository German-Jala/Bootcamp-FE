import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../../models/card.model';
import { BadgeComponent } from '../../atoms/badge/badge';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreviewComponent {
  private readonly router = inject(Router);
  readonly card = input.required<Card>();

  navigateDetail(): void {
    this.router.navigate(['/card', this.card().id]);
  }

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
