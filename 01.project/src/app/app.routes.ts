import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
    {
        path: 'board',
        loadComponent: () => import('./components/board/board.component').then(c => c.BoardComponent),
    },
    {
        path: 'collection',
        loadComponent: () => import('./pages/collection/collection.component').then(c => c.CollectionComponent),
    },
    {
        path: 'card',
        loadComponent: () => import('./components/card/card.component').then(c => c.CardComponent),
    },
];
