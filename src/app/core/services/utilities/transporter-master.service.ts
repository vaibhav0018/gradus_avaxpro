import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const GET_TRANSPORTER_DATA = 'getTransporterMasterList';
const POST_TRANSPORTER_DATA = 'addTransporter';
const POST_TRANSPORTER_DATA_UPDATE = 'updateTransporter';
const GET_CURRENT_COMPANY_CODE = 'getCurrentCmpName';
const GET_TRANSPORTER_DATA_WITH_PAGINATION = 'getTransporterMasterListWithPagination';
const POST_VALIDATE_DUPLICATE_GST_IN_TRANSPORTER = 'checkduplicategstintransporter'
const CITY_LIST  ='getStateWiseCity';
@Injectable({
  providedIn: 'root'
})
export class TransporterMasterService {
  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getTransporterList(pageNumber: any, pageSize: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_TRANSPORTER_DATA
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),

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

  getTransporterDtlWithPaginationList(filterValues: any, pageNumber: any, pageSize: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_TRANSPORTER_DATA_WITH_PAGINATION
    this.payload = {
      filterValues: filterValues,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),

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

  createNewTransporter(tr_name: any, tr_gst_id: any, tr_gst_no: any, tr_address: any, tr_city: any, tr_pincode: any, tr_state: any, tr_tel_no1: any, tr_tel_no2: any, tr_emailId: any, tr_fax: any, tr_country: any ,tr_gst_flg: any,tr_block_flg: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_TRANSPORTER_DATA
    this.payload = {
      tr_name: tr_name,
      tr_gst_id: tr_gst_id,
      tr_gst_flg: tr_gst_flg,
      tr_gst_no: tr_gst_no,
      tr_address: tr_address,
      tr_city: tr_city,
      tr_pincode: tr_pincode,
      tr_state: tr_state,
      tr_tel_no1: tr_tel_no1,
      tr_tel_no2: tr_tel_no2,
      tr_emailid: tr_emailId,
      tr_fax: tr_fax,
      tr_country: tr_country,
      tr_block_flg:tr_block_flg,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }
    }
    //  console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateTransporter(tr_name: any, tr_gst_id: any, tr_gst_no: any, tr_address: any, tr_city: any, tr_pincode: any, tr_state: any, tr_tel_no1: any, tr_tel_no2: any, tr_emailId: any, tr_fax: any, tr_country: any, tr_code : any , tr_gst_flg: any,tr_block_flg: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_TRANSPORTER_DATA_UPDATE
    this.payload = {
      tr_name: tr_name,
      tr_gst_id: tr_gst_id,
      tr_gst_flg: tr_gst_flg,
      tr_gst_no: tr_gst_no,
      tr_address: tr_address,
      tr_city: tr_city,
      tr_pincode: tr_pincode,
      tr_state: tr_state,
      tr_tel_no1: tr_tel_no1,
      tr_tel_no2: tr_tel_no2,
      tr_emailid: tr_emailId,
      tr_fax: tr_fax,
      tr_country: tr_country,
      tr_code: tr_code,
      tr_block_flg:tr_block_flg,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
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

  getCurrentCountry(): Observable<any> {
    this.req_params = {
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),   
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),

    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_CURRENT_COMPANY_CODE +
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

  checkDuplicateGstNoInTransporter(filter: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_VALIDATE_DUPLICATE_GST_IN_TRANSPORTER
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }
  getStateWiseCity(stateCode :any){
    this.completeUrl = environment.baseUrl + '/' + CITY_LIST+'?stateCode='+stateCode;
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
