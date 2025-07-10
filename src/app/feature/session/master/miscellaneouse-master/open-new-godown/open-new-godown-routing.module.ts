import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GodwonMenuComponent } from './components/godwon-menu/godwon-menu.component';
import { AddGodwonComponent } from './components/add-godwon/add-godwon.component';
import { ViewGodwonComponent } from './components/view-godwon/view-godwon.component';
import { ModifyGodwonComponent } from './components/modify-godwon/modify-godwon.component';

const routes: Routes = [
  {
    path: '',
    component: GodwonMenuComponent,
    data: { breadcrumb: 'Godown Menu'},
  },
  {
    path: 'add-godwon',
    component: AddGodwonComponent,
    data: { breadcrumb: 'Add Godown '},
  },
  {
    path: 'view-godwon',
    component: ViewGodwonComponent,
    data: { breadcrumb: 'View Godown '},
  },
  {
    path: 'modify-godwon',
    component: ModifyGodwonComponent,
    data: { breadcrumb: 'Modify Godown '},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenNewGodownRoutingModule { }
