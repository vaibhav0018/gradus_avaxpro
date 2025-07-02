import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationRoutingModule } from './quotation-routing.module';
import {AddNewQuotationFilterComponent} from './components/add-new-quotation-filter/add-new-quotation-filter.component';
import { QuotationMenuComponent } from './components/quotation-menu/quotation-menu.component'
import { SharedModule } from '../../../../shared/shared.module';
import { CoreModule } from '../../../../core/core.module';
import { NewQuotationItemEntryComponent } from './new-quotation-item-entry/new-quotation-item-entry.component';
import { QuotAddedItemDetailsPageComponent } from './quot-added-item-details-page/quot-added-item-details-page.component';
import { QuotOtherInfoPageComponent } from './quot-other-info-page/quot-other-info-page.component';
import { QuotItemOtherInfoComponent } from './quot-item-other-info/quot-item-other-info.component';
import { QuotCompleteViewPageComponent } from './quot-complete-view-page/quot-complete-view-page.component';
import { ModifyHeaderPageComponent } from './modify-header-page/modify-header-page.component';
import { ItemQtyExeInfoDetailsComponent } from './item-qty-exe-info-details/item-qty-exe-info-details.component';
import { NewQuotDraftItemEntryComponent } from './new-quot-draft-item-entry/new-quot-draft-item-entry.component';
import { QuotViewPageComponent } from './quot-view-page/quot-view-page.component';
import { ModifyOtherInfoComponent } from './modify-other-info/modify-other-info.component';


@NgModule({
  declarations: [AddNewQuotationFilterComponent, QuotationMenuComponent, NewQuotationItemEntryComponent, 
    QuotAddedItemDetailsPageComponent, QuotOtherInfoPageComponent, 
    QuotItemOtherInfoComponent, QuotCompleteViewPageComponent, ModifyHeaderPageComponent, 
    ItemQtyExeInfoDetailsComponent, NewQuotDraftItemEntryComponent, QuotViewPageComponent, ModifyOtherInfoComponent],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    CoreModule, 
    SharedModule 
  ],
  // entryComponents: [QuotItemOtherInfoComponent,ModifyHeaderPageComponent,ModifyOtherInfoComponent,
  //   ItemQtyExeInfoDetailsComponent    
  // ],
   
})
export class QuotationModule { }
