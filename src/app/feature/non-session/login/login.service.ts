import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { HttpService } from '../../../core/services/http.service';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  constructor(private http: HttpClient, private httpService: HttpService) {}


  // let url = this.baseUrl+"/login/"; 
  // return this.http.post(url, payload).pipe(
  //   map((response: any) => response)
  // );

  getData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_auth_token',
      'X-Custom-Header': 'some-value'
    });

    return this.http.get('https://api.example.com/data', { headers });
  }

  postData(payload: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Request-ID', 'unique-id');

    return this.http.post('https://api.example.com/data', payload, { headers });
  }


  // userLogin(payload: any): Observable<any> {
  //   return this.http.post(environment.baseUrl + '/login/', payload).pipe(
  //     map((res: any) => res)
  //   );
  // }

    public userLogin(payload: any): Observable<any> {
    const url = environment.baseUrl + '/login/'
    console.log(url)
    return this.httpService.post(url, payload).pipe
    (map((res: HttpServiceResponseModel) =>{
        res['payload'] = res
        // console.log(res)
        return res['payload']
      }))
  }



  getUserPreference(): Observable<any> {
    const url = environment.baseUrl + '/get-user-preference';
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

  // ==============================================================================================================================

  // baseUrl = environment.baseUrl

  // constructor(private httpService: HttpService) {
  // }

  // getUser(payload: any): Observable<any> {
  //   const url = environment.baseUrl + '/encrypt-pwd/'
  //   console.log(payload)  
  //   return this.httpService
  //     .post(url, payload)
  //     .pipe(map((res: HttpServiceResponseModel) => res))
  // }
  
  // public userLogin(payload: any): Observable<any> {
  //   const url = environment.baseUrl + '/login/'
  //   console.log(url)
  //   return this.httpService
  //     .post(url, payload)
  //     .pipe(map((res: HttpServiceResponseModel) => res))
  // }

  // getUserPreference(): Observable<any> {
  //   let completeUrl = environment.baseUrl + '/get-user-preference'
  //   let payload = {
  //     userInformationDto: {
  //       usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
  //       usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
  //       fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
  //       fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
  //       fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
  //       usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
  //       usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
  //       usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
  //       usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
  //     },
  //   }
  //   return this.httpService.post(completeUrl, payload).pipe(
  //     map((res: HttpServiceResponseModel) => {
  //       res['payload'] = res
  //       return res['payload']
  //     })
  //   )
  // }






  }


