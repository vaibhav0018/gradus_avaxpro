import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../../../../../core/models/HttpServiceResponseModel'
import { environment } from '../../../../../../environments/environment'
import { HttpService } from '../../../../../../core/services/http.service'
import { CommonsService } from '../../../../../../shared/services/commons.service'

const POST_STOCK_QUERY_REPORT_PAGE = 'getstockqueryreportview'
const POST_STOCK_GROUPWISE_REPORT = 'getstockquerygroupwiseview'

const POST_CHECK_GRANTS_FOR_COMPANY = 'checkGrantsForCompany'
const GET_EXPECTED_STOCK_LIST = 'getexpectedstocklist'
const GET_CATALOG_REF_NO_LIST = 'getcatalogrefnolist'
const GET_STOCK_LEVEL_LIST = 'getstocklevellist'
const GET_DEALERS_STOCK_LIST = 'getdealersstocklist'
const GET_LIST_PRICE_FOR_STOCK_LIST = 'getpriclistforstocklist'
const GET_ITEM_HEADER_DETAIL = 'getitemheaderdetailslist'
const GET_SHADOW_ITEM_HEADER_DETAIL = 'getshadowitemheaderdetailslist'

const INSERT_INTO_UT_FP = 'insertintousertrackfrompricelist'
const GET_PRODUCT_DETAILS = 'getproductdetails'


@Injectable({
  providedIn: 'root'
})
export class StockQueryReportService {
  payload: any = {}
  completeUrl: string
  req_params: { company_code?: string; userId?: string; gm_page_id?: string } = {}

  constructor(private http: HttpClient, private httpService: HttpService, private commonsService: CommonsService) { }

  getStockQueryReportView(filter : any, sortBy : any, sortOrder : any): Observable<any> {
    this.commonsService.show();
    this.completeUrl = environment.baseUrl + '/' + POST_STOCK_QUERY_REPORT_PAGE
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      },
      sortDto: {
        columnName: sortBy,
        orderBy: sortOrder,
      },
      parentItem: filter.hiddenParentItem,
    }
    if (filter.cmbItemCode != undefined) {
      this.payload.item_code = filter.cmbItemCode.item_code,
        this.payload.item_name = filter.cmbItemCode.item_name,
        this.payload.item_cat_ref_no = filter.cmbItemCode.item_cat_ref_no
    }
    if (filter.cmbUserList != undefined) {
      this.payload.user_userId = filter.cmbUserList.user_userId,
        this.payload.user_userName = filter.cmbUserList.user_userName
    }
    if (filter.cmbMake != undefined) {
      this.payload.make_code = filter.cmbMake.make_code,
        this.payload.make_name = filter.cmbMake.make_name
    }
    if (filter.cmbState != undefined) {
      this.payload.br_state = filter.cmbState.br_state,
        this.payload.br_state_code = filter.cmbState.br_state_code
    }
    if (filter.cmbBranch != undefined) {
      this.payload.branch_city = filter.cmbBranch.branch_city,
        this.payload.siscon_code = filter.cmbBranch.siscon_code,
        this.payload.branch_code = filter.cmbBranch.branch_code,
        this.payload.branch_company_code = filter.cmbBranch.branch_company_code,
        this.payload.branch_name = filter.cmbBranch.branch_name
    }
    if (filter.cmbGodown != undefined) {
      this.payload.godown_code = filter.cmbGodown.godown_code,
        this.payload.godown_name = filter.cmbGodown.godown_name
    }
    if (filter.rdbUserType != undefined) {
      this.payload.rdbUserType = filter.rdbUserType
    }
    if (filter.txtQty != undefined) {
      this.payload.txtQty = filter.txtQty
    }

    console.log('final payload report ', this.payload)
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        this.commonsService.hide();
        return res['payload']
      })
    )
  }
  getStockGroupWiseView(filter : any, sortBy : any, sortOrder : any): Observable<any> {
    this.commonsService.show();
    this.completeUrl = environment.baseUrl + '/' + POST_STOCK_GROUPWISE_REPORT
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||  ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      },
      // sortDto: {
      //   columnName: sortBy,
      //   orderBy: sortOrder,
      // },
      main_grp_code:filter.cmbMainGroup,
      subgrp_code:filter.cmbSubGroup,
      category:filter.txtCategory
      // parentItem: filter.hiddenParentItem,
    }
    // if (filter.cmbItemCode != undefined) {
    //   this.payload.item_code = filter.cmbItemCode.item_code,
    //     this.payload.item_name = filter.cmbItemCode.item_name,
    //     this.payload.item_cat_ref_no = filter.cmbItemCode.item_cat_ref_no
    // }
    // if (filter.cmbUserList != undefined) {
    //   this.payload.user_userId = filter.cmbUserList.user_userId,
    //     this.payload.user_userName = filter.cmbUserList.user_userName
    // }
    // if (filter.cmbMake != undefined) {
    //   this.payload.make_code = filter.cmbMake.make_code,
    //     this.payload.make_name = filter.cmbMake.make_name
    // }
    // if (filter.cmbState != undefined) {
    //   this.payload.br_state = filter.cmbState.br_state,
    //     this.payload.br_state_code = filter.cmbState.br_state_code
    // }
    // if (filter.cmbBranch != undefined) {
    //   this.payload.branch_city = filter.cmbBranch.branch_city,
    //     this.payload.siscon_code = filter.cmbBranch.siscon_code,
    //     this.payload.branch_code = filter.cmbBranch.branch_code,
    //     this.payload.branch_company_code = filter.cmbBranch.branch_company_code,
    //     this.payload.branch_name = filter.cmbBranch.branch_name
    // }
    // if (filter.cmbGodown != undefined) {
    //   this.payload.godown_code = filter.cmbGodown.godown_code,
    //     this.payload.godown_name = filter.cmbGodown.godown_name
    // }
    // if (filter.rdbUserType != undefined) {
    //   this.payload.rdbUserType = filter.rdbUserType
    // }
    // if (filter.txtQty != undefined) {
    //   this.payload.txtQty = filter.txtQty
    // }

    console.log('final payload report ', this.payload)
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        this.commonsService.hide();
        return res['payload']
      })
    )
  }

  getExpectedStockList(filter : any ): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + GET_EXPECTED_STOCK_LIST
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_br_city: atob(sessionStorage.getItem(btoa('usr_br_city')) ?? ''),
        usr_br_name: atob(sessionStorage.getItem(btoa('usr_br_name')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
          ;
        return res['payload']
      })
    )
  }

  getCatalogRefNoList(filter : any): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + GET_CATALOG_REF_NO_LIST
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
          ;
        return res['payload']
      })
    )
  }

  getStockLevelList(filter : any): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + GET_STOCK_LEVEL_LIST
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
          ;
        return res['payload']
      })
    )
  }

  checkGrantsForCompany(): Observable<any> {
    //this.commonsService.show();
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
      userId: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
      gm_page_id: 'VIEW_DEALERS_STOCK'
    }
    this.completeUrl =
      environment.baseUrl + '/' + POST_CHECK_GRANTS_FOR_COMPANY + '?' + 'companyCode' + '=' + this.req_params['company_code']
      + '&' + 'userId' + '=' + this.req_params['userId']
      + '&' + 'gm_page_id' + '=' + this.req_params['gm_page_id']
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //this.commonsService.hide();
        return res['payload']
      })
    )
  }

  getDealersStockList(filter : any): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + GET_DEALERS_STOCK_LIST
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
          ;
        return res['payload']
      })
    )
  }

  getItemHeaderDetailsList(filter : any): Observable<any> {
    //this.commonsService.show();
    this.completeUrl = environment.baseUrl + '/' + GET_ITEM_HEADER_DETAIL
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res;
        //this.commonsService.hide();
        return res['payload']
      })
    )
  }
  getShadowItemHeaderDetailsList(filter : any): Observable<any> {
    //this.commonsService.show();
    this.completeUrl = environment.baseUrl + '/' + GET_SHADOW_ITEM_HEADER_DETAIL
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res;
        //this.commonsService.hide();
        return res['payload']
      })
    )
  }

  getPricListForStockList(filter : any): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + GET_LIST_PRICE_FOR_STOCK_LIST
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
      item_code: filter
    }
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
          ;
        return res['payload']
      })
    )
  }

  insertIntoUTfromPriceList(filter : any): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + INSERT_INTO_UT_FP
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
    }
    if (filter.cmbItemCode != undefined) {
      this.payload.item_code = filter.cmbItemCode.item_code,
        this.payload.item_name = filter.cmbItemCode.item_name,
        this.payload.item_cat_ref_no = filter.cmbItemCode.item_cat_ref_no
    }
    if (filter.cmbUserList != undefined) {
      this.payload.user_userId = filter.cmbUserList.user_userId,
        this.payload.user_userName = filter.cmbUserList.user_userName
    }
    if (filter.cmbMake != undefined) {
      this.payload.make_code = filter.cmbMake.make_code,
        this.payload.make_name = filter.cmbMake.make_name
    }
    if (filter.cmbState != undefined) {
      this.payload.br_state = filter.cmbState.br_state,
        this.payload.br_state_code = filter.cmbState.br_state_code
    }
    if (filter.cmbBranch != undefined) {
      this.payload.branch_city = filter.cmbBranch.branch_city,
        this.payload.siscon_code = filter.cmbBranch.siscon_code,
        this.payload.branch_code = filter.cmbBranch.branch_code,
        this.payload.branch_company_code = filter.cmbBranch.branch_company_code,
        this.payload.branch_name = filter.cmbBranch.branch_name
    }
    if (filter.cmbGodown != undefined) {
      this.payload.godown_code = filter.cmbGodown.godown_code,
        this.payload.godown_name = filter.cmbGodown.godown_name
    }
    if (filter.rdbUserType != undefined) {
      this.payload.rdbUserType = filter.rdbUserType
    }
    if (filter.txtQty != undefined) {
      this.payload.txtQty = filter.txtQty
    }

    console.log('final payload report ', this.payload)
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {

        res['payload'] = res
        return res['payload']
      })
    )
  }
  getProductData(payload: { item_Code: any }){
    this.completeUrl = environment.baseUrl + '/' + GET_PRODUCT_DETAILS
    return this.httpService.post(this.completeUrl, payload).pipe(
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
