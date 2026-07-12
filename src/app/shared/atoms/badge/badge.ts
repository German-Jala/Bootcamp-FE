import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class BadgeComponent {
  readonly type = input<'default' | 'monster' | 'spell' | 'trap' | 'gold'>('default');

  readonly badgeClass = computed(() => {
    switch (this.type()) {
      case 'monster':
        return 'bg-orange-300/70 text-gray-800/80 border-orange-500/70';
      case 'spell':
        return 'bg-teal-300/70 text-gray-800/80 border-teal-500/70';
      case 'trap':
        return 'bg-pink-300/70 text-gray-800/80 border-pink-500/70';
      case 'gold':
        return 'bg-yellow-300/70 text-yellow-700 border-yellow-500/70';
      default:
        return 'bg-white/5 text-gray-300 border-white/10';
    }
  });
}
