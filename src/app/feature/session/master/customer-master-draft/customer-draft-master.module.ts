import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDraftMasterRoutingModule } from './customer-draft-master-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CustomerNewDraftMasterComponent } from './components/customer-new-draft-master/customer-new-draft-master.component';
import { CustomerDraftMenuComponent } from './components/customer-draft-menu/customer-draft-menu.component';
import { VendorDraftMasterComponent } from './components/vendor-draft-master/vendor-draft-master.component';
import { SupplierDraftMasterComponent } from './components/supplier-draft-master/supplier-draft-master.component';

import { ValidationNumberDirective } from './components/validation/validation-number.directive';
import { ValidationAlphanumricDirective } from './components/validation/validation-alphanumric.directive';
import { ValidationAlphabetDirective } from './components/validation/validation-alphabet.directive';
import { ValidationEmailDirective } from './components/validation/validation-email.directive';
import { ValidationPancardDirective } from './components/validation/validation-pancard.directive';
//import { MiscPartyMaintenanceMenuComponent } from './components/misc-party-maintenance-menu/misc-party-maintenance-menu.component';
import { CustomerMaintaincePageComponent } from './components/customer-maintaince-page/customer-maintaince-page.component';

@NgModule({
  declarations: [
    CustomerNewDraftMasterComponent,
    CustomerDraftMenuComponent,
    VendorDraftMasterComponent,
    SupplierDraftMasterComponent,
    //MiscPartyMaintenanceMenuComponent,
    ValidationNumberDirective,
    ValidationAlphanumricDirective,
    ValidationAlphabetDirective,
    ValidationEmailDirective,
    ValidationPancardDirective,
    CustomerMaintaincePageComponent,
  ],
  imports: [
    CommonModule,
    CustomerDraftMasterRoutingModule,
    SharedModule,
  ],
  //entryComponents: [MiscPartyMaintenanceMenuComponent],
  providers: [],
})
export class CustomerDraftMasterModule { }
