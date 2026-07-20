import { Routes } from '@angular/router';
import { profileGuard } from './guards/profile.guard';
import { cardResolver } from './resolvers/card.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.ProfilePage),
  },
  {
    path: 'collection',
    loadComponent: () => import('./pages/collection/collection').then((m) => m.CollectionPage),
    canActivate: [profileGuard],
  },
  {
    path: 'card/:id',
    loadComponent: () => import('./pages/detail/detail').then((m) => m.DetailPage),
    resolve: {
      card: cardResolver,
    },
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
