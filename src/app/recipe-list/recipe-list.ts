import { Component, computed, inject, signal } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);

  protected readonly recipes = signal<RecipeModel[]>(this.recipeService.recipes);
  protected readonly currentRecipe = signal<RecipeModel>(this.recipes()[0]);
  protected readonly searchTerm = signal<string>('');
  protected readonly filteredRecipes = computed(() => {
    return this.recipes().filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
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

}
