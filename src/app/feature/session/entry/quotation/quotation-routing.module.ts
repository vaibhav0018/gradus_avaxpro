import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewQuotationFilterComponent } from './components/add-new-quotation-filter/add-new-quotation-filter.component'
import { QuotationMenuComponent } from './components/quotation-menu/quotation-menu.component';
import { NewQuotationItemEntryComponent } from './new-quotation-item-entry/new-quotation-item-entry.component';
import { QuotCompleteViewPageComponent } from './quot-complete-view-page/quot-complete-view-page.component';
import { NewQuotDraftItemEntryComponent } from './new-quot-draft-item-entry/new-quot-draft-item-entry.component';
import { QuotViewPageComponent } from './quot-view-page/quot-view-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationMenuComponent,
    data: { breadcrumb: 'Quotation' },
  },
  {
    path: 'addnewquotation',
    component: AddNewQuotationFilterComponent,
    data: { breadcrumb: 'Quotation' },
  },

  {
    path: 'newquotitementry',
    component: NewQuotationItemEntryComponent,
    data: { breadcrumb: 'Quotation' },
  },
  {
    path: 'newquotdraftitementry',
    component: NewQuotDraftItemEntryComponent,
    data: { breadcrumb: 'Quotation' },
  },

  {
    path: 'quotcompleteview',
    component: QuotCompleteViewPageComponent,
    data: { breadcrumb: 'Quotation' },

  },

  {
    path: 'quotview',
    component: QuotViewPageComponent,
    data: { breadcrumb: 'Quotation' },

  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
