
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { UtilityServiceAvaxPro } from 'src/app/core/services/utility/utility_avaxpro.service';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerMasterService } from '../../customer-master.service';
import { HandledByModel } from '../../../../entry/commons/commons.model';
import { SnackbarMasterComponent } from '../../../snackbar-master/snackbar-master.component';
import { PartyModel } from '../../customer-master.model';
import { StateMasterListModel, CountryListModel } from '../misc-party-maintenance-menu/misc-party-maintenance.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import * as fileSaver from 'file-saver';
import { TableColumnHeaderViews as defaultGst } from '../constants'
import { MapDialogComponentComponent } from 'src/app/feature/session/map-dialog-component/map-dialog-component.component';
import { switchMap, debounceTime, tap } from 'rxjs/operators';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/entry/commons/date-adapter/app-date-adapter.service';
import { DatePipe } from '@angular/common';
import { CommonConfirmationDialogComponent } from 'src/app/shared/components/common-confirmation-dialog/common-confirmation-dialog.component';
import { SharedCommanDialogBoxComponent } from 'src/app/shared/comman-dialog-box/shared-comman-dialog-box/shared-comman-dialog-box.component';

@Component({
  selector: 'app-customer-new-draft-master',
  templateUrl: './customer-new-draft-master.component.html',
  styleUrls: ['./customer-new-draft-master.component.scss', '../../../../entry/entry.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
    { provide: DatePipe },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
})

export class CustomerNewDraftMasterComponent implements OnInit, OnDestroy {
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

  lstHandledBy: any = []
  lstHandledBycmpwise1: any = []
  editEmail:any=[];
  lstFollowedBy: any = []
  filteredHandledByLists: Observable<any>
  
  filteredinstructedByLists: Observable<any>
  filteredFollowedByLists: Observable<any>

  filteredHandledByListsCmpWise: Observable<any>
  // public lstHandledBycmpwise: any = []
  // public filteredHandledByListsCmpWise: Observable<any[]>[] = [];
  // public filteredinstructedByListsCmpWise: Observable<any[]>[] = [];
  // public filteredFollowedByListsCmpWise: Observable<any[]>[] = [];

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

  legalStateLists: any = [];
  legalCountryLists: any = [];

  addressCode: number = 1
  addressCodeArray: any = [];
  selectedIndex: number = 0
  selectedEditIndex: number = 0
  chkEmailRegx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  annualTurnover: any = [];
  custType: any = [];
  category: any = [];
  subcategory: any = [];
  subsubcategory: any = [];

  csLists: PartyModel[] = new Array<PartyModel>()
  filteredCSLists: PartyModel[] = new Array<PartyModel>()

  stateDataStr: string;
  stateData: any;
  flgModify: string = 'N'
  flgDraft: string = 'N'
  flgAuthorize: string = 'N'
  cs_authorised: string = 'N'
  cust_supplr_code: string = 'NEW'
  st_ctr_code: string

  headerInfo: any;
  cd_credit_limit: string;
  cd_vendor_code: string;
  cd_pay_terms_day: string;

  cd_allow_special_tax: string = 'N'
  cd_proof_of_receipt: string = 'N'
  cd_biz_premise_dtls: string = ""
  cd_yearly_business: string = ""
  cd_grn_flg: string = 'N'
  cd_type: string
  productTurnoverList: any = [];
  contactList: any = [];
  companyList: any = [];
  companyListDataSource: any;
  compArray: any = [];
  compcodeArray: any = [];
  hideShowArray: any = [];
  fileList: any = []
  lstAddedAdress: any = []
  cdad_email_flg: any = []
  gstValid:boolean=false;

  uploadResponse: any;
  error: any;
  fileDescFlg: boolean = false;
  fileData: File;
  selectedCompListArray: any[] = [];

  payTermList: any;
  cmpPayTermList: any = [];
  stateArray: any = []
  countryArray: any = []
  defaultGst: string

  txtProdArray: any = []
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
  filteredhandlebyLists: any = [];
  filteredfollowbyLists: any = [];
  filteredinsbyLists: any = [];

  lstinstructedbyLists: any[] = []
  lstfollowedbyLists: any[] = []

  // public lstHandledBycmpwise: Observable<any[]>[] = [];
  lstHandledBycmpwise: any = []
  status: any;
  flgAddRights: boolean = false
  flgModifyRights: boolean = false
  flgViewCustRights: boolean = false
  isForViewFlg: any;
  flgAuthCustRights: any;
  selectedHandledby: string = ''
  selectedInstructedby: string = ''
  selectedFollowedby: string = ''
  auth_remarks_new: any;
  email_verification_flg: any;
  gst_verification_flg:any;
  allowedEmailWoVerify: any='N';
  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private customerMasterService: CustomerMasterService,
    private fileUploadService: FileUploadService,
  ) {
    this.form = this.formBuilder.group({

      txtCompanyName: ['', [Validators.required]],
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
      cmbFreight: [''],
      cmbPrintItmCalc: ['N'],
      arrayAddAdress: this.formBuilder.array([]),
      arrayEditAdress: this.formBuilder.array([]),
      dtDate:[''],

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
      txtLegalGroupCrLimit: [''],
      txtLegalRemarks: [''],
      txtInstructedBy: ['', [Validators.required]],
      txtHandledBy: ['', [Validators.required]],
      txtFollowedBy: ['', [Validators.required]],

      //billing preferences
      txtCondDisc: [''],
      rdbTC: [''],
      txtCondDays: [''],
      cmbTransporter: [''],
      cmbGrnRequired: [''],
      rdbhardCopyInv: [''],
      //modfiy
      cmbFileList: [''],
      radFileType: [''],
      txtFileUploadDesc: [''],
      txtAuthRemarks: [''],

      authcompanyList: this.formBuilder.array([]),

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

  filterCustomerList: PartyModel[] = new Array<PartyModel>()
  ngOnInit() {
    if (sessionStorage.refData)
      this.stateDataStr = sessionStorage.getItem("refData");
    else {
      this.stateDataStr = sessionStorage.getItem("stateData");
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }

    console.log(this.form.controls.txtLegalPayDays.setValue("0"), 'pay tems')
    this.stateData = JSON.parse(this.stateDataStr)
    console.log(this.stateData, ' this.stateData  ')
    if (this.stateData != null) {
      this.cust_supplr_code = this.stateData.cust_supplr_code
      this.flgModify = this.stateData.flgModify
      this.flgAuthorize = this.stateData.flgAuthorize
      this.cs_authorised = this.stateData.cs_authorised
      this.flgModifyRights = this.stateData.flgModifyRights
      this.flgAddRights = this.stateData.flgAddRights
      this.flgViewCustRights = this.stateData.flgViewCustRights
      this.isForViewFlg = this.stateData.isForViewFlg
      this.flgAuthCustRights = this.stateData.flgAuthCustRights
    }
    else {
      this.flgModify = 'N'
      this.cust_supplr_code = 'NEW'
      this.flgAuthorize = 'N'
      this.cs_authorised = 'N'
      this.flgAddRights = true
    }

    console.log(this.isForViewFlg, '   isForViewFlg ')
    console.log(this.flgAuthCustRights, '   this.flgAuthCustRights ')
    //get customer field list data

    this.getEmailVerificationFlag();

    // this.form.controls.txtLegalPayDays.setValue('0');
    if (this.flgModify == 'N') {

      this.getPaymentTerm('');
      this.getDataToNewDraft();
      this.showIconFLg = false
      this.addNewAddressRow(0); //initilize address row

      this.form.controls.txtLegalPayDays.setValue("0")
      this.form.controls.txtLegalCrLimit.setValue("0");
      this.form.controls.txtLegalGroupCrLimit.setValue("0");
    } else {
      this.getDraftData();
    }

    // this.getHandledByDropdown()
    this.getHandledByDropdown()
    this.filteredHandledByLists = this.form.get('txtHandledBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.filteredFollowedByLists = this.form.get('txtFollowedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.filteredinstructedByLists = this.form.get('txtInstructedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )
    this.filterTransporterLists = this.form.get('cmbTransporter').valueChanges.pipe(
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
    this.form.get('txtCompanyName').valueChanges.pipe(debounceTime(100), tap(() => {
      this.filterCustomerList = new Array<PartyModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
        return value.length > 5 && this.flgAddRights && this.flgModify=='N' ? this.customerMasterService.searchParty(value,'C') : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.filterCustomerList = data.responseData.map(item => {
          return new PartyModel(item.cs_cust_supplr_code, item.cs_name)
        })
      }
      return this.filterCustomerList
    },
      error => {
        console.log(error)
      }
    )

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

  getDataToNewDraft() {
    this.payload = {
      isForEdit: "N",
      flgDraft: 'Y',
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

            this.groupList = data.responseData[0].grouplist;
            this.custType = data.responseData[0].custtype;
            this.annualTurnover = data.responseData[0].annualturnover;
            this.category = data.responseData[0].category;
            this.bankLists = data.responseData[0].banklist;
            this.transporterList = data.responseData[0].transporterlist;

            this.chargeSubTypeCode = data.responseData[0].chargesubtypecode;
            this.groupList.forEach(item => {
              this.form.addControl('chkProd' + item.gp_code, new FormControl(''))
              this.form.addControl('txtProd' + item.gp_code, new FormControl({ value: '', disabled: true }))
            })
          }
        },
        error => {
          //this.loading = false
        }
      )
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

  getCompanywiseHandledByList(company_code, index) {


    this.lstinstructedbyLists[index] = []
    //followedby
    this.lstfollowedbyLists[index] = []


    this.utilityServiceAvaxPro.getCompanywiseHandledByList(company_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBycmpwise[index] = data.responseData[0].map(item => {
            if (this.selectedHandledby == item.usr_userid) {
              this.arySelectedHandledBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }
            if (this.selectedInstructedby == item.usr_userid) {
              this.arySelectedInstructedBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }
            if (this.selectedFollowedby == item.usr_userid) {
              this.arySelectedFollowedBy[index] = new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
            }
            //this.lsthandlebyLists[index].push(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));

            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
          // console.log('lstHandledBycmpwise-' + index, this.lstHandledBycmpwise[index])
        }


        this.getrows = this.form.get('authcompanyList') as FormArray;
        this.aryTableControl = this.getrows.controls;
        this.formGroup = this.aryTableControl[index] as FormGroup;
        // this.filteredhandlebyLists[index] = this.lsthandlebyLists[index]
        // this.filteredhandlebyLists[index] = this.lstfollowedbyLists[index]
        this.filteredhandlebyLists[index] = this.lstHandledBycmpwise[index]
        this.formGroup.controls.cmbHb.setValue(this.arySelectedHandledBy[index])
        this.filteredfollowbyLists[index] = this.lstHandledBycmpwise[index]
        this.formGroup.controls.cmbFl.setValue(this.arySelectedFollowedBy[index])
        this.filteredinsbyLists[index] = this.lstHandledBycmpwise[index]
        this.formGroup.controls.cmbInst.setValue(this.arySelectedHandledBy[index])
        // return this.lstHandledBycmpwise[index];
      })
  }

  filterHandledBy(val: string) {
    return this.lstHandledBy.filter(option => {
      return (option.usr_name.toLowerCase().includes(val.toLowerCase()) || option.usr_userid.toLowerCase().includes(val.toLowerCase()))
    })
  }
  filterHandledBycmpwise1(val: string) {
    return this.lstHandledBycmpwise1.filter(option => {
      console.log(' option ', option)
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }



  filterHandledByCmpWise(val: string, index) {
    console.log(val, ' val ')
    console.log(index, ' index ')
    return this.lstHandledBycmpwise[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })

    // return this.lstHandledBycmpwise[index].filter(option => {
    //   console.log( option , ' option ')
    //   return option.usr_name.toLowerCase().includes(val.toLowerCase())
    // })
  }

  displayHandledBy(value): string | undefined {
    return value ? value.usr_userid + ' -- ' + value.usr_name : undefined
    // return value ? value.usr_name : undefined
  }

  getPaymentTerm(pay_code) {
    this.pay_day = this.form.controls.txtLegalPayDays.value;
    console.log(this.pay_day, ' this.pay_day...........')
    if (this.pay_day == '') {
      this.pay_day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstPayterm = data.responseData[0];
          if (pay_code != '') {
            const toSelectedPayterm = this.lstPayterm.find(c => c.pt_code == pay_code)
            this.form.get('txtPaymentTerm').setValue(toSelectedPayterm);
          }
          else {
            this.form.controls.txtPaymentTerm.setValue(this.lstPayterm[0]);
          }
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
    //   duration: 3000,
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
        txtStdNo:[''],
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

    this.addressCodeArray[index] = this.addressCode

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

  /*  getCountryList(index) {
     this.utilityServiceAvaxPro.getCountryList().subscribe(
       data => {
         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
           this.countryLists[index] = data.responseData[0].map(item => {
             return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
           })
         }
         return this.countryLists[index]
       }
     )
   } */

  getCountryList(index) {
    this.utilityServiceAvaxPro.getCountryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.countryLists[index] = data.responseData[0].map(item => {
            //      console.log(' country item === ', item);
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
    if (this.flgModify == 'Y') {
      if (this.checkAddressValidation(this.selectedIndex, "singleAddress")) {

        if (this.validateGSTPAN(this.selectedIndex, "singleAddress")) {

        }
      }
    } else {
      if (this.checkAddressValidation(index, "singleAddress")) {
        if (this.validateGSTPAN(this.selectedIndex, "singleAddress")) {
        }
      }
    }
  }

  firstStateCode: string
  firstCountryCode: string

  checkAddressValidation(selectedIndex, callFrom): any {

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

      let errorRowIndex = 0
      if (this.flgModify == 'N') {
        errorRowIndex = index + 1
      } else {
        errorRowIndex = this.addressCode
      }


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
      if(this.formGroup.controls.txtCity.value == '' || this.formGroup.controls.txtCity.value == null){
        this.openSnackBar("Please Select City at address no" +(errorRowIndex));
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
          // } else if (this.formGroup.controls.txtPinCode.value.length != 6) {
          //   this.openSnackBar("Please Enter Valid Pincode OF 6 Digit at address no"+ (errorRowIndex));
          //   return false;
          // }
          if (this.formGroup.controls.txtPinCode.value.length != 6) {
            this.openSnackBar("Please Enter Valid Pincode OF 6 Digit at address no" + (errorRowIndex));
            return false;
          } else if (!this.formGroup.controls.txtPinCode.value.match(/^([0-9])+$/)) {
            this.openSnackBar("Please Enter valid pincode at address no" + (errorRowIndex));
            return false;
          }
        }

      }

      //location 
      if (this.formGroup.controls.txtLattitude.value.trim() == '' || this.formGroup.controls.txtLattitude.value.trim() == null) {
        this.openSnackBar('Please select lattitude at address no ' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.txtLongitude.value.trim() == '' || this.formGroup.controls.txtLongitude.value.trim() == null) {
        this.openSnackBar('Please select longitude at address no' + (this.addressCode));
        return false;
      }

      if (this.formGroup.controls.txtTelNoOne.value != "") {
        if (isNaN(this.formGroup.controls.txtTelNoOne.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for telephone/mobile no at address no" + (errorRowIndex));
          return false;
        }
      }
      if (this.formGroup.controls.txtStdNo.value != "") {
        if (isNaN(this.formGroup.controls.txtStdNo.value)) {
          this.openSnackBar("Please Enter Only Numeric Value for std/isd no at address no" + (errorRowIndex));
          return false;
        }
      }
      
      console.log('index 934= ', index);

      if (index == 0) {
        console.log('email id 1 = ', this.formGroup.controls.txtEmailIdOne.value);

        if (this.formGroup.controls.txtEmailIdOne.value === "" ||
          this.formGroup.controls.txtEmailIdOne.value === null ||
          this.formGroup.controls.txtEmailIdOne.value === undefined) {
          this.openSnackBar('Please Enter Email Id at address no 1');
          return false;
        }
      }

      if (this.formGroup.controls.txtEmailIdOne.value != "") {
        if (!this.chkEmailRegx.test(this.formGroup.controls.txtEmailIdOne.value)) {
          this.openSnackBar("Please Enter a valid email address at address no" + (errorRowIndex));
          return false;
        }
      }

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

      //get home_country_flg
      /*  let ctr_home_country_flg: string = 'N'
       for (let i = 0; i < this.countryLists[index].length; i++) {
         if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
           ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
         }
       }
  */
      if (ctr_home_country_flg == 'Y') {
        if (this.formGroup.controls.txtGstNo.value != "") {

          if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

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

            if (this.formGroup.controls.txtGstNo.value.length > 0 && this.formGroup.controls.txtGstNo.value.length != 15) {
              this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (errorRowIndex));
              return false;
            }
          }
        }
      }

    }//for
    return true;

  }//end of func


  validateForm() {

    if (this.form.controls.txtCompanyName.value == '' || this.form.controls.txtCompanyName.value == undefined) {
      this.openSnackBar("Please Enter Company Name.");
      return false;
    }

    let alphaPattern = /^[a-zA-Z0-9]+((([\(]|[\)]|[\/]|[\s]|[\.]|[\-]|[\&])*[a-zA-Z0-9\(\)\.&]+)*)?$/;

    if (!this.form.controls.txtCompanyName.value.match(alphaPattern)) {
      this.openSnackBar('Please Enter Valid company name ');
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

    if (this.form.controls.rdbAnnualTurnover.value == '' || this.form.controls.rdbAnnualTurnover.value == undefined || this.form.controls.rdbAnnualTurnover.value == null) {
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

    if (this.form.controls.txtLegalCrLimit.value == ''
      || this.form.controls.txtLegalCrLimit.value == undefined ||
      this.form.controls.txtLegalCrLimit.value == null) {
      this.openSnackBar("Please Enter Credit Limit.");
      return false;
    }

    if (isNaN(this.form.controls.txtLegalCrLimit.value.trim())) {
      this.openSnackBar("Please enter valid Credit Limit.");
      return false;
    }

    if (this.form.controls.txtLegalGroupCrLimit.value == ''
      || this.form.controls.txtLegalGroupCrLimit.value == undefined
      || this.form.controls.txtLegalGroupCrLimit.value == null) {
      this.openSnackBar("Please Enter Group Credit Limit.");
      return false;
    }

    if (isNaN(this.form.controls.txtLegalGroupCrLimit.value.trim())) {
      this.openSnackBar("Please enter valid Group Credit Limit.");
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
    if(this.form.controls.rdbTC.value==null || this.form.controls.rdbTC.value==""){
      this.openSnackBar("Please Enter BILLING PREFERENCE -> TC Required.");
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
    console.log(" this.selectedIndex ", this.selectedIndex)

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
        cdad_std1: this.formGroup.controls.txtStdNo.value,
        cdad_fax_1: this.formGroup.controls.txtFaxNoOne.value,
        cdad_website: this.formGroup.controls.txtWebsite.value,
        cdad_email_1: this.formGroup.controls.txtEmailIdOne.value,
        cdad_email_flg: this.formGroup.controls.rdbEmailVerified.value,
        cdad_gst_no: this.formGroup.controls.txtGstNo.value.length > 3?this.formGroup.controls.txtGstNo.value:'URP',
        cdad_transporter_code: this.formGroup.controls.cmbTransporter.value == undefined ? '' : this.formGroup.controls.cmbTransporter.value.tr_code,
        cdad_created_by: atob(sessionStorage.getItem(btoa('userId'))),
        cdad_deleted_flg: 'N',
        cdad_latitude: this.formGroup.controls.txtLattitude.value,
        cdad_longitude: this.formGroup.controls.txtLongitude.value,
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
          ptod_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
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

  completeDraft() {

    if (this.validateForm()) {

      if (this.checkAddressValidation(this.selectedIndex, "allAddress")) {
        if(this.validatePan()){
        }//checkPanValidation
      }//checkAddressValidation

    }//validateForm

  }

  //modify draft calls
  draft_created_in_company: string = ''
  getDraftData() {

    this.payload = {
      cd_cust_draft_code: this.stateData.cust_supplr_code,
      isForEdit: 'Y',
      flgDraft: 'Y',
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
      .toPromise().then(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            this.getPaymentTerm('');

            this.headerInfo = data.responseData[0].headerinfo;
            this.draft_created_in_company = this.headerInfo.cd_company_code
            this.selectedHandledby = this.headerInfo.cd_handled_by
            this.selectedFollowedby = this.headerInfo.cd_foll_by
            this.selectedInstructedby = this.headerInfo.cd_inst_by
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
            this.companyList = data.responseData[0].companylist;
            this.fileList = data.responseData[0].filelist;

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
            //          console.log(" CALL @@@@ ")
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

            //         console.log(data.responseData[0].addrlist ,  ' data.responseData[0].addrlist ' )
            this.lstAddedAdress = data.responseData[0].addrlist
            //        console.log(this.lstAddedAdress.length ,  ' this.lstAddedAdress.length ' )
            if (this.lstAddedAdress.length > 0) {
              this.showIconFLg = true
              for (let index = 0; index < this.lstAddedAdress.length; index++) {
                this.addressCode = this.lstAddedAdress[index].cdad_addr_code
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }
              //        console.log(' this.selectedEditIndex = = ', this.selectedEditIndex);
              this.addressCode = (Number(this.addressCode) + 1)
              //this.addNewAddressRow(0)
            } else {
              //      console.log( ' ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ')
              this.showIconFLg = false
              this.addressCode = 1
              this.addNewAddressRow(0)
            }

            for (let index = 0; index < this.companyList.length; index++) {
              // console.log(this.companyList[index].sc_company_code, ' TEST sc_company_code');
              this.compArray.push(this.companyList[index].sc_company_short_name);
              this.compcodeArray.push(this.companyList[index].sc_company_code);
              if (this.draft_created_in_company == this.companyList[index].sc_company_code) {
                this.addauthcompanyList(index, false);
              }
              else {
                this.addauthcompanyList(index, true);
              }
            }
            // console.log(this.compArray, ' this.compArray ')
            // console.log(this.compcodeArray, ' this.compcodeArray ')
          }

        }).finally().then(
          () => {
          }
        )
  }

  initNewAddressRow(index) {
    console.log("initNewAddressRow ", this.addressCode);
    this.addNewAddressRow(0)
    this.showIconFLg = false
  }

  setDraftHeaderValues() {
    this.cust_supplr_code = this.headerInfo.cd_cust_draft_code;
    this.form.controls.txtCompanyName.setValue(this.headerInfo.cd_name);
    this.form.controls.txtPanNo.setValue(this.headerInfo.cd_pan_no);
    this.form.controls.txtCinNo.setValue(this.headerInfo.cd_cin_no);
    this.form.controls.txtAadharNo.setValue(this.headerInfo.cd_aadhar_no);
    if (this.headerInfo.cd_grp_code1 != '-') {
      if (this.headerInfo.cd_grp_name != null) {
        this.form.controls.txtGroupCode.setValue(new PartyModel(this.headerInfo.cd_grp_code1,
          this.headerInfo.cd_grp_name));
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
    this.form.controls.txtVendorCode.setValue(this.headerInfo.cd_vendor_code);

    //txtCcsRemarks
    this.cd_proof_of_receipt = this.headerInfo.cd_proof_of_receipt;
    this.cd_allow_special_tax = this.headerInfo.cd_allow_special_tax
    this.cd_biz_premise_dtls = this.headerInfo.cd_biz_premise_dtls;
    this.cd_yearly_business = this.headerInfo.cd_yearly_business
    this.form.get("rdbAnnualTurnover").setValue(this.cd_yearly_business)

    this.form.controls.txtAreaSqr.setValue(this.headerInfo.cd_biz_premise_area);
    this.form.controls.txtOccupiedSince.setValue(this.headerInfo.cd_biz_premise_occupied);
    this.form.controls.txtBankBranch.setValue(this.headerInfo.cd_bank_branch);
    this.form.controls.txtAccountNumber.setValue(this.headerInfo.cd_account_no);
    this.form.controls.txtMaintainedSince.setValue(this.headerInfo.cd_bank_account_maintained);
    this.form.controls.txtIfscCode.setValue(this.headerInfo.cd_bank_ifsc_code);
    this.form.controls.txtMicrCode.setValue(this.headerInfo.cd_bank_micr_code);

    this.form.controls.txtCreditRatingIfany.setValue(this.headerInfo.cd_credit_rating);
    //  console.log('this.headerInfo.cd_pay_terms_day.toString()',this.headerInfo.cd_pay_terms_day.toString())
    this.form.controls.txtLegalPayDays.setValue(this.headerInfo.cd_pay_terms_day.toString());
    this.getPaymentTerm(this.headerInfo.cd_pay_code);


    this.form.controls.txtLegalCrLimit.setValue(this.headerInfo.cd_credit_limit.toString());
    this.form.controls.txtLegalGroupCrLimit.setValue(this.headerInfo.cd_grp_credit_limit.toString());

    if (this.headerInfo.cd_handled_by != null && this.headerInfo.cd_handled_by_name != null) {
      this.form.controls.txtHandledBy.setValue(new HandledByModel(
        this.headerInfo.cd_handled_by, this.headerInfo.cd_handled_by_name, ''));
    }
    if (this.headerInfo.cd_foll_by != null && this.headerInfo.cd_foll_by_name != null) {
      this.form.controls.txtFollowedBy.setValue(new HandledByModel(
        this.headerInfo.cd_foll_by, this.headerInfo.cd_foll_by_name, ''));
    }
    if (this.headerInfo.cd_inst_by != null && this.headerInfo.cd_inst_by_name != null) {
      this.form.controls.txtInstructedBy.setValue(new HandledByModel(
        this.headerInfo.cd_inst_by, this.headerInfo.cd_inst_by_name, ''));
    }
    this.form.controls.txtCondDisc.setValue(this.headerInfo.cd_conditional_disc.toString());
    this.form.controls.rdbTC.setValue(this.headerInfo.cd_type_tc);
    this.form.controls.txtCondDays.setValue(this.headerInfo.cd_conditional_disc_days.toString());
    this.form.controls.cmbFreight.setValue(this.headerInfo.cd_freight_code);
    this.form.controls.cmbPrintItmCalc.setValue(this.headerInfo.cd_item_calc_flg);
    this.form.controls.dtDate.setValue(this.headerInfo.cd_ts_origin)
    this.transporterList.filter(item => {
      if (item.tr_code == this.headerInfo.cd_transporter_code) {
        this.form.controls.cmbTransporter.setValue(item);
      }
    })
    // item.usr_userid, item.usr_name, item.usr_acc_code
    this.cd_grn_flg = this.headerInfo.cd_grn_flg;
    this.form.controls.cmbGrnRequired.setValue(this.headerInfo.cd_grn_flg);
    this.form.controls.rdbhardCopyInv.setValue(this.headerInfo.cd_inv_hard_copy);
    this.form.controls.txtLegalRemarks.setValue(this.headerInfo.cd_remarks);
    this.allowedEmailWoVerify=this.headerInfo.cd_allow_without_email_verify
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
        console.log(value)
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.tr_name
        return this.filterDisplayTransporter(value)
      })
    )

    if (current_row != '') {

      this.formGroup.controls.txtEAddrOne.setValue(current_row.cdad_address1)
      this.formGroup.controls.txtEAddrSecond.setValue(current_row.cdad_address2)

      // this.formGroup.controls.txtEAddrOne.setValue(current_row.cdad_address1.trim())
      // this.formGroup.controls.txtEAddrSecond.setValue(current_row.cdad_address2.trim())
      // this.formGroup.controls.txtEAddrThird.setValue(current_row.cdad_address3)
      this.formGroup.controls.txtEAddrThird.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_address3));
      // this.formGroup.controls.txtEAddrFourth.setValue(current_row.cdad_address4)
      this.formGroup.controls.txtEAddrFourth.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_address4));

      // this.formGroup.controls.txtECity.setValue(current_row.cdad_city)
      // this.formGroup.controls.txtEDistrict.setValue(current_row.cdad_district)

      this.formGroup.controls.txtECity.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_city));
      this.formGroup.controls.txtEDistrict.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_district));

      // this.formGroup.controls.txtEAddrThird.setValue(current_row.cdad_address3.trim())
      // this.formGroup.controls.txtEAddrFourth.setValue(current_row.cdad_address4.trim())

      // this.formGroup.controls.txtECity.setValue(current_row.cdad_city.trim())
      // this.formGroup.controls.txtEDistrict.setValue(current_row.cdad_district.trim())

      this.countryArray[index] = current_row.cdad_country_code
      this.formGroup.controls.cmbECountry.setValue(current_row.cdad_country_code)

      this.getESetStateDropdown(index, current_row.cdad_state_code)

      // this.formGroup.controls.txtEPinCode.setValue(current_row.cdad_pincode)
      this.formGroup.controls.txtEPinCode.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_pincode));
      //    this.formGroup.controls.txtEPinCode.setValue(current_row.cdad_pincode.trim())
      this.formGroup.controls.txtELattitude.setValue(current_row.cdad_latitude)
      this.formGroup.controls.txtELongitude.setValue(current_row.cdad_longitude)

      // this.formGroup.controls.txtEFaxNoOne.setValue(current_row.cdad_fax_1)
      // this.formGroup.controls.txtETelNoOne.setValue(current_row.cdad_tel_no1)
      // this.formGroup.controls.txtEWebsite.setValue(current_row.cdad_website)
      // this.formGroup.controls.txtEEmailIdOne.setValue(current_row.cdad_email_1)

      this.formGroup.controls.txtEFaxNoOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_fax_1));
      this.formGroup.controls.txtETelNoOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_tel_no1));
      this.formGroup.controls.txtEStdNo.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_std1));
      this.formGroup.controls.txtEWebsite.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_website));
      this.formGroup.controls.txtEEmailIdOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.cdad_email_1));

      // this.formGroup.controls.txtEFaxNoOne.setValue(current_row.cdad_fax_1.trim())
      // this.formGroup.controls.txtETelNoOne.setValue(current_row.cdad_tel_no1.trim())
      // this.formGroup.controls.txtEWebsite.setValue(current_row.cdad_website.trim())
      // this.formGroup.controls.txtEEmailIdOne.setValue(current_row.cdad_email_1.trim())

      if (current_row.cdad_email_flg != '') {
        this.cdad_email_flg[index] = current_row.cdad_email_flg;
        if(this.cdad_email_flg[index] == 'N')
        {
          this.editEmail[index]= false
        }
        else{
          this.editEmail[index]= true
        }
      } else {
        this.cdad_email_flg[index] = 'N'
        this.editEmail[index]= false;
      }
      this.formGroup.controls.rdbEEmailVerified.setValue(this.cdad_email_flg[index])

      this.formGroup.controls.txtEGstNo.setValue(current_row.cdad_gst_no)
      //this.formGroup.controls.txtEGstNo.setValue(current_row.cdad_gst_no.trim())

      if (current_row.cdad_transporter_code == null || current_row.cdad_transporter_code == "" || current_row.cdad_transporter_code == undefined) {

      } else {
        const toSelectedTransp = this.transporterList.find(c => c.tr_code == current_row.cdad_transporter_code)
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
        // console.log(this.countryELists[index] , ' this.countryELists[index] ' )
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

    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUserid', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docNo', this.stateData.cust_supplr_code);
    // formData.append('docNo', this.stateData.row.cd_cust_draft_code);
    // formData.append('docType', "PQ");
    formData.append('docType', "CUST_DRAFT");
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
    if (this.fileData != undefined && this.fileData.name != undefined) {
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
      formData.append('docType', 'CUST_DRAFT');
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
        this.openSnackBar("Please Select City at address no" + (index + 1));
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
          if (this.formGroup.controls.txtEPinCode.value.length != 6) {
            this.openSnackBar("Please Enter Valid Pincode OF 6 Digit at address no" + (index + 1));
            return false;
          } else if (!this.formGroup.controls.txtEPinCode.value.match(/^([0-9])+$/)) {
            this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
            return false;
          }
          // if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
          //   this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
          //   return false;
          // } else if (this.formGroup.controls.txtEPinCode.value.length != 6) {
          //   this.openSnackBar("Please Enter Valid Pincode OF 6 Digit "+ (index + 1));
          //   return false;
          // }
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

      if (this.formGroup.controls.txtEEmailIdOne.value != "" &&
        this.formGroup.controls.txtEEmailIdOne.value != null) {
        console.log(' email id ', this.formGroup.controls.txtEEmailIdOne.value);
        if (!this.chkEmailRegx.test(this.formGroup.controls.txtEEmailIdOne.value)) {
          this.openSnackBar("Please Enter a valid email address at address no" + (index + 1));
          return false;
        }
      }

      //check home country_flg
      /* let ectr_home_country_flg: string = 'N'
      for (let i = 0; i < this.countryELists[index].length; i++) {
        if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
          ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
        }
      } */
      if (this.flgAuthorize == 'Y') {
          if(this.email_verification_flg!='N' && this.formGroup.controls.rdbEEmailVerified.value == 'N' && this.allowedEmailWoVerify=='N'){
            this.openSnackBar("ALL EMAILS TO BE VERIFIED");
            return false;
          }
      }
      // If the country is out of India, there is no need to validate gst no or pan no
      if (ectr_home_country_flg == 'Y') {
        if (this.formGroup.controls.txtEGstNo.value == "" || this.formGroup.controls.txtEGstNo.value == null
          || this.formGroup.controls.txtEGstNo.value == undefined) {

        } else {

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

            if (this.formGroup.controls.txtEGstNo.value.length > 0 && this.formGroup.controls.txtEGstNo.value.length != 15) {
              this.openSnackBar('Please Enter 15 digits  Gst Number at ' + (index + 1));
              return false;
            }
            if(this.flgAuthorize == 'Y' && this.gst_verification_flg=='Y')
            {
             if(!this.gstValid){
              let cnt=0;
              this.lstAddedAdress.map(item=>{
                if(item.cdad_gst_flg=='N'){
                  cnt+=1;
                }
              })
              if(this.formGroup.controls.txtEGstNo.value.length == 15 && cnt>0)
              {
                this.openSnackBar('Please Validate Gst No ');
                return false;
              }
            }
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
      }
      );
    }

  }

  get authcompanyList(): FormArray { return this.form.get('authcompanyList') as FormArray; }

  addauthcompanyList(index, flgDisable) {
    this.authcompanyList.push(this.formBuilder.group({
      chkCompName: [flgDisable == false],
      txtCrLimit: ['0'],
      txtPayTermDays: ['0'],
      cmbPaymentType: [''],
      cmbHb: [''],
      cmbFl: [''],
      cmbInst: [''],
      cmbGoodRcNote: ['N'],
      cmbPrintItmCalc: ['N'],
      txtVendorCode: [''],
      txtCcsRemarks: [''],
    }));

    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    if (flgDisable) {
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
    else {
      this.getCompanywiseHandledByList(this.draft_created_in_company, index)
      this.formGroup.controls.txtCrLimit.setValue(this.headerInfo.cd_credit_limit)
      this.formGroup.controls.txtPayTermDays.setValue(this.headerInfo.cd_pay_terms_day)
      this.formGroup.controls.cmbGoodRcNote.setValue(this.headerInfo.cd_grn_flg)
      this.getAuthorizePaymentTerm(index, true)

    }

  }

  enableRow(index, event, cmp_code) {

    console.log(index, ' index ')
    // console.log(event, ' event ')
    console.log(cmp_code, ' cmp_code ')


    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    if (event.checked) {

      // console.log(this.formGroup, ' this.formGroup ')

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
      // console.log(this.lstHandledBycmpwise[index], ' lstHandledBycmpwise with index')
      // console.log(this.filteredhandlebyLists[index], ' filteredhandlebyLists with index')
      // console.log(this.lstHandledBycmpwise, ' lstHandledBycmpwise without index')
      // console.log(this.filteredhandlebyLists, ' filteredhandlebyLists without index')
      // console.log(this.formGroup.controls.cmbHb, ' cmbHb')

      // this.filteredhandlebyLists = this.formGroup.controls.cmbHb.valueChanges.pipe(
      //   startWith(''),
      //   map(value => {
      //     console.log(value, ' value ')
      //     value =
      //       typeof value == 'string' || value instanceof String
      //         ? value
      //         : value.usr_name
      //     console.log(this.filteredhandlebyLists(value), ' filteredhandlebyLists ')
      //     return this.filterHandledBycmpwise1(value)
      //   })
      // )

      // this.filteredhandlebyLists[index] = this.formGroup.controls.cmbHb.valueChanges.pipe(
      //   startWith(''),
      //   map(value => {
      //     console.log(value , value )
      //     value =
      //       typeof value == 'string' || value instanceof String
      //         ? value
      //         : value.usr_name
      //     return this.filterHandledByCmpWise(value,index)
      //   })
      // )

      // this.filteredHandledByListsCmpWise = this.formGroup.controls.cmbHb.valueChanges.pipe(
      //   startWith(''),
      //   map(value => {
      //     console.log(value , value )
      //     value =
      //       typeof value == 'string' || value instanceof String
      //         ? value
      //         : value.usr_name
      //     return this.filterHandledByCmpWise(value,index)
      //   })
      // )



      // this.filteredhandlebyLists[index] = this.formGroup.controls.cmbFl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => {
      //     value =
      //       typeof value == 'string' || value instanceof String
      //         ? value
      //         : value.usr_name
      //     return this.filterHandledByCmpWise(value)
      //   })
      // )

      // this.filteredhandlebyLists[index] = this.formGroup.controls.cmbInst.valueChanges.pipe(
      //   startWith(''),
      //   map(value => {
      //     value =
      //       typeof value == 'string' || value instanceof String
      //         ? value
      //         : value.usr_name
      //     return this.filterHandledByCmpWise(value)
      //   })
      // )
    } else {

      this.formGroup.controls.txtCrLimit.setValue('')
      this.formGroup.controls.txtPayTermDays.setValue('')
      this.formGroup.controls.cmbPaymentType.setValue('')
      this.formGroup.controls.cmbHb.setValue('')
      this.formGroup.controls.cmbFl.setValue('')
      this.formGroup.controls.cmbInst.setValue('')
      this.formGroup.controls.cmbGoodRcNote.setValue('')
      this.formGroup.controls.cmbPrintItmCalc.setValue('')
      this.formGroup.controls.txtVendorCode.setValue('')
      this.formGroup.controls.txtCcsRemarks.setValue('')


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
    this.getrows = this.form.get('authcompanyList') as FormArray;
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
    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let val = this.formGroup.controls.cmbInst.value
    this.filteredinsbyLists[index] = this.lsthandlebyLists[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })
  }

  filterFolloParty(index) {
    console.log(index, ' index ')
    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let val = this.formGroup.controls.cmbFl.value
    this.filteredfollowbyLists[index] = this.lsthandlebyLists[index].filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })
  }

  getCompanyData(): any {
    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;

    let index: any = 0;
    this.selectedCompListArray = [];
    this.status = 0;
    // this.companyList.forEach(item => {
    //   this.formGroup = this.aryTableControl[index] as FormGroup;
    // if (this.formGroup.controls.chkCompName.value) {
    if ((this.form.controls.txtHandledBy.value == null || this.form.controls.txtHandledBy.value == '') || this.form.controls.txtHandledBy.value.usr_userid == undefined) {
      this.status = 'Please Select Handled By';
      // return false;
    } else if ((this.form.controls.txtInstructedBy.value == null || this.form.controls.txtInstructedBy.value == '') || this.form.controls.txtInstructedBy.value.usr_userid == undefined) {
      this.status = 'Please Select Instructed By';
      // return false;
    } else if ((this.form.controls.txtFollowedBy.value == null || this.form.controls.txtFollowedBy.value == '') || this.form.controls.txtFollowedBy.value.usr_userid == undefined) {
      this.status = 'Please Select Followed By';
      // return false;
    } else if ((this.form.controls.txtLegalCrLimit.value == null || this.form.controls.txtLegalCrLimit.value.toString() == '')) {
      this.status = 'Please Enter Credit Limit';
      // return false;
    } else if (!this.form.controls.txtLegalCrLimit.value.toString().match(/^([0-9])+$/)) {
      this.status = 'Please Enter Valid Credit Limit ';
      // return false;
    } else if ((this.form.controls.txtLegalPayDays.value == null || this.form.controls.txtLegalPayDays.value.toString() == '')) {
      this.status = 'Please Pay Days';
      // return false;
    } else if (!this.form.controls.txtLegalPayDays.value.toString().match(/^([0-9])+$/)) {
      this.status = 'Please Enter Valid Pay Days ';
      // return false;
    } else if ((this.form.controls.txtPaymentTerm.value == null || this.form.controls.txtPaymentTerm.value == '') || this.form.controls.txtPaymentTerm.value.pt_code == undefined) {
      this.status = 'Please Select Pay Terms Type';
      // return false;
    } else if (this.form.controls.txtLegalRemarks.value == "" || this.form.controls.txtLegalRemarks.value == null) {
      this.status = "Please Enter remark";
      // return false;
    } else {
      this.status = 0;
      // this.auth_remarks_new = this.form.controls.txtLegalRemarks.value;
      // if(item.sc_company_code == atob(sessionStorage.getItem(btoa('usr_company_code')))){
      //   this.form.controls.txtAuthRemarks.value == '' ? '' : this.form.controls.txtAuthRemarks.value;
      //   this.auth_remarks_new = this.formGroup.controls.txtCcsRemarks.value;
      // }
      this.selectedCompListArray.push({
        ccs_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        ccs_credit_limit: this.form.controls.txtLegalCrLimit.value,
        ccs_pay_terms_day: this.form.controls.txtLegalPayDays.value,
        ccs_pay_code: this.form.controls.txtPaymentTerm.value.pt_code,
        ccs_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
        ccs_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
        ccs_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
        ///
        ccs_grn_flg: this.form.controls.cmbGrnRequired.value,
        ccs_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
        ccs_print_item_calc: this.form.controls.cmbPrintItmCalc.value,
        ccs_vendor_code: this.form.controls.txtVendorCode.value,
        ccs_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
        ccs_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
        ccs_type_tc: this.form.controls.rdbTC.value,
        ccs_freight_code: this.form.controls.cmbFreight.value,
        ccs_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '' : this.form.controls.cmbTransporter.value.tr_code,
        /////
        mt_remarks: this.form.controls.txtLegalRemarks.value,
        cd_gst_period: null
      })
    }
    // }
    //   index = index + 1;
    // });
    console.log(this.selectedCompListArray.length, ' this.selectedCompListArray.')
    // console.log(this.companyList.length, ' this.companyList.')
    return this.status;
  }

  // getCompanyData() {

  //   this.getrows = this.form.get('authcompanyList') as FormArray;
  //   this.aryTableControl = this.getrows.controls;

  //   let index: any = 0;
  //   this.selectedCompListArray = [];

  //   this.companyList.forEach(item => {
  //     this.formGroup = this.aryTableControl[index] as FormGroup;
  //     if (this.formGroup.controls.chkCompName.value) {
  //       this.selectedCompListArray.push({
  //         ccs_company_code: item.sc_company_code,
  //         ccs_credit_limit: this.formGroup.controls.txtCrLimit.value,
  //         ccs_pay_terms_day: this.formGroup.controls.txtPayTermDays.value,
  //         ccs_pay_code: this.formGroup.controls.cmbPaymentType.value.pt_code,
  //         ccs_handled_by: this.formGroup.controls.cmbHb.value.usr_userid,
  //         ccs_foll_by: this.formGroup.controls.cmbFl.value.usr_userid,
  //         ccs_inst_by: this.formGroup.controls.cmbInst.value.usr_userid,
  //         ccs_grn_flg: this.formGroup.controls.cmbGoodRcNote.value,
  //         ccs_print_item_calc: this.formGroup.controls.cmbPrintItmCalc.value,
  //         ccs_vendor_code: this.formGroup.controls.txtVendorCode.value,
  //         cd_gst_period: null

  //       })
  //     }
  //     index = index + 1;
  //   });
  // }

  getAuthorizePaymentTerm(index, flgOnLoad) {

    this.getrows = this.form.get('authcompanyList') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.pay_day = this.formGroup.controls.txtPayTermDays.value;
    if (this.pay_day == '') {
      this.pay_day = 0;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //this.payTermList = data.responseData[0];
          this.cmpPayTermList[index] = data.responseData[0]
          if (flgOnLoad) {
            let obj = this.cmpPayTermList[index].find(({ pt_code }) => pt_code == this.headerInfo.cd_pay_code);
            this.formGroup.controls.cmbPaymentType.setValue(obj)
          }
          else {
            this.formGroup.controls.cmbPaymentType.setValue(this.cmpPayTermList[index][0]);
          }
        }
      })
  }

  editAuthCustDraft() {
    //console.log(" this.validateForm() ", this.validateForm())
    if (this.flgAuthorize == 'Y') {
      
    }
    if (this.validateForm()) {
      if (this.checkEditAddressValidation(this.selectedEditIndex)) {
        if (this.validateEditGSTPAN(this.selectedEditIndex)) {
        }//validateEditGSTPAN
      }//checkEditAddressValidation
    }//validateForm
  }

  getEditAuthPaylod() {
    // console.log(this.cust_supplr_code, ' this.cust_supplr_code ')
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
      cd_cust_draft_code: this.cust_supplr_code,

      custAddrDto: this.custEditAddressArray,
      sisterConcernDto: this.sisConcernArray,
      productTurnoverDto: this.productTurnoverArray,
      contactDto: this.contactArray,
      businessReferencesDto: this.BusinessReferencsArray,

      cd_name: this.form.controls.txtCompanyName.value,
      cd_pan_no: this.form.controls.txtPanNo.value,
      cd_cin_no: this.form.controls.txtCinNo.value,
      cd_aadhar_no: this.form.controls.txtAadharNo.value,
      // cd_grp_code: this.form.controls.txtGroupCode.value != undefined ? this.form.controls.txtGroupCode.value.cs_code : '',
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
      //txtCcsRemarks
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
      cd_pay_terms_day: this.form.controls.txtLegalPayDays.value != '' ? this.form.controls.txtLegalPayDays.value : '0',
      cd_pay_code: this.form.controls.txtPaymentTerm.value.pt_code != undefined ? this.form.controls.txtPaymentTerm.value.pt_code : '',
      cd_credit_limit: this.form.controls.txtLegalCrLimit.value != undefined ? this.form.controls.txtLegalCrLimit.value : '0',
      cd_grp_credit_limit: this.form.controls.txtLegalGroupCrLimit.value != undefined ? this.form.controls.txtLegalGroupCrLimit.value : '0',
      cd_remarks: this.form.controls.txtLegalRemarks.value,
      cd_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
      cd_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
      cd_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
      cd_grn_flg: this.form.controls.cmbGrnRequired.value,

      //added
      cd_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
      cd_type_tc: this.form.controls.rdbTC.value,
      cd_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
      cd_freight_code: this.form.controls.cmbFreight.value,
      cd_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '' : this.form.controls.cmbTransporter.value.tr_code,
      cd_item_calc_flg: this.form.controls.cmbPrintItmCalc.value,
      cd_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
      cd_ts_origin:this.form.controls.dtDate.value == undefined ||
      this.form.controls.dtDate.value == null ||
      this.form.controls.dtDate.value == '' ? '' : this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.dtDate.value),
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
      this.formGroup.controls.txtStdNo.setValue('')
      this.formGroup.controls.txtWebsite.setValue('')
      this.formGroup.controls.txtEmailIdOne.setValue('')
      this.formGroup.controls.rdbEmailVerified.setValue('N')
      this.formGroup.controls.txtGstNo.setValue('')
      this.formGroup.controls.cmbTransporter.setValue('')
    }
  }

  //validate gst no 
  validateGSTPAN(selectedIndex, callFrom): any {
    let startedIndex: number = 0;
    if (callFrom == "singleAddress") {
      startedIndex = selectedIndex
    } else {
      startedIndex = 0
    }
    // console.log(" validateGSTPAN startedIndex ", startedIndex)

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

        //if both pan number and gst numbers are given (gst number != URP) then there is validation.
        //console.log( this.formGroup.controls.txtGstNo.value , ' GST NO.... ')
        //console.log( this.defaultGst , ' defaultGst GST NO.... ')
        
        if (this.formGroup.controls.txtGstNo.value == '' || this.formGroup.controls.txtGstNo.value == undefined) {
          if (index == selectedIndex) {
            this.callNextFunction(callFrom, selectedIndex)
          }
        } else {

          if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

            let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;

            if (this.form.controls.txtPanNo.value != '' || this.form.controls.txtPanNo.value != undefined) {

              // this.payload = {
              //   userInformationDto: {
              //     usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
              //     usr_name: atob(sessionStorage.getItem(btoa('username'))),
              //     fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
              //     fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
              //     fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
              //     usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
              //     usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
              //     usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
              //     usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
              //   },
              //   cd_pan_no: this.form.get("txtPanNo").value,
              //   callFrom: "draft",
              //   cust_code_flg: 'C',
              // }

              // if (this.cust_supplr_code != 'NEW') {
              //   this.payload.cd_cust_supplr_code = this.cust_supplr_code
              // }

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
                      if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

                        this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
                        this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value
                        this.form.setErrors({ 'invalid': true });
                        this.customerMasterService.validateGstWithPan(this.payload).subscribe(
                          data => {
                            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                              console.log('data.responseData[0] =', data.responseData[0]);
                              if (data.responseData[0] != "Y") {
                                this.form.setErrors({ 'invalid': false });
                                this.openSnackBar(data.responseData[0]);
                                return false;
                              } else {

                                //                   //check_duplicate_gst_no
                                this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
                                this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

                                this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
                                  data => {
                                    if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                                      console.log('data.responseData[0] =', data.responseData[0]);
                                      if (data.responseData[0] == "Y") {
                                        this.form.setErrors({ 'invalid': false });
                                        this.openSnackBar("GST NO IS ALREADY EXISTS");
                                        return false;
                                      } else {
                                        if (index == selectedIndex) {
                                          this.callNextFunction(callFrom, selectedIndex)
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
                        if (index == selectedIndex) {
                          this.callNextFunction(callFrom, selectedIndex)
                        }
                      }
                    // }
                //   }
                // })
            }//txtPanNoe
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

  callNextFunction(callFrom, selectedIndex) {
    console.log("date of incorpation",this.form.controls.dtDate.value)
    if (callFrom == "singleAddress") {
      if (this.flgModify == 'Y') {

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
          cd_cust_supplr_code: this.cust_supplr_code,
          cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
          cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
          cd_deleted_flg: 'N',
          custAddrDto: this.custAddressArray,
          flgDraft: 'Y'
        }
        this.customerMasterService.saveCustDraftAddress(this.payload).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.openSnackBar(" address details added successfully ")
            this.custAddressArray = []

            //reset row
            this.resetAddressEntryRow(0)

            //show added row 
            this.lstAddedAdress = data.responseData[0]

            if (this.lstAddedAdress.length > 0) {
              this.showIconFLg = true
              for (let index = 0; index < this.lstAddedAdress.length; index++) {
                this.addressCode = Number(this.lstAddedAdress[index].cdad_addr_code)
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }

              this.addressCode = (Number(this.addressCode) + 1)
              this.addressCodeArray[0] = this.addressCode

              this.getrows = this.form.get('arrayAddAdress') as FormArray;
              this.aryTableControl = this.getrows.controls;
              this.formGroup = this.aryTableControl[0] as FormGroup;
              this.formGroup.controls.txtAddCode.setValue(this.addressCode)
            }

            this.items.removeAt(0);

            return true;
          } else {
            this.form.setErrors({ 'invalid': false });
            this.openSnackBar("Error While updating customer details");
            return false;
          }
        })

      } else {

        this.addressCode = (Number(this.addressCode) + 1)
        this.addNewAddressRow(selectedIndex + 1)
      }
    } else {
      //compelet daft
      this.getAddressData();

      this.getsisConData();

      this.getProductTurnoverData();

      this.getContactData();

      this.getBusinessReferencsData();

      this.getBizIntData();
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
        sisterConcernDto: this.sisConcernArray,
        productTurnoverDto: this.productTurnoverArray,
        contactDto: this.contactArray,
        businessReferencesDto: this.BusinessReferencsArray,

        cd_name: this.form.controls.txtCompanyName.value,
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
        //////////Added code///////////////////
        cd_inv_hard_copy: this.form.controls.rdbhardCopyInv.value,
        // cd conditional disc perc
        cd_conditional_disc: parseFloat(this.form.controls.txtCondDisc.value),
        cd_type_tc: this.form.controls.rdbTC.value,
        // cd conditional disc days
        cd_conditional_disc_days: parseInt(this.form.controls.txtCondDays.value),
        cd_transporter_code: this.form.controls.cmbTransporter.value == undefined ? '' : this.form.controls.cmbTransporter.value.tr_code,
        cd_freight_code: this.form.controls.cmbFreight.value,
        cd_item_calc_flg: this.form.controls.cmbPrintItmCalc.value,
        //txtCcsRemarks
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
        cd_pay_terms_day: this.form.controls.txtLegalPayDays.value != '' ? this.form.controls.txtLegalPayDays.value : '0',
        cd_pay_code: this.form.controls.txtPaymentTerm.value.pt_code != undefined ? this.form.controls.txtPaymentTerm.value.pt_code : '',
        cd_credit_limit: this.form.controls.txtLegalCrLimit.value != undefined ? this.form.controls.txtLegalCrLimit.value : '0',
        cd_grp_credit_limit: this.form.controls.txtLegalGroupCrLimit.value != undefined ? this.form.controls.txtLegalGroupCrLimit.value : '0',
        cd_remarks: this.form.controls.txtLegalRemarks.value,
        cd_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
        cd_foll_by: this.form.controls.txtFollowedBy.value.usr_userid,
        cd_inst_by: this.form.controls.txtInstructedBy.value.usr_userid,
        cd_grn_flg: this.form.controls.cmbGrnRequired.value,
        cd_ts_origin:this.form.controls.dtDate.value == undefined ||
        this.form.controls.dtDate.value == null ||
        this.form.controls.dtDate.value == '' ? '' : this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.dtDate.value),
      }
      if (this.form.controls.txtCondDisc.value != null && this.form.controls.txtCondDisc.value != "" && parseFloat(this.form.controls.txtCondDisc.value) >= 99) {
        this.openSnackBar("CONDITIONAL DISCOUNT SHOULD BE LESS THAN 99");
        return false;
      }
      console.log('payload  ', this.payload);

      this.customerMasterService.completeDraft(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            console.log('data.responseData[0] =', data.responseData[0]);
            this.openSnackBar(data.responseData[0]);
            this.cust_supplr_code = data.responseData[0].split("=")[1]
            this.uploadFile();
            this.router.navigate(['session/master/customer-draft-master/'], { state: this.queryParams });
          }else if(data.responseStatus==='FAILURE' && data.responseCode==='RES_109'){
            this.openSnackBar(data.message)
          }
        },
        error => {
          this.form.setErrors({ 'invalid': false });
        }
      )
    }

  }

  //validate edit_gst no 
  validateEditGSTPAN(selectedEditIndex): any {
    console.log(" validateEditGSTPAN **********")

    //On Authorization check If Pan no is  valid
    //pan no is null or empty the call will go and not sending grpcode
    if (this.flgAuthorize == 'Y' && this.form.get("txtPanNo").value != null && this.form.get("txtPanNo").value != "") {
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
        callFrom: "draft",
        cust_code_flg: 'C',
        cd_grp_code: this.form.get("txtGroupCode").value == null || this.form.get("txtGroupCode").value == "" ? "" : this.form.get("txtGroupCode").value.cs_code,
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
   
  }//func


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

        if (this.formGroup.controls.txtEGstNo.value == '' || this.formGroup.controls.txtEGstNo.value == undefined) {
          if (index == selectedEditIndex) {
            this.callNextEditFunction(selectedEditIndex)
          }
        } else {
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
                callFrom: "draft",
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

                        this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
                          data => {
                            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                              console.log('data.responseData[0] =', data.responseData[0]);
                              if (data.responseData[0] == "Y") {
                                this.openSnackBar("GST NO IS ALREADY EXISTS");
                                return false;
                              } else {
                                if (index == selectedEditIndex) {
                                  this.callNextEditFunction(selectedEditIndex)
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
                  this.callNextEditFunction(selectedEditIndex)
                }
              }
              //       }
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
  }
  
  callNextEditFunction(selectedEditIndex) {

    this.getEditAddressData();

    this.getsisConData();

    this.getProductTurnoverData();

    this.getContactData();

    this.getBusinessReferencsData();

    this.getBizIntData();

    if (this.flgAuthorize == 'Y') {
      let status = this.getCompanyData();
      if (status != 0) {
        this.openSnackBar(status);
        return false;
      } else {
        if (this.selectedCompListArray.length == 0) {
          this.openSnackBar("Please Fill Required Fields.");
          return false;
        } else {
          this.getEditAuthPaylod();
          this.payload['isForEdit'] = "A";
          this.payload['csCompanyMap'] = this.selectedCompListArray;
          this.payload['cd_auth_remarks'] = this.form.controls.txtAuthRemarks.value == '' ? '' : this.form.controls.txtAuthRemarks.value;
          this.payload['auth_remarks_new'] = this.auth_remarks_new;
        }
      }
    } else {
      this.getEditAuthPaylod();
      this.payload['isForEdit'] = "N";
    }

    
    if (this.form.controls.txtCondDisc.value != null && this.form.controls.txtCondDisc.value != "" && parseFloat(this.form.controls.txtCondDisc.value) >= 99) {
      this.openSnackBar("CONDITIONAL DISCOUNT SHOULD BE LESS THAN 99")
      return false;
    }

    console.log('payload  ', this.payload);
    this.customerMasterService.editAuthDraft(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          console.log('data.responseData[0].status = ', data.responseData[0].status);
          if (data.responseData[0].status == 'Y') {

            this.openSnackBar(data.responseData[0].res);

            if (this.flgAuthorize == 'Y') {
              //authorize                
              this.cust_supplr_code = data.responseData[0].cust_code;

              let datastr = {
                cust_supplr_code: this.cust_supplr_code,
                cust_supplr_name: this.form.controls.txtCompanyName.value,
                flgModify: "Y",
                flgDraft: 'N',
                flgAuthorize: 'N',
                cs_authorised: "",
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
              }
              sessionStorage.setItem("stateData", JSON.stringify(datastr));
              this.router.navigate(['/session/master/customer-draft-master/customermaintaince'], { state: datastr });

              // this.router.navigate(['/session/master/customer-draft-master'], { state: datastr });

              return false
            } else {
              this.loadUpdatedData();
              return false;
            }
          } else {
            this.openSnackBar('Data Not updated.');
            return false;
          }
        }
        else if (data.responseStatus === 'FAILURE' && data.message == 'already_authorised') {
          this.openSnackBar('Draft already authorised.');
          return false;
        }
        else if (data.responseStatus === 'FAILURE' && data.message == 'Email_Not_Verified') {
          this.openSnackBar('Please verify All Email Ids');
          return false;
        }
        else if (data.responseStatus === 'FAILURE' && data.responseCode=='RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
        else {
          this.openSnackBar('Failed to authorise customer.');
          return false;
        }

      },
      error => {
      }
    )
  }

  loadUpdatedData() {



    this.getHandledByDropdown()
    this.filteredHandledByLists = this.form.get('txtHandledBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.filteredFollowedByLists = this.form.get('txtFollowedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.filteredinstructedByLists = this.form.get('txtInstructedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    // this.getParty();

    this.fileDescFlg = false
    this.form.controls.txtNmOfSisConcern1.disable()
    this.form.controls.txtNmOfSisConcern2.disable()
    this.form.controls.txtNmOfSisConcern3.disable()
    this.form.controls.txtCode1.disable()
    this.form.controls.txtCode2.disable()
    this.form.controls.txtCode3.disable();

    this.payload = {
      cd_cust_draft_code: this.stateData.cust_supplr_code,
      isForEdit: 'Y',
      flgDraft: 'Y',
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
            this.draft_created_in_company = this.headerInfo.cd_company_code
            this.selectedHandledby = this.headerInfo.cd_handled_by
            this.selectedFollowedby = this.headerInfo.cd_foll_by
            this.selectedInstructedby = this.headerInfo.cd_inst_by
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
            this.companyList = data.responseData[0].companylist;
            this.fileList = data.responseData[0].filelist;

            if (data.responseData[0].hasOwnProperty("subcategarylist")) {
              this.subcategory = data.responseData[0].subcategarylist;
            }

            if (data.responseData[0].hasOwnProperty("subsubcategarylist")) {
              this.subsubcategory = data.responseData[0].subsubcategarylist;
            }
            if (this.headerInfo.cd_bank_name == null || this.headerInfo.cd_bank_name == "" || this.headerInfo.cd_bank_name == undefined) {

            } else {
              let objBank = this.bankLists.find(({ bnk_name }) => bnk_name == this.headerInfo.cd_bank_name);
              this.form.controls["cmbBank"].setValue(objBank);
            }
            //         console.log(" CALL !!!! ");
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
                this.addressCode = this.lstAddedAdress[index].cdad_addr_code
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }

              this.addressCode = (Number(this.addressCode) + 1)
            } else {
              this.addressCode = 1
              this.addNewAddressRow(0)
            }

            for (let index = 0; index < this.companyList.length; index++) {
              this.compArray.push(this.companyList[index].sc_company_short_name);
              this.compcodeArray.push(this.companyList[index].sc_company_code);

              if (this.draft_created_in_company == this.companyList[index].sc_company_code) {
                this.addauthcompanyList(index, false);
              }
              else {
                this.addauthcompanyList(index, true);
              }
            }

          }
        },
        error => {

        }
      )
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
        if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
          this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
          return false;
        }
      }
    }

    const toSelectedCountry = this.countryLists[index].find(c => c.ctr_code == this.formGroup.controls.cmbCountry.value)

    let fullAddress: string
    fullAddress = this.formGroup.controls.txtAddrOne.value + "," +
      this.formGroup.controls.txtAddrSecond.value + "," +
      this.formGroup.controls.cmbState.value.st_state + " " +
      this.formGroup.controls.txtPinCode.value + "," +
      toSelectedCountry.ctr_desc
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
  verifyEmail(i, cntrlName, flg, addr_code) {
    let aryName = 'arrayAddAdress'
    if (flg == 'M') {
      aryName = 'arrayEditAdress'
    }
    this.getrows = this.form.get(aryName) as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;
    if (this.formGroup.get(cntrlName).value == null || this.formGroup.get(cntrlName).value == '') {
      this.openSnackBar("Please Enter Email Id");
      return false;
    }
    let payload: any = { party_code: this.cust_supplr_code, email_id: this.formGroup.get(cntrlName).value, addr_code: addr_code, Authflag: 'AUTH' }
    this.utilityServiceAvaxPro.verifyEmail(payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData.length == 0) {
            this.openSnackBar("Email id does not exist. Please enter correct email id.")
          } else
            if (data.responseData[0].cdad_email_flg == 'Y') {
              this.openSnackBar("Email verified successfully.")
              // this.cdad_email_flg[i]=data.responseData[0].cdad_email_flg
            }
            else {
              this.openSnackBar("Email id does not exist. Please enter correct email id.")
              // this.cdad_email_flg[i]=data.responseData[0].cdad_email_flg
            }
          // this.ngOnInit();         
          this.getUpdatedAddressData()
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getEmailVerificationFlag() {
    this.utilityServiceAvaxPro.getEmailVerificationFlag().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.email_verification_flg = data.responseData[0]
          this.gst_verification_flg = data.responseData[1]
        } else {
          this.email_verification_flg = "N"
          this.gst_verification_flg = "N"
        }
        console.log("this.email_verification_flg -- " + this.email_verification_flg)
        console.log(" this.gst_verification_flg = "+this.gst_verification_flg)
      },
      error => {
        console.log(error)
      }
    )
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
        this.openSnackBar("Please select Location")
        return false
      }
      else if (item == 'undefined::undefined') {
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

  getUpdatedAddressData() {

    this.payload = {
      cd_cust_draft_code: this.stateData.cust_supplr_code,
      isForEdit: 'Y',
      flgDraft: 'Y',
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
      .toPromise().then(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            //         console.log(data.responseData[0].addrlist ,  ' data.responseData[0].addrlist ' )
            this.lstAddedAdress = data.responseData[0].addrlist
            //        console.log(this.lstAddedAdress.length ,  ' this.lstAddedAdress.length ' )
            if (this.lstAddedAdress.length > 0) {
              this.showIconFLg = true
              for (let index = 0; index < this.lstAddedAdress.length; index++) {
                this.addressCode = this.lstAddedAdress[index].cdad_addr_code
                this.initAddedAddressRow(index, this.lstAddedAdress[index])
              }
              //        console.log(' this.selectedEditIndex = = ', this.selectedEditIndex);
              this.addressCode = (Number(this.addressCode) + 1)
              //this.addNewAddressRow(0)
            } else {
              //      console.log( ' ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ')
              this.showIconFLg = false
              this.addressCode = 1
              this.addNewAddressRow(0)
            }

          }

        }).finally().then(
          () => {
          }
        )
  }

  rdbEmail(event,i){
    if(event.value =='N'){
      this.editEmail[i]=false;
      console.log("readonly = false;")
    }else{
      this.editEmail[i]=true;
      console.log("readonly = true;")
    }
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
    if(rowAddrGst.cdad_gst_flg=='Y'){
      let payload={
        flgDraft:'Y',
        cd_cust_supplr_code: this.cust_supplr_code,
        csad_addr_code:rowAddrGst.cdad_addr_code
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
  validatePan(){
    if (this.form.controls.txtPanNo.value != '' && this.form.controls.txtPanNo.value != undefined) {
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
        callFrom: "draft",
        cust_code_flg: 'C',
        cd_grp_code: this.form.get("txtGroupCode").value == null || this.form.get("txtGroupCode").value == "" ? "" : this.form.get("txtGroupCode").value.cs_code,
      }

      if (this.cust_supplr_code != 'NEW') {
        this.payload.cd_cust_supplr_code = this.cust_supplr_code
      }
      // check duplicate pan_no
      return this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            console.log('data.responseData[0] =', data.responseData[0]);
            if (data.responseData[0] == "Y") {
              this.openSnackBar("PAN NO IS ALREADY EXISTS");
              return false;
            }else{
              this.validateGSTPAN(this.selectedIndex, "allAddress")
            }
          }else{
            this.openSnackBar("PAN NO IS ALREADY EXISTS");
           return false;
          }
        })
    }else{
              this.validateGSTPAN(this.selectedIndex, "allAddress")
            }
  }
}
