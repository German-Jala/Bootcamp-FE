import { Component, computed, inject } from '@angular/core';
import { DetailPage } from '../../detail';
import { BoxItem } from "../../../../shared/molecules/box-item/box-item";

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.css',
  imports: [BoxItem],
})
export class StatsSection {
  private readonly detailPage = inject(DetailPage);
  readonly card = computed(() => this.detailPage.card());

  readonly type = computed(() => this.card()?.type || '');
  readonly race = computed(() => this.card()?.race || '');
  readonly atk = computed(() => this.card()?.atk);
  readonly def = computed(() => this.card()?.def);
  readonly level = computed(() => this.card()?.level);

  readonly isMonster = computed(() => {
    const t = this.type().toLowerCase();
    return !t.includes('spell') && !t.includes('trap');
  });
}
