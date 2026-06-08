import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  public readonly recipes: RecipeModel[] = MOCK_RECIPES;

}
