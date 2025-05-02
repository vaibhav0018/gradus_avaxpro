import { Injectable } from '@angular/core'
import { Menu } from '../../shared/components/menu/menu.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantsServiceAvaxPro {
  /*
   *  Table Constants for entire application
   *
   */
  public static INVALID_GST = 'URP'
  public static DEFAULT_PAGE_SIZE = 50
  public static PAGE_SIZE_ARRAY = [ConstantsServiceAvaxPro.DEFAULT_PAGE_SIZE, 25, 100]
  public static lstPartyOrderRef = ['WEB ORDER', 'VERBAL ORDER', 'EMAIL ORDER','WHATSAPP ORDER' ,'PURCHASE ORDER', 'OTHERS']

  public static PURCHASE_ITEM_CALC_TITLE = 'Purchase Item Calc Calculator'
  public static PURCHASE_DEFAULT_ITEM_CALC = '00002'
  public static PURCHASE_DEFAULT_ITEM_CALC_DESC = 'L.P-DISC-SPL.DISC+EX.DUTY+OCTROI+TAX+LEVY'
  public static PO_GRB_CONSTANT = "GRB";

  public static ITEM_CALC_TITLE = 'Item Calc Calculator'
  public static DEFAULT_ITEM_CALC = '00002'
  public static DEFAULT_ITEM_CALC_DESC = 'L.P-DISC-SPL.DISC+EX.DUTY+OCTROI+TAX+LEVY'

  // added by nitin 
  public static DOC_CALC_TITLE = 'Doc Calc Calculator'
  public static DEFAULT_DOC_CALC = '00127'
  public static DEFAULT_DOC_CALC_DESC = 'NET-DISC+EX.DUTY+FRT+FORWRD+OCT+SERV.CHRG+TAX'

  public static DEFAULT_AMT_FOR_PAN_NO_VALID = '50000';

  public static DEFAULT_USER_DETAILS = '0055'

  public static BRANCH_RIGHTS = 'BRANCH RIGHTS'

  /**
   *  Application Types Ex: Reports, Entry etc.
   */

  // public static ROUTE_MIS_REPORTS = 'mis-reports'
  // public static ROUTE_BUSINESS_REPORTS = 'business-reports'


  public static ROUTE_USER_PROFILE_DISPLAY = 'user-profile-display'
  public static ROUTE_QUICK_MENU = 'quick-menu'
  public static ROUTE_USER_INFORMATION_DISPLAY = 'user-information-view'
  public static ROUTE_REPORTS = 'reports'

  public static ROUTE_ENTRY = 'entry'
  public static ROUTE_MISCELLENEOUS = 'miscellaneous'
  public static ROUTE_MONITORING_REPORTS = 'monitoring-reports'
  // entry module =>stock
  public static ROUTE_STOCK = 'stock'
  // entry module =>proforma
  public static ROUTE_PROFORMA = 'proforma'
  // entry master module =>make master
  public static ROUTE_MASTER = 'master'
  // entry module=>challan
  public static ROUTE_CHALLAN = 'challan'

  // entry module=>quotation
  public static ROUTE_QUOTATION = 'quotation'

  // entry module ==> assembly
  public static ROUTE_ASSEMBLY = 'assembly';

  public static ROUTE_ORDER_REQUEST = 'orderrequest'

  public static ROUTE_COURIER_DETAILS = 'courier-details'
  public static ROUTE_HANDLE_PRODUCTION_WISE_SALES = 'handle-production-wise-sales'

  // pRINTING MODULE ENTRY STARTS HERE ...............................


  /**challan */
  // public static ROUTE_DO_QUERY = 'do-query'

  public static ROUTE_PRINT = 'print'
  public static ROUTE_PRINT_INVOICE = 'invoice'
  public static ROUTE_PRINT_FILTER = 'filter'
  public static ROUTE_PRINT_SERVBILL = 'service-bill'
  public static ROUTE_PRINT_CHEQUE = 'cheque-print'
  public static ROUTE_PRINT_CRNOTE = 'credit-note'
  public static ROUTE_PRINT_DBNOTE = 'debit-note'
  public static ROUTE_PRINT_RCM = 'rcm'
  public static ROUTE_PRINT_AO = 'ao-print'
  public static ROUTE_PRINT_PO = 'po-print'
  public static ROUTE_PRINT_QUOT = 'quot-print'
  public static ROUTE_PRINT_PROF = 'prof-print'
  public static ROUTE_PRINT_CHL = 'challan-print'
  public static ROUTE_PRINT_JV = 'journal-voucher'
  public static ROUTE_PRINT_EXP_BILL = 'expense-bill'
  public static ROUTE_PRINT_CHALLAN = 'challan'
  public static ROUTE_PRINT_HSN = 'hsnsummary'
  public static ROUTE_PRINT_BANKDP = 'bankdeposit'
  public static ROUTE_PRINT_SR = 'stock-receipt'
  public static ROUTE_PRINT_RDB = 'rdb'
  public static ROUTE_PRINT_DO = 'do'
  public static ROUTE_PRINT_GRB = 'grb'
  public static ROUTE_PRINT_GDSLIP = 'godownslip'
  public static ROUTE_PRINT_CASHRP= 'cashreceipt' 
  public static ROUTE_PRINT_CASHPM= 'cashpayment' 
  public static ROUTE_PRINT_BANKSTOCK = 'bankstock'
  public static ROUTE_PRINT_FWNOTE = 'forwarding-note'
  public static ROUTE_PRINT_DPPROF = 'duplicate-proforma'
  public static ROUTE_PRINT_PB = 'purchase-bill-print'
  public static ROUTE_PRINT_DELIVERYNOTE = 'delivery-note-print'



  // END OF PRINT MODULE ENTRYYYYYYYYYYYYYYY=========================


  public static ROUTE_FILE_UPLOAD = 'file-upload'

  public static ROUTE_PO = 'po'
  public static ROUTE_AO = 'ao'
  public static ROUTE_ACCOUNTS = 'accounts'
  /*
   *
   * All routes corresponding to NonSessionModule are Arranged alphabetically
   *
   */
  public static ROUTE_NON_SESSION = 'non-session'
  public static ROUTE_HOME = 'home'
  public static ROUTE_LOGIN = 'login'
  public static ROUTE_DASHBOARD = 'template_home'
  public static ROUTE_DISCREPANCY = 'discrepancy'

  public static ROUTE_BREAKUP = 'breakup'
  public static ROUTE_STOCK_RECEIPT = 'stock-receipt'
  public static ROUTE_CARD_BATCH_COST_MODIFY = 'card-batch-cost-modify'
  public static ROUTE_GRB = 'grb'
  public static ROUTE_SCRAP_LOCATION_CARD_TRANSFER = 'transfer-card-to-scrap-loaction'


  public static ROUTE_QUERY = 'query'
  public static ROUTE_STOCK_QUERY = 'stock-query'
  public static ROUTE_PARTY_QUERY = 'party-query'

  public static ROUTE_AMOUNT_FIND = 'amount-find'
  public static ROUTE_CARD_LEDGER = 'card-ledger'
  public static ROUTE_PACKING_SLIP = 'packing-slip'
  public static ROUTE_RESERVATION = 'reservation'
  /*
   *
   * All routes corresponding to SessionModule are Arranged alphabetically
   *
   */
  /*
 *
 * All routes corresponding to SessionModule are Arranged alphabetically
 *
 */
  public static ROUTE_SESSION = 'session'

  /**
   * All routes corrosponding to Miscleneous Module
   */


  public static ROUTE_MISCELLANEOUS = 'misc'
  public static ROUTE_MISCELLANEOUS_MODULE = 'misc-module'
  public static ROUTE_STOPPAGE_CLEARANCE = 'stoppage-clearance';
  public static ROUTE_PRICE_LIST_UPDATION = 'price-list-updation';
  public static ROUTE_MARKUNMARK_LOCKUNLOCK = 'markunmark-lockunlock-party';
  public static ROUTE_STOCK_LEVEL_UPDATION = 'stock-level-updation';
  public static ROUTE_PACKING_LOT_UPLOAD = 'packing-lot-upload';
  public static ROUTE_ITEM_CODE_MASTER_UPLOAD = 'item-code-master-upload';
  public static ROUTE_REMOVE_ATTACHED_FILES = 'remove-attached-files';
  public static ROUTE_ITEM_GROUP_MODIFICATION = 'item-group-modification';
  public static ROUTE_ITEM_GROUPSTATE_WISE_TAX = 'item-groupstate-wise-tax';
  public static ROUTE_ACCESS_PERMISSION = 'access-permission';
  // public static ROUTE_SHADOW_RIGHTS = 'shadow-right';

  public static ROUTE_USER_ACCESS_PERMISSION = 'user-branch-access-permission';
  public static ROUTE_USR_GRANTS_REPORT = 'single-user-group-wise-grant-report';

  public static ROUTE_CUSTOMER_CREDIT_LIMIT = 'customer-credit-limit-recalculation';
  public static ROUTE_CUSTOMER_PAY_HABIT_UPDATION = 'customer-pay-habit-updation';

  public static ROUTE_CHANGE_INV_SIGNATORIES = 'change-inv-signatories';
  public static ROUTE_CREDIT_LIMIT_UPLOAD = 'credit-limit-upload';
  public static ROUTE_ITEM_CATEGORY_RECALCULATION = 'item-category-recalculation';
  public static ROUTE_OUTSTANDING_BALANCE_CONFIRMATION = 'outstanding-balance-confirmation'
  public static ROUTE_CLOSING_JV_FIN_YEAR = 'jv-closing-menu';


  public static ROUTE_CLOSE_OPEN_PREVMONTH_INV = 'close-open-prev-month-inv-mod';
  public static ROUTE_STOPPAGES_MASTER = 'stoppages-master';

  public static ROUTE_BUDGET_UPLOAD_MODIFICATION = 'budget-upload-modification';

  public static ROUTE_ITEM_MAPPING_MASTER = 'item-mapping-master';
  public static ROUTE_ITEM_CARD_TRANSFER = 'item-card-transfer';
  public static ROUTE_PARTY_ITEM_DISCOUNT_UPLOAD = 'party-item-discount-upload';

  public static ROUTE_PHASE_OUT_ITEMS = 'phase-out-items';



  // public static ROUTE_MISCELLANEOUS = 'miscellaneous'
  public static ROUTE_FINANCIAL_YEAR = 'financial-year'
  public static ROUTE_LIST_OF_NEW_PARTIES = 'list-of-new-parties'
  public static ROUTE_BRANCH_SALES_1 = 'branch-sales-1'
  public static ROUTE_BRANCH_SALES_2 = 'branch-sales-2'
  public static ROUTE_COURIER_SEND_REPORT = 'courier-send-report'


  // public static ROUTE_MonitoringReport

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
  public static ROUTE_AO_PENDING_REPORT = 'ao-pending-report'
  public static ROUTE_GRBS_PENDING_CREDIT_NOTE = 'grbs-pending-credit-note'
  public static ROUTE_DOCUMENT_MADE_BY_USER = 'document-made-by-user'
  public static ROUTE_PENDING_AO_WITH_STOPPAGES_OVER_80_DAYS = 'pending-ao-with-stoppages-over-80-days'
  public static ROUTE_PO_PENDING = 'po-pending'
  public static ROUTE_USER_TRACKING_REPORT = 'user-tracking-report'
  public static ROUTE_IMMEDIATE_PAYMENT_CHALLANS = 'immediate-payment-challans'
  public static ROUTE_ZERO_CARD_COST_REPOET = 'zero-card-cost-report'
  public static ROUTE_MONTHLY_STOCK_VALUATION = 'monthly-stock-valuation'
  public static ROUTE_MARKET_PURCHASE_REPORT = 'market-purchase-report'
  public static ROUTE_CHALLAN_VIOLATION_FOR_CARD_CUTTING = 'challan-violation-for-card-cutting'
  public static ROUTE_CHALLAN_MADE_REPORT = 'challan-made-report'
  public static ROUTE_DELAYED_PAYMENTS = 'delayed-payments'
  public static ROUTE_PARTY_CHALLAN_WISE_PROFIT_LOSS = 'party-challan-wise-profit-loss'
  // public static ROUTE_SAMPLE_CHALLAN = 'sample-challan'
  /*
   *
   * All routes corresponding to MiscelleneousModule are Arranged alphabetically
   *  TRANSPORTER MASTER 
   */

  /* ACCOUNT MASTER */
  public static ROUTE_ACCOUNT_MASTER = 'account-master'
  public static ROUTE_ACCOUNT_MASTER_MENU = 'account-master-menu';
  public static ROUTE_ADD_ACCOUNT = 'add-account'
  /*ITEM MASTER*/
  public static ROUTE_ITEM_MASTER = 'item-master';

  /* PROJECT MASTER */
  public static ROUTE_PROJECT_MASTER_MAINTENANCE='project-master-maintenance'





  public static ROUTE_CUSTOMER_DRAFT_MASTER = 'customer-draft-master'
  public static ROUTE_BALANCE_SHEET_MASTER = 'balance-sheet-master'
  public static ROUTE_MISCELLANEOS_MASTER = 'miscellaneous-master'

  public static ROUTE_MAKE_MASTER = 'make-master'
  public static ROUTE_PHYSICAL_LOCATION_MASTER = 'physical-location-master'
  public static ROUTE_CUSTOMER_BANK_MASTER = 'customer-bank-master'
  public static ROUTE_EXTEND_CUST_SUP_MASTER = 'extend-customer-supplier-master'
  public static ROUTE_TRANSPORTER_MASTER = 'transporter-master'
  // public static ROUTE_MISC_PARTY_MAINTENANCE = 'misc-party-maintenance' menu move to customer_master
  public static ROUTE_BROKER_MASTER = 'broker-master'
  public static ROUTE_BOM_MASTER  = 'bom-master'
  public static ROUTE_UPDATE_PHYSICAL_LOCATION_CARDS  = 'update-physical-location-cards'
public static ROUTE_RATE_CONTRACT_MASTER  = 'rate-contract-master'

  public static ROUTE_HSN_SAC_MASTER = 'hsn-sac-master'
  public static ROUTE_UPDATE_HANDLED_BY = 'update-handled-by'
  public static ROUTE_USER_STOCK_MAPPING = 'user-stock-mapping'
  public static ROUTE_ITEM_MAIN_SUB_GROUP_MASTER = 'item-main-sub-group-master'
  public static ROUTE_BRANCH_TRANSFER_CLOSING_DATES = 'branch-transfer-closing-dates'
  public static ROUTE_CHALLAN_DELIVERY_TERMS_MASTER = 'challan-delivery-terms-master'
  public static ROUTE_FOLLOWUP_ACTION_MASTER = 'followup-action-master'
  public static ROUTE_CONSIGNOR_MASTER = 'consignor-master'
  public static ROUTE_QUOTATION_DELIVERY_TERMS = 'quotation-delivery-terms'
  public static ROUTE_PAY_TERM_MASTER = 'pay-term-master'
  public static ROUTE_MODIFY_PRICE_LIST = 'modify-list-price'
  public static ROUTE_QUANTITY_VARIATION_MASTER = 'quantity-variation-master'
  public static ROUTE_USER_EMAIL_MASTER = 'user-email-master'
  public static ROUTE_SYSTEM_EMAIL_USERS = 'system-email-users'
  public static ROUTE_COMMISSION_ACCOUNTING_CODE = 'commission-accounting-code'
  public static ROUTE_PRODUCT_MAKE_MANAGER = 'product-make-manager'
  public static ROUTE_PO_SR_SUPPLIER_MAPPING = 'po-sr-supplier-mapping'
  public static ROUTE_EXPENSE_MASTER = 'expense-master'
  public static ROUTE_NEW_BANK_MASTER = 'new-bank-master'
  public static ROUTE_INDUSTRY_MASTER = 'industry-master'
  public static ROUTE_CHANGE_PASSWORD = 'change-password'
  public static ROUTE_COUNTRY_STATE_MASTER = 'country-state-master'
  public static ROUTE_OPEN_NEW_GODWON = 'open-new-godown'
  public static ROUTE_UPDATE_DECLARATION = 'update-declaration'
  public static ROUTE_SKIP_EMAIL_FILTER='skip-email-filter'
  public static ROUTE_SAC_MAPPING='sac-mapping';
  public static ROUTE_SALES_ENGINEER_MASTER='sales-engineer-master';

  public static ROUTE_SR_REGISTER_REPORT_FILTER = 'sr-register'
  public static ROUTE_DAMAGE_VALUE_REPORT_FILTER = 'damage-value'

  public static CASH_PAYMENT_LIMIT: number = 20000;
  public static CASH_RECEIPT_LIMIT: number = 50000;
  public static CSH_RECV_AJV_MAXAMT: number = 100;

  // Account Constats
  public static OCTROI = 'E1010';
  public static DAMAGE = 'A1003';
  public static FREIGHT = 'I2008';

  public static FREIGHT_OUTWARD = 'E1009';
  public static MISC = 'A1004';
  public static ROUNDOFF = 'E2054';
  public static PACKAGING = 'E2029';
  public static TCS = 'L52187';
  public static FORWARDING = 'E2018';



  public static MINIMUM_CREDIT_LIMIT: number = 100000;
  public static CREDIT_LIMIT_PERCENTAGE: number = 2.5;

  public static ROUTE_CASH_PAYMENT = 'cash-payment'
  public static ROUTE_CASH_RECEIPT = 'cash-receipt'
  public static ROUTE_JOURNAL = 'journal'

  public static ROUTE_EXPENSE_BILL_ENTRY = 'expense-bill-entry'

  public static ROUTE_FILE_UPLOAD_ACCOUNT = 'file-upload';

  public static ROUTE_RCM = 'rcm'
  public static ROUTE_MAKE_ADJUSTMENT = 'make-adjustment'
  public static ROUTE_SERVICE_BILL = 'service-bill'
  public static ROUTE_CHEQUE_COLLECTION = 'cheque-collection'
  public static ROUTE_CHEQUE_ISSUE = 'cheque-issue'
  public static ROUTE_DEBIT_NOTE = 'debit-note'
  public static ROUTE_CREDIT_NOTE = 'credit-note'
  public static ROUTE_AUTHORISATION = 'authorisation'
  public static ROUTE_CHEQUE_BOUNCE = 'cheque-bounce'
  
  public static ROUTE_EXPENSE_MAPPING = 'expense-mapping'
  
  public static ROUTE_SECURITY_CHEQUE_ENTRY = 'security-cheque-entry-menu'

  public static ROUTE_AUDIT_VOUCHERS = 'audit-vouchers'
  public static ROUTE_UPLOAD_CUST_PAYMENT_TO_CHANNEL_FIANANCIER = 'upload-cust-payment-to-channel-financier'

  public static ROUTE_DOWNLOAD_CHANNEL_FIANANCE = 'download-channel-finance'

  public static TCS_CALCULATION_BASED_ON_COLLECTION = 'tcs-calculation-based-on-collection'
  public static PENDING_LIST_OF_PAYMENTS = 'pending-list-of-payments'

  public static ROUTE_UPDATE_GRN = 'update-grn'


  public static ROUTE_BANK_RECO = 'bank-reco'
  public static ROUTE_PURCHASE_BILL = 'purchase-bill'
  public static ROUTE_BALANCE_SHEET = 'balance-sheet'

  public static ROUTE_FOLLOWUP = 'followup'
  public static ROUTE_AO_PO_QTN_FOLLOWUP = 'ao-po-qtn-followup'
  public static ROUTE_OUTSTANDING_FOLLOWUP = 'outstanding-followup'
  public static ROUTE_DELETE_MANUAL_EXECUTION = 'f-delete-manual-execution'

  public static ROUTE_USER_INFORMATION = 'user-information'
  public static ROUTE_PURCHASE_BILL_TO_AVAIL_CD = 'purchase-bills-to-avail-cd'

  // system-admin
  public static ROUTE_SYSTEM_ADMIN_MODULE = 'system-admin'
  public static ROUTE_OPEN_NEW_FIN_YEAR_MODULE = 'open-new-fin-year'

  

  // public static ROUTE_ADD_CASH_PAYMENT = 'add-cash-payment'
  /**
   * Get UserID from sessionStorage
   */

  public userId: string = atob(sessionStorage.getItem(btoa('id')) || '');
  str: string = atob(sessionStorage.getItem(btoa('user_id')) || '');
  

  public static aryMiscellaneousMenu = [
    new Menu(8000, 'Miscellaneous ', '/session/miscellaneous', null, 'menu', null, true, 0),
    new Menu(8050, 'Miscellaneous ', '/session/miscellaneous/miscellaneous', null, 'library_books', null, true, 8000),
    new Menu(8051, 'Stoppage Clearance ', '/session/misc/misc-module/stoppage-clearance',
      null, 'library_books', null, false, 8050),

    new Menu(8052, 'Price List Updation ', '/session/misc/misc-module/price-list-updation',
      null, 'library_books', null, false, 8050),
    new Menu(8053, 'MarkUnmarkLockUnlockParty ', '/session/misc/misc-module/markunmark-lockunlock-party',
      null, 'library_books', null, false, 8050),

    new Menu(8054, 'Stock Level Upload And Updation ', '/session/misc/misc-module/stock-level-updation',
      null, 'library_books', null, false, 8050),

    new Menu(8055, 'Packing Lot Upload ', '/session/misc/misc-module/packing-lot-upload',
      null, 'library_books', null, false, 8050),

    new Menu(8056, 'Item Code Master Upload ', '/session/misc/misc-module/item-code-master-upload',
      null, 'library_books', null, false, 8050),

    new Menu(8057, 'Remove Attached Files ', '/session/misc/misc-module/remove-attached-files',
      null, 'library_books', null, false, 8050),

    new Menu(8058, 'Item Group Modification ', '/session/misc/misc-module/item-group-modification',
      null, 'library_books', null, false, 8050),

    new Menu(8059, 'Item Group State Wise Tax ', '/session/misc/misc-module/item-groupstate-wise-tax',
      null, 'library_books', null, false, 8050),

    new Menu(8060, 'Access Permission ', '/session/misc/misc-module/access-permission',
      null, 'library_books', null, false, 8050),

    new Menu(8061, 'Close Open Prev Month Invoice Modification ', '/session/misc/misc-module/close-open-prev-month-inv-mod',
      null, 'library_books', null, false, 8050),

    new Menu(8062, 'Stoppages Master ', '/session/misc/misc-module/stoppages-master',
      null, 'library_books', null, false, 8050),

    new Menu(8063, 'Budget Upload Modification ', '/session/misc/misc-module/budget-upload-modification',
      null, 'library_books', null, false, 8050),

    new Menu(8064, 'Item Mapping Master / Extend Item', '/session/misc/misc-module/item-mapping-master',
      null, 'library_books', null, false, 8050),

    new Menu(8065, 'Item Card Transfer', '/session/misc/misc-module/item-card-transfer',
      null, 'library_books', null, false, 8050),

    new Menu(8066, 'Party Item Discount Upload ', '/session/misc/misc-module/party-item-discount-upload',
      null, 'library_books', null, false, 8050),

    new Menu(8067, 'Phase Out Items ', '/session/misc/misc-module/phase-out-items',
      null, 'library_books', null, false, 8050),

    new Menu(8068, 'User Information', '/session/misc/misc-module/' + ConstantsServiceAvaxPro.ROUTE_USER_INFORMATION,
      null, 'library_books', null, false, 8050),

    new Menu(8069, 'User Access Permission', '/session/misc/misc-module/user-branch-access-permission',
      null, 'library_books', null, false, 8050),

    new Menu(8070, 'Customer Credit Limit Recalculation', '/session/misc/misc-module/customer-credit-limit-recalculation',
      null, 'library_books', null, false, 8050),

    new Menu(8071, 'Customer Pay Habit Updation', '/session/misc/misc-module/customer-pay-habit-updation',
      null, 'library_books', null, false, 8050),

    new Menu(8072, 'Change Inv Signatories', '/session/misc/misc-module/change-inv-signatories',
      null, 'library_books', null, false, 8050),

    new Menu(8073, 'Credit Limit Upload', '/session/misc/misc-module/credit-limit-upload',
      null, 'library_books', null, false, 8050),

    new Menu(8074, 'Item Category Recalculation', '/session/misc/misc-module/item-category-recalculation',
      null, 'library_books', null, false, 8050),

      new Menu(8075, 'User Grants Report', '/session/misc/misc-module/single-user-group-wise-grant-report',
      null, 'library_books', null, false, 8050),
  ];
  // public static aryUserProfileMenu = [
  //   new Menu(11000, 'User Profile Display', '/session/user-profile-display', null, 'menu', null, false, 0),
  // ]
  public static aryQuickMenu = [
    new Menu(12000, 'Quick Menu', '/session/quick-menu', null, 'menu', null, true, 0),
    new Menu(12001, 'User Information', '/session/quick-menu/user-information-quick-menu', null, 'library_books', null, false, 12000),
    new Menu(12002, 'Site Map', '/session/quick-menu/site-map', null, 'library_books', null, false, 12000),
  ]


  public static aryEntryMenu = [
    new Menu(1, 'Dashboard', '/template_home/', null, 'dashboard', null, false, 0),
    new Menu(2000, 'Entry', '/session/entry', null, 'menu', null, true, 0),
    new Menu(2401, 'AO', '/session/entry/ao', null, 'view_module', null, false, 2000),
    new Menu(2100, 'Stock', '/session/entry/stock', null, 'view_module', null, true, 2000),
    new Menu(2200, 'Challan', '/session/entry/challan', null, 'view_module', null, false, 2000),
    // new Menu(2201, 'Packing Slip', '/session/entry/challan/packing-slip', null, 'library_books', null, false, 2200),
    new Menu(2300, 'PO', '/session/entry/po/', null, 'view_module', null, false, 2000),
    // new Menu(2301, 'ADD PO', '/session/entry/po/pofilterpage', null, 'report_page', null, false, 2300),
    new Menu(2101, 'Discrepancy', '/session/entry/stock/discrepancy', null, 'library_books', null, false, 2100),
    new Menu(2102, 'Breakup', '/session/entry/stock/breakup', null, 'library_books', null, false, 2100),
    new Menu(2102, 'Stock Receipt', '/session/entry/stock/stock-receipt', null, 'library_books', null, false, 2100),
    new Menu(2103, 'Card Batch Cost Modify', '/session/entry/stock/card-batch-cost-modify', null, 'library_books', null, false, 2100),
    new Menu(2104, 'G.R.B.', '/session/entry/stock/grb', null, 'library_books', null, false, 2100),
    //  new Menu(2105, 'Taransfer Card To Scrap Location.', '/session/entry/stock/transfer-card-to-scrap-loaction', null, 'library_books', null, false, 2100),
    new Menu(2400, 'Accounts', '/session/entry/accounts', null, 'library_books', null, true, 2000),
    new Menu(2401, 'Cash Payment', '/session/entry/accounts/cash-payment', null, 'library_books', null, false, 2400),
    new Menu(2402, 'Cash Receipt', '/session/entry/accounts/cash-receipt', null, 'library_books', null, false, 2400),
    new Menu(2400, 'Proforma', '/session/entry/proforma', null, 'library_books', null, false, 2000),
    new Menu(2403, 'Journal', '/session/entry/accounts/journal', null, 'library_books', null, false, 2400),
    new Menu(2404, 'Expense Bill Entry', '/session/entry/accounts/expense-bill-entry', null, 'library_books', null, false, 2400),
    new Menu(2499, 'File Upload', '/session/entry/accounts/file-upload', null, 'library_books', null, false, 2400),
    new Menu(2405, 'RCM', '/session/entry/accounts/rcm', null, 'library_books', null, false, 2400),
    new Menu(2406, 'Make Adjustment', '/session/entry/accounts/make-adjustment', null, 'library_books', null, false, 2400),
    new Menu(2407, 'Service Bill', '/session/entry/accounts/service-bill', null, 'library_books', null, false, 2400),
    new Menu(2408, 'Cheque Collection', '/session/entry/accounts/cheque-collection', null, 'library_books', null, false, 2400),
    new Menu(2409, 'Bank Reconcilation', '/session/entry/accounts/bank-reco', null, 'library_books', null, false, 2400),
    new Menu(2300, 'Quotation', '/session/entry/quotation', null, 'library_books', null, false, 2000),
    new Menu(2500, 'Order Request', '/session/entry/orderrequest', null, 'library_books', null, false, 2000),
    new Menu(2409, 'Cheque Issue', '/session/entry/accounts/cheque-issue', null, 'library_books', null, false, 2400),
    new Menu(2410, 'Debit Note', '/session/entry/accounts/debit-note', null, 'library_books', null, false, 2400),
    new Menu(2411, 'Credit Note', '/session/entry/accounts/credit-note', null, 'library_books', null, false, 2400),
    new Menu(2412, 'Authorisation', '/session/entry/accounts/authorisation', null, 'library_books', null, false, 2400),
    new Menu(2413, 'Cheque Bounce Entry', '/session/entry/accounts/cheque-bounce', null, 'library_books', null, false, 2400),
    new Menu(2414, 'Expense Mapping For Sales And Purchase', '/session/entry/accounts/expense-mapping', null, 'library_books', null, false, 2400),
    new Menu(2415, 'Purchase Bill', '/session/entry/accounts/purchase-bill', null, 'library_books', null, false, 2400),
    new Menu(2600, 'Courier Details', '/session/entry/courier-details', null, 'library_books', null, false, 2000),
    new Menu(2416, 'Balance Sheet', '/session/entry/accounts/balance-sheet', null, 'library_books', null, false, 2400),

    new Menu(2417, 'Security Cheque Entry', '/session/entry/accounts/security_cheque_entry', null, 'library_books', null, false, 2400),

  ]


  // public static aryEntryChallan = [
  // new Menu(2200, 'Challan', '/session/entry/challan', null, 'view_module', null, true, 2000),


  public static aryMasterMenu = [
    new Menu(3000, 'Master', '/session/master', null, 'menu', null, true, 0),
    new Menu(3100, 'Miscellaneous Master', '/session/master/miscellaneous-master', null, 'library_books', null, true, 3000),
    new Menu(9000, 'Customer/Supplier/Vendor Master', '/session/master/customer-draft-master', null, 'library_books', null, false, 3000),

    // new Menu(3200, 'Account Master', '/session/master/account-master/account-master-menu', null, 'library_books', null, false, 3000),
    new Menu(3200, 'Account Master', '/session/master/account-master-menu', null, 'library_books', null, false, 3000),
    new Menu(3300, 'Item Master', '/session/master/item-master', null, 'library_books', null, false, 3000),
    // new Menu(3201, 'Add Account ', '/session/master/account-master/add-account', null, 'report_page', null, false, 3200),


    new Menu(3101, 'Make Master', '/session/master/miscellaneous-master/make-master', null, 'report_page', null, false, 3100),
    new Menu(3102, 'Customer Bank  Master', '/session/master/miscellaneous-master/customer-bank-master', null, 'report_page', null, false, 3100),
    new Menu(3103, 'Physical Location Master', '/session/master/miscellaneous-master/physical-location-master', null, 'report_page', null, false, 3100),
    new Menu(3104, 'Extend Customer/Supplier', '/session/master/miscellaneous-master/extend-customer-supplier-master', null, 'report_page', null, false, 3100),
    new Menu(3105, 'Transporter Master', '/session/master/miscellaneous-master/transporter-master', null, 'report_page', null, false, 3100),
    // menu is added in customer/supplier/vendor_master
    // new Menu(3106, 'Misc. Party Maintenance', '/session/master/miscellaneous-master/misc-party-maintenance', null, 'report_page', null, false, 3100),

    new Menu(3107, 'Broker Master', '/session/master/miscellaneous-master/broker-master', null, 'report_page', null, false, 3100),
    new Menu(3108, 'HSN / SAC Master', '/session/master/miscellaneous-master/hsn-sac-master', null, 'report_page', null, false, 3100),
    new Menu(3109, 'Update Handled By', '/session/master/miscellaneous-master/update-handled-by', null, 'report_page', null, false, 3100),
    new Menu(3110, 'Stock GW / Stock Query Control', '/session/master/miscellaneous-master/user-stock-mapping', null, 'report_page', null, false, 3100),
    new Menu(3111, 'Item Main Sub Group Master', '/session/master/miscellaneous-master/item-main-sub-group-master', null, 'report_page', null, false, 3100),
    new Menu(3112, 'Branch Transfer Closing Dates', '/session/master/miscellaneous-master/branch-transfer-closing-dates', null, 'report_page', null, false, 3100),
    new Menu(3113, 'Challan Delievery Terms Master', '/session/master/miscellaneous-master/challan-delivery-terms-master', null, 'report_page', null, false, 3100),
    new Menu(3114, 'Followup Action Master', '/session/master/miscellaneous-master/followup-action-master', null, 'report_page', null, false, 3100),
    new Menu(3115, 'Consignor Master', '/session/master/miscellaneous-master/consignor-master', null, 'report_page', null, false, 3100),
    new Menu(3116, 'Quotation Delivery Terms', '/session/master/miscellaneous-master/quotation-delivery-terms', null, 'report_page', null, false, 3100),
    new Menu(3117, 'Pay Term Master', '/session/master/miscellaneous-master/pay-term-master', null, 'report_page', null, false, 3100),
    new Menu(3118, 'Modify Price List', '/session/master/miscellaneous-master/modify-list-price', null, 'report_page', null, false, 3100),
    new Menu(3119, 'Quantity Variation Master', '/session/master/miscellaneous-master/quantity-variation-master', null, 'report_page', null, false, 3100),
    new Menu(3120, 'User Email Master', '/session/master/miscellaneous-master/user-email-master', null, 'report_page', null, false, 3100),
    new Menu(3121, 'System Email Users', '/session/master/miscellaneous-master/system-email-users', null, 'report_page', null, false, 3100),
    new Menu(3122, 'Commission Accounting Codes', '/session/master/miscellaneous-master/commission-accounting-code', null, 'report_page', null, false, 3100),
    new Menu(3123, 'Product Make Manager', '/session/master/miscellaneous-master/product-make-manager', null, 'report_page', null, false, 3100),
    new Menu(3124, 'Po/Sr Supplier Mapping', '/session/master/miscellaneous-master/po-sr-supplier-mapping', null, 'report_page', null, false, 3100),
    new Menu(3125, 'Debit Note / Credit Note Expense Master', '/session/master/miscellaneous-master/expense-master', null, 'report_page', null, false, 3100),
    new Menu(3126, 'Open New Bank In Branch', '/session/master/miscellaneous-master/new-bank-master', null, 'report_page', null, false, 3100),
    new Menu(3127, 'Industry Master', '/session/master/miscellaneous-master/industry-master', null, 'report_page', null, false, 3100),
    new Menu(3128, 'Change Password', '/session/master/miscellaneous-master/change-password', null, 'report_page', null, false, 3100),
    new Menu(3129, 'Country/State Master', '/session/master/miscellaneous-master/country-state-master', null, 'report_page', null, false, 3100),
    new Menu(3130, 'Open New Godwon', '/session/master/miscellaneous-master/open-new-godown', null, 'report_page', null, false, 3100),
    new Menu(3131, 'Update Declaration', '/session/master/miscellaneous-master/update-declaration', null, 'report_page', null, false, 3100),
    new Menu(3132, 'Skip Email Filter', '/session/master/miscellaneous-master/skip-email-component/skip-email-filter', null, 'report_page', null, false, 3100),
  ]


  public static aryStockReport = [
    // new Menu(5001, 'Damage Value', '/session/reports/stock-report/damage-value', null, 'library_books', null, false, 1100),
  ]

  public static aryMISReport = [
    new Menu(1600, 'Mis Reports', '/session/reports/mis-reports', null, 'library_books', null, true, 1000),
    new Menu(1601, 'Business Reports', '/session/reports/mis-reports/business-reports', null, 'library_books', null, false, 1600),
    new Menu(1602, 'Monthly Sales Wise Search', '/session/reports/mis-reports/monthly-sales-wise-search', null, 'library_books', null, false, 1600),
    new Menu(1602, 'Profit And Loss', '/session/reports/mis-reports/profit-and-loss', null, 'library_books', null, false, 1600),
    new Menu(1603, 'Inventory Details', '/session/reports/mis-reports/inventory-details', null, 'library_books', null, false, 1600),

    
  ]


  public static arySalesTaxReport = [
    new Menu(1800, 'Sales Tax Reports', '/session/reports/sales-tax-reports', null, 'library_books', null, true, 1000),
    new Menu(1801, 'Monthly C-Form Collection', '/session/reports/sales-tax-reports/monthly-c-form-collection', null, 'library_books', null, false, 1800),
    new Menu(1802, 'Invoice Party Wise CST Report', '/session/reports/sales-tax-reports/party-wise-cst-report', null, 'library_books', null, false, 1800),
    new Menu(1803, 'GST Sales Register', '/session/reports/sales-tax-reports/gst-sales-register', null, 'library_books', null, false, 1800),
    new Menu(1804, 'GST Purchase Register', '/session/reports/sales-tax-reports/gst-purchase-register', null, 'library_books', null, false, 1800),
    new Menu(1805, 'GST Credit Note Register', '/session/reports/sales-tax-reports/gst-credit-note-register', null, 'library_books', null, false, 1800),
    new Menu(1806, 'GST Debit Note Register', '/session/reports/sales-tax-reports/gst-debit-note-register', null, 'library_books', null, false, 1800),
    new Menu(1807, 'Hsn Summary (GSTR1-12)', '/session/reports/sales-tax-reports/hsn-summary-report', null, 'library_books', null, false, 1800),
    new Menu(1808, 'Document Summary (GSTR1-13)', '/session/reports/sales-tax-reports/document-summary-report', null, 'library_books', null, false, 1800),
    new Menu(1809, 'Inward For RCM', '/session/reports/sales-tax-reports/inward-for-rcm-report', null, 'library_books', null, false, 1800),
    new Menu(1810, 'Inward For Service', '/session/reports/sales-tax-reports/inward-for-service', null, 'library_books', null, false, 1800),
    new Menu(1811, 'Sale Tax Pending/Received Search Report', '/session/reports/sales-tax-reports/sale-tax-pending-received-search-report', null, 'library_books', null, false, 1800),

  ]

  public static aryPlanningReport = [
    new Menu(1900, 'Planning Reports', '/session/reports/planning-reports', null, 'library_books', null, true, 1000),
    new Menu(1901, 'Stock Planning', '/session/reports/planning-reports/stock-planning', null, 'library_books', null, false, 1900),
    new Menu(1902, 'Stock Movement', '/session/reports/planning-reports/stock-movement', null, 'library_books', null, false, 1900),
  ]

  public static aryQueryMenu = [
    new Menu(6000, 'Query', '/session/query', null, 'menu', null, true, 0),
    new Menu(6100, 'Stock Query', '/session/query/stock-query', null, 'library_books', null, false, 6000),
    new Menu(6101, 'Party Query', '/session/query/party-query', null, 'library_books', null, false, 6000),
    new Menu(6200, 'Amount Find', '/session/query/amount-find', null, 'library_books', null, false, 6000),
    new Menu(6102, 'Card Ledger', '/session/query/card-ledger', null, 'library_books', null, false, 6000),
  ]

  public static aryPrintingMenu =
    [

      new Menu(4000, 'Print', '/session/print', null, 'menu', null, true, 0),
      new Menu(4001, 'Invoice', '/session/print/invoice/filter', null, 'print', null, false, 4000),
      new Menu(4002, 'Serivce Bill.', '/session/print/service-bill/filter', null, 'print', null, false, 4000),
      new Menu(4003, 'Cheque Print.', '/session/print/cheque-print/filter', null, 'print', null, false, 4000),
      new Menu(4004, 'Debit Note.', '/session/print/debit-note/filter', null, 'print', null, false, 4000),
      new Menu(4005, 'Credit Note.', '/session/print/credit-note/filter', null, 'print', null, false, 4000),
      new Menu(4006, 'Journal Voucher.', '/session/print/journal-voucher/filter', null, 'print', null, false, 4000),
      new Menu(4007, 'Expense Bill.', '/session/print/expense-bill/filter', null, 'print', null, false, 4000),
      new Menu(4008, 'PO', '/session/print/po-print/filter', null, 'print', null, false, 4000),
      new Menu(4009, 'AO', '/session/print/ao-print/filter', null, 'print', null, false, 4000),
      new Menu(4010, 'Challan.', '/session/print/challan-print/filter', null, 'print', null, false, 4000),
      new Menu(4011, 'Dispatch Order', '/session/print/do/filter', null, 'print', null, false, 4000),
      new Menu(4012, 'Quotation', '/session/print/quot-print/filter', null, 'print', null, false, 4000),
      new Menu(4013, 'Proforma', '/session/print/prof-print/filter', null, 'print', null, false, 4000),
      new Menu(4014, 'HSN Summary', '/session/print/hsnsummary/filter', null, 'print', null, false, 4000),
      new Menu(4015, 'Bank Deposit Slip', '/session/print/bankdeposit/filter', null, 'print', null, false, 4000),
      new Menu(4016, 'Journal Voucher.', '/session/print/journal-voucher/filter', null, 'print', null, false, 4000),
      new Menu(4017, 'RCM', '/session/print/rcm/filter', null, 'print', null, false, 4000),
      new Menu(4018, 'RDB', '/session/print/rdb/filter', null, 'print', null, false, 4000),
      new Menu(4019, 'GRB', '/session/print/grb/filter', null, 'print', null, false, 4000),
      new Menu(4020, 'Godown Card Slip', '/session/print/godownslip/filter', null, 'print', null, false, 4000),
      new Menu(4021, 'Cash Receipt', '/session/print/cashreceipt/filter', null, 'print', null, false, 4000),
      new Menu(4022, 'Bank Stock Statement', '/session/print/bankstock/filter', null, 'print', null, false, 4000),
      new Menu(4023, 'Duplicate Proforma', '/session/print/duplicate-proforma/filter', null, 'print', null, false, 4000),
      new Menu(4024, 'Forwarding Note', '/session/print/forwarding-note/filter', null, 'print', null, false, 4000),
      new Menu(4025, 'Stock Receipt ( SR ) ', '/session/print/stock-receipt/filter', null, 'print', null, false, 4000)

    ];



  public static aryReportMenu = [

    new Menu(1000, 'Reports', '/session/reports', null, 'menu', null, true, 0),
    new Menu(
      1100,
      'Stock Reports',
      '/session/reports/stock-report/stock-less-than-n-quantity',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    // new Menu(201, 'Stock Report', '/session/report', null, 'library_books', null, false, 0),
    new Menu(
      1112,
      'Godown Item Make Wise Stock Movement',
      '/session/reports/stock-report/item-wise-stock-movement-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),

    new Menu(
      1110,
      'Godown Stock Banking',
      '/session/reports/stock-report/godown-stock-banking-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1102,
      'Godown Wise Stock Status',
      '/session/reports/stock-report/godown-wise-stock-status-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1103,
      'Item Ledger',
      '/session/reports/stock-report/item-ledger',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1104,
      'Stock Gateway',
      '/session/reports/stock-report/stock-gateway',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1101,
      'Stock Less Than N Quantity',
      '/session/reports/stock-report/stock-less-than-n-quantity',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1107,
      'Stock Transfer',
      '/session/reports/stock-report/stock-transfer-report',
      null,
      'library_books',
      null,
      false,
      1100
    ),

    new Menu(
      1111,
      'Stock Over N Days',
      '/session/reports/stock-report/stock-over-n-days-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),

    new Menu(
      1105,
      'Date wise Stock Value',
      '/session/reports/stock-report/date-wise-stock-value',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1106,
      'Discrepancy Search',
      '/session/reports/stock-report/discrepancy-search-report',
      null,
      'library_books',
      null,
      false,
      1100
    ),

    new Menu(
      1108,
      'SR/DC',
      '/session/reports/stock-report/sr-dc-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1109,
      'GD Physical Location Status',
      '/session/reports/stock-report/gd-physical-location-status',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1110,
      'Stock Valuation',
      '/session/reports/stock-report/stock-valuation-report-filter',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1111,
      'GodownWise Stock With Stock Level',
      '/session/reports/stock-report/gd-wise-stock-with-stock-level',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(
      1116,
      'Sr Register',
      '/session/reports/stock-report/sr-register',
      null,
      'library_books',
      null,
      false,
      1100
    ),
    new Menu(1115, 'Damage Value', '/session/reports/stock-report/damage-value', null, 'library_books', null, false, 1100),
    new Menu(
      1200,
      'Miscellaneous Reports',
      '/session/reports/miscellaneous',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    new Menu(
      1201,
      'Financial Year',
      '/session/reports/miscellaneous/financial-year',
      null,
      'library_books',
      null,
      false,
      1200
    ),
    new Menu(
      1202,
      'List Of New Parties',
      '/session/reports/miscellaneous/list-of-new-parties',
      null,
      'library_books',
      null,
      false,
      1200
    ),
    new Menu(
      1203,
      'Branch Sales 1',
      '/session/reports/miscellaneous/branch-sales-1',
      null,
      'library_books',
      null,
      false,
      1200
    ),

    new Menu(
      1204,
      'Branch Sales 2',
      '/session/reports/miscellaneous/branch-sales-2',
      null,
      'library_books',
      null,
      false,
      1200
    ),
    new Menu(
      1205,
      'Courier Send Report',
      '/session/reports/miscellaneous/courier-send-report',
      null,
      'library_books',
      null,
      false,
      1200
    ),
    new Menu(
      1206,
      'Accounting Module',
      '/session/reports/miscellaneous/accounting-module-report',
      null,
      'library_books',
      null,
      false,
      1200
    ),
    new Menu(
      1300,
      'Challan Reports',
      '/session/reports/challan-reports',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    new Menu(
      1312,
      'Cancelled Challan',
      '/session/reports/challan-reports/cancelled-challan',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1313,
      'AO Register',
      '/session/reports/challan-reports/ao-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1314,
      'PolyCab Account',
      '/session/reports/challan-reports/polycab-acc',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1315,
      'Broker Wise Sales',
      '/session/reports/challan-reports/broker-wise-sales',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1311,
      'PO Register',
      '/session/reports/challan-reports/po-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1301,
      'Tax Summary',
      '/session/reports/challan-reports/tax-summary',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1302,
      'Stock Transfer Register',
      '/session/reports/challan-reports/stock-transfer-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1303,
      'Sales Summary',
      '/session/reports/challan-reports/sales-summary',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1304,
      'Unbilled Document',
      '/session/reports/challan-reports/unbilled-document',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1302,
      'Party Challan Item Wise',
      '/session/reports/challan-reports/party-challan-item-wise',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1305,
      'Sample Challan',
      '/session/reports/challan-reports/sample-challan',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1306,
      'Sales Register',
      '/session/reports/challan-reports/sales-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1307,
      'Quotation Register',
      '/session/reports/challan-reports/quotation-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1308,
      'Party Clearance',
      '/session/reports/challan-reports/party-clearance',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1309,
      'Proforma Register',
      '/session/reports/challan-reports/proforma-register',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1310,
      'Do/Pts',
      '/session/reports/challan-reports/do-pts',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1311,
      'Cash Memo Report',
      '/session/reports/challan-reports/cash-memo',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1312,
      'GSC Challan Clearance Report',
      '/session/reports/challan-reports/gsc-challan-clearance-report',
      null,
      'library_books',
      null,
      false,
      1300
    ),
    new Menu(
      1400,
      'Monthly Sales Analysis Reports',
      '/session/reports/monthly-sales-analysis-reports',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    new Menu(
      1401,
      'Branch HandledBy Wise Sales',
      '/session/reports/monthly-sales-analysis-reports/branch-handled-by-wise-daily-sales',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1402,
      'Item Group/Document Wise Analysis',
      '/session/reports/monthly-sales-analysis-reports/document-wise-data',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1403,
      'Broker Wise Outstanding',
      '/session/reports/monthly-sales-analysis-reports/broker-wise-outstanding',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1404,
      'Item Group Wise yearly Sales',
      '/session/reports/monthly-sales-analysis-reports/item-group-wise-yearly-sales',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1405,
      'State Party Yearly Sales',
      '/session/reports/monthly-sales-analysis-reports/state-party-yearly-sales',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1406,
      'Party Wise Monthly Sales Analysis',
      '/session/reports/monthly-sales-analysis-reports/party-wise-monthly-sales-analysis',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1407,
      'Daily Sales with GP',
      '/session/reports/monthly-sales-analysis-reports/daily-sales-with-gp',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1408,
      'RH GRP Monthly Sales Report',
      '/session/reports/monthly-sales-analysis-reports/rh-grp-mnthly-bdgt-sls',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1409,
      'Gateway Report',
      '/session/reports/monthly-sales-analysis-reports/gateway-report',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1410,
      'Handle/Production Wise Sales Report',
      '/session/reports/monthly-sales-analysis-reports/handle-production-wise-sales',
      null,
      'library_books',
      null,
      false,
      1400
    ),
    new Menu(
      1500,
      'Account Reports',
      '/session/reports/account-reports',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    new Menu(
      1501,
      'Cheque Bounce',
      '/session/reports/account-reports/cheque-bounce',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1502,
      'Cash Book',
      '/session/reports/account-reports/cash-book',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1503,
      'Bank Book',
      '/session/reports/account-reports/bank-book',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1504,
      'Cheque Issue Register',
      '/session/reports/account-reports/cheque-issue-register',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1505,
      'Expense Bill Register',
      '/session/reports/account-reports/expense-bill-register',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1505,
      'PDC Collected Pending Deposit',
      '/session/reports/account-reports/pdc-clctd-pndng-dpst',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1506,
      'PDC Issued Pending Clearance',
      '/session/reports/account-reports/pdc-issued-pndng-clrnce',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1507,
      'Collection Register',
      '/session/reports/account-reports/collection-register',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1508,
      'Account Ledger',
      '/session/reports/account-reports/account-ledger',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1509,
      'Os Report For Banking',
      '/session/reports/account-reports/os-report-for-banking',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1510,
      'Outstanding Above N Amount',
      '/session/reports/account-reports/outstanding-above-n-amount',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1511,
      'Security Cheque Report',
      '/session/reports/account-reports/security-cheque-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1512,
      'General Register Report',
      '/session/reports/account-reports/general-register-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1513,
      'RDB Credit Note Above X Perc Report',
      '/session/reports/account-reports/rdb-credit-note-above-x-perc',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1514,
      'Search Pending RDB(CHEQUE COLLECTION)',
      '/session/reports/account-reports/search-pending-rdb',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1515,
      'Trial Balance Report',
      '/session/reports/account-reports/trial-balance-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1516,
      'Creditors/Debtors Ageing Report',
      '/session/reports/account-reports/creditors-debtors-ageing-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),

    new Menu(
      1517,
      'Total Collection Report',
      '/session/reports/account-reports/total-collection-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1518,
      'On Account Collections Pending Adjustment',
      '/session/reports/account-reports/on-acc-collection-pending-adjustment-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1519,
      'Purchase Report With OS And Payment',
      '/session/reports/account-reports/purchase-report-with-os',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1520,
      'Purchase Register',
      '/session/reports/account-reports/purchase-register',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1521,
      'Purchase Bill To Avail CD',
      '/session/reports/account-reports/purchase-bills-to-avail-cd',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1522,
      'Supplier Commission Report',
      '/session/reports/account-reports/supplier-commission-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1523,
      'Outstanding Balance Confirmation',
      '/session/reports/account-reports/outstanding-balance-confirmation',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1524,
      'Stock Auditing Report',
      '/session/reports/account-reports/stock-auditing',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1525,
      'Purchase Tax Sum Report',
      '/session/reports/account-reports/purchase-tax-sum-report',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1526,
      'Tds Register',
      '/session/reports/account-reports/tds-register',
      null,
      'library_books',
      null,
      false,
      1500
    ),
    new Menu(
      1700,
      'Monitoring Reports',
      '/session/reports/monitoring-reports',
      null,
      'library_books',
      null,
      true,
      1000
    ),
    new Menu(
      1701,
      'Outstanding Above 120 Days',
      '/session/reports/monitoring-reports/outstanding-above-120-days',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1702,
      'Outstanding Above 180 Days',
      '/session/reports/monitoring-reports/outstanding-above-180-days',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1703,
      'Item Make Branch Wise Os Search',
      '/session/reports/monitoring-reports/item-make-branch-wise-os-search',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1704,
      'Weekly Quotation Data 1',
      '/session/reports/monitoring-reports/weekly-quotation-data-1',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1705,
      'Weekly Quotation Data 2',
      '/session/reports/monitoring-reports/weekly-quotation-data-2',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1706,
      'List Of AOS Executed Search Page',
      '/session/reports/monitoring-reports/list-of-aos-execut-search',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1707,
      'Cost Center Search Page ',
      '/session/reports/monitoring-reports/cost-center-analysis',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1708,
      'SRS/PTSS Pending Purchase ',
      '/session/reports/monitoring-reports/list-of-srs-ptss-pending-purchase',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1709,
      'GSC Challan Pending Sr ',
      '/session/reports/monitoring-reports/gsc-challan-pending-sr',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1710,
      'Quotation Lost Report',
      '/session/reports/monitoring-reports/quotation-lost-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1711,
      'Ao Pending Report',
      '/session/reports/monitoring-reports/ao-pending-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1712,
      'List Of GRBs Pending Credit Note Report',
      '/session/reports/monitoring-reports/grbs-pending-credit-note',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1713,
      'Document Made By Different Users Report',
      '/session/reports/monitoring-reports/document-made-by-user',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1714,
      'List Of Pending Aos With Stoppages Over 80 Days Report',
      '/session/reports/monitoring-reports/pending-ao-with-stoppages-over-80-days',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1715,
      'POs Pending Authorization Report',
      '/session/reports/monitoring-reports/po-pending',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1716,
      'User Tracking Report',
      '/session/reports/monitoring-reports/user-tracking-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1717,
      'Immediate Payment Challans Report',
      '/session/reports/monitoring-reports/immediate-payment-challans',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1718,
      'Zero Card Cost Report',
      '/session/reports/monitoring-reports/zero-card-cost-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1719,
      'Monthly Stock Valuation Report',
      '/session/reports/monitoring-reports/monthly-stock-valuation',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1720,
      'Market Purchase Report',
      '/session/reports/monitoring-reports/market-purchase-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1721,
      'Challan Violation For Card Cutting Report',
      '/session/reports/monitoring-reports/challan-violation-for-card-cutting',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1722,
      'Challan Made Report',
      '/session/reports/monitoring-reports/challan-made-report',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1723,
      'Delayed Payments Report',
      '/session/reports/monitoring-reports/delayed-payments',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1724,
      'Purchase And Its Disposal Report',
      '/session/reports/monitoring-reports/purchase-and-its-disposal',
      null,
      'library_books',
      null,
      false,
      1700
    ),
    new Menu(
      1725,
      'Party Challan Wise Profit/Loss Report',
      '/session/reports/monitoring-reports/party-challan-wise-profit-loss',
      null,
      'library_books',
      null,
      false,
      1700
    ),

  ]

  public static aryFollowupMenu = [
    new Menu(7000, 'Followup', '/session/followup', null, 'menu', null, true, 0),
    new Menu(7100, 'AO PO QTN FOLLOWUP', '/session/followup/ao-po-qtn-followup', null, 'library_books', null, false, 7000),
    new Menu(7101, 'OUTSTANDING FOLLOWUP', '/session/followup/outstanding-followup', null, 'library_books', null, false, 7000),
    new Menu(7102, 'DELETE MANUAL EXECUTION', '/session/followup/f-delete-manual-execution', null, 'library_books', null, false, 7000),
  ]

  // added by nitin -- 09-03-20
  public static MONTH_LIST: any =
    [
      { "mon": "JAN", "monIndex": 1 },
      { "mon": "FEB", "monIndex": 2 },
      { "mon": "MAR", "monIndex": 3 },
      { "mon": "APR", "monIndex": 4 },
      { "mon": "MAY", "monIndex": 5 },
      { "mon": "JUN", "monIndex": 6 },
      { "mon": "JUL", "monIndex": 7 },
      { "mon": "AUG", "monIndex": 8 },
      { "mon": "SEP", "monIndex": 9 },
      { "mon": "OCT", "monIndex": 10 },
      { "mon": "NOV", "monIndex": 11 },
      { "mon": "DEC", "monIndex": 12 }
    ];

  // added by nitin -- 18-09-2020
  public static ACCOUNT_DOC_TYPE: any =
    [
      { "desc": "JOURNAL", "index": 1 },
      { "desc": "DEBIT NOTES", "index": 2 },
      { "desc": "CHEQUE ISSUED", "index": 3 },
      { "desc": "CHEQUE COLLECTION", "index": 4 },
      { "desc": "CASH RECEIPT", "index": 5 },
      { "desc": "CASH PAYMENT", "index": 6 },
      { "desc": "BILL RECEIPT", "index": 7 },
      { "desc": "CHEQUE BOUNCE", "index": 8 },
      { "desc": "CREDIT NOTES", "index": 9 },
      { "desc": "EXPENSEPURCHASE", "index": 10 },
      { "desc": "SERVICE BILL", "index": 11 },
    ];


}
