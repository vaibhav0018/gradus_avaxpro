import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_TO_DATE_URL = 'gettodateforreport'

@Injectable({
  providedIn: 'root',
})
export class ToDateService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getToDate(loggedInFinancialYearEndDate: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      loggedInFinancialYearEndDate: loggedInFinancialYearEndDate,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_TO_DATE_URL +
      '?' +
      'loggedInFinancialYearEndDate' +
      '=' +
      this.req_params['loggedInFinancialYearEndDate']

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
