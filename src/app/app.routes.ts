import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./componnts/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
