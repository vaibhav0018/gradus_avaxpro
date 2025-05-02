import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'


const GET_ITEM_LIST_URL = 'getitemlist'
const GET_ITEM_LIST_URL1 = 'getitemlist1'
const GET_ENTRY_ITEM_LIST_URL = 'getentryitemlist'

@Injectable({
  providedIn: 'root',
})
export class ItemServiceAvaxPro {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) { }

  getItemListByCode(): Observable<any> {
    this.req_params = {
      company_code: '01',
      item_code: '1110',
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
      this.req_params['item_code']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getItemList1(itemCode: any, searchFrom?: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      item_code: itemCode,
      searchFrom: searchFrom
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_ITEM_LIST_URL1 +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'itemCode' +
      '=' +
      this.req_params['item_code'] +
      '&' +
      'prodCode' +
      '=' +
      this.req_params['item_code'] +
      '&' +
      'catRefNo' +
      '=' +
      this.req_params['item_code'] + "&siscon_code=" + this.req_params['siscon_code'] + "&branch_code=" + this.req_params['branch_code']
      + "&searchFrom=" + this.req_params['searchFrom']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      // catchError((error: any) => {
      //   // return throwError(new Error(error) || 'Server error')
      //   return ''
      // })
    )
  }

  getEntryItemList(itemCode: any, searchFrom?: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))   || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      item_code: itemCode,
      searchFrom: searchFrom
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_ENTRY_ITEM_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'itemCode' +
      '=' +
      this.req_params['item_code'] +
      '&' +
      'prodCode' +
      '=' +
      this.req_params['item_code'] +
      '&' +
      'catRefNo' +
      '=' +
      this.req_params['item_code'] + "&siscon_code=" + this.req_params['siscon_code'] + "&branch_code=" + this.req_params['branch_code']
      + "&searchFrom=" + this.req_params['searchFrom']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
    )
  }
}
