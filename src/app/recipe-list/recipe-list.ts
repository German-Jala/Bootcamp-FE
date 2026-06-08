import { Component, computed, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  public readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  public readonly currentRecipe = signal<RecipeModel>(this.recipes()[0]);
  public readonly searchTerm = signal<string>('');
  public readonly filteredRecipes = computed(() => {
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
