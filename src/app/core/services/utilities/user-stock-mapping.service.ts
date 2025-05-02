import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';


const GET_USER_STOCK_DATA = 'getuserstockmasterlist';
const GET_MAKE_MASTER_DATA = 'getmakemasterlist';
const GET_BRANCH_MASTER_DATA = 'getbranchmasterlist';
const GET_GROUP_MASTER_DATA = 'getgroupmasterlist';
const GET_SUB_GROUP_MASTER_DATA = 'getitsubgroupmasterlist';
const POST_USER_STOCK_DATA = 'insertstockdata';
const POST_DELETE_USER_STOCK_DATA = 'deletestockdata';

@Injectable({
  providedIn: 'root'
})
export class UserStockMappingService {

  payload: object = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }



  getUserStock(pageNumber: any, pageSize: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_USER_STOCK_DATA
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
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getMakeMasterData(): Observable<any> {
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_MAKE_MASTER_DATA +
      '?' +
      'companyCode' +
      '=' +
      this.req_params['usr_company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getBranchMasterData(): Observable<any> {
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_BRANCH_MASTER_DATA +
      '?' +
      'branchCompanyCode' +
      '=' +
      this.req_params['usr_company_code']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getGroupMasterData(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_GROUP_MASTER_DATA
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
    }
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  addUserStockData(userId: any, branchcode: any, itgroup: any, makecode: any, modulecode: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_USER_STOCK_DATA
    this.payload = {
      stg_userid: userId,
      stg_branch: branchcode,
      stg_grp: itgroup,
      stg_make: makecode,
      stg_module: modulecode,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
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

  deleteUserStockData(userId: any, BranchId: any, groupId: any, make: any, modeId: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_DELETE_USER_STOCK_DATA
    this.payload = {
      stg_userid: userId,
      stg_branch: BranchId,
      stg_grp: groupId,
      stg_make: make,
      stg_module: modeId,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
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

  getSubGroupMasterData(main_group_code: any): Observable<any> {
    this.req_params = {
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      group_code:main_group_code,
    }
    this.completeUrl =
    environment.baseUrl +
    '/' +
    GET_SUB_GROUP_MASTER_DATA +
    '?' +
    'groupCode' +
    '=' +
    this.req_params['group_code'] 
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
