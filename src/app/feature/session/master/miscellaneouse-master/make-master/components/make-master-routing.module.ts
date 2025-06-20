import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeMasterMenuComponent } from './make-master-menu/make-master-menu.component';
import { SharedMaterialModule } from '../../../../../../shared/share-material';


const routes: Routes = [
  {
    path: '',
    component: MakeMasterMenuComponent,
    data: { breadcrumb: 'Make Master' },
  }
];

@NgModule({
  imports: [SharedMaterialModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeMasterRoutingModule { }
