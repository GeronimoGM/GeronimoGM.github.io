import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/index-page/index-page').then((m) => m.IndexPage),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
