import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpService } from '../../../../core/services/http.service';
import { environment } from '../../../../environments/environment';
import { HttpServiceResponseModel } from '../../../../core/models/HttpServiceResponseModel';

const POST_CUST_DRAFT_LIST = 'getDraftPendingList'
const DELETE_DRAFT = 'deleteCustDraft'
const GET_DATA_TO_NEW_DRAFT = 'getDataToNewCustDraft'
const GET_SUB_CATEGARY = 'getSubCategary'

const COMPLETE_CUST_DRAFT = 'completeCustDraft'
const ADD_CUST_DRAFT_ADDR = 'savecustdraftaddress'
const EDIT_AUTH_DRAFT = 'editauthorisedraft'
const GET_PARTY_DETAIL = 'getpartydetail'
const CHK_CUST_FOR_AUTHORIZE = 'chkcustomerforauthorize'
const POST_UPDATE_CUSTOMER_DATA = 'updatecustomerdata'

//supplier vendor api
const GET_SUP_VEND_LIST = 'getsupvendlist'
const GET_SUP_VEND_MODIFY_DATA = 'getsupvendmodifydata'
const GET_ACCOUNT_LIST = 'getallacclistforcustmaster'
const GET_GROUP_CODE_LIST = 'getgroupcodedata'
const GET_MODIFY_CONT_DATA = 'getmodifycontactdata'

//save
const COMPLETE_SUPPLIER_VENDOR = 'completesuppliervendor'
const GET_BANK_LIST = 'getcustbanklist'
const POST_SUP_VEN_ADDRESS_DATA = 'savesuppliervendoraddressdata'

//modify
const POST_UPDATE_SUP_VEND_DATA = 'updatesuppliervendor'
const POST_DELETE_EXPENSE_DATA = 'deleteexpensecodedata'
const POST_ADD_EXPENSE_DATA = 'addexpensecodedata'

//validation
const POST_VALIDATE_GST_WITH_PAN = 'validategstwithpan'
const POST_VALIDATE_DUPLICATE_GST = 'checkduplicategstno'
const POST_VALIDATE_DUPLICATE_PAN = 'checkduplicatepanno'
const GET_PAYTERMS='get-common-paytermslist'
const VALIDATE_GST = 'validateGst'
const SEARCH_DUPLICATE_CUSTOMER='search-customer'

const CHECK_RIGHT_OF_CUST_MASTER_MAINTENANCE='checkRightsOfCustMasterMaintenance'


@Injectable({
  providedIn: 'root'
})

export class CustomerMasterService {

  payload: any = {}
  completeUrl: string


  constructor(private http: HttpClient, private httpService: HttpService) { }

  getDraftList(sortBy: any, sortOrder : any, pageNumber :any, pageSize : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_CUST_DRAFT_LIST
    this.payload = {
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

      pageDto: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
      sortDto: {
        columnName: sortBy,
        orderBy: sortOrder,
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  deleteDraft(filter: any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + DELETE_DRAFT;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getDataToNewDraft(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_DATA_TO_NEW_DRAFT;

    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getSubCategary(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_SUB_CATEGARY

    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  completeDraft(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + COMPLETE_CUST_DRAFT
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  editAuthDraft(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + EDIT_AUTH_DRAFT
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getPartyDetail(party_code: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_PARTY_DETAIL + '?party_code=' + party_code + '&company_code=' + atob(sessionStorage.getItem(btoa('usr_company_code')) ?? '')

    this.payload = {
      party_code: party_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
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
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  public upload(data: any, userId : any) {
    let uploadURL = 'uploadTemplateFile';

    this.completeUrl = environment.baseUrl + '/' + uploadURL

    return this.http.post<any>(this.completeUrl, data,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event : any) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
      );
  }

  getSupVendList(pageNumber: any, pageSize : any, flg : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_SUP_VEND_LIST
    this.payload = {
      cust_code_flg: flg,
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
      pageDto: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      }
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getSupVendModifyData(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_SUP_VEND_MODIFY_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getAccountAccDropDown(account : any): Observable<any> {
    this.payload = {
      account: account,
    }
    this.completeUrl = environment.baseUrl + '/' + GET_ACCOUNT_LIST + '?' + 'account' + '=' + this.payload['account']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getGroupCode(account : any): Observable<any> {
    this.payload = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
      account: account,
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
    }
    this.completeUrl = environment.baseUrl + '/' + GET_GROUP_CODE_LIST + '?' + 'companyCode' + '=' + this.payload['company_code'] + '&' + 'account' + '=' + this.payload['account']
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }


  getModifyContactData(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_MODIFY_CONT_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  completeSupplierVendor(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + COMPLETE_SUPPLIER_VENDOR
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getBankList(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_BANK_LIST
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  saveSupplierVendorAddress(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_SUP_VEN_ADDRESS_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateSupplierVendor(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_SUP_VEND_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  deleteExpenseCodeEntry(payload: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_DELETE_EXPENSE_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  addExpenseCodeEntry(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_ADD_EXPENSE_DATA
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  saveCustDraftAddress(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + ADD_CUST_DRAFT_ADDR
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }


  chkCustomerForAuthorize(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + CHK_CUST_FOR_AUTHORIZE
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateCustomerDetails(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_CUSTOMER_DATA
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  validateGstWithPan(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_VALIDATE_GST_WITH_PAN
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  checkDuplicateGstNo(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_VALIDATE_DUPLICATE_GST
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  checkDuplicatePanNo(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_VALIDATE_DUPLICATE_PAN
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getRights(filter : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + CHECK_RIGHT_OF_CUST_MASTER_MAINTENANCE
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  validateGst(form: any) {
    this.completeUrl = environment.baseUrl + '/' + VALIDATE_GST
    return this.httpService.post(this.completeUrl, form);
  }

  searchParty(cs_name : any,flg : any):Observable<any>{
    let payload={
      cd_name:cs_name,
      cs_cust_supplr_flg:flg,
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
    }
    this.completeUrl = environment.baseUrl + '/' + SEARCH_DUPLICATE_CUSTOMER
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
  updateGSTFlg(payload : any) {
    this.completeUrl = environment.baseUrl + '/update-gstFlg'
    return this.httpService.post(this.completeUrl, payload);
  }
  updateAllowedFlg(payload : any){
    this.completeUrl = environment.baseUrl + '/update-AllowEmailFlg'
    return this.httpService.post(this.completeUrl, payload);
  }

  showAccounts(payload : any){
    this.completeUrl = environment.baseUrl + '/showAccounts'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  updateAccounts(payload: any){
    this.completeUrl = environment.baseUrl + '/updateAccounts'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }
}
