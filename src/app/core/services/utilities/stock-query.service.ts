import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
//import { map } from 'rxjs/operators'
import { map, catchError } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { TableColumnHeaderViews as fromPage } from '../../../feature/session/query/stock-query/components/constants'

import { CommonsService } from '../../../shared/services/commons.service'

const POST_CHECK_STOCK_QUERY_RIGHTS = 'checkstockquerypagerights'
const GET_USER_TYPE_LIST = 'getUserTypeList'
const GET_STATE_LIST = 'getStateList'
const GET_MAKE_LIST_BY_STG_RIGHT = 'getMakeListByStgRight'
const GET_BRANCH_LIST_BY_STG_RIGHT = 'getBranchListByStgRight'
const POST_STOCK_QUERY_EXCEL = 'getStockQueryExcel'
const GET_FROM_PRICELIST_MENU_RIGHTS = 'getFromPriceListMenuRights'

@Injectable({
  providedIn: 'root',
})
export class StockQueryService {
  payload: any = {}
  completeUrl: string
  req_params: any = {}

  constructor(private http: HttpClient, private httpService: HttpService, private commonsService: CommonsService) { }

  checkStockQueryRights(filter: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CHECK_STOCK_QUERY_RIGHTS
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
      routeFrom: filter.routeFrom
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getUserTypeList(userValue: any, radioValue: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userValue: userValue,
      radioValue: radioValue
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_USER_TYPE_LIST + '?' + 'companyCode' + '=' + this.req_params['company_code']
      + '&' + 'userValue' + '=' + this.req_params['userValue']
      + '&' + 'radioValue' + '=' + this.req_params['radioValue']
    //   console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getStateList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_STATE_LIST
    //  console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getMakeListByStgRight(userId: any, isMakeRight: any, callFrom: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userId: userId,
      isMakeRight: isMakeRight,
      callFrom: callFrom
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_MAKE_LIST_BY_STG_RIGHT + '?' + 'companyCode' + '=' + this.req_params['company_code']
      + '&' + 'userId' + '=' + this.req_params['userId']
      + '&' + 'isMakeRight' + '=' + this.req_params['isMakeRight']
      + '&' + 'callFrom' + '=' + this.req_params['callFrom']
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getUserBranchListByStgRight(userId: any, isBranchRight: any, stateCode: any, callFrom: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userId: userId,
      isBranchRight: isBranchRight,
      stateCode: stateCode,
      callFrom: callFrom
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_BRANCH_LIST_BY_STG_RIGHT + '?' + 'companyCode' + '=' + this.req_params['company_code']
      + '&' + 'userId' + '=' + this.req_params['userId']
      + '&' + 'isBranchRight' + '=' + this.req_params['isBranchRight']
      + '&' + 'stateCode' + '=' + this.req_params['stateCode']
      + '&' + 'callFrom' + '=' + this.req_params['callFrom']
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  /*excel download*/
  downloadFile(data: any, excelPayload: any) {
    this.commonsService.show();
    this.payload = {
      dynamicColsDto: {
        fromPage: fromPage.view_at_init.from_angular_page_id,
        userId: atob(sessionStorage.getItem(btoa('id')) || ''),
      },
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
    }
    if (excelPayload.cmbItemCode != undefined) {
      this.payload.item_code = excelPayload.cmbItemCode.item_code,
        this.payload.item_name = excelPayload.cmbItemCode.item_name,
        this.payload.item_cat_ref_no = excelPayload.cmbItemCode.item_cat_ref_no
    }
    if (excelPayload.cmbUserList != undefined) {
      this.payload.user_userId = excelPayload.cmbUserList.user_userId,
        this.payload.user_userName = excelPayload.cmbUserList.user_userName
    }
    if (excelPayload.cmbMake != undefined) {
      this.payload.make_code = excelPayload.cmbMake.make_code,
        this.payload.make_name = excelPayload.cmbMake.make_name
    }
    if (excelPayload.cmbState != undefined) {
      this.payload.br_state = excelPayload.cmbState.br_state,
        this.payload.br_state_code = excelPayload.cmbState.br_state_code
    }
    if (excelPayload.cmbBranch != undefined) {
      this.payload.branch_city = excelPayload.cmbBranch.branch_city,
        this.payload.siscon_code = excelPayload.cmbBranch.siscon_code,
        this.payload.branch_code = excelPayload.cmbBranch.branch_code,
        this.payload.branch_company_code = excelPayload.cmbBranch.branch_company_code,
        this.payload.branch_name = excelPayload.cmbBranch.branch_name
    }
    if (excelPayload.cmbGodown != undefined) {
      this.payload.godown_code = excelPayload.cmbGodown.godown_code,
        this.payload.godown_name = excelPayload.cmbGodown.godown_name
    }
    if (excelPayload.rdbUserType != undefined) {
      this.payload.rdbUserType = excelPayload.rdbUserType
    }
    if (excelPayload.txtQty != undefined) {
      this.payload.txtQty = excelPayload.txtQty
    }

    console.log("complete excelPayload ", this.payload)
    const REQUEST_PARAMS = new HttpParams().set('fileName', data.fileName)
    const REQUEST_URI = environment.baseUrl + '/' + POST_STOCK_QUERY_EXCEL
    /* return this.http.post(REQUEST_URI, this.payload, {
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
    }) */
    return this.http
      .post(REQUEST_URI, this.payload, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((res: any) => {
          this.commonsService.hide()
          return res
        }),
        catchError((error: any) => {
          this.commonsService.hide()
          return ''
        })
      )
  }


  checkFromPriceListRights(): Observable<any> {
    this.req_params = {
      userCompanyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userId: atob(sessionStorage.getItem(btoa('userId')) || ''),
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_FROM_PRICELIST_MENU_RIGHTS + '?' + 'userCompanyCode' + '=' + this.req_params['userCompanyCode']
      + '&' + 'userId' + '=' + this.req_params['userId']
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  getCategoryDropdown(payload: any): Observable<any> {
    this.completeUrl =
      environment.baseUrl + '/' + 'getCategoryDropDown'
    return this.httpService.post(this.completeUrl,payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}


