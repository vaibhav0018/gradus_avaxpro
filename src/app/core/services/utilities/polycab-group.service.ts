import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_POLYCAB_GROUP_LIST = 'getgrouplistforreport'

@Injectable({
  providedIn: 'root',
})
export class PolycabGroupListService {
  payload: object = {}
  req_params:  any = {}  // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getPolycabGroupList(): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_POLYCAB_GROUP_LIST +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code']

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
