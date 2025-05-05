import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://15.206.59.170/AvaxPro/avaxpro/api/login/'; 



  constructor(private http: HttpClient) {}


  // let url = this.baseUrl+"/login/"; 
  // return this.http.post(url, payload).pipe(
  //   map((response: any) => response)
  // );

  userLogin(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  getUserPreference(): Observable<any> {
    const url = `${this.baseUrl}/get-user-preference`;
    const payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      },
    };

    return this.http.post(url, payload).pipe(
      map((res: any) => res)
    );
  }
}
