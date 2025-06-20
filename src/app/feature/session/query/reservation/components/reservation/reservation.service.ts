import { Injectable } from '@angular/core';
import { HttpServiceResponseModel } from 'src/app/core/models/HttpServiceResponseModel'
import { environment } from 'src/environments/environment'
import { HttpService } from 'src/app/core/services/http.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const POST_ADD_RESERVATION = 'addreservation'
const GET_STOCK_DATA = 'getstockdata'
const GET_STOCK_QTY_DATA = 'getstockqtydata'
const POST_DELETE_RESERVATION = 'deletereservation'
const POST_UPDATE_RESERVATION = 'updatereservation'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  req_params: object = {}
  completeUrl: string
  payload: any = {}

  constructor(private httpService: HttpService) { }

  addReservation(payload): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_ADD_RESERVATION
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  addReservationFromAo(payload): Observable<any> {
    this.completeUrl = environment.baseUrl + '/addreservationfromao'
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }


  getStockData(godown_code, card_no, inot_no,from_entry): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_STOCK_DATA
    this.payload = {
      rsv_godown_no: godown_code,
      rsv_card_no: card_no,
      rsv_inout_number: inot_no,
      from_entry:from_entry,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  getStockQtyData(godown_code, card_no, inot_no,from_entry): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_STOCK_QTY_DATA
    this.payload = {
      rsv_godown_no: godown_code,
      rsv_card_no: card_no,
      rsv_inout_number: inot_no,
      from_entry:from_entry,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      },
    }
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

  deleteReservation(payload): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_DELETE_RESERVATION
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

  updateReservation(payload): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + POST_UPDATE_RESERVATION
    return this.httpService.post(this.completeUrl, payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        console.log(res)
        return res['payload']
      })
    )
  }

}
