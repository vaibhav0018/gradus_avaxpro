import { Component, OnInit, ViewChild, Optional } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
import { Observable } from 'rxjs';
import { CommonSnackbarComponent } from '../../../../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { CustomerMasterService } from '../../customer-master.service';
import { Router } from '@angular/router';
import { TableColumnHeaderViews as defaultGst } from '../constants'
import { PayMentModel } from '../../../../entry/commons/commons.model';
import { HandledByModel, PartyModel } from '../../../../entry/commons/commons.model';
import { StateMasterListModel, CountryListModel } from './misc-party-maintenance.model';
import { formatDate } from '@angular/common';
import { ElementModel } from '../../../../../../shared/models/model/element.model';
import { MapDialogComponentComponent } from '../../../../map-dialog-component/map-dialog-component.component';
import { switchMap, debounceTime, tap } from 'rxjs/operators';
import { CommonConfirmationDialogComponent } from '../../../../../../shared/components/common-confirmation-dialog/common-confirmation-dialog.component';
@Component({
  selector: 'app-misc-party-maintenance-menu',
  templateUrl: './misc-party-maintenance-menu.component.html',
  styleUrls: ['./misc-party-maintenance-menu.component.scss']
})

export class MiscPartyMaintenanceMenuComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup : any;

  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);
  form: FormGroup
  aryTableControl: AbstractControl[]
  formGroup: FormGroup

  industryTypeList: any = []
  lstPayterm: any = [];
  pay_day: any;
  gst_code: any;
  gstValid:boolean=false;
  gst_verification_flg:any;
  paytermLists: any;
  filteredHandledByLists: Observable<any>
  lstHandledBy: any = []
  payload: any = {}

  st_ctr_code: any;

  stateLists: any = [];
  countryLists: any = []
  stateELists: any = [];
  countryELists: any = []

  cust_supplr_code: any = "NEW";
  cust_supplr_name: any;

  addressCode: number = 1

  menuview: boolean = true

  addressview: boolean = true
  addcontactview: boolean = true

  flgSave: boolean = false
  lstAddedAdress: any = [];
  addedFlag: boolean = false
  showAddAddrRowFlag: boolean = true

  lstAddedContact: any = [];

  chkEmailRegx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  saveDraftAction: string = 'save'

  stateDataStr: string;
  stateData: any;
  flgModify: string = 'N'
  lstSupDetail: any = [];
  lstCustOf: any = [];

  cs_industry_head_code: string = ""
  cs_pay_code: string = ""
  cs_allow_special_tax: string = 'N'

  lstDummyTax: any = [];
  lstDummyTransporter: any = [];
  lstETax: any = []
  lstETransporter: any = []
  lstTax: any = []
  lstTransporter: any = []

  defaultGst: string
  stateArray: any = []
  countryArray: any = []

  selectedAddressIndex: number = 0
  addressCodeArray: any = [];
  selectedEditAddrIndex: number = 0

  queryParams = {}
  firstStateCode: string
  firstCountryCode: string
  custAddressArray: any[] = [];
  custContactArray: any[] = [];

  showIconFLg: boolean = false
  contactList: any = [];
  contactArray: any[] = [];
  contactDtlLabelArray = [
    'PURCHASE 1',
    'PURCHASE 2',
    'PURCHASE 3',
    'ACCOUNTS',
    'OWNER',
    'PROPRIETOR',
    'PARTNER 1',
    'PARTNER 2',
    'PARTNER 3',
    'PARTNER 4',
    'PARTNER 5'
  ]

  csad_email_flg: any = []

  hideBtnDiv: boolean = false
  industryLists: any = []
  flgAddRights: boolean = false
  flgModifyRights: boolean = false
  flgViewCustRights: boolean = false
  isForViewFlg: any;
  handled_by_code: any;
  email_verification_flg: any;
  extended_company: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private customerMasterService: CustomerMasterService,
    private router: Router,
    @Optional() private dialogRef: MatDialogRef<MiscPartyMaintenanceMenuComponent>,
  ) {
    this.form = this.formBuilder.group({
      txtMiscPartyName: [''],
      cmbIndustry: [''],
      txtpaytermdays: [''],
      cmbPayterms: [''],
      txtHandledBy: [''],
      txtPanNo: [''],
      rdbspecailtax: ['N'],

      arrayAddAdress: this.formBuilder.array([]),
      arrayEditAdress: this.formBuilder.array([]),

      //modify supp
      txtEMiscPartyName: [''],
      cmbEIndustry: [''],
      txtEPaytermDays: [''],
      cmbEPayCode: [''],
      txtEHandledBy: [''],
      txtEPanNo: [''],
      rdbEAllowTax: ['N'],

      //pacinput: ['']
    });

    this.setContactControls();
    this.defaultGst = defaultGst.view_at_init.gst_no

  }
  filterMsParty: PartyModel[] = new Array<PartyModel>()
  moduleCallFrom: any
  localData: any
  ngOnInit() {

    console.log(" localStorage.getItem('moduleCallFrom')***********", localStorage.getItem('moduleCallFrom'))
    if (localStorage.getItem('moduleCallFrom') == 'undefined') {
      console.log(" ***** in if ")
    } else {
      this.localData = JSON.parse(localStorage.getItem('moduleCallFrom')||"");
      this.moduleCallFrom = this.localData.callFrom
    }
    this.getEmailVerificationFlag();
    this.loadPageData();
  }

  ngOnChanges() {
    this.loadPageData()
  }

  loadPageData() {

    if (sessionStorage.refData)
      this.stateDataStr = sessionStorage.getItem("refData") ||"";
    else {
      this.stateDataStr = sessionStorage.getItem("stateData") ||"";
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }
    this.stateData = JSON.parse(this.stateDataStr)
    if (this.stateData != null) {
      this.cust_supplr_code = this.stateData.cust_supplr_code
      this.flgModify = this.stateData.flgModify
      this.flgModifyRights = this.stateData.flgModifyRights
      this.flgAddRights = this.stateData.flgAddRights
      this.flgViewCustRights = this.stateData.flgViewCustRights
      this.isForViewFlg = this.stateData.isForViewFlg
    }
    else {
      this.flgModify = 'N'
      this.cust_supplr_code = 'NEW'
      this.flgAddRights = true
      this.isForViewFlg = 'A'
    }

    this.hideBtnDiv = false
    this.getIndustryTypeList()

    if (this.flgModify == 'Y') {
      this.getPartyDetail(this.cust_supplr_code)
      this.showIconFLg = false
    }
    else if (this.flgModify == 'N') {

      this.getHandledByDropdown()

      this.filteredHandledByLists = this.form.get('txtHandledBy')!.valueChanges.pipe(
        startWith(''),
        map(value => {
          value =
            typeof value == 'string' || value instanceof String
              ? value
              : value.usr_name
          return this.filterHandledBy(value)
        })
      )

      this.showIconFLg = false
      this.addNewAddressRow(0); //initilize address row
    }

    this.form.get('txtMiscPartyName')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filterMsParty = new Array<PartyModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
        return value.length > 5 && this.flgAddRights && this.flgModify=='N' ? this.customerMasterService.searchParty(value,'M') : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.filterMsParty = data.responseData.map((item : any) => {
          return new PartyModel(item.cs_cust_supplr_code, item.cs_name)
        })
      }
      return this.filterMsParty
    },
      error => {
        console.log(error)
      }
    )
  }

  getIndustryTypeList() {
    this.utilityServiceAvaxPro.getIndustryList().subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.industryTypeList = data.responseData[0].map((item : any) => {
            return new ElementModel(item.ind_industry_code, item.ind_industry)
          })
        }
        return this.industryTypeList
      },
      error :(error) => {
        console.log(error)
      }
    }
    )
  }

  getPaymentTerm() {
    this.pay_day = this.form.controls.txtpaytermdays.value;
    if (this.pay_day == '') {
      this.pay_day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.paytermLists = data.responseData[0].map((item : any) => {
            return new PayMentModel(item.pt_code, item.pt_desc)
          })
          this.lstPayterm = data.responseData[0];
          this.form.controls.cmbPayterms.setValue(this.lstPayterm[0]);
        }
      })
  }

  getHandledByDropdown() {

    this.utilityServiceAvaxPro.getHandledByList().subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map((item : any) => {
            // console.log( item.usr_userid ,' item.usr_userid ' )
            // console.log( atob(sessionStorage.getItem(btoa('userId'))) ,' userId ' )
            if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId'))||"")) {
              this.form.get('txtHandledBy')?.setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            }
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        //  console.log( this.lstHandledBy + " this.lstHandledBy ")
        return this.lstHandledBy
      },
      error:(error) => {
        console.log(error)
      }
    }
    )
  }

  getModifyHandledByDropdown() {
    this.utilityServiceAvaxPro.getHandledByList().subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map((item : any) => {
            if (item.usr_userid == this.handled_by_code) {
              this.form.get('txtEHandledBy')?.setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            }
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        return this.lstHandledBy
      },
      error:(error) => {
        console.log(error)
      }
    }
    )
  }

  filterHandledBy(val: string) {
    return this.lstHandledBy.filter((option : any) => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayHandledBy(value :any): string | undefined {
    // return value ? value.usr_name : undefined
    return value ? value.usr_userid + ' -- ' + value.usr_name : undefined
  }

  getModifyPaymentTerm() {
    this.pay_day = this.form.controls.txtEPaytermDays.value;
    if (this.pay_day == '') {
      this.pay_day = 0;
    }
    let selectedObj : any;
    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //this.lstPayterm = data.responseData[0];
          this.lstPayterm = data.responseData[0].map((item : any) => {
            if (item.pt_code == this.cs_pay_code) {
              selectedObj = new PayMentModel(item.pt_code, item.pt_desc);
              return selectedObj;
            } else
              return new PayMentModel(item.pt_code, item.pt_desc)
          })

          //console.log('selectedObj payterm days', selectedObj);
          this.form.get('cmbEPayCode')?.setValue(selectedObj);
        }
      })
  }

  get items(): FormArray { return this.form.get('arrayAddAdress') as FormArray; }

  addNewAddressRow(index : any) {
    this.selectedAddressIndex = index
    let control = <FormArray>this.form.controls.arrayAddAdress;
    control.push(
      this.formBuilder.group({
        txtVendorCode: [''],
        txtDomainName: [''],
        txtAddCode: [''],
        txtAddrOne: [''],
        txtAddrSecond: [''],
        txtAddrThird: [''],
        txtAddrFourth: [''],
        cmbCountry: [''],
        cmbState: [''],
        txtCity: [''],
        txtPinCode: [''],
        txtLattitude: [''],
        txtLongitude: [''],
        txtTelNoOne: [''],
        txtTelNoSecond: [''],
        txtStdCode: [''],
        txtIsdCode: [''],
        txtFaxNoOne: [''],
        txtFaxNoSecond: [''],
        txtEmailIdOne: [''],
        txtEmailIdSecond: [''],
        txtHotLineNo: [''],
        txtMobileNo: [''],
        txtGstNo: [''],
        cmbTaxType: [''],
        cmbTransporter: [''],
      })
    )
    this.getCountryList(index);

    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.addressCodeArray[index] = this.addressCode

    this.formGroup.controls.txtAddCode.setValue(this.addressCode);
    this.formGroup.controls.txtGstNo.setValue(this.defaultGst)
  }

  initAddedAddressRow(index: any, current_row : any) {
    this.selectedEditAddrIndex = index
    let control = <FormArray>this.form.controls.arrayEditAdress;
    control.push(
      this.formBuilder.group({
        txtEVendorCode: [''],
        txtEDomainName: [''],
        txtEAddCode: [''],
        txtEAddrOne: [''],
        txtEAddrSecond: [''],
        txtEAddrThird: [''],
        txtEAddrFourth: [''],
        cmbECountry: [''],
        cmbEState: [''],
        txtECity: [''],
        txtEPinCode: [''],
        txtELattitude: [''],
        txtELongitude: [''],
        txtETelNoOne: [''],
        txtETelNoSecond: [''],
        txtEFaxNoOne: [''],
        txtEStdCode: [''],
        txtEIsdCode: [''],
        txtEFaxNoSecond: [''],
        txtEEmailIdOne: [''],
        txtEEmailIdSecond: [''],
        txtEHotLineNo: [''],
        txtEMobileNo: [''],
        txtEGstNo: [''],
        cmbETaxType: [''],
        cmbETransporter: ['']
      })
    )
    this.getCountryEList(index);

    this.lstETax[index] = this.lstDummyTax
    this.lstETransporter[index] = this.lstDummyTransporter

    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.formGroup.controls.txtEVendorCode.setValue(current_row.csad_vendor_code)
    this.formGroup.controls.txtEDomainName.setValue(current_row.csad_domain_name)
    this.formGroup.controls.txtEAddCode.setValue(current_row.csad_addr_code)
    this.formGroup.controls.txtEAddrOne.setValue(current_row.csad_address1)
    this.formGroup.controls.txtEAddrSecond.setValue(current_row.csad_address2)
    this.formGroup.controls.txtEAddrThird.setValue(current_row.csad_address3)
    this.formGroup.controls.txtECity.setValue(current_row.csad_city)
    this.formGroup.controls.txtEPinCode.setValue(current_row.csad_pincode)
    this.formGroup.controls.txtELattitude.setValue(current_row.csad_latitude)
    this.formGroup.controls.txtELongitude.setValue(current_row.csad_longitude)
    this.formGroup.controls.txtETelNoOne.setValue(current_row.csad_tel_no1)
    this.formGroup.controls.txtETelNoSecond.setValue(current_row.csad_tel_no2)
    this.formGroup.controls.txtEStdCode.setValue(current_row.csad_std_code)
    this.formGroup.controls.txtEIsdCode.setValue(current_row.csad_isd_code)
    this.formGroup.controls.txtEFaxNoOne.setValue(current_row.csad_fax_1)
    this.formGroup.controls.txtEFaxNoSecond.setValue(current_row.csad_fax_2)

    if (current_row.csad_email_flg != '') {
      this.csad_email_flg[index] = current_row.csad_email_flg
    } else {
      this.csad_email_flg[index] = 'N'
    }

    if (current_row.csad_email_1 == null || current_row.csad_email_1 == '' || current_row.csad_email_1 == undefined) {
      this.formGroup.controls.txtEEmailIdOne.setValue('');
    } else {
      this.formGroup.controls.txtEEmailIdOne.setValue(current_row.csad_email_1.trim());
    }

    this.formGroup.controls.txtEEmailIdSecond.setValue(current_row.csad_email_2)
    this.formGroup.controls.txtEHotLineNo.setValue(current_row.csad_hotline_no)
    this.formGroup.controls.txtEMobileNo.setValue(current_row.csad_mobile_no)
    if (current_row.csad_gst_no != "") {
      this.formGroup.controls.txtEGstNo.setValue(current_row.csad_gst_no)
    } else {
      this.formGroup.controls.txtEGstNo.setValue(this.defaultGst)
    }

    this.countryArray[index] = current_row.csad_country_code
    this.formGroup.controls.cmbECountry.setValue(current_row.csad_country_code)

    this.getESetStateDropdown(index, current_row.csad_state_code)

    //this.lstETax[index] = this.lstDummyTax
    //this.lstETransporter[index] = this.lstDummyTransporter

    console.log(' current_row = ', current_row);

    if (current_row.csad_tax_type == null || current_row.csad_tax_type == "" || current_row.csad_tax_type == undefined) {
    } else {
      this.formGroup.controls.cmbETaxType.setValue(current_row.csad_tax_type)
    }


    if (current_row.csad_transporter_code == null || current_row.csad_transporter_code == "" || current_row.csad_transporter_code == undefined) {
    } else {
      const toSelectedTransp = this.lstETransporter[index].find((c : any) => c.tr_code == current_row.csad_transporter_code)
      this.formGroup.controls.cmbETransporter.setValue(toSelectedTransp)
    }

  }

  checkDraftValidation(): any {

    console.log(" checkDraftValidation **********", this.form.value)

    if (this.form.get('txtMiscPartyName')?.value == '' || this.form.get('txtMiscPartyName')?.value == null) {
      this.openSnackBar('Please Enter Party Name');
      return false;
    }

    if (this.form.get('cmbIndustry')?.value == '' || this.form.get('cmbIndustry')?.value == null) {
      this.openSnackBar('Please Select Industry Head Code');
      return false;
    }

    if (this.form.get("txtpaytermdays")?.value != "") {
      if ((this.form.get("txtpaytermdays")?.value).length == 0) {
        this.openSnackBar("Enter a numeric value for Pay Term Days");
        return false;
      }
    }

    if (this.form.get("txtpaytermdays")?.value != "") {
      if (isNaN(this.form.get("txtpaytermdays")?.value)) {
        this.openSnackBar("Enter a numeric value for Pay Term Days");
        return false;
      }
    }

    if (this.form.get("txtpaytermdays")?.value != "") {
      let dot = this.form.get("txtpaytermdays")?.value.toString().indexOf(".");
      if (dot != -1) {
        this.openSnackBar("Pay Term Days cant be decimal");
        return false;
      }
    }


      // if (this.form.get('cmbPayterms').value == '' || this.form.get('cmbPayterms').value == null) {
      //   this.openSnackBar('Please select Pay Code');
      //   return false;
      // }
    

    if (this.form.get('txtHandledBy')?.value == '' || this.form.get('txtHandledBy')?.value == null) {
      this.openSnackBar('Handled By Can Not Be Blank');
      return false;
    }

    return true;
  }//end of func


  savePartyDraft() {

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))  || ""),
      },
      cd_name: this.form.get('txtMiscPartyName')?.value,
      cs_cust_supplr_flg: 'M',
      cd_industry_head_code: this.form.get('cmbIndustry')?.value != undefined ? this.form.get('cmbIndustry')?.value : '',
      cd_allow_special_tax: this.form.get('rdbspecailtax')?.value,
      // cd_pay_terms_day: this.form.get('txtpaytermdays').value,
      cd_pay_terms_day: this.form.get('txtpaytermdays')?.value != '' ? this.form.get('txtpaytermdays')?.value :'0',
      cd_pay_code: this.form.get('cmbPayterms')?.value.pt_code != undefined ? this.form.get('cmbPayterms')?.value.pt_code : '',
      cd_handled_by: this.form.get('txtHandledBy')?.value.usr_userid,
      cd_foll_by: this.form.get('txtHandledBy')?.value.usr_userid,
      cd_pan_no: this.form.get('txtPanNo')?.value,
      cd_deleted_flg: 'N',
      cd_created_by: atob(sessionStorage.getItem(btoa('userId'))  || ""),
      contactDto: this.contactArray,
      custAddrDto: this.custAddressArray,
    }

    console.log('cd_pay_terms_day : ', this.form.get('txtpaytermdays')?.value);
    console.log('ch_pay_code', this.form.get('cmbPayterms')?.value);

    //alert('py');
    this.customerMasterService.completeSupplierVendor(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

        this.cust_supplr_code = data.responseData[1]
        this.cust_supplr_name = data.responseData[2]
        this.custAddressArray = []
        this.custContactArray = []

        if (data.responseData[0] == "INSERTED SUCCESSFULLY") {

          this.openSnackBar("Misc.Party INSERTED SUCCESSFULLY and Misc.Party code is " + this.cust_supplr_code);
          if (this.moduleCallFrom == 'quotation') {
            let datastr = {
              cust_supplr_code: this.cust_supplr_code,
              cust_supplr_name: this.cust_supplr_name,
              flgModify: "Y",
              userInformationDto: {
                usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
                usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
                fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
                fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
                fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
                usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
                usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
                usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
                usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
                usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
                usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
              },
            }
            sessionStorage.setItem("stateData", JSON.stringify(datastr));
            this.dialogRef.close('close');

          } else {
            this.hideBtnDiv = true
            let datastr = {
              cust_supplr_code: this.cust_supplr_code,
              cust_supplr_name: '',
              flgModify: "Y",
              userInformationDto: {
                usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
                usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
                fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
                fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
                fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))  || ""),
                usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
                usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
                usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
                usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
                usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
                usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
              },
            }
            sessionStorage.setItem("stateData", JSON.stringify(datastr));
            this.router.navigate(['/session/master/customer-draft-master/miscparty'], { state: datastr });
            this.showIconFLg = false
            this.tabGroup.selectedIndex = 0
            return true;
          }
        }

      } else {
        this.openSnackBar("Error While updating misc party details");
        return false;
      }
      return true;
    })

  }

  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  getCountryList(index : any) {
    this.utilityServiceAvaxPro.getCountryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countryLists[index] = data.responseData[0].map((item : any ) => {

            if (item.ctr_home_country_flg == 'Y') {
              this.getrows = this.form.get('arrayAddAdress') as FormArray;
              this.aryTableControl = this.getrows.controls;
              this.formGroup = this.aryTableControl[index] as FormGroup;
              this.formGroup.controls.cmbCountry.setValue(item.ctr_code)
              this.onCountryChange('', index);
            }

            return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
          })
        }
        return this.countryLists[index]
      }
    )
  }

  getCountryEList(index : any) {
    this.utilityServiceAvaxPro.getCountryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countryELists[index] = data.responseData[0].map((item : any) => {
            return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
          })
        }
        return this.countryELists[index]
      }
    )
  }

  onCountryEChange(event: any, index: any) {
    console.log('onCountryEChange', event.value);

    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;
    this.st_ctr_code = this.formGroup.controls.cmbECountry.value;
    this.getStateEDropdown(this.st_ctr_code, index);
  }

  getStateEDropdown(st_ctr_code: any, index: any) {
    this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.stateELists[index] = null;
        new StateMasterListModel('', '')
        return false;
      } else {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateELists[index] = data.responseData[0].map((item : any ) => {
            return new StateMasterListModel(item.st_code, item.st_state)
          })
        }
        return this.stateELists[index]
      }
    })
  }

  onCountryChange(event : any, index : any) {
    console.log('event', event.value);

    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;
    this.st_ctr_code = this.formGroup.controls.cmbCountry.value
    this.getStateDropdown(this.st_ctr_code, index);
  }

  getStateDropdown(st_ctr_code : any, index : any) {
    this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.stateLists[index] = null;
        new StateMasterListModel('', '')
        return false;
      } else {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateLists[index] = data.responseData[0].map((item : any) => {
            return new StateMasterListModel(item.st_code, item.st_state)
          })
        }
        return this.stateLists[index]
      }
    })
  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

  savePartyAddress(index : any) {

    console.log(" index ", index)

    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.getAddressData();

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
      cd_cust_supplr_code: this.cust_supplr_code,
      cs_cust_supplr_flg: 'M',
      cd_edited_by: atob(sessionStorage.getItem(btoa('userId')) || ""),
      cd_pan_no: this.form.controls.txtEPanNo.value != undefined ? this.form.controls.txtEPanNo.value : '-',
      custAddrDto: this.custAddressArray,
    }

    this.customerMasterService.saveSupplierVendorAddress(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

        console.log(" data.responseData ", data.responseData)
        this.openSnackBar(" Address Details Inserted Successfully");

        this.resetAddressEntryRow(index)

        this.lstAddedAdress = data.responseData
        if (this.lstAddedAdress.length > 0) {
          this.showIconFLg = true
          for (let index = 0; index < this.lstAddedAdress.length; index++) {
            this.initAddedAddressRow(index, this.lstAddedAdress[index])
            this.addressCode = this.lstAddedAdress[index].csad_addr_code
          }
          this.addressCode = (Number(this.addressCode) + 1)

          this.addressCodeArray[0] = this.addressCode

          this.getrows = this.form.get('arrayAddAdress') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[0] as FormGroup;
          this.formGroup.controls.txtAddCode.setValue(this.addressCode)
          this.formGroup.controls.txtGstNo.setValue(this.defaultGst)

          this.items.removeAt(0);

        }

        return true;
      } else {
        this.openSnackBar("Error While Inserting");
        return false;
      }
    })

  }

  resetAddressEntryRow(index: any) {
    console.log(" resetAddressEntryRow index ", index)
    if (index != -1) {
      this.formGroup.controls.txtVendorCode.setValue('')
      this.formGroup.controls.txtDomainName.setValue('')
      this.formGroup.controls.txtAddCode.setValue('')
      this.formGroup.controls.txtAddrOne.setValue('')
      this.formGroup.controls.txtAddrSecond.setValue('')
      this.formGroup.controls.txtAddrThird.setValue('')
      this.formGroup.controls.txtAddrFourth.setValue('')
      this.formGroup.controls.cmbCountry.setValue('')
      this.formGroup.controls.cmbState.setValue('')
      this.formGroup.controls.txtCity.setValue('')
      this.formGroup.controls.txtPinCode.setValue('')
      this.formGroup.controls.txtLattitude.setValue('')
      this.formGroup.controls.txtLongitude.setValue('')
      this.formGroup.controls.txtTelNoOne.setValue('')
      this.formGroup.controls.txtTelNoSecond.setValue('')
      this.formGroup.controls.txtStdCode.setValue('')
      this.formGroup.controls.txtIsdCode.setValue('')
      this.formGroup.controls.txtFaxNoOne.setValue('')
      this.formGroup.controls.txtFaxNoSecond.setValue('')
      this.formGroup.controls.txtEmailIdOne.setValue('')
      this.formGroup.controls.txtEmailIdSecond.setValue('')
      this.formGroup.controls.txtHotLineNo.setValue('')
      this.formGroup.controls.txtMobileNo.setValue('')
      this.formGroup.controls.txtGstNo.setValue('')
      this.formGroup.controls.cmbTaxType.setValue('')
      this.formGroup.controls.cmbTransporter.setValue('')
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  getPartyDetail(cust_supplier_code: any) {

    this.payload = {
      cd_cust_supplr_code: cust_supplier_code,
      cs_cust_supplr_flg: 'M',
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
      cd_ts_created: atob(sessionStorage.getItem(btoa('userId'))  || ""),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))  || ""),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
    }

    this.customerMasterService.getSupVendModifyData(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

        this.lstSupDetail = data.responseData[0][0]//data list
        console.log(" this.lstSupDetail in main call ", this.lstSupDetail)

        this.addressview = true
        this.addedFlag = false
        this.showAddAddrRowFlag = true

        this.lstDummyTax = data.responseData[6] //tax_list
        this.lstDummyTransporter = data.responseData[7] //transporter_list
        if(data.responseData[9].extended_company == 'N'){
          this.extended_company="Not Extended in Logged in Company"
        }else{
          this.extended_company=""
        }
        this.lstAddedAdress = data.responseData[4]
        if (this.lstAddedAdress.length > 0) {
          this.showIconFLg = true
          for (let index = 0; index < this.lstAddedAdress.length; index++) {
            this.initAddedAddressRow(index, this.lstAddedAdress[index])
            this.addressCode = this.lstAddedAdress[index].csad_addr_code
          }
          this.addressCode = (Number(this.addressCode) + 1)
        } else {
          this.showIconFLg = false
          this.addressCode = 1
          this.addNewAddressRow(0)
        }


        this.form.get("txtEMiscPartyName")?.setValue(this.lstSupDetail.cs_name)
        this.form.get("txtEPanNo")?.setValue(this.lstSupDetail.cs_pan_no)
        this.form.get("txtEPaytermDays")?.setValue(this.lstSupDetail.cs_pay_terms_day)
        this.cs_industry_head_code = this.lstSupDetail['cs_industry_head_code']
        this.handled_by_code=this.lstSupDetail.cs_handled_by
        this.getModifyHandledByDropdown()
        this.cs_pay_code = this.lstSupDetail['cs_pay_code']

        this.getModifyPaymentTerm()
        console.log(" this.lstPayterm 877 ", this.lstPayterm)



        this.filteredHandledByLists = this.form.get('txtEHandledBy')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            value =
              typeof value == 'string' || value instanceof String
                ? value
                : value.usr_name
            return this.filterHandledBy(value)
          })
        )

        this.cs_allow_special_tax = this.lstSupDetail['cs_allow_special_tax']

        this.lstTax[0] = this.lstDummyTax
        this.lstTransporter[0] = this.lstDummyTransporter

        this.lstAddedContact = data.responseData[5]
        this.setContactData(this.lstAddedContact)

      }
      else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109'){
        this.router.navigate(['/session/master/customer-draft-master/'])
        UtilityServiceAvaxPro.showErrMessage(this.snackBar,data.message)
      }
    })
  }

  getUpdatedPartyDetail(cust_supplier_code: any) {

    this.payload = {
      cd_cust_supplr_code: cust_supplier_code,
      cs_cust_supplr_flg: 'M',
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  || ""),
      cd_ts_created: atob(sessionStorage.getItem(btoa('userId'))  || ""),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code') ) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
    }

    this.customerMasterService.getSupVendModifyData(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

        this.lstSupDetail = data.responseData[0][0]//data list
        console.log(" this.lstSupDetail in main call ", this.lstSupDetail)

        this.addressview = true
        this.addedFlag = false
        this.showAddAddrRowFlag = true


        this.lstDummyTax = data.responseData[6] //tax_list
        this.lstDummyTransporter = data.responseData[7] //transporter_list

        this.lstAddedAdress = data.responseData[4]
        if (this.lstAddedAdress.length > 0) {
          this.showIconFLg = true
          for (let index = 0; index < this.lstAddedAdress.length; index++) {
            this.initAddedAddressRow(index, this.lstAddedAdress[index])
            this.addressCode = this.lstAddedAdress[index].csad_addr_code
          }
          this.addressCode = (Number(this.addressCode) + 1)
        } else {
          this.showIconFLg = false
          this.addressCode = 1
          this.addNewAddressRow(0)
        }

        // this.lstDummyTax = data.responseData[6] //tax_list
        // this.lstDummyTransporter = data.responseData[7] //transporter_list

        this.form.get("txtEMiscPartyName")?.setValue(this.lstSupDetail.cs_name)
        this.form.get("txtEPanNo")?.setValue(this.lstSupDetail.cs_pan_no)
        this.form.get("txtEPaytermDays")?.setValue(this.lstSupDetail.cs_pay_terms_day)

        this.cs_industry_head_code = this.lstSupDetail['cs_industry_head_code']

        this.getModifyHandledByDropdown()

        this.cs_pay_code = this.lstSupDetail['cs_pay_code']

        this.getModifyPaymentTerm()
        console.log(" this.lstPayterm 965 ", this.lstPayterm)



        this.filteredHandledByLists = this.form.get('txtEHandledBy')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            value =
              typeof value == 'string' || value instanceof String
                ? value
                : value.usr_name
            return this.filterHandledBy(value)
          })
        )

        this.cs_allow_special_tax = this.lstSupDetail['cs_allow_special_tax']

        this.lstTax[0] = this.lstDummyTax
        this.lstTransporter[0] = this.lstDummyTransporter

        this.lstAddedContact = data.responseData[5]
        this.setContactData(this.lstAddedContact)
      }
    })
  }

  checkModifyValidation(): any {

    console.log(" checkModifyValidation **********", this.form.value)

    if (this.form.get('txtEMiscPartyName')?.value == '' || this.form.get('txtEMiscPartyName')?.value == null) {
      this.openSnackBar('Please Enter Party Name');
      return false;
    }

    if (this.form.get('cmbEIndustry')?.value == '' || this.form.get('cmbEIndustry')?.value == null) {
      this.openSnackBar('Please Select Industry Head Code');
      return false;
    }

    if (this.form.get("txtEPaytermDays")?.value != "") {
      if ((this.form.get("txtEPaytermDays")?.value).length == 0) {
        this.openSnackBar("Enter a numeric value for Pay Term Days");
        return false;
      }
    }

    if (this.form.get("txtEPaytermDays")?.value != "") {
    if (isNaN(this.form.get("txtEPaytermDays")?.value)) {
      this.openSnackBar("Enter a numeric value for Pay Term Days");
      return false;
    }
  }
  if (this.form.get("txtEPaytermDays")?.value != "") {
    let dot = this.form.get("txtEPaytermDays")?.value.toString().indexOf(".");
    if (dot != -1) {
      this.openSnackBar("Pay Term Days cant be decimal");
      return false;
    }
  }

    // if (this.form.get('cmbEPayCode').value == '' || this.form.get('cmbEPayCode').value == null) {
    //   this.openSnackBar('Please select Pay Code');
    //   return false;
    // }

    if (this.form.get('txtEHandledBy')?.value == '' || this.form.get('txtEHandledBy')?.value == null) {
      this.openSnackBar('Handled By Can Not Be Blank');
      return false;
    }

    return true;
  }//end of func

  //modify calls
  updateParty() {
//sconsole.log( this.form.get('cmbEPayCode').value.pt_code ,' pt_code ')
// console.log( this.form.get('cmbEPayCode').value ,' cmbEPayCode ')
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))  || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch') )  || ""),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
      cd_name: this.form.get('txtEMiscPartyName')?.value,
      cs_cust_supplr_flg: 'M',
      cd_cust_supplr_code: this.cust_supplr_code,
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  || ""),
      cd_edited_by: atob(sessionStorage.getItem(btoa('userId')) || ""),
      cd_industry_head_code: this.form.get('cmbEIndustry')?.value != undefined ? this.form.get('cmbEIndustry')?.value : '',
//      cd_pay_terms_day: this.form.get('txtEPaytermDays').value,
      cd_pay_terms_day: this.form.get('txtEPaytermDays')?.value != '' ? this.form.get('txtEPaytermDays')?.value :'0',
      cd_pay_code: this.form.get('cmbEPayCode')?.value != undefined ? this.form.get('cmbEPayCode')?.value.pt_code : '',
      cd_handled_by: this.form.get('txtEHandledBy')?.value.usr_userid,
      cd_foll_by: this.form.get('txtEHandledBy')?.value.usr_userid,
      cd_pan_no: this.form.get('txtEPanNo')?.value != undefined ? this.form.get("txtEPanNo")?.value : '',
      cd_allow_special_tax: this.form.get('rdbEAllowTax')?.value,
      cd_deleted_flg: 'N',
      cd_aadhar_no: '',
      cs_tds_section: '',
      cs_sac_no: '',
      contactDto: this.contactArray,
      custAddrDto: this.custAddressArray,
    }

    console.log(" updatePartyVendor ", this.payload)
    this.customerMasterService.updateSupplierVendor(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.openSnackBar(" Misc.Party details updated successfully ")
        this.getUpdatedPartyDetail(this.cust_supplr_code)
        this.custContactArray = []
        this.custAddressArray = []
        this.tabGroup.selectedIndex = 0
        return true;

      } else {
        this.openSnackBar("Error While updating Misc.Party details");
        return false;
      }
    })
  }

  AddNewAddress(index: any) {
    console.log(" AddNewAddress ", index)

    if (this.flgModify == 'Y') {
      if (this.checkAddressValidation(this.selectedAddressIndex, "singleAddress")) {
        if (this.validateGSTPAN(this.selectedAddressIndex, "singleAddress")) {
          //validate gst pan and then call next process > save address
        }
      }
    } else {
      if (this.checkAddressValidation(index, "singleAddress")) {
        if (this.validateGSTPAN(this.selectedAddressIndex, "singleAddress")) {
          //validate gst pan and then call next process > add next row
        }
      }
    }
  }

  completeMiscParty() {

    if (this.checkDraftValidation()) {

      if (this.checkAddressValidation(this.selectedAddressIndex, "allAddress")) {
        if (this.validateGSTPAN(this.selectedAddressIndex, "allAddress")) {
          //check the validation for address and add next calls
        }
      }
    }
  }

  modifyMiscParty() {

    //header modification 
    if (this.checkModifyValidation()) {

      //validate addrss
      if (this.checkModifyAddressValidation(this.selectedEditAddrIndex)) {

        //validate gst_pan valdiation 
        if (this.validateEditGSTPAN(this.selectedEditAddrIndex)) {
          //check validation call next update Misc.Party function
        }
      }
    }

  }

  checkAddressValidation(selectedIndex : any, callFrom : any): any {

    console.log(" checkAddressValidation **********")

    let startedIndex: number = 0;
    if (callFrom == "singleAddress") {
      startedIndex = selectedIndex
    } else {
      startedIndex = 0
    }
    console.log(" checkAddressValidation startedIndex ", startedIndex)

    for (let index = startedIndex; index <= selectedIndex; index++) {

      this.getrows = this.form.get('arrayAddAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      //get home_country_flg
      let ctr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryLists[index].length; i++) {
        if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
          ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
        }
      }

      let errorRowIndex = 0
      if (this.flgModify == 'N') {
        errorRowIndex = index + 1
      } else {
        errorRowIndex = this.addressCode
      }

      if (this.formGroup.controls.txtAddrOne.value == '' || this.formGroup.controls.txtAddrOne.value == null) {
        this.openSnackBar('Please Enter Address 1 at address no' + (errorRowIndex));
        return false;
      }

      if (this.formGroup.controls.txtAddrSecond.value == '' || this.formGroup.controls.txtAddrSecond.value == null) {
        this.openSnackBar('Please Enter Address 2 at address no' + (errorRowIndex));
        return false;
      }

      if (this.formGroup.controls.cmbCountry.value == '' || this.formGroup.controls.cmbCountry.value == null) {
        this.openSnackBar('Please Select Country at address no' + (errorRowIndex));
        return false;
      }

      if (ctr_home_country_flg == 'Y') {
        if (this.formGroup.controls.cmbState.value == '' || this.formGroup.controls.cmbState.value == null) {
          this.openSnackBar('Please Select State at address no' + (errorRowIndex));
          return false;
        }

        if (this.formGroup.controls.txtPinCode.value == "" || this.formGroup.controls.txtPinCode.value == null) {
          this.openSnackBar('Please enter pincode  at address no' + (errorRowIndex));
          return false;
        } else {
          if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
            this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
            return false;
          }
        }
      }


      //location 
      if (this.formGroup.controls.txtLattitude.value.trim() == '' || this.formGroup.controls.txtLattitude.value.trim() == null) {
        this.openSnackBar('Please select lattitude at address no ' + (errorRowIndex));
        return false;
      }

      if (this.formGroup.controls.txtLongitude.value.trim() == '' || this.formGroup.controls.txtLongitude.value.trim() == null) {
        this.openSnackBar('Please select longitude at address no' + (errorRowIndex));
        return false;
      }

      if (this.formGroup.controls.txtMobileNo.value != "") {
        if (isNaN(this.formGroup.controls.txtMobileNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value at address no" + (errorRowIndex));
          return false;
        }
      }

      if (this.formGroup.controls.txtMobileNo.value != "") {
        if (isNaN(this.formGroup.controls.txtMobileNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for Mobile No at address no" + (errorRowIndex));
          return false;
        }
      }

      if (this.formGroup.controls.txtTelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtTelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no 1 at address no" + (errorRowIndex));
          return false;
        }
      }

      if (this.formGroup.controls.txtTelNoSecond.value != "") {
        if (isNaN(this.formGroup.controls.txtTelNoSecond.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no 2 at address no" + (errorRowIndex));
          return false;
        }
      }

      // Commented By Sandesh On August 3 2021 as per Requirment
      // if (index == 0 && this.flgModify == 'N') {

      //   console.log(' flgModify = ', this.flgModify, ' index = ', index);

      //   if (this.formGroup.controls.txtEmailIdOne.value == "" || this.formGroup.controls.txtEmailIdOne.value == null ||
      //     this.formGroup.controls.txtEmailIdOne.value == undefined) {
      //     this.openSnackBar('Please Enter Email Id for Address 1');
      //     return false;
      //   }
      // }

      if (index == 0) {
        this.firstCountryCode = this.formGroup.controls.cmbCountry.value;
        this.firstStateCode = this.formGroup.controls.cmbState.value.st_code;
      }
      console.log(" firstCountryCode ", this.firstCountryCode)
      console.log(" firstStateCode   ", this.firstStateCode)

      if (this.flgModify == 'N') {

        if (index != 0) {
          //same country
          if (this.firstCountryCode != this.formGroup.controls.cmbCountry.value) {
            this.openSnackBar('Please Select Same Country  at address no' + (errorRowIndex));
            return false;
          }

          //same state
          if (this.firstStateCode != this.formGroup.controls.cmbState.value.st_code) {
            this.openSnackBar('Please Select Same State  at address no' + (errorRowIndex));
            return false;
          }
        }
      } else {

        if (this.countryArray.length > 0) {
          //same country
          let countrylen = Number(this.countryArray.length) - 1
          let firstCountry = this.formGroup.controls.cmbCountry.value;
          console.log(" 1YfirstCountry ", firstCountry)

          if (firstCountry != this.countryArray[countrylen]) {
            this.openSnackBar('Please Select Same country  at address no' + (errorRowIndex));
            return false;
          }

          //same state
          let len = Number(this.stateArray.length) - 1
          let firstState = this.formGroup.controls.cmbState.value.st_code;
          console.log(" 1YfirstState ", firstState)

          if (firstState != this.stateArray[len]) {
            this.openSnackBar('Please Select Same State  at address no' + (errorRowIndex));
            return false;
          }
        }
      }


      console.log(" this.defaultGst ", this.defaultGst)
      console.log(" ctr_home_country_flg ", ctr_home_country_flg)

      let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;

      if (ctr_home_country_flg == 'Y') {

        if (this.formGroup.controls.txtGstNo.value != "") {

          if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

            if (this.flgModify == 'N') {

              if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
                this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
                return false;
              }
              if (this.form.controls.txtPanNo.value.length != 10) {
                this.openSnackBar('Please Enter 10 digits  pan Number.');
                return false;
              }
              if (!panRegex.test(this.form.controls.txtPanNo.value)) {
                this.openSnackBar("Please Enter correct pan no ");
                return false;
              }

            } else {
              if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
                this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
                return false;
              }

              if (this.form.controls.txtEPanNo.value.length != 10) {
                this.openSnackBar('Please Enter 10 digits  pan Number.');
                return false;
              }

              if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
                this.openSnackBar("Please Enter correct pan no ");
                return false;
              }
            }

            if (this.formGroup.controls.txtGstNo.value.length != 15) {
              this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (errorRowIndex));
              return false;
            }
          }
        }
      }

    }//for
    return true;

  }//end of func


  getESetStateDropdown(index : any, usrStateCode: any) {

    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let st_ctr_code = this.formGroup.controls.cmbECountry.value

    this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.stateELists[index] = null;
        new StateMasterListModel('', '')
        return false;
      } else {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateELists[index] = data.responseData[0].map((item : any) => {

            if (item.st_code == usrStateCode) {
              this.stateArray[index] = usrStateCode
            }
            return new StateMasterListModel(item.st_code, item.st_state)
          })

        }
        return this.stateELists[index]
      }
    })
  }

  //validate gst no 
  validateGSTPAN(selectedIndex : any, callFrom : any): any {
    console.log(" validateGSTPAN **********")

    let startedIndex: number = 0;
    if (callFrom == "singleAddress") {
      startedIndex = selectedIndex
    } else {
      startedIndex = 0
    }
    console.log(" validateGSTPAN startedIndex ", startedIndex)

    for (let index = startedIndex; index <= selectedIndex; index++) {

      this.getrows = this.form.get('arrayAddAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      let errorRowIndex = 0
      if (this.flgModify == 'N') {
        errorRowIndex = index + 1
      } else {
        errorRowIndex = this.addressCode
      }

      //get home_country_flg
      let ctr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryLists[index].length; i++) {
        if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
          ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
        }
      }

      // If the country is out of India, there is no need to validate gst no or pan no
      if (ctr_home_country_flg == 'Y') {

        let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;


if (this.formGroup.controls.txtGstNo.value == '' || this.formGroup.controls.txtGstNo.value == undefined) {
  if (index == selectedIndex) {
    this.callNextFunction(callFrom, selectedIndex)
  }
}else{

  if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {
    if (this.flgModify == 'N') {

      if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
        this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
        return false;
      }
      if (this.form.controls.txtPanNo.value.length != 10) {
        this.openSnackBar('Please Enter 10 digits  pan Number.');
        return false;
      }

      if (!panRegex.test(this.form.controls.txtPanNo.value)) {
        this.openSnackBar("Please Enter correct pan no ");
        return false;
      }

      this.payload = {
        userInformationDto: {
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
          usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))  || ""),
          fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
          usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))   || ""),
        },
        cd_pan_no: this.form.get("txtPanNo")?.value,
        callFrom: "complete",
        cust_code_flg: 'S',
      }

      if (this.cust_supplr_code != 'NEW') {
        this.payload.cd_cust_supplr_code = this.cust_supplr_code
      }
    } else {

      if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
        this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
        return false;
      }
      if (this.form.controls.txtEPanNo.value.length != 10) {
        this.openSnackBar('Please Enter 10 digits  pan Number.');
        return false;
      }

      if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
        this.openSnackBar("Please Enter correct pan no ");
        return false;
      }

      this.payload = {
        userInformationDto: {
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
          usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
          fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
          usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ""),
        },
        cd_pan_no: this.form.get("txtEPanNo")?.value,
        callFrom: "complete",
        cust_code_flg: 'S',
        cd_cust_supplr_code: this.cust_supplr_code
      }
    }


    //check duplicate pan_no
    this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          console.log('data.responseData[0] =', data.responseData[0]);
          if (data.responseData[0] == "Y") {
            this.openSnackBar("PAN NO IS ALREADY EXISTS");
            return false;
          }
          else {
            //if not default_gst
            if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

              this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
              this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

              this.customerMasterService.validateGstWithPan(this.payload).subscribe(
                data => {
                  if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                    console.log('data.responseData[0] =', data.responseData[0]);
                    if (data.responseData[0] != "Y") {
                      this.openSnackBar(data.responseData[0]);
                      return false;
                    } else {
                      //check_duplicate_gst_no
                      this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
                      this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value
                      // this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(data => {
                      //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                      // console.log('data.responseData[0] =', data.responseData[0]);
                      // if (data.responseData[0] == "Y") {
                      //   this.openSnackBar("GST NO IS ALREADY EXISTS");
                      //   return false;
                      // } else {
                      if (index == selectedIndex) {
                        this.callNextFunction(callFrom, selectedIndex)
                      }
                      // }
                      //     }
                      //   }
                      // )
                    }
                  }
                  return true
                }
              )
            }//defaultGst
            else {
              if (index == selectedIndex) {
                this.callNextFunction(callFrom, selectedIndex)
              }
            }
          }
        }
        return true
      }
    )
  } else {
    if (index == selectedIndex) {
      this.callNextFunction(callFrom, selectedIndex)
    }
  }
}

      }//ctr_home_country_flg
      else {
        if (index == selectedIndex) {
          this.callNextFunction(callFrom, selectedIndex)
        }
      }

    }//for
    //return true;
  }//func

  callNextFunction(callFrom : any, selectedIndex : any) {

    if (callFrom == "singleAddress") {
      if (this.flgModify == 'Y') {
        this.savePartyAddress(selectedIndex)
      } else {
        this.addressCode = (Number(this.addressCode) + 1)
        this.addNewAddressRow(selectedIndex + 1)
      }
    } else {

      //compelet Misc.Party

      this.getAddressData();

      this.getContactData();

      this.savePartyDraft();

    }
  }//callNextFunction

  getAddressData() {
    console.log(" this.selectedIndex ", this.selectedAddressIndex)

    this.custAddressArray = [];

    for (let index = 0; index <= this.selectedAddressIndex; index++) {

      this.getrows = this.form.get('arrayAddAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      this.custAddressArray.push({
        cdad_addr_code: this.formGroup.controls.txtAddCode.value,
        cdad_type_of_address: 'B',
        cdad_address: this.formGroup.controls.txtAddrOne.value + ',' +
          this.formGroup.controls.txtAddrSecond.value + ',' +
          this.formGroup.controls.txtAddrThird.value + ',' +
          this.formGroup.controls.txtAddrFourth.value,
        cdad_created_by: atob(sessionStorage.getItem(btoa('userId'))||""),
        cdad_deleted_flg: 'N',
        cdad_address1: this.formGroup.controls.txtAddrOne.value,
        cdad_address2: this.formGroup.controls.txtAddrSecond.value,
        cdad_address3: this.formGroup.controls.txtAddrThird.value,
        cdad_address4: this.formGroup.controls.txtAddrFourth.value,
        cdad_country_code: this.formGroup.controls.cmbCountry.value,
        cdad_state_code: this.formGroup.controls.cmbState.value.st_code,
        cdad_city: this.formGroup.controls.txtCity.value,
        cdad_pincode: this.formGroup.controls.txtPinCode.value,
        cdad_tel_no1: this.formGroup.controls.txtTelNoOne.value,
        cdad_tel_no2: this.formGroup.controls.txtTelNoSecond.value,
        cdad_fax_1: this.formGroup.controls.txtFaxNoOne.value,
        cdad_fax_2: this.formGroup.controls.txtFaxNoSecond.value,
        cdad_email_1: this.formGroup.controls.txtEmailIdOne.value,
        cdad_email_2: this.formGroup.controls.txtEmailIdSecond.value,
        cdad_hotline_no: this.formGroup.controls.txtHotLineNo.value,
        cdad_mobile_no: this.formGroup.controls.txtMobileNo.value,
        cdad_gst_no: this.formGroup.controls.txtGstNo.value,
        cdad_ecc_code: null,
        cdad_tin_no: null,
        cdad_csttin_no: null,
        cdad_vattin_no: null,
        cdad_std1: null,
        cdad_std2: null,
        cdad_std3: null,
        cdad_std4: null,
        cdad_latitude: this.formGroup.controls.txtLattitude.value,
        cdad_longitude: this.formGroup.controls.txtLongitude.value,
        cdad_vendor_code: this.formGroup.controls.txtVendorCode.value,
        cdad_domain_name: this.formGroup.controls.txtDomainName.value,
        cdad_std_code: this.formGroup.controls.txtStdCode.value,
        cdad_isd_code: this.formGroup.controls.txtIsdCode.value,
        cdad_tax_type: this.formGroup.controls.cmbTaxType.value != undefined ? this.formGroup.controls.cmbTaxType.value : '',
        cdad_transporter_code: this.formGroup.controls.cmbTransporter.value != undefined ? this.formGroup.controls.cmbTransporter.value : '',
      }
      );
    }
  }

  checkModifyAddressValidation(selectedEditIndex : any): any {

    console.log(" checkModifyAddressValidation **********", selectedEditIndex)

    for (let index = 0; index <= selectedEditIndex; index++) {

      this.getrows = this.form.get('arrayEditAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      //check home country_flg
      let ectr_home_country_flg: string = 'N'
      if(this.countryELists.length>0){
        for (let i = 0; i < this.countryELists[index].length; i++) {
          if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
            ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
          }
        }  
      }

      if (this.formGroup.controls.txtEAddrOne.value == '' || this.formGroup.controls.txtEAddrOne.value == null) {
        this.openSnackBar('Please Enter Address 1 at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.txtEAddrSecond.value == '' || this.formGroup.controls.txtEAddrSecond.value == null) {
        this.openSnackBar('Please Enter Address 2 at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.cmbECountry.value == '' || this.formGroup.controls.cmbECountry.value == null) {
        this.openSnackBar('Please Select Country at address no' + (index + 1));
        return false;
      }

      if (ectr_home_country_flg == 'Y') {

        if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
          this.openSnackBar('Please Select State at address no' + (index + 1));
          return false;
        }

        if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
          this.openSnackBar('Please enter pincode  at address no' + (index + 1));
          return false;
        } else {
          if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
            this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
            return false;
          }
        }
      }

      //location
      if (this.formGroup.controls.txtELongitude.value.trim() == '' || this.formGroup.controls.txtELongitude.value.trim() == null) {
        this.openSnackBar('Please select Lattitide at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.txtELattitude.value.trim() == '' || this.formGroup.controls.txtELattitude.value.trim() == null) {
        this.openSnackBar('Please select longitude at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.txtEMobileNo.value != "") {
        if (isNaN(this.formGroup.controls.txtEMobileNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value ");
          return false;
        }
      }

      if (this.formGroup.controls.txtEMobileNo.value != "") {
        if (isNaN(this.formGroup.controls.txtEMobileNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for Mobile No");
          return false;
        }
      }

      if (this.formGroup.controls.txtETelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtETelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no 1");
          return false;
        }
      }

      if (this.formGroup.controls.txtETelNoSecond.value != "") {
        if (isNaN(this.formGroup.controls.txtETelNoSecond.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no 2");
          return false;
        }
      }

      if (this.formGroup.controls.txtEStdCode.value != "") {
        if (isNaN(this.formGroup.controls.txtEStdCode.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for std no ");
          return false;
        }
      }

      if (this.formGroup.controls.txtEIsdCode.value != "") {
        if (isNaN(this.formGroup.controls.txtEIsdCode.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for isd no");
          return false;
        }
      }

      // if (index == 0) {
      //   console.log(' index = ', index);
      //   if (this.formGroup.controls.txtEEmailIdOne.value == "" || this.formGroup.controls.txtEEmailIdOne.value == null ||
      //     this.formGroup.controls.txtEEmailIdOne.value == undefined) {
      //     this.openSnackBar('Please Enter Email Id for Address 1');
      //     return false;
      //   }

      // }

      //same country at address noedit
      if (index != 0) {

        let firstCountry = this.formGroup.controls.cmbECountry.value
        console.log(" firstCountry ", firstCountry)

        this.getrows = this.form.get('arrayEditAdress') as FormArray;
        this.aryTableControl = this.getrows.controls;
        this.formGroup = this.aryTableControl[index - 1] as FormGroup;

        if (firstCountry != this.formGroup.controls.cmbECountry.value) {
          this.openSnackBar('Please Select Same country  at address no' + (index + 1));
          return false;
        }
      }

      //same state at address noedit
      if (index != 0) {

        let firstState = this.formGroup.controls.cmbEState.value
        console.log(" firstState ", firstState)

        this.getrows = this.form.get('arrayEditAdress') as FormArray;
        this.aryTableControl = this.getrows.controls;
        this.formGroup = this.aryTableControl[index - 1] as FormGroup;

        if (firstState != this.formGroup.controls.cmbEState.value) {
          this.openSnackBar('Please Select Same State  at address no' + (index + 1));
          return false;
        }
      }

      if (this.formGroup.controls.txtETelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtETelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no at address no" + (index + 1));
          return false;
        }
      }



      // If the country is out of India, there is no need to validate gst no or pan no
      if (ectr_home_country_flg == 'Y') {
        if (this.formGroup.controls.txtEGstNo.value == "" || this.formGroup.controls.txtEGstNo.value == null
          || this.formGroup.controls.txtEGstNo.value == undefined) {

        } else {

          if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

            if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
              this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
              return false;
            }
            if (this.form.controls.txtEPanNo.value.length != 10) {
              this.openSnackBar('Please Enter 10 digits  pan Number.');
              return false;
            }
            let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
              this.openSnackBar("Please Enter correct pan no ");
              return false;
            }

            if (this.formGroup.controls.txtEGstNo.value.length != 15) {
              this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (index + 1));
              return false;
            }
          }
        }
      }
    }
    return true;
  }//end of func

  validateEditGSTPAN(selectedEditIndex : any): any {
    console.log(" validateEditGSTPAN **********")

    for (let index = 0; index <= selectedEditIndex; index++) {

      this.getrows = this.form.get('arrayEditAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      //check home country_flg
      let ectr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryELists[index].length; i++) {
        if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
          ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
        }
      }

      // If the country is out of India, there is no need to validate gst no or pan no
      if (ectr_home_country_flg == 'Y') {

        
if (this.formGroup.controls.txtEGstNo.value == '' || this.formGroup.controls.txtEGstNo.value == undefined) {
  if (index == selectedEditIndex) {
    this.callNextEditFunction(selectedEditIndex)
  }
}else{

  if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

    if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
      this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
      return false;
    }
    if (this.form.controls.txtEPanNo.value.length != 10) {
      this.openSnackBar('Please Enter 10 digits  pan Number.');
      return false;
    }
    let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
    if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
      this.openSnackBar("Please Enter correct pan no ");
      return false;
    }

    if (this.form.controls.txtEPanNo.value != '' || this.form.controls.txtEPanNo.value != undefined) {

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
        cd_pan_no: this.form.get("txtEPanNo")?.value,
        callFrom: "complete",
        cust_code_flg: 'S',
        cd_cust_supplr_code: this.cust_supplr_code
      }

      //check duplicate pan_no
      this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            console.log('data.responseData[0] =', data.responseData[0]);
            if (data.responseData[0] == "Y") {
              this.openSnackBar("PAN NO IS ALREADY EXISTS");
              return false;
            }
            else {

              //if not default_gst
              if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

                this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
                this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

                this.customerMasterService.validateGstWithPan(this.payload).subscribe(
                  data => {
                    if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                      console.log('data.responseData[0] =', data.responseData[0]);
                      if (data.responseData[0] != "Y") {
                        this.openSnackBar(data.responseData[0]);
                        return false;
                      } else {
                        //check_duplicate_gst_no
                        this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
                        this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

                        // this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(data => {
                        //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                        //       console.log('data.responseData[0] =', data.responseData[0]);
                        // if (data.responseData[0] == "Y") {
                        //   this.openSnackBar("GST NO IS ALREADY EXISTS");
                        //   return false;
                        // } else {
                        if (index == selectedEditIndex) {
                          this.callNextEditFunction(selectedEditIndex)
                        }
                        // }
                        //     }
                        //   }
                        // )
                      }
                    }
                    return true
                  }
                )
              }//defaultGst
              else {
                if (index == selectedEditIndex) {
                  this.callNextEditFunction(selectedEditIndex)
                }
              }
            }
          }
          return true
        }
      )
    }//txtPanNo
  } else {
    if (index == selectedEditIndex) {
      this.callNextEditFunction(selectedEditIndex)
    }
  }
}

      }//ctr_home_country_flg
      else {
        if (index == selectedEditIndex) {
          this.callNextEditFunction(selectedEditIndex)
        }
      }
    }//for
    return true;
  }//func

  getEditAddressData() {
    console.log(" this.selectedIndex ", this.selectedEditAddrIndex)

    this.custAddressArray = [];

    for (let index = 0; index <= this.selectedEditAddrIndex; index++) {

      this.getrows = this.form.get('arrayEditAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      this.custAddressArray.push({
        cdad_type_of_address: 'B',
        cdad_addr_code: this.formGroup.controls.txtEAddCode.value, //this.addressCode,
        cdad_address1: this.formGroup.controls.txtEAddrOne.value,
        cdad_address2: this.formGroup.controls.txtEAddrSecond.value,
        cdad_address3: this.formGroup.controls.txtEAddrThird.value,
        cdad_address4: this.formGroup.controls.txtEAddrFourth.value,
        cdad_address: this.formGroup.controls.txtEAddrOne.value + ',' +
          this.formGroup.controls.txtEAddrSecond.value + ',' +
          this.formGroup.controls.txtEAddrThird.value + ',' +
          this.formGroup.controls.txtEAddrFourth.value,
        cdad_country_code: this.formGroup.controls.cmbECountry.value,
        cdad_state_code: this.formGroup.controls.cmbEState.value,
        cdad_city: this.formGroup.controls.txtECity.value,
        cdad_pincode: this.formGroup.controls.txtEPinCode.value,
        cdad_tel_no1: this.formGroup.controls.txtETelNoOne.value,
        cdad_tel_no2: this.formGroup.controls.txtETelNoSecond.value,
        cdad_fax_1: this.formGroup.controls.txtEFaxNoOne.value,
        cdad_fax_2: this.formGroup.controls.txtEFaxNoSecond.value,
        cdad_email_1: this.formGroup.controls.txtEEmailIdOne.value,
        cdad_email_2: this.formGroup.controls.txtEEmailIdSecond.value,
        cdad_hotline_no: this.formGroup.controls.txtEHotLineNo.value,
        cdad_mobile_no: this.formGroup.controls.txtEMobileNo.value,
        cdad_gst_no: this.formGroup.controls.txtEGstNo.value,
        cdad_ecc_code: null,
        cdad_tin_no: null,
        cdad_csttin_no: null,
        cdad_vattin_no: null,
        cdad_std1: null,
        cdad_std2: null,
        cdad_std3: null,
        cdad_std4: null,
        cdad_latitude: this.formGroup.controls.txtELattitude.value,
        cdad_longitude: this.formGroup.controls.txtELongitude.value,
        cdad_vendor_code: this.formGroup.controls.txtEVendorCode.value,
        cdad_domain_name: this.formGroup.controls.txtEDomainName.value,
        cdad_std_code: this.formGroup.controls.txtEStdCode.value,
        cdad_isd_code: this.formGroup.controls.txtEIsdCode.value,
        cdad_tax_type: this.formGroup.controls.cmbETaxType.value != undefined ? this.formGroup.controls.cmbETaxType.value : '',
        cdad_transporter_code: this.formGroup.controls.cmbETransporter.value != undefined ? this.formGroup.controls.cmbETransporter.value.tr_code : '',
        cdad_transporter: this.formGroup.controls.cmbETransporter.value != undefined ? this.formGroup.controls.cmbETransporter.value.tr_name : '',
        cdad_edited_by: atob(sessionStorage.getItem(btoa('userId')) || ""),
      }
      );
    }
  }

  callNextEditFunction(selectedEditIndex: any) {

    this.getEditAddressData();

    this.getContactData();

    this.updateParty();
  }

  initNewAddressRow(index : any) {
    console.log("initNewAddressRow ", this.addressCode)
    this.addNewAddressRow(0)
    this.showIconFLg = false
  }

  enableContact(event : any , i : any) {
    if (event.checked) {
      this.form.get('txtP' + i + 'Name')?.enable()
      this.form.get('txtP' + i + 'Email')?.enable()
      this.form.get('txtP' + i + 'StdCode')?.enable()
      this.form.get('txtP' + i + 'Teleno')?.enable()
      this.form.get('txtP' + i + 'FaxNo')?.enable()
      this.form.get('txtP' + i + 'MobileNo')?.enable()
      this.form.get('txtP' + i + 'AadharNo')?.enable()
    } else {
      this.form.get('txtP' + i + 'Name')?.disable()
      this.form.get('txtP' + i + 'Email')?.disable()
      this.form.get('txtP' + i + 'StdCode')?.disable()
      this.form.get('txtP' + i + 'Teleno')?.disable()
      this.form.get('txtP' + i + 'FaxNo')?.disable()
      this.form.get('txtP' + i + 'MobileNo')?.disable()
      this.form.get('txtP' + i + 'AadharNo')?.disable()
    }
  }

  setContactData(data: any) {
    for (let i = 0; i < data.length; i++) {
      let j = data[i].condr_code;
      this.form.controls["chkContactDtl" + j].setValue(true);
      this.form.controls["txtP" + j + "Name"].setValue(data[i].condr_name);
      this.form.controls["txtP" + j + "Name"].enable();
      this.form.controls["txtP" + j + "Email"].setValue(data[i].condr_email);
      this.form.controls["txtP" + j + "Email"].enable();
      this.form.controls["txtP" + j + "StdCode"].setValue(data[i].condr_std);
      this.form.controls["txtP" + j + "StdCode"].enable();
      this.form.controls["txtP" + j + "Teleno"].setValue(data[i].condr_telno_off_1);
      this.form.controls["txtP" + j + "Teleno"].enable();
      this.form.controls["txtP" + j + "FaxNo"].setValue(data[i].condr_fax1);
      this.form.controls["txtP" + j + "FaxNo"].enable();
      this.form.controls["txtP" + j + "MobileNo"].setValue(data[i].condr_mobile_no1);
      this.form.controls["txtP" + j + "MobileNo"].enable();
      this.form.controls["txtP" + j + "AadharNo"].setValue(data[i].condr_aadhar_no);
      this.form.controls["txtP" + j + "AadharNo"].enable();
    }
  }

  setContactControls() {
    for (let i = 1; i < 12; i++) {
      this.form.addControl('chkContactDtl' + i, new FormControl(false));
      this.form.addControl('txtP' + i + 'Name', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'Email', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'StdCode', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'Teleno', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'FaxNo', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'MobileNo', new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtP' + i + 'AadharNo', new FormControl({ value: '', disabled: true }));
    }
  }

  getContactData() {

    this.contactArray = [];
    for (let i = 1; i <= this.contactDtlLabelArray.length; i++) {
      if (this.form.controls["chkContactDtl" + i].value) {
        this.contactArray.push({
          condr_code: i,
          condr_cdad_code: '1',
          condr_name: this.form.controls["txtP" + i + "Name"].value,
          condr_email: this.form.controls["txtP" + i + "Email"].value,
          condr_std: this.form.controls["txtP" + i + "StdCode"].value,
          condr_telno_off_1: this.form.controls["txtP" + i + "Teleno"].value,
          condr_fax1: this.form.controls["txtP" + i + "FaxNo"].value,
          condr_mobile_no1: this.form.controls["txtP" + i + "MobileNo"].value,
          condr_aadhar_no: this.form.controls["txtP" + i + "AadharNo"].value,
          condr_created_by: atob(sessionStorage.getItem(btoa('userId'))||""),
          condr_deleted_flg: 'N',
        }
        );
      }
    }
  }

  showMap(index : any) {
    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let errorRowIndex: number = 0
    errorRowIndex = index + 1

    let ctr_home_country_flg: string = 'N'
    for (let i = 0; i < this.countryLists[index].length; i++) {
      if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
        ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
      }
    }


    if (this.formGroup.controls.txtAddrOne.value == '' || this.formGroup.controls.txtAddrOne.value == null) {
      this.openSnackBar('Please Enter Address 1 at address no' + (errorRowIndex));
      return false;
    }

    if (this.formGroup.controls.txtAddrSecond.value == '' || this.formGroup.controls.txtAddrSecond.value == null) {
      this.openSnackBar('Please Enter Address 2 at address no' + (errorRowIndex));
      return false;
    }

    if (this.formGroup.controls.cmbCountry.value == '' || this.formGroup.controls.cmbCountry.value == null) {
      this.openSnackBar('Please Select Country at address no' + (errorRowIndex));
      return false;
    }

    if (ctr_home_country_flg == 'Y') {
      if (this.formGroup.controls.cmbState.value == '' || this.formGroup.controls.cmbState.value == null) {
        this.openSnackBar('Please Select State at address no' + (errorRowIndex));
        return false;
      }

      if (this.formGroup.controls.txtPinCode.value == "" || this.formGroup.controls.txtPinCode.value == null) {
        this.openSnackBar('Please enter pincode  at address no' + (errorRowIndex));
        return false;
      } else {
        if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
          this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
          return false;
        }
      }
    }

    const toSelectedCountry = this.countryLists[index].find((c : any) => c.ctr_code == this.formGroup.controls.cmbCountry.value)
    console.log(" toSelectedCountry.ctr_desc ", toSelectedCountry.ctr_desc)

    /* let fullAddress: string
     fullAddress = this.formGroup.controls.txtAddrOne.value + "," +
       this.formGroup.controls.txtAddrSecond.value + "," +
       this.formGroup.controls.cmbState.value.st_state + " " +
       this.formGroup.controls.txtPinCode.value + "," +
       toSelectedCountry.ctr_desc
 */
    let fullAddress: string
    fullAddress = this.formGroup.controls.txtAddrOne.value + "," +
      this.formGroup.controls.txtAddrSecond.value + ",";

    if (this.formGroup.controls.cmbState.value !== null && this.formGroup.controls.cmbState.value !== undefined &&
      this.formGroup.controls.cmbState.value !== '') {
      fullAddress += this.formGroup.controls.cmbState.value.st_state + " ";
    } else if (this.formGroup.controls.txtPinCode.value !== null && this.formGroup.controls.txtPinCode.value !== undefined &&
      this.formGroup.controls.txtPinCode.value !== '') {
      fullAddress += this.formGroup.controls.txtPinCode.value + ",";
    }

    fullAddress += toSelectedCountry.ctr_desc
    console.log(" fullAddress ", fullAddress)

    this.openMapDialog(fullAddress.toUpperCase(), index, "add");
    return true;
  }

  //added addres map
  showEMap(index : any) {
    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    if (this.formGroup.controls.txtEAddrOne.value == '' || this.formGroup.controls.txtEAddrOne.value == null) {
      this.openSnackBar('Please Enter Address 1 at address no' + (index + 1));
      return false;
    }

    if (this.formGroup.controls.txtEAddrSecond.value == '' || this.formGroup.controls.txtEAddrSecond.value == null) {
      this.openSnackBar('Please Enter Address 2 at address no' + (index + 1));
      return false;
    }

    if (this.formGroup.controls.cmbECountry.value == '' || this.formGroup.controls.cmbECountry.value == null) {
      this.openSnackBar('Please Select Country at address no' + (index + 1));
      return false;
    }

    if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
      this.openSnackBar('Please Select State at address no' + (index + 1));
      return false;
    }

    if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
      this.openSnackBar('Please enter pincode  at address no' + (index + 1));
      return false;
    } else {
      if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
        this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
        return false;
      }
    }

    const toSelectedCountry = this.countryELists[index].find((c: any) => c.ctr_code == this.formGroup.controls.cmbECountry.value)
    console.log(" toSelectedCountry.ctr_desc ", toSelectedCountry.ctr_desc)

    const toSelectedState = this.stateELists[index].find((c: any) => c.st_code == this.formGroup.controls.cmbEState.value)
    console.log(" toSelectedState ", toSelectedState.st_state)


    let fullAddress: string
    fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
      this.formGroup.controls.txtEAddrSecond.value + "," +
      toSelectedState.st_state + " " +
      this.formGroup.controls.txtEPinCode.value + "," +
      toSelectedCountry.ctr_desc

    console.log(" fullAddress ", fullAddress)

    this.openMapDialog(fullAddress.toUpperCase(), index, "edit");
    return true;

  }

  openMapDialog(fullAddress : any, index : any, callFrom : any) {
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

        if (callFrom == "add") {

          this.getrows = this.form.get('arrayAddAdress') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[index] as FormGroup;

          this.formGroup.controls.txtLattitude.setValue(item.split("::")[0])
          this.formGroup.controls.txtLongitude.setValue(item.split("::")[1])

        } else {

          this.getrows = this.form.get('arrayEditAdress') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[index] as FormGroup;

          this.formGroup.controls.txtELattitude.setValue(item.split("::")[0])
          this.formGroup.controls.txtELongitude.setValue(item.split("::")[1])
        }
      }
      return true
    })
  }

  verifyEmail(i : any,cntrlName : any,flg : any,addr_code : any){
    let aryName='arrayAddAdress'
    if(flg=='M'){
      aryName='arrayEditAdress'
    }
    this.getrows = this.form.get(aryName) as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;
    if(this.formGroup.get(cntrlName)?.value == null || this.formGroup.get(cntrlName)?.value == '')
    {
      this.openSnackBar("Please Enter Email Id");
      return false;
    }
    let payload:any={party_code:this.cust_supplr_code,email_id:this.formGroup.get(cntrlName)?.value,addr_code:addr_code}
    this.utilityServiceAvaxPro.verifyEmail(payload).subscribe(
      (data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if(data.responseData.length == 0){
            this.openSnackBar("Email id does not exist. Please enter correct email id.")    
          }else
          if(data.responseData[0].csad_email_flg == 'Y')
          {
            this.openSnackBar("Email verified successfully.")
            // this.csad_email_flg[i]=data.responseData[0].csad_email_flg
          }
          else{
            this.openSnackBar("Email id does not exist. Please enter correct email id.")
            // this.csad_email_flg[i]=data.responseData[0].csad_email_flg
          }
          this.ngOnInit();          
        }
      },
      (error : any) => {
        console.log(error)
      }
    )
    return true;
  }

  getEmailVerificationFlag(){
    this.utilityServiceAvaxPro.getEmailVerificationFlag().subscribe(
      (data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
         this.email_verification_flg = data.responseData[0]  
         this.gst_verification_flg = data.responseData[1]        
        }else{
          this.email_verification_flg = "N"
          this.gst_verification_flg = "N"
        }
        console.log("this.email_verification_flg -- " + this.email_verification_flg)
        console.log("this.gst_verification_flg -- " + this.gst_verification_flg)
      },
      (error : any) => {
        console.log(error)
      }
    )
  }
  validateGst(addr_Code:Number,gstNo:string,flg:any){
    console.log("draft code ="+this.cust_supplr_code)

    let payload={
      gstNo:gstNo,
      cust_supplr_code:this.cust_supplr_code,
      draftFlg:flg,
      addr_Code:addr_Code,
      userInformationDto: {
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
      },
    }
    this.lstAddedAdress=[]
    this.customerMasterService.validateGst(payload).subscribe(data=>{
      if(data.responseStatus==='SUCCESS' && data.responseCode==='RES_200'){
        this.getPartyDetail(this.cust_supplr_code)
        this.openSnackBar(data.message)
        if(this.lstAddedAdress.length>0){
          this.gstValid=true;
        }
      }
      else{
        const dialogConfig = new MatDialogConfig()
              dialogConfig.width = '750px'
              dialogConfig.minWidth = '750px'
              dialogConfig.disableClose = true
              dialogConfig.autoFocus = true
              dialogConfig.data = {
                dialogType:'ERROR',
                message:data.message
              }
              const dialogRef = this.dialog.open(CommonConfirmationDialogComponent, dialogConfig)
                dialogRef.afterClosed().subscribe(item => {
                  this.getPartyDetail(this.cust_supplr_code)
                    this.gstValid=false;
                })
                return;     
              }
            })
      }
  reVerify(rowAddrGst:any){
    console.log("reVerify")
    if(rowAddrGst.csad_gst_flg=='Y'){
      let payload={
        flgDraft:'N',
        cd_cust_supplr_code: this.cust_supplr_code,
        csad_addr_code:rowAddrGst.csad_addr_code
      }
     this.customerMasterService.updateGSTFlg(payload).subscribe(data=>{
      if(data.responseStatus==='SUCCESS' && data.responseCode==='RES_200'){
        this.getPartyDetail(this.cust_supplr_code)
      }
      else{
        this.getPartyDetail(this.cust_supplr_code)
      }
     })
    }
  }
}



