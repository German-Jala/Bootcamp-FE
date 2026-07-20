import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  disabled = input<boolean>(false);
  type = input<string>('button');
  click = output<void>();

  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit();
  }

}
