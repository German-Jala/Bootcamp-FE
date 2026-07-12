import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'card/:id',
    loadComponent: () => import('./pages/detail/detail').then((m) => m.DetailPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
