import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntryService } from '../../../../../entry/entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-godwon',
  templateUrl: './view-godwon.component.html',
  styleUrls: ['./view-godwon.component.scss'],
  standalone: false
})
export class ViewGodwonComponent implements OnInit {
  stateData: any;
  main_data: any;
  public form: FormGroup
  message: any;
  gd_pts_flg: any;
  gd_godown_name: any;
  gd_short_name: any;
  gd_godown_keeper1: any;
  gd_godown_keeper2: any;
  gd_godown_keeper3: any;
  address1: any;
  address2: any;
  address3: any;
  address4: any;
  gd_city: any;
  st_state: any;
  br_country_name: any;
  gd_tel_no1: any;
  gd_tel_no2: any;
  gd_std_code: any;
  gd_mobile_no: any;
  gd_email_id: any;
  gd_fax_no1: any;
  gd_fax_no2: any;
  delivery_from: any;
  delivery_to: any;
  gd_octroi_flg: any;
  gd_octroi_perc: any;
  gd_auth_flg: any;
  gd_contact_name: any;
  gd_contact_no: any;
  gd_st_no: any;
  gd_cst_no: any;
  gd_ecc_code: any;
  gd_excise_details: any;
  gd_excise_reg_no: any;
  gd_excise_range: any;
  gd_excise_range_addr: any;
  gd_edgp_telno1: any;
  gd_edgp_telno2: any;
  gd_edgp_faxno: any;
  gd_edgp_email: any;
  gd_godown_code: any;
  flg: any;
  viewmsg: string;
  gd_pb_allow: any;
  gd_pincode: any;
  gd_latitude: any;
  gd_longitude: any;

  constructor(
    public formBuilder: FormBuilder,
    private entryService: EntryService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
    })
  }

  ngOnInit() {
    if (sessionStorage.refData) {
      sessionStorage.removeItem("stateData");
      this.stateData = JSON.parse(sessionStorage.getItem("refData") || '');
    } else {
      this.stateData = JSON.parse(sessionStorage.getItem("stateData") || '');
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", JSON.stringify(this.stateData))
    }
    this.main_data = this.stateData.main_data
    this.flg = this.stateData.flg


    if (this.flg == 'insert') {
      this.viewmsg = 'ADDED NEW GODOWN'
    } else {
      this.viewmsg = 'UPADTED GODOWN'
    }

    if (this.main_data.length == 0) {
      this.message = this.entryService.showMsg('error')
      return false;
    }
    else {
      this.main_data.forEach((item : any) => {
        console.log("HEADER ", item)
        this.gd_pts_flg = item.gd_pts_flg
        this.gd_godown_name = item.gd_godown_name
        this.gd_short_name = item.gd_short_name
        this.gd_godown_keeper1 = item.gd_godown_keeper1
        this.gd_godown_keeper2 = item.gd_godown_keeper2
        this.gd_godown_keeper3 = item.gd_godown_keeper3
        this.address1 = item.address1
        this.address2 = item.address2
        this.address3 = item.address3
        this.address4 = item.address4
        this.gd_city = item.gd_city
        this.st_state = item.st_state
        this.br_country_name = item.br_country_name
        this.gd_tel_no1 = item.gd_tel_no1
        this.gd_tel_no2 = item.gd_tel_no2
        this.gd_std_code = item.gd_std_code
        this.gd_mobile_no = item.gd_mobile_no
        this.gd_email_id = item.gd_email_id
        this.gd_fax_no1 = item.gd_fax_no1
        this.gd_fax_no2 = item.gd_fax_no2
        this.delivery_from = item.delivery_from
        this.delivery_to = item.delivery_to
        this.gd_octroi_flg = item.gd_octroi_flg
        this.gd_octroi_perc = item.gd_octroi_perc
        this.gd_auth_flg = item.gd_auth_flg
        this.gd_contact_name = item.gd_contact_name
        this.gd_contact_no = item.gd_contact_no
        this.gd_st_no = item.gd_st_no
        this.gd_cst_no = item.gd_cst_no
        this.gd_ecc_code = item.gd_ecc_code
        this.gd_excise_details = item.gd_excise_details
        this.gd_excise_reg_no = item.gd_excise_reg_no
        this.gd_excise_range = item.gd_excise_range
        this.gd_excise_range_addr = item.gd_excise_range_addr
        this.gd_edgp_telno1 = item.gd_edgp_telno1
        this.gd_edgp_telno2 = item.gd_edgp_telno2
        this.gd_edgp_faxno = item.gd_edgp_faxno
        this.gd_edgp_email = item.gd_edgp_email
        this.gd_godown_code = item.gd_godown_code
        this.gd_pb_allow = item.gd_pb_allow
        this.gd_pincode = item.gd_pincode
        this.gd_latitude = item.gd_latitude
        this.gd_longitude = item.gd_longitude
      })
    }
    return true;
  }
  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  addGodown() {
    this.router.navigate(['session/master/miscellaneous-master/open-new-godown/add-godwon'])
  }
}
