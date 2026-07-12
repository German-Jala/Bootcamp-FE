import { Component, input } from '@angular/core';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-effect-section',
  imports: [],
  templateUrl: './effect-section.html',
  styleUrl: './effect-section.css',
})
export class EffectSection {
  description = input<string>('');
  archetype = input<string | undefined>(undefined);
}
