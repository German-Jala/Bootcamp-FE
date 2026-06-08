import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full',
    },
    {
        path: 'recipes',
        pathMatch: 'full',
        loadComponent: () => import('./recipe-list/recipe-list').then((m) => m.RecipeList),
    },
    {
        path: 'add-recipe',
        pathMatch: 'full',
        loadComponent: () => import('./add-recipe/add-recipe').then((m) => m.AddRecipe),
    },
    {
        path: 'recipes/:id',
        pathMatch: 'full',
        loadComponent: () => import('./recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
    },
];
