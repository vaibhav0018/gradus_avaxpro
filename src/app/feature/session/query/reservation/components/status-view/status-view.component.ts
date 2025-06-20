import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/feature/session/entry/entry.service';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReservationView } from '../reservation/reservation.mode';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.scss', '../../../query.scss']
})
export class StatusViewComponent implements OnInit {
  stateData: any;
  displayediewColumns: string[] = ['resv_no', 'resv_qty', 'resev_for', 'resv_date', 'resv_upto']
  viewdataSource = new BehaviorSubject<AbstractControl[]>([]);
  header_data: any;
  it_prod_code: any;
  um_short_desc: any;
  old_item_code: any;
  stm_make: any;
  card_no: any;
  godown_name: any;
  item_code: any;
  txtresvfor: boolean;
  godown_code: any;
  message: any[];
  mainList: any;
  status: any;
  addflg: boolean = false;
  updateflg: boolean = false;
  itm_catalog_ref_no: any;
  it_tech_desc: any;

  constructor(
    private entryService: EntryService) {

  }


  ngOnInit() {
    if (sessionStorage.refData) {
      sessionStorage.removeItem("stateData");
      this.stateData = JSON.parse(sessionStorage.getItem("refData"));
    } else {
      this.stateData = JSON.parse(sessionStorage.getItem("stateData"));
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", JSON.stringify(this.stateData))
    }
    this.header_data = this.stateData.header
    this.item_code = this.stateData.item_code
    this.godown_name = this.stateData.godown_name
    this.it_prod_code = this.stateData.it_prod_code
    this.card_no = this.stateData.card_no
    this.stm_make = this.stateData.stm_make
    this.old_item_code = this.stateData.old_item_code
    this.um_short_desc = this.stateData.um_short_desc
    this.godown_code = this.stateData.godown_code
    this.status = this.stateData.status
    this.itm_catalog_ref_no = this.stateData.itm_catalog_ref_no
    this.it_tech_desc = this.stateData.it_tech_desc

    if (this.status == 'insert') {
      this.addflg = true
      this.updateflg = false
    } else {
      this.addflg = false
      this.updateflg = true
    }
    console.log(this.header_data, '  header_data')

    if (this.header_data.length == 0) {
      this.message = this.entryService.showMsg('error')
      return false;
    }
    else {
      this.mainList = this.header_data.map(item => {
        console.log('MAIN ', item)
        return new ReservationView(item.rsv_rsv_no, item.rsv_rsv_for, item.rsv_rsvfor, item.rsv_qty_rsv, item.rsv_ts_rsv_on, item.rsv_ts_rsv_upto)
      })
      this.viewdataSource = this.mainList
    }
    // this.header_data = this.stateData.header
    // this.main_data = this.stateData.main_data

  }

}
