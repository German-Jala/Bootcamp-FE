import { Component, input } from '@angular/core';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  card = input<Card>();
}
