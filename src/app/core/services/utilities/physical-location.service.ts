import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const GET_PHYSICAL_LOCATION_URL = 'getphysicallocation'
const POST_PHYSICAL_LOCATION_LIST = 'getphysicallocationlist'

@Injectable({
  providedIn: 'root',
})
export class PhysicalLocationService {
  payload: object = {}
  req_params: any = {}   // object = {}
  completeUrl: string
  constructor(private httpService: HttpService, private commonsService: CommonsService) {}

  getPhysicalLocation(godownCode: any): Observable<any> {
    this.commonsService.show()
    this.req_params = {
      godown_code: godownCode,
    }
    this.completeUrl =
      environment.baseUrl +
      '/' +
      GET_PHYSICAL_LOCATION_URL +
      '?' +
      'goDownCode' +
      '=' +
      this.req_params['godown_code']

    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }

  postPhysicalLocationList(godownCode: any): Observable<any> {
    this.commonsService.show()
    this.completeUrl = environment.baseUrl + '/' + POST_PHYSICAL_LOCATION_LIST

    this.payload = {
      goDownDtoList: godownCode,
    }

    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }
}
