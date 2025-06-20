import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { UtilityServiceAvaxPro } from 'src/app/core/services/utility/utility_avaxpro.service';
import { startWith, map } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { CustomerMasterService } from '../../customer-master.service';
import { HandledByModel } from '../../../../entry/commons/commons.model';
import { SnackbarMasterComponent } from '../../../snackbar-master/snackbar-master.component';
import { PartyModel } from '../../customer-master.model';
import { StateMasterListModel, CountryListModel } from '../misc-party-maintenance-menu/misc-party-maintenance.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import * as fileSaver from 'file-saver';
import { TableColumnHeaderViews as defaultGst } from '../constants'
import { MapDialogComponentComponent } from 'src/app/feature/session/map-dialog-component/map-dialog-component.component';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/entry/commons/date-adapter/app-date-adapter.service';
import { DatePipe } from '@angular/common';
import { CommonConfirmationDialogComponent } from 'src/app/shared/components/common-confirmation-dialog/common-confirmation-dialog.component';
import { SharedCommanDialogBoxComponent } from 'src/app/shared/comman-dialog-box/shared-comman-dialog-box/shared-comman-dialog-box.component';

@Component({
  selector: 'app-customer-maintaince-page',
  templateUrl: './customer-maintaince-page.component.html',
  styleUrls: ['../../../../entry/entry.scss', './customer-maintaince-page.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
    { provide: DatePipe },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
})

export class CustomerMaintaincePageComponent implements OnInit, OnDestroy {
  countryCode = '01';

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

  form: FormGroup
  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);
  aryTableControl: AbstractControl[]
  formGroup: FormGroup

  queryParams = {}

  billToAddresDetailflg: boolean = true;
  consigneeAddresDetailflg: boolean = false;
  bankDetailsFlag: boolean = false;
  contachPersonDtlFlag: boolean = false;
  businessRefFlag: boolean = false;
  editEmail:any=[];
  lstHandledBy: any = []
  lstFollowedBy: any = []

  filteredHandledByLists: Observable<any>
  filteredinstructedByLists: Observable<any>
  filteredFollowedByLists: Observable<any>

  filteredHandledByListsCmpWise: Observable<any>
  filteredinstructedByListsCmpWise: Observable<any>
  filteredFollowedByListsCmpWise: Observable<any>

  pay_day: any
  lstPayterm: any;
  groupList: any;

  bankLists: any;

  showSubCatFlg: boolean = false;
  showSubSubCatFlg: boolean = false;

  payload: any = {}

  transporterList: any = []
  filterTransporterLists: Observable<any>
  filterETransporterLists: Observable<any>
  chargeSubTypeCode: any = [];

  sisConcernArray: any[] = [];
  contactArray: any[] = [];
  BusinessReferencsArray: any[] = [];
  bizInt: any[] = []
  custAddressArray: any[] = [];
  custEditAddressArray: any[] = [];
  productTurnoverArray: any[] = [];

  stateLists: any = [];
  countryLists: any = [];

  stateELists: any = [];
  countryELists: any = [];
  gstValid:boolean=false;
  gst_verification_flg:any;
  legalStateLists: any = [];
  legalCountryLists: any = [];

  addressCode: number = 1
  selectedIndex: number = 0
  selectedEditIndex: number = 0
  chkEmailRegx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  cd_cust_draft_code: any = ''

  annualTurnover: any = [];
  custType: any = [];
  category: any = [];
  subcategory: any = [];
  subsubcategory: any = [];

  csLists: PartyModel[] = new Array<PartyModel>()
  filteredCSLists: PartyModel[] = new Array<PartyModel>()
  compcodeArray: any = [];
  stateDataStr: string;
  stateData: any;
  flgModify: string = 'N'
  flgDraft: string = 'N'
  flgAuthorize: string = 'N'
  // isForViewFlg: string = 'V'
  isForViewFlg: any

  cs_authorised: string = 'N'
  cust_supplr_code: string = 'NEW'
  st_ctr_code: string
  cust_flg: string = ''
  cust_supplr_name:string = ''

  headerInfo: any;
  cd_credit_limit: string;
  cd_vendor_code: string;
  cd_pay_terms_day: string;
  cd_allow_special_tax: string = 'N'
  cd_proof_of_receipt: string = 'N'
  cd_biz_premise_dtls: string = ""
  cd_yearly_business; string = ""
  cd_grn_flg: string = 'N'
  cd_type: string
  productTurnoverList: any = [];
  contactList: any = [];
  companyList: any = [];
  payList: any = [];
  companyListDataSource: any;
  compArray: any = [];

  fileList: any = []
  lstAddedAdress: any = []
  cdad_email_flg: any = []

  uploadResponse: any;
  error: any;
  fileDescFlg: boolean = false;
  fileData: File;
  selectedCompListArray: any[] = [];
  payTermList: any;
  cmpPayTermList: any = []

  ccs_credit_limit: any = []
  ccs_pay_terms_day: any = []
  ccs_print_item_calc: any = []
  ccs_grn_flg: any = []
  vr_code: any = []
  txtCcsRemarks:any = []

  stateArray: any = []
  countryArray: any = []

  defaultGst: string
  showIconFLg: boolean = false

  arySelectedHandledBy: any = []
  lstSelectedHandledBy: any = []

  arySelectedInstructedBy: any = []
  lstSelectedInstructedBy: any = []

  arySelectedFollowedBy: any = []
  lstSelectedFollowedBy: any = []

  arySelectedPayterm: any = []
  lstSelectedPayterm: any = []

  lsthandlebyLists: any[] = []
  filteredhandlebyLists: any[] = [];
  filterefollowedbyLists: any[] = [];
  filterinstrcutedbyLists: any[] = [];

  lstinstructedbyLists: any[] = []
  lstfollowedbyLists: any[] = []

  lstHandledBycmpwise: any = []
  status: number;
  pay_data: any = [];
  pay_term_days_tmp: any[];
  flgAddRights: boolean = false
  flgModifyRights: boolean = false
  flgViewCustRights: boolean = false
  flgAuthCustRights: any;
  user:string=''
  email_verification_flg: any;
  extended_company:string="";
  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private customerMasterService: CustomerMasterService,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({

      txtCustomerName: ['', [Validators.required]],
      txtPanNo: [''],
      txtCinNo: [''],
      txtAadharNo: ['', [Validators.min(12)]],
      txtGroupCode: [''],
      rdbCustType: ['', [Validators.required]],
      cmbCategary: [''],
      cmbSubCategary: [''],
      cmbSubSubCategary: [''],
      txtPartner: [''],
      txtNoOfEmployee: [''],
      txtVendorCode: [''],
      rdbAnnualTurnover: ['', [Validators.required]],
      rdbProofOfReceipt: ['N'],
      rdbAllowSpecialTax: ['N'],
      rdbTaxInvCopyDestination: [''],
      rdbBusinessPremisDtl: [''],
      txtAreaSqr: [''],
      txtOccupiedSince: [''],
      cmbFreight: ['001'],
      rdbAccFlg: [''],
      dtDate:[''],
      arrayAddAdress: this.formBuilder.array([]),
      arrayEditAdress: this.formBuilder.array([]),

      //BANK DETAILS
      chkSisConcern1: [''],
      chkSisConcern2: [''],
      chkSisConcern3: [''],
      txtNmOfSisConcern1: [''],
      txtNmOfSisConcern2: [''],
      txtNmOfSisConcern3: [''],
      txtCode1: [''],
      txtCode2: [''],
      txtCode3: [''],

      txtBankBranch: [''],
      cmbBank: [''],
      txtAccountNumber: [''],
      txtMaintainedSince: [''],
      txtIfscCode: [''],
      txtMicrCode: [''],

      //BUSINESS REFERENCES
      txtCreditRatingIfany: [''],
      chkSalesmanVisit: [''],
      chkCustomer: [''],
      chkWeb: [''],
      chkEmail: [''],
      chkAdvertisement: [''],
      chkExhibition: [''],

      //office use
      txtLegalPayDays: ['', [Validators.required]],
      txtPaymentTerm: ['', [Validators.required]],
      txtLegalCrLimit: ['', [Validators.required]],
      txtLegalGroupCrLimit: ['', [Validators.required]],
      txtLegalRemarks: [''],
      txtInstructedBy: ['', [Validators.required]],
      txtHandledBy: ['', [Validators.required]],
      txtFollowedBy: ['', [Validators.required]],
      cmbGrnRequired: ['N'],

      //billing preference
      txtCondDisc:[''],
      txtCondDays:[''],
      rdbTC:['N'],
      cmbTransporter:[''],
      cmbPrintItmCalc:['N'],
      rdbhardCopyInv: ['N'],

      //modfiy
      cmbFileList: [''],
      radFileType: [''],
      txtFileUploadDesc: [''],
      txtAuthRemarks: [''],

      arrayAuthCompany: this.formBuilder.array([]),

    });

    this.setContactControls();
    this.setBusinessRefControls();

    this.defaultGst = defaultGst.view_at_init.gst_no
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

  setBusinessRefControls() {
    for (let i = 1; i <= 4; i++) {
      this.form.addControl('chkBRSr' + i, new FormControl(false));
      this.form.addControl('txtBRCompName' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRContactPerson' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRDesignation' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRMobileNo' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRStdCode' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRTelephoneNo' + i, new FormControl({ value: '', disabled: true }));
      this.form.addControl('txtBRReftakenBy' + i, new FormControl({ value: '', disabled: true }));
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  ngOnInit() {

    if (sessionStorage.refData)
      this.stateDataStr = sessionStorage.getItem("refData");
    else {
      this.stateDataStr = sessionStorage.getItem("stateData");
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }

    this.stateData = JSON.parse(this.stateDataStr)
    this.cust_supplr_code = this.stateData.cust_supplr_code
    this.flgModify = this.stateData.flgModify
    this.flgAuthorize = this.stateData.flgAuthorize
    this.cs_authorised = this.stateData.cs_authorised
    this.isForViewFlg = this.stateData.isForViewFlg
    this.flgModify = this.stateData.flgModify
    this.flgModifyRights = this.stateData.flgModifyRights
    this.flgAddRights = this.stateData.flgAddRights
    this.flgViewCustRights = this.stateData.flgViewCustRights
    this.flgAuthCustRights = this.stateData.flgAuthCustRights

    this.form.get("rdbAccFlg").setValue(this.stateData.cust_flg)

    this.user = atob(sessionStorage.getItem(btoa('userId')))
    //get customer field list data
    this.showIconFLg = false
    // this.getPaymentTerm();

    this.getEmailVerificationFlag();    
    
    this.getDraftData();
    this.getHandledByDropdown();
    this.filteredHandledByLists = this.form.get('txtHandledBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy1(value)
      })
    )
    this.filteredFollowedByLists = this.form.get('txtFollowedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy1(value)
      })
    )
    this.filteredinstructedByLists = this.form.get('txtInstructedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy1(value)
      })
    )
    this.filterTransporterLists = this.form.controls.cmbTransporter.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value)
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.tr_name
        return this.filterDisplayTransporter(value)
      })
    )

    // this.getParty();

    this.fileDescFlg = false
    this.form.controls.txtNmOfSisConcern1.disable()
    this.form.controls.txtNmOfSisConcern2.disable()
    this.form.controls.txtNmOfSisConcern3.disable()
    this.form.controls.txtCode1.disable()
    this.form.controls.txtCode2.disable()
    this.form.controls.txtCode3.disable()

  }

  getParty() {
    this.utilityServiceAvaxPro.searchParty(this.form.get('txtGroupCode').value, '', '').subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

        this.filteredCSLists = data.responseData[0].map(item => {
          return new PartyModel(item.cs_code, item.cs_name)
        })
      }
      return this.filteredCSLists
    },
      error => {
        console.log(error)
      }
    )
  }

  displaycslist(value): string | undefined {
    return value ? value.cs_code + ' :: ' + value.cs_name : undefined
  }

  filterDisplayTransporter(val: string) {
    return this.transporterList.filter(option => {
      return option.tr_name.toLowerCase().includes(val.toLowerCase())
    })
  }

  displayTransporter(value): string | undefined {
    return value ? value.tr_name : undefined
  }

  getHandledByDropdown() {

    this.utilityServiceAvaxPro.getHandledByList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map(item => {
            // if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId')))) {
            //   this.form.get('txtHandledBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            //   this.form.get('txtFollowedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            //   this.form.get('txtInstructedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            // }
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        return this.lstHandledBy
      },
      error => {
        console.log(error)
      }
    )
  }

  filterHandledBy1(val: string) {
    return this.lstHandledBy.filter(option => {
      return (option.usr_name.toLowerCase().includes(val.toLowerCase()) || option.usr_userid.toLowerCase().includes(val.toLowerCase()))
    })
  }

  getCompanywiseHandledByList(company_code, index) {
    /* ToGetUserList */
    //hnadledby
    let selectedHandledby = ''
    this.lstSelectedHandledBy.forEach(item => {
      if (company_code == item.company_code) {
        selectedHandledby = item.handled_by_id
      }
    })

    this.lsthandlebyLists[index] = []
    //instructedby

    let selectedInstructedby = ''
    this.lstSelectedInstructedBy.forEach(item => {
      if (company_code == item.company_code) {
        selectedInstructedby = item.instructed_by_id

      }
    })

    this.lstinstructedbyLists[index] = []
    //followedby

    let selectedFollowedby = ''
    this.lstSelectedFollowedBy.forEach(item => {
      if (company_code == item.company_code) {
        selectedFollowedby = item.followed_by_id
      }
    })

    this.lstfollowedbyLists[index] = []


    this.utilityServiceAvaxPro.getCompanywiseHandledByList(company_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBycmpwise[index] = data.responseData[0].map(item => {
            if (selectedHandledby == item.usr_userid) {
              this.arySelectedHandledBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }

            if (selectedInstructedby == item.usr_userid) {
              this.arySelectedInstructedBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }
            if (selectedFollowedby == item.usr_userid) {
              this.arySelectedFollowedBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }

            this.lsthandlebyLists[index].push(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));

            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)

          })
          console.log('lstHandledBycmpwise-' + index, this.lstHandledBycmpwise[index])
        }
        // this.filteredhandlebyLists[index] = this.lsthandlebyLists[index]
        // this.filteredhandlebyLists[index] = this.lstfollowedbyLists[index]
        this.filteredhandlebyLists[index] = this.lsthandlebyLists[index]
        this.filterefollowedbyLists[index] = this.lsthandlebyLists[index]
        this.filterinstrcutedbyLists[index] = this.lsthandlebyLists[index]
      })
  }


  filterHandledBy(val: string, index) {
    // debugger
    return this.lsthandlebyLists[index].filter(option => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayHandledBy(value): string | undefined {
    // return value ? value.usr_name : undefined
    return value ? value.usr_userid + ' :: ' + value.usr_name : undefined
  }

  getPaymentTerm() {
    this.pay_day = this.form.controls.txtLegalPayDays.value;
   // console.log(' getPaymentTerm ', this.pay_day)
    if (this.pay_day == '' || this.pay_day == undefined) {
      this.pay_day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstPayterm = data.responseData[0];
          this.form.controls.txtPaymentTerm.setValue(this.lstPayterm[0]);
        }
      })
  }

  showSubCategary(event, flag) {
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
    }

    if (flag == 'subcat') {
      this.showSubSubCatFlg = true;
      this.payload['catCode'] = this.form.controls.cmbCategary.value.ind_industry_code;
      this.payload['forFlag'] = "subcat";
    } else {
      this.showSubSubCatFlg = true;
      this.payload['catCode'] = this.form.controls.cmbSubCategary.value.sind_industry_code;
      this.payload['forFlag'] = "subsubcat";
    }

    this.customerMasterService.getSubCategary(this.payload)
      .subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            flag == 'subcat' ? this.subcategory = data.responseData[0] : this.subsubcategory = data.responseData[0]
          }
        },
        error => {

        }
      )

  }

  openSnackBar(message) {
    // this.snackBar.openFromComponent(SnackbarMasterComponent, {
    //   data: message,
    //   duration: 10000,
    // });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }

  enableBuzPref(event, i) {
    if (event.checked) {

      this.form.get('txtBRCompName' + i).enable()
      this.form.get('txtBRContactPerson' + i).enable()
      this.form.get('txtBRDesignation' + i).enable()
      this.form.get('txtBRMobileNo' + i).enable()
      this.form.get('txtBRStdCode' + i).enable()
      this.form.get('txtBRTelephoneNo' + i).enable()
      this.form.get('txtBRReftakenBy' + i).enable()

    } else {

      this.form.get('txtBRCompName' + i).disable()
      this.form.get('txtBRContactPerson' + i).disable()
      this.form.get('txtBRDesignation' + i).disable()
      this.form.get('txtBRMobileNo' + i).disable()
      this.form.get('txtBRStdCode' + i).disable()
      this.form.get('txtBRTelephoneNo' + i).disable()
      this.form.get('txtBRReftakenBy' + i).disable()
    }
  }

  enableContact(event, i) {
    if (event.checked) {
      this.form.get('txtP' + i + 'Name').enable()
      this.form.get('txtP' + i + 'Email').enable()
      this.form.get('txtP' + i + 'StdCode').enable()
      this.form.get('txtP' + i + 'Teleno').enable()
      this.form.get('txtP' + i + 'FaxNo').enable()
      this.form.get('txtP' + i + 'MobileNo').enable()
      this.form.get('txtP' + i + 'AadharNo').enable()
    } else {
      this.form.get('txtP' + i + 'Name').disable()
      this.form.get('txtP' + i + 'Email').disable()
      this.form.get('txtP' + i + 'StdCode').disable()
      this.form.get('txtP' + i + 'Teleno').disable()
      this.form.get('txtP' + i + 'FaxNo').disable()
      this.form.get('txtP' + i + 'MobileNo').disable()
      this.form.get('txtP' + i + 'AadharNo').disable()
    }
  }

  enableProduct(event, gp_code) {
    if (event.checked) {
      this.form.get('txtProd' + gp_code).enable()
    } else {
      this.form.get('txtProd' + gp_code).disable()
    }
  }

  enableOtherBuz(event, i) {
    if (event.checked) {
      this.form.get('txtNmOfSisConcern' + i).enable()
      this.form.get('txtCode' + i).enable()
    } else {
      this.form.get('txtNmOfSisConcern' + i).disable()
      this.form.get('txtCode' + i).disable()
    }
  }

  get items(): FormArray { return this.form.get('arrayAddAdress') as FormArray; }


  addNewAddressRow(index) {
    this.selectedIndex = index;
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
        txtCity: [''],
        txtDistrict: [''],
        cmbState: [''],
        cmbCountry: [''],
        txtPinCode: [''],
        txtLattitude: [''],
        txtLongitude: [''],
        txtFaxNoOne: [''],
        txtTelNoOne: [''],
        txtWebsite: [''],
        txtEmailIdOne: [''],
        rdbEmailVerified: ['N'],
        txtGstNo: [''],
        cmbTransporter: [''],
      })
    )

    this.getCountryList(index);

    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.formGroup.controls.txtAddCode.setValue(this.addressCode);

    this.formGroup.controls.txtGstNo.setValue(this.defaultGst)

    this.filterTransporterLists = this.formGroup.controls.cmbTransporter.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value)
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.tr_name
        return this.filterDisplayTransporter(value)
      })
    )
  }

  getCountryList(index) {
    this.utilityServiceAvaxPro.getCountryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countryLists[index] = data.responseData[0].map(item => {
            //           console.log(' country item === ', item);
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

  onCountryChange(event, index) {

    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;
    this.formGroup.controls.cmbState.setValue('')

    this.st_ctr_code = this.formGroup.controls.cmbCountry.value
    this.getStateDropdown(this.st_ctr_code, index);

  }

  getStateDropdown(st_ctr_code, index) {
    this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.stateLists[index] = null;
        new StateMasterListModel('', '')
        return false;
      } else {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateLists[index] = data.responseData[0].map(item => {
            return new StateMasterListModel(item.st_code, item.st_state)
          })
        }
        return this.stateLists[index]
      }
    })
  }

  AddNewAddress(index) {
    console.log(" AddNewAddress ", index)

    if (this.checkAddressValidation(this.selectedIndex)) {

      for (let index = this.selectedIndex; index <= this.selectedIndex; index++) {

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

        // If the country is out of India, there is no need to validate gst no or pan no
        if (ctr_home_country_flg == 'Y') {

          if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {
            //pan validation is in all case 
            if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
              this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
              return false;
            }
            if (this.form.controls.txtPanNo.value.length != 10) {
              this.openSnackBar('Please Enter 10 digits  pan Number.');
              return false;
            }
            let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!panRegex.test(this.form.controls.txtPanNo.value)) {
              this.openSnackBar("Please Enter correct pan no ");
              return false;
            }

            if (this.form.controls.txtPanNo.value != '' || this.form.controls.txtPanNo.value != undefined) {

              this.payload = {
                userInformationDto: {
                  usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
                  usr_name: atob(sessionStorage.getItem(btoa('username'))),
                  fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
                  fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
                  fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
                  usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
                  usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
                  usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
                  usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
                },
                cd_pan_no: this.form.get("txtPanNo").value,
                callFrom: "complete",
                cust_code_flg: 'C',
                cd_cust_supplr_code: this.cust_supplr_code
              }

              //check duplicate pan_no
              // this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
              //   data => {
              //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              //       console.log('data.responseData[0] =', data.responseData[0]);
              //       if (data.responseData[0] == "Y") {
              //         this.openSnackBar("PAN NO IS ALREADY EXISTS");
              //         return false;
              //       }
              //       else {
              //         //if not default_gst
                      if (this.formGroup.controls.txtGstNo.value != this.defaultGst
                        && this.formGroup.controls.txtGstNo.value.length > 1
                      ) {
                        console.log('this.formGroup.controls.txtGstNo.value', this.formGroup.controls.txtGstNo.value);
                        console.log('this.formGroup.controls.txtGstNo.value length', this.formGroup.controls.txtGstNo.value.length)

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

                                this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
                                  data => {
                                    if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                                      console.log('data.responseData[0] =', data.responseData[0]);
                                      if (data.responseData[0] == "Y") {
                                        this.openSnackBar("GST NO IS ALREADY EXISTS");
                                        return false;
                                      } else {
                                        if (index == this.selectedIndex) {
                                          this.callNextFunction(this.selectedIndex)
                                        }
                                      }
                                    }
                                  }
                                )
                              }
                            }
                          }
                        )


                      }//defaultGst
                      else {
                        if (index == this.selectedIndex) {
                          this.callNextFunction(this.selectedIndex)
                        }
                      }
              //       }
              //     }
              //   }
              // )
            }//txtPanNo
          } else {
            if (index == this.selectedIndex) {
              this.callNextFunction(this.selectedIndex)
            }
          }
        }//ctr_home_country_flg
        else {
          if (index == this.selectedIndex) {
            this.callNextFunction(this.selectedIndex)
          }
        }
      }//for
    }//checkAddressValidation
  }

  callNextFunction(selectedIndex) {
    this.getAddressData();
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
      },
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      cd_deleted_flg: 'N',
      custAddrDto: this.custAddressArray,
      flgDraft: 'N',
      cd_cust_supplr_code: this.cust_supplr_code,
    }
    this.customerMasterService.saveCustDraftAddress(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.newAddressIndex=-1
        this.openSnackBar("CUSTOMER UPDATED SUCCESSFULLY.")
        this.custAddressArray = []
        this.loadComponent() 
        //reset row
        this.resetAddressEntryRow(0)

        //show added row 
        this.lstAddedAdress = data.responseData[0]

        if (this.lstAddedAdress.length > 0) {
          this.showIconFLg = true
          for (let index = 0; index < this.lstAddedAdress.length; index++) {

            this.addressCode = Number(this.lstAddedAdress[index].csad_addr_code)
            this.initAddedAddressRow(index, this.lstAddedAdress[index])
          }
          this.addressCode = (Number(this.addressCode) + 1)
          this.getrows = this.form.get('arrayAddAdress') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[0] as FormGroup;
          this.formGroup.controls.txtAddCode.setValue(this.addressCode)

          this.items.removeAt(0);
        }
         
        return true;
      } else {
        this.openSnackBar("Error While updating customer details");
        return false;
      }
    })
  }

  checkAddressValidation(selectedIndex): any {

    for (let index = selectedIndex; index <= selectedIndex; index++) {

      this.getrows = this.form.get('arrayAddAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      let ctr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryLists[index].length; i++) {
        if (this.formGroup.controls.cmbCountry.value == this.countryLists[index][i].ctr_code) {
          ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
        }
      }

      if (this.formGroup.controls.txtAddrOne.value == '' || this.formGroup.controls.txtAddrOne.value == null) {
        this.openSnackBar('Please Enter Address 1 at address no' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.txtAddrSecond.value == '' || this.formGroup.controls.txtAddrSecond.value == null) {
        this.openSnackBar('Please Enter Address 2 at address no' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.cmbCountry.value == '' || this.formGroup.controls.cmbCountry.value == null) {
        this.openSnackBar('Please Select Country at address no' + (this.addressCode));
        return false;
      }

      if (ctr_home_country_flg == 'Y') {

        if (this.formGroup.controls.cmbState.value == '' || this.formGroup.controls.cmbState.value == null) {
          this.openSnackBar('Please Select State at address no' + (this.addressCode));
          return false;
        }

        if (this.formGroup.controls.txtPinCode.value == "" || this.formGroup.controls.txtPinCode.value == null) {
          this.openSnackBar('Please enter pincode  at address no' + (this.addressCode));
          return false;
        } else {
          // if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
          //   this.openSnackBar("Please Enter valid  pincode at address no" + (this.addressCode));
          //   return false;
          // }
          if (this.formGroup.controls.txtPinCode.value.length != 6) {
            this.openSnackBar("Please Enter Valid Pincode OF 6 Digit " + (index + 1));
            return false;
          } else if (!this.formGroup.controls.txtPinCode.value.match(/^([0-9])+$/)) {
            this.openSnackBar("Please Enter valid pincode at address no" + (index + 1));
            return false;
          }
        }
      }


      //location 
      if (this.formGroup.controls.txtLattitude.value == null || this.formGroup.controls.txtLattitude.value.trim() == '') {
        this.openSnackBar('Please select lattitude at address no ' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.txtLongitude.value == null || this.formGroup.controls.txtLongitude.value.trim() == '') {
        this.openSnackBar('Please select longitude at address no' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.txtTelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtTelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone no at address no" + (this.addressCode));
          return false;
        }
      }
      

      /*  if (index == 0) {
         console.log('email id 1 = ', this.formGroup.controls.txtEmailIdOne.value);
         if (this.formGroup.controls.txtEmailIdOne.value === "" ||
           this.formGroup.controls.txtEmailIdOne.value === null ||
           this.formGroup.controls.txtEmailIdOne.value === undefined) {
           this.openSnackBar('Please Enter Email Id at address no 1');
           return false;
         }
       } */


      if (Number(this.addressCode) == 1) {
        if (this.formGroup.controls.txtEmailIdOne.value.trim() != "") {
          if (!this.chkEmailRegx.test(this.formGroup.controls.txtEmailIdOne.value)) {
            this.openSnackBar("Please Enter a valid email address at address no" + (this.addressCode));
            return false;
          }
        }
      }

      //same country
      let countrylen = Number(this.countryArray.length) - 1
      let firstCountry = this.formGroup.controls.cmbCountry.value;
      console.log(" firstCountry ", firstCountry)

      if (firstCountry != this.countryArray[countrylen]) {
        this.openSnackBar('Please Select Same country  at address no' + (this.addressCode));
        return false;
      }

      //same state  
      let len = Number(this.stateArray.length) - 1
      let firstState = this.formGroup.controls.cmbState.value.st_code;
      console.log(" firstState ", firstState)

      if (firstState != this.stateArray[len]) {
        this.openSnackBar('Please Select Same State  at address no' + (this.addressCode));
        return false;
      }

      //check home country flg 
      /* let ctr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryLists[index].length; i++) {
        if (this.formGroup.controls.cmbCountry.value == this.countryLists[index][i].ctr_code) {
          ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
        }
      } */

      // If the country is out of India, there is no need to validate gst no or pan no
      if (ctr_home_country_flg == 'Y') {

        if (this.formGroup.controls.txtGstNo.value != "") {

          if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

            if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
              this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
              return false;
            }

            //if gst is not default gst 
            if (this.formGroup.controls.txtGstNo.value.length != 15) {
              this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (this.addressCode));
              return false;
            }
          }

        }
      }

    }
    return true;
  }//end of func

  validateForm() {

    if (this.form.controls.rdbAccFlg.value == '' || this.form.controls.rdbAccFlg.value == undefined) {
      this.openSnackBar("Please Select Account Flag.");
      return false;
    }

    if (this.form.controls.rdbCustType.value == '' || this.form.controls.rdbCustType.value == undefined) {
      this.openSnackBar("Please Select Cust Type.");
      return false;
    }

    if (this.form.controls.cmbCategary.value == '' || this.form.controls.cmbCategary.value == undefined) {
      this.openSnackBar("Please Select Cust Categary.");
      return false;
    }
    
    if (this.form.controls.rdbAnnualTurnover.value == '' || this.form.controls.rdbAnnualTurnover.value == undefined 
    || this.form.controls.rdbAnnualTurnover.value == null || this.form.controls.rdbAnnualTurnover.value == 'null') {
      this.openSnackBar("Please Select Annual TurnOver.");
      return false;
    }

    if (this.form.controls.txtAadharNo.value == '' || this.form.controls.txtAadharNo.value == undefined ||
      this.form.controls.txtAadharNo.value == null) {

    }
    else {
      if (this.form.controls.txtAadharNo.value.length != 12) {
        this.openSnackBar('Please Enter 12 digits Aadhar Number.');
        return false;
      }
      let adharRegax = /^\d{4}\d{4}\d{4}$/;
      if (!adharRegax.test(this.form.controls.txtAadharNo.value)) {
        this.openSnackBar("Please Enter correct Aadhar Number. ");
        return false;
      }
    }

    if (this.form.controls.txtAreaSqr.value != '' && isNaN(this.form.controls.txtAreaSqr.value)) {
      this.openSnackBar("Please Enter Valid AREA VALUE.");
      return false;
    }

    if (this.form.controls.txtLegalPayDays.value == '' || this.form.controls.txtLegalPayDays.value == undefined) {
      this.openSnackBar("Please Select Pay Term Days.");
      return false;
    }

    if (isNaN(this.form.controls.txtLegalPayDays.value)) {
      this.openSnackBar("Please enter valid DAYS.");
      return false;
    }

    if (this.form.controls.txtPaymentTerm.value == '' || this.form.controls.txtPaymentTerm.value == undefined) {
      this.openSnackBar("Please Select Pay Term Type.");
      return false;
    }

    if (this.form.controls.txtLegalCrLimit.value == '' || this.form.controls.txtLegalCrLimit.value == undefined) {
      this.openSnackBar("Please Enter Credit Limit.");
      return false;
    }

    if (isNaN(this.form.controls.txtLegalCrLimit.value)) {
      this.openSnackBar("Please enter valid Credit Limit.");
      return false;
    }

    if (this.form.controls.txtLegalGroupCrLimit.value == '' || this.form.controls.txtLegalGroupCrLimit.value == undefined) {
      this.openSnackBar("Please Enter Group Credit Limit.");
      return false;
    }

    if (isNaN(this.form.controls.txtLegalGroupCrLimit.value)) {
      this.openSnackBar("Please enter valid Group Credit Limit.");
      return false;
    }
    if(this.form.controls.txtHandledBy.value == null || this.form.controls.txtHandledBy.value  == '' || this.form.controls.txtHandledBy.value == undefined)
    {
      this.openSnackBar("Please select Handled By");
      return false;
    }
    if(this.form.controls.txtInstructedBy.value == null || this.form.controls.txtInstructedBy.value  == '' || this.form.controls.txtInstructedBy.value == undefined)
    {
      this.openSnackBar("Please select Instructed By");
      return false;
    }
    if(this.form.controls.txtFollowedBy.value == null || this.form.controls.txtFollowedBy.value  == '' || this.form.controls.txtFollowedBy.value == undefined)
    {
      this.openSnackBar("Please select Followed By");
      return false;
    }
    if(this.form.controls.txtCondDisc.value==null || this.form.controls.txtCondDisc.value=="" || isNaN(this.form.controls.txtCondDisc.value)){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> CONDITIONAL DISCOUNT PERCENTAGE.");
      return false;
    }
    if(this.form.controls.txtCondDays.value==null || this.form.controls.txtCondDays.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> CONDITIONAL DISCOUNT DAYS.");
      return false;
    }
    if(this.form.controls.cmbFreight.value==null || this.form.controls.cmbFreight.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> FREIGHT TERMS.");
      return false;
    }
    if(this.form.controls.cmbPrintItmCalc.value==null || this.form.controls.cmbPrintItmCalc.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> ITEM CALC PRINT .");
      return false;
    }
    if(this.form.controls.cmbGrnRequired.value==null || this.form.controls.cmbGrnRequired.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> GOODS RECEIVED NOTE .");
      return false;
    }
    if(this.form.controls.rdbhardCopyInv.value==null || this.form.controls.rdbhardCopyInv.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> REQUIRE HARD COPY OF INVOICE .");
      return false;
    }
    return true;
  }

  getAddressData() {

    this.custAddressArray = [];

    for (let index = 0; index <= this.selectedIndex; index++) {

      this.getrows = this.form.get('arrayAddAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      this.custAddressArray.push({
        cdad_addr_code: this.formGroup.controls.txtAddCode.value,
        cdad_type_of_address: 'B',
        cdad_address1: this.formGroup.controls.txtAddrOne.value,
        cdad_address2: this.formGroup.controls.txtAddrSecond.value,
        cdad_address3: this.formGroup.controls.txtAddrThird.value,
        cdad_address4: this.formGroup.controls.txtAddrFourth.value,
        cdad_address: this.formGroup.controls.txtAddrOne.value + ',' +
          this.formGroup.controls.txtAddrSecond.value + ',' +
          this.formGroup.controls.txtAddrThird.value + ',' +
          this.formGroup.controls.txtAddrFourth.value,
        cdad_city: this.formGroup.controls.txtCity.value,
        cdad_district: this.formGroup.controls.txtDistrict.value,
        cdad_pincode: this.formGroup.controls.txtPinCode.value,
        cdad_country_code: this.formGroup.controls.cmbCountry.value,
        cdad_state_code: this.formGroup.controls.cmbState.value.st_code,
        cdad_tel_no1: this.formGroup.controls.txtTelNoOne.value,
        cdad_fax_1: this.formGroup.controls.txtFaxNoOne.value,
        cdad_website: this.formGroup.controls.txtWebsite.value,
        cdad_email_1: this.formGroup.controls.txtEmailIdOne.value.trim(),
        cdad_email_flg: this.formGroup.controls.rdbEmailVerified.value,
        cdad_gst_no: this.formGroup.controls.txtGstNo.value,
        cdad_transporter_code: this.formGroup.controls.cmbTransporter.value == undefined ? '' : this.formGroup.controls.cmbTransporter.value.tr_code,
        cdad_created_by: atob(sessionStorage.getItem(btoa('userId'))),
        cdad_deleted_flg: 'N',
        cdad_latitude: this.formGroup.controls.txtLattitude.value,
        cdad_longitude: this.formGroup.controls.txtLongitude.value,
        cdad_vendor_code: this.formGroup.controls.txtVendorCode.value,
        cdad_domain_name: this.formGroup.controls.txtDomainName.value,
      }
      );
    }

  }

  getsisConData() {
    this.sisConcernArray = [];
    for (let i = 1; i <= 3; i++) {
      if (this.form.controls["chkSisConcern" + i].value) {
        this.sisConcernArray.push(
          {
            scod_code: i,
            scod_sc_name: this.form.controls['txtNmOfSisConcern' + i].value,
            scod_sc_code: this.form.controls['txtCode' + i].value,
          }
        );
      }// end of if
    }
  }

  getProductTurnoverData() {
    this.productTurnoverArray = [];
    this.groupList.forEach(item => {
      if (this.form.controls["chkProd" + item.gp_code].value) {
        this.productTurnoverArray.push({
          ptod_prod_code: item.gp_code,
          ptod_annual_turnover: this.form.controls["txtProd" + item.gp_code].value,
          ptod_deleted_flg: 'N',
          ptod_created_by: atob(sessionStorage.getItem(btoa('userId'))),
        });
      }
    })
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
          condr_created_by: atob(sessionStorage.getItem(btoa('userId'))),
          condr_deleted_flg: 'N',
        }
        );
      }
    }
  }

  getBusinessReferencsData() {

    this.BusinessReferencsArray = [];
    for (let i = 1; i <= 4; i++) {

      if (this.form.controls["chkBRSr" + i].value) {
        this.BusinessReferencsArray.push(
          {
            brsd_ref_code: i,
            brsd_ref_name: this.form.controls["txtBRCompName" + i].value,
            brsd_ref_person: this.form.controls["txtBRContactPerson" + i].value,
            brsd_ref_designation: this.form.controls["txtBRDesignation" + i].value,
            brsd_ref_mobileno: this.form.controls["txtBRMobileNo" + i].value,
            brsd_ref_std_code: this.form.controls["txtBRStdCode" + i].value,
            brsd_ref_telephone_no: this.form.controls["txtBRTelephoneNo" + i].value,
            brsd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
            brsd_deleted_flg: 'N',
            brsd_person_taking_reference: this.form.controls["txtBRReftakenBy" + i].value,
          }
        );
      }// end of if
    }
  }

  getBizIntData() {

    this.bizInt = [];

    if (this.form.get('chkSalesmanVisit').value == true) {
      this.bizInt.push({ "chkSalesmanVisit": this.form.get('chkSalesmanVisit').value })
    }
    if (this.form.get('chkCustomer').value == true) {
      this.bizInt.push({ "chkCustomer": this.form.get('chkCustomer').value })
    }
    if (this.form.get('chkWeb').value == true) {
      this.bizInt.push({ "chkWeb": this.form.get('chkWeb').value })
    }
    if (this.form.get('chkEmail').value == true) {
      this.bizInt.push({ "chkEmail": this.form.get('chkEmail').value })
    }
    if (this.form.get('chkAdvertisement').value == true) {
      this.bizInt.push({ "chkAdvertisement": this.form.get('chkAdvertisement').value })
    }
    if (this.form.get('chkExhibition').value == true) {
      this.bizInt.push({ "chkExhibition": this.form.get('chkExhibition').value })
    }

  }

  getDraftData() {
    this.payload = {
      cd_cust_draft_code: this.stateData.cust_supplr_code,
      cs_cust_supplr_flg: 'C',
      flgDraft: 'N',
      cd_cust_supplr_code: this.stateData.cust_supplr_code,
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
    }
    this.customerMasterService.getDataToNewDraft(this.payload)
      .subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            this.lstPayterm = data.responseData[0].lstpayterm;
            this.form.controls.txtPaymentTerm.setValue(this.lstPayterm[0]);

            this.headerInfo = data.responseData[0].headerinfo;
            this.cd_vendor_code = this.headerInfo.cd_vendor_code;
            this.cd_credit_limit = this.headerInfo.cd_credit_limit;
            this.cd_pay_terms_day = this.headerInfo.cd_pay_terms_day;
            this.cd_allow_special_tax = this.headerInfo.cd_allow_special_tax;
            this.form.get("rdbAllowSpecialTax").setValue(this.cd_allow_special_tax);

            this.groupList = data.responseData[0].grouplist;
            this.groupList.forEach(item => {
              this.form.addControl('chkProd' + item.gp_code, new FormControl(false));
              this.form.addControl('txtProd' + item.gp_code, new FormControl());
            })

            this.custType = data.responseData[0].custtype;
            this.annualTurnover = data.responseData[0].annualturnover;
            this.category = data.responseData[0].category;
            this.bankLists = data.responseData[0].banklist;
            this.transporterList = data.responseData[0].transporterlist;
            this.chargeSubTypeCode = data.responseData[0].chargesubtypecode;
            this.transporterList = data.responseData[0].transporterlist;
            // this.companyList = data.responseData[0].companylist;
            this.fileList = data.responseData[0].filelist;
            this.payList = data.responseData[0].lstpayterm;
            if(data.responseData[0].extended_company == 'N'){
              this.extended_company="Not Extended in Logged in Company"
            }else{
              this.extended_company=""
            }
            // console.log(this.companyList, 'this.companyList ')
            // console.log(this.payList, 'this.payList ')



            if (data.responseData[0].hasOwnProperty("subcategarylist")) {
              this.subcategory = data.responseData[0].subcategarylist;
            }
            if (data.responseData[0].hasOwnProperty("subsubcategarylist")) {
              this.subsubcategory = data.responseData[0].subsubcategarylist;
            }
            // console.log(' this.subcategory = ', this.subcategory);
            // console.log('this.subsubcategory = ', this.subsubcategory);

            //cmbBank
            if (this.headerInfo.cd_bank_name == null || this.headerInfo.cd_bank_name == "" || this.headerInfo.cd_bank_name == undefined) {

            } else {
              let objBank = this.bankLists.find(({ bnk_name }) => bnk_name == this.headerInfo.cd_bank_name);
              this.form.controls["cmbBank"].setValue(objBank);
            }
            //console.log( ' CASE @@2@@ ')
            this.setDraftHeaderValues();

            this.productTurnoverList = data.responseData[0].productturnoverlist;
            this.setProductTurnoverData(this.productTurnoverList);

            this.contactList = data.responseData[0].contactlist;
            this.setContactData(this.contactList)

            this.businessRefList(data.responseData[0].businessreflist);

            this.setSisterConcernData(data.responseData[0].sisterconcernlist);

            this.payTermList = data.responseData[0].paytermlist;
            this.cmpPayTermList[0] = this.payTermList

            this.companyListDataSource = new MatTableDataSource(data.responseData[0].companylist);

            this.lstAddedAdress = data.responseData[0].addrlist

            if (this.lstAddedAdress.length > 0) {
              this.showIconFLg = true
              for (let index = 0; index < this.lstAddedAdress.length; index++) {
                this.addressCode = Number(this.lstAddedAdress[index].csad_addr_code)
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }

              //add new row 
              this.addressCode = (Number(this.addressCode) + 1)
              //this.addNewAddressRow(0)
            } else {

              //add new row
              this.showIconFLg = false
              this.addressCode = 1
              this.addNewAddressRow(0)
            }

            // console.log('this.companyList11 = ', this.companyList);

            // for (let index = 0; index < this.companyList.length; index++) {
              //for (let index1 = 0; index1 < this.payList[index].length; index1++) {
              // this.compArray.push(this.companyList[index].sc_name);
              // this.compcodeArray.push(this.companyList[index].ccs_company_code);
              // console.log( this.payList[index][index1] , ' this.payList[index][index1] ')
              // this.addauthcompanyList(index, this.companyList[index], this.payList[index][0]);
              //}
            // }

            /*console.log('this.payList = ',this.payList);
            console.log('this.compArray=',this.compArray);
            console.log('this.compcodeArray=',this.compcodeArray);
            */
            for (let index = 0; index < this.payList.length; index++) {
              this.cmpPayTermList[index] = this.payList[index]
            }

          }
          else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109'){
            console.log(data.message)
            this.router.navigate(['/session/master/customer-draft-master/'])
            UtilityServiceAvaxPro.showErrMessage(this.snackBar,data.message)
          }
        },
        error => {

        }
      )
  }

  newAddressIndex:number=-1;
  initNewAddressRow(index) {
    this.newAddressIndex=index
    console.log("initNewAddressRow ", this.addressCode)
    this.addNewAddressRow(0)
    this.showIconFLg = false
  }

  setDraftHeaderValues() {
    this.cust_supplr_code = this.headerInfo.cd_cust_draft_code;
    this.form.controls.txtCustomerName.setValue(this.headerInfo.cd_name)
    // this.form.controls.txtPanNo.setValue(this.headerInfo.cd_pan_no);
    this.form.controls.txtPanNo.setValue(this.utilityServiceAvaxPro.doTrim(this.headerInfo.cd_pan_no));
    this.form.controls.txtCinNo.setValue(this.headerInfo.cd_cin_no);
    this.form.controls.txtAadharNo.setValue(this.headerInfo.cd_aadhar_no);

    // if (this.headerInfo.cd_grp_code1 != '-') {
    //   this.form.controls.txtGroupCode.setValue(new PartyModel(this.headerInfo.cd_grp_code1,
    //     this.headerInfo.cd_grp_name));
    // }
    //  console.log(this.headerInfo.cd_grp_code1, ' this.headerInfo.cd_grp_code1 ')
    if (this.headerInfo.cd_grp_code1 != '-') {
      // console.log(this.headerInfo, ' this.headerInfo ')
      // console.log(this.headerInfo.cd_grp_name, ' this.headerInfo.cd_grp_name ')
      //console.log(this.headerInfo.cd_name, ' this.headerInfo.cd_name ')

      if (this.headerInfo.cd_grp_name != '-') {
        //        console.log( ' CASE 11 ')
        this.form.controls.txtGroupCode.setValue(new PartyModel(this.headerInfo.cd_grp_code1,
          this.headerInfo.cd_grp_name));
      } else {
        //      console.log( ' CASE 22 ')
        this.form.controls.txtGroupCode.setValue(new PartyModel(this.headerInfo.cd_grp_code1,
          this.headerInfo.cd_name));
      }
    }
    this.cd_type = this.headerInfo.cd_type;
    this.form.get("rdbCustType").setValue(this.cd_type)

    const toSelectedCategory = this.category.find(c => c.ind_industry_code == this.headerInfo.cd_industry_head_code)
    this.form.get('cmbCategary').setValue(toSelectedCategory);


    if (this.headerInfo.cd_sind_subindustry_code != '' ||
      this.headerInfo.cd_sind_subindustry_code != null ||
      this.headerInfo.cd_sind_subindustry_code != undefined) {
      console.log('this.subcategory = ', this.subcategory);
      let toSelectedCategory1 = this.subcategory.find(c => c.sind_industry_code == this.headerInfo.cd_sind_subindustry_code)
      this.form.get('cmbSubCategary').setValue(toSelectedCategory1);
    }

    if (this.headerInfo.cd_ssind_sub_subindustry_code != '' ||
      this.headerInfo.cd_ssind_sub_subindustry_code != null ||
      this.headerInfo.cd_ssind_sub_subindustry_code != undefined) {
      console.log(' this.subsubcategory = ', this.subsubcategory);
      let toSelectedCategory2 = this.subsubcategory.find(c => c.ssind_industry_code == this.headerInfo.cd_ssind_sub_subindustry_code)
      this.form.get('cmbSubSubCategary').setValue(toSelectedCategory2);
    }


    this.form.controls.txtPartner.setValue(this.headerInfo.cd_partner_name);
    this.form.controls.txtNoOfEmployee.setValue(this.headerInfo.cd_no_of_employees);
    this.form.controls.txtVendorCode.setValue(this.headerInfo.ccs_vendor_code);

    this.cd_proof_of_receipt = this.headerInfo.cd_proof_of_receipt;
    this.cd_allow_special_tax = this.headerInfo.cd_allow_special_tax
    this.cd_biz_premise_dtls = this.headerInfo.cd_biz_premise_dtls;
    if(this.headerInfo.cd_yearly_business!=undefined && this.headerInfo.cd_yearly_business!=''){
      if(isNaN(this.headerInfo.cd_yearly_business)){
        this.cd_yearly_business = this.headerInfo.cd_yearly_business
      }
      else{
        this.cd_yearly_business = parseInt(this.headerInfo.cd_yearly_business)
      }
      this.form.get("rdbAnnualTurnover").setValue(this.cd_yearly_business)  
    }
    
    

    this.form.controls.txtAreaSqr.setValue(this.headerInfo.cd_biz_premise_area);
    this.form.controls.txtOccupiedSince.setValue(this.headerInfo.cd_biz_premise_occupied);

    this.form.controls.txtBankBranch.setValue(this.headerInfo.cd_bank_branch == null ||
      this.headerInfo.cd_bank_branch == 'null' ? '' : this.headerInfo.cd_bank_branch);
    this.form.controls.txtAccountNumber.setValue(this.headerInfo.cd_account_no == null ||
      this.headerInfo.cd_account_no == 'null' ? '' : this.headerInfo.cd_account_no);
    this.form.controls.txtMaintainedSince.setValue(this.headerInfo.cd_bank_account_maintained == null ||
      this.headerInfo.cd_bank_account_maintained == 'null' ? '' : this.headerInfo.cd_bank_account_maintained);
    this.form.controls.txtIfscCode.setValue(this.headerInfo.cd_bank_ifsc_code == null ||
      this.headerInfo.cd_bank_ifsc_code == 'null' ? '' : this.headerInfo.cd_bank_ifsc_code);
    this.form.controls.txtMicrCode.setValue(this.headerInfo.cd_bank_micr_code == null ||
      this.headerInfo.cd_bank_micr_code == 'null' ? '' : this.headerInfo.cd_bank_micr_code);

    this.form.controls.txtCreditRatingIfany.setValue(this.headerInfo.cd_credit_rating);

    this.form.controls.txtLegalPayDays.setValue(this.headerInfo.cd_pay_terms_day);

    const toSelectedPayterm = this.lstPayterm.find(c => c.pt_code == this.headerInfo.cd_pay_code)
    this.form.get('txtPaymentTerm').setValue(toSelectedPayterm);

    this.form.controls.txtLegalCrLimit.setValue(this.headerInfo.cd_credit_limit);
    this.form.controls.txtLegalGroupCrLimit.setValue(this.headerInfo.cd_grp_credit_limit);

    this.form.controls.txtHandledBy.setValue(new HandledByModel(
      this.headerInfo.cd_handled_by, this.headerInfo.cd_handled_by_name, ''));

    this.form.controls.txtFollowedBy.setValue(new HandledByModel(
      this.headerInfo.cd_foll_by, this.headerInfo.cd_foll_by_name, ''));
      
    this.form.controls.txtInstructedBy.setValue(new HandledByModel(
      this.headerInfo.cd_inst_by, this.headerInfo.cd_inst_by_name, ''));

    this.cd_grn_flg = this.headerInfo.cd_grn_flg;
    this.form.controls.cmbGrnRequired.setValue(this.headerInfo.ccs_grn_flg);
    this.form.controls.rdbhardCopyInv.setValue(this.headerInfo.cd_inv_hard_copy);
    this.form.controls.txtLegalRemarks.setValue(this.headerInfo.cd_remarks);
    this.form.controls.cmbPrintItmCalc.setValue(this.headerInfo.ccs_print_item_calc);
    this.form.controls.cmbFreight.setValue(this.headerInfo.ccs_freight_code);
    this.form.controls.rdbTC.setValue(this.headerInfo.ccs_type_tc);
    this.transporterList.map(item=>{
      if(item.tr_code == this.headerInfo.ccs_transporter_code)
      {
        this.form.controls.cmbTransporter.setValue(item);
      }
    })
    this.form.controls.txtCondDays.setValue(this.headerInfo.ccs_conditional_disc_days);
    this.form.controls.txtCondDisc.setValue(this.headerInfo.ccs_conditional_disc);
    this.form.controls.dtDate.setValue(this.headerInfo.cd_ts_origin);
  }

  setSisterConcernData(data: any) {
    for (let i = 0; i < data.length; i++) {
      let k = 1;
      this.form.controls["chkSisConcern" + k].setValue(true);
      this.form.controls["txtNmOfSisConcern" + k].setValue(data[i].scod_sc_name);
      this.form.controls["txtNmOfSisConcern" + k].enable();
      this.form.controls["txtCode" + k].setValue(data[i].scod_sc_code);
      this.form.controls["txtCode" + k].enable();
      k = k + 1;
    }
  }

  txtProdArray: any = []
  setProductTurnoverData(data: any) {
    for (let i = 0; i < data.length; i++) {
      let objCountry = this.groupList.find(({ gp_code }) => gp_code == data[i].ptod_prod_code);
      this.form.controls["chkProd" + data[i].ptod_prod_code].setValue(true);
      this.form.controls["txtProd" + data[i].ptod_prod_code].enable();
      this.txtProdArray[data[i].ptod_prod_code] = data[i].ptod_annual_turnover
      this.form.controls["txtProd" + data[i].ptod_prod_code].setValue(data[i].ptod_annual_turnover);
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

  businessRefList(data: any) {
    for (let i = 0; i < data.length; i++) {
      let j = data[i].brsd_ref_code;
      this.form.controls["chkBRSr" + j].setValue(true);
      this.form.controls["txtBRCompName" + j].setValue(data[i].brsd_ref_name);
      this.form.controls["txtBRCompName" + j].enable();
      this.form.controls["txtBRContactPerson" + j].setValue(data[i].brsd_ref_person);
      this.form.controls["txtBRContactPerson" + j].enable();
      this.form.controls["txtBRDesignation" + j].setValue(data[i].brsd_ref_designation);
      this.form.controls["txtBRDesignation" + j].enable();
      this.form.controls["txtBRMobileNo" + j].setValue(data[i].brsd_ref_mobileno);
      this.form.controls["txtBRMobileNo" + j].enable();
      this.form.controls["txtBRStdCode" + j].setValue(data[i].brsd_ref_std_code);
      this.form.controls["txtBRStdCode" + j].enable()
      this.form.controls["txtBRTelephoneNo" + j].setValue(data[i].brsd_ref_telephone_no);
      this.form.controls["txtBRTelephoneNo" + j].enable();
      this.form.controls["txtBRReftakenBy" + j].setValue(data[i].brsd_person_taking_reference);
      this.form.controls["txtBRReftakenBy" + j].enable();
    }
  }

  get edititems(): FormArray { return this.form.get('arrayEditAdress') as FormArray; }

  initAddedAddressRow(index, current_row) {
    this.selectedEditIndex = index
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
        txtECity: [''],
        txtEDistrict: [''],
        cmbEState: [''],
        cmbECountry: [''],
        txtEPinCode: [''],
        txtELattitude: [''],
        txtELongitude: [''],
        txtEFaxNoOne: [''],
        txtETelNoOne: [''],
        txtEStdNo:[''],
        txtEWebsite: [''],
        txtEEmailIdOne: [''],
        rdbEEmailVerified: ['N'],
        txtEGstNo: [''],
        cmbETransporter: [''],
      })
    )
    this.getECountryList(index);

    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.formGroup.controls.txtEAddCode.setValue(this.addressCode);

    this.filterETransporterLists = this.formGroup.controls.cmbETransporter.valueChanges.pipe(
      startWith(''),
      map(value => {
        if(value!=undefined){
          console.log(value)
          value =
            typeof value == 'string' || value instanceof String
              ? value
              : value.tr_name
          return this.filterDisplayTransporter(value)  
        }
      })
    )

    // console.log(" current_row ", current_row)

    if (current_row != '') {

      // this.formGroup.controls.txtEVendorCode.setValue(current_row.csad_vendor_code)
      // this.formGroup.controls.txtEDomainName.setValue(current_row.csad_domain_name)
      // this.formGroup.controls.txtEVendorCode.setValue(current_row.csad_vendor_code.trim())
      // this.formGroup.controls.txtEDomainName.setValue(current_row.csad_domain_name.trim())

      this.formGroup.controls.txtEVendorCode.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_vendor_code));
      this.formGroup.controls.txtEDomainName.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_domain_name));

      //this.formGroup.controls.txtEAddrOne.setValue(current_row.csad_address1)
      //this.formGroup.controls.txtEAddrSecond.setValue(current_row.csad_address2)
      //this.formGroup.controls.txtEAddrOne.setValue(current_row.csad_address1.trim())
      //this.formGroup.controls.txtEAddrSecond.setValue(current_row.csad_address2.trim())

      this.formGroup.controls.txtEAddrOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address1));
      this.formGroup.controls.txtEAddrSecond.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address2));

      //this.formGroup.controls.txtEAddrThird.setValue(current_row.csad_address3)
      //this.formGroup.controls.txtEAddrFourth.setValue(current_row.csad_address4)
      //this.formGroup.controls.txtEAddrThird.setValue(current_row.csad_address3.trim())
      //this.formGroup.controls.txtEAddrFourth.setValue(current_row.csad_address4.trim())

      this.formGroup.controls.txtEAddrThird.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address3));
      this.formGroup.controls.txtEAddrFourth.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address4));

      //this.formGroup.controls.txtECity.setValue(current_row.csad_city)
      //this.formGroup.controls.txtEDistrict.setValue(current_row.csad_district)
      //this.formGroup.controls.txtECity.setValue(current_row.csad_city.trim())
      //this.formGroup.controls.txtEDistrict.setValue(current_row.csad_district.trim())

      this.formGroup.controls.txtECity.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_city));
      this.formGroup.controls.txtEDistrict.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_district));

      this.countryArray[index] = current_row.csad_country_code
      this.formGroup.controls.cmbECountry.setValue(current_row.csad_country_code)

      this.getESetStateDropdown(index, current_row.csad_state_code)

      //this.formGroup.controls.txtEPinCode.setValue(current_row.csad_pincode)
      //this.formGroup.controls.txtEPinCode.setValue(current_row.csad_pincode.trim())
      this.formGroup.controls.txtEPinCode.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_pincode));

      this.formGroup.controls.txtELattitude.setValue(current_row.csad_latitude)
      this.formGroup.controls.txtELongitude.setValue(current_row.csad_longitude)

      //this.formGroup.controls.txtEFaxNoOne.setValue(current_row.csad_fax_1)
      //this.formGroup.controls.txtETelNoOne.setValue(current_row.csad_tel_no1)
      //this.formGroup.controls.txtEWebsite.setValue(current_row.csad_website)
      //this.formGroup.controls.txtEFaxNoOne.setValue(current_row.csad_fax_1.trim())
      //this.formGroup.controls.txtETelNoOne.setValue(current_row.csad_tel_no1.trim())
      //this.formGroup.controls.txtEWebsite.setValue(current_row.csad_website.trim())

      this.formGroup.controls.txtEFaxNoOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_fax_1));
      this.formGroup.controls.txtETelNoOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_tel_no1));
      this.formGroup.controls.txtEStdNo.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_std_code));
      this.formGroup.controls.txtEWebsite.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_website));

      console.log('current_row.csad_email_1 =', current_row.csad_email_1 + '=');
      if (current_row.csad_email_1 === null || current_row.csad_email_1 === undefined || current_row.csad_email_1 === ''
        || current_row.csad_email_1 === '-'
        //||  current_row.csad_email_1.trim() == ''
      ) {
        this.formGroup.controls.txtEEmailIdOne.setValue('')
      } else {
        this.formGroup.controls.txtEEmailIdOne.setValue(current_row.csad_email_1)
      }

      if (current_row.csad_email_flg != '') {
        this.cdad_email_flg[index] = current_row.csad_email_flg
        if(this.cdad_email_flg[index] == 'N')
        {
          this.editEmail[index]= false
        }
        else{
          this.editEmail[index]= true
        }
      } else {
        this.cdad_email_flg[index] = 'N'
        this.editEmail[index]=false;
      }
      this.formGroup.controls.rdbEEmailVerified.setValue(this.cdad_email_flg[index])

      //this.formGroup.controls.txtEGstNo.setValue(current_row.csad_gst_no)
      console.log('current_row.csad_gst_no =', current_row.csad_gst_no, 'current_row.csad_gst_no');
      //alert('a');
      if (current_row.csad_gst_no === null || current_row.csad_gst_no === '' ||
        current_row.csad_gst_no.trim() === '' || current_row.csad_gst_no === '-'
      ) {
        this.formGroup.controls.txtEGstNo.setValue('');
      } else {
        this.formGroup.controls.txtEGstNo.setValue(current_row.csad_gst_no)
      }


      if (current_row.csad_transporter_code == null || current_row.csad_transporter_code == "" || current_row.csad_transporter_code == undefined) {

      } else {
        const toSelectedTransp = this.transporterList.find(c => c.tr_code == current_row.csad_transporter_code)
        this.formGroup.controls.cmbETransporter.setValue(toSelectedTransp)
      }
    }
  }

  getECountryList(index) {
    this.utilityServiceAvaxPro.getCountryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countryELists[index] = data.responseData[0].map(item => {
            return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
          })
        }
        return this.countryELists[index]
      }
    )
  }

  onECountryChange(event, index) {

    this.getrows = this.form.get('arrayEditAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;
    this.formGroup.controls.cmbEState.setValue('')

    this.st_ctr_code = this.formGroup.controls.cmbECountry.value
    this.getEStateDropdown(this.st_ctr_code, index);

  }

  getEStateDropdown(st_ctr_code, index) {
    this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.stateELists[index] = null;
        new StateMasterListModel('', '')
        return false;
      } else {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateELists[index] = data.responseData[0].map(item => {
            return new StateMasterListModel(item.st_code, item.st_state)
          })
        }
        return this.stateELists[index]
      }
    })
  }

  getESetStateDropdown(index, usrStateCode) {

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
          this.stateELists[index] = data.responseData[0].map(item => {

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

  downloadFile() {
    const formData = new FormData();

    console.log("this.stateData in download===========", this.stateData)
    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUserid', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    // formData.append('docNo', this.cust_supplr_code);
    formData.append('docNo', this.stateData.cust_supplr_code);
    formData.append('docType', "PARTY_DOC");
    formData.append('docName', this.form.controls.cmbFileList.value.fl_doc_name);
    formData.append('docFileName', this.form.controls.cmbFileList.value.fl_file_name);

    this.fileUploadService.downloadFile(formData).toPromise().then((res) => this.uploadResponse = res,
    ).finally().then(() => {
      const blob = new Blob([this.uploadResponse], { type: 'application/octet-stream' });
      fileSaver.saveAs(blob, this.form.controls.cmbFileList.value.fl_file_name);
    }
    )
  }

  setDesc() {
    var pan_no = this.form.controls.txtPanNo.value;
    var aadhar_no = this.form.controls.txtAadharNo.value;

    if (this.form.controls.radFileType.value == 'A') {
      if (aadhar_no.trim() == "") {
        this.form.controls.txtFileUploadDesc.setValue("AADHAR");
      }
      else {
        this.form.controls.txtFileUploadDesc.setValue("AADHAR" + " - " + aadhar_no);
      }
    }
    else if (this.form.controls.radFileType.value == 'P') {
      this.form.controls.txtFileUploadDesc.setValue("PAN" + " - " + aadhar_no);
    } else {
      this.form.controls.txtFileUploadDesc.setValue("");
    }
  }

  onFileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  uploadFile() {
    if(!this.utilityServiceAvaxPro.checkValidationForFileUpload(this.fileData)){
      this.openSnackBar("File Name should'nt have spaces");
      return false;
    }
    const formData = new FormData();
    formData.append('docFile', this.fileData);
    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docNo', this.cust_supplr_code);
    formData.append('docType', 'PARTY_DOC');//this.form.get("radFileType").value);
    formData.append('visitReport',this.form.get("radFileType").value);
    formData.append('docFileDesc', this.form.get("txtFileUploadDesc").value);
    formData.append('docFileName', this.fileData.name);

    this.fileUploadService.uploadFile(formData).subscribe((res) => {
      this.uploadResponse = res
      this.openSnackBar(res.message);
      (err) => {
        this.openSnackBar("Error In File Upload. ! ");
        this.error = err
      }
    }
    );
  }

  checkEditAddressValidation(selectedEditIndex): any {

    for (let index = 0; index <= selectedEditIndex; index++) {

      this.getrows = this.form.get('arrayEditAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      let ectr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryELists[index].length; i++) {
        if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
          ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
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
      
      if(this.formGroup.controls.txtECity.value == '' || this.formGroup.controls.txtECity.value == null){
        this.openSnackBar("Please select City")
        return false;
      }

      console.log('ectr_home_country_flg=', ectr_home_country_flg);

      if (ectr_home_country_flg == 'Y') {

        if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
          this.openSnackBar('Please Select State at address no' + (index + 1));
          return false;
        }

        if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
          this.openSnackBar('Please enter pincode  at address no' + (index + 1));
          return false;
        } else {
          // if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
          //   this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
          //   return false;
          // }
          if (this.formGroup.controls.txtEPinCode.value.length != 6) {
            this.openSnackBar("Please Enter Valid Pincode OF 6 Digit " + (index + 1));
            return false;
          } else if (!this.formGroup.controls.txtEPinCode.value.match(/^([0-9])+$/)) {
            this.openSnackBar("Please Enter valid pincode at address no" + (index + 1));
            return false;
          }
        }

        // if (this.formGroup.controls.txtEPinCode.value != "") {
        //   if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
        //     this.openSnackBar("Please Enter valid  pin No at address no" + (index + 1));
        //     return false;
        //   }
        // }
      }


      //location
      if (this.formGroup.controls.txtELongitude.value == null || this.formGroup.controls.txtELongitude.value.trim() == '') {
        this.openSnackBar('Please select Lattitide at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.txtELattitude.value == null || this.formGroup.controls.txtELattitude.value.trim() == '') {
        this.openSnackBar('Please select longitude at address no' + (index + 1));
        return false;
      }

      if (this.formGroup.controls.txtETelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtETelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone/mobile no at address no" + (index + 1));
          return false;
        }
      }
      if (this.formGroup.controls.txtEStdNo.value != "") {
        if (isNaN(this.formGroup.controls.txtEStdNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for std/isd no at address no" + (index + 1));
          return false;
        }
      }
      


      if (index == 0) {
        console.log('email id 1 = ', this.formGroup.controls.txtEEmailIdOne.value);
        if (this.formGroup.controls.txtEEmailIdOne.value === "" ||
          this.formGroup.controls.txtEEmailIdOne.value === null ||
          this.formGroup.controls.txtEEmailIdOne.value === undefined) {
          this.openSnackBar('Please Enter Email Id at address no 1');
          return false;
        }
      }

      if (this.formGroup.controls.txtEEmailIdOne.value.trim() != "") {
        if (!this.chkEmailRegx.test(this.formGroup.controls.txtEEmailIdOne.value)) {
          this.openSnackBar("Please Enter a valid email address at address no" + (index + 1));
          return false;
        }
      }

      //same country
      if (index != 0) {

        let firstCountry = this.formGroup.controls.cmbECountry.value;
        console.log(" firstCountry ", firstCountry)

        this.getrows = this.form.get('arrayEditAdress') as FormArray;
        this.aryTableControl = this.getrows.controls;
        this.formGroup = this.aryTableControl[index - 1] as FormGroup;

        if (firstCountry != this.formGroup.controls.cmbECountry.value) {
          this.openSnackBar('Please Select Same country  at address no' + (index + 1));
          return false;
        }
      }

      //same state
      if (index != 0) {
        let firstState = this.formGroup.controls.cmbEState.value;
        console.log(" firstState ", firstState)

        this.getrows = this.form.get('arrayEditAdress') as FormArray;
        this.aryTableControl = this.getrows.controls;
        this.formGroup = this.aryTableControl[index - 1] as FormGroup;

        if (firstState != this.formGroup.controls.cmbEState.value) {
          this.openSnackBar('Please Select Same State  at address no' + (index + 1));
          return false;
        }
      }


      // If the country is out of India, there is no need to validate gst no or pan no
      if (ectr_home_country_flg == 'Y') {
        console.log('EGstNo = ', this.formGroup.controls.txtEGstNo.value);
        //alert('inside gst validation ');
        if (this.formGroup.controls.txtEGstNo.value == "" || this.formGroup.controls.txtEGstNo.value == null
          || this.formGroup.controls.txtEGstNo.value == undefined || this.formGroup.controls.txtEGstNo.value == 'URP') {

        } else {

          //if gst is not default gst           
          if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

            if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
              this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
              return false;
            }
            if (this.form.controls.txtPanNo.value.length != 10) {
              this.openSnackBar('Please Enter 10 digits  pan Number.');
              return false;
            }
            let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (!panRegex.test(this.form.controls.txtPanNo.value)) {
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

  getEditAddressData() {

    this.custEditAddressArray = [];

    for (let index = 0; index <= this.selectedEditIndex; index++) {

      this.getrows = this.form.get('arrayEditAdress') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      this.custEditAddressArray.push({
        cdad_addr_code: this.formGroup.controls.txtEAddCode.value,
        cdad_type_of_address: 'B',
        cdad_address1: this.formGroup.controls.txtEAddrOne.value,
        cdad_address2: this.formGroup.controls.txtEAddrSecond.value,
        cdad_address3: this.formGroup.controls.txtEAddrThird.value,
        cdad_address4: this.formGroup.controls.txtEAddrFourth.value,
        cdad_address: this.formGroup.controls.txtEAddrOne.value + ',' +
          this.formGroup.controls.txtEAddrSecond.value + ',' +
          this.formGroup.controls.txtEAddrThird.value + ',' +
          this.formGroup.controls.txtEAddrFourth.value,
        cdad_city: this.formGroup.controls.txtECity.value,
        cdad_district: this.formGroup.controls.txtEDistrict.value,
        cdad_pincode: this.formGroup.controls.txtEPinCode.value,
        cdad_country_code: this.formGroup.controls.cmbECountry.value,
        cdad_state_code: this.formGroup.controls.cmbEState.value,//.st_code,
        cdad_tel_no1: this.formGroup.controls.txtETelNoOne.value,
        cdad_std1: this.formGroup.controls.txtEStdNo.value,
        cdad_fax_1: this.formGroup.controls.txtEFaxNoOne.value,
        cdad_website: this.formGroup.controls.txtEWebsite.value,
        cdad_email_1: this.formGroup.controls.txtEEmailIdOne.value,
        cdad_email_flg: this.formGroup.controls.rdbEEmailVerified.value,
        cdad_gst_no: this.formGroup.controls.txtEGstNo.value.length > 3 ?this.formGroup.controls.txtEGstNo.value:'URP',
        cdad_transporter_code: this.formGroup.controls.cmbETransporter.value == undefined ? '' : this.formGroup.controls.cmbETransporter.value.tr_code,
        cdad_created_by: atob(sessionStorage.getItem(btoa('userId'))),
        cdad_deleted_flg: 'N',
        cdad_latitude: this.formGroup.controls.txtELattitude.value,
        cdad_longitude: this.formGroup.controls.txtELongitude.value,
        cdad_vendor_code: this.formGroup.controls.txtEVendorCode.value,
        cdad_domain_name: this.formGroup.controls.txtEDomainName.value,
      }
      );
    }

  }

  get authcompanyList(): FormArray { return this.form.get('arrayAuthCompany') as FormArray; }

  // addauthcompanyList(index, current_row, payterm_row) {
    //console.log(' current_row1111 = ', current_row);

    // let control = <FormArray>this.form.controls.arrayAuthCompany;
    // control.push(
      // this.formBuilder.group({
        // chkCompName: [false],
      //   txtCrLimit: ['0'],
      //   txtPayTermDays: ['0'],
      //   cmbPaymentType: [''],
      //   cmbHb: [''],
      //   cmbFl: [''],
      //   cmbInst: [''],
      //   cmbGoodRcNote: [''],
      //   cmbPrintItmCalc: [''],
      //   txtVendorCode: [''],
      //   txtCcsRemarks: [''],
      // })
    // )

    // this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    // this.aryTableControl = this.getrows.controls;
    // this.formGroup = this.aryTableControl[index] as FormGroup;

    // this.formGroup.controls.chkCompName.setValue(false)
    // this.formGroup.controls.txtCrLimit.disable()
    // this.formGroup.controls.txtPayTermDays.disable()
    // this.formGroup.controls.cmbPaymentType.disable()
    // this.formGroup.controls.cmbHb.disable()
    // this.formGroup.controls.cmbFl.disable()
    // this.formGroup.controls.cmbInst.disable()
    // this.formGroup.controls.cmbGoodRcNote.disable()
    // this.formGroup.controls.cmbPrintItmCalc.disable()
    // this.formGroup.controls.txtVendorCode.disable()
    // this.formGroup.controls.txtCcsRemarks.disable()


    // if (current_row != "") {
    //   this.ccs_credit_limit[index] = current_row.ccs_credit_limit
    //   this.formGroup.controls.txtCrLimit.setValue(current_row.ccs_credit_limit)
    //   this.ccs_pay_terms_day[index] = current_row.ccs_pay_terms_day
    //   this.formGroup.controls.txtPayTermDays.setValue(current_row.ccs_pay_terms_day)
    //   this.formGroup.controls.cmbPaymentType.setValue(payterm_row);
      

  //     this.formGroup.controls.cmbHb.setValue(new HandledByModel(current_row.ccs_handled_by, current_row.ccs_handled_by_name, ''));

  //     this.formGroup.controls.cmbFl.setValue(new HandledByModel(current_row.ccs_foll_by, current_row.ccs_foll_by_name, ''));

  //     this.formGroup.controls.cmbInst.setValue(new HandledByModel(current_row.ccs_inst_by, current_row.ccs_inst_by_name, ''));


  //     this.ccs_grn_flg[index] = current_row.ccs_grn_flg
  //     this.ccs_print_item_calc[index] = current_row.ccs_print_item_calc

  //     this.vr_code[index] = current_row.vr_code
  //     this.txtCcsRemarks[index] = current_row.mt_remarks

  //     console.log( current_row.mt_remarks , ' current_row.mt_remarks.....')

  //     this.formGroup.controls.txtVendorCode.setValue(current_row.vr_code)
  //     this.formGroup.controls.txtCcsRemarks.setValue(current_row.mt_remarks)

  //   }
  // }

  enableRow(index, event, cmp_code) {

    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    console.log(cmp_code, ' cmp_code ')

    if (event.checked) {

      this.formGroup.controls.txtCrLimit.enable()
      this.formGroup.controls.txtPayTermDays.enable()
      this.formGroup.controls.cmbPaymentType.enable()
      this.formGroup.controls.cmbHb.enable()
      this.formGroup.controls.cmbFl.enable()
      this.formGroup.controls.cmbInst.enable()
      this.formGroup.controls.cmbGoodRcNote.enable()
      this.formGroup.controls.cmbPrintItmCalc.enable()
      this.formGroup.controls.txtVendorCode.enable()
      this.formGroup.controls.txtCcsRemarks.enable()


      this.getCompanywiseHandledByList(cmp_code, index)

    } else {


      this.formGroup.controls.txtCrLimit.disable()
      this.formGroup.controls.txtPayTermDays.disable()
      this.formGroup.controls.cmbPaymentType.disable()
      this.formGroup.controls.cmbHb.disable()
      this.formGroup.controls.cmbFl.disable()
      this.formGroup.controls.cmbInst.disable()
      this.formGroup.controls.cmbGoodRcNote.disable()
      this.formGroup.controls.cmbPrintItmCalc.disable()
      this.formGroup.controls.txtVendorCode.disable()
      this.formGroup.controls.txtCcsRemarks.disable()

    }

  }

  filterParty(index) {
    console.log(index, ' index ')
    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let val = this.formGroup.controls.cmbHb.value
    this.filteredhandlebyLists[index] = this.lsthandlebyLists[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })

  }

  filterInsParty(index) {
    console.log(index, ' index ')
    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let val = this.formGroup.controls.cmbInst.value
    this.filterinstrcutedbyLists[index] = this.lsthandlebyLists[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })
  }

  filterFolloParty(index) {
    console.log(index, ' index ')
    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let val = this.formGroup.controls.cmbFl.value
    this.filterefollowedbyLists[index] = this.lsthandlebyLists[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })
  }

  getCompanyData(): any {
    // this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    // this.aryTableControl = this.getrows.controls;

    // let index: any = 0;
    this.selectedCompListArray = [];

    // this.companyList.forEach(item => {
      // this.formGroup = this.aryTableControl[index] as FormGroup;
      // if (this.formGroup.controls.chkCompName.value) {
        if ((this.form.controls.txtHandledBy.value == null || this.form.controls.txtHandledBy.value == '') || this.form.controls.txtHandledBy.value.usr_userid == undefined) {
          this.status = 1;
          this.openSnackBar('Please Select Handled By');
          return false;
        } else if ((this.form.controls.txtInstructedBy.value == null || this.form.controls.txtInstructedBy.value == '') || this.form.controls.txtInstructedBy.value.usr_userid == undefined) {
          this.status = 1;
          this.openSnackBar('Please Select Instructed By');
          return false;
        } else if ((this.form.controls.txtFollowedBy.value == null || this.form.controls.txtFollowedBy.value == '') || this.form.controls.txtFollowedBy.value.usr_userid == undefined) {
          this.status = 1;
          this.openSnackBar('Please Select Followed By');
          return false;
        } else if ((this.form.controls.txtLegalCrLimit.value == null || this.form.controls.txtLegalCrLimit.value == '')) {
          this.status = 1;
          this.openSnackBar('Please Enter Credit Limit');
          return false;
        } else if (!this.form.controls.txtLegalCrLimit.value.toString().match(/^([0-9])+$/)) {
          this.status = 1;
          this.openSnackBar('Please Enter Valid Credit Limit ');
          return false;
        } else if ((this.form.controls.txtLegalPayDays.value == null || this.form.controls.txtLegalPayDays.value == '')) {
          this.status = 1;
          this.openSnackBar('Please Pay Days');
          return false;
        } else if (!this.form.controls.txtLegalPayDays.value.toString().match(/^([0-9])+$/)) {
          this.status = 1;
          this.openSnackBar('Please Enter Valid Pay Days ');
          return false;
        } else if ((this.form.controls.txtPaymentTerm.value == null || this.form.controls.txtPaymentTerm.value == '') || this.form.controls.txtPaymentTerm.value.pt_code == undefined) {
          this.status = 1;
          this.openSnackBar('Please Select Pay Terms Type');
          return false;
        } else {
          this.status = 0;
          this.selectedCompListArray.push({
            ccs_company_code:  atob(sessionStorage.getItem(btoa('usr_company_code'))),
            ccs_credit_limit: this.form.controls.txtLegalCrLimit.value,
            ccs_pay_terms_day: this.form.controls.txtLegalPayDays.value,
            ccs_pay_code: this.form.controls.txtPaymentTerm.value.pt_code,
            ccs_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
            ccs_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
            ccs_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
            ccs_grn_flg: this.form.controls.cmbGrnRequired.value,
            ccs_print_item_calc: this.form.controls.cmbPrintItmCalc.value,
            ccs_vendor_code: this.form.controls.txtVendorCode.value,
            mt_remarks: this.form.controls.txtLegalRemarks.value,
  
            ccs_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '' :this.form.controls.cmbTransporter.value.tr_code,
            ccs_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
            ccs_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
            ccs_freight_code: this.form.controls.cmbFreight.value,
            ccs_type_tc : this.form.controls.rdbTC.value,
            ccs_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
          })
        }
      // }else {
      //   this.status = 0;
      //   this.selectedCompListArray.push({
      //     ccs_company_code: item.ccs_company_code,
      //     ccs_credit_limit: this.formGroup.controls.txtCrLimit.value,
      //     ccs_pay_terms_day: this.formGroup.controls.txtPayTermDays.value,
      //     ccs_pay_code: this.formGroup.controls.cmbPaymentType.value.pt_code,
      //     ccs_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
      //     ccs_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
      //     ccs_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
      //     ccs_grn_flg: this.form.controls.cmbGrnRequired.value,
      //     ccs_print_item_calc: this.form.controls.cmbPrintItmCalc.value,
      //     ccs_vendor_code: this.form.controls.txtVendorCode.value,
      //     mt_remarks: this.formGroup.controls.txtCcsRemarks.value,

      //     ccs_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '' :this.form.controls.cmbTransporter.value.tr_code,
      //     ccs_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
      //     ccs_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
      //     ccs_freight_code: this.form.controls.cmbFreight.value,
      //     ccs_type_tc : this.form.controls.rdbTC.value,
      //     ccs_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
      //   })
      // }
      // index = index + 1;
    // });
    console.log(this.selectedCompListArray.length, ' this.selectedCompListArray.')
    // console.log(this.companyList.length, ' this.companyList.')
    return this.status;
  }

  getAuthorizePaymentTerm(index) {
    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    // console.log(this.formGroup , ' this.formGroup 121 ' )
    // console.log(this.formGroup.controls.cmbPaymentType.value + index, ' this.formGroup 121 ')
    // console.log(index, ' index ')

    this.pay_day = this.formGroup.controls.txtPayTermDays.value;
    // console.log(this.pay_day, ' pay_day.. ')

    if (this.pay_day == '') {
      this.pay_day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        // console.log(data.responseData[0], ' data.responseData[0] ')
        this.cmpPayTermList[index] = data.responseData[0]
        this.pay_data = this.cmpPayTermList[index][0];
        // console.log(this.pay_data, ' pay_data ')
        // console.log(this.cmpPayTermList[index][0], ' cmpPayTermList @@@@ ')
        // console.log(data.responseData[0][0], ' data.responseData[0][0] ')
        this.formGroup.controls.cmbPaymentType.setValue(this.cmpPayTermList[index][0]);
      }
    })
    // return this.pay_data;
  }

  getAuthorizePaymentTerm1(index, day): any[] {
    this.getrows = this.form.get('arrayAuthCompany') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    // console.log(index, 'index ')
    //   console.log(day, 'day..... ')

    if (day == '') {
      day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(day).toPromise().then
      (
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            // console.log(data)

            this.cmpPayTermList[index] = data.responseData[0]
            this.pay_data[index] = this.cmpPayTermList[index][0];
            this.formGroup.controls.cmbPaymentType.setValue(this.cmpPayTermList[index][0]);

          }
        }).finally().then(
          () => {
            this.formGroup.controls.cmbPaymentType.setValue(this.cmpPayTermList[index][0]);
          }
        )
    return this.pay_data[index];
  }

  ModifyCustomer() {
    if (this.validateForm()) {

      if (this.checkEditAddressValidation(this.selectedEditIndex)) {
          if (this.validateEditGSTPAN(this.selectedEditIndex)) {
            
          }
      }//checkEditAddressValidation
    }//validateForm
  }

  getEditPaylod() {
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
      },
      // cs_cust_supplr_flg: 'C',
      cs_cust_supplr_flg: this.form.controls.rdbAccFlg.value,
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      cd_deleted_flg: 'N',
      cd_cust_draft_code: this.cust_supplr_code,
      cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      cd_cust_supplr_code: this.cust_supplr_code,

      custAddrDto: this.custEditAddressArray,
      sisterConcernDto: this.sisConcernArray,
      productTurnoverDto: this.productTurnoverArray,
      contactDto: this.contactArray,
      businessReferencesDto: this.BusinessReferencsArray,

      cd_name: this.form.get("txtCustomerName").value,
      cd_pan_no: this.form.controls.txtPanNo.value,
      cd_cin_no: this.form.controls.txtCinNo.value,
      cd_aadhar_no: this.form.controls.txtAadharNo.value,
      cd_grp_code: this.form.controls.txtGroupCode.value != undefined ? this.form.controls.txtGroupCode.value.cs_code : '',
      cd_industry_head_code: this.form.controls.cmbCategary.value.ind_industry_code != undefined ? this.form.controls.cmbCategary.value.ind_industry_code : '',
      cd_sind_subindustry_code: this.form.controls.cmbSubCategary.value == undefined ||
        this.form.controls.cmbSubCategary.value == null ||
        this.form.controls.cmbSubCategary.value == '' ? '' : this.form.controls.cmbSubCategary.value.sind_industry_code,
      cd_ssind_sub_subindustry_code: this.form.controls.cmbSubSubCategary.value == undefined ||
        this.form.controls.cmbSubSubCategary.value == null ||
        this.form.controls.cmbSubSubCategary.value == '' ? '' : this.form.controls.cmbSubSubCategary.value.ssind_industry_code,
      cd_partner_name: this.form.controls.txtPartner.value,
      cd_no_of_employees: this.form.controls.txtNoOfEmployee.value,
      cd_vendor_code: this.form.controls.txtVendorCode.value,
      cd_proof_of_receipt: this.form.controls.rdbProofOfReceipt.value,
      cd_allow_special_tax: this.form.controls.rdbAllowSpecialTax.value,
      cd_type: this.form.controls.rdbCustType.value,
      cd_yearly_business: this.form.controls.rdbAnnualTurnover.value,

      cd_biz_premise_dtls: this.form.controls.rdbBusinessPremisDtl.value,
      cd_biz_premise_area: this.form.controls.txtAreaSqr.value,
      cd_biz_premise_occupied: this.form.controls.txtOccupiedSince.value,
      ccs_freight_code: this.form.controls.cmbFreight.value,
      cd_bank_code: this.form.controls.cmbBank.value != undefined ? this.form.controls.cmbBank.value.bnk_code : '',
      cd_bank_name: this.form.controls.cmbBank.value != undefined ? this.form.controls.cmbBank.value.bnk_name : '',
      cd_bank_branch: this.form.controls.txtBankBranch.value,
      cd_account_no: this.form.controls.txtAccountNumber.value,
      cd_bank_account_maintained: this.form.controls.txtMaintainedSince.value,
      cd_bank_ifsc_code: this.form.controls.txtIfscCode.value,
      cd_bank_micr_code: this.form.controls.txtMicrCode.value,
      cd_credit_rating: this.form.controls.txtCreditRatingIfany.value,
      bizInt: this.bizInt,
      cd_pay_terms_day: this.form.controls.txtLegalPayDays.value,
      cd_pay_code: this.form.controls.txtPaymentTerm.value.pt_code != undefined ? this.form.controls.txtPaymentTerm.value.pt_code : '',
      cd_credit_limit: this.form.controls.txtLegalCrLimit.value != undefined ? this.form.controls.txtLegalCrLimit.value : '0',
      cd_grp_credit_limit: this.form.controls.txtLegalGroupCrLimit.value != undefined ? this.form.controls.txtLegalGroupCrLimit.value : '0',
      cd_remarks: this.form.controls.txtLegalRemarks.value,
      cd_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
      cd_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
      cd_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
      cd_grn_flg: this.form.controls.cmbGrnRequired.value,
      cd_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
      cd_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
      cd_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
      cd_freight_code: this.form.controls.cmbFreight.value,
      cd_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '':this.form.controls.cmbTransporter.value.tr_code,
      cd_item_calc_flg: this.form.controls.cmbPrintItmCalc.value,
      cd_type_tc: this.form.controls.rdbTC.value,
      cd_ts_origin:this.form.controls.dtDate.value == undefined ||
        this.form.controls.dtDate.value == null ||
        this.form.controls.dtDate.value == '' ? null : this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.dtDate.value),
    }
  }

  resetAddressEntryRow(index) {
    if (index != -1) {
      this.formGroup.controls.txtAddrOne.setValue('')
      this.formGroup.controls.txtAddrSecond.setValue('')
      this.formGroup.controls.txtAddrThird.setValue('')
      this.formGroup.controls.txtAddrFourth.setValue('')
      this.formGroup.controls.txtCity.setValue('')
      this.formGroup.controls.txtDistrict.setValue('')
      this.formGroup.controls.cmbState.setValue('')
      this.formGroup.controls.cmbCountry.setValue('')
      this.formGroup.controls.txtCity.setValue('')
      this.formGroup.controls.txtPinCode.setValue('')
      this.formGroup.controls.txtLattitude.setValue('')
      this.formGroup.controls.txtLongitude.setValue('')
      this.formGroup.controls.txtFaxNoOne.setValue('')
      this.formGroup.controls.txtTelNoOne.setValue('')
      this.formGroup.controls.txtWebsite.setValue('')
      this.formGroup.controls.txtEmailIdOne.setValue('')
      this.formGroup.controls.rdbEmailVerified.setValue('N')
      this.formGroup.controls.txtGstNo.setValue('')
      this.formGroup.controls.cmbTransporter.setValue('')
    }
  }

  loadComponent() {
    this.getPaymentTerm();

    this.payload = {
      cd_cust_draft_code: this.stateData.cust_supplr_code,
      cs_cust_supplr_flg: 'C',
      flgDraft: 'N',
      cd_cust_supplr_code: this.stateData.cust_supplr_code,
      cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
    }
    this.customerMasterService.getDataToNewDraft(this.payload)
      .subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            this.headerInfo = data.responseData[0].headerinfo;
            this.cd_vendor_code = this.headerInfo.cd_vendor_code;
            this.cd_credit_limit = this.headerInfo.cd_credit_limit;
            this.cd_pay_terms_day = this.headerInfo.cd_pay_terms_day;
            this.cd_allow_special_tax = this.headerInfo.cd_allow_special_tax;
            this.form.get("rdbAllowSpecialTax").setValue(this.cd_allow_special_tax);

            this.groupList = data.responseData[0].grouplist;
            this.groupList.forEach(item => {
              this.form.addControl('chkProd' + item.gp_code, new FormControl(false));
              this.form.addControl('txtProd' + item.gp_code, new FormControl());
            })

            this.custType = data.responseData[0].custtype;
            this.annualTurnover = data.responseData[0].annualturnover;
            this.category = data.responseData[0].category;
            this.bankLists = data.responseData[0].banklist;
            this.transporterList = data.responseData[0].transporterlist;
            this.chargeSubTypeCode = data.responseData[0].chargesubtypecode;
            this.transporterList = data.responseData[0].transporterlist;
            // this.companyList = data.responseData[0].companylist;
            this.fileList = data.responseData[0].filelist;
            this.payList = data.responseData[0].lstpayterm;
            if(data.responseData[0].extended_company == 'N'){
              this.extended_company="NOT EXTENDED"
            }else{
              this.extended_company=""
            }

            if (data.responseData[0].hasOwnProperty("subcategarylist")) {
              this.subcategory = data.responseData[0].subcategarylist;
            }
            if (data.responseData[0].hasOwnProperty("subsubcategarylist")) {
              this.subsubcategory = data.responseData[0].subsubcategarylist;
            }
            console.log(' this.subcategory = ', this.subcategory);
            console.log('this.subsubcategory = ', this.subsubcategory);

            // console.log(this.companyList, ' this.companyList ')

            //cmbBank
            if (this.headerInfo.cd_bank_name == null || this.headerInfo.cd_bank_name == "" || this.headerInfo.cd_bank_name == undefined) {

            } else {
              let objBank = this.bankLists.find(({ bnk_name }) => bnk_name == this.headerInfo.cd_bank_name);
              this.form.controls["cmbBank"].setValue(objBank);
            }
            console.log(' CASE !!1!!')
            this.setDraftHeaderValues();

            this.productTurnoverList = data.responseData[0].productturnoverlist;
            this.setProductTurnoverData(this.productTurnoverList);

            this.contactList = data.responseData[0].contactlist;
            this.setContactData(this.contactList)

            this.businessRefList(data.responseData[0].businessreflist);

            this.setSisterConcernData(data.responseData[0].sisterconcernlist);

            this.payTermList = data.responseData[0].paytermlist;
            this.cmpPayTermList[0] = this.payTermList

            this.companyListDataSource = new MatTableDataSource(data.responseData[0].companylist);

            this.lstAddedAdress = data.responseData[0].addrlist

            if (this.lstAddedAdress.length > 0) {

              for (let index = 0; index < this.lstAddedAdress.length; index++) {
                this.addressCode = Number(this.lstAddedAdress[index].csad_addr_code)
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }

              this.addressCode = (Number(this.addressCode) + 1)
              this.getrows = this.form.get('arrayAddAdress') as FormArray;
              if(this.getrows.length > 0){
              this.aryTableControl = this.getrows.controls;
              this.formGroup = this.aryTableControl[0] as FormGroup;
              this.formGroup.controls.txtAddCode.setValue(this.addressCode)
            }
           }

            // for (let index = 0; index < this.companyList.length; index++) {
            //   this.compArray.push(this.companyList[index].sc_name);
            //   this.compcodeArray.push(this.companyList[index].ccs_company_code);
            //   this.addauthcompanyList(index, this.companyList[index]);
            // }
            // console.log('this.companyList = ', this.companyList);
            // for (let index = 0; index < this.companyList.length; index++) {
              // for (let index1 = 0; index1 < this.payList[index].length; index1++) {
                // this.compArray.push(this.companyList[index].sc_name);
                // this.compcodeArray.push(this.companyList[index].ccs_company_code);
                // this.addauthcompanyList(index, this.companyList[index], this.payList[index][index1]);
                // console.log( this.payList[index][index1]  , ' Pay secound ')
              // }
            // }
          }
        },
        error => {

        }
      )


    this.getHandledByDropdown()
   

    this.getParty();

    this.fileDescFlg = false
    this.form.controls.txtNmOfSisConcern1.disable()
    this.form.controls.txtNmOfSisConcern2.disable()
    this.form.controls.txtNmOfSisConcern3.disable()
    this.form.controls.txtCode1.disable()
    this.form.controls.txtCode2.disable()
    this.form.controls.txtCode3.disable()
  }

  //validate pan no
  // validateEditPAN():any
  // {
  //   if(this.form.get("txtPanNo").value !=null && this.form.get("txtPanNo").value!="")
  //   {
  //     this.payload = {
  //       userInformationDto: {
  //         usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
  //         usr_name: atob(sessionStorage.getItem(btoa('username'))),
  //         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
  //         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
  //         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
  //         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
  //         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
  //         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
  //         usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
  //       },
  //       cd_pan_no: this.form.get("txtPanNo").value,
  //       callFrom: "complete",
  //       cust_code_flg: 'C',
  //       cd_grp_code:  this.form.get("txtGroupCode").value == null || this.form.get("txtGroupCode").value== "" ? undefined :this.form.get("txtGroupCode").value.cs_code,
  //       cd_cust_supplr_code: this.cust_supplr_code
  //     }
  //     this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
  //       data => {
  //         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {  
  //           }
  //         else{
  //           this.openSnackBar("PAN NO IS ALREADY EXISTS")
  //           return false;
  //         }  
  //         })
         
  //   }
    
  // }

  callGSTValidation(selectedEditIndex){
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

        let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;

        //if both pan number and gst numbers are given (gst number != URP) then there is validation.

        if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

          if (this.form.controls.txtPanNo.value != '' || this.form.controls.txtPanNo.value != undefined) {

            this.payload = {
              userInformationDto: {
                usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
                usr_name: atob(sessionStorage.getItem(btoa('username'))),
                fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
                fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
                fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
                usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
                usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
                usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
                usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
              },
              cd_pan_no: this.form.get("txtPanNo").value,
              callFrom: "complete",
              cust_code_flg: 'C',
              cd_grp_code:  this.form.get("txtGroupCode").value == null || this.form.get("txtGroupCode").value== "" ? "" :this.form.get("txtGroupCode").value.cs_code,
              cd_cust_supplr_code: this.cust_supplr_code
            }

            //check duplicate pan_no
            // this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
            //   data => {
            //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            //       console.log('data.responseData[0] =', data.responseData[0]);
            //       if (data.responseData[0] == "Y") {
            //         this.openSnackBar("PAN NO IS ALREADY EXISTS");
            //         return false;
            //       }
            //       else {
                    this.getrows = this.form.get('arrayEditAdress') as FormArray;
                    this.aryTableControl = this.getrows.controls;
                    this.formGroup = this.aryTableControl[index] as FormGroup;
                    //if not default_gst
                    console.log('index :' + index, this.formGroup.controls.txtEGstNo.value)
                    if (this.formGroup.controls.txtEGstNo.value != "" && this.formGroup.controls.txtEGstNo.value != this.defaultGst
                      && this.formGroup.controls.txtEGstNo.value.length > 1
                    ) {
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
                              this.getrows = this.form.get('arrayEditAdress') as FormArray;
                              this.aryTableControl = this.getrows.controls;
                              this.formGroup = this.aryTableControl[index] as FormGroup;
                              this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
                              this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value
                              this.payload.cust_code_flg = 'C'
                              console.log('i index :' + index, this.formGroup.controls.txtEGstNo.value)
                              this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
                                data => {
                                  if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                                    console.log('data.responseData[0] =', data.responseData[0]);
                                    if (data.responseData[0] == "Y") {
                                      this.openSnackBar("GST NO IS ALREADY EXISTS");
                                      return false;
                                    } else {
                                      if (index == selectedEditIndex) {
                                        this.callNextEditFunction()
                                      }
                                    }
                                  }
                                }
                              )
                            }
                          }
                        }
                      )

                    }//defaultGst
                    else {
                      if (index == selectedEditIndex) {
                        this.callNextEditFunction()
                      }
                    }
                  // }
            //     }
            //   }
            // )
          }//txtPanNo
          else {
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
          }
        } else {
          if (index == selectedEditIndex) {
            this.callNextEditFunction()
          }
        }
      }//ctr_home_country_flg
      else {
        if (index == selectedEditIndex) {
          this.callNextEditFunction()
        }
      }

    }//for
  }
  //validate edit_gst no 
  validateEditGSTPAN(selectedEditIndex): any {
    if (this.form.controls.txtPanNo.value != undefined && this.form.controls.txtPanNo.value != null && this.form.controls.txtPanNo.value != '') {

      this.payload = {
        userInformationDto: {
          usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
          usr_name: atob(sessionStorage.getItem(btoa('username'))),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
          fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
          usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
        },
        cd_pan_no: this.form.get("txtPanNo").value,
        callFrom: "complete",
        cust_code_flg: 'C',
        cd_grp_code:  this.form.get("txtGroupCode").value == null || this.form.get("txtGroupCode").value== "" ? "" :this.form.get("txtGroupCode").value.cs_code,
        cd_cust_supplr_code: this.cust_supplr_code
      }
      this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            if (data.responseData[0] == "Y") {
              this.openSnackBar("PAN NO IS ALREADY EXISTS");
              return false;
            }
            else{
              this.callGSTValidation(selectedEditIndex)
            }
          }
          else{
            this.openSnackBar("PAN NO IS ALREADY EXISTS");
            return false;
          }
        })
    }
    else{
      this.callGSTValidation(selectedEditIndex)
    }

    


  }

  callNextEditFunction() {
    this.getEditAddressData();

    this.getsisConData();

    this.getProductTurnoverData();

    this.getContactData();

    this.getBusinessReferencsData();

    this.getBizIntData();

    let status = this.getCompanyData();

    this.getEditPaylod();
    if(this.form.controls.txtCondDisc.value!=null && this.form.controls.txtCondDisc.value!="" && parseFloat(this.form.controls.txtCondDisc.value) >= 99)
    {
        this.openSnackBar("CONDITIONAL DISCOUNT SHOULD BE LESS THAN 99");
        return false;
    }
    console.log(status + " status ")

    if (status == 1) {
      this.openSnackBar("Please Select Proper Values ");
      return false;
    } else {
      this.payload['csCompanyMap'] = this.selectedCompListArray;
    }
    if (this.selectedCompListArray.length > 0) {
      this.customerMasterService.chkCustomerForAuthorize(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            if (data.responseData[0].length > 0) {
              this.openSnackBar(data.responseData[0]);
            } else {

              this.getEditPaylod();
              this.payload['csCompanyMap'] = this.selectedCompListArray;

              
              this.customerMasterService.updateCustomerDetails(this.payload).subscribe(
                data => {
                  if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                    console.log('data.responseData[0] =', data.responseData[0]);
                    if(this.newAddressIndex>=0){
                      this.AddNewAddress(this.newAddressIndex)
                    }
                    else{
                      this.openSnackBar(data.responseData[0].res); 
                      this.loadComponent()  
                    }
                  }else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
                    this.openSnackBar(data.message)
                    return false;
                  }
                })
            }
          }
        })
    } else {

      this.getEditPaylod();
      this.payload['csCompanyMap'] = this.selectedCompListArray;
      
      this.customerMasterService.updateCustomerDetails(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            console.log('data.responseData[0] =', data.responseData[0]);
            if(this.newAddressIndex>=0){
              this.AddNewAddress(this.newAddressIndex)
            }
            else{
              this.openSnackBar(data.responseData[0].res);
            this.loadComponent()  
            }
            
          }
        }
      )
    }
  }

  showMap(index) {
    this.getrows = this.form.get('arrayAddAdress') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let ctr_home_country_flg: string = 'N'
    for (let i = 0; i < this.countryLists[index].length; i++) {
      if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
        ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
      }
    }


    let errorRowIndex: number = 0
    errorRowIndex = index + 1

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
        // if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
        //   this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
        //   return false;
        // }
        if (this.formGroup.controls.txtPinCode.value.length != 6) {
          this.openSnackBar("Please Enter Valid Pincode OF 6 Digit " + (errorRowIndex));
          return false;
        } else if (!this.formGroup.controls.txtPinCode.value.match(/^([0-9])+$/)) {
          this.openSnackBar("Please Enter valid pincode at address no" + (errorRowIndex));
          return false;
        }
        
      }

    }


    const toSelectedCountry = this.countryLists[index].find(c => c.ctr_code == this.formGroup.controls.cmbCountry.value)

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
    this.openMapDialog(fullAddress.toUpperCase(), index, "add");
  }

  //added addres map
  showEMap(index) {
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

    console.log(this.formGroup.controls.cmbEState.value, ' cmbEState ')

    // if (this.formGroup.controls.cmbECountry.value == '01' ) {
    //   if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
    //     this.openSnackBar('Please Select State at address no' + (index + 1));
    //     return false;
    //   }
    //   if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
    //     this.openSnackBar('Please enter pincode  at address no' + (index + 1));
    //     return false;
    //   } else {
    //     if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
    //       this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
    //       return false;
    //     }
    //   }
    // }

    if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
      this.openSnackBar('Please enter pincode  at address no' + (index + 1));
      return false;
    } else {
      if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
        this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
        return false;
      }
    }

    const toSelectedCountry = this.countryELists[index].find(c => c.ctr_code == this.formGroup.controls.cmbECountry.value)
    console.log(" toSelectedCountry.ctr_desc ", toSelectedCountry.ctr_desc)

    const toSelectedState = this.stateELists[index].find(c => c.st_code == this.formGroup.controls.cmbEState.value)
    console.log(" toSelectedState ", toSelectedState.st_state)


    let fullAddress: string
    fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
      this.formGroup.controls.txtEAddrSecond.value + "," +
      toSelectedState.st_state + " " +
      this.formGroup.controls.txtEPinCode.value + "," +
      toSelectedCountry.ctr_desc

    console.log(" fullAddress ", fullAddress)

    this.openMapDialog(fullAddress.toUpperCase(), index, "edit");

  }

  openMapDialog(fullAddress, index, callFrom) {
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
    })
  }

  verifyEmail(i,cntrlName,flg,addr_code){
    let aryName='arrayAddAdress'
    if(flg=='M'){
      aryName='arrayEditAdress'
    }
    this.getrows = this.form.get(aryName) as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;
    let payload:any={party_code:this.cust_supplr_code,email_id:this.formGroup.get(cntrlName).value,addr_code:addr_code}
    this.utilityServiceAvaxPro.verifyEmail(payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if(data.responseData.length == 0){
            this.openSnackBar("Email id does not exist. Please enter correct email id.")    
          }else
          if(data.responseData[0].csad_email_flg == 'Y')
          {
            this.openSnackBar("Email verified successfully.")
            // this.cdad_email_flg[i]=data.responseData[0].csad_email_flg
          }
          else{
            this.openSnackBar("Email Wrong.")
            // this.cdad_email_flg[i]=data.responseData[0].csad_email_flg
          }
          this.ngOnInit();
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  rdbEmail(event,i){
    if(event.value =='N'){
      this.editEmail[i]=false;
    }else{
      this.editEmail[i]=true;
    }
  }
  getEmailVerificationFlag(){
    this.utilityServiceAvaxPro.getEmailVerificationFlag().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
         this.email_verification_flg = data.responseData[0] 
         this.gst_verification_flg = data.responseData[1]         
        }else{
          this.email_verification_flg = "N"
          this.gst_verification_flg = "N"
        }
        console.log("this.email_verification_flg -- " + this.email_verification_flg)
        console.log("this.email_verification_flg -- " + this.gst_verification_flg)
      },
      error => {
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
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      },
    }
    this.lstAddedAdress=[]
    this.customerMasterService.validateGst(payload).subscribe(data=>{
      if(data.responseStatus==='SUCCESS' && data.responseCode==='RES_200'){
        this.getDraftData()
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
                this.getDraftData()
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
        this.getDraftData()
      }
      else{
        this.getDraftData()
      }
     })
    }
  }

  showPanDetails(){
    let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
    if(this.form.get('txtPanNo').value.length != 10){
     this.openSnackBar("Please Enter 10 digits  pan Number")
     return false
    }else if (!panRegex.test(this.form.controls.txtPanNo.value)) {
      this.openSnackBar("Please Enter correct pan no ");
      return false;
    } else {
      let payload = {
        userInformationDto: {
          usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
          usr_name: atob(sessionStorage.getItem(btoa('username'))),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
          fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
          usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
          usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
          usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
        },
        cd_pan_no :  this.form.controls.txtPanNo.value,
        cd_type: 'C'
      }
      let respData = []
      this.customerMasterService.showAccounts(payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200'){
            respData = data.responseData
          }
          let displayedColumns =
          [
            { col_name: 'CUSTOMER CODE', db_col: 'cs_cust_supplr_code', flgLink: false, col_type: 'TXT'},
            { col_name: 'CUSTOMER NAME', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'GROUP CODE', db_col: 'grp_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'GROUP NAME', db_col: 'grp_name', flgLink: false, col_type: 'TXT'}
          ]
          const dialogRefx = this.dialog.open(SharedCommanDialogBoxComponent, {
            width: '60%',
            minWidth: '80%',
            height: '70%',
            maxHeight: '90%',
            data: {
              tabType: 'pan_no_details',
              colList: displayedColumns,
              dataSource: respData
            }
          });
      
          dialogRefx.afterClosed().subscribe((objData: any) => {
          });
        }
      )
    }

  }
}
