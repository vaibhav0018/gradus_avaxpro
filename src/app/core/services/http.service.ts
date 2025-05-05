import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHeaders,
  HttpContext,
  HttpParams,
} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs'; // ✅ correct BehaviorSubject import
import { HttpServiceResponseModel } from '../models/HttpServiceResponseModel';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner'; // ✅ Angular 19 MatSpinner update
import { map, scan } from 'rxjs/operators';
import { CommonsService } from '../../shared/services/commons.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements HttpInterceptor {
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  private totalRequests = 0;

  private spinnerTopRef: OverlayRef = this.cdkSpinnerCreate();
  spin$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private overlay: Overlay,
    private commonsService: CommonsService
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe(res => {
        if (res === 1) {
          this.showSpinner();
        } else if (res === 0) {
          if (this.spinnerTopRef.hasAttached()) this.stopSpinner();
        }
      });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.addRequests();
    request = request.clone({
      setHeaders: {
        // Authorization: atob(sessionStorage.getItem(btoa('token')) || ''),
        // userId: atob(sessionStorage.getItem(btoa('usr_userid')) || ''),
        // usr_name: atob(sessionStorage.getItem(btoa('usr_name')) || ''),
        // usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        // usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        // df_year_beg: atob(sessionStorage.getItem(btoa('df_year_beg')) || ''),
        // df_year_end: atob(sessionStorage.getItem(btoa('df_year_end')) || ''),
        // df_doc_no_ts_format: atob(sessionStorage.getItem(btoa('df_doc_no_ts_format')) || ''),
        // br_city: atob(sessionStorage.getItem(btoa('br_city')) || ''),
        // br_name: atob(sessionStorage.getItem(btoa('br_name')) || ''),
        // br_company_code: atob(sessionStorage.getItem(btoa('br_company_code')) || ''),
        // fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        // fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        // fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        // usr_br_city: atob(sessionStorage.getItem(btoa('usr_br_city')) || ''),
        // usr_br_name: atob(sessionStorage.getItem(btoa('usr_br_name')) || ''),
        // usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDEwIiwiaWF0IjoxNzQ3MTM4MDk0fQ.IVliJyjFQmZsPMnSqmYYoqVyuNwebkV5yP6_ZPcZgLJE7GKwF5YlW-jKbDmMnp_heOvkhg5xJnw86QYsG7wCyw",
        userId: "0010",
        usr_name: "SAJU",
        usr_of_siscon: "04",
        usr_of_branch: "06",
        df_year_beg: "01/04/2025",
        df_year_end: "31/03/2026",
        df_doc_no_ts_format: "00018",
        br_city: "023",
        br_name: "023",
        br_company_code: "023",
        fin_year_beg: "023",
        fin_year_end: "023",
        fin_year_format: "023",
        usr_br_city: "023",
        usr_br_name: "023",
        usr_company_code: "023",
      },
    });
    
    return new Observable(observer => {
      const subscription = next.handle(request).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.decreaseRequests();
            observer.next(event);
          }
        },
        error => {
          this.decreaseRequests();
          this.commonsService.hide();
        },
        () => {
          observer.complete();
        }
      );
      return () => subscription.unsubscribe();
    });
  }

  private addRequests() {
    if (this.totalRequests === 0) {
      this.isLoadingSubject.next(true);
    }
    this.totalRequests++;
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.isLoadingSubject.next(false);
    }
  }

  private cdkSpinnerCreate(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
  }

  private showSpinner() {
    this.spinnerTopRef.attach(new ComponentPortal(MatProgressSpinner)); // ✅ Updated
  }

  private stopSpinner() {
    this.spinnerTopRef.detach();
  }

  isLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  get(url: string): Observable<HttpServiceResponseModel> {
    return this.httpClient.get<HttpServiceResponseModel>(url);
  }

  post(url: string, data: any): Observable<any> {
    this.commonsService.show();
      return this.httpClient.post(url, data).pipe(
        map((res:any) => {
          this.commonsService.hide();
          res['payload'] = res;
          return res['payload'];
        })
      );
  }

  


  post_wo_spinner(url: string, data: any): Observable<any> {
    try {
      return this.httpClient.post<HttpServiceResponseModel>(url, data).pipe(
        map(res => {
          (res as any)['payload'] = res;
          return (res as any)['payload'];
        })
      );
    } catch (e) {
      console.log(e);
      return new Observable();
    }
  }

  post_header(url: string, data: any, headerParam: any): Observable<any> {
    const httpHeaders = new HttpHeaders(headerParam);
    return this.httpClient.post<HttpServiceResponseModel>(url, data, { headers: httpHeaders });
  }

  put(url: string, data: any): Observable<any> {
    return this.httpClient.put<HttpServiceResponseModel>(url, data);
  }

  delete(url: string, data: any): Observable<any> {
    return this.httpClient.delete<HttpServiceResponseModel>(url, data);
  }
}
