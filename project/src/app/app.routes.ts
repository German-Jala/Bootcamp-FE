import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(c => c.Home),
    },
    {
        path: 'pipes',
        pathMatch: 'full',
        loadComponent: () => import('./pages/pipes/pipes').then(c => c.Pipes),
    },

];
