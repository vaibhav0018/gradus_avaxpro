import { Injectable } from '@angular/core'
import { Observable,  } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_BANK_LIST = 'getbanklist'

@Injectable({
  providedIn: 'root',
})
export class BankListService {
  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getBankList(): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      loggedInBranchCode: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      loggedInSisconCode: atob(sessionStorage.getItem(btoa('usr_of_siscon'))    || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BANK_LIST +
      '?' +
      'loggedInBranchCode' +
      '=' +
      this.req_params['loggedInBranchCode'] +
      '&' +
      'loggedInSisconCode' +
      '=' +
      this.req_params['loggedInSisconCode']

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
  getBankListByBranch(branch_code: any,siscon_code: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      loggedInBranchCode : branch_code,
      loggedInSisconCode : siscon_code,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BANK_LIST +
      '?' +
      'loggedInBranchCode' +
      '=' +
      this.req_params['loggedInBranchCode'] +
      '&' +
      'loggedInSisconCode' +
      '=' +
      this.req_params['loggedInSisconCode']

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
