import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const GET_CHALLAN_DELIVERY_DATA = 'getchldeltermsmasterlist';
const GET_GODOWN_LIST_BY_BRANCH_URL = 'getgodownmasterlist'
const POST_CHALLAN_DELEVERY_TERMS = 'addchldelterms'
const GET_CHALLAN_DELIVERY_DELETE_DATA = 'getchldeltermsdeletelist';
const POST_CHALLAN_DELEVERY_TERMS_DELETE_DATA = 'deletechldelterms'
const POST_CHALLAN_DELEVERY_TERMS_UPDATE_DATA = 'updatechldelterms'

@Injectable({
  providedIn: 'root'
})
export class ChallanDeliveryTermsMasterService {

  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getChlDelTermsList(branch_code: any): Observable<any> {//, pageNumber, pageSize
    this.completeUrl = environment.baseUrl + '/' + GET_CHALLAN_DELIVERY_DATA
    this.payload = {
      branch_code: branch_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      },
      // pageDto: {
      //   pageNumber: pageNumber,
      //   pageSize: pageSize,
      // },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getGodownByBranch(branch_code: any, siscon_code: any): Observable<any> {
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

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }

  addNewChallanDeliveryTerms(value: any, goodwon: any, branch: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CHALLAN_DELEVERY_TERMS
    this.payload = {
      challan_details_terms: value,
      branch_code: branch,
      godown_code: goodwon,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getChlDelTermsDeleteList(branch_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_CHALLAN_DELIVERY_DELETE_DATA
    this.payload = {
      branch_code: branch_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  deleteChlDelTerms(chllan_del_code: any, godwon: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CHALLAN_DELEVERY_TERMS_DELETE_DATA
    this.payload = {
      cdl_challan_del_code: chllan_del_code,
      godown_code: godwon,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
 
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateChlDelTerms(chllan_del_code: any, cdl_godwon_code: any, cdl_desc: any, recept: any, tax: any, ebill: any, collect: any, trans: any, block: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CHALLAN_DELEVERY_TERMS_UPDATE_DATA
    this.payload = {
      cdl_challan_del_code: chllan_del_code,
      godown_code: cdl_godwon_code,
      cdl_desc: cdl_desc,
      cdl_proof_of_rcpt: recept,
      cdl_challan_cum_ti: tax,
      cdl_ewaybill_not_required: ebill,
      cdl_customer_to_collect: collect,
      cdl_transporter_flg: trans,
      cdl_blocked_flg: block,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }, 
    }
    console.log("====this.payload====",this.payload)
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
