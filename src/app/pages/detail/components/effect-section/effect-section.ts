import { Component, computed, inject } from '@angular/core';
import { DetailPage } from '../../detail';

@Component({
  selector: 'app-effect-section',
  imports: [],
  templateUrl: './effect-section.html',
  styleUrl: './effect-section.css',
})
export class EffectSection {
  private readonly detailPage = inject(DetailPage);
  readonly description = computed(() => this.detailPage.card()?.desc || '');
  readonly archetype = computed(() => this.detailPage.card()?.archetype);
}
