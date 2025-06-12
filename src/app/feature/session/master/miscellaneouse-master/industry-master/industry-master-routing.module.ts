import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndustryMasterMenuComponent } from './components/industry-master-menu/industry-master-menu.component';

const routes: Routes = [
  {
    path: '',
    component: IndustryMasterMenuComponent,
    data: { breadcrumb: 'Industry Master' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryMasterRoutingModule { }
