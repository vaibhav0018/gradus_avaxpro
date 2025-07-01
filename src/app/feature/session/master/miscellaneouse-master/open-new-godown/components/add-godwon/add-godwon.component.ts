import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityServiceAvaxPro } from '../../../../../../../core/services/utility/utility_avaxpro.service';
import { HttpService } from '../../../../../../../core/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GodwonService } from '../godwon-menu/godwon.service';
import { Router } from '@angular/router';
import { GodwonCityModel } from '../godwon-menu/godwon-menu.mode';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { MapDialogComponentComponent } from '../../../../../map-dialog-component/map-dialog-component.component';
// import { MapDialogComponentComponent } from 'src/app/feature/session/map-dialog-component/map-dialog-component.component';
//import { MapsAPILoader, MouseEvent } from '@agm/core';
//import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-add-godwon',
  templateUrl: './add-godwon.component.html',
  styleUrls: ['./add-godwon.component.scss', '../../../../master.scss'],
  standalone: false
})
export class AddGodwonComponent implements OnInit {
  public form: FormGroup
  public cityLists: any = []
  public countrystateList: any = []
  stateCode: any;
  countyCode: any;
  payload: object = {}
  br_acc_code: any;
  navigateData: { main_data?: any; flg?: string } = {}
  perflg: boolean = false;
  emailId: any;
  EdgpemailId: any;
  telNo1: any;
  telNo2: any;
  MobileNo: any;
  contactNo: any;
  currentDate = new Date(new Date().getTime());
  txtgdkee1: any;
  txtgdkee2: any;
  txtgdkee3: any;
  FaxNo1: any;
  FaxNo2: any;


  constructor(
    private httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private godwonService: GodwonService,
    public snackBar: MatSnackBar,
    private router: Router,
    //private mapsAPILoader: MapsAPILoader,
    //private ngZone: NgZone
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
    this.getCityDropDown()
    this.getStateCountry()
    this.perflg = true
  }

  getCityDropDown() {
    this.godwonService.getStateList().subscribe({
      next: (data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.cityLists = data.responseData[0].map((item: any) => {
            //    console.log(item, ' cityLists ')
            return new GodwonCityModel(item.br_city, item.br_branch_code);
          });
        }
        return this.cityLists;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  getStateCountry() {
    this.godwonService.getCountryState().subscribe({
      next :(data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countrystateList = data.responseData[0].map((item: any) => {
            //          console.log(item.br_country_name, ' countrystateList ')
            this.form.controls['txtcountry'].setValue(item.br_country_name);
            this.form.controls['txtstate'].setValue(item.br_state);
            this.countyCode = item.br_country_code
            this.stateCode = item.br_state_code
            this.br_acc_code = item.br_acc_code
          })
        }
        return this.countrystateList
      },
      error :error => {
        console.log(error)
      }
  })
  }

  AddNewGodown() {
    if (this.form.get('txtgodwonname')?.value == '' || this.form.get('txtgodwonname')?.value == null) {
      this.openSnackBar("Please Enter Godwon Name");
      return false;
    } else if (!this.form.get('txtgodwonname')?.value?.match(/^([A-Z,a-z\s])+$/)) {
      this.openSnackBar("Please Enter Valid Godwon Name");
      return false;
    }
    if (this.form.get('txtgodwonshortname')?.value == '' || this.form.get('txtgodwonshortname')?.value == null) {
      this.openSnackBar("Please Enter Godwn SHort Name");
      return false;
    } else if (!this.form.get('txtgodwonshortname')?.value?.match(/^([A-Z,a-z\s])+$/)) {
      this.openSnackBar("Please Enter Valid Godwon Short Name");
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
    // if (this.form.get('txtgdaddline3').value == '' || this.form.get('txtgdaddline3').value == null) {
    //   this.openSnackBar("Please Enter Adrress 3");
    //   return false;
    // }
    // if (this.form.get('txtgdaddline4').value == '' || this.form.get('txtgdaddline4').value == null) {
    //   this.openSnackBar("Please Enter Adrress 4");
    //   return false;
    // }
    if ((this.form.get('cmbcity')?.value == null || this.form.get('cmbcity')?.value == '') || this.form.get('cmbcity')?.value?.br_city == undefined) {
      this.openSnackBar('Please Select City To Procceed');
      return false;
    }
    if (this.form.get('txtgdkee1')?.value == '' || this.form.get('txtgdkee1')?.value == null) {
      this.openSnackBar("Please Enter Godwon Keeper 1");
      return false;
    }


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


    if (this.form.get('txtgdkee1')?.value == '' || this.form.get('txtgdkee1')?.value == null) {
      this.openSnackBar("Please Enter Godown Keeper 1");
      return false;
    } else if (!this.form.get('txtgdkee1')?.value?.match(/^([A-Z,a-z\s])+$/)) {
      this.openSnackBar("Please Enter Valid Godown Keeper 1");
      return false;
    } else {
      this.txtgdkee1 = this.form.get('txtgdkee1')?.value ?? '';
    }

    if (this.form.get('txtgdkee2')?.value != '' && this.form.get('txtgdkee2')?.value != null) {
      if (!this.form.get('txtgdkee2')?.value?.match(/^([A-Z,a-z\s])+$/)) {
        this.openSnackBar("Please Enter Valid Godown Keeper 2");
        return false;
      } else {
        this.txtgdkee2 = this.form.get('txtgdkee2')?.value ?? '';
      }
    } else {
      this.txtgdkee2 = this.form.get('txtgdkee2')?.value ?? '';
    }
    if (this.form.get('txtgdkee3')?.value != '' && this.form.get('txtgdkee3')?.value != null) {
      if (!this.form.get('txtgdkee3')?.value?.match(/^([A-Z,a-z\s])+$/)) {
        this.openSnackBar("Please Enter Valid Godown Keeper 3");
        return false;
      } else {
        this.txtgdkee3 = this.form.get('txtgdkee3')?.value ?? '';
      }
    } else {
      this.txtgdkee3 = this.form.get('txtgdkee3')?.value ?? '';
    }

    if (this.form.get('rdboctFlg')?.value == 'Y') {
      if (!this.form.get('txtocyper')?.value?.match(/^([0-9])+$/)) {
        this.openSnackBar('Please Enter Octra Amount');
        return false;
      }
    }

    const emailIDValue = this.form.get('txtEmailID')?.value ?? '';
    if (emailIDValue !== '') {
      if (!emailIDValue.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId");
        return false;
      } else {
        this.emailId = emailIDValue;
      }
    } else {
      this.emailId = emailIDValue;
    }

    const edgpEmailValue = this.form.get('txtedgpEmail')?.value ?? '';
    if (edgpEmailValue !== '') {
      if (!edgpEmailValue.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EDGP EmailId");
        return false;
      } else {
        this.EdgpemailId = edgpEmailValue;
      }
    } else {
      this.EdgpemailId = edgpEmailValue;
    }

    const mobileNoValue = this.form.get('txtmobileNo')?.value ?? '';
    if (mobileNoValue !== '') {
      if (!mobileNoValue.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Mobile Number");
        return false;
      } else {
        this.MobileNo = mobileNoValue;
      }
    } else {
      this.MobileNo = mobileNoValue;
    }

    const faxNo1Value = this.form.get('txtFaxNo1')?.value ?? '';
    if (faxNo1Value !== '') {
      if (!faxNo1Value.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Fax 1");
        return false;
      } else {
        this.FaxNo1 = faxNo1Value;
      }
    } else {
      this.FaxNo1 = faxNo1Value;
    }

    const faxNo2Value = this.form.get('txtFaxNo2')?.value ?? '';
    if (faxNo2Value !== '') {
      if (!faxNo2Value.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Fax 2");
        return false;
      } else {
        this.FaxNo2 = faxNo2Value;
      }
    } else {
      this.FaxNo2 = faxNo2Value;
    }

    const telNo1Value = this.form.get('txttelNo1')?.value ?? '';
    if (telNo1Value !== '') {
      if (!telNo1Value.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Telephone Number 1");
        return false;
      } else {
        this.telNo1 = telNo1Value;
      }
    } else {
      this.telNo1 = telNo1Value;
    }

    const telNo2Value = this.form.get('txttelNo2')?.value ?? '';
    if (telNo2Value !== '') {
      if (!telNo2Value.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Telephone Number 2");
        return false;
      } else {
        this.telNo2 = telNo2Value;
      }
    } else {
      this.telNo2 = telNo2Value;
    }

    const contactNoValue = this.form.get('txtcontactNo')?.value ?? '';
    if (contactNoValue !== '') {
      if (!contactNoValue.match(/^([0-9])+$/)) {
        this.openSnackBar("Please Enter Valid Contact Number");
        return false;
      } else {
        this.contactNo = contactNoValue;
      }
    } else {
      this.contactNo = contactNoValue;
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
      txtgdkee1: this.txtgdkee1,
      txtgdkee2: this.txtgdkee2,
      txtgdkee3: this.txtgdkee3,
      txtgdaddline1: this.form.get('txtgdaddline1')?.value ?? '',
      txtgdaddline2: this.form.get('txtgdaddline2')?.value ?? '',
      txtgdaddline3: this.form.get('txtgdaddline3')?.value ?? '',
      txtgdaddline4: this.form.get('txtgdaddline4')?.value ?? '',
      cmbcity: this.form.get('cmbcity')?.value?.br_city ?? '',
      txtstate: this.form.get('txtstate')?.value ?? '',
      txtcountry: this.form.get('txtcountry')?.value ?? '',
      txttelNo1: this.telNo1,
      txttelNo2: this.telNo2,
      txtstdcode: this.form.get('txtstdcode')?.value ?? '',
      txtmobileNo: this.MobileNo,
      txtEmailID: this.emailId,
      txtFaxNo1: this.FaxNo1,
      txtFaxNo2: this.FaxNo2,
      txtDeliveryFrom: this.form.get('txtDeliveryFrom')?.value ?? '',
      txtDeliveryTo: this.form.get('txtDeliveryTo')?.value ?? '',
      rdboctFlg: this.form.get('rdboctFlg')?.value ?? '',
      txtocyper: this.form.get('txtocyper')?.value ?? '',
      rdbauthFlg: this.form.get('rdbauthFlg')?.value ?? '',
      txtcontactName: this.form.get('txtcontactName')?.value ?? '',
      txtcontactNo: this.contactNo,
      txtstNo: this.form.get('txtstNo')?.value ?? '',
      txtcstNo: this.form.get('txtcstNo')?.value ?? '',
      txtecccode: this.form.get('txtecccode')?.value ?? '',
      txtexcideDtl: this.form.get('txtexcideDtl')?.value ?? '',
      txtexcideRegNo: this.form.get('txtexcideRegNo')?.value ?? '',
      txtexcideRange: this.form.get('txtexcideRange')?.value ?? '',
      txtexcideRangeAdd: this.form.get('txtexcideRangeAdd')?.value ?? '',
      txtedgpAdd: this.form.get('txtedgpAdd')?.value ?? '',
      txtedgpTelNo1: this.form.get('txtedgpTelNo1')?.value ?? '',
      txtedgpTelNo2: this.form.get('txtedgpTelNo2')?.value ?? '',
      txtedgpFaxNo: this.form.get('txtedgpFaxNo')?.value ?? '',
      txtedgpEmail: this.EdgpemailId,
      rdbptsFlg: this.form.get('rdbptsFlg')?.value ?? '',
      br_acc_code: this.br_acc_code,
      stateCode: this.stateCode,
      countyCode: this.countyCode,
      current_date: this.utilityServiceAvaxPro.getFormatDate(this.currentDate, 'dd/MM/yyyy'),
      rdbpurchasebillentry: this.form.get('rdbpurchasebillentry')?.value ?? '',
      gd_pincode: this.form.get('txtgdpincode')?.value ?? '',
      txtlattitude: this.form.get('txtgdLattitude')?.value ?? '',
      txtlongitude: this.form.get('txtgdLongitude')?.value ?? '',
    }
    this.godwonService.addNewGodwon(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.navigateData["main_data"] = data.responseData[0]
        this.navigateData["flg"] = "insert"
        sessionStorage.removeItem("stateData");
        sessionStorage.removeItem("refData");

        sessionStorage.setItem("stateData", JSON.stringify(this.navigateData));
        this.router.navigate(['session/master/miscellaneous-master/open-new-godown/view-godwon'], {});
        this.openSnackBar("Inserted Successfully");
        return true;
      } else {
        this.openSnackBar("Error While Inserting");
        return false;
      }
    })
    return true
  }

  onRadioButonChange(event: any) {
    //   console.log('radVale.valueevent  ', event.value);
    if (event.value == 'N') {
      this.perflg = true
    } else {
      this.perflg = false
    }
  }


  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }
  /*   
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
      alert(" latitude" + this.latitude)
      alert(" longitude" + this.longitude)
    }
  
    markerDragEnd($event: MouseEvent) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
    }
  
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    } */

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
        fullAddress += this.form.controls.cmbcity.value.br_city + ",";
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
        fullAddress += this.form.controls.txtgdpincode.value;
      }
  
      console.log(" fullAddress ", fullAddress)
  
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
      dialogRef.afterClosed().subscribe(item => {
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
        }
        return true; // Ensure all code paths return a value
      })
    }

}
