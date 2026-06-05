import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Card } from '../../models/Card';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-zone',
  imports: [CommonModule, CardComponent],
  templateUrl: './card-zone.component.html',
  styleUrl: './card-zone.component.scss'
})
export class CardZoneComponent {
  icon = input.required<string>;
  name = input.required<string>();
  card = input<Card | undefined>();

  isThereBorder = input<boolean>(true);
  isThereInternalFullWidth = input<boolean>(false);
}
