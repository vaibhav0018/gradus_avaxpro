import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'


const GET_HANDLED_BY_LIST_URL = 'getuserrightslist'
const GET_USER_RIGHTS_URL = 'getuserrights'

@Injectable({
  providedIn: 'root',
})
export class HandledByService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getHandledBy(reportPageId?: any): Observable<any> {
    let reportPageIdValue: string
    //this.commonsService.show()
    if (reportPageId !== undefined) {
      reportPageIdValue = reportPageId
    } else {
      reportPageIdValue = ''
    }
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userCode: atob(sessionStorage.getItem(btoa('userId')) || ''),
      reportPageId: reportPageIdValue,
    }

    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_HANDLED_BY_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&userCode' +
      '=' +
      this.req_params['userCode'] +
      '&pageId' +
      '=' +
      this.req_params['reportPageId']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        //this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }

  getHandledByUserRights(reportPageId?: any, userCode?: any): Observable<any> {
    let reportPageIdValue: string
    //this.commonsService.show()
    if (reportPageId !== undefined) {
      reportPageIdValue = reportPageId
    } else {
      reportPageIdValue = ''
    }
    this.req_params = {
      companyCode: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      userCode:
        userCode || userCode !== ''
          ? userCode
          : atob(sessionStorage.getItem(btoa('userId')) || ''),
      reportPageId: reportPageIdValue,
    }

    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_USER_RIGHTS_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['companyCode'] +
      '&userCode' +
      '=' +
      this.req_params['userCode'] +
      '&pageId' +
      '=' +
      this.req_params['reportPageId']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        //this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        //this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }
}
