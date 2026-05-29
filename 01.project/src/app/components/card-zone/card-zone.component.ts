import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-zone',
  imports: [CommonModule],
  templateUrl: './card-zone.component.html',
  styleUrl: './card-zone.component.scss'
})
export class CardZoneComponent {
  icon = input.required<string>;
  name = input.required<string>();
  isThereBorder = input<boolean>(true);
  isThereInternalFullWidth = input<boolean>(false);

}
