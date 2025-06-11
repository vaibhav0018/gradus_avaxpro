import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel'
import { environment } from '../../../environments/environment'
import { HttpService } from '../../../core/services/http.service'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl

  constructor(private httpService: HttpService) {
  }

  // getUser(payload: any): Observable<any> {
  //   const url = environment.baseUrl + '/encrypt-pwd/'
  //   console.log(payload)
  //   return this.httpService
  //     .post(url, payload)
  //     .pipe(map((res: HttpServiceResponseModel) => res))
  // }
  
  public userLogin(payload: { usr_userid: any; usr_password: any }): Observable<any> {
    const url = environment.baseUrl + '/login/'
    console.log(url)
    const headers = {
      Authorization: environment.loginToken,  // ✅ pull from environment
    };
    return this.httpService
      .post_header(url, payload, headers)
      .pipe(map((res: HttpServiceResponseModel) => res))
  }

  getUserPreference(): Observable<any> {
    let completeUrl = environment.baseUrl + '/get-user-preference'
    let payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      },
    }
    const headers = {
      Authorization: environment.loginToken,  // ✅ pull from environment
    };
    return this.httpService.post_header(completeUrl, payload, headers).pipe(
      map((res: HttpServiceResponseModel) => {
        const responseWithPayload = { ...res, payload: res };
        return responseWithPayload.payload;
      })
    )
  }
}
