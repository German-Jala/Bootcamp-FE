import { Component, input, numberAttribute, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <h2>{{ title() }}</h2>

    <p>Counter value: {{ count() }}</p>
    <p>Step: {{ step() }}</p>

    <button (click)="decrease()">-</button>

    <span>{{ count() }}</span>

    <button (click)="increase()">+</button>
  `,
})
export class Counter {
  title = input.required<string>();

  count = input<number>(0);

  step = input(1, { transform: numberAttribute });

  countChange = output<number>();

  increase() {
    const newValue = this.count() + this.step();

    this.countChange.emit(newValue);
  }

  decrease() {
    const newValue = this.count() - this.step();

    this.countChange.emit(newValue);
  }
}
