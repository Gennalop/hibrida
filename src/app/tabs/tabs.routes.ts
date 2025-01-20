import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../pages/tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../pages/tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../pages/tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../pages/tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: 'intro',
        loadComponent: () => import('../pages/intro/intro.page').then( m => m.IntroPage)
      },
      {
        path: '',
        redirectTo: '/intro',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full',
  },
];
