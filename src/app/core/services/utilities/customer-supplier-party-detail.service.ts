import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_CUSTOMER_CODE = 'getcustomercode'
const GET_SUPPLIER_CODE = 'getsuppliercode'

@Injectable({
  providedIn: 'root',
})
export class CustomerSupplierPartyDetailService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getSupplierPartyDetails(supplierPartyCode: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      supplierCode: supplierPartyCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_SUPPLIER_CODE +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&' +
      'supplierCode' +
      '=' +
      this.req_params['supplierCode']

    return this.httpService.get(this.completeUrl).pipe(
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
  getCustomerPartyDetails(customerPartyCode: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      supplierCode: customerPartyCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CUSTOMER_CODE +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&' +
      'supplierCode' +
      '=' +
      this.req_params['supplierCode']

    return this.httpService.get(this.completeUrl).pipe(
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
}
