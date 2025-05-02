import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'   

const GET_PARTY_DETAIL_LISR_URL = 'getpartydetaillist'

@Injectable({
  providedIn: 'root',
})
export class PartyDetailService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getPartyDetails(partyCode: any, reportType?: undefined): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      search_Str: partyCode,
      reportType: reportType !== undefined ? reportType : '',
    }

    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_PARTY_DETAIL_LISR_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&' +
      'search_Str' +
      '=' +
      this.req_params['search_Str'] +
      '&' +
      'reportType' +
      '=' +
      this.req_params['reportType']

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
