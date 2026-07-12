import { Component, input, computed } from '@angular/core';
import { BoxItem } from "../../../../shared/molecules/box-item/box-item";

@Component({
  selector: 'app-stats-section',
  standalone: true,
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.css',
  imports: [BoxItem],
})
export class StatsSection {
  readonly type = input.required<string>();
  readonly race = input<string>('');
  readonly atk = input<number>();
  readonly def = input<number>();
  readonly level = input<number>();

  readonly isMonster = computed(() => {
    const t = this.type().toLowerCase();
    return !t.includes('spell') && !t.includes('trap');
  });
}
