import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  public readonly recipe = input.required<RecipeModel>();
  protected readonly servings = signal<number>(4);
  protected readonly adjustedIngredients = computed(() => {
    const ingredients = this.recipe().ingredients;
    return ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        quantity: ingredient.quantity * this.servings(),
        unit: ingredient.unit
      };
    });
  });

  protected updateServingQuantity(
    quantity: number
  ): void {
    this.servings.update((value) => {
      const result = value + quantity;
      return result > 0 ? result : 0
    });
  }
}
