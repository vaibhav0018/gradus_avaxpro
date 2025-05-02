import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'  
import { HttpService } from '../http.service'
import { environment } from  '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_ITEM_LIST_URL = 'getitemlist'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getItemList(itemCode: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      item_code: itemCode,
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
