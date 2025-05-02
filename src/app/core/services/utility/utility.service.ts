
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BranchService } from '../utilities/branch.service';
import { GodownService } from '../utilities/godown.service';
import { GodownByBranchListService } from '../utilities/godown-by-branchlist.service';
import { ItemService } from '../utilities/item.service';
import { ItemCategoryService } from '../utilities/item-Category.service';
import { MakeService } from '../utilities/make.service';
import { SaveColumnsService } from '../utilities/save-columns.service';
import { PhysicalLocationService } from '../utilities/physical-location.service';
import { ItemMainGroupService } from '../utilities/item-main-group.service';
import { SubGroupByMainGroup } from '../utilities/subgroup-by-maingroup.service';
import { GroupListService } from '../utilities/grouplist.service';
import { HandledByService } from '../utilities/handledby.service';
import { BrokerService } from '../utilities/broker.service';
import { PartyDetailService } from '../utilities/party-detail.service';
import { ChallanTypeList } from '../utilities/challan-type-list.service';
import { StoppageCodeService } from '../utilities/stoppage-code.service';
import { ToDateService } from '../utilities/to-date.service';
import { PolycabGroupListService } from '../utilities/polycab-group.service';
import { CustomerSupplierPartyDetailService } from '../utilities/customer-supplier-party-detail.service';
import { IndustryListService } from '../utilities/industrylist.service';
import { StateListService } from '../utilities/statelist.service';
import { CommonService } from '../utilities/common.service';
import { BankListService } from '../utilities/banklist.service';
import { GroupHeadListService } from '../utilities/group-head-list.service';
import { RegionalHeadListService } from '../utilities/regional-head-list.service';
import { catchError, map, Observable } from 'rxjs';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class UtilityService {
    constructor(
      private httpService: HttpService,
      private branchService: BranchService,
      private godownService: GodownService,
      private godownByBranchListService: GodownByBranchListService,
      private itemService: ItemService,
      private itemCategoryService: ItemCategoryService,
      private makeService: MakeService,
      private saveColumnsService: SaveColumnsService,
      private physicalLocationService: PhysicalLocationService,
      private itemMainGroupService: ItemMainGroupService,
      private subGroupByMainGroupService: SubGroupByMainGroup,
      private groupListService: GroupListService,
      private handledByService: HandledByService,
      private brokerService: BrokerService,
      private partyDetailsService: PartyDetailService,
      private challanTypeList: ChallanTypeList,
      private stoppageCodeService: StoppageCodeService,
      private toDateService: ToDateService,
      private polycabGroupList: PolycabGroupListService,
      private customerSupplierPartyDetailsService: CustomerSupplierPartyDetailService,
      private industryListService: IndustryListService,
      private stateListService: StateListService,
      private commonService: CommonService,
      private bankListService: BankListService,
      private groupHeadListService: GroupHeadListService,
      private regionalHeadListService: RegionalHeadListService
    ) { }
  
    getGodownList = (withoutSpinnerFlg?: any): Observable<any> => this.godownService.getGodownList(withoutSpinnerFlg)
    getGodownByBranchList = (selectedBranches: any): Observable<any> =>
      this.godownByBranchListService.getGodownByBranchList(selectedBranches)
    getGodownByCompanyCode = (ptos_godown: any): Observable<any> =>
      this.godownService.getGodownByCompanyCode(ptos_godown)
    getItemList = (itemCode: any): Observable<any> => this.itemService.getItemList(itemCode)
    getMakeList = (): Observable<any> => this.makeService.getMakeList()
    getMakeMultiSelectList = (): Observable<any> =>
      this.makeService.getMakeMultiSelectList()
    getPhysicalLocation = (godownCode: any): Observable<any> =>
      this.physicalLocationService.getPhysicalLocation(godownCode)
    getBranchList = (): Observable<any> => this.branchService.getBranchList()
    getBranchListByCompany = (company_code: any): Observable<any> => this.branchService.getBranchListByCompany(company_code)
    getAllBranchList = (): Observable<any> => this.branchService.getAllBranchList()
    getItemCategoryList = (): Observable<any> =>
      this.itemCategoryService.getItemCategoryList()
    getMainGroupList = (): Observable<any> => this.itemMainGroupService.getMainGroupList()
    getGodownByBranch = (branch_code: any, siscon_code: any): Observable<any> =>
      this.godownService.getGodownByBranch(branch_code, siscon_code)
    getUserFinYearList = (userId: string, branchCode: string): Observable<any> =>
      this.commonService.getUserFinYearList(userId, branchCode)
    getUserBranchList = (userId: string): Observable<any> =>
      this.branchService.getUserBranchList(userId)
    getSubGroupList = (groupCode: any): Observable<any> =>
      this.subGroupByMainGroupService.getSubGroupByMainGroup(groupCode)
    getGroupList = (): Observable<any> => this.groupListService.getGroupList()
    getHandledBy = (reportPageId?: any): Observable<any> =>
      this.handledByService.getHandledBy(reportPageId)
    getHandledByUserRights = (reportPageId?: any, userCode?: any): Observable<any> =>
      this.handledByService.getHandledByUserRights(reportPageId, userCode)
    getBrokerList = (): Observable<any> => this.brokerService.getBrokerList()
    getPartyDetails = (partyCode: any, reportType?: any): Observable<any> =>
      this.partyDetailsService.getPartyDetails(partyCode, reportType)
    getSupplierPartyDetails = (supplierPartyCode: any): Observable<any> =>
      this.customerSupplierPartyDetailsService.getSupplierPartyDetails(supplierPartyCode)
    getCustomerPartyDetails = (customerPartyCode: any): Observable<any> =>
      this.customerSupplierPartyDetailsService.getCustomerPartyDetails(customerPartyCode)
    getChallanTypeList = (): Observable<any> => this.challanTypeList.getChallanTypeList()
    getStoppageCode = (): Observable<any> => this.stoppageCodeService.getStoppageCode()
    getToDate = (loggedInFinancialYearEndDate: any): Observable<any> =>
      this.toDateService.getToDate(loggedInFinancialYearEndDate)
    getPolycabGroupList = (): Observable<any> => this.polycabGroupList.getPolycabGroupList()
    getIndustryList = (): Observable<any> => this.industryListService.getIndustryList()
    getStateList = (): Observable<any> => this.stateListService.getStateList()
    postDynamicColumns = (fromPage: any): Observable<any> =>
      this.saveColumnsService.postDynamicColumns(fromPage)
    postSaveDynamicColumns = (payload: any): Observable<any> =>
      this.saveColumnsService.postSaveDynamicColumns(payload)
    postPhysicalLocationList = (godownCode: any): Observable<any> =>
      this.physicalLocationService.postPhysicalLocationList(godownCode)
    getBankList = (): Observable<any> => this.bankListService.getBankList()
    getBankListByBranch = (branch_code: any,siscon_code: any): Observable<any> => this.bankListService.getBankListByBranch(branch_code,siscon_code)
    getGroupHeadList = (): Observable<any> => this.groupHeadListService.getGroupHeadList()
    getRegionalHeadList = (): Observable<any> =>
      this.regionalHeadListService.getRegionalHeadList()
  
    getConnectionDetail(): Observable<any> {
      let completeUrl = environment.baseUrl +'/dbconn'
      return this.httpService.get(completeUrl).pipe(
        map((res: HttpServiceResponseModel) => {
          res['payload'] = res
          return res['payload']
        }),
        catchError((error: any) => {
          return ''
        })
      )
    }
  
    createCcdFile(): Observable<any> {
      let completeUrl = environment.baseUrl +'/create_ccd_files'
      return this.httpService.get(completeUrl).pipe(
        map((res: HttpServiceResponseModel) => {
          res['payload'] = res
          return res['payload']
        }),
        catchError((error: any) => {
          return ''
        })
      )
    }
  }
  