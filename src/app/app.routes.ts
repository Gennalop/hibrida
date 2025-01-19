import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab1',
    loadComponent: () => import('./pages/tab1/tab1.page').then( m => m.Tab1Page)
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'tab4',
    loadComponent: () => import('./pages/tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'tab5/:id',
    loadComponent: () => import('./pages/tab5/tab5.page').then( m => m.Tab5Page)
  },
  
];

export const providers = [
  provideHttpClient(), // Provee el HttpClient para toda la aplicación
];
