import { Component } from '@angular/core';
import { CardZoneComponent } from '../thin-card-zone/thin-card-zone.component';
import { MonsterZoneFieldComponent } from '../monster-zone-field/monster-zone-field.component';

@Component({
  selector: 'app-board',
  imports: [CardZoneComponent, MonsterZoneFieldComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
