import { Component, input, output, model } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  template: `
    <div class="tabs-container">
      <div class="tabs-list" role="tablist">
        @for (tab of tabs(); track tab.id) {
          <button
            type="button"
            class="tab-trigger"
            [class.active]="activeTabId() === tab.id"
            (click)="selectTab(tab.id)"
            role="tab"
            [attr.aria-selected]="activeTabId() === tab.id"
            [attr.aria-controls]="'tab-panel-' + tab.id"
            [id]="'tab-' + tab.id"
          >
            {{ tab.label }}
            @if (activeTabId() === tab.id) {
              <span class="active-indicator"></span>
            }
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    .tabs-container {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1.5rem;
      width: 100%;
    }

    .tabs-list {
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .tabs-list::-webkit-scrollbar {
      display: none;
    }

    .tab-trigger {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
      font-weight: 500;
      padding: 0.75rem 0.25rem 1rem 0.25rem;
      cursor: pointer;
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
      outline: none;
    }

    .tab-trigger:hover {
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .tab-trigger.active {
      color: #ffd700; /* Yu-Gi-Oh! gold color vibe */
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
    }

    .active-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #ffd700, #ffaa00);
      border-radius: 3px 3px 0 0;
      box-shadow: 0 0 8px rgba(255, 170, 0, 0.6);
      animation: tab-slide 0.25s ease-out;
    }

    @keyframes tab-slide {
      from {
        transform: scaleX(0.7);
        opacity: 0;
      }
      to {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  `,
})
export class TabsComponent {
  // We use model() so it can be two-way bound easily if needed
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
