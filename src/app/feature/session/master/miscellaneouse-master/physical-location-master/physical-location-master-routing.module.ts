import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicalLocationMasterMenuComponent } from './components/physical-location-master-menu/physical-location-master-menu.component';

//const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: PhysicalLocationMasterMenuComponent,
    data: { breadcrumb: 'Physical Location Master' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicalLocationMasterRoutingModule { }
