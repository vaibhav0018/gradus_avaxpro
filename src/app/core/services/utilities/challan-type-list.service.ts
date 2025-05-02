import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_CHALLAN_TYPE_LIST_URL = 'getchallantypelist'

@Injectable({
  providedIn: 'root',
})
export class ChallanTypeList {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getChallanTypeList(): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code'))  || ''),
      userCode: atob(sessionStorage.getItem(btoa('userId')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CHALLAN_TYPE_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&userCode' +
      '=' +
      this.req_params['userCode']

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
