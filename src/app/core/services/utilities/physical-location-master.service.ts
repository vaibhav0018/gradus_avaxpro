import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel';
import { HttpService } from '../http.service';
import { environment } from '../../../environments/environment';

const POST_PHYSICAL_LOCATION_DATA = 'addPhysicalLoactionData';
const POST_DELETE_PHYSICAL_LOCATION_DATA = 'deletePhysicalLoactionData';
const POST_SCRAP_PHYSICAL_LOCATION_DATA = 'addToScrapPhysicalLoactionData';
const GET_CRAD_DETAILS_DATA = 'getCardDetailsForPhysicalLocation';
const GET_PHYSICAL_LOCATION_FOR_MASTER = 'getPhysicalLocationForMaster';
const GET_GODOWN_MASTER_LIST = 'getgodownmasterlist'

@Injectable({
  providedIn: 'root'
})
export class PhysicalLocationMasterService {
  payload: any = {}
  req_params: any = {}
  completeUrl: string
  constructor(private http: HttpClient, private httpService: HttpService) { }

  addNewPhysicalLocation(values: any, godown_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_PHYSICAL_LOCATION_DATA
    this.payload = {
      phy_location: values,
      gpl_godown_code: godown_code,
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  deletePhysicalLocation(phy_location: any,godown_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_DELETE_PHYSICAL_LOCATION_DATA
    this.payload = {
      gpl_loc: phy_location,
      gpl_godown_code: godown_code,
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

  addToScrapPhysicalLocation(phy_location: any,godown_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_SCRAP_PHYSICAL_LOCATION_DATA
    this.payload = {
      gpl_loc: phy_location,
      gpl_godown_code: godown_code,
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

  getCardDetails(phy_location: any, godown_code: any): Observable<any> {
  //  console.log('In Function Call')
  //  debugger;
    this.completeUrl = environment.baseUrl + '/' + GET_CRAD_DETAILS_DATA
    this.payload = {
      gpl_loc: phy_location,
      gpl_godown_code: godown_code,
      userInformationDto: {
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      }
    }
    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }//getUsr_branch_code

  getPhysicalLocation(godownCode: any): Observable<any> {
    this.req_params = {
      godown_code: godownCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_PHYSICAL_LOCATION_FOR_MASTER +
      '?' +
      'goDownCode' +
      '=' +
      this.req_params['godown_code']
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getGodownMasterList(): Observable<any> {
    this.req_params = {
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_GODOWN_MASTER_LIST +
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
        return res
      }),
      catchError((error: any) => {
        return ''
      })
    )
  }
}
