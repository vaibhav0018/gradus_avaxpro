import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'
import { CommonsService } from '../../../shared/services/commons.service'

const POST_DYNAMIC_COLUMN_LIST_URL = 'dynamiccolumnslist'
const POST_SAVE_DYNAMIC_COLUMN_LIST_URL = 'savedynamiccolumnslist'

@Injectable({
  providedIn: 'root',
})
export class SaveColumnsService {
  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(
    private httpService: HttpService,
    private commonsService: CommonsService
  ) {}

  postDynamicColumns(fromPage: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_DYNAMIC_COLUMN_LIST_URL

    this.payload = {
      fromPage: fromPage,
      userId: atob(sessionStorage.getItem(btoa('id')) || ''),
    }

    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      }),
      catchError((error: any) => {
        //this.commonsService.hide()
        // return throwError(new Error(error) || 'Server error')
        return ''
      })
    )
  }

  postSaveDynamicColumns(payload: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_SAVE_DYNAMIC_COLUMN_LIST_URL

    const savePayload = {
      userId: atob(sessionStorage.getItem(btoa('id')) || ''),
      fromPage: payload[0].fromPage,
      userConfigColumnsDto: payload,
    }

    return this.httpService.post(this.completeUrl, savePayload).pipe(
      map((res: HttpServiceResponseModel) => {
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
