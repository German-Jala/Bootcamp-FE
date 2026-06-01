import { Component, signal } from '@angular/core';
import { MonsterZoneFieldComponent } from '../monster-zone-field/monster-zone-field.component';
import { CardZoneComponent } from '../card-zone/card-zone.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CardZoneComponent, MonsterZoneFieldComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  player1Background = signal<string>('/wallpapers/yugi.jpg');
  player2Background = signal<string>('/wallpapers/kaiba.jpg');
}
