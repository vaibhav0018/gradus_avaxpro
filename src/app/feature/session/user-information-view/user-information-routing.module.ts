import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  {
    path: '',
   component : FilterComponent,
    data: { breadcrumb: 'USER PROFILE DISPLAY AND MODIFICATION' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule { }
