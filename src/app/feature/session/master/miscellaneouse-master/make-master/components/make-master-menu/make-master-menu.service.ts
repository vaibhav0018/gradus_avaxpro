import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../../../../../../core/models/HttpServiceResponseModel';
import { HttpService } from '../../../../../../../core/services/http.service';

import { HttpClient } from '@angular/common/http'

const POST_MAKE_MASTER_LIST = 'getMakeMasterservicreList';
const POST_MAKE_MASTER_DATA = 'addMakeMasterservice';
const POST_COMPANY_LIST = 'getCompanyList';
const POST_UPDATE_MAKE = 'updateMakeMasterData';
const GET_DUPLICATE_MAKE = 'getMakeStatus';

@Injectable({
  providedIn: 'root'
})
export class MakeMasterService {
  payload: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }
  createNewMake(make_code: any, make_short_name: any, make_desc: any, values: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_MAKE_MASTER_DATA
    this.payload = {
      make_code: make_code,
      make_short_name: make_short_name,
      make_desc: make_desc,
      companyList: values,
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
  getMakeMasterView(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_MAKE_MASTER_LIST
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      },
      // pageDto : {
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
  getCompanyList(make_code: any, flag: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_COMPANY_LIST
    this.payload = {
      make_code: make_code,
      flg_extend:flag,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_userid1: atob(sessionStorage.getItem(btoa('userId')) || ''),
      }
    }
 //   console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateMakeMasterData(make_short_name:any , make_desc:any, make_code:any, values:any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_MAKE
    this.payload = {
      make_short_name: make_short_name,
      make_desc: make_desc,
      make_code: make_code,
      companyList: values,
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
  chkDuplicateMake(make_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_DUPLICATE_MAKE
    this.payload = {
      make_code: make_code,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      }
    }
   // console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
