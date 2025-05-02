import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const GET_BRANCH_TRANSFER_DATA = 'getclsdateforbr';
const GET_FROM_BRANCH_LIST = 'getfrombranchlist';
const GET_TO_BRANCH_LIST = 'gettobranchlist';

const POST_BRANCH_TRANSFER_DATA = 'addclsdateforbr';

const GET_BRANCH_TRANSFER_MENU_DATA = 'getbranchtrfmenulist';

@Injectable({
  providedIn: 'root'
})
export class BranchTransferClosingDatesService {

  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getBranchTransferData(fromBranch: any, ToBranch: any, ClosingMonths: any): Observable<any> {//pageNumber, pageSize,
    this.completeUrl = environment.baseUrl + '/' + GET_BRANCH_TRANSFER_DATA
    this.payload = {
      tc_from_branch:fromBranch,
      tobranchlist:ToBranch,
      monthslist:ClosingMonths,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
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

  getFromBranchList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_FROM_BRANCH_LIST
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getToBranchList(fromBranch: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_TO_BRANCH_LIST
    this.payload = {
      tc_from_branch:fromBranch,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  addClsDateForBrTrf(fromBranch: any, toBranch: any, months: any, days: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_BRANCH_TRANSFER_DATA
    this.payload = {
      tc_from_branch:fromBranch,
      tobranchlist:toBranch,
      monthslist:months,
      tc_days:days,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getBranchTransferMenuData(): Observable<any> {//pageNumber, pageSize
    this.completeUrl = environment.baseUrl + '/' + GET_BRANCH_TRANSFER_MENU_DATA
    this.payload = {
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),

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
}
