import { Component, computed, input } from '@angular/core';

type VariantCard = 'little-green' | 'big-main';

interface VariantStyles {
  containerClasses: string;
  titleClasses: string;
  textClasses: string;
}

const commonContainerClasses = 'bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col items-center gap-1.5 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-[2px]';

const variantCard: Record<VariantCard, VariantStyles> = {
  'little-green': {
    containerClasses: commonContainerClasses,
    titleClasses: 'text-white/50 font-medium text-[10px]',
    textClasses: 'text-base font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.2)]',
  },
  'big-main': {
    containerClasses: commonContainerClasses,
    titleClasses: 'text-white/50 font-medium text-[12px]',
    textClasses: 'text-2xl font-bold text-blue-450 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]',
  },
} as const;

@Component({
  selector: 'app-box-item',
  imports: [],
  templateUrl: './box-item.html',
  styleUrl: './box-item.css',
})
export class BoxItem {
  readonly title = input<string>();
  readonly text = input<string>();
  readonly variant = input<VariantCard>('little-green');

  readonly containerAdditionalClasses = input<string>('');
  readonly titleAdditionalClasses = input<string>('');
  readonly textAdditionalClasses = input<string>('');

  readonly styles = computed(() => {
    const base = variantCard[this.variant()];

    return {
      container: `${base.containerClasses} ${this.containerAdditionalClasses()}`.trim(),
      title: `${base.titleClasses} ${this.titleAdditionalClasses()}`.trim(),
      text: `${base.textClasses} ${this.textAdditionalClasses()}`.trim()
    };
  });
}
