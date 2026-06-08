import { MOCK_RECIPES } from './mock-recipes';
import { Injectable, signal } from '@angular/core';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  public readonly recipes = signal(MOCK_RECIPES);

  public addRecipe(newRecipe: Omit<RecipeModel, 'id'>) {
    const newRecipeModel: RecipeModel = { ...newRecipe, id: this.recipes().length + 1 };
    this.recipes.update((prevRecipes) => [...prevRecipes, newRecipeModel]);
  };

}
