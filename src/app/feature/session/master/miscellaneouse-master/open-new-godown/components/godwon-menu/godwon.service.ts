import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../../../core/services/http.service';
import { HttpServiceResponseModel } from '../../../../../../../core/models/HttpServiceResponseModel';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const GET_GODOWN_MASTER_LIST = 'getgodownmastermenulist';
const GET_GODOWN_CITY_LIST = 'getgodowncitylist';
const GET_CONTRY_STATE = 'getgodowncountrystate';
const POST_ADD_NEW_GODWON = 'addnewgodwon';
const GET_GODOWN_DETAILS = 'getgodowndetails';
const POST_UPDATE_GODWON = 'updategodwon'

@Injectable({
  providedIn: 'root'
})
export class GodwonService {

  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getGodownMenuList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_GODOWN_MASTER_LIST
    this.payload = {
      userInformationDto: {
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getStateList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_GODOWN_CITY_LIST
    this.payload = {
      userInformationDto: {
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
      },
    }
    return this.httpService.post(this.completeUrl,this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getGodwonDtl(gd_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_GODOWN_DETAILS
    this.payload = {
      gd_code:gd_code
    }
    return this.httpService.post(this.completeUrl,this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }


  getCountryState(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_CONTRY_STATE
    this.payload = {
      userInformationDto: {
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      },
    }
    return this.httpService.post(this.completeUrl,this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  addNewGodwon(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_ADD_NEW_GODWON
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateGodwon(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_GODWON
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
