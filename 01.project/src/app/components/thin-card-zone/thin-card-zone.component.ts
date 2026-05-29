import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-zone',
  imports: [],
  templateUrl: './thin-card-zone.component.html',
  styleUrl: './thin-card-zone.component.scss'
})
export class CardZoneComponent {
  icon = input.required<string>;
  name = input.required<string>();
}
