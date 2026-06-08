import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../recipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  // public readonly recipe = input.required<RecipeModel>();
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly recipeService = inject(Recipe);

  readonly recipe = signal<RecipeModel | null>(null);

  protected readonly servings = signal<number>(4);
  protected readonly adjustedIngredients = computed(() => {
    const ingredients = this.recipe()?.ingredients;
    if (!ingredients) return [];

    return ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        quantity: ingredient.quantity * this.servings(),
        unit: ingredient.unit
      };
    });
  });

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      const foundRecipe = this.recipeService.recipes().find(recipe => recipe.id == id) || null;
      this.recipe.set(foundRecipe);
    }
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
