// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UomService {

//   constructor() { }
// }

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_UOM_LIST_URL = 'getuomlist'
const GET_UOM_MASTER_LIST_URL = 'getuommasterlist'
const GET_ALL_UOM = 'get-all-uom'

@Injectable({
  providedIn: 'root',
})
export class UomService {
  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getUomList(filter: any): Observable<any> {
    this.req_params = {
    }
    this.commonsService.show()
    this.completeUrl = environment.baseUrl + '/' + GET_UOM_LIST_URL
    this.payload = {
      user_id: atob(sessionStorage.getItem(btoa('userId')) || ''),
      common_row:{
        company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        item_code: filter.item_code,
        make_code: filter.make,
        branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }
  getUomMasterList(item_code: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      item_code:item_code ,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_UOM_MASTER_LIST_URL +
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

  getAllUOM(): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_ALL_UOM +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  
}
