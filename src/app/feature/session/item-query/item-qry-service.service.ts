import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel';
import { HttpService } from '../../../core/services/http.service';
import { environment } from '../../../environments/environment';

const GET_ITEM_DETAILS = 'getitemdtl'

@Injectable({
  providedIn: 'root'
})
export class ItemQryServiceService {

  payload: object = {}
  req_params: object = {}
  completeUrl: string
  constructor(private httpService: HttpService) { }


  getItemDtls(itemCode: any,makeCode: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_ITEM_DETAILS
    this.payload = {
      item_code: itemCode,
      make_code:makeCode,
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
      }
    }
    //    console.log('payload ', this.payload);
    return this.httpService.post(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        return res['payload']
      })
    )
  }

}
