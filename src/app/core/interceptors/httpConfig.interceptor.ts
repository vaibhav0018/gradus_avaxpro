import { Injectable } from '@angular/core'
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    request = request.clone({
      setHeaders: {
        Authorization: atob( sessionStorage.getItem(btoa('token')) || ''),
        username: atob( sessionStorage.getItem(btoa('username')) || ''),

        userId: atob( sessionStorage.getItem(btoa('userId')) || ''),     
        usr_name: atob( sessionStorage.getItem(btoa('usr_name')) || ''),
        usr_of_siscon: atob( sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob( sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        fin_year_beg: atob( sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob( sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob( sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_br_city: atob( sessionStorage.getItem(btoa('usr_br_city')) || ''),
        usr_br_name: atob( sessionStorage.getItem(btoa('usr_br_name')) || ''),
        usr_company_code: atob( sessionStorage.getItem(btoa('usr_company_code')) || ''),
      },
    })

    return next.handle(request)
  }
}
