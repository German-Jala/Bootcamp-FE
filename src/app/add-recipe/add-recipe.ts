import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';
import { ToFormControls } from '../helpers/ToFormControls';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly recipeService = inject(Recipe);

  protected readonly recipeForm = this.formBuilder.group<ToFormControls<Omit<RecipeModel, 'id' | 'ingredients'>>>({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    imgUrl: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    isFavorite: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
  });

  protected addRecipe() {
    if (this.recipeForm.valid) {
      this.recipeForm.value;
      console.log(this.recipeForm.value)
      this.recipeService.addRecipe({ ...this.recipeForm.getRawValue(), ingredients: [] });
      this.recipeForm.reset();
      this.router.navigate(['']);
    }
  }


}
