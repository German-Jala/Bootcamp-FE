import { Component } from '@angular/core';
import { Instruction } from './instruction/instruction';
import { RecipeList } from './recipe-list/recipe-list';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Instruction, RecipeList],
})
export class App {


}
