import { Component, computed, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly currentRecipe = signal<RecipeModel>(this.recipes()[0]);
  protected readonly servings = signal<number>(4);
  protected readonly adjustedIngredients = computed(() => {
    const ingredients = this.currentRecipe().ingredients;
    return ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        quantity: ingredient.quantity * this.servings(),
        unit: ingredient.unit
      };
    });
  });


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
