import { Injectable } from '@angular/core';
import { ConstantsService } from '../../core/services/constants.service';
import moment from 'moment'; // ✅ Angular 19-compatible import
import { NgxSpinnerService } from 'ngx-spinner';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  


@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private spinnerService?: NgxSpinnerService) { }

  ngAfterViewInit(): void {
    this.spinnerService?.show() // ✅ Safe optional chaining
  }

  date_ymd(dateValue: any) {
    return moment(dateValue).format(ConstantsService.DATE_YMD);
  }

  date_dmy(dateValue: any){
    return moment(dateValue).format(ConstantsService.DATE_DMY);
  }

  date_dmmmy(dateValue: any){
    return moment(dateValue).format(ConstantsService.DATE_DMMMY);
  }

  date_diff_ymd(startDate: any, endDate: any) {
    if (startDate && endDate) {
      const end = moment(endDate, ConstantsService.DATE_YMD);
      const start = moment(startDate, ConstantsService.DATE_YMD);
      return end.diff(start, 'years');
    }
    return undefined;
  }

  date_diff_days_ymd(currentDate: any, noOfDays: number){
    if (currentDate && noOfDays) {
      const current = moment(currentDate, ConstantsService.DATE_YMD);
      return current.subtract(noOfDays, 'days');
    }
    return undefined;
  }

  date_last_date_of_the_month(currentDate: any){
    if (currentDate) {
      const lastDay = moment(currentDate, ConstantsService.DATE_DMY);
      return lastDay.endOf('month');
    }
    return undefined;
  }

  show(){
    this.spinnerService?.show();
  }

  hide(){
    this.spinnerService?.hide();
  }
}
