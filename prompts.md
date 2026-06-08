#Why Routes are not working?
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full',
    },
    {
        path: '/recipes',
        pathMatch: 'full',
        loadComponent: () => import('./recipe-list/recipe-list').then((m) => m.RecipeList),
    },
    {
        path: '/recipes/:id',
        pathMatch: 'full',
        loadComponent: () => import('./recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
    }
];

Answer
It was a problem with / sign

