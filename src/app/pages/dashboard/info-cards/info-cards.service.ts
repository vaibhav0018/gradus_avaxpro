import { Injectable } from '@angular/core'; // Needed for @Injectable
import { HttpService } from '../../../core/services/http.service'; // Needed for HttpService
import { Observable } from 'rxjs'; // Used as return type for your API method
import { map } from 'rxjs/operators'; // Used if you're transforming the API response
import { CommonsService } from '../../../shared/services/commons.service'; // Used for show/hide loader/spinner
import { formatDate } from '@angular/common';                     
import { environment } from '../../../environments/environment';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const QTR_DATA = 'getdashdata-qtr'
const SALES_DATA = 'getdashdata-sales'
const PRODUCT_DATA = 'getdashdata-product'
const BRANCH_DATA = 'getdashdata-branch'
const STOCK_DATA = 'getdashdata-stock'
const USER_PREFERENCE = 'get-user-preference'
const UPDATE_USER_PREFERENCE = 'update-user-preference'
const GET_OS_DETAIL = 'get-dashboard-os-detail'
const GET_SALES_DETAIL = 'get-sales-details'
const GET_BR_SALES_DOCTYPE_DETAIL = 'get-branch-sales-doctype-details'
const GET_PENDING_DOCS = 'get-pending-docs'
const GET_PENDING_DOCS_PO = 'get-pending-docs-po'
const GET_PENDING_DOCS_QTN = 'get-pending-docs-qtn'
const GET_ALL_BRANCH_SALES = 'getdashdata-all_branch_sales'
const GET_STK_VALUATION_DATA = 'getstockvaluationdata'
const UPDATE_USER_DEFAULT_PAGE = 'update-user-default-page'

const GET_GODOWN_DATA = 'getdashdata-godown'
@Injectable({
    providedIn: 'root'
  })
  export class 
  InfoCardsService {
  
    payload: object = {}
    completeUrl: string
  
    constructor(private httpService: HttpService, private commonsService: CommonsService, private http:HttpClient) { }
  
    getQtrData(as_on_date: any): Observable<any> {
      this.commonsService.show()
      this.completeUrl = environment.baseUrl + '/' + QTR_DATA
      // this.payload = {
      //   userInformationDto: {
      //     usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
      //     usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
      //     fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
      //     fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
      //     fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
      //     usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      //     usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      //     usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      //     usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      //   },
      //   asOnDate: as_on_date
      // }
      return this.httpService.post(this.completeUrl, {
        userInformationDto: {
              usr_userid: "0010",
              usr_name: "SHRIYA",
              fin_year_beg: "2020-01-01",
              fin_year_end: "2020-12-31",
              fin_year_format: "00082",
              usr_company_code: "01",
              // usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
              // usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
              // usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
            },
      }).pipe(
        map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      }))   
    }

    refreshDashboard(): Observable<any> {

      const token = atob(sessionStorage.getItem(btoa('token')) || '');
      console.log('token', token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token    // or `Bearer ${token}`
        });


        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/refreshDashboard'
        this.payload = {
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
        }
        
        console.log("3--");
        // return this.http.post<any>(this.completeUrl, this.payload, {headers});
        return this.httpService.post(this.completeUrl, this.payload).pipe(
              map((res: HttpServiceResponseModel) => {
                // this.commonsService.hide()
                res['payload'] = res
                return res['payload']
          })
        )
        
      }
    
      getSalesData(as_on_date: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + SALES_DATA
        this.payload = {
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
          asOnDate: as_on_date
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getProductData(as_on_date: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + PRODUCT_DATA
        this.payload = {
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
          asOnDate: as_on_date
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getStockData(as_on_date: any ): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + STOCK_DATA
        this.payload = {
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
    
          asOnDate: as_on_date
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getBranchData(as_on_date: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + BRANCH_DATA
        this.payload = {
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
          asOnDate: as_on_date,
        }
        console.log('payload===in getbranchdata service.ts', this.payload)
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      loadAllBranchSalesData(as_on_date: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_ALL_BRANCH_SALES
        this.payload = {
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
          asOnDate: as_on_date
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      loadGodownData(): Observable<any> {
          this.commonsService.show()
          this.completeUrl = environment.baseUrl + '/' + GET_GODOWN_DATA
          this.payload = {
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
           }
           return this.httpService.post(this.completeUrl, this.payload).pipe(
           map((res: HttpServiceResponseModel) => {
           this.commonsService.hide()
           res['payload'] = res
           return res['payload']
           })
           )
      }


  getFormattedDate(res: any) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

      getSalesDetail(param: any): Observable<any> {
        console.log("param=",param)
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_SALES_DETAIL
        this.payload = {
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
          as_on_date: param.as_on_date,
          company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
          siscon_code: param.siscon_code,
          branch_code: param.branch_code,
          from_date: this.getFormattedDate(param.from_date),
          to_date: this.getFormattedDate(param.to_date),
          period: param.period,
          display_type: param.display_type,
          rpt_type: param.rpt_type,
          doc_type:param.doc_type
        }
        // console.log("param.to_date=",param.to_date)
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getBranchSalesDocTypeDetail(param: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_BR_SALES_DOCTYPE_DETAIL
        this.payload = {
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
          as_on_date: param.as_on_date,
          company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
          siscon_code: param.siscon_code,
          branch_code: param.branch_code,
          from_date: this.getFormattedDate(param.from_date),
          to_date: this.getFormattedDate(param.to_date),
          period: param.period,
          display_type: param.display_type,
          rpt_type: param.rpt_type,
          doc_type: param.doc_type
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getPendingDocsAo(param: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_PENDING_DOCS
        this.payload = {
          userInformationDto: {
            usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
            usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
            fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
            fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
            fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
            usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
            usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
            usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),

          },
          company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
          siscon_code: param.siscon_code,
          branch_code: param.branch_code,
          branch: param.branch,
          main_group: param.main_group,
          sub_group: param.sub_group,
          industry: param.industry,
          display_order: param.display_order,
          rpt_type: param.rpt_type,
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getPendingDocsQtn(param: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_PENDING_DOCS_QTN
        this.payload = {
          userInformationDto: {
            usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
            usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
            fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
            fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
            fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
            usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
            usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
            usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        
          },
          company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
          siscon_code: param.siscon_code,
          branch_code: param.branch_code,
          branch: param.branch,
          main_group: param.main_group,
          sub_group: param.sub_group,
          industry: param.industry,
          display_order: param.display_order,
          rpt_type: param.rpt_type,
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getOSDetail(param: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_OS_DETAIL
        this.payload = {
          common_row: {
            as_on_date: param.as_on_date,
            company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
            siscon_code: param.siscon_code,
            branch_code: param.branch_code,
            period: param.period,
            display_type: param.display_type,
            rpt_type: param.rpt_type
          },
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
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }

      getStockValuationData(param: any): Observable<any> {
        this.commonsService.show()
        this.completeUrl = environment.baseUrl + '/' + GET_STK_VALUATION_DATA
        this.payload = {
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
          asOnDate: param.as_on_date,
          company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
          siscon_code: param.siscon_code,
          branch_code: param.branch_code,
          main_group: param.main_group,
          make_code: param.make,
          item_code: param.item_code,
          display_order: param.display_order,
          rpt_type: param.rpt_type,
          doc_type: param.doc_type
        }
        return this.httpService.post(this.completeUrl, this.payload).pipe(
          map((res: HttpServiceResponseModel) => {
            this.commonsService.hide()
            res['payload'] = res
            return res['payload']
          })
        )
      }


  getPendingDocsPo(param: any): Observable<any> {
    this.commonsService.show()
    this.completeUrl = environment.baseUrl + '/' + GET_PENDING_DOCS_PO
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),

      },
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
      siscon_code: param.siscon_code,
      branch_code: param.branch_code,
      branch: param.branch,
      main_group: param.main_group,
      sub_group: param.sub_group,
      industry: param.industry,
      display_order: param.display_order,
      rpt_type: param.rpt_type,
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        this.commonsService.hide()
        res['payload'] = res
        return res['payload']
      })
    )
  }
    }
