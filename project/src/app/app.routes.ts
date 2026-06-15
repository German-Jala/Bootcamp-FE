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
    {
        path: 'cards',
        pathMatch: 'full',
        loadComponent: () => import('./pages/cards/cards').then(c => c.Cards),
    },
    {
        path: 'encapsulation-emulated',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-emulated/encapsulation-emulated').then(c => c.EncapsulationEmulated),
    },
    {
        path: 'encapsulation-shadow',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-shadow/encapsulation-shadow').then(c => c.EncapsulationShadow),
    },
    {
        path: 'encapsulation-none',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-none/encapsulation-none').then(c => c.EncapsulationNone),
    },
    {
        path: 'encapsulation-experiment-emulated',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-experiment-emulated/encapsulation-experiment-emulated').then(c => c.EncapsulationExperimentEmulated),
    },
    {
        path: 'encapsulation-experiment-shadow',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-experiment-shadow/encapsulation-experiment-shadow').then(c => c.EncapsulationExperimentShadow),
    },
    {
        path: 'encapsulation-experiment-none',
        pathMatch: 'full',
        loadComponent: () => import('./pages/encapsulation-experiment-none/encapsulation-experiment-none').then(c => c.EncapsulationExperimentNone),
    },
    {
        path: 'inputs',
        pathMatch: 'full',
        loadComponent: () => import('./pages/inputs/inputs').then(c => c.Inputs),
    },
];
