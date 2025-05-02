import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../../../core/models/HttpServiceResponseModel'
import { environment } from '../../../../environments/environment'
import { HttpService } from '../../../../core/services/http.service'
import { SnackbarComponent } from '../snackbar/snackbar/snackbar.component'



const GET_BOOKING_INSTR='get-common-bookinginstruction'
const GET_CONSIGNER_LIST='get-common-consignerlist'
const GET_PAYTERMS='get-common-paytermslist'
const GET_DOC_DELIVERY_MODE='get-common-doc-deliverymode'
const INSERT_DOC_REMARKS='insert-doc-remarks'
const UPDATE_DOC_REMARKS='update-doc-remarks'

@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  payload: any = {}
  completeUrl: string
  req_params: object = {}
  

  constructor(
    private httpService: HttpService
  ) { 

  }

  getBookingInstruction(): Observable<any> {
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.completeUrl = environment.baseUrl + '/' + GET_BOOKING_INSTR+'?company_code='+company_code
    this.payload = {
      company_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getConsinger(): Observable<any> {
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.completeUrl = environment.baseUrl + '/' + GET_CONSIGNER_LIST+'?company_code='+company_code
    this.payload = {
      company_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getPaymentTerm(pay_days: any): Observable<any> {
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.completeUrl = environment.baseUrl + '/' + GET_PAYTERMS+'?company_code='+company_code+'&pay_days='+pay_days
    this.payload = {
      company_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getDocDeliverymode(): Observable<any> {
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.completeUrl = environment.baseUrl + '/' + GET_DOC_DELIVERY_MODE+'?company_code='+company_code
    this.payload = {
      company_code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  


  updateRemark(param: any){
    this.completeUrl = environment.baseUrl + '/' + UPDATE_DOC_REMARKS
    this.payload = {
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
      common_row:{
        DR_DOC_NO:param.DR_DOC_NO,
        DR_SERIAL_NO:param.DR_SERIAL_NO,
        DR_REMARKS:param.DR_REMARKS,
        DR_CREATED_BY:atob(sessionStorage.getItem(btoa('userId')) || ''),
        DR_SISCON_CODE:atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        DR_BRANCH_CODE:atob(sessionStorage.getItem(btoa('usr_of_branch')) || '')

      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //console.log(res)
        return res['payload']
      })
    )
  }

  insertRemark(param: any){
    this.completeUrl = environment.baseUrl + '/' + INSERT_DOC_REMARKS
    this.payload = {
      common_row:{
        DR_DOC_NO:param.DR_DOC_NO,
        DR_SERIAL_NO:param.DR_SERIAL_NO,
        DR_REMARKS:param.DR_REMARKS,
        DR_CREATED_BY:atob(sessionStorage.getItem(btoa('userId')) || ''),
        DR_SISCON_CODE:atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        DR_BRANCH_CODE:atob(sessionStorage.getItem(btoa('usr_of_branch')) || '')
        },
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
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //console.log(res)
        return res['payload']
      })
    )
  }

  refreshDocCalc(doc_cal_reeq:any ,docCalcDataInput:any):any{
    docCalcDataInput = null;
    docCalcDataInput =doc_cal_reeq
    return docCalcDataInput;
  }

  openSnackBar(snackBar: any, message: any) {
      snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
      panelClass: ['blue-snackbar']
    });
  }

}
