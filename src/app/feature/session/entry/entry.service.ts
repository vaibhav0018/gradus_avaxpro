import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../core/services/http.service';
import { map } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { HttpClient, HttpEventType } from '@angular/common/http'

const UPDATE_ITEM_REMARKS = 'updateItemRemarks'
const UDPATE_DOC_CALC = 'entryCommonsUpdateService'
const CHECK_PARTY_DECL_FORM_AND_FILE_RCVD_OR_NOT = 'checkPartyDeclFormAndFileRcvdOrNot'
const SEND_MAIL = 'sendMail'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  message: string[] = []
  cssValue: string
  text: string

  payload: object = {}
  req_params: object = {}
  completeUrl: string

  constructor(private httpService: HttpService,
    private http: HttpClient,) { }

  public showMsg(messageType : any, moduleId? : any, dynamicMessage? : any) {
    switch (messageType) {
      case 'success':
        this.cssValue = 'success-message';
        this.text = 'Data Found';
        break;
      case 'error':
        this.cssValue = 'color-red';
        this.text = 'Data Not Found';
        break;
      case 'noAccess':
        this.cssValue = 'color-red';
        this.text = 'YOU HAVE NO ACCESS PERMISSION FOR ' + moduleId;
        break;
      case 'dynamicText':
        this.cssValue = 'color-red';
        this.text = dynamicMessage;
        break;
    }
    this.message[0] = this.cssValue,
      this.message[1] = this.text
    return this.message;
  }


  updateItemRemarks(filter : any): Observable<any> {
    this.req_params = {
      docNo: filter.docNo,
      itm_sr_no: filter.itm_sr_no,
      fromFlag: filter.fromFlag,
      itemRemarks: filter.itemRemarks,
      itemNote: filter.itemNote,
      doRemakrs: filter.doRemakrs,
      itemCode: filter.itemCode,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || '')
      }
    }

    this.completeUrl = environment.baseUrl + '/' + UPDATE_ITEM_REMARKS
    console.log(' complete url ', this.completeUrl);
    //alert('inside entry servie ')
    return this.httpService.post(this.completeUrl, this.req_params).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  commonUpdateSerice(res: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + UDPATE_DOC_CALC
    this.payload = res
    console.log(res)
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  public upload(data : any, userId : any) {
    let uploadURL = 'uploadFileNew';

    this.completeUrl = environment.baseUrl + '/' + uploadURL

    return this.http.post<any>(this.completeUrl, data,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / (event.total ?? 0));
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
      );
  }


  checkPartyDeclFormAndFileRcvdOrNot(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + CHECK_PARTY_DECL_FORM_AND_FILE_RCVD_OR_NOT
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  sendMail(payload : any): Observable<any> {

     /* payload["userInformationDto"] = {
      usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
      usr_name: atob(sessionStorage.getItem(btoa('username'))),
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
      fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
      usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
    }  */

      payload["usr_userid"] = atob(sessionStorage.getItem(btoa('userId')) || ''),
      payload["usr_name"] = atob(sessionStorage.getItem(btoa('username')) || ''),
      payload["fin_year_beg"] = atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
      payload["fin_year_end"] = atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
      payload["fin_year_format"] = atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
      payload["usr_company_code"] = atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      payload["usr_of_siscon"] = atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      payload["usr_of_branch"] = atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      payload["usr_state_code"] = atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),

      this.completeUrl = environment.baseUrl + '/' + SEND_MAIL
    return this.httpService.post_wo_spinner(this.completeUrl, { common_row: payload }).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

}
