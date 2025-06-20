import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewDraftMasterComponent } from './components/customer-new-draft-master/customer-new-draft-master.component';
import { CustomerDraftMenuComponent } from './components/customer-draft-menu/customer-draft-menu.component';
import { VendorDraftMasterComponent } from './components/vendor-draft-master/vendor-draft-master.component';
import { SupplierDraftMasterComponent } from './components/supplier-draft-master/supplier-draft-master.component';
import { CustomerMaintaincePageComponent } from './components/customer-maintaince-page/customer-maintaince-page.component';
import { MiscPartyMaintenanceMenuComponent } from './components/misc-party-maintenance-menu/misc-party-maintenance-menu.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDraftMenuComponent,
    data: { breadcrumb: 'Customer Master Maintenance' },
  },
  {
    path: 'addnewcustdraft',
    component: CustomerNewDraftMasterComponent,
    data: { breadcrumb: 'Add New' },
  },
  {
    path: 'customermaintaince',
    component: CustomerMaintaincePageComponent,
    // data: { breadcrumb: 'Modify' },
    data: { breadcrumb: 'Modify' },
  },
  {
    path: 'vendor',
    component: VendorDraftMasterComponent,
    data: { breadcrumb: 'Vendor Master' },
  },
  {
    path: 'supplier',
    component: SupplierDraftMasterComponent,
    data: { breadcrumb: 'Supplier Master' },
  },
  {
    path: 'miscparty',
    component: MiscPartyMaintenanceMenuComponent,
    data: { breadcrumb: 'Misc. Master' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDraftMasterRoutingModule { }
