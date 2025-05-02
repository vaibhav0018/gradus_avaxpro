import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  /*
   *  Table Constants for entire application
   *
   */
  /**
   *  Application Types Ex: Reports, Entry etc.
   */
  public static ROUTE_USER_PROFILE_DISPLAY = 'user-profile-display'
  public static ROUTE_REPORTS = 'reports'
  public static ROUTE_MONITORING_REPORTS = 'monitoring-reports'
  public static ROUTE_OUTSTANDING_ABOVE_120_DAYS = 'outstanding-above-120-days'
  public static ROUTE_OUTSTANDING_ABOVE_180_DAYS = 'outstanding-above-180-days'
  public static ROUTE_ITEM_MAKE_BRANCH_WISE_OS_SEARCH = 'item-make-branch-wise-os-search'
  public static ROUTE_WEEKLY_QUOTATION_FILTER_PAGE = 'weekly-quotation-data-1'
  public static ROUTE_WEEKLY_QUOTATION_GROUPWISE_PAGE = 'weekly-quotation-data-2'
  public static ROUTE_LIST_OF_AOS_EXCUTED_SEARCH_PAGE = 'list-of-aos-execut-search'
  public static ROUTE_COST_CENTER_ANALYSIS = 'cost-center-analysis'
  public static ROUTE_LIST_OF_SRS_PTSS_PENDING_PURCHASE = 'list-of-srs-ptss-pending-purchase'
  public static ROUTE_GSC_CHALLAN_PENDING_SR = 'gsc-challan-pending-sr'
  public static ROUTE_QUOTATION_LOST_REPORT = 'quotation-lost-report'
  public static ROUTE_SALES_REPORT = 'sales-report'
  public static ROUTE_AO_PENDING_REPORT = 'ao-pending-report'
  public static ROUTE_GRBS_PENDING_CREDIT_NOTE = 'grbs-pending-credit-note'
  public static ROUTE_DOCUMENT_MADE_BY_USER = 'document-made-by-user'
  public static ROUTE_PENDING_AO_WITH_STOPPAGES_OVER_80_DAYS = 'pending-ao-with-stoppages-over-80-days'
  public static ROUTE_PO_PENDING = 'po-pending'
  public static ROUTE_USER_TRACKING_REPORT = 'user-tracking-report'
  public static ROUTE_IMMEDIATE_PAYMENT_CHALLANS = 'immediate-payment-challans'
  public static ROUTE_ZERO_CARD_COST_REPOET = 'zero-card-cost-report'
  public static ROUTE_SEGMENT_WISE_SALES_COMPARISON   = 'segment-wise-sales-comparison'
  public static ROUTE_COMMISSION_REPORT   = 'commission-report'
  public static ROUTE_OR_TO_AO_REPORT='or-to-ao-report'
  public static ROUTE_TRANSPORTER_BILL_REPORT='transporter-report'
  public static ROUTE_TRANSPORTER_CHALLAN_REPORT='transporter-Challan'

  public static ROUTE_TRANSPORTER_DUMMY_REPORT='transporter-dummy'

  public static ROUTE_MONTHLY_STOCK_VALUATION = 'monthly-stock-valuation'
  public static ROUTE_MARKET_PURCHASE_REPORT = 'market-purchase-report'
  public static ROUTE_CHALLAN_VIOLATION_FOR_CARD_CUTTING = 'challan-violation-for-card-cutting'
  public static ROUTE_CHALLAN_MADE_REPORT = 'challan-made-report'
  public static ROUTE_DELAYED_PAYMENTS = 'delayed-payments'
  public static ROUTE_PURCHASE_AND_ITS_DISPOSAL = 'purchase-and-its-disposal'
  public static ROUTE_PARTY_CHALLAN_WISE_PROFIT_LOSS = 'party-challan-wise-profit-loss'
  public static ROUTE_SELL_OUT= 'sell-out-details'


  public static ROUTE_MIS_REPORTS = 'mis-reports'
  public static ROUTE_SALES_TAX_REPORTS = 'sales-tax-reports'

  public static ROUTE_BUSINESS_REPORTS = 'business-reports'
  public static ROUTE_INVENTORY_DETAILS= 'inventory-details'

  public static ROUTE_MONTHLY_SALES_WISE_SEARCH = 'monthly-sales-wise-search'
  public static ROUTE_PROFIT_AND_LOSS = 'profit-and-loss'
  public static ROUTE_STOCK_TRANFER_INS_DECL = 'stock-transfer'

  public static ROUTE_MONTHLY_C_FORM_COLLECTION = 'monthly-c-form-collection'
  public static ROUTE_PARTY_WISE_CST_REPORT = 'party-wise-cst-report'
  public static ROUTE_GST_SALES_REGISTER = 'gst-sales-register'
  public static ROUTE_GST_PURCHASE_REGISTER = 'gst-purchase-register'
  public static ROUTE_GST_CREDIT_NOTE_REGISTER = 'gst-credit-note-register'
  public static ROUTE_GST_DEBIT_NOTE_REGISTER = 'gst-debit-note-register'
  public static ROUTE_HSN_SUMMARY_REPORT = 'hsn-summary-report'
  public static ROUTE_GST_UPLOAD_SALES_PURCHASE_REPORT = 'gst-sales-purchase-report'

  public static ROUTE_DOCUMENT_SUMMARY_REPORT = 'document-summary-report'
  public static ROUTE_INWARD_FOR_RCM_REPORT = 'inward-for-rcm-report'
  public static ROUTE_INWARD_FOR_SERVICE_REPORT = 'inward-for-service'
  public static ROUTE_SALE_TAX_PENDING_RECEIVED_REPORT = 'sale-tax-pending-received-search-report'
  public static ROUTE_GST_DOC_SUMMARY = 'gst-doc-summary-report'
  public static ROUTE_GST_SUMMARY_REPORT = 'gst-summary-report'

  public static ROUTE_LIST_OF_NEW_PARTIES = 'list-of-new-parties'
  public static ROUTE_BRANCH_SALES_1 = 'branch-sales-1'
  public static ROUTE_BRANCH_SALES_2 = 'branch-sales-2'
  public static ROUTE_COURIER_SEND_REPORT = 'courier-send-report'
//  public static ROUTE_ACCOUNTING_MODULE_REPORT = 'accounting-module-report'
  public static ROUTE_TOP_N_PARTY = 'top-n-party'

  public static ROUTE_PLANNING_REPORTS = 'planning-reports'
  public static ROUTE_STOCK_PLANNING = 'stock-planning'
  public static ROUTE_STOCK_MOVEMENT = 'stock-movement'

  public static DEFAULT_PAGE_SIZE_FOR_IMM = 100
  public static PAGE_SIZE_ARRAY_FOR_IMM = [ConstantsService.DEFAULT_PAGE_SIZE_FOR_IMM, 500, 1000]

  public static DEFAULT_PAGE_SIZE = 100
  public static PAGE_SIZE_ARRAY = [ConstantsService.DEFAULT_PAGE_SIZE, 200, 1000, 2000]

  public static DEFAULT_PAGE_SIZE_FOR_ACC = 15
  public static PAGE_SIZE_ARRAY_FOR_ACC = [ConstantsService.DEFAULT_PAGE_SIZE_FOR_ACC, 25, 50]

  public static DATE_YMD = 'YYYY-MM-DD'
  public static DATE_DMY = 'DD-MM-YYYY'
  public static DATE_DMMMY = 'DD-MMM-YYYY'

  /**
   *  Application Types Ex: Reports, Entry etc.
   */


  /*
   *
   * All routes corresponding to NonSessionModule are Arranged alphabetically
   *
   */
  public static ROUTE_NON_SESSION = 'non-session'
  public static ROUTE_HOME = 'home'
  public static ROUTE_LOGIN = 'login'
  public static ROUTE_DASHBOARD = 'template_home'
  public static ROUTE_MENU = 'db-quickmenu'

  /*
   *
   * All routes corresponding to SessionModule are Arranged alphabetically
   *
   */
  public static ROUTE_SESSION = 'session'

  /**
   * All routes corresponding to Challan ReportsModule
   */
  public static ROUTE_CHALLAN_REPORTS = 'challan-reports'
  public static ROUTE_SALES_SUMMARY = 'sales-summary'
  public static ROUTE_STOCK_TRANSFER_REGISTER = 'stock-transfer-register'
  public static ROUTE_TAX_SUMMARY = 'tax-summary'
  public static ROUTE_UNBILLED_DOCUMENT = 'unbilled-document'
  public static ROUTE_SAMPLE_CHALLAN = 'sample-challan'
  public static ROUTE_SALES_REGISTER = 'sales-register'
  public static ROUTE_QUOTATION_REGISTER = 'quotation-register'
  public static ROUTE_PARTY_CLEARANCE = 'party-clearance'
  public static ROUTE_PROFORMA_REGISTER = 'proforma-register'
  public static ROUTE_DO_PTS = 'do-pts'
  public static ROUTE_PO_REGISTER = 'po-register'
  public static ROUTE_PARTY_CHALLAN_ITEM_WISE = 'party-challan-item-wise'
  public static ROUTE_CANCELLED_CHALLAN = 'cancelled-challan'
  public static ROUTE_AO_REGISTER = 'ao-register'
  public static ROUTE_POLYCAB_ACC = 'polycab-acc'
  public static ROUTE_BROKER_WISE_SALES = 'broker-wise-sales'

  public static ROUTE_CAHS_MEMO = 'cash-memo'
  public static ROUTE_GSC_CHALLAN_CLEARANCE = 'gsc-challan-clearance-report'
  /**
   * All routes corrosponding to Miscleneous Module
   */
  public static ROUTE_MISCELLANEOUS = 'miscellaneous'
  public static ROUTE_CHANGE_INV_SIGNATORIES = 'change-inv-signatories'

  public static ROUTE_FINANCIAL_YEAR = 'financial-year'
  /**
   *
   * All routes corresponding to StockReportModule
   */
  public static ROUTE_STOCK_REPORT = 'stock-report'
  public static ROUTE_STOCK_LESS_THAN_N_QUANTITY = 'stock-less-than-n-quantity'
  public static ROUTE_GODOWN_WISE_STOCK_STATUS_REPORT_FILTER =
    'godown-wise-stock-status-report-filter'
  public static ROUTE_ITEM_LEDGER = 'item-ledger'
  public static ROUTE_STOCK_GATEWAY = 'stock-gateway'
  public static ROUTE_DATE_WISE_STOCK_VALUE_REPORT_FILTER = 'date-wise-stock-value'
  public static ROUTE_DISCREPANCY_SEARCH_REPORT_FILTER = 'discrepancy-search-report'
  public static ROUTE_STOCK_TRANSFER_REPORT_FILTER = 'stock-transfer-report'
  public static ROUTE_GODOWN_STOCK_BANKING_REPORT_FILTER =
    'godown-stock-banking-report-filter'
  public static ROUTE_STOCK_OVER_N_DAYS_REPORT = 'stock-over-n-days-report-filter'
  public static ROUTE_SR_DC_REPORT_FILTER = 'sr-dc-report-filter'
  public static ROUTE_GD_PHYSICAL_LOCATION_STATUS = 'gd-physical-location-status'
  public static ROUTE_GODOWN_ITEM_MAKE_WISE_STOCK_MOVEMENT =
    'item-wise-stock-movement-report-filter'
  public static ROUTE_STOCK_VALUATION_REPORT_FILTER = 'stock-valuation-report-filter'
  public static ROUTE_GD_WISE_STOCK_WITH_STOCK_LEVEL = 'gd-wise-stock-with-stock-level'
  public static ROUTE_SR_REGISTER_REPORT_FILTER = 'sr-register'
  public static ROUTE_DAMAGE_VALUE_REPORT_FILTER = 'damage-value'
  public static ROUTE_ITEM_AGE_WISE_VALUATION_REPORT_FILTER = 'item-age-wise-valuation'
  public static ROUTE_ITEM_LEDGER_SUMMARY = 'item-ledger-summary'

  /**
   * All routes corresponding to MonthlySalesModule
   */
  public static ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS = 'monthly-sales-analysis-reports'
  public static ROUTE_BRANCH_HANDLED_BY_WISE_DAILY_SALES =
    'branch-handled-by-wise-daily-sales'
  public static ROUTE_DOCUMENT_WISE_DATA = 'document-wise-data'
  public static ROUTE_BROKER_WISE_OUTSTANDING = 'broker-wise-outstanding'
  public static ROUTE_ITEM_GROUP_WISE_YEARLY_SALES = 'item-group-wise-yearly-sales'
  public static ROUTE_STATE_PARTY_YEARLY_SALES = 'state-party-yearly-sales'
  public static ROUTE_PARTY_WISE_MONTHLY_SALES_ANALYSIS =
    'party-wise-monthly-sales-analysis'
  public static ROUTE_DAILY_SALES_WITH_GP = 'daily-sales-with-gp'
  public static ROUTE_GATEWAY_REPORT = 'gateway-report'
  public static ROUTE_RH_GRP_MNTHLY_BDGT_SLS = 'rh-grp-mnthly-bdgt-sls'
  public static ROUTE_HANDLE_PRODUCTION_WISE_SALES = 'handle-production-wise-sales'
  /**
   * All routes corresponding to AccountsReportsModule
   */
  public static ROUTE_ACCOUNT_REPORTS = 'account-reports'
  public static ROUTE_CHEQUE_BOUNCE_REPORTS = 'cheque-bounce-report'
  public static ROUTE_CHEQUE_BOUNCE = 'cheque-bounce'
  public static ROUTE_CASH_BOOK = 'cash-book'
  public static ROUTE_BANK_BOOK = 'bank-book'
  public static ROUTE_CHEQUE_ISSUE_REGISTER = 'cheque-issue-register'
  public static ROUTE_EXPENSE_BILL_REGISTER = 'expense-bill-register'
  public static ROUTE_PDC_CLCTD_PNDNG_DPST = 'pdc-clctd-pndng-dpst'
  public static ROUTE_PDC_ISSUED_PNDNG_CLRNCE = 'pdc-issued-pndng-clrnce'
  public static ROUTE_COLLECTION_REGISTER = 'collection-register'
  public static ROUTE_SEZ_PENDING = 'sez-pending'
  public static ROUTE_ACCOUNT_LEDGER = 'account-ledger'
  public static ROUTE_OS_REPORT_FOR_BANKING = 'os-report-for-banking'
  public static ROUTE_OUTSTANDING_ABOVE_N_AMOUNT = 'outstanding-above-n-amount'
  public static ROUTE_SECURITY_CHEQUE_REPORT = 'security-cheque-report'
  public static ROUTE_GENERAL_REGISTER_REPORT = 'general-register-report'
  public static ROUTE_RDB_CREDIT_NOTE_ABOVE_X_PERC_REPORT = 'rdb-credit-note-above-x-perc'
  public static ROUTE_SEARCH_PENDING_RDB_REPORT = 'search-pending-rdb'
  public static ROUTE_TRIAL_BALANCE_REPORT = 'trial-balance-report'
  public static ROUTE_CREDITORS_DEBTORS_AGEING_REPORT = 'creditors-debtors-ageing-report'
  public static ROUTE_TOTAL_COLLECTION_REPORT = 'total-collection-report'
  public static ROUTE_ON_ACCOUNT_COLLECTION_ADJUSTMENT_COLEECTION_REPORT = 'on-acc-collection-pending-adjustment-report'
  // public static ROUTE_DEBTORS_AGING_REPORT = 'debitors-aging-report'
  public static ROUTE_PURCHASE_REPORT_WITH_OS = 'purchase-report-with-os'
  public static ROUTE_PURCHASE_REGISTER = 'purchase-register'
  public static ROUTE_PENDING_BANK_RECO = 'pending-bank-reco'
  public static ROUTE_UNSECURED_LOAN= 'unsecured-loan'
  public static ROUTE_PURCHASE_BILL_TO_AVAIL_CD = 'purchase-bills-to-avail-cd'
  public static ROUTE_OUTSTANDING_BALANCE_CONFIRMATION = 'outstanding-balance-confirmation'
  public static ROUTE_STOCK_AUDITING = 'stock-auditing'
  public static ROUTE_PURCHASE_TAX_SUM = 'purchase-tax-sum-report'
  public static ROUTE_SUPPLIER_COMMISSION_REPORT = 'supplier-commission-report'
  public static ROUTE_TDS_REGISTER = 'tds-register'
  public static ROUTE_LEDGER_SCRUTINITY = 'ledger-scrutinity'
  /**
    * All routes corresponding to MonitoringReport
    */


  // public static ROUTE_OUTSTANDING_ABOVE_180_DAYS = 'outstanding-above-180-days'


  /**challan */
  public static ROUTE_DO_QUERY = 'do-query'
  public static ROUTE_USER_INFORMATION_QUICK_MENU = 'user-information-quick-menu'
  public static ROUTE_SITE_MAP = 'site-map'
  static ROUTE_DAMAGE_VALUE: string

  
}
