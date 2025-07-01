import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UtilityServiceAvaxPro } from '../../../../../../../core/services/utility/utility_avaxpro.service';
import { GodwonService } from '../godwon-menu/godwon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from '../../../../../../../core/services/http.service';
import { GodwonCityModel } from '../godwon-menu/godwon-menu.mode';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { MapDialogComponentComponent } from '../../../../../map-dialog-component/map-dialog-component.component';

@Component({
  selector: 'app-modify-godwon',
  templateUrl: './modify-godwon.component.html',
  styleUrls: ['./modify-godwon.component.scss', '../../../../master.scss'],
  standalone: false
})
export class ModifyGodwonComponent implements OnInit {
  public form: FormGroup
  userRightsFlg: string = "";
  gd_godown_code: any;
  fromAuthData: string;
  stateData: any;
  tableData: any;
  public cityLists: any = []
  gd_country_code: any;
  gd_state_code: any;
  payload: object = {}
  navigateData: { main_data?: any; flg?: string } = {}
  gd_account_code: any;
  gd_code: any;
  perflg: boolean = false;
  emailId: any;
  MobileNo: any;
  gd_octroi_perc: any;
  txtgdkee1: any;
  txtgdkee2: any;
  txtgdkee3: any;
  FaxNo1: any;
  FaxNo2: any;
  contactNo: any;
  cagm_addr_code: any;
  constructor(
    private httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private godwonService: GodwonService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      txtgodwonname: [''],
      txtgodwonshortname: [''],
      txtgdkee1: [''],
      txtgdkee2: [''],
      txtgdkee3: [''],
      txtgdaddline1: [''],
      txtgdaddline2: [''],
      txtgdaddline3: [''],
      txtgdaddline4: [''],
      cmbcity: [''],
      txtstate: [''],
      txtcountry: [''],
      txttelNo1: [''],
      txttelNo2: [''],
      txtstdcode: [''],
      txtmobileNo: [''],
      txtEmailID: [''],
      txtFaxNo1: [''],
      txtFaxNo2: [''],
      txtDeliveryFrom: [''],
      txtDeliveryTo: [''],
      rdboctFlg: ['N', [Validators.pattern('N')]],
      txtocyper: [''],
      rdbauthFlg: ['N', [Validators.pattern('N')]],
      txtcontactName: [''],
      txtcontactNo: [''],
      txtstNo: [''],
      txtcstNo: [''],
      txtecccode: [''],
      txtexcideDtl: [''],
      txtexcideRegNo: [''],
      txtexcideRange: [''],
      txtexcideRangeAdd: [''],
      txtedgpAdd: [''],
      txtedgpTelNo1: [''],
      txtedgpTelNo2: [''],
      txtedgpFaxNo: [''],
      txtedgpEmail: [''],
      rdbptsFlg: ['N', [Validators.pattern('N')]],
      rdbpurchasebillentry: ['N', [Validators.pattern('N')]],
      txtgdpincode:[''],
      txtgdLattitude: [''],
      txtgdLongitude: [''],
    })
  }


  ngOnInit() {
    this.stateData = JSON.parse(sessionStorage.getItem("data") || '{}');
    this.fromAuthData = sessionStorage.getItem("data") || '';
    this.gd_godown_code = this.stateData.gd_godown_code
    this.getGodwonDtl(this.gd_godown_code)
    this.checkUserRights()
    this.getCityDropDown()
  }

  checkUserRights() {
    this.utilityServiceAvaxPro.checkUserRights().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.userRightsFlg = data.responseData[0];
          //    console.log(this.userRightsFlg, ' userRightsFlg')
        }
      })
  }

  getCityDropDown() {
    this.godwonService.getStateList().subscribe({
       next: (data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.cityLists = data.responseData[0].map((item : any) => {
            //      console.log(item, ' cityLists ')
            return new GodwonCityModel(item.br_city, item.br_branch_code)
          })
        }
        return this.cityLists
      },
      error: error => {
        console.log(error)
      }
   })
  }

  getGodwonDtl(gd_godown_code : any) {
    this.godwonService.getGodwonDtl(gd_godown_code).subscribe({
      next :(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.tableData = data.responseData[0].map((item : any) => {
       //     console.log(item.gd_godown_code, ' item.gd_godown_code')
            if (item.gd_octroi_flg == 'N') {
              this.perflg = false
            } else {
              this.perflg = true
            }
      //      this.gd_octroi_perc = item.gd_octroi_perc
            this.form.controls['txtgodwonname'].setValue(item.gd_godown_name);
            this.form.controls['txtgodwonshortname'].setValue(item.gd_short_name);
            this.form.controls['txtgdkee1'].setValue(item.gd_godown_keeper1);
            this.form.controls['txtgdkee2'].setValue(item.gd_godown_keeper2);
            this.form.controls['txtgdkee3'].setValue(item.gd_godown_keeper3);
            this.form.controls['txtgdaddline1'].setValue(item.address1);
            this.form.controls['txtgdaddline2'].setValue(item.address2);
            this.form.controls['txtgdaddline3'].setValue(item.address3);
            this.form.controls['txtgdaddline4'].setValue(item.address4);
            this.form.controls['cmbcity'].setValue(item.gd_city);
            this.form.controls['txtstate'].setValue(item.st_state);
            this.form.controls['txtcountry'].setValue(item.br_country_name);
            this.form.controls['txttelNo1'].setValue(item.gd_tel_no1);
            this.form.controls['txttelNo2'].setValue(item.gd_tel_no2);
            this.form.controls['txtstdcode'].setValue(item.gd_std_code);
            this.form.controls['txtmobileNo'].setValue(item.gd_mobile_no);
            this.form.controls['txtEmailID'].setValue(item.gd_email_id);
            this.form.controls['txtFaxNo1'].setValue(item.gd_fax_no1);
            this.form.controls['txtFaxNo2'].setValue(item.gd_fax_no2);
            this.form.controls['txtDeliveryFrom'].setValue(item.delivery_from);
            this.form.controls['txtDeliveryTo'].setValue(item.delivery_to);
            this.form.controls['rdboctFlg'].setValue(item.gd_octroi_flg);
         //   this.form.controls['txtocyper'].setValue(this.gd_octroi_perc.toString());
            this.form.controls['rdbauthFlg'].setValue(item.gd_auth_flg);
            this.form.controls['txtcontactName'].setValue(item.gd_contact_name);
            this.form.controls['txtcontactNo'].setValue(item.gd_contact_no);
            this.form.controls['txtstNo'].setValue(item.gd_st_no);
            this.form.controls['txtcstNo'].setValue(item.gd_cst_no);
            this.form.controls['txtecccode'].setValue(item.gd_ecc_code);
            this.form.controls['txtexcideDtl'].setValue(item.gd_excise_details);
            this.form.controls['txtexcideRegNo'].setValue(item.gd_excise_reg_no);
            this.form.controls['txtexcideRange'].setValue(item.gd_excise_range);
            this.form.controls['txtexcideRangeAdd'].setValue(item.gd_excise_range_addr);
            this.form.controls['txtedgpAdd'].setValue(item.gd_edgp_address);
            this.form.controls['txtedgpTelNo1'].setValue(item.gd_edgp_telno1);
            this.form.controls['txtedgpTelNo2'].setValue(item.gd_edgp_telno2);
            this.form.controls['txtedgpFaxNo'].setValue(item.gd_edgp_faxno);
            this.form.controls['txtedgpEmail'].setValue(item.gd_edgp_email);
            this.form.controls['rdbpurchasebillentry'].setValue(item.gd_pb_allow);
            this.form.controls['txtgdLattitude'].setValue(item.gd_latitude);
            this.form.controls['txtgdLongitude'].setValue(item.gd_longitude);
            this.gd_state_code = item.gd_state_code
            this.gd_country_code = item.gd_country_code
            this.gd_account_code = item.gd_account_code
            this.gd_code = item.gd_godown_code
            this.gd_account_code = item.gd_account_code
            this.cagm_addr_code = item.cagm_addr_code
            this.form.controls['txtgdpincode'].setValue(item.gd_pincode);
       //     console.log(item, ' tableData ')
          })
        }
        return this.tableData
      },
       error : error => {
        console.log(error)
      }
    })
  }


  updateGodown() {
    // debugger
    // console.log(this.form.get('cmbcity').value, ' CMb')
    // console.log(this.gd_code, ' gd_code')
    if (this.form.get('txtgodwonname')?.value == '' || this.form.get('txtgodwonname')?.value == null) {
      this.openSnackBar("Please Enter Godwon Name");
      return false;
    }
    if (this.form.get('txtgodwonshortname')?.value == '' || this.form.get('txtgodwonshortname')?.value == null) {
      this.openSnackBar("Please Enter Godwn SHort Name");
      return false;
    }
    if (this.form.get('txtgdaddline1')?.value == '' || this.form.get('txtgdaddline1')?.value == null) {
      this.openSnackBar("Please Enter Adrress 1");
      return false;
    }
    if (this.form.get('txtgdaddline2')?.value == '' || this.form.get('txtgdaddline2')?.value == null) {
      this.openSnackBar("Please Enter Adrress 2");
      return false;
    }
    // if (this.form.get('txtgdaddline3')?.value == '' || this.form.get('txtgdaddline3')?.value == null) {
    //   this.openSnackBar("Please Enter Adrress 3");
    //   return false;
    // }
    // if (this.form.get('txtgdaddline4')?.value == '' || this.form.get('txtgdaddline4')?.value == null) {
    //   this.openSnackBar("Please Enter Adrress 4");
    //   return false;
    // }
    if (this.form.get('cmbcity')?.value == null || this.form.get('cmbcity')?.value == '') {
      this.openSnackBar('Please Select City To Procceed');
      return false;
    }

    // if (this.form.get('txtgdkee1').value == '' || this.form.get('txtgdkee1').value == null) {
    //   this.openSnackBar("Please Enter Godown Keeper 1");
    //   return false;
    // } else if (!this.form.get('txtgdkee1').value.match(/^([A-Z,a-z\s])+$/)) {
    //   this.openSnackBar("Please Enter Valid Godown Keeper 1");
    //   return false;
    // } else {
    //   this.txtgdkee1 = this.form.get('txtgdkee1').value
    // }

    // if (this.form.get('txtgdkee2').value != '' && this.form.get('txtgdkee2').value != null) {
    //   if (!this.form.get('txtgdkee2').value.match(/^([A-Z,a-z\s])+$/)) {
    //     this.openSnackBar("Please Enter Valid Godown Keeper 2");
    //     return false;
    //   } else {
    //     this.txtgdkee2 = this.form.get('txtgdkee2').value
    //   }
    // } else {
    //   this.txtgdkee2 = this.form.get('txtgdkee2').value
    // }
    // if (this.form.get('txtgdkee3').value != '' && this.form.get('txtgdkee3').value != null) {
    //   if (!this.form.get('txtgdkee3').value.match(/^([A-Z,a-z\s])+$/)) {
    //     this.openSnackBar("Please Enter Valid Godown Keeper 3");
    //     return false;
    //   } else {
    //     this.txtgdkee3 = this.form.get('txtgdkee3').value
    //   }
    // } else {
    //   this.txtgdkee3 = this.form.get('txtgdkee3').value
    // }

    // if (this.form.get('txtmobileNo').value == '' || this.form.get('txtmobileNo').value == null) {
    //   this.openSnackBar("Please Enter Mobile Number");
    //   return false;
    // } else if (!this.form.get('txtmobileNo').value.match(/^([0-9])+$/)) {
    //   this.openSnackBar("Please Enter Valid Mobile Number");
    //   return false;
    // } else {
    //   this.MobileNo = this.form.get('txtmobileNo').value
    // }

    // if (this.form.get('txtEmailID').value == '' || this.form.get('txtEmailID').value == null) {
    //   this.openSnackBar("Please Enter EmailId");
    //   return false;
    // } else if (!this.form.get('txtEmailID').value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
    //   this.openSnackBar("Please Enter Valid EmailId");
    //   return false;
    // } else {
    //   this.emailId = this.form.get('txtEmailID').value
    // }

    // if (this.form.get('rdboctFlg').value == 'Y') {
    //   console.log(this.form.get('txtocyper').value, ' Per')
    //   if (!this.form.get('txtocyper').value.match(/^([0-9])+$/)) {
    //     this.openSnackBar('Please Enter Octra Amount');
    //     return false;
    //   }
    // }


    if (this.form.get('txtgdpincode')?.value == "" || this.form.get('txtgdpincode')?.value == null) {
      this.openSnackBar('Please enter pincode');
      return false;
    } else {
      if (!this.form.get('txtgdpincode')?.value?.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
        this.openSnackBar("Please Enter valid  pincode");
        return false;
      }
    }

    if (this.form.controls.txtgdLattitude.value == null || this.form.controls.txtgdLattitude.value == '') {
      this.openSnackBar('Please select lattitude ');
      return false;
    }

    if (this.form.controls.txtgdLongitude.value == null || this.form.controls.txtgdLongitude.value == '') {
      this.openSnackBar('Please select longitude ');
      return false;
    }

    if (this.form.get('txtFaxNo1')?.value != '' && this.form.get('txtFaxNo1')?.value != null) {
      if (!this.form.get('txtFaxNo1')?.value?.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Fax 1");
        return false;
      } else {
        this.FaxNo1 = this.form.get('txtFaxNo1')?.value
      }
    } else {
      this.FaxNo1 = this.form.get('txtFaxNo1')?.value
    }

    if (this.form.get('txtFaxNo2')?.value != '' && this.form.get('txtFaxNo2')?.value != null) {
      if (!this.form.get('txtFaxNo2')?.value?.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Fax 2");
        return false;
      } else {
        this.FaxNo2 = this.form.get('txtFaxNo2')?.value
      }
    } else {
      this.FaxNo2 = this.form.get('txtFaxNo2')?.value
    }

    if (this.form.get('txtmobileNo')?.value != '' && this.form.get('txtmobileNo')?.value != null) {
      if (!this.form.get('txtmobileNo')?.value?.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Mobile Number");
        return false;
      } else {
        this.MobileNo = this.form.get('txtmobileNo')?.value
      }
    } else {
      this.MobileNo = this.form.get('txtmobileNo')?.value
    }

    if (this.form.get('txtEmailID')?.value != '' && this.form.get('txtEmailID')?.value != null) {
      if (!this.form.get('txtEmailID')?.value?.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId");
        return false;
      } else {
        this.emailId = this.form.get('txtEmailID')?.value
      }
    } else {
      this.emailId = this.form.get('txtEmailID')?.value
    }

    if (this.form.get('txtcontactNo')?.value != '' && this.form.get('txtcontactNo')?.value != null) {
      if (!this.form.get('txtcontactNo')?.value?.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Contact Number");
        return false;
      } else {
        this.contactNo = this.form.get('txtcontactNo')?.value
      }
    } else {
      this.contactNo = this.form.get('txtcontactNo')?.value
    }

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
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ''),
      },
      txtgodwonname: this.form.get('txtgodwonname')?.value ?? '',
      txtgodwonshortname: this.form.get('txtgodwonshortname')?.value ?? '',
      txtgdkee1: this.txtgdkee1 ?? '',
      txtgdkee2: this.txtgdkee2 ?? '',
      txtgdkee3: this.txtgdkee3 ?? '',
      txtgdaddline1: this.form.get('txtgdaddline1')?.value ?? '',
      txtgdaddline2: this.form.get('txtgdaddline2')?.value ?? '',
      txtgdaddline3: this.form.get('txtgdaddline3')?.value ?? '',
      txtgdaddline4: this.form.get('txtgdaddline4')?.value ?? '',
      cmbcity: this.form.get('cmbcity')?.value ?? '',
      txtstate: this.form.get('txtstate')?.value ?? '',
      txtcountry: this.form.get('txtcountry')?.value ?? '',
      txttelNo1: this.form.get('txttelNo1')?.value ?? '',
      txttelNo2: this.form.get('txttelNo2')?.value ?? '',
      txtstdcode: this.form.get('txtstdcode')?.value ?? '',
      txtmobileNo: this.MobileNo,
      txtEmailID: this.emailId,
      txtFaxNo1: this.FaxNo1,
      txtFaxNo2: this.FaxNo2,
      txtDeliveryFrom: this.form.get('txtDeliveryFrom')?.value,
      txtDeliveryTo: this.form.get('txtDeliveryTo')?.value,
      // rdboctFlg: this.form.get('rdboctFlg').value,
      txtocyper: this.form.get('txtocyper')?.value ?? '',
      rdbauthFlg: this.form.get('rdbauthFlg')?.value,
      txtcontactName: this.form.get('txtcontactName')?.value,
      txtcontactNo: this.contactNo,
      txtstNo: this.form.get('txtstNo')?.value,
      txtcstNo: this.form.get('txtcstNo')?.value,
      txtecccode: this.form.get('txtecccode')?.value,
      txtexcideDtl: this.form.get('txtexcideDtl')?.value,
      txtexcideRegNo: this.form.get('txtexcideRegNo')?.value,
      txtexcideRange: this.form.get('txtexcideRange')?.value,
      txtexcideRangeAdd: this.form.get('txtexcideRangeAdd')?.value,
      txtedgpAdd: this.form.get('txtedgpAdd')?.value,
      txtedgpTelNo1: this.form.get('txtedgpTelNo1')?.value,
      txtedgpTelNo2: this.form.get('txtedgpTelNo2')?.value,
      txtedgpFaxNo: this.form.get('txtedgpFaxNo')?.value,
      txtedgpEmail: this.form.get('txtedgpEmail')?.value,
      rdbptsFlg: this.form.get('rdbptsFlg')?.value,
      br_acc_code: this.gd_account_code,
      stateCode: this.gd_state_code,
      countyCode: this.gd_country_code,
      gd_code: this.gd_code,
      addr_code:this.cagm_addr_code,
      gd_pincode: this.form.get('txtgdpincode')?.value,
      txtlattitude: this.form.get('txtgdLattitude')?.value,
      txtlongitude: this.form.get('txtgdLongitude')?.value,
    }
    this.godwonService.updateGodwon(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.navigateData["main_data"] = data.responseData[0]
        this.navigateData["flg"] = "update"

        sessionStorage.removeItem("stateData");
        sessionStorage.removeItem("refData");

        sessionStorage.setItem("stateData", JSON.stringify(this.navigateData));
        this.router.navigate(['session/master/miscellaneous-master/open-new-godown/view-godwon'], {});
        this.openSnackBar("Updated Successfully");
        return true;
      } else {
        this.openSnackBar("Error While Updating");
        return false;
      }
    })
    return true;
  }

  onRadioButonChange(event : any) {
    //   console.log('radVale.valueevent  ', event.value);
    if (event.value == 'N') {
      this.form.controls['txtocyper'].setValue('0');
      this.perflg = true
    } else {
      this.form.controls['txtocyper'].setValue(this.gd_octroi_perc.toString());
      this.perflg = false
    }
  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }

  showMap(): boolean {

    if (this.form.controls.txtgdaddline1.value == '' || this.form.controls.txtgdaddline1.value == null) {
      this.openSnackBar('Please Enter Address 1');
      return false;
    }

    if (this.form.controls.txtgdaddline2.value == '' || this.form.controls.txtgdaddline2.value == null) {
      this.openSnackBar('Please Enter Address 2');
      return false;
    }

    if (this.form.controls.cmbcity.value == '' || this.form.controls.cmbcity.value == null) {
      this.openSnackBar('Please Select City');
      return false;
    }
    
    // if (this.form.controls.txtstate.value == '' || this.form.controls.txtstate.value == null) {
    //   this.openSnackBar('Please Select State');
    //   return false;
    // }

    // if (this.form.controls.txtcountry.value == '' || this.form.controls.txtcountry.value == null) {
    //   this.openSnackBar('Please Select Country');
    //   return false;
    // }

    if (this.form.controls.txtgdpincode.value == "" || this.form.controls.txtgdpincode.value == null) {
      this.openSnackBar('Please enter pincode');
      return false;
    } else {
      
      if (this.form.controls.txtgdpincode.value.length != 6) {
        this.openSnackBar("Please Enter Valid Pincode OF 6 Digit ");
        return false;
      } else if (!this.form.controls.txtgdpincode.value.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter valid pincode");
        return false;
      }

    }

    let fullAddress: string
    fullAddress = this.form.controls.txtgdaddline1.value + "," +
      this.form.controls.txtgdaddline2.value + ",";

    if (this.form.controls.txtgdaddline3.value !== null && this.form.controls.txtgdaddline3.value !== undefined &&
      this.form.controls.txtgdaddline3.value !== '') {
      fullAddress += this.form.controls.txtgdaddline3.value + ",";
    }

    if (this.form.controls.txtgdaddline4.value !== null && this.form.controls.txtgdaddline4.value !== undefined &&
      this.form.controls.txtgdaddline4.value !== '') {
      fullAddress += this.form.controls.txtgdaddline4.value + ",";
    }

    if (this.form.controls.cmbcity.value !== null && this.form.controls.cmbcity.value !== undefined &&
      this.form.controls.cmbcity.value !== '') {
      fullAddress += this.form.controls.cmbcity.value + ",";
    }

    if (this.form.controls.txtstate.value !== null && this.form.controls.txtstate.value !== undefined &&
      this.form.controls.txtstate.value !== '') {
      fullAddress += this.form.controls.txtstate.value + ",";
    } 

    if (this.form.controls.txtcountry.value !== null && this.form.controls.txtcountry.value !== undefined &&
      this.form.controls.txtcountry.value !== '') {
      fullAddress += this.form.controls.txtcountry.value + ",";
    }

    if (this.form.controls.txtgdpincode.value !== null && this.form.controls.txtgdpincode.value !== undefined &&
      this.form.controls.txtgdpincode.value !== '') {
      fullAddress += this.form.controls.txtgdpincode.value ;
    }

    console.log(" fullAddress ", fullAddress);

    this.openMapDialog(fullAddress.toUpperCase());
    return true;

  }

  openMapDialog(fullAddress : any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '100% !important'
    dialogConfig.maxHeight = '200vh'
    dialogConfig.width = '100% !important'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: "AvaxPro Map",
      fullAddress: fullAddress,
    }
    const dialogRef = this.dialog.open(MapDialogComponentComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((item : any) => {
      console.log("MapDialogComponentComponent ", item)

      if (item == true) {

        //user clicks on close button
        this.openSnackBar("Please select Location")
        return false

      } 
      else if(item=='undefined::undefined'){
        this.openSnackBar("Please wait for map to load.")
        return false
      }
      else {

        //user clicks on save location button

        this.openSnackBar("Location save successfully ")

        this.form.controls.txtgdLattitude.setValue(item.split("::")[0])
        this.form.controls.txtgdLongitude.setValue(item.split("::")[1])
        return true;
      }
      return false; // Ensure all paths return a value
    })
  }

}
