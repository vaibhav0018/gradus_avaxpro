import { Routes } from '@angular/router';
import { NonSessionComponent } from './non-session.component';
import { ConstantsService } from '../../core/services/constants.service';

export const nonSessionRoutes: Routes = [
  {
    path: '',
    component: NonSessionComponent,
    children: [
      {
        path: ConstantsService.ROUTE_HOME,
        loadChildren: () => import('./home/home.routing').then(m => m.homeRoutes),
        data: { breadcrumb: 'Home' },
      },
      {
        path: ConstantsService.ROUTE_LOGIN,
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
        data: { breadcrumb: 'Login' },
      },
    ],
  },
];
