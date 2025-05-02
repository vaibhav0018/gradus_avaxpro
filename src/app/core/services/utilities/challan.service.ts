// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChallanService {

//   constructor() { }
// }

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'

const GET_UOM_LIST_URL = 'getcashmemonextdate'
const GET_PENDING_DRAFT_ITEM_LIST_URL = 'getpendingdraftitemlisturl'
const GET_ADDED_ITEM_LIST_URL = 'getaddeditemlisturl'
const GET_CHALLAN_DELIVERY_TERMS_LIST_URL = 'getchallandeliveryterms'

@Injectable({
  providedIn: 'root',
})
export class ChallanService {
  payload: any = {}
  req_params: any = {}
  completeUrl: string
  constructor(private httpService: HttpService) {}



  
  getPendingDraftItemList(challanDraftNO: any,fromFlag: any): Observable<any> {
    
   // alert('inside challan service');

    this.payload = {
      ch_challan_draft_no:challanDraftNO,
      fromFlag:fromFlag,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''), 
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
        ch_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      },

    }

    this.completeUrl = environment.baseUrl + '/' + GET_PENDING_DRAFT_ITEM_LIST_URL  
    console.log('request params ::: ', this.payload)

    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )

  }


  

  
  getAddedItemDetails(challanDraftNO: any): Observable<any> {
    
    // alert('inside challan service');
 
     this.payload = {
       ch_challan_draft_no:challanDraftNO,
       ch_siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      ch_branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
       userInformationDto: {
         usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
         usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),  
         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),

       },
 
     }
 
     this.completeUrl = environment.baseUrl + '/' + GET_ADDED_ITEM_LIST_URL  
     console.log('request params ::: ', this.payload)
 
     return this.httpService.post(this.completeUrl, this.payload).pipe(
       map((res: HttpServiceResponseModel) => {
         res['payload'] = res
         console.log(res)
         return res['payload']
       })
     )
 
   }

   getChallanItemDetails(payload: any): Observable<any> {
    
    // alert('inside challan service');
    console.log('getChallanItemDetails.payload',payload)
     this.payload = {
       ch_challan_draft_no:payload.challan_no,
       ch_siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      ch_branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      ch_other_branch:'N',       
       userInformationDto: {
         usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
         usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
       },
 
     }
 
     if(payload.ch_other_branch!=undefined && payload.ch_other_branch=='Y'){
      this.payload['ch_siscon_code'] =payload.ch_siscon_code
      this.payload['ch_branch_code'] =payload.ch_branch_code
      this.payload['ch_other_branch'] ='Y'
    }
     this.completeUrl = environment.baseUrl + '/' + GET_ADDED_ITEM_LIST_URL  
     console.log('request params ::: ', this.payload)
 
     return this.httpService.post(this.completeUrl, this.payload).pipe(
       map((res: HttpServiceResponseModel) => {
         res['payload'] = res
         console.log(res)
         return res['payload']
       })
     )
 
   }



  getCashMemoNextDate(): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),

    }

    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_UOM_LIST_URL +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['company_code'] +
      '&' +
      'branchCode' +
      '=' +
      this.req_params['branch_code'] +
      '&' +
      'sisconCode' +
      '=' +
      this.req_params['siscon_code']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }



  getChallanDeliveryTermscList(): Observable<any> {
    
    
    this.req_params = {
     // company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
 
    }

    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CHALLAN_DELIVERY_TERMS_LIST_URL +
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
      })
    )
  }

}
