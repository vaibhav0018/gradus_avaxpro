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
        Authorization: atob(localStorage.getItem(btoa('token')) || ''),
        username: atob(localStorage.getItem(btoa('username')) || ''),

        userId: atob(localStorage.getItem(btoa('userId')) || ''),     
        usr_name: atob(localStorage.getItem(btoa('usr_name')) || ''),
        usr_of_siscon: atob(localStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(localStorage.getItem(btoa('usr_of_branch')) || ''),
        fin_year_beg: atob(localStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(localStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(localStorage.getItem(btoa('fin_year_format')) || ''),
        usr_br_city: atob(localStorage.getItem(btoa('usr_br_city')) || ''),
        usr_br_name: atob(localStorage.getItem(btoa('usr_br_name')) || ''),
        usr_company_code: atob(localStorage.getItem(btoa('usr_company_code')) || ''),
      },
    })

    return next.handle(request)
  }
}
