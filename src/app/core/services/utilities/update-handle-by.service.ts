import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const GET_PARTY_DATA = 'getHandleByPartyList';
const GET_CUST_SUPP_PARTY_DATA = 'getCustSupplrPartyList';
const POST_HANDLED_BY_UPDATE = 'updatehandledby'
@Injectable({
  providedIn: 'root'
})
export class UpdateHandledByService {

  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getPartyData(code: any, flag: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_PARTY_DATA
    this.payload = {
      cust_supp_code: code,
      handle_by_code: code,
      handledflag: flag,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      },
    }
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getCustSuppList(cust_supp_code: any,cust_flag: any): Observable<any> {
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      cust_flag:cust_flag,
      cust_supp_code:cust_supp_code,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CUST_SUPP_PARTY_DATA +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['usr_company_code'] +
      '&' +
      'cust_supp_code' +
      '=' +
      this.req_params['cust_supp_code'] +
      '&' +
      'cust_flag' +
      '=' +
      this.req_params['cust_flag']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateHandledBY(old_handle_by: any,new_handle_by: any,followup_by_flag: any,handled_by_flag: any,partyCodeList: any,list_map: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_HANDLED_BY_UPDATE
    this.payload = {
      old_handle_by:old_handle_by,
      new_handle_by:new_handle_by,
      followup_by_flag:followup_by_flag,
      handled_by_flag:handled_by_flag,
      partyCodeList:partyCodeList,
      party_code_list:list_map,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),

      }
    }
    console.log('payload For Update ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  

}
