import { Component, input, output, model } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class TabsComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly activeTabId = model.required<string>();
  readonly tabChange = output<string>();

  selectTab(id: string): void {
    if (this.activeTabId() !== id) {
      this.activeTabId.set(id);
      this.tabChange.emit(id);
    }
  }
}
