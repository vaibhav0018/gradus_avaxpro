import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpService: HttpService) {}

  getEmailVerified(payload: any): Observable<any> {
    const url = `${this.baseUrl}/getEmailVerify`;
    const headers = {
      Authorization: environment.loginToken,  // ✅ pull from environment
    };
    console.log('Payload for email verify:', payload);
    return this.httpService.post_header(url, payload, headers).pipe(
      map((res: HttpServiceResponseModel) => res)
    );
  }

  emailUnsubscribed(payload: any): Observable<any> {
    const url = `${this.baseUrl}/emailunsubcribe`;
    const headers = {
      Authorization: environment.loginToken,  // ✅ pull from environment
    };
    return this.httpService.post_header(url, payload, headers).pipe(
      map((res: HttpServiceResponseModel) => res)
    );
  }
}
