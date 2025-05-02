import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import  { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from  '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_GODOWN_LIST_URL = 'getgodownlist'
const GET_GODOWN_LIST_BY_BRANCH_URL = 'getgodownlist'
const GET_GODOWN_LIST_BY_COMPANY_CODE_URL = 'getgodownlistbycompanycode'
@Injectable({
  providedIn: 'root',
})
export class GodownService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) { }

  getGodownList(withoutSpinnerFlg?: any): Observable<any> {

    if (withoutSpinnerFlg !== undefined) { } else {
      this.commonsService.show()
    }
    this.req_params = {
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_GODOWN_LIST_URL +
      '?' +
      'sisconCode' +
      '=' +
      this.req_params['siscon_code'] +
      '&' +
      'branchCode' +
      '=' +
      this.req_params['branch_code']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        if (withoutSpinnerFlg !== undefined) { } else {
          this.commonsService.hide();
        }
        return res
      }),
      catchError((error: any) => {
        if (withoutSpinnerFlg !== undefined) { } else {
          this.commonsService.hide()
        }
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )


  }

  getGodownByBranch(branch_code: any, siscon_code: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      siscon_code: siscon_code,
      branch_code: branch_code,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_GODOWN_LIST_BY_BRANCH_URL +
      '?' +
      'sisconCode' +
      '=' +
      this.req_params['siscon_code'] +
      '&' +
      'branchCode' +
      '=' +
      this.req_params['branch_code']
    // '?' +
    // 'br_branch_code' +
    // '=' +
    // this.req_params['br_branch_code']

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

  getGodownByCompanyCode(ptos_godown: string): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      ptos_godown: ptos_godown,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_GODOWN_LIST_BY_COMPANY_CODE_URL +
      '?' +
      'sisconCode' +
      '=' +
      this.req_params['siscon_code'] +
      '&' +
      'branchCode' +
      '=' +
      this.req_params['branch_code'] +
      '&' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'ptosGodown' +
      '=' +
      this.req_params['ptos_godown']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        return res
      }),
      catchError((error: any) => {
        this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }
}
