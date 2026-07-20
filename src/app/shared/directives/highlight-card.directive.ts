import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';
import { Card } from '../../models/card.model';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly card = input.required<Card>({ alias: 'appHighlightCard' });
  readonly atkThreshold = input<number>(2500);

  ngOnInit(): void {
    if (this.shouldHighlight()) {
      this.applyHighlight();
    }
  }

  private shouldHighlight(): boolean {
    const cardData = this.card();
    if (!cardData) return false;

    // Highlight monsters with ATK >= threshold
    if (cardData.atk !== undefined && cardData.atk >= this.atkThreshold()) {
      return true;
    }

    return false;
  }

  private applyHighlight(): void {
    // Add golden border and box-shadow glow
    this.renderer.setStyle(this.el.nativeElement, 'border-color', 'rgba(234, 179, 8, 0.6)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 0 15px rgba(234, 179, 8, 0.4), inset 0 0 10px rgba(234, 179, 8, 0.15)'
    );
  }
}
