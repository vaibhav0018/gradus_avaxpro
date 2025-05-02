import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'

const GET_USER_FINYEAR_LIST_URL = 'getuserfinyearlist'
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) {}

  getUserFinYearList(userId: string, branchCode: string): Observable<any> {
    //this.commonsService.show()
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_USER_FINYEAR_LIST_URL +
      '?userId=' +
      userId + //+this.req_params['userId']
      '&branchCode=' +
      branchCode //+this.req_params['branch_code']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        //this.commonsService.hide()
        return res
      }),
      catchError((error: any) => {
        //this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }
}
