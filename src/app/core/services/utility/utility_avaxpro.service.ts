import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { ItemServiceAvaxPro } from '../utilities/item_avaxpro.service';
import { CommonsService } from '../../../feature/session/entry/commons/commons.service';
import { UserxService } from '../utilities/userx.service';
import { UomService } from '../utilities/uom.service';
import { ChallanService } from '../utilities/challan.service';
import { PhysicalLocationMasterService } from '../utilities/physical-location-master.service';
import { ExtendCustomerSupplierMasterService } from '../utilities/extend-customer-supplier-master.service';
import { StockQueryService } from '../utilities/stock-query.service';
import { TransporterMasterService } from '../utilities/transporter-master.service';
import { MiscPartyMaintenanceServiceService } from '../utilities/misc-party-maintanence-service.service';
import { StockReceiptMenuService } from '../utilities/stock-receipt-menu.service';
import { UpdateHandledByService } from '../utilities/update-handle-by.service';
import { UserStockMappingService } from '../utilities/user-stock-mapping.service';
import { BranchTransferClosingDatesService } from '../utilities/branch-transfer-closing-date.service';
import { ChallanDeliveryTermsMasterService } from '../utilities/challan-delivery-terms-master.service';
import { MasterService } from '../utilities/master.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';



const GET_SPECIAL_TAX = 'getspecialtax'
const GET_BROKER_LIST = 'getbrokerlistss'
const SEARCH_PARTY = 'searchPartyList'

const GET_FILE_DESCRIPTION = 'getfiledescription'
const GET_ACCOUNT_LIST_FOR_URL = 'getcashpaymentacclist'
const GET_ACCOUNT_PAYMENT_VALIDATION_URL = 'getacclimitvalidation'
const GET_SUB_JV_LIST_FOR_URL = 'getsubjvlist'
const GET_CHEQUE_BOUNS_LIST_FOR_URL = 'getchqbounsreasonsList'
const GET_ACTION_LIST_FOR_URL = 'getactionlist'
const GET_COST_CENTER_LIST_FOR_URL = 'getcostcenterlist'
const GET_ACCOUNT_VENDOR_LIST_FOR_URL = 'getaccvendorlist'
const GET_EXCISE_TARIFF_LIST_FOR_URL = 'getextariifdata'
const GET_EXCISE_TARIFF_TAX_LIST_FOR_URL = 'getaxlistforexbill'
const GET_OTHER_INFO_COMMON_LIST = 'getotherinfocommonlist'

const GET_VENDOR_AMOUNT_LIST = 'getvendoramountdeatils'
const GET_ACCOUNT_ADDRESS_LIST = 'getcustomeraddresslist'
const GET_HSN_TAX_LIST_URL = 'gethsntaxlist'
const GET_SISCON_BANK_LIST_URL = 'getsisconbanklist'
const GET_FOLLOWED_BY_ACCOUNT = 'getfollowedbyforaccount'
const POST_CHEQUE_DATA = 'getchqbounslist'

const PARTY_SECURITY_CHEQUE_DETAILS = 'partySecurityChequeDtl'

const GET_COST_CENTER_LIST_URL = 'getcashpaymentcostcenterlist'

const GET_LOGIN_COST_CENTER_LIST_FOR_URL = 'getlogincostcenterlist'
const GET_OTHER_COST_CENTER_LIST_FOR_URL = 'getothercostcenterlist'
const GET_COST_CENTER_LIST_BY_BRANCH = 'getCostCentListByBranch'
const GET_ROLE_LIST = 'getRoleList'
//const GET_CHEQUE_ISSUE_ACCOUNT_LIST= 'getacclostforchqissue'

const GET_ACCOUNT_LIST_FOR_ACCOUNTS = 'getallaccforaccount'

const GET_EXPENSE_ACCOUNT_LIST_URL = 'getaccountsexpacclist'

const GET_SOURCING_LIST_URL = 'getsourcinglist'

const POST_GODOWN_LIST_URL = 'getGodownListWithoutPTS'

const GET_GROUP_HEAD_LIST = 'getGroupHeadList';
const GET_REGIONAL_HEAD_LIST = 'getReginalHeadList';

const GET_CHALLAN_TAX_TYPE_LIST_URL = 'getchallantaxtypelist'

//call for aacount dropdown
const GET_ACCOUNT_LIST_FOR_REPORT = 'getaccountlistforreport'

//call for group ledger account dropdown
const GET_GROUP_LEDGER_ACC_LIST_FOR_REPORT = 'getgroupledgeraccount'

const GET_FINANCIAL_YEAR = 'getfinancialyear';

const GET_TRANSPORTER_LIST = 'gettransporterlist';
const GET_CONSIGNEE_LIST = 'getconsigneelist';

const GET_CHALLAN_DELIVERY_TERMS_LIST_URL = 'getchallandeliveryterms'
const GET_QUOT_DEL_TERMS_LIST = 'get-quot-del-terms-list'

const GET_OS_FOLLOWUP_PARTY = 'getosfollowupparty'

const CHECK_AADHAR_NO_EXIST = 'check-aadhar-card-exist'
const CHECK_GST_NO_EXIST = 'check-gst-no-exist';

const GET_UOM_CONV_FACT_LIST = 'get-uom-conversion-factor-list';

const GET_INDUSTRY_TYPE = 'get-industry-type'

const CHECK_ACCOUNTS_USER_DELETE_RIGHTS = 'checkaccountuserrights'

const GET_DOCUMENT_LIST_FOR_ACCOUNT = 'getdocumentlistforacc'


const BULK_ADDITION_THROUGH_EXCEL = 'bulkAdditionThroughExcel';

const SHOW_GODOWN_WISE_STOCK = 'showsgodownwisestock';
const GET_ITEM_PREFERENCE = 'getitempreference';
const SAVE_ITEM_PREFERENCE = 'saveitempreference';
const GET_CCS_PREFERENCE = 'getccspreferencedata';
const SAVE_CCS_PREFERENCE = 'saveccspreferencedata';
const POST_CHECK_GRANTS_FOR_COMPANY = 'checkGrantsForCompany'
const GET_CUSTOMER_TYPE_LIST = 'get-cust-type-list'
const GET_SELECTION_LIST = 'get-selection-list'

const GET_BANK_LIST_URL = 'getparentbankmasterlist'

const DOWNLOAD_ENTRY_COMMON_EXCEL = 'downloadentrycommonexcel'

/* getotherinfocommonlist */
const GET_DEBIT_EXP_ACCOUNT_LIST = 'getdebitexpaccountlist'

const ADD_TO_FAVOURITE = 'add-to-favourite'
const ADD_TO_RECENT = 'add-to-recent'
const CANCEL_IRN = 'cancel-irn'

const GET_USER_RIGHTS = 'get-user-rights'
const GET_DOC_NET_AMOUNT = 'get-doc-net-amount';

const GET_ADDRESS_LIST_URL = 'getaddresslist'

const MAKE_CODE_CHANGE_LIST_URL = 'onmakecodechangelist'
const GET_USER_LIST = 'getusercodelist'



@Injectable({
    providedIn: 'root',
  })

export class UtilityServiceAvaxPro {
    payload: any = {}
    completeUrl: string
    req_params: object = {}
    constructor(
      private commonService: CommonsService,
      private itemService: ItemServiceAvaxPro,
      private userxService: UserxService,
      private uomService: UomService,
      private challanService: ChallanService,
      private PhysicalLocationMasterService: PhysicalLocationMasterService,
      private ExtendCustomerSupplierMasterService: ExtendCustomerSupplierMasterService,
      private stockQueryService: StockQueryService,
      private TransporterMasterService: TransporterMasterService,
      private MiscPartyMaintenanceServiceService: MiscPartyMaintenanceServiceService,
      private stockReceiptMenuService: StockReceiptMenuService,
      private updatehandledbyservice: UpdateHandledByService,
      private userstockmapping: UserStockMappingService,
      private branchtransferservice: BranchTransferClosingDatesService,
      private challandeliverytermsservice: ChallanDeliveryTermsMasterService,
      private masterservice: MasterService,
      private http: HttpClient,
      private httpService: HttpService,
    ) { }

    getBookingInstruction = (): Observable<any> => this.commonService.getBookingInstruction()
    getConsinger = (): Observable<any> => this.commonService.getConsinger()
    getPaymentTerm = (pay_days: any): Observable<any> => this.commonService.getPaymentTerm(pay_days)
    getDocDeliverymode = (): Observable<any> => this.commonService.getDocDeliverymode()
    getHandledByList = (): Observable<any> => this.userxService.getHandledByList()
    getAllUserList = (company_code: any, search_str: any): Observable<any> => this.userxService.getAllUserList(company_code, search_str)
    getCompanywiseHandledByList = (company_code: any): Observable<any> => this.userxService.getCompanywiseHandledByList(company_code)
    getFollowedByList = (): Observable<any> => this.userxService.getFollowedByList()
    getInstructedByList = (): Observable<any> => this.userxService.getInstructedByList()
    getItemCalcList = (): Observable<any> => this.userxService.getItemCalcList()
    getDocCalcList = (): Observable<any> => this.userxService.getDocCalcList()


    getItemListByCode = (): Observable<any> => this.itemService.getItemListByCode()

  getUomList = (filter: any): Observable<any> => this.uomService.getUomList(filter)

  getAllUOM = (filter: any): Observable<any> => this.uomService.getAllUOM()

  getCashMemoNextDate = (): Observable<any> => this.challanService.getCashMemoNextDate()

  getPendingDraftItemList = (challanDraftNO: any , fromFlag: any): Observable<any> => this.challanService.getPendingDraftItemList(challanDraftNO, fromFlag)

  getAddedItemDetails = (challanDraftNO: any): Observable<any> => this.challanService.getAddedItemDetails(challanDraftNO)

  //getChallanDeliveryTermscList = (): Observable<any> => this.challanService.getChallanDeliveryTermscList()

  getPhysicalLocationForMaster = (godownCode: any): Observable<any> =>
    this.PhysicalLocationMasterService.getPhysicalLocation(godownCode)

  getCustSupplierList = (cust_supp: any): Observable<any> => this.ExtendCustomerSupplierMasterService.getCustSupplrList(cust_supp)


  //getGodownList = (): Observable<any> => this.godownService.getGodownList()
  getReportedByList = (): Observable<any> => this.userxService.getReportedByList()

  //getItemMainGroupList = (): Observable<any> => this.itemMainGroupService.getItemMainGroupList()
  getPayTermList = (pay_term_days: any): Observable<any> => this.ExtendCustomerSupplierMasterService.getPayTermList(pay_term_days)

  getValidationList = (): Observable<any> => this.ExtendCustomerSupplierMasterService.getValidationList()

  getUserTypeList = (userValue: any , radioValue: any): Observable<any> => this.stockQueryService.getUserTypeList(userValue, radioValue)
  getStateList = (): Observable<any> => this.stockQueryService.getStateList()
  getMakeListByStgRight = (userId: any , isMakeRight: any , callFrom: any): Observable<any> => this.stockQueryService.getMakeListByStgRight(userId, isMakeRight, callFrom)
  getUserBranchListByStgRight = (userId: any , isBranchRight: any , stateCode: any , callFrom: any): Observable<any> => this.stockQueryService.getUserBranchListByStgRight(userId, isBranchRight, stateCode, callFrom)

  getCurrentCountry = (): Observable<any> => this.TransporterMasterService.getCurrentCountry()

  getPartyList = (party_code: any): Observable<any> => this.MiscPartyMaintenanceServiceService.getPartyList(party_code)

  getIndustryList = (): Observable<any> => this.MiscPartyMaintenanceServiceService.getIndustryList()

  getCountryList = (): Observable<any> => this.MiscPartyMaintenanceServiceService.getCountryList()

  getStateListData = (st_ctr_code: any): Observable<any> => this.MiscPartyMaintenanceServiceService.getStateListData(st_ctr_code)

  getGodownMasterList = (): Observable<any> => this.PhysicalLocationMasterService.getGodownMasterList()

  getCompanyList = (): Observable<any> => this.userxService.getCompanyList()

  getSrTypeList = (): Observable<any> => this.stockReceiptMenuService.getSrTypeList()

  getIGSTList = (): Observable<any> => this.userxService.getIGSTList()

  getGSTList = (): Observable<any> => this.userxService.getGSTList()

  getCustSupplierData = (cust_supp_code: any , cust_flag: any): Observable<any> => this.updatehandledbyservice.getCustSuppList(cust_supp_code, cust_flag)

  isValiduomConversion = (fromUom: any , toUom: any): Observable<any> => this.stockReceiptMenuService.isValiduomConversion(fromUom, toUom)

  getMakeMasterData = (): Observable<any> => this.userstockmapping.getMakeMasterData()

  getBranchMasterData = (): Observable<any> => this.userstockmapping.getBranchMasterData()

  getGroupMasterData = (): Observable<any> => this.userstockmapping.getGroupMasterData()

  getSubGroupMasterData = (main_group_code: any): Observable<any> => this.userstockmapping.getSubGroupMasterData(main_group_code)

  getFromBranchList = (): Observable<any> => this.branchtransferservice.getFromBranchList()

  getGodownByBranch = (branch_code: any , siscon_code: any): Observable<any> => this.challandeliverytermsservice.getGodownByBranch(branch_code, siscon_code)

  getModuleDropDown = (): Observable<any> => this.masterservice.getModuleDropDown()

  getCityDropdown = (): Observable<any> => this.masterservice.getCityDropdown()

  getItemList = (itemCode: any , flg: any): Observable<any> => this.masterservice.getItemList(itemCode, flg)

  getUomMasterList = (item_code: any): Observable<any> => this.uomService.getUomMasterList(item_code)

  getIndustryDropdown = (): Observable<any> => this.masterservice.getIndustryDropdown()

  getSubIndustryDropdown = (indCode: any): Observable<any> => this.masterservice.getSubIndustryDropdown(indCode)

  getSubSubIndustryDropdown = (indCode: any): Observable<any> => this.masterservice.getSubSubIndustryDropdown(indCode)



  convertDate(date: any, seprator: any) {
    let ary = date.split(seprator)
    return ary[2] + '-' + ary[1] + '-' + ary[0]
  }

  getFormatDate(res: any, format: any) {
    //format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }


}


  // getModuleDropDown = (): Observable<any> => this.followupactionservice.getModuleDropDown()

 