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
];
