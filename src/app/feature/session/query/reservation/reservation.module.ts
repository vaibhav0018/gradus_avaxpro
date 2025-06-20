import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { StatusViewComponent } from './components/status-view/status-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReservationComponent, StatusViewComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
    CoreModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReservationModule { }
