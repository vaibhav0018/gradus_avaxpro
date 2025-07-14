
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import { HttpService } from '../../../../core/services/http.service'
import { HttpServiceResponseModel } from '../../../../core/models/HttpServiceResponseModel'
import { CommonsService } from '../../../../shared/services/commons.service'

const POST_QUOTATION_LIST = 'getquotationlist'
const DELETE_DRAFT = 'delete-quot-draft'
const GET_QUOT_TYPE = 'quotation-filter-data'

const GET_SOURCE = 'getlookupdata'
const GET_PARTY_DETAIL = 'getpartydetail'
const GENERATE_DRAFT = 'generatedraft'
const GET_NEW_DRAFT_DATA = 'getquotationnewdraftdata'

const GET_ADDED_ITEM_LIST = 'qtaddeditemdetails'
const ADD_ITEM_DRAFT = 'additemtoquot'
const EDIT_QUOT_ITEM_DRAFT = 'update-quot-item-draft'
const DELETE_ITEM_DRAFT = 'delete-quotation-item-draft'
const GET_QUOT_DRAFT_ITEM_OTHER_INFO = 'get-quot-draft-item-other-detail'
const UPDATE_QUOT_DRAFT_ITEM_OTHER_INFO = 'update-quot-item-draft-otherinfo'
const COMPLETE_QUOT_DRAFT = 'complete-quot-draft'
const GET_QUOT_HEADER_DETAILS = 'getcompletequotheaders'
//MODIFY OTHER INFO
const MODIFY_HEADER_DETAILS = 'quotmodifyheaderdetails'
const MODIFY_PARTY_DETAILS = 'quotmodifypartydetails'
const SHOW_ADD_FILTER_LIST = 'show-addr-quot-filter-list'

const QUOT_REVISION_LIST = 'quot_revision_list'
const QUOT_QTY_EXE_DTL_LIST = 'get_quot_exe_qty_details'

const ADD_NEW_QUOT_REVISION = 'add_new_quot_revision'
const REVERT_QUOT_REVISION = 'revert_quot_revision';

const QUOT_DRAFT_OTHER_DTL = 'quot-draft-other-dtl';

const QUOTATION_CONVERT_TO_EXCEL = 'quotation-convert-to-excel';

const SHOW_QUOTATION = 'show-quotation'

const GET_QUOTATION_EXCEL_SHEET = 'getQuotationDtlExcelSheet'

@Injectable({
  providedIn: 'root'
})

export class QuotationService {

  payload: any = {}
  completeUrl: string

  constructor(private http: HttpClient, private httpService: HttpService, private commonsService: CommonsService) { }

  getQuotationList(sortBy : any, sortOrder : any, pageNumber : any, pageSize :any, callFrom : any, payload: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_QUOTATION_LIST


    let pageDto = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    let sortDto = {
      columnName: sortBy,
      orderBy: sortOrder,
    }

    // payload['userInformationDto'] = userInformationDto
    payload['pageDto'] = pageDto;
    payload['sortDto'] = sortDto;
    payload['callFrom'] = callFrom;



    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  deleteDraft(filter : any): Observable<any> {
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



  getSource(group : any, subgroup : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_SOURCE + '?group=' + group + '&subgroup=' + subgroup

    this.payload = {
      //   company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      group: group,
      subgroup: subgroup,
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
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getQuotType(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_QUOT_TYPE

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
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getPartyDetail(party_code :any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_PARTY_DETAIL + '?party_code=' + party_code + '&company_code=' + atob(sessionStorage.getItem(btoa('usr_company_code')) || "")

    this.payload = {
      //   company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      party_code: party_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
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
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  generateDraft(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + GENERATE_DRAFT;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getQuoatationNewDraftData(filter : any): Observable<any> {
    console.log('this.payload ', filter);
    this.completeUrl = environment.baseUrl + '/' + GET_NEW_DRAFT_DATA;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getAddedItemDetailsList(doc_no : any, callFrom: any, data? : any): Observable<any> {
    this.payload = {
      callFrom: callFrom,
      qt_draft_no: doc_no,
      qt_quot_no: doc_no,
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

    if(data!=undefined && data.hasOwnProperty('flgOtherBranch') && data.flgOtherBranch == 'Y'){
      this.payload['flgOtherBranch'] = data.flgOtherBranch
      this.payload['oth_siscon'] = data.oth_siscon
      this.payload['oth_branch'] = data.oth_branch
    }

    this.completeUrl = environment.baseUrl + '/' + GET_ADDED_ITEM_LIST
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  addItemToQoutDraft(payload : any): Observable<any> {
    console.log(" complate payload to add new item  ", payload)
    this.completeUrl = environment.baseUrl + '/' + ADD_ITEM_DRAFT
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  editItem(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + EDIT_QUOT_ITEM_DRAFT
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  deleteDraftItem(payload : any): Observable<any> {
    console.log(" complate payload to add new item  ", payload)
    this.completeUrl = environment.baseUrl + '/' + DELETE_ITEM_DRAFT
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getQuotOtherinfoList(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_QUOT_HEADER_DETAILS
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getQuotItemOtherInfo(draft_no : any, serial_no: any, callFrom: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_QUOT_DRAFT_ITEM_OTHER_INFO + '?draft_no=' + draft_no
      + '&siscon_code=' + atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? '')
      + '&branch_code=' + atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? '')
      + "&serial_no=" + serial_no
      + "&callFrom=" + callFrom
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
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  updateQuotItemOtherInfo(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + UPDATE_QUOT_DRAFT_ITEM_OTHER_INFO
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  completeQuotationDraftService(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + COMPLETE_QUOT_DRAFT
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getCompleteQuotHeaderDetailsService(requestParams : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_QUOT_HEADER_DETAILS
    return this.httpService.post(this.completeUrl, requestParams).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  modifyHeaderdetails(payload : any): Observable<any> {
    console.log(" complate payload to item party info  ", payload)
    this.completeUrl = environment.baseUrl + '/' + MODIFY_HEADER_DETAILS
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  modifyPartyDetails(payload : any): Observable<any> {
    console.log(" complate payload to item party info  ", payload)
    this.completeUrl = environment.baseUrl + '/' + MODIFY_PARTY_DETAILS
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  showAddQuotFilterList(party_code : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + SHOW_ADD_FILTER_LIST
    this.payload = {

      cmbCustomer: party_code,
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
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getOtherInfoDtl(payload : any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + QUOT_DRAFT_OTHER_DTL
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  getQuotRevisionList(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + QUOT_REVISION_LIST;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }



  addNewQuotRevision(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + ADD_NEW_QUOT_REVISION;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  revertQuotRevision(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + REVERT_QUOT_REVISION;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getQuotExeQtyDtlList(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + QUOT_QTY_EXE_DTL_LIST;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }


  public upload(data : any, userId : any) {
    let uploadURL = 'uploadQuotationFile';

    this.completeUrl = environment.baseUrl + '/' + uploadURL

    return this.http.post<any>(this.completeUrl, data,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
      );
  }



  public uploadQuotExcelFile(data: any, userId: any) {
    let uploadURL = 'uploadQuotationFile';

    this.completeUrl = environment.baseUrl + '/' + uploadURL

    return this.http.post<any>(this.completeUrl, data,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
      );
  }


  downloadQuotConvertToExcelFile(data : any, payload: any) {
    console.log("complete excelPayload ", payload)

    const REQUEST_PARAMS = new HttpParams().set('fileName', data.fileName)
    const REQUEST_URI = environment.baseUrl + '/' + QUOTATION_CONVERT_TO_EXCEL
    return this.http.post(REQUEST_URI, payload, {
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
    })
  }

  ShowQtn(filter : any): Observable<any> {
    console.log('this.payload ', filter);

    this.completeUrl = environment.baseUrl + '/' + SHOW_QUOTATION;
    return this.httpService.post(this.completeUrl, filter).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }
  
  downloadFile(payload : any)
  {
    this.commonsService.show();
    this.completeUrl = environment.baseUrl + '/' + GET_QUOTATION_EXCEL_SHEET;
    return this.http.post(this.completeUrl, payload,{
      responseType:'arraybuffer',
    }).pipe(
      map((res: any) => {
        this.commonsService.hide()
        return res
      }),
      catchError((error: any) => {
        this.commonsService.hide()
        return ''
      })
    )
  }

}
