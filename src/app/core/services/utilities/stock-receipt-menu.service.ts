import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpServiceResponseModel } from '../../models/HttpServiceResponseModel'
import { HttpService } from '../http.service'
import { environment } from '../../../environments/environment'

const POST_SR_LIST = 'getstockreceiptlist'
const GET_SR_TYPE_LIST = 'getSrTypeList'
const IS_VALID_UOM_CONVERSION = 'isValidConversion'

@Injectable({
  providedIn: 'root',
})
export class StockReceiptMenuService {
  payload: any = {}
  completeUrl: string
  req_params: object = {}

  constructor(private http: HttpClient, private httpService: HttpService) { }

  //getStockReceiptList(pageNumber, pageSize, callFrom, payload): Observable<any> {
  getStockReceiptList(callFrom: any, payload: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_SR_LIST
    /* let pageDto = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    payload['pageDto'] = pageDto; */
    payload['srListCallFrom'] = callFrom;
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  getSrTypeList(): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_SR_TYPE_LIST + '?' + 'cmbSrType' + '=' + ''
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }


  isValiduomConversion(fromUom: any, toUom: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + IS_VALID_UOM_CONVERSION + '?' + 'fromUom' + '=' + fromUom
      + '&' + 'toUom' + '=' + toUom
    console.log(" completeUrl ", this.completeUrl);
    return this.httpService.get(this.completeUrl).pipe(
      map((res: HttpServiceResponseModel) => {
        return res
      })
    )
  }
}