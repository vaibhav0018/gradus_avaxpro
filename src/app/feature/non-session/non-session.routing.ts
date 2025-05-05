import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonSessionComponent } from './non-session.component';
import { ConstantsService } from '../../core/services/constants.service';

const routes: Routes = [
  {
    path: '',
    component: NonSessionComponent,
    children: [
      {
        path: ConstantsService.ROUTE_LOGIN,
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
        data: { breadcrumb: 'Non Session Login' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonSessionRoutingModule {}


// {
//     path: ConstantsService.ROUTE_HOME,
//     loadChildren: () =>
//       import('./home/home.module').then((m) => m.HomeModule),
//     data: { breadcrumb: 'Non Session Home' },
//   },