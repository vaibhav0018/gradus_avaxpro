import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import  { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from  '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_BRANCH_LIST_URL = 'getbranchlist'
const GET_USER_BRANCH_LIST_URL = 'getuserbranchlist'

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getBranchList(): Observable<any> {
    //alert('aaa');
    //this.commonsService.show();
    this.req_params = {
      branch_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BRANCH_LIST_URL +
      '?' +
      'branchCompanyCode' +
      '=' +
      this.req_params['branch_company_code']

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

  getBranchListByCompany(company_code: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      branch_company_code: company_code,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BRANCH_LIST_URL +
      '?' +
      'branchCompanyCode' +
      '=' +
      this.req_params['branch_company_code']

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

  getAllBranchList(): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      branch_company_code: '',
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BRANCH_LIST_URL +
      '?' +
      'branchCompanyCode='

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

  getUserBranchList(userId: string): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      branch_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_USER_BRANCH_LIST_URL + '?' + 'userId=' + userId

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
