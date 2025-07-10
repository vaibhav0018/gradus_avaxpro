import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../../../core/services/http.service';
import { HttpServiceResponseModel } from '../../../../../../../core/models/HttpServiceResponseModel';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const GET_INDUSTRY_MASTER_DATA = 'getindustrymasterlist';
const POST_INDUSTRY_MASTER_DATA = 'addindustry';
const POST_UPDATE_INDUSTRY_MASTER_DATA = 'updateindustry';

@Injectable({
  providedIn: 'root'
})
export class IndustryMasterService {

  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getIndustryList(pageNumber: any, pageSize: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_INDUSTRY_MASTER_DATA
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

  addNewIndustry(ind_code:any, new_ind_code:any, ind_name: any, sub_ind_code: any, new_sub_ind_code: any, sub_ind_name: any, new_sub_sub_ind_code: any, sub_sub_ind_name: any, sub_sub_ind_code:any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_INDUSTRY_MASTER_DATA
    this.payload = {
      ind_industry_code: ind_code,
      new_ind_industry_code: new_ind_code,
      ind_industry: ind_name,
      sind_subindustry_code: sub_ind_code,
      new_sind_subindustry_code: new_sub_ind_code,
      sind_industry_desc: sub_ind_name,
      new_ssind_sub_subindustry_code: new_sub_sub_ind_code,
      ssind_sub_subindustry_code: sub_sub_ind_code,
      ssind_industry_desc: sub_sub_ind_name,
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

  updateIndustry(new_ind_name: any, ind_code: any, new_sub_ind_name: any, sub_ind_code: any, new_ss_ind_code: any, ss_ind_code:any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_INDUSTRY_MASTER_DATA
    this.payload = {
      ind_industry: new_ind_name,
      ind_industry_code: ind_code,
      sind_industry_desc: new_sub_ind_name,
      sind_subindustry_code:sub_ind_code,
      ssind_industry_desc:new_ss_ind_code,
      ssind_sub_subindustry_code:ss_ind_code,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }
    }
   // console.log('payload For Update ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
