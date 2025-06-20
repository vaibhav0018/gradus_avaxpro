import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';
import { StatusViewComponent } from './components/status-view/status-view.component';


const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,
    data: { breadcrumb: 'Reservation Menu' },
  },
  {
    path: 'status-view',
    component: StatusViewComponent,
    data: { breadcrumb: 'Reservation View' },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
