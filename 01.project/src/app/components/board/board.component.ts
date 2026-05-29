import { Component } from '@angular/core';
import { MonsterZoneFieldComponent } from '../monster-zone-field/monster-zone-field.component';
import { CardZoneComponent } from '../card-zone/card-zone.component';

@Component({
  selector: 'app-board',
  imports: [CardZoneComponent, MonsterZoneFieldComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
