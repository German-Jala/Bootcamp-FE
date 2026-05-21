import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [],
})
export class App {
  protected readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly currentRecipe = signal<RecipeModel>(this.recipes()[0]);
  protected readonly servings = signal<number>(4);


  protected logMessage(
    message: string,
  ): void {
    console.log(message);
  }

  protected setRecipe(
    recipe: RecipeModel
  ): void {
    this.currentRecipe.set(recipe);
  }

  protected updateServingQuantity(
    quantity: number
  ): void {
    this.servings.update((value) => {
      const result = value + quantity;
      return result > 0 ? result : 0
    });
  }

}
