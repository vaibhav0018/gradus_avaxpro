/* import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserxService {
  constructor() { }
} */

  import { Injectable } from '@angular/core'
  import { Observable } from 'rxjs'
  import { map, catchError } from 'rxjs/operators'
  import { throwError } from 'rxjs'
 

    import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
    import { HttpService } from '../http.service'
    import { environment } from '../../../environments/environment'
  
  const GET_REPORTED_BY_URL = 'getreportedbylist'
  const GET_FOLLOWED_BY_URL = 'getfollowedbylistservice'
  const GET_HANDLED_BY_URL = 'gethandledbylistservice'
  const GET_INSTRUCTED_BY_URL = 'getinstructedbylistservice'
  const GET_ALL_USER = 'get-all-users'
  const GET_ITEM_CALC_URL = 'getitemcalcformula'
  
  const GET_DOC_CALC_URL = 'getdoccalcformula'
  
  const GET_COMPANY_LIST_URL = 'getCompanyListData'
  
  const GET_IGST_LIST_URL = 'getIGSTListData'
  
  const GET_GST_LIST_URL = 'getGSTListData'
  
  @Injectable({
    providedIn: 'root',
  })
  export class UserxService {
    payload: object = {}
    req_params: any = {}
    completeUrl: string
    constructor(private httpService: HttpService) { }
  
    getReportedByList(): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_REPORTED_BY_URL
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  
    getHandledByList(): Observable<any> {
      this.req_params = {
        company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
      this.completeUrl = environment.baseUrl + '/' + GET_HANDLED_BY_URL + '?' + 'companyCode' + '=' + this.req_params['company_code']
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
    
    getAllUserList(company_code: any,search_str: any): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_ALL_USER + '?' + 'companyCode='+company_code+'&search_str='+search_str
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  
    getCompanywiseHandledByList(company_code: any): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_HANDLED_BY_URL + '?' + 'companyCode' + '=' + company_code
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  
    
  
  
    getDocCalcList(): Observable<any> {
  
      this.req_params = {
        // company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        schemeName: 'Document Calculator',
      }
      this.completeUrl =
        environment.baseUrl +
        '/' +
        GET_DOC_CALC_URL +
        '?' +
        'schemeGroupName' +
        '=' +
        this.req_params['schemeName']
  
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  
    getItemCalcList(): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_ITEM_CALC_URL
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
    getFollowedByList(): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_FOLLOWED_BY_URL
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
    getInstructedByList(): Observable<any> {
      this.completeUrl = environment.baseUrl + '/' + GET_INSTRUCTED_BY_URL
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  
    getCompanyList(): Observable<any> {
      this.req_params = {
        company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
      this.completeUrl = environment.baseUrl + '/' + GET_COMPANY_LIST_URL + '?' + 'companyCode' + '=' + this.req_params['company_code']
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
    getIGSTList(): Observable<any> {
      this.req_params = {
        company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      }
      this.completeUrl = environment.baseUrl + '/' + GET_IGST_LIST_URL + '?' + 'stateCode' + '=' + this.req_params['usr_state_code']
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
    getGSTList(): Observable<any> {
      this.req_params = {
        company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      }
      this.completeUrl = environment.baseUrl + '/' + GET_GST_LIST_URL + '?' + 'stateCode' + '=' + this.req_params['usr_state_code']
      return this.httpService.get(this.completeUrl).pipe(
        map((res: HttpServiceResponseModel) => res),
        catchError((error: any) => throwError(() => error.error || 'Server error'))
      )
    }
  }
  