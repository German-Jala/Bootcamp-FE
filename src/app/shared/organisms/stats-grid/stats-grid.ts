import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  templateUrl: './stats-grid.html',
  styleUrl: './stats-grid.css',
})
export class StatsGridComponent {
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
