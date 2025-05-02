import { importProvidersFrom, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const GET_MODULE_LIST_DATA = 'getmodulelist';
const GET_CITY_MASTER_LIST_DATA = 'getcitymasterlist';
const GET_ITEM_LIST_URL = 'getitemmasterlist'
const GET_VOUVHER_TYPE_LIST_URL = 'getvouchertypelistservice'
const GET_MAKE_MASTER_LIST_URL = 'getmakemasterlist'
const GET_ACCOUNT_LIST_URL = 'getaccountmasterlist'
const GET_PARENT_BANK_LIST_URL = 'getparentbankmasterlist'
const GET_INDUSTRY_LIST_URL = 'getindustrymasterlist'
const GET_SUB_INDUSTRY_LIST_URL = 'getsubindustrymasterlist'
const GET_SUB_SUB_INDUSTRY_LIST_URL = 'getsubsubindustrymasterlist'
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getModuleDropDown(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_MODULE_LIST_DATA
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }
    }
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  getCityDropdown(): Observable<any> {
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CITY_MASTER_LIST_DATA +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['usr_company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getItemList(itemCode: any,flg: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      item_code: itemCode,
      flg:flg,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_ITEM_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'itemCode' +
      '=' +
      this.req_params['item_code']+
      '&' +
      'flg' +
      '=' +
      this.req_params['flg']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        return ''
      })
    )
  }
  getVoucherTypeDropDown(): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl = environment.baseUrl + '/' + GET_VOUVHER_TYPE_LIST_URL + '?' + 'companyCode' + '=' + this.req_params['company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  getMakeMasterList(): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_MAKE_MASTER_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {

        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }

  getAccountDropDown(account: any): Observable<any> {
    alert("2")
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      account_code: account,
    }
    this.completeUrl = environment.baseUrl + '/' + GET_ACCOUNT_LIST_URL + '?' + 'companyCode' + '=' + this.req_params['company_code'] + '&' + 'account' + '=' + this.req_params['account_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getParentBankMasterData(): Observable<any> {
    // alert("2")
    this.completeUrl = environment.baseUrl + '/' + GET_PARENT_BANK_LIST_URL
    this.req_params = {
    }
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getIndustryDropdown(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_INDUSTRY_LIST_URL
    this.req_params = {
    }
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getSubIndustryDropdown(indCode: any): Observable<any> {
    this.req_params = {
      indCode: indCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_SUB_INDUSTRY_LIST_URL +
      '?' +
      'indCode' +
      '=' +
      this.req_params['indCode']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        return ''
      })
    )
  }

  getSubSubIndustryDropdown(indCode: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      indCode: indCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_SUB_SUB_INDUSTRY_LIST_URL +
      '?' +
      'indCode' +
      '=' +
      this.req_params['indCode']
    return this.httpService.get(this.completeUrl).pipe(
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
