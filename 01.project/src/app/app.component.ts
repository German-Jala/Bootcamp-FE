import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./components/card/card.component";
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '01.project';
}
