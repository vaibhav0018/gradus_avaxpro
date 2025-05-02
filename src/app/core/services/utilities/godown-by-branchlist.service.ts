import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from  '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_GODOWN_BY_BRANCH_LIST_URL = 'getgodownlistbybranchlist'

@Injectable({
  providedIn: 'root',
})
export class GodownByBranchListService {
  // payload: object = {}
  // payloads = new HttpParams();
  //  payload: {
  // branchCodeList: string[]
  // sisconCodeList: string[]
  // }
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getGodownByBranchList(selectedBranches: any): Observable<any> {
    let branchCodeList: string[]
    let sisconCodeList: string[]
    if (selectedBranches !== undefined) {
      branchCodeList = selectedBranches.map((branch: { branch_code: any }) => branch.branch_code)
      sisconCodeList = selectedBranches.map((branch: { siscon_code: any }) => branch.siscon_code)
    }
    this.commonsService.show()
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code ')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_GODOWN_BY_BRANCH_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'branchCodeList' +
      '=' +
      this.req_params['branch'] +
      '&' +
      'sisconCodeList' +
      '=' +
      this.req_params['siscon']

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
