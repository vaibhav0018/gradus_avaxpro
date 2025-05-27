import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ConstantsServiceAvaxPro } from 'src/app/core/services/constants_avaxpro.service';
import { ConstantsServiceAvaxPro } from '../../../../core/services/constants_avaxpro.service';

export const routes: Routes = [
  {
    path: '',
    children: [

      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_BOM_MASTER,
      //   loadChildren: './bom-master-maintainance/bom-master-maintainance.module#BomMasterMaintainanceModule',
      //   data: { breadcrumb: 'Bom Master' },
      // },
      {
        path: ConstantsServiceAvaxPro.ROUTE_MAKE_MASTER,
        loadChildren: () => import('./make-master/make-master.module').then(m => m.MakeMasterModule),
      },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_PHYSICAL_LOCATION_MASTER,
      //   loadChildren: './physical-location-master/physical-location-master.module#PhysicalLocationMasterModule',
      //   data: { breadcrumb: 'Physical Location Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_CUSTOMER_BANK_MASTER,
      //   loadChildren: './customer-bank-master/customer-bank-master.module#CustomerBankMasterModule',
      //   data: { breadcrumb: 'Customer Bank' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_EXTEND_CUST_SUP_MASTER,
      //   loadChildren: './extend-customer-supplier-master/extend-customer-supplier-master.module#ExtendCustomerSupplierMasterModule',
      //   data: { breadcrumb: 'Extend Customer-Supplier Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_TRANSPORTER_MASTER,
      //   loadChildren: './transporter-master/transporter-master.module#TransporterMasterModule',
      //   data: { breadcrumb: 'Transporter Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_BROKER_MASTER,
      //   loadChildren: './broker-master/broker-master.module#BrokerMasterModule',
      //   data: { breadcrumb: 'Broker Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_HSN_SAC_MASTER,
      //   loadChildren: './hsn-sac-master/hsn-sac-master.module#HsnSacMasterModule',
      //   data: { breadcrumb: 'HSN / SAC Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_UPDATE_HANDLED_BY,
      //   loadChildren: './update-handled-by/update-handled-by.module#UpdateHandledByModule',
      //   data: { breadcrumb: 'Update Handled By' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_USER_STOCK_MAPPING,
      //   loadChildren: './user-stock-mapping/user-stock-mapping.module#UserStockMappingModule',
      //   data: { breadcrumb: 'Stock GW / Stock Query Control' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_ITEM_MAIN_SUB_GROUP_MASTER,
      //   loadChildren: './item-main-sub-group-master/item-main-sub-group-master.module#ItemMainSubGroupMasterModule',
      //   data: { breadcrumb: 'Item Main Sub Group Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_BRANCH_TRANSFER_CLOSING_DATES,
      //   loadChildren: './branch-transfer-closing-dates/branch-transfer-closing-dates.module#BranchTransferClosingDatesModule',
      //   data: { breadcrumb: 'Branch Transfer Closing Dates' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_CHALLAN_DELIVERY_TERMS_MASTER,
      //   loadChildren: './challan-delivery-terms-master/challan-delivery-terms-master.module#ChallanDeliveryTermsMasterModule',
      //   data: { breadcrumb: 'Challan Delievery Terms Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_FOLLOWUP_ACTION_MASTER,
      //   loadChildren: './followup-action-master/followup-action-master.module#FollowupActionMasterModule',
      //   data: { breadcrumb: 'Followup Action Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_CONSIGNOR_MASTER,
      //   loadChildren: './consignor-master/consignor-master.module#ConsignorMasterModule',
      //   data: { breadcrumb: 'Consignor Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_QUOTATION_DELIVERY_TERMS,
      //   loadChildren: './quotation-delivery-terms/quotation-delivery-terms.module#QuotationDeliveryTermsModule',
      //   data: { breadcrumb: 'Quotation Delivery Terms' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_PAY_TERM_MASTER,
      //   loadChildren: './pay-term-master/pay-term-master.module#PayTermMasterModule',
      //   data: { breadcrumb: 'Pay Term Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_MODIFY_PRICE_LIST,
      //   loadChildren: './modify-list-price/modify-list-price.module#ModifyListPriceModule',
      //   data: { breadcrumb: 'Modify Price List' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_QUANTITY_VARIATION_MASTER,
      //   loadChildren: './quantity-variation-master/quantity-variation-master.module#QuantityVariationMasterModule',
      //   data: { breadcrumb: 'Quantity Variation Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_USER_EMAIL_MASTER,
      //   loadChildren: './user-email-master/user-email-master.module#UserEmailMasterModule',
      //   data: { breadcrumb: 'User Email Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_SYSTEM_EMAIL_USERS,
      //   loadChildren: './system-email-users/system-email-users.module#SystemEmailUsersModule',
      //   data: { breadcrumb: 'System Email Users' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_COMMISSION_ACCOUNTING_CODE,
      //   loadChildren: './commission-accounting-code/commission-accounting-code.module#CommissionAccountingCodeModule',
      //   data: { breadcrumb: 'Commission Accounting Codes' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_PRODUCT_MAKE_MANAGER,
      //   loadChildren: './product-make-manager/product-make-manager.module#ProductMakeManagerModule',
      //   data: { breadcrumb: 'Product Make Manager' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_PO_SR_SUPPLIER_MAPPING,
      //   loadChildren: './po-sr-supplier-mapping/po-sr-supplier-mapping.module#PoSrSupplierMappingModule',
      //   data: { breadcrumb: 'Po/Sr Supplier Mapping' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_EXPENSE_MASTER,
      //   loadChildren: './expense-master/expense-master.module#ExpenseMasterModule',
      //   data: { breadcrumb: 'Debit Note / Credit Note Expense Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_NEW_BANK_MASTER,
      //   loadChildren: './new-bank-master/new-bank-master.module#NewBankMasterModule',
      //   data: { breadcrumb: 'New Bank Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_INDUSTRY_MASTER,
      //   loadChildren: './industry-master/industry-master.module#IndustryMasterModule',
      //   data: { breadcrumb: 'Industry Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_CHANGE_PASSWORD,
      //   loadChildren: './change-password/change-password.module#ChangePasswordModule',
      //   data: { breadcrumb: 'Change Password' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_COUNTRY_STATE_MASTER,
      //   loadChildren: './country-state-master/country-state-master.module#CountryStateMasterModule',
      //   data: { breadcrumb: 'Country/State Master' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_OPEN_NEW_GODWON,
      //   loadChildren: './open-new-godown/open-new-godown.module#OpenNewGodownModule',
      //   data: { breadcrumb: 'Open New Godwon' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_UPDATE_DECLARATION,
      //   loadChildren: './update-declaration/update-declaration.module#UpdateDeclarationModule',
      //   data: { breadcrumb: 'Update Declaration' },
      // },
      // {
      //   path: ConstantsServiceAvaxPro.ROUTE_SKIP_EMAIL_FILTER,
      //   loadChildren: './skip-email-component/skip-email-filter/skip-email-filter.module#SkipEmailFilterModule',
      //   data: { breadcrumb: 'Skip Email Filter' },
      // },       
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MiscellaneousMasterRoutingModule{}