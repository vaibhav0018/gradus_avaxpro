import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicalLocationMasterRoutingModule } from './physical-location-master-routing.module';
import { PhysicalLocationMasterMenuComponent } from './components/physical-location-master-menu/physical-location-master-menu.component';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PhysicalLocationCardListComponent } from './components/physical-location-card-list/physical-location-card-list.component';
import { SpecialcharvalidationDirective } from './components/common/specialcharvalidation.directive';
import { ConfirmDialogComponentComponent } from './components/ConfirmDialog/confirm-dialog-component/confirm-dialog-component.component';
import { ConfirmationDailogComponent } from './confirmation-dailog/confirmation-dailog.component';


@NgModule({
  declarations: [PhysicalLocationMasterMenuComponent, PhysicalLocationCardListComponent, SpecialcharvalidationDirective, ConfirmDialogComponentComponent, ConfirmationDailogComponent],
  imports: [
    CommonModule,
    PhysicalLocationMasterRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PhysicalLocationMasterModule { }
