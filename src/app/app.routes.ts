import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'card/:id',
    loadComponent: () => import('./pages/detail/detail').then((m) => m.DetailPage),
    children: [
      {
        path: '',
        redirectTo: 'effect',
        pathMatch: 'full',
      },
      {
        path: 'effect',
        loadComponent: () =>
          import('./pages/detail/components/effect-section/effect-section').then((m) => m.EffectSection),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./pages/detail/components/stats-section/stats-section').then((m) => m.StatsSection),
      },
      {
        path: 'prices',
        loadComponent: () =>
          import('./pages/detail/components/prices-section/prices-section').then((m) => m.PricesSection),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
