import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

const GET_PARTY_LIST = 'getmiscpartyList'
const GET_INDUSTRY_LIST = 'getIndustryList'
const GET_COUNTRY_LIST = 'getCountryList'
const GET_STATE_LIST_DATA = 'getStateListData'
const GET_MISC_PARTY_DATA = 'getMiscPartyList'
const GET_MIS_PARTY_MENU_LIST = 'getmiscpartymenulist'
/* const POST_MISC_PARTY_DATA = 'addNewParty'
const POST_UPDATE_MISC_PARTY_DATA = 'updateMiscParty' */


@Injectable({
  providedIn: 'root'
})

export class MiscPartyMaintenanceServiceService {

  payload: object = {}
  req_params: any = {}
  completeUrl: string

  constructor(private httpService: HttpService) { }

  getPartyList(party_code: any): Observable<any> {
    this.req_params = {
      party_code: party_code,
    }
    this.completeUrl = environment.baseUrl + '/' + GET_PARTY_LIST + '?' + 'party_code' + '=' + this.req_params['party_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getIndustryList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_INDUSTRY_LIST
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => res),
      catchError((error: any) => throwError(error.json().error || 'Server error'))
    )
  }

  getCountryList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_COUNTRY_LIST
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => res),
      catchError((error: any) => throwError(error.json().error || 'Server error'))
    )
  }

  getMiscPartyMenuList(pageNumber: any, pageSize: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_MIS_PARTY_MENU_LIST
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      },
      pageDto: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getMiscPartList(party_code: any): Observable<any> {
    console.log(party_code, ' party_code')
    this.completeUrl = environment.baseUrl + '/' + GET_MISC_PARTY_DATA
    this.payload = {
      mp_party_code: party_code,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }
    }
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getStateListData(st_ctr_code: string): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_STATE_LIST_DATA + '?' + 'st_ctr_code' + '=' + st_ctr_code
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => res),
      catchError((error: any) => throwError(error.json().error || 'Server error'))      
    )
  }

  /* createNewCustomer(party_code, mp_party_name, handle_by, industry, pay_term_day, pay_code, address1, address2, address3, address4, pin_code,
    state_name, lattitude, longitude, country, telephoen1, telephoen2, fax1, fax2, email1, email2, pan_no,
    gst_no, special_tax, state_code): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + POST_MISC_PARTY_DATA

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
      },
      mp_party_code: party_code,
      mp_name: mp_party_name,
      mp_handled_by: handle_by,
      mp_pay_term_day: pay_term_day,
      mp_pay_code: pay_code,
      mp_industry_head_code: industry,
      mp_allow_special_tax: special_tax,
      customerAddressMasterDto: {
        csad_address1: address1,
        csad_address2: address2,
        csad_address3: address3,
        csad_address4: address4,
        csad_pincode: pin_code,
        csad_state_code: state_code,
        csad_state: state_name,
        csad_tel_no1: telephoen1,
        csad_tel_no2: telephoen2,
        csad_fax1: fax1,
        csad_fax2: fax2,
        csad_email1: email1,
        csad_email2: email2,
        csad_gst_no: gst_no,
        csad_country_code: country,
        csad_lattitude: lattitude,
        csad_longitude: longitude,
        csad_pan_no: pan_no,
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  

  updateNewCustomer(party_code, mp_party_name, handle_by, industry, pay_term_day, pay_code, address1, address2, address3, address4, pin_code,
    state_name, lattitude, longitude, country, telephoen1, telephoen2, fax1, fax2, email1, email2, pan_no,
    gst_no, special_tax): Observable<any> {

    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_MISC_PARTY_DATA

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
      },
      mp_party_code: party_code,
      mp_name: mp_party_name,
      mp_handled_by: handle_by,
      mp_pay_term_day: pay_term_day,
      mp_pay_code: pay_code,
      mp_industry_head_code: industry,
      mp_allow_special_tax: special_tax,
      customerAddressMasterDto: {
        csad_address1: address1,
        csad_address2: address2,
        csad_address3: address3,
        csad_address4: address4,
        csad_pincode: pin_code,
        csad_state_code: state_name,
        csad_tel_no1: telephoen1,
        csad_tel_no2: telephoen2,
        csad_fax1: fax1,
        csad_fax2: fax2,
        csad_email1: email1,
        csad_email2: email2,
        csad_gst_no: gst_no,
        csad_country_code: country,
        csad_lattitude: lattitude,
        csad_longitude: longitude,
        csad_pan_no: pan_no,
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
 */


}
