import { Injectable } from '@angular/core';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const GET_USER_DATA = 'getalluserinformationlist'

@Injectable({
  providedIn: 'root'
})
export class ViewUserInfoServiceService {

  req_params: object = {}
  completeUrl: string
  payload: any = {}

  constructor(private httpService: HttpService) { }

  // getAllUserDataInformation(godown_code, card_no, inot_no,from_entry): Observable<any> {
    getAllUserDataInformation(fromFlg : any,username : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_USER_DATA
    this.payload = {
      fromFlg: fromFlg,
       user_short_name: username,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

}


