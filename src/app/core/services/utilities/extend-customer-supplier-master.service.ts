import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'

import { MatSnackBar } from '@angular/material/snack-bar'

const GET_CUST_SUPPLR_LIST = 'getCustSupplrList'
const GET_CUST_SUPPLR_DATA = 'getCustSupplData'
const GET_CUST_SUPPLR_COMPANY_DATA = 'getCustSuppCmpData'
const POST_CUST_SUPPLR_COMPANY_DATA = 'extendCustSuppCmpData'
const GET_CUST_SUPPLR_HISTORY_DATA = 'getCusSuppHistoryList'
const GET_PAY_TERM_DATA_LIST = 'getpayTermList'
const POST_UPDATE_CUST_SUPPLR_COMPANY_DATA = 'updateExtendCustSuppCmpData'
const GET_LIMIT_DAYS_VALIDATION_LIST = 'getValidationList'

@Injectable({
  providedIn: 'root',
})
export class ExtendCustomerSupplierMasterService {
  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private httpService: HttpService,
    private snackBar: MatSnackBar
    ) { }


  getCustSupplrList(cust_supp: any): Observable<any> {
    this.req_params = {
      cust_supp: cust_supp,
    }
    this.completeUrl = environment.baseUrl + '/' + GET_CUST_SUPPLR_LIST + '?' + 'cust_supp' + '=' + this.req_params['cust_supp']
    //   console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getCustSuppList(cust_supp: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_CUST_SUPPLR_DATA
    this.payload = {
      cust_supp: cust_supp,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    //    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getCustSuppCmpList(cust_supp: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_CUST_SUPPLR_COMPANY_DATA
    this.payload = {
      cust_supp: cust_supp,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    //    console.log('payload ', this.payload);
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  extendCustomer(cust_supp: any, values: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CUST_SUPPLR_COMPANY_DATA
    this.payload = {
      cust_supp: cust_supp,
      companyList: values
/*       userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      } */
    }
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getCustSuppHistoryList(cust_supp: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_CUST_SUPPLR_HISTORY_DATA
    this.payload = {
      cust_supp: cust_supp,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
   //  console.log('payload ', this.payload);
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getPayTermList(pay_term_days: any): Observable<any> {
    this.req_params = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      pay_term_days:pay_term_days
    }
    this.completeUrl =
      environment.baseUrl + '/' + GET_PAY_TERM_DATA_LIST + '?' + 'companyCode' + '=' + this.req_params['company_code'] + '&' + 'pay_term_days' + '=' +this.req_params['pay_term_days']
    //   console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateExtendCustomer(cr_limit: any, pay_term_days: any, pt_code: any, handle_by_user: any, instruct_by_user: any, followed_by_user: any, grn_by: any, CustSupp: any, company_code: any,item_calc: any,remark: any,attachment_reqd: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_CUST_SUPPLR_COMPANY_DATA
    this.payload = {

      cr_limit: cr_limit,
      pay_term_days: pay_term_days,
      pt_code: pt_code,
      handled_by_id: handle_by_user,
      instructed_by_id: instruct_by_user,
      followed_by_id: followed_by_user,
      ccs_grn_flg: grn_by,
      cust_supp: CustSupp,
      sc_company_code: company_code,
      ccs_print_item_calc:item_calc,
      remarks:remark,
      ccs_attachment_reqd:attachment_reqd,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
   
      }
    }
    console.log(attachment_reqd)
    

     console.log('payload ', this.payload);
      return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  // openSnackBar(message) {
  //   this.snackBar.openFromComponent(SnackbarMasterComponent, {
  //     data: message,
  //     duration: 10000
  //   });
  // }

  getValidationList(){
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      },
    }
    this.completeUrl = environment.baseUrl + '/' + GET_LIMIT_DAYS_VALIDATION_LIST
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
    map((res: HttpServiceResponseModel) => {
      res['payload'] = res
      return res['payload']
    })
  )
  }

  excelUpload(payload: any) {    
    this.completeUrl = environment.baseUrl + '/bulkPartyExcelUpload'
    console.log('payload ', payload);
    return this.httpService.post(this.completeUrl, payload)
  }

  getPartyListData(payload: any) {
    this.completeUrl = environment.baseUrl + '/getPartyListData'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updatePartyListData(payload: any) {
    this.completeUrl = environment.baseUrl + '/updatePartyListData'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getChannelFinanceData(payload :any){
    this.completeUrl = environment.baseUrl + '/getChannelFinanceData'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}


