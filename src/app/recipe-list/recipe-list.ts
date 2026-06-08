import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);

  protected readonly recipes = this.recipeService.recipes;
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
