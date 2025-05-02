import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_SUBGROUP_URL = 'getitsubgrouplist'

@Injectable({
  providedIn: 'root',
})
export class SubGroupByMainGroup {
  payload: object = {}
  req_params:  any = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getSubGroupByMainGroup(groupCode: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      groupCode: groupCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_SUBGROUP_URL +
      '?' +
      'groupCode' +
      '=' +
      this.req_params['groupCode']

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
