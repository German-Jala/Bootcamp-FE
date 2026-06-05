import { Component, inject, OnInit, signal } from '@angular/core';
import { MonsterZoneFieldComponent } from '../monster-zone-field/monster-zone-field.component';
import { CardZoneComponent } from '../card-zone/card-zone.component';
import { CommonModule } from '@angular/common';
import { delay, interval, map } from 'rxjs';
import { CardInfoService } from '../../services/card-info.service';

@Component({
  selector: 'app-board',
  imports: [CardZoneComponent, MonsterZoneFieldComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  player1Background = signal<string>('/wallpapers/yugi.jpg');
  player2Background = signal<string>('/wallpapers/kaiba.jpg');
  private cardInfoService = inject(CardInfoService);

  ngOnInit(): void {
  }

  firstCard$ = this.cardInfoService.getCardByName().pipe(map(resp => resp.data[0]));
  secondCard$ = this.cardInfoService.getCardByName().pipe(map(resp => resp.data[0]), delay(5000));
}
