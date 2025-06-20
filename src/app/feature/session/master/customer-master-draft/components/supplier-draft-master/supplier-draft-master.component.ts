// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
// import { CustomerMasterService } from '../../customer-master.service';
// import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
// import { DatePipe, formatDate } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
// import { ElementModel } from '../../../../../../shared/models/model/element.model';
// import { CustTypeModel, BankModel, GroupCodeModel } from '../../customer-master.model';
// import { PayMentModel, HandledByModel, PartyModel } from 'src/app/entry/commons/commons.model';
// import { Observable } from 'rxjs';
// import { startWith, map, debounceTime, switchMap, tap } from 'rxjs/operators';
// import { CommonSnackbarComponent } from '../../../../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
// import { StateMasterListModel, CountryListModel, cmpModel } from '../misc-party-maintenance-menu/misc-party-maintenance.model';
// import { Router } from '@angular/router';
// import { TableColumnHeaderViews as defaultGst } from '../constants'
// import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/master/customer-master-draft/commons/date-adapter/app-date-adapter.service';
// import { MapDialogComponentComponent } from 'src/app/feature/session/map-dialog-component/map-dialog-component.component';
// import { BehaviorSubject } from 'rxjs';
// import { CommonConfirmationDialogComponent } from 'src/app/shared/components/common-confirmation-dialog/common-confirmation-dialog.component';


// @Component({
//   selector: 'app-supplier-draft-master',
//   templateUrl: './supplier-draft-master.component.html',
//   styleUrls: ['./supplier-draft-master.component.scss'],
//   providers: [{
//     provide: DateAdapter, useClass: AppDateAdapter
//   },
//   { provide: DatePipe },
//   {
//     provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
//   }],
// })
// export class SupplierDraftMasterComponent implements OnInit {

//   @ViewChild('tabGroup') tabGroup: any;

//   rows: FormArray = this.formBuilder.array([]);
//   getrows: FormArray = this.formBuilder.array([]);
//   form: FormGroup
//   aryTableControl: AbstractControl[]
//   formGroup: FormGroup
//   gstValid:boolean=false;
//   gst_verification_flg:any;
//   industryTypeList: any = []
//   custTypeList: any = []
//   companyList: any[]
//   tempDatasource: any;
//   companyListDatasource: any;
//   sisconBankLists: any = []
//   lstPayterm: any = [];
//   lstInvoicePayterm: any;
//   pay_day: any;
//   gst_code: any;
//   paytermLists: any;
//   filteredHandledByLists: Observable<any>
//   filteredFollowedByLists: Observable<any>
//   filteredInstructedByLists: Observable<any>
//   filteredNameOfPersonLists: Observable<any>
//   lstHandledBy: any = []
//   lstFollowedBy: any = []
//   payload: any = {}
//   list_map: any = [];
//   gst_list: any = [];

//   st_ctr_code: any;

//   stateLists: any = [];
//   countryLists: any = []

//   stateELists: any = [];
//   countryELists: any = []

//   stateEditResLists: any = [];
//   stateEditOffLists: any = [];
//   stateResLists: any = [];
//   stateOffLists: any = [];

//   cust_supplr_code: any = "NEW";
//   cust_supplr_name: any;

//   addressCode: number = 1
//   contactCode: number = 1

//   accLists: GroupCodeModel[] = new Array<GroupCodeModel>()
//   filteredAccLists: GroupCodeModel[] = new Array<GroupCodeModel>()

//   menuview: boolean = true

//   addressview: boolean = true
//   addcontactview: boolean = true

//   flgSave: boolean = false
//   lstAddedAdress: any = [];
//   addedFlag: boolean = false
//   addedContactFlag: boolean = false

//   showAddAddrRowFlag: boolean = true
//   showAddContactRowFlag: boolean = true

//   lstAddedContact: any = [];

//   chkEmailRegx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

//   saveDraftAction: string = 'save'

//   stateDataStr: string;
//   stateData: any;
//   flgModify: string = 'N'
//   flgAuthorize: string = 'N'
//   cs_authorised: string = 'N'
//   lstSupDetail: any = [];
//   lstCustOf: any = [];
//   cs_group_stpg_flg: string = 'N'
//   lstAccHandledBy: any = [];
//   cs_legal_warning_flg: string = 'N'
//   cs_ask_reference: string = 'N'

//   cs_industry_head_code: string = ""
//   cs_type: string = ""
//   cs_pay_code: string = ""
//   cs_cust_of: string = "";
//   cs_override_pay: string = 'N'
//   cs_allow_special_tax: string = 'N'

//   filteredIntroByUserLists: Observable<any>
//   filteredDocHandledByLists: Observable<any>
//   filteredSPInstructedByLists: Observable<any>
//   filteredDispatchInfoLists: Observable<any>
//   filteredGuaranteedByLists: Observable<any>
//   filteredContactofLists: Observable<any>
//   filteredEContactofLists: Observable<any>
//   lstSPInstructed: any = [];

//   lstDummyTax: any = [];
//   lstDummyTransporter: any = [];
//   lstETax: any = []
//   lstETransporter: any = []
//   lstTax: any = []
//   lstTransporter: any = []

//   sisConcernLists: any = []
//   sisConcernELists: any = []

//   defaultGst: string
//   stateArray: any = []
//   countryArray: any = []

//   selectedAddressIndex: number = 0
//   addressCodeArray: any = [];
//   selectedContactIndex: number = 0
//   contactCodeArray: any = [];
//   selectedEditAddrIndex: number = 0
//   selectedEditContIndex: number = 0
//   queryParams = {}
//   toSelectedBank: any
//   firstStateCode: string
//   firstCountryCode: string
//   custAddressArray: any[] = [];
//   custContactArray: any[] = [];

//   showIconFLg: boolean = false
//   contactList: any = [];
//   contactArray: any[] = [];
//   contactDtlLabelArray = [
//     'PURCHASE 1',
//     'PURCHASE 2',
//     'PURCHASE 3',
//     'ACCOUNTS',
//     'OWNER',
//     'PROPRIETOR',
//     'PARTNER 1',
//     'PARTNER 2',
//     'PARTNER 3',
//     'PARTNER 4',
//     'PARTNER 5'
//   ]

//   csad_email_flg: any = []
//   filterSupList: PartyModel[] = new Array<PartyModel>()
//   hideBtnDiv: boolean = false
//   tableData: any;
//   dataSource = new BehaviorSubject<AbstractControl[]>([]);
//   displayedColumns: string[] = ['company_list', 'radio_btn'];
//   ccs_gst_filing_frequency: any;
//   flgAddRights: boolean = false
//   flgModifyRights: boolean = false
//   flgViewCustRights: boolean = false
//   isForViewFlg: any;
//   email_verification_flg: any;
//   extended_company: string;
//   constructor(
//     private formBuilder: FormBuilder,
//     private utilityServiceAvaxPro: UtilityServiceAvaxPro,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog,
//     private customerMasterService: CustomerMasterService,
//     private router: Router,
//   ) {
//     this.form = this.formBuilder.group({
//       txtSupplierName: [''],
//       cmbIndustry: [''],
//       cmdtypesupp: [''],
//       txtdatetime: [''],
//       txtFileNo: [''],
//       txtgrpCode: [''],
//       txtRegNo: [''],
//       rdbgrpstopegges: ['N'],
//       rdbspecailtax: ['N'],
//       cmbBank: [''],
//       txtbankbranch: [''],
//       txtbankadd: [''],
//       txtaccno: [''],
//       txtifscCode: [''],
//       txtcontactName: [''],
//       txtemailID: [''],
//       txtcrlimit: [''],
//       txtpaytermdays: [''],
//       cmbPayterms: [''],
//       txtvendorCode: [''],
//       txtHandledBy: [''],
//       txtFollowedBy: [''],
//       txtInstructedBy: [''],
//       txtPanNo: [''],
//       txtuanNo: [''],

//       arrayAddAdress: this.formBuilder.array([]),
//       arrayEditAdress: this.formBuilder.array([]),

//       //modify supp
//       txtESupplierName: [''],
//       cmbECustOf: [''],
//       cmbEGrpCode: [''],
//       txtEVendorCode: [''],
//       txtEPanNo: [''],
//       txtEMsmeUanNo: [''],
//       rdbEGrpStopegges: ['N'],
//       cmbEAccHandledBy: [''],
//       cmbEIndustry: [''],
//       rdbELegalFlg: ['N'],
//       cmbETypeOfSupp: [''],
//       txtEIntroByUser: [''],
//       txtEIntroBy: [''],
//       rdbEAskRef: ['N'],
//       txtECrLimit: [''],
//       txtEPaytermDays: [''],
//       cmbEPayCode: [''],
//       txtEinvoicePaytermDays: [''],
//       cmbEInvoicePayCode: [''],
//       rdbEOverridePay: ['N'],
//       txtEDocHandledBy: [''],
//       txtEInstructedBy: [''],
//       txtEHandledBy: [''],
//       txtEFollowedBy: [''],
//       txtESPInstructedBy: [''],
//       txtESPInstructed: [''],
//       txtEManualSPInstrCode: [''],
//       txtEDispatchInfo: [''],
//       txtEFileNo: [''],
//       txtEPayDay: [''],
//       txtEPayDate: [new Date()],
//       txtEGuaranBy: [''],
//       txtEGuaranName: [''],
//       txtOuterCrLimit: [''],
//       txtOsInterest: [''],
//       rdbEAllowTax: ['N'],
//       cmbEBank: [''],
//       txtEBankBranch: [''],
//       txtEBankAddr: [''],
//       txtEAccNo: [''],
//       txtEIfscCode: [''],
//       txtEContactName: [''],
//       txtEEmailId: [''],

//       txtAuthRemark: [''],
//       rdbBtnGstPeriod: ['M'],
//       rdbUpdateBtnGstPeriod: ['M'],
//     });

//     this.setContactControls();
//     this.defaultGst = defaultGst.view_at_init.gst_no

//   }

//   ngOnInit() {
//     this.getEmailVerificationFlag();
//     this.loadPageData();
//   }

//   ngOnChanges() {
//     this.loadPageData()
//   }

//   loadPageData() {

//     if (sessionStorage.refData)
//       this.stateDataStr = sessionStorage.getItem("refData")|| "";
//     else {
//       this.stateDataStr = sessionStorage.getItem("stateData") ||"";
//       sessionStorage.removeItem("stateData");
//       sessionStorage.setItem("refData", this.stateDataStr);
//     }
//     this.stateData = JSON.parse(this.stateDataStr)
//     if (this.stateData != null) {
//       this.cust_supplr_code = this.stateData.cust_supplr_code
//       this.flgModify = this.stateData.flgModify
//       this.flgAuthorize = this.stateData.flgAuthorize
//       this.cs_authorised = this.stateData.cs_authorised
//       this.flgModifyRights = this.stateData.flgModifyRights
//       this.flgAddRights = this.stateData.flgAddRights
//       this.flgViewCustRights = this.stateData.flgViewCustRights
//       this.isForViewFlg = this.stateData.isForViewFlg
//     }
//     else {
//       this.flgModify = 'N'
//       this.cust_supplr_code = 'NEW'
//       this.flgAuthorize = 'N'
//       this.cs_authorised = 'N'
//       this.flgAddRights = true
//       this.isForViewFlg = 'A'
//     }

//     this.hideBtnDiv = false
//     this.getIndustryTypeList()
//     this.getCustomerTypeList()
//     this.getCompanyList()
//     this.getBankDropdown()

//     if (this.flgModify == 'Y') {
//       //get details
//      // this.getInvoicPaymentTerm()
//       this.getSupplierDetail(this.cust_supplr_code)
//       this.showIconFLg = false
//     }
//     else if (this.flgModify == 'N') {

//       this.form.controls.txtcrlimit.setValue(0);

//       this.getHandledByDropdown()

//       this.filteredHandledByLists = this.form.get('txtHandledBy').valueChanges.pipe(
//         startWith(''),
//         map(value => {
//           value =
//             typeof value == 'string' || value instanceof String
//               ? value
//               : value.usr_name
//           return this.filterHandledBy(value)
//         })
//       )

//       this.filteredFollowedByLists = this.form.get('txtFollowedBy').valueChanges.pipe(
//         startWith(''),
//         map(value => {
//           value =
//             typeof value == 'string' || value instanceof String
//               ? value
//               : value.usr_name
//           return this.filterHandledBy(value)
//         })
//       )
//       this.filteredInstructedByLists = this.form.get('txtInstructedBy').valueChanges.pipe(
//         startWith(''),
//         map(value => {
//           value =
//             typeof value == 'string' || value instanceof String
//               ? value
//               : value.usr_name
//           return this.filterHandledBy(value)
//         })
//       )

//       this.form.get('txtgrpCode').valueChanges.pipe(debounceTime(100), tap(() => {
//         this.filteredAccLists = new Array<GroupCodeModel>()
//       }),
//         switchMap(value => {
//           if (value != null || value != undefined) {
//             value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//             return value.length > 3 ? this.getAccountList(value) : ['']
//           }
//         })
//       ).subscribe(data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.filteredAccLists = data.responseData[0].map(item => {
//             console.log(item, " Group Code")
//             return new GroupCodeModel
//               (item.cs_cust_supplr_code, item.cs_name)
//           })
//         }
//         return this.filteredAccLists
//       },
//         error => {
//           console.log(error)
//         }
//       )

//       this.showIconFLg = false
//       this.addNewAddressRow(0); //initilize address row
//     }
    
//     this.form.get('txtSupplierName').valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filterSupList = new Array<PartyModel>()
//     }),
//       switchMap(value => {
//         value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//         return value.length > 5 && this.flgAddRights && this.flgModify=='N' ? this.customerMasterService.searchParty(value,'M') : ['']
//       })
//     ).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filterSupList = data.responseData.map(item => {
//           return new PartyModel(item.cs_cust_supplr_code, item.cs_name)
//         })
//       }
//       return this.filterSupList
//     },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getAccountList(account): Observable<any> {
//     return this.customerMasterService.getGroupCode(account)
//   }
//   displayAcclist(value): string | undefined {
//     return value ? value.cs_cust_supplr_code + ' :: ' + value.cs_name : undefined
//   }

//   filterAcc(val: string) {
//     return this.accLists.filter(option => {
//       return (option.cs_cust_supplr_code.toUpperCase().includes(val.toUpperCase()) ||
//         option.cs_name.toUpperCase().includes(val.toUpperCase())
//       )
//     })
//   }

//   getIndustryTypeList() {
//     this.utilityServiceAvaxPro.getIndustryList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.industryTypeList = data.responseData[0].map(item => {
//             return new ElementModel(item.ind_industry_code, item.ind_industry)
//           })
//         }
//         return this.industryTypeList
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getCustomerTypeList() {
//     this.utilityServiceAvaxPro.getCustTypeList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.custTypeList = data.responseData[0].map(item => {
//             return new CustTypeModel(item.ct_code, item.ct_customer_type)
//           })
//         }
//         return this.custTypeList
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getCompanyList() {
//     this.utilityServiceAvaxPro.getCompanyList().subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.tempDatasource = data.responseData[0];
//       }
//       this.companyListDatasource = data.responseData[0];
//       this.tableData = data.responseData[0].map(item => {
//         console.log(item, ' item ')
//         return new cmpModel(
//           item.sc_name,
//           item.sc_company_code,
//           item.sc_company_short_name,
//           false
//         )
//       })
//       this.dataSource = this.tableData
//       this.tempDatasource.forEach(item => {
//         this.form.addControl('chkcmp' + item.sc_company_code, new FormControl(false))
//         this.form.addControl('rdbflag' + item.sc_company_code, new FormControl())
//       })
//     },
//       error => {
//         console.log(error)
//       })
//   }

//   getBankDropdown() {
//     this.utilityServiceAvaxPro.getParentBankData().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.sisconBankLists = data.responseData[0].map(item => {
//             return new BankModel(
//               item.bnk_code,
//               item.bnk_bbranch_code,
//               item.bnk_name,
//               item.bnk_code+'-'+item.bnk_bbranch_code
//             )
//           })
//         }
//         return this.sisconBankLists
//       })
//   }

//   getPaymentTerm() {
//     this.pay_day = this.form.controls.txtpaytermdays.value;
//     if (this.pay_day == '') {
//       this.pay_day = 0;
//     }

//     this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
//       subscribe(data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.paytermLists = data.responseData[0].map(item => {
//             return new PayMentModel(item.pt_code, item.pt_desc)
//           })
//           this.lstPayterm = data.responseData[0];
//           this.form.controls.cmbPayterms.setValue(this.lstPayterm[0]);
//         }
//       })
//   }

//   getHandledByDropdown() {

//     this.utilityServiceAvaxPro.getHandledByList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.lstHandledBy = data.responseData[0].map(item => {
//             if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId')))) {
//               this.form.get('txtHandledBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId')))) {
//               this.form.get('txtFollowedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId')))) {
//               this.form.get('txtInstructedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
//           })
//         }
//         return this.lstHandledBy
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getModifyHandledByDropdown() {
//     this.utilityServiceAvaxPro.getHandledByList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.lstHandledBy = data.responseData[0].map(item => {
//             if (item.usr_userid == this.lstSupDetail['cs_intro_by_code']) {
//               this.form.get('txtEIntroByUser').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_doc_handled_by']) {
//               this.form.get('txtEDocHandledBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_inst_by']) {
//               this.form.get('txtEInstructedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_handled_by']) {
//               this.form.get('txtEHandledBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_foll_by']) {
//               this.form.get('txtEFollowedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_manual_sp_instr_by']) {
//               this.form.get('txtESPInstructedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_dispatch_info_by']) {
//               this.form.get('txtEDispatchInfo').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }
//             if (item.usr_userid == this.lstSupDetail['cs_guaranteed_by']) {
//               this.form.get('txtEGuaranBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
//             }

//             return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
//           })
//         }
//         return this.lstHandledBy
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   filterHandledBy(val: string) {
//     return this.lstHandledBy.filter(option => {
//       return option.usr_name.toLowerCase().includes(val.toLowerCase())
//     })
//   }
//   displayHandledBy(value): string | undefined {
//     return value ? value.usr_name : undefined
//   }

//   getModifyPaymentTerm() {
//     this.pay_day = this.form.controls.txtEPaytermDays.value;
//     if (this.pay_day == '') {
//       this.pay_day = 0;
//     }

//     let selectedObj;

//     this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
//       subscribe(data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//           //this.lstPayterm = data.responseData[0];

//           this.lstPayterm = data.responseData[0].map(item => {
//             if (item.pt_code == this.cs_pay_code) {
//               selectedObj = new PayMentModel(item.pt_code, item.pt_desc);
//               return selectedObj;
//             } else
//               return new PayMentModel(item.pt_code, item.pt_desc)
//           })
//           this.form.get('cmbEPayCode').setValue(selectedObj);

//         }
//       })
//   }

//   getInvoicPaymentTerm() {
//     //alert('aa');
//     this.pay_day = this.form.controls.txtEinvoicePaytermDays.value;
//     if (this.pay_day == '') {
//       this.pay_day = 0;
//     }

//     this.utilityServiceAvaxPro.getPaymentTerm(this.pay_day).
//       subscribe(data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.lstInvoicePayterm = data.responseData[0];
//           // if(isFromOnchangeflg==true){
//           // console.log('isFromOnchangeflg = ',isFromOnchangeflg);
//           //this.form.controls.cmbEInvoicePayCode.setValue(this.lstInvoicePayterm[0].pt_code);
//           this.form.controls.cmbEInvoicePayCode.setValue('');
//           // }
//         }
//       })
//   }

//   get items(): FormArray { return this.form.get('arrayAddAdress') as FormArray; }


//   addNewAddressRow(index) {
//     this.selectedAddressIndex = index
//     let control = <FormArray>this.form.controls.arrayAddAdress;
//     control.push(
//       this.formBuilder.group({
//         txtVendorCode: [''],
//         txtDomainName: [''],
//         txtAddCode: [''],
//         txtAddrOne: [''],
//         txtAddrSecond: [''],
//         txtAddrThird: [''],
//         txtAddrFourth: [''],
//         cmbCountry: [''],
//         cmbState: [''],
//         txtCity: [''],
//         txtPinCode: [''],
//         txtLattitude: [''],
//         txtLongitude: [''],
//         txtTelNoOne: [''],
//         txtTelNoSecond: [''],
//         txtStdCode: [''],
//         txtIsdCode: [''],
//         txtFaxNoOne: [''],
//         txtFaxNoSecond: [''],
//         txtEmailIdOne: [''],
//         txtEmailIdSecond: [''],
//         txtHotLineNo: [''],
//         txtMobileNo: [''],
//         txtGstNo: [''],
//         cmbTaxType: [''],
//         cmbTransporter: [''],
//       })
//     )
//     this.getCountryList(index);

//     this.getrows = this.form.get('arrayAddAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     this.addressCodeArray[index] = this.addressCode

//     this.formGroup.controls.txtAddCode.setValue(this.addressCode);
//     this.formGroup.controls.txtGstNo.setValue(this.defaultGst)
//   }

//   initAddedAddressRow(index, current_row) {
//     this.selectedEditAddrIndex = index
//     let control = <FormArray>this.form.controls.arrayEditAdress;
//     control.push(
//       this.formBuilder.group({
//         txtEVendorCode: [''],
//         txtEDomainName: [''],
//         txtEAddCode: [''],
//         txtEAddrOne: [''],
//         txtEAddrSecond: [''],
//         txtEAddrThird: [''],
//         txtEAddrFourth: [''],
//         cmbECountry: [''],
//         cmbEState: [''],
//         txtECity: [''],
//         txtEPinCode: [''],
//         txtELattitude: [''],
//         txtELongitude: [''],
//         txtETelNoOne: [''],
//         txtETelNoSecond: [''],
//         txtEFaxNoOne: [''],
//         txtEStdCode: [''],
//         txtEIsdCode: [''],
//         txtEFaxNoSecond: [''],
//         txtEEmailIdOne: [''],
//         txtEEmailIdSecond: [''],
//         txtEHotLineNo: [''],
//         txtEMobileNo: [''],
//         txtEGstNo: [''],
//         cmbETaxType: [''],
//         cmbETransporter: ['']
//       })
//     )
//     this.getCountryEList(index);

//     this.lstETax[index] = this.lstDummyTax
//     this.lstETransporter[index] = this.lstDummyTransporter

//     this.getrows = this.form.get('arrayEditAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     this.formGroup.controls.txtEVendorCode.setValue(current_row.csad_vendor_code)
//     this.formGroup.controls.txtEDomainName.setValue(current_row.csad_domain_name)
//     this.formGroup.controls.txtEAddCode.setValue(current_row.csad_addr_code)
//     this.formGroup.controls.txtEAddrOne.setValue(current_row.csad_address1)
//     this.formGroup.controls.txtEAddrSecond.setValue(current_row.csad_address2)
//     this.formGroup.controls.txtEAddrThird.setValue(current_row.csad_address3)
//     this.formGroup.controls.txtECity.setValue(current_row.csad_city)
//     this.formGroup.controls.txtEPinCode.setValue(current_row.csad_pincode)
//     this.formGroup.controls.txtELattitude.setValue(current_row.csad_latitude)
//     this.formGroup.controls.txtELongitude.setValue(current_row.csad_longitude)
//     this.formGroup.controls.txtETelNoOne.setValue(current_row.csad_tel_no1)
//     this.formGroup.controls.txtETelNoSecond.setValue(current_row.csad_tel_no2)
//     this.formGroup.controls.txtEStdCode.setValue(current_row.csad_std_code)
//     this.formGroup.controls.txtEIsdCode.setValue(current_row.csad_isd_code)
//     this.formGroup.controls.txtEFaxNoOne.setValue(current_row.csad_fax_1)
//     this.formGroup.controls.txtEFaxNoSecond.setValue(current_row.csad_fax_2)
//     this.formGroup.controls.txtEEmailIdOne.setValue(current_row.csad_email_1)
//     this.formGroup.controls.txtEEmailIdSecond.setValue(current_row.csad_email_2)
//     this.formGroup.controls.txtEHotLineNo.setValue(current_row.csad_hotline_no)
//     this.formGroup.controls.txtEMobileNo.setValue(current_row.csad_mobile_no)
//     if (current_row.csad_gst_no != "") {
//       this.formGroup.controls.txtEGstNo.setValue(current_row.csad_gst_no)
//     } else {
//       this.formGroup.controls.txtEGstNo.setValue(this.defaultGst)
//     }
    
//     if (current_row.csad_email_flg != '') {
//       this.csad_email_flg[index] = current_row.csad_email_flg
//     } else {
//       this.csad_email_flg[index] = 'N'
//     }

//     this.countryArray[index] = current_row.csad_country_code
//     this.formGroup.controls.cmbECountry.setValue(current_row.csad_country_code)

//     this.getESetStateDropdown(index, current_row.csad_state_code)

//     /*this.lstETax[index] = this.lstDummyTax
//     this.lstETransporter[index] = this.lstDummyTransporter
//     */

//     if (current_row.csad_tax_type == null || current_row.csad_tax_type == "" || current_row.csad_tax_type == undefined) {
//     } else {
//       this.formGroup.controls.cmbETaxType.setValue(current_row.csad_tax_type)
//     }

//     if (current_row.csad_transporter_code == null || current_row.csad_transporter_code == "" || current_row.csad_transporter_code == undefined) {

//     } else {
//       const toSelectedTransp = this.lstETransporter[index].find(c => c.tr_code == current_row.csad_transporter_code)
//       this.formGroup.controls.cmbETransporter.setValue(toSelectedTransp)
//     }
//   }

//   checkDraftValidation(): any {

//     console.log(" checkDraftValidation **********", this.form.value)

//     if (this.form.get('txtSupplierName').value == '' || this.form.get('txtSupplierName').value == null) {
//       this.openSnackBar('Please Enter Supplier Name');
//       return false;
//     }

//     if (this.form.get('cmbIndustry').value == '' || this.form.get('cmbIndustry').value == null) {
//       this.openSnackBar('Please Select Industry Head Code');
//       return false;
//     }

//     this.list_map = [];
//     this.gst_list = [];
//     this.tempDatasource.forEach(item => {
//       if (this.form.get('chkcmp' + item.sc_company_code).value == true) {
//         this.list_map.push({ "sc_name": item.sc_name, "sc_company_code": item.sc_company_code, "sc_company_short_name": item.sc_company_short_name })
//         this.gst_list.push({ "gst_flg": this.form.get('rdbflag' + item.sc_company_code).value })
//       }
//     })

//     if (this.list_map.length == 0) {
//       this.openSnackBar('Please select COMPANY. ');
//       return false;
//     }

//     let regAplhaNum = /^\d*[a-zA-Z][a-zA-Z\d]*$/;
//     if (this.form.get('txtifscCode').value != "") {

//       if (!isNaN(this.form.get('txtifscCode').value)) {
//         this.openSnackBar("Please Enter Only AlphaNumeric Value ");
//         return false;
//       }
//       if (!this.form.get('txtifscCode').value.match(regAplhaNum)) {
//         this.openSnackBar("Please Dont Enter Special Characters For RTGS/IFSC CODE  ");
//         return false;
//       }
//     }

//     if (this.form.get('txtaccno').value != "") {
//       if (this.form.get('txtaccno').value == "") {
//         this.openSnackBar("Please Dont Give Space for ACCOUNT NUMBER  ");
//         return false;
//       }
//     }

//     if (this.form.get('txtemailID').value != "") {
//       if (!this.chkEmailRegx.test(this.form.get('txtemailID').value)) {
//         this.openSnackBar("Please Enter a valid email address")
//         return false
//       }
//     }

//     if (this.form.get('txtFileNo').value != "") {
//       if (this.form.get('txtFileNo').value == "") {
//         this.openSnackBar("Please Dont Give Space for File No  ");
//         return false;
//       }
//     }

//     /*
//      let regex = /^[a-zA-Z]*$/;
//      if (!regex.test(this.form.get('txtbankbranch').value)) {
//       this.openSnackBar("Please Dont Enter Special Characters For BANK BRANCH  ");
//       return false;
//     } */

//     if (this.form.get("txtcrlimit").value == "") {
//       this.openSnackBar("Enter a value for Credit Limit");
//       return false;
//     }

//     if (isNaN(this.form.get("txtcrlimit").value)) {
//       this.openSnackBar("Enter a numeric value for Credit Limit");
//       return false;
//     }

//     if (parseInt(this.form.get("txtcrlimit").value) < 0) {
//       this.openSnackBar("Credit Limit Should Be >=0");
//       return false;
//     }

//     if ((this.form.get("txtpaytermdays").value).length == 0) {
//       this.openSnackBar("Enter a numeric value for Pay Term Days");
//       return false;
//     }
//     if (isNaN(this.form.get("txtpaytermdays").value)) {
//       this.openSnackBar("Enter a numeric value for Pay Term Days");
//       return false;
//     }

//     let dot = this.form.get("txtpaytermdays").value.toString().indexOf(".");
//     if (dot != -1) {
//       this.openSnackBar("Pay Term Days cant be decimal");
//       return false;
//     }

//     if (parseInt(this.form.get("txtcrlimit").value) == 0 && parseInt(this.form.get("txtpaytermdays").value) > 0) {
//       this.openSnackBar("If Cr.Limit is zero then Pay terms must be zero!!");
//       return false;
//     }

//     if (parseInt(this.form.get("txtcrlimit").value) > 0 && parseInt(this.form.get("txtpaytermdays").value) == 0) {
//       this.openSnackBar("If Pay Terms is zero then Credit Limit must be zero!!");
//       return false;

//     }

//     if (this.form.get('cmbPayterms').value == '' || this.form.get('cmbPayterms').value == null) {
//       this.openSnackBar('Please select Pay Code');
//       return false;
//     }

//     let venCode = /^[a-zA-Z0-9]*$/;
//     if (this.form.get("txtvendorCode").value != "") {
//       if (!this.form.get("txtvendorCode").value.match(venCode)) {
//         this.openSnackBar("Please Enter Valid Vendor Code  ");
//         return false;

//       }
//     }

//     if (this.form.get('txtHandledBy').value == '' || this.form.get('txtHandledBy').value == null) {
//       this.openSnackBar('Handled By Can Not Be Blank');
//       return false;
//     }

//     if (this.form.get('txtInstructedBy').value == '' || this.form.get('txtInstructedBy').value == null) {
//       this.openSnackBar('INSTRUCTED By Can Not Be Blank');
//       return false;
//     }

//     if (this.form.get('txtFollowedBy').value == '' || this.form.get('txtFollowedBy').value == null) {
//       this.openSnackBar('FOLLOWED By Can Not Be Blank');
//       return false;
//     }
//     return true;
//   }//end of func


//   saveSupplierDraft() {

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
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//       cd_name: this.form.get('txtSupplierName').value,
//       cs_cust_supplr_flg: 'S',
//       cd_industry_head_code: this.form.get('cmbIndustry').value != undefined ? this.form.get('cmbIndustry').value : '',
//       cd_type: this.form.get('cmdtypesupp').value != undefined ? this.form.get('cmdtypesupp').value : '',
//       cs_ts_origin: this.form.get('txtdatetime').value != "" ? this.getFormattedDate(this.form.get('txtdatetime').value) : 'NO_DATE',
//       cd_file_no: this.form.get('txtFileNo').value,
//       cd_grp_code: this.form.get('txtgrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("txtgrpCode").value.cs_cust_supplr_code : '',
//       cd_registration_no: this.form.get("txtRegNo").value,
//       cs_group_stpg_flg: this.form.get('rdbgrpstopegges').value,
//       cd_allow_special_tax: this.form.get('rdbspecailtax').value,
//       cd_bank_name: this.form.get('cmbBank').value.bnk_code_branch_code != undefined ? this.form.get('cmbBank').value.bnk_code_branch_code : '',
//       cd_bank_branch: this.form.get('txtbankbranch').value,
//       cd_bank_address: this.form.get('txtbankadd').value,
//       cd_account_no: this.form.get('txtaccno').value,
//       cd_rtgs_code: this.form.get('txtifscCode').value,
//       cs_bank_contact_name: this.form.get('txtcontactName').value != undefined ? this.form.get('txtcontactName').value : '',
//       cs_bank_email_id: this.form.get('txtemailID').value != undefined ? this.form.get('txtemailID').value : '',
//       cd_credit_limit: this.form.get('txtcrlimit').value != undefined ? this.form.get('txtcrlimit').value : '0',
//       cd_pay_terms_day: this.form.get('txtpaytermdays').value,
//       cd_pay_code: this.form.get('cmbPayterms').value.pt_code != undefined ? this.form.get('cmbPayterms').value.pt_code : '',
//       cd_vendor_code: this.form.get('txtvendorCode').value,
//       cd_inst_by: this.form.get('txtInstructedBy').value.usr_userid,
//       cd_handled_by: this.form.get('txtHandledBy').value.usr_userid,
//       cd_foll_by: this.form.get('txtFollowedBy').value.usr_userid,
//       cd_pan_no: this.form.get('txtPanNo').value,
//       cd_uan_no: this.form.get('txtuanNo').value,
//       cd_deleted_flg: 'N',
//       cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//       companyList: this.list_map,
//       gstFillingList: this.gst_list,
//       contactDto: this.contactArray,
//       custAddrDto: this.custAddressArray,
//     }

//     this.customerMasterService.completeSupplierVendor(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//         this.cust_supplr_code = data.responseData[1]
//         this.cust_supplr_name = data.responseData[2]
//         this.custAddressArray = []
//         this.custContactArray = []

//         if (data.responseData[0] == "INSERTED SUCCESSFULLY") {

//           this.openSnackBar("supplier INSERTED SUCCESSFULLY and supplier code is " + this.cust_supplr_code);
//           this.hideBtnDiv = true
//           let datastr = {
//             cust_supplr_code: this.cust_supplr_code,
//             cust_supplr_name: '',
//             flgModify: "Y",
//             flgAuthorize: 'N',
//             cs_authorised: "",
//             userInformationDto: {
//               usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//               usr_name: atob(sessionStorage.getItem(btoa('username'))),
//               fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//               fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//               fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//               usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//               usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//               usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//               usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//               usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//               usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//             },
//           }
//           sessionStorage.setItem("stateData", JSON.stringify(datastr));
//           this.router.navigate(['/session/master/customer-draft-master/supplier'], { state: datastr });
//           this.showIconFLg = false
//           this.tabGroup.selectedIndex = 0
//           return true;
//         }else{
//           this.openSnackBar("Error While updating supplier details");
//         return false;
//         }

//       } else {
//         this.openSnackBar("Error While updating supplier details");
//         return false;
//       }
//     },
//     error => {
//       this.openSnackBar("Error While updating supplier details");
//       return false;
//     })

//   }

//   getFormattedDate(res: any) {
//     const format = 'dd-MM-yyyy';
//     const locale = 'en-US';
//     const formattedDate = formatDate(res, format, locale);
//     return formattedDate
//   }

//   getCountryList(index) {
//     this.utilityServiceAvaxPro.getCountryList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.countryLists[index] = data.responseData[0].map(item => {
//             if (item.ctr_home_country_flg == 'Y') {
//               this.getrows = this.form.get('arrayAddAdress') as FormArray;
//               this.aryTableControl = this.getrows.controls;
//               this.formGroup = this.aryTableControl[index] as FormGroup;
//               this.formGroup.controls.cmbCountry.setValue(item.ctr_code)
//               this.onCountryChange('', index);
//             }
//             return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
//           })
//         }
//         return this.countryLists[index]
//       }
//     )
//   }

//   getCountryEList(index) {
//     this.utilityServiceAvaxPro.getCountryList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.countryELists[index] = data.responseData[0].map(item => {
//             /*  if (item.ctr_home_country_flg == 'Y') {
//                this.getrows = this.form.get('arrayEditAdress') as FormArray;
//                this.aryTableControl = this.getrows.controls;
//                this.formGroup = this.aryTableControl[index] as FormGroup;
//                this.formGroup.controls.cmbCountry.setValue(item.ctr_code)
//                this.onCountryEChange('', index);
//              } */
//             return new CountryListModel(item.ctr_code, item.ctr_desc, item.ctr_home_country_flg)
//           })
//         }
//         return this.countryELists[index]
//       }
//     )
//   }

//   onCountryEChange(event, index) {
//     console.log('onCountryEChange', event.value);

//     this.getrows = this.form.get('arrayEditAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;
//     this.st_ctr_code = this.formGroup.controls.cmbECountry.value;
//     this.getStateEDropdown(this.st_ctr_code, index);
//   }

//   getStateEDropdown(st_ctr_code, index) {
//     this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
//       if (data.responseData[0].length == 0) {
//         this.stateELists[index] = null;
//         new StateMasterListModel('', '')
//         return false;
//       } else {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.stateELists[index] = data.responseData[0].map(item => {
//             return new StateMasterListModel(item.st_code, item.st_state)
//           })
//         }
//         return this.stateELists[index]
//       }
//     })
//   }

//   onCountryChange(event, index) {
//     console.log('event', event.value);

//     this.getrows = this.form.get('arrayAddAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;
//     this.st_ctr_code = this.formGroup.controls.cmbCountry.value
//     this.getStateDropdown(this.st_ctr_code, index);
//   }

//   getStateDropdown(st_ctr_code, index) {
//     this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
//       if (data.responseData[0].length == 0) {
//         this.stateLists[index] = null;
//         new StateMasterListModel('', '')
//         return false;
//       } else {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.stateLists[index] = data.responseData[0].map(item => {
//             return new StateMasterListModel(item.st_code, item.st_state)
//           })
//         }
//         return this.stateLists[index]
//       }
//     })
//   }

//   openSnackBar(message) {
//     this.snackBar.openFromComponent(CommonSnackbarComponent, {
//       data: message,
//       duration: 10000
//     });
//   }

//   saveSupplierAddress(index) {

//     console.log(" index ", index)

//     this.getrows = this.form.get('arrayAddAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     this.getAddressData();

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
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//       cd_cust_supplr_code: this.cust_supplr_code,
//       cs_cust_supplr_flg: 'S',
//       cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
//       cd_pan_no: this.form.controls.txtEPanNo.value != undefined ? this.form.controls.txtEPanNo.value : '-',
//       custAddrDto: this.custAddressArray,
//     }

//     this.customerMasterService.saveSupplierVendorAddress(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//         // console.log(" data.responseData ", data.responseData)
//         // this.openSnackBar(" Address Details Inserted Successfully");
//         this.newAddressIndex=-1
//         this.openSnackBar(" Supplier details updated successfully ")
//         this.getUpdatedSupplierDetail(this.cust_supplr_code)
//         this.custContactArray = []
//         this.custAddressArray = []
//         this.tabGroup.selectedIndex = 0

//         this.resetAddressEntryRow(index)

//         this.lstAddedAdress = data.responseData
//         if (this.lstAddedAdress.length > 0) {
//           this.showIconFLg = true
//           for (let index = 0; index < this.lstAddedAdress.length; index++) {
//             this.initAddedAddressRow(index, this.lstAddedAdress[index])
//             this.addressCode = this.lstAddedAdress[index].csad_addr_code
//           }
//           this.addressCode = (Number(this.addressCode) + 1)

//           this.addressCodeArray[0] = this.addressCode

//           this.getrows = this.form.get('arrayAddAdress') as FormArray;
//           this.aryTableControl = this.getrows.controls;
//           this.formGroup = this.aryTableControl[0] as FormGroup;
//           this.formGroup.controls.txtAddCode.setValue(this.addressCode)
//           this.formGroup.controls.txtGstNo.setValue(this.defaultGst)

//           this.items.removeAt(0);

//         }

//         return true;
//       } else {
//         this.openSnackBar("Error While Inserting");
//         return false;
//       }
//     })

//   }

//   resetAddressEntryRow(index) {
//     console.log(" resetAddressEntryRow index ", index)
//     if (index != -1) {
//       this.formGroup.controls.txtVendorCode.setValue('')
//       this.formGroup.controls.txtDomainName.setValue('')
//       this.formGroup.controls.txtAddCode.setValue('')
//       this.formGroup.controls.txtAddrOne.setValue('')
//       this.formGroup.controls.txtAddrSecond.setValue('')
//       this.formGroup.controls.txtAddrThird.setValue('')
//       this.formGroup.controls.txtAddrFourth.setValue('')
//       this.formGroup.controls.cmbCountry.setValue('')
//       this.formGroup.controls.cmbState.setValue('')
//       this.formGroup.controls.txtCity.setValue('')
//       this.formGroup.controls.txtPinCode.setValue('')
//       this.formGroup.controls.txtLattitude.setValue('')
//       this.formGroup.controls.txtLongitude.setValue('')
//       this.formGroup.controls.txtTelNoOne.setValue('')
//       this.formGroup.controls.txtTelNoSecond.setValue('')
//       this.formGroup.controls.txtStdCode.setValue('')
//       this.formGroup.controls.txtIsdCode.setValue('')
//       this.formGroup.controls.txtFaxNoOne.setValue('')
//       this.formGroup.controls.txtFaxNoSecond.setValue('')
//       this.formGroup.controls.txtEmailIdOne.setValue('')
//       this.formGroup.controls.txtEmailIdSecond.setValue('')
//       this.formGroup.controls.txtHotLineNo.setValue('')
//       this.formGroup.controls.txtMobileNo.setValue('')
//       this.formGroup.controls.txtGstNo.setValue('')
//       this.formGroup.controls.cmbTaxType.setValue('')
//       this.formGroup.controls.cmbTransporter.setValue('')
//     }
//   }

//   ngOnDestroy() {
//     sessionStorage.removeItem("refData");
//   }

//   getSupplierDetail(cust_supplier_code) {

//     this.payload = {
//       cd_cust_supplr_code: cust_supplier_code,
//       cs_cust_supplr_flg: 'S',
//       cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       cd_ts_created: atob(sessionStorage.getItem(btoa('userId'))),
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
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//     }

//     this.customerMasterService.getSupVendModifyData(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//         this.lstSupDetail = data.responseData[0][0]//data list
//         console.log(" this.lstSupDetail in main call ", this.lstSupDetail)

//         this.addressview = true
//         this.addedFlag = false
//         this.showAddAddrRowFlag = true

//         this.lstDummyTax = data.responseData[6] //tax_list
//         this.lstDummyTransporter = data.responseData[7] //transporter_list

//         this.lstAddedAdress = data.responseData[4]
//         if (this.lstAddedAdress.length > 0) {
//           this.showIconFLg = true
//           for (let index = 0; index < this.lstAddedAdress.length; index++) {
//             this.initAddedAddressRow(index, this.lstAddedAdress[index])
//             this.addressCode = this.lstAddedAdress[index].csad_addr_code
//           }
//           this.addressCode = (Number(this.addressCode) + 1)
//         } else {
//           this.showIconFLg = false
//           this.addressCode = 1
//           this.addNewAddressRow(0)
//         }

//         this.sisConcernLists[0] = data.responseData[1]

//         this.form.get("txtESupplierName").setValue(this.lstSupDetail.cs_name)
//         this.form.get("txtEVendorCode").setValue(this.lstSupDetail.cs_vendor_code)
//         this.form.get("txtEPanNo").setValue(this.lstSupDetail.cs_pan_no)
//         this.form.get("txtEMsmeUanNo").setValue(this.lstSupDetail.cs_msme_uan_no)
//         this.form.get("txtECrLimit").setValue(this.lstSupDetail.cs_credit_limit.toString())
//         this.form.get("txtEPaytermDays").setValue(this.lstSupDetail.cs_pay_terms_day)
//        // this.form.get("txtEinvoicePaytermDays").setValue(this.lstSupDetail.cs_inv_pay_term_days)
//         this.form.get("txtEManualSPInstrCode").setValue(this.lstSupDetail.cs_sp_instr_manual)
//         this.form.get("txtEFileNo").setValue(this.lstSupDetail.cs_file_no)
//         this.form.get("txtEPayDay").setValue(this.lstSupDetail.cs_pay_day)
//         //this.form.get("txtOuterCrLimit").setValue(this.lstSupDetail.cs_outer_credit_limit)
//         this.form.get("txtOsInterest").setValue(this.lstSupDetail.cs_per_intr_os_amt)
//         this.form.get("txtEBankBranch").setValue(this.lstSupDetail.cs_bank_branch)
//         this.form.get("txtEBankAddr").setValue(this.lstSupDetail.cs_bank_address)
//         this.form.get("txtEAccNo").setValue(this.lstSupDetail.cs_account_no)
//         this.form.get("txtEIfscCode").setValue(this.lstSupDetail.cs_rtgs_code == null || this.lstSupDetail.cs_rtgs_code == undefined ||
//           this.lstSupDetail.cs_rtgs_code == '' ? '' : this.lstSupDetail.cs_rtgs_code)
//         this.form.get("txtEContactName").setValue(this.lstSupDetail.cs_bank_contact_name)
//         this.form.get("txtEEmailId").setValue(this.lstSupDetail.cs_bank_email_id)


//         this.ccs_gst_filing_frequency = this.lstSupDetail['ccs_gst_filing_frequency']

//         // this.form.get("rdbBtnGstPeriod").setValue(this.lstSupDetail.ccs_gst_filing_frequency)

//         this.lstCustOf = data.responseData[1]//cust_of list

//         this.lstAccHandledBy = data.responseData[2]//cust_of list

//         this.lstSPInstructed = data.responseData[3] //sp_instructed_list

//         //set values 
//         if(this.lstSupDetail.cs_cust_of != null && this.lstSupDetail.cs_cust_of != " ")
//         {
//            this.cs_cust_of = this.lstSupDetail.cs_cust_of
//         }
//         else{
//           this.cs_cust_of =  atob(sessionStorage.getItem(btoa('usr_of_siscon')))
//         }
//         //cust grp code
//         if(data.responseData[9].extended_company == 'N'){
//           this.extended_company="Not Extended in Logged in Company"
//         }else{
//           this.extended_company=""
//         }
//         if (this.lstSupDetail.cs_grp_code.length > 0) {
//           this.form.get('cmbEGrpCode').setValue(new GroupCodeModel(this.lstSupDetail.cs_grp_code, this.lstSupDetail.cs_grp_name));
//         }

//         this.form.get('cmbEGrpCode').valueChanges.pipe(debounceTime(100), tap(() => {
//           this.filteredAccLists = new Array<GroupCodeModel>()
//         }),
//           switchMap(value => {
//             if (value != null || value != undefined) {
//               value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//               return value.length > 3 ? this.getAccountList(value) : ['']
//             }
//           })
//         ).subscribe(data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//             this.filteredAccLists = data.responseData[0].map(item => {
//               return new GroupCodeModel
//                 (item.cs_cust_supplr_code, item.cs_name)
//             })
//           }
//           return this.filteredAccLists
//         },
//           error => {
//             console.log(error)
//           }
//         )

//         this.cs_group_stpg_flg = this.lstSupDetail['cs_group_stpg_flg']

//         console.log('this.lstSupDetail.cs_acc_handled_by = ', this.lstSupDetail.cs_acc_handled_by);

//         if (this.lstSupDetail.cs_acc_handled_by == '' || this.lstSupDetail.cs_acc_handled_by == null ||
//           this.lstSupDetail.cs_acc_handled_by == undefined) {
//         } else {
//           const toSelectedAccHandledBy = this.lstAccHandledBy.find(c => c.br_branch_code == this.lstSupDetail['cs_acc_handled_by'])
//           console.log(" toSelectedAccHandledBy ", toSelectedAccHandledBy)
//           if(toSelectedAccHandledBy!=undefined){
//             this.form.get('cmbEAccHandledBy').setValue(toSelectedAccHandledBy.br_branch_code);
//           }
//         }

//         this.form.controls.txtEPaytermDays.setValue(this.lstSupDetail['cs_pay_terms_day'])

//         //cs_inv_pay_code

//        /*  console.log('this.lstSupDetail.cs_inv_pay_code = ', this.lstSupDetail.cs_inv_pay_code);
//         if (this.lstSupDetail.cs_inv_pay_code == null || this.lstSupDetail.cs_inv_pay_code == '' ||
//           this.lstSupDetail.cs_inv_pay_code == undefined) { } else {
//           this.form.get('cmbEInvoicePayCode').setValue(this.lstSupDetail.cs_inv_pay_code);
//         } */

//         this.cs_industry_head_code = this.lstSupDetail['cs_industry_head_code']
//         this.cs_legal_warning_flg = this.lstSupDetail['cs_legal_warning_flg']
//         this.cs_type = this.lstSupDetail['cs_type']

//         this.getModifyHandledByDropdown()

//         this.filteredIntroByUserLists = this.form.get('txtEIntroByUser').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.cs_ask_reference = this.lstSupDetail['cs_ask_reference']


//         this.cs_pay_code = this.lstSupDetail['cs_pay_code']

//         this.getModifyPaymentTerm()
//         console.log(" this.lstPayterm ", this.lstPayterm)



//         this.cs_override_pay = this.lstSupDetail['cs_override_pay']

//         this.filteredDocHandledByLists = this.form.get('txtEDocHandledBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredInstructedByLists = this.form.get('txtEInstructedBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredHandledByLists = this.form.get('txtEHandledBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredFollowedByLists = this.form.get('txtEFollowedBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredSPInstructedByLists = this.form.get('txtESPInstructedBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredDispatchInfoLists = this.form.get('txtEDispatchInfo').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredGuaranteedByLists = this.form.get('txtEGuaranBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )
//         this.cs_allow_special_tax = this.lstSupDetail['cs_allow_special_tax']

//         this.toSelectedBank = this.lstSupDetail['cs_bank_name']
//         console.log(" toSelectedBank ", this.toSelectedBank)

//         this.lstTax[0] = this.lstDummyTax
//         this.lstTransporter[0] = this.lstDummyTransporter

//         this.lstAddedContact = data.responseData[5]
//         this.setContactData(this.lstAddedContact)

//       }
//       else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109'){
//         this.router.navigate(['/session/master/customer-draft-master/'])
//         UtilityServiceAvaxPro.showErrMessage(this.snackBar,data.message)
//       }
//     })
//   }

//   getUpdatedSupplierDetail(cust_supplier_code) {

//     this.payload = {
//       cd_cust_supplr_code: cust_supplier_code,
//       cs_cust_supplr_flg: 'S',
//       cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       cd_ts_created: atob(sessionStorage.getItem(btoa('userId'))),
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
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//     }

//     this.customerMasterService.getSupVendModifyData(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//         this.lstSupDetail = data.responseData[0][0]//data list
//         //   console.log(" this.lstSupDetail in main call ", this.lstSupDetail)

//         this.addressview = true
//         this.addedFlag = false
//         this.showAddAddrRowFlag = true

//         this.lstDummyTax = data.responseData[6] //tax_list
//         this.lstDummyTransporter = data.responseData[7] //transporter_list

//         this.lstAddedAdress = data.responseData[4]
//         if (this.lstAddedAdress.length > 0) {
//           this.showIconFLg = true
//           for (let index = 0; index < this.lstAddedAdress.length; index++) {
//             this.initAddedAddressRow(index, this.lstAddedAdress[index])
//             this.addressCode = this.lstAddedAdress[index].csad_addr_code
//           }
//           this.addressCode = (Number(this.addressCode) + 1)
//         } else {
//           this.showIconFLg = false
//           this.addressCode = 1
//           this.addNewAddressRow(0)
//         }

//         this.sisConcernLists[0] = data.responseData[1]
//         console.log(this.lstSupDetail, ' lstSupDetail ')
//         this.form.get("txtESupplierName").setValue(this.lstSupDetail.cs_name)
//         this.form.get("txtEVendorCode").setValue(this.lstSupDetail.cs_vendor_code)
//         this.form.get("txtEPanNo").setValue(this.lstSupDetail.cs_pan_no)
//         this.form.get("txtEMsmeUanNo").setValue(this.lstSupDetail.cs_msme_uan_no)
//         this.form.get("txtECrLimit").setValue(this.lstSupDetail.cs_credit_limit)
//         this.form.get("txtEPaytermDays").setValue(this.lstSupDetail.cs_pay_terms_day)
//        // this.form.get("txtEinvoicePaytermDays").setValue(this.lstSupDetail.cs_inv_pay_term_days)
//         this.form.get("txtEManualSPInstrCode").setValue(this.lstSupDetail.cs_sp_instr_manual)
//         this.form.get("txtEFileNo").setValue(this.lstSupDetail.cs_file_no)
//         this.form.get("txtEPayDay").setValue(this.lstSupDetail.cs_pay_day)
//         //this.form.get("txtOuterCrLimit").setValue(this.lstSupDetail.cs_outer_credit_limit)
//         this.form.get("txtOsInterest").setValue(this.lstSupDetail.cs_per_intr_os_amt)
//         this.form.get("txtEBankBranch").setValue(this.lstSupDetail.cs_bank_branch)
//         this.form.get("txtEBankAddr").setValue(this.lstSupDetail.cs_bank_address)
//         this.form.get("txtEAccNo").setValue(this.lstSupDetail.cs_account_no)
//         this.form.get("txtEIfscCode").setValue(this.lstSupDetail.cs_rtgs_code == null ||
//           this.lstSupDetail.cs_rtgs_code == undefined || this.lstSupDetail.cs_rtgs_code == '' ? '' : this.lstSupDetail.cs_rtgs_code)
//         this.form.get("txtEContactName").setValue(this.lstSupDetail.cs_bank_contact_name)
//         this.form.get("txtEEmailId").setValue(this.lstSupDetail.cs_bank_email_id)


//         this.lstCustOf = data.responseData[1]//cust_of list

//         this.lstAccHandledBy = data.responseData[2]//cust_of list

//         this.lstSPInstructed = data.responseData[3] //sp_instructed_list

//         //set values 
//         this.cs_cust_of = this.lstSupDetail.cs_cust_of

//         //cust grp code

//         if (this.lstSupDetail.cs_grp_code.length > 0) {
//           this.form.get('cmbEGrpCode').setValue(new GroupCodeModel(this.lstSupDetail.cs_grp_code, this.lstSupDetail.cs_grp_name));
//         }

//         this.form.get('cmbEGrpCode').valueChanges.pipe(debounceTime(100), tap(() => {
//           this.filteredAccLists = new Array<GroupCodeModel>()
//         }),
//           switchMap(value => {
//             if (value != null || value != undefined) {
//               value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//               return value.length > 3 ? this.getAccountList(value) : ['']
//             }
//           })
//         ).subscribe(data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//             this.filteredAccLists = data.responseData[0].map(item => {
//               return new GroupCodeModel
//                 (item.cs_cust_supplr_code, item.cs_name)
//             })
//           }
//           return this.filteredAccLists
//         },
//           error => {
//             console.log(error)
//           }
//         )

//         this.cs_group_stpg_flg = this.lstSupDetail['cs_group_stpg_flg']


//         if (this.lstSupDetail.cs_acc_handled_by == '' || this.lstSupDetail.cs_acc_handled_by == null ||
//           this.lstSupDetail.cs_acc_handled_by == undefined) {
//         } else {
//           const toSelectedAccHandledBy = this.lstAccHandledBy.find(c => c.br_branch_code == this.lstSupDetail['cs_acc_handled_by'])
//           console.log(" toSelectedAccHandledBy ", toSelectedAccHandledBy)
//           this.form.get('cmbEAccHandledBy').setValue(toSelectedAccHandledBy.br_branch_code);
//         }

//         //cs_inv_pay_code
//         this.form.controls.txtEPaytermDays.setValue(this.lstSupDetail['cs_pay_terms_day'])

//         /* console.log('this.lstSupDetail.cs_inv_pay_code = ', this.lstSupDetail.cs_inv_pay_code);
//         if (this.lstSupDetail.cs_inv_pay_code == null || this.lstSupDetail.cs_inv_pay_code == '' ||
//           this.lstSupDetail.cs_inv_pay_code == undefined) { } else {
//           this.form.get('cmbEInvoicePayCode').setValue(this.lstSupDetail.cs_inv_pay_code);
//         } */


//         this.cs_industry_head_code = this.lstSupDetail['cs_industry_head_code']
//         this.cs_legal_warning_flg = this.lstSupDetail['cs_legal_warning_flg']
//         this.cs_type = this.lstSupDetail['cs_type']

//         this.getModifyHandledByDropdown()

//         this.filteredIntroByUserLists = this.form.get('txtEIntroByUser').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.cs_ask_reference = this.lstSupDetail['cs_ask_reference']


//         this.cs_pay_code = this.lstSupDetail['cs_pay_code']
//         this.getModifyPaymentTerm()
//         console.log(" this.lstPayterm ", this.lstPayterm)


//         this.cs_override_pay = this.lstSupDetail['cs_override_pay']

//         this.filteredDocHandledByLists = this.form.get('txtEDocHandledBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredInstructedByLists = this.form.get('txtEInstructedBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredHandledByLists = this.form.get('txtEHandledBy').valueChanges.pipe(
//           startWith(''),
//           map(value => {
//             value =
//               typeof value == 'string' || value instanceof String
//                 ? value
//                 : value.usr_name
//             return this.filterHandledBy(value)
//           })
//         )

//         this.filteredFollowedByLists = this.form.get('txtEFollowedBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredSPInstructedByLists = this.form.get('txtESPInstructedBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredDispatchInfoLists = this.form.get('txtEDispatchInfo').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.filteredGuaranteedByLists = this.form.get('txtEGuaranBy').valueChanges.pipe(
//           startWith(''),
//           map(
//             value => {
//               value =
//                 typeof value == 'string' || value instanceof String
//                   ? value
//                   : value.usr_name
//               return this.filterHandledBy(value)
//             })
//         )

//         this.cs_allow_special_tax = this.lstSupDetail['cs_allow_special_tax']

//         this.toSelectedBank = this.lstSupDetail['cs_bank_name']
//         console.log(" toSelectedBank ", this.toSelectedBank)

//         this.lstTax[0] = this.lstDummyTax
//         this.lstTransporter[0] = this.lstDummyTransporter

//         this.lstAddedContact = data.responseData[5]
//         this.setContactData(this.lstAddedContact)
//       }
//     })
//   }

//   checkModifyValidation(): any {

//     console.log(" checkModifyValidation **********", this.form.value)

//     if (this.form.get('txtESupplierName').value == '' || this.form.get('txtESupplierName').value == null) {
//       this.openSnackBar('Please Enter Supplier Name');
//       return false;
//     }

//     if (this.form.get('cmbEIndustry').value == '' || this.form.get('cmbEIndustry').value == null) {
//       this.openSnackBar('Please Select Industry Head Code');
//       return false;
//     }

//     let regAplhaNum = /^\d*[a-zA-Z][a-zA-Z\d]*$/;
//     if(this.form.get('txtEIfscCode').value!="")
//     {
//     if (this.utilityServiceAvaxPro.doTrim(this.form.get('txtEIfscCode').value) != "" && this.form.get('txtEIfscCode').value != null &&
//       this.form.get('txtEIfscCode').value != undefined
//       ) {
//       /* if (!isNaN(this.form.get('txtEIfscCode').value)) {
//         this.openSnackBar("Please Enter Only AlphaNumeric Value ");
//         return false;
//       } */
//       if (!this.form.get('txtEIfscCode').value.match(regAplhaNum)) {
//         this.openSnackBar("Please Dont Enter Special Characters For RTGS/IFSC CODE  ");
//         return false;
//       }
//     }
//   }
//     /* if (this.form.get('txtEEmailId').value != "") {
//       if (!this.chkEmailRegx.test(this.form.get('txtEEmailId').value)) {
//         this.openSnackBar("Please Enter a valid email address")
//         return false
//       }
//     } */
   
//     /*
//       let regex = /^[a-zA-Z]*$/;    
//      if (!regex.test(this.utilityServiceAvaxPro.doTrim(this.form.get('txtEBankBranch').value))) {
//       this.openSnackBar("Please Dont Enter Special Characters For BANK BRANCH  ");
//       return false;
//     } */

//     if ( this.utilityServiceAvaxPro.doTrim(this.form.get('txtECrLimit').value) == "") {
//       this.openSnackBar("Enter a value for Credit Limit");
//       return false;
//     }

//     if (isNaN(this.form.get("txtECrLimit").value)) {
//       this.openSnackBar("Enter a numeric value for Credit Limit");
//       return false;
//     }

//     if (parseInt(this.form.get("txtECrLimit").value) < 0) {
//       this.openSnackBar("Credit Limit Should Be >=0");
//       return false;
//     }

//     if ((this.form.get("txtEPaytermDays").value).length == 0) {
//       this.openSnackBar("Enter a numeric value for Pay Term Days");
//       return false;
//     }
//     if (isNaN(this.form.get("txtEPaytermDays").value)) {
//       this.openSnackBar("Enter a numeric value for Pay Term Days");
//       return false;
//     }

//     let dot = this.form.get("txtEPaytermDays").value.toString().indexOf(".");
//     if (dot != -1) {
//       this.openSnackBar("Pay Term Days cant be decimal");
//       return false;
//     }

//     if (parseInt(this.form.get("txtECrLimit").value) == 0 && parseInt(this.form.get("txtEPaytermDays").value) > 0) {
//       this.openSnackBar("If Cr.Limit is zero then Pay terms must be zero!!");
//       return false;
//     }

//     if (parseInt(this.form.get("txtECrLimit").value) > 0 && parseInt(this.form.get("txtEPaytermDays").value) == 0) {
//       this.openSnackBar("If Pay Terms is zero then Credit Limit must be zero!!");
//       return false;

//     }

//     if (this.form.get('cmbEPayCode').value == '' || this.form.get('cmbEPayCode').value == null) {
//       this.openSnackBar('Please select Pay Code');
//       return false;
//     }

//    /*  if ((this.form.get("txtEinvoicePaytermDays").value).length == 0) {
//       this.openSnackBar("Enter a numeric value for INVOICE Pay Term Days");
//       return false;
//     }
//     if (isNaN(this.form.get("txtEinvoicePaytermDays").value)) {
//       this.openSnackBar("Enter a numeric value for INVOICE Pay Term Days");
//       return false;
//     }

//     let dot1 = this.form.get("txtEinvoicePaytermDays").value.toString().indexOf(".");
//     if (dot1 != -1) {
//       this.openSnackBar("INVOICE Pay Term Days cant be decimal");
//       return false;
//     }

//     if (this.form.get('cmbEInvoicePayCode').value == '' || this.form.get('cmbEInvoicePayCode').value == null ||
//       this.form.get('cmbEInvoicePayCode').value == undefined) {
//       this.openSnackBar('Please select INVOICE Pay Code');
//       return false;
//     }
//  */
    
//     let venCode = /^[a-zA-Z0-9]*$/;
//     if (this.utilityServiceAvaxPro.doTrim(this.form.get('txtEVendorCode').value) != "" && this.form.get("txtEVendorCode").value != null &&
//       this.form.get("txtEVendorCode").value != undefined) {
//       if (!this.form.get("txtEVendorCode").value.match(venCode)) {
//         this.openSnackBar("Please Enter Valid Vendor Code  ");
//         return false;

//       }
//     }

//     if (this.form.get('txtEHandledBy').value == '' || this.form.get('txtEHandledBy').value == null) {
//       this.openSnackBar('Handled By Can Not Be Blank');
//       return false;
//     }

//     if (this.form.get('txtEInstructedBy').value == '' || this.form.get('txtEInstructedBy').value == null) {
//       this.openSnackBar('INSTRUCTED By Can Not Be Blank');
//       return false;
//     }

//     if (this.form.get('txtEFollowedBy').value == '' || this.form.get('txtEFollowedBy').value == null) {
//       this.openSnackBar('FOLLOWED By Can Not Be Blank');
//       return false;
//     }
//     return true;
//   }//end of func

//   //modify calls
//   updateSupplier() {

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
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//       cd_name: this.form.get('txtESupplierName').value,
//       cs_cust_supplr_flg: 'S',
//       cd_cust_supplr_code: this.cust_supplr_code,
//       cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
//       cs_cust_of: this.form.get('cmbECustOf').value != undefined ? this.form.get("cmbECustOf").value : '',
//       cd_grp_code: this.form.get('cmbEGrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("cmbEGrpCode").value.cs_cust_supplr_code : '',
//       cs_acc_handled_by: this.form.get('cmbEAccHandledBy').value == undefined ||
//         this.form.get('cmbEAccHandledBy').value == null ||
//         this.form.get('cmbEAccHandledBy').value == '' ? '' : this.form.get("cmbEAccHandledBy").value,
//       cd_industry_head_code: this.form.get('cmbEIndustry').value != undefined ? this.form.get('cmbEIndustry').value : '',
//       cs_legal_warning_flg: this.form.get("rdbELegalFlg").value,
//       cd_type: this.form.get('cmbETypeOfSupp').value != undefined ? this.form.get('cmbETypeOfSupp').value : '',
//       cs_intro_by_code: this.form.get('txtEIntroByUser').value.usr_userid != undefined ? this.form.get('txtEIntroByUser').value.usr_userid : '',
//       cs_intro_by: this.form.get('txtEIntroBy').value != undefined ? this.form.get("txtEIntroBy").value : '',
//       cs_ask_reference: this.form.get("rdbEAskRef").value,
//       cd_credit_limit: this.form.get('txtECrLimit').value != undefined ? this.form.get('txtECrLimit').value : '0',
//       cd_pay_terms_day: this.form.get('txtEPaytermDays').value,
//       cd_pay_code: this.form.get('cmbEPayCode').value.pt_code != undefined ? this.form.get('cmbEPayCode').value.pt_code : '',
//       //cd_inv_pay_term_days: this.form.get('txtEinvoicePaytermDays').value,
//       //cd_inv_pay_code: this.form.get('cmbEInvoicePayCode').value != undefined ? this.form.get('cmbEInvoicePayCode').value : '',
//       cs_override_pay: this.form.get('rdbEOverridePay').value,
//       cs_sp_instr_manual: this.form.get('txtESPInstructed').value != undefined ? this.form.get('txtESPInstructed').value : '',
//       cs_manual_sp_instr_by: this.form.get('txtESPInstructedBy').value.usr_userid != undefined ? this.form.get('txtESPInstructedBy').value.usr_userid : '',
//       cs_sp_instr_desc: this.form.get('txtEManualSPInstrCode').value != undefined ? this.form.get('txtEManualSPInstrCode').value : '',
//       cd_handled_by: this.form.get('txtEHandledBy').value.usr_userid,
//       cd_foll_by: this.form.get('txtEFollowedBy').value.usr_userid,
//       cd_inst_by: this.form.get("txtEInstructedBy").value.usr_userid,
//       cs_doc_handled_by: this.form.get('txtEDocHandledBy').value.usr_userid != undefined ? this.form.get('txtEDocHandledBy').value.usr_userid : '',
//       cs_dispatch_info_by: this.form.get('txtEDispatchInfo').value.usr_userid != undefined ? this.form.get('txtEDispatchInfo').value.usr_userid : '',
//       cd_file_no: this.form.get('txtEFileNo').value != undefined ? this.form.get("txtEFileNo").value : '',
//       cs_pay_day: this.form.get('txtEPayDay').value != undefined ? this.form.get('txtEPayDay').value : '',
//       cs_pay_date: this.getFormattedDate(this.form.get('txtEPayDate').value),
//       cs_guaranteed_by: this.form.get('txtEGuaranBy').value.usr_userid != undefined ? this.form.get('txtEGuaranBy').value.usr_userid : '',
//       cs_guaranteed_by_name: this.form.get('txtEGuaranName').value != undefined ? this.form.get('txtEGuaranName').value : '',
//       //cs_outer_credit_limit: this.form.get('txtOuterCrLimit').value != undefined ? this.form.get('txtOuterCrLimit').value : '',
//       cs_per_intr_os_amt: this.form.get('txtOsInterest').value != undefined ? this.form.get('txtOsInterest').value : '',
//       cs_group_stpg_flg: this.form.get('rdbEGrpStopegges').value,
//       cd_vendor_code: this.form.get('txtEVendorCode').value != undefined ? this.form.get("txtEVendorCode").value : '',
//       cd_pan_no: this.form.get('txtEPanNo').value != undefined ? this.form.get("txtEPanNo").value : '',
//       cd_bank_name: this.form.get('cmbEBank').value, //.bnk_code != undefined ? this.form.get('cmbEBank').value.bnk_code : '',
//       cd_bank_branch: this.form.get('txtEBankBranch').value != undefined ? this.form.get("txtEBankBranch").value : '',
//       cd_bank_address: this.form.get('txtEBankAddr').value != undefined ? this.form.get("txtEBankAddr").value : '',
//       cd_account_no: this.form.get('txtEAccNo').value != undefined ? this.form.get("txtEAccNo").value : '',
//       cd_rtgs_code: this.form.get('txtEIfscCode').value != undefined ? this.form.get("txtEIfscCode").value : '',
//       cs_bank_contact_name: this.form.get('txtEContactName').value != undefined ? this.form.get('txtEContactName').value : '',
//       cs_bank_email_id: this.form.get('txtEEmailId').value != undefined ? this.form.get('txtEEmailId').value : '',
//       cd_allow_special_tax: this.form.get('rdbEAllowTax').value,
//       cd_uan_no: this.form.get('txtEMsmeUanNo').value != undefined ? this.form.get("txtEMsmeUanNo").value : '',
//       cd_deleted_flg: 'N',
//       cd_aadhar_no: '',
//       cs_tds_section: '',
//       cs_sac_no: '',
//       contactDto: this.contactArray,
//       custAddrDto: this.custAddressArray,
//       cd_gst_period: this.form.get('rdbUpdateBtnGstPeriod').value,
//     }

//     console.log(" updateSupplierVendor ", this.payload)
//     this.customerMasterService.updateSupplierVendor(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

//         if(this.newAddressIndex>=0){
//           this.AddNewAddress(this.newAddressIndex);
//         }
//         else{
//           this.openSnackBar(" Supplier details updated successfully ")
//           this.getUpdatedSupplierDetail(this.cust_supplr_code)
//           this.custContactArray = []
//           this.custAddressArray = []
//           this.tabGroup.selectedIndex = 0
//           return true;  
//         }

//       } else {
//         this.openSnackBar("Error While updating supplier details");
//         return false;
//       }
//     })
//   }


//   AddNewAddress(index) {
//     console.log(" AddNewAddress ", index)

//     if (this.flgModify == 'Y') {
//       if (this.checkAddressValidation(this.selectedAddressIndex, "singleAddress")) {
//         if (this.validateGSTPAN(this.selectedAddressIndex, "singleAddress")) {
//           //validate gst pan and then call next process > save address
//         }
//       }
//     } else {
//       if (this.checkAddressValidation(index, "singleAddress")) {
//         if (this.validateGSTPAN(this.selectedAddressIndex, "singleAddress")) {
//           //validate gst pan and then call next process > add next row
//         }
//       }
//     }
//   }

//   completeSupplier() {

//     if (this.checkDraftValidation()) {

//       if (this.checkAddressValidation(this.selectedAddressIndex, "allAddress")) {

//         if (this.validateGSTPAN(this.selectedAddressIndex, "allAddress")) {
//           //check the validation for address and add next calls
//         }
//       }
//     }
//   }

//   modifySupplier() {

//     //header modification 
//     if (this.checkModifyValidation()) {

//       //validate addrss
//       if (this.checkModifyAddressValidation(this.selectedEditAddrIndex)) {

//         //validate gst_pan valdiation 
//         if (this.validateEditGSTPAN(this.selectedEditAddrIndex)) {
//           //check validation call next update supplier function
//         }
//       }
//     }

//   }

//   checkAddressValidation(selectedIndex, callFrom): any {

//     console.log(" checkAddressValidation **********")

//     let startedIndex: number = 0;
//     if (callFrom == "singleAddress") {
//       startedIndex = selectedIndex
//     } else {
//       startedIndex = 0
//     }
//     console.log(" checkAddressValidation startedIndex ", startedIndex)

//     for (let index = startedIndex; index <= selectedIndex; index++) {

//       this.getrows = this.form.get('arrayAddAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       //get home_country_flg
//       let ctr_home_country_flg: string = 'N'
//       for (let i = 0; i < this.countryLists[index].length; i++) {
//         if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
//           ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
//         }
//       }

//       let errorRowIndex = 0
//       if (this.flgModify == 'N') {
//         errorRowIndex = index + 1
//       } else {
//         errorRowIndex = this.addressCode
//       }

//       if (this.formGroup.controls.txtAddrOne.value == '' || this.formGroup.controls.txtAddrOne.value == null) {
//         this.openSnackBar('Please Enter Address 1 at address no' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.txtAddrSecond.value == '' || this.formGroup.controls.txtAddrSecond.value == null) {
//         this.openSnackBar('Please Enter Address 2 at address no' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.cmbCountry.value == '' || this.formGroup.controls.cmbCountry.value == null) {
//         this.openSnackBar('Please Select Country at address no' + (errorRowIndex));
//         return false;
//       }

//       if (ctr_home_country_flg == 'Y') {

//         if (this.formGroup.controls.cmbState.value == '' || this.formGroup.controls.cmbState.value == null) {
//           this.openSnackBar('Please Select State at address no' + (errorRowIndex));
//           return false;
//         }

//         if (this.formGroup.controls.txtPinCode.value == "" || this.formGroup.controls.txtPinCode.value == null) {
//           this.openSnackBar('Please enter pincode  at address no' + (errorRowIndex));
//           return false;
//         } else {
//           if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
//             this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
//             return false;
//           }
//         }
//       }

//       //location 
//       if (this.formGroup.controls.txtLattitude.value == '' || this.formGroup.controls.txtLattitude.value == null) {
//         this.openSnackBar('Please select lattitude at address no ' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.txtLongitude.value == '' || this.formGroup.controls.txtLongitude.value == null) {
//         this.openSnackBar('Please select longitude at address no' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.txtMobileNo.value != "") {
//         if (isNaN(this.formGroup.controls.txtMobileNo.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value at address no" + (errorRowIndex));
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtMobileNo.value != "") {
//         if (isNaN(this.formGroup.controls.txtMobileNo.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for Mobile No at address no" + (errorRowIndex));
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtTelNoOne.value != "") {
//         if (isNaN(this.formGroup.controls.txtTelNoOne.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for telephone no 1 at address no" + (errorRowIndex));
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtTelNoSecond.value != "") {
//         if (isNaN(this.formGroup.controls.txtTelNoSecond.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for telephone no 2 at address no" + (errorRowIndex));
//           return false;
//         }
//       }


//       if (index == 0 && this.flgModify == 'N') {
//         console.log(' flgModify = ', this.flgModify, ' index = ', index);
//         if (this.formGroup.controls.txtEmailIdOne.value == "" || this.formGroup.controls.txtEmailIdOne.value == null ||
//           this.formGroup.controls.txtEmailIdOne.value == undefined) {
//           this.openSnackBar('Please Enter Email Id for Address 1');
//           return false;
//         }
//       }


//       if (index == 0) {
//         this.firstCountryCode = this.formGroup.controls.cmbCountry.value;
//         this.firstStateCode = this.formGroup.controls.cmbState.value.st_code;
//       }
//       console.log(" firstCountryCode ", this.firstCountryCode)
//       console.log(" firstStateCode   ", this.firstStateCode)

//       if (this.flgModify == 'N') {

//         if (index != 0) {
//           //same country
//           if (this.firstCountryCode != this.formGroup.controls.cmbCountry.value) {
//             this.openSnackBar('Please Select Same Country  at address no' + (errorRowIndex));
//             return false;
//           }

//           //same state
//           if (this.firstStateCode != this.formGroup.controls.cmbState.value.st_code) {
//             this.openSnackBar('Please Select Same State  at address no' + (errorRowIndex));
//             return false;
//           }
//         }
//       } else {

//         if (this.countryArray.length > 0) {
//           //same country
//           let countrylen = Number(this.countryArray.length) - 1
//           let firstCountry = this.formGroup.controls.cmbCountry.value;
//           console.log(" 1YfirstCountry ", firstCountry)

//           if (firstCountry != this.countryArray[countrylen]) {
//             this.openSnackBar('Please Select Same country  at address no' + (errorRowIndex));
//             return false;
//           }

//           //same state
//           let len = Number(this.stateArray.length) - 1
//           let firstState = this.formGroup.controls.cmbState.value.st_code;
//           console.log(" 1YfirstState ", firstState)

//           if (firstState != this.stateArray[len]) {
//             this.openSnackBar('Please Select Same State  at address no' + (errorRowIndex));
//             return false;
//           }
//         }
//       }



//       console.log(" this.defaultGst ", this.defaultGst)
//       console.log(" ctr_home_country_flg ", ctr_home_country_flg)

//       let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;

//       if (ctr_home_country_flg == 'Y') {

//         if (this.formGroup.controls.txtGstNo.value != "") {

//           if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

//             if (this.flgModify == 'N') {

//               if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
//                 this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//                 return false;
//               }
//               if (this.form.controls.txtPanNo.value.length != 10) {
//                 this.openSnackBar('Please Enter 10 digits  pan Number.');
//                 return false;
//               }
//               if (!panRegex.test(this.form.controls.txtPanNo.value)) {
//                 this.openSnackBar("Please Enter correct pan no ");
//                 return false;
//               }

//             } else {
//               if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//                 this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//                 return false;
//               }

//               if (this.form.controls.txtEPanNo.value.length != 10) {
//                 this.openSnackBar('Please Enter 10 digits  pan Number.');
//                 return false;
//               }

//               if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//                 this.openSnackBar("Please Enter correct pan no ");
//                 return false;
//               }
//             }

//             if (this.formGroup.controls.txtGstNo.value.length != 15) {
//               this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (errorRowIndex));
//               return false;
//             }
//           }
//         }
//       }

//     }//for
//     return true;

//   }//end of func

//   getESetStateDropdown(index, usrStateCode) {

//     this.getrows = this.form.get('arrayEditAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     let st_ctr_code = this.formGroup.controls.cmbECountry.value

//     this.utilityServiceAvaxPro.getStateListData(st_ctr_code).subscribe(data => {
//       if (data.responseData[0].length == 0) {
//         this.stateELists[index] = null;
//         new StateMasterListModel('', '')
//         return false;
//       } else {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.stateELists[index] = data.responseData[0].map(item => {

//             if (item.st_code == usrStateCode) {
//               this.stateArray[index] = usrStateCode
//             }
//             return new StateMasterListModel(item.st_code, item.st_state)
//           })

//         }
//         return this.stateELists[index]
//       }
//     })
//   }

//   /*  checkContactValidation(selectedIndex, callFrom): any {
 
//      console.log(" checkContactValidation **********")
 
//      let startedIndex: number = 0;
//      if (callFrom == "singleAddress") {
//        startedIndex = selectedIndex
//      } else {
//        startedIndex = 0
//      }
 
//      console.log(" checkContactValidation startedIndex ", startedIndex)
 
//      for (let index = startedIndex; index <= selectedIndex; index++) {
 
//        this.getrows = this.form.get('arrayAddContact') as FormArray;
//        this.aryTableControl = this.getrows.controls;
//        this.formGroup = this.aryTableControl[index] as FormGroup;
 
//        let cntDesignationRegx = /^\d*[a-zA-Z][a-zA-Z\d\-\s\(\&\_\)]*$/;
 
//        let errorRowIndex = 0
//        if (this.flgModify == 'N') {
//          errorRowIndex = index + 1
//        } else {
//          errorRowIndex = this.addressCode
//        }
 
//        if (this.formGroup.controls.txtCntPersonName.value == '' || this.formGroup.controls.txtCntPersonName.value == null) {
//          this.openSnackBar('Please Enter Contact Person Name at contact no' + (errorRowIndex));
//          return false;
//        }
 
//        if (this.formGroup.controls.txtCntPersonDesig.value != "") {
//          if (!cntDesignationRegx.test(this.formGroup.controls.txtCntPersonDesig.value)) {
//            this.openSnackBar("Please Dont Enter Special Characters In Contact Person Designation at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
 
//        if (this.formGroup.controls.txtCntTelNoOne.value != "") {
//          if (isNaN(this.formGroup.controls.txtCntTelNoOne.value)) {
//            this.openSnackBar("Please Enter Only Numeric Value for telephone no 1 at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
 
//        if (this.formGroup.controls.txtCntTelNoSecond.value != "") {
//          if (isNaN(this.formGroup.controls.txtCntTelNoSecond.value)) {
//            this.openSnackBar("Please Enter Only Numeric Value for telephone no 2 at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
 
//        if (this.formGroup.controls.txtCntMobNoOne.value != "") {
//          if (isNaN(this.formGroup.controls.txtCntMobNoOne.value)) {
//            this.openSnackBar("Please Enter Only Numeric Value for Mobile No 1 at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
 
//        if (this.formGroup.controls.txtCntTelNoSecond.value != "") {
//          if (isNaN(this.formGroup.controls.txtCntTelNoSecond.value)) {
//            this.openSnackBar("Please Enter Only Numeric Value for Mobile No 2 at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
 
//        if (this.formGroup.controls.txtCntStd.value != "") {
//          if (isNaN(this.formGroup.controls.txtCntStd.value)) {
//            this.openSnackBar("Please Enter Only Numeric Value for STD at contact no" + (errorRowIndex));
//            return false;
//          }
//        }
//      }//for
//      return true;
//    }//end of func
//   */

//   //validate gst no 
//   validateGSTPAN(selectedIndex, callFrom): any {
//     console.log(" validateGSTPAN **********")

//     let startedIndex: number = 0;
//     if (callFrom == "singleAddress") {
//       startedIndex = selectedIndex
//     } else {
//       startedIndex = 0
//     }
//     console.log(" validateGSTPAN startedIndex ", startedIndex)

//     for (let index = startedIndex; index <= selectedIndex; index++) {

//       this.getrows = this.form.get('arrayAddAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       let errorRowIndex = 0
//       if (this.flgModify == 'N') {
//         errorRowIndex = index + 1
//       } else {
//         errorRowIndex = this.addressCode
//       }

//       //get home_country_flg
//       let ctr_home_country_flg: string = 'N'
//       for (let i = 0; i < this.countryLists[index].length; i++) {
//         if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
//           ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
//         }
//       }

//       // If the country is out of India, there is no need to validate gst no or pan no
//       if (ctr_home_country_flg == 'Y') {

//         let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;

//     //    console.log(this.formGroup.controls.txtGstNo.value, ' GST NO.... ')
//     //    console.log(this.defaultGst, ' defaultGst GST NO.... ')

//         if (this.formGroup.controls.txtGstNo.value == '' || this.formGroup.controls.txtGstNo.value == undefined) {
//           if (index == selectedIndex) {
//             this.callNextFunction(callFrom, selectedIndex)
//           }
//         } else {

//           if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {
//             if (this.flgModify == 'N') {

//               if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
//                 this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//                 return false;
//               }
//               if (this.form.controls.txtPanNo.value.length != 10) {
//                 this.openSnackBar('Please Enter 10 digits  pan Number.');
//                 return false;
//               }

//               if (!panRegex.test(this.form.controls.txtPanNo.value)) {
//                 this.openSnackBar("Please Enter correct pan no ");
//                 return false;
//               }

//               this.payload = {
//                 userInformationDto: {
//                   usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//                   usr_name: atob(sessionStorage.getItem(btoa('username'))),
//                   fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//                   fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//                   fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//                   usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//                   usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//                   usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//                   usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//                 },
//                 cd_pan_no: this.form.get("txtPanNo").value,
//                 callFrom: "complete",
//                 cust_code_flg: 'S',
//               }

//               if (this.cust_supplr_code != 'NEW') {
//                 this.payload.cd_cust_supplr_code = this.cust_supplr_code
//               }
//             } else {

//               if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//                 this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//                 return false;
//               }
//               if (this.form.controls.txtEPanNo.value.length != 10) {
//                 this.openSnackBar('Please Enter 10 digits  pan Number.');
//                 return false;
//               }

//               if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//                 this.openSnackBar("Please Enter correct pan no ");
//                 return false;
//               }

//               this.payload = {
//                 userInformationDto: {
//                   usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//                   usr_name: atob(sessionStorage.getItem(btoa('username'))),
//                   fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//                   fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//                   fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//                   usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//                   usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//                   usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//                   usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//                 },
//                 cd_pan_no: this.form.get("txtEPanNo").value,
//                 callFrom: "complete",
//                 cust_code_flg: 'S',
//                 cd_cust_supplr_code: this.cust_supplr_code,
//                 cd_grp_code:this.form.get('txtgrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("txtgrpCode").value.cs_cust_supplr_code : ''
//               }
//             }


//             //check duplicate pan_no
//             this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
//               data => {
//                 if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                   console.log('data.responseData[0] =', data.responseData[0]);
//                   if (data.responseData[0] == "Y") {
//                     this.openSnackBar("PAN NO IS ALREADY EXISTS");
//                     return false;
//                   }
//                   else {
//                     //if not default_gst
//                     if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

//                       this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
//                       this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

//                       this.customerMasterService.validateGstWithPan(this.payload).subscribe(
//                         data => {
//                           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                             console.log('data.responseData[0] =', data.responseData[0]);

//                             if (data.responseData[0] != "Y") {

//                               this.openSnackBar(data.responseData[0]);
//                               return false;
//                             } else {

//                               //check_duplicate_gst_no
//                               this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
//                               this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

//                               this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
//                                 data => {
//                                   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                                     console.log('data.responseData[0] =', data.responseData[0]);
//                                     if (data.responseData[0] == "Y") {
//                                       this.openSnackBar("GST NO IS ALREADY EXISTS");
//                                       return false;
//                                     } else {
//                                       if (index == selectedIndex) {
//                                         this.callNextFunction(callFrom, selectedIndex)
//                                       }
//                                     }
//                                   }
//                                 }
//                               )
//                             }
//                           }
//                         }
//                       )
//                     }//defaultGst
//                     else {
//                       if (index == selectedIndex) {
//                         this.callNextFunction(callFrom, selectedIndex)
//                       }
//                     }
//                   }
//                 }
//               }
//             )
//           } else {
//             if (index == selectedIndex) {
//               this.callNextFunction(callFrom, selectedIndex)
//             }
//           }
//         }
//       }//ctr_home_country_flg
//       else {
//         if (index == selectedIndex) {
//           this.callNextFunction(callFrom, selectedIndex)
//         }
//       }

//     }//for
//     //return true;
//   }//func

//   callNextFunction(callFrom, selectedIndex) {

//     if (callFrom == "singleAddress") {
//       if (this.flgModify == 'Y') {
//         this.saveSupplierAddress(selectedIndex)
//       } else {
//         this.addressCode = (Number(this.addressCode) + 1)
//         this.addNewAddressRow(selectedIndex + 1)
//       }
//     } else {

//       //compelet supplier
//       //if (this.checkContactValidation(this.selectedContactIndex, "allContact")) {

//       this.getAddressData();

//       //this.getContactData();
//       this.getContactData();

//       this.saveSupplierDraft();

//       //}

//     }
//   }//callNextFunction

//   getAddressData() {
//     console.log(" this.selectedIndex ", this.selectedAddressIndex)

//     this.custAddressArray = [];

//     for (let index = 0; index <= this.selectedAddressIndex; index++) {

//       this.getrows = this.form.get('arrayAddAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       this.custAddressArray.push({
//         cdad_addr_code: this.formGroup.controls.txtAddCode.value,
//         cdad_type_of_address: 'B',
//         cdad_address: this.formGroup.controls.txtAddrOne.value + ',' +
//           this.formGroup.controls.txtAddrSecond.value + ',' +
//           this.formGroup.controls.txtAddrThird.value + ',' +
//           this.formGroup.controls.txtAddrFourth.value,
//         cdad_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//         cdad_deleted_flg: 'N',
//         cdad_address1: this.formGroup.controls.txtAddrOne.value,
//         cdad_address2: this.formGroup.controls.txtAddrSecond.value,
//         cdad_address3: this.formGroup.controls.txtAddrThird.value,
//         cdad_address4: this.formGroup.controls.txtAddrFourth.value,
//         cdad_country_code: this.formGroup.controls.cmbCountry.value,
//         cdad_state_code: this.formGroup.controls.cmbState.value.st_code,
//         cdad_city: this.formGroup.controls.txtCity.value,
//         cdad_pincode: this.formGroup.controls.txtPinCode.value,
//         cdad_tel_no1: this.formGroup.controls.txtTelNoOne.value,
//         cdad_tel_no2: this.formGroup.controls.txtTelNoSecond.value,
//         cdad_fax_1: this.formGroup.controls.txtFaxNoOne.value,
//         cdad_fax_2: this.formGroup.controls.txtFaxNoSecond.value,
//         cdad_email_1: this.formGroup.controls.txtEmailIdOne.value,
//         cdad_email_2: this.formGroup.controls.txtEmailIdSecond.value,
//         cdad_hotline_no: this.formGroup.controls.txtHotLineNo.value,
//         cdad_mobile_no: this.formGroup.controls.txtMobileNo.value,
//         cdad_gst_no: this.formGroup.controls.txtGstNo.value,
//         cdad_ecc_code: null,
//         cdad_tin_no: null,
//         cdad_csttin_no: null,
//         cdad_vattin_no: null,
//         cdad_std1: null,
//         cdad_std2: null,
//         cdad_std3: null,
//         cdad_std4: null,
//         cdad_latitude: this.formGroup.controls.txtLattitude.value,
//         cdad_longitude: this.formGroup.controls.txtLongitude.value,
//         cdad_vendor_code: this.formGroup.controls.txtVendorCode.value,
//         cdad_domain_name: this.formGroup.controls.txtDomainName.value,
//         cdad_std_code: this.formGroup.controls.txtStdCode.value,
//         cdad_isd_code: this.formGroup.controls.txtIsdCode.value,
//         cdad_tax_type: this.formGroup.controls.cmbTaxType.value != undefined ? this.formGroup.controls.cmbTaxType.value : '',
//         cdad_transporter_code: this.formGroup.controls.cmbTransporter.value != undefined ? this.formGroup.controls.cmbTransporter.value : '',
//       }
//       );
//     }
//   }

//   checkModifyAddressValidation(selectedEditIndex): any {

//     console.log(" checkModifyAddressValidation **********", selectedEditIndex)

//     for (let index = 0; index <= selectedEditIndex; index++) {

//       this.getrows = this.form.get('arrayEditAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       //check home country_flg
//       let ectr_home_country_flg: string = 'N'
//       for (let i = 0; i < this.countryELists[index].length; i++) {
//         if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
//           ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
//         }
//       }


//       if (this.formGroup.controls.txtEAddrOne.value == '' || this.formGroup.controls.txtEAddrOne.value == null) {
//         this.openSnackBar('Please Enter Address 1 at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtEAddrSecond.value == '' || this.formGroup.controls.txtEAddrSecond.value == null) {
//         this.openSnackBar('Please Enter Address 2 at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.cmbECountry.value == '' || this.formGroup.controls.cmbECountry.value == null) {
//         this.openSnackBar('Please Select Country at address no' + (index + 1));
//         return false;
//       }

//       if (ectr_home_country_flg == 'Y') {

//         if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
//           this.openSnackBar('Please Select State at address no' + (index + 1));
//           return false;
//         }

//         if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
//           this.openSnackBar('Please enter pincode  at address no' + (index + 1));
//           return false;
//         } else {
//           if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
//             this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
//             return false;
//           }
//         }
//       }

//       //location
//       if (this.formGroup.controls.txtELongitude.value == null || this.formGroup.controls.txtELongitude.value == '') {
//         this.openSnackBar('Please select Lattitide at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtELattitude.value == null || this.formGroup.controls.txtELattitude.value == '') {
//         this.openSnackBar('Please select longitude at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtEMobileNo.value != "") {
//         if (isNaN(this.formGroup.controls.txtEMobileNo.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value ");
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtEMobileNo.value != "") {
//         if (isNaN(this.formGroup.controls.txtEMobileNo.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for Mobile No");
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtETelNoOne.value != "") {
//         if (isNaN(this.formGroup.controls.txtETelNoOne.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for telephone no 1");
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtETelNoSecond.value != "") {
//         if (isNaN(this.formGroup.controls.txtETelNoSecond.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for telephone no 2");
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtEStdCode.value != "") {
//         if (isNaN(this.formGroup.controls.txtEStdCode.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for std no ");
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtEIsdCode.value != "") {
//         if (isNaN(this.formGroup.controls.txtEIsdCode.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for isd no");
//           return false;
//         }
//       }

//       if (index == 0) {
//         console.log(' index = ', index);
//         if (this.formGroup.controls.txtEEmailIdOne.value == "" || this.formGroup.controls.txtEEmailIdOne.value == null ||
//           this.formGroup.controls.txtEEmailIdOne.value == undefined) {
//           this.openSnackBar('Please Enter Email Id for Address 1');
//           return false;
//         }
//       }

//       //same country at address noedit
//       if (index != 0) {

//         let firstCountry = this.formGroup.controls.cmbECountry.value
//         console.log(" firstCountry ", firstCountry)

//         this.getrows = this.form.get('arrayEditAdress') as FormArray;
//         this.aryTableControl = this.getrows.controls;
//         this.formGroup = this.aryTableControl[index - 1] as FormGroup;

//         if (firstCountry != this.formGroup.controls.cmbECountry.value) {
//           this.openSnackBar('Please Select Same country  at address no' + (index + 1));
//           return false;
//         }
//       }

//       //same state at address noedit
//       if (index != 0) {

//         let firstState = this.formGroup.controls.cmbEState.value
//         console.log(" firstState ", firstState)

//         this.getrows = this.form.get('arrayEditAdress') as FormArray;
//         this.aryTableControl = this.getrows.controls;
//         this.formGroup = this.aryTableControl[index - 1] as FormGroup;

//         if (firstState != this.formGroup.controls.cmbEState.value) {
//           this.openSnackBar('Please Select Same State  at address no' + (index + 1));
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtETelNoOne.value != "") {
//         if (isNaN(this.formGroup.controls.txtETelNoOne.value)) {
//           this.openSnackBar("Please Enter Only Numeric Value for telephone no at address no" + (index + 1));
//           return false;
//         }
//       }


//       // If the country is out of India, there is no need to validate gst no or pan no
//       if (ectr_home_country_flg == 'Y') {
//         if (this.formGroup.controls.txtEGstNo.value == "" || this.formGroup.controls.txtEGstNo.value == null
//           || this.formGroup.controls.txtEGstNo.value == undefined) {

//         } else {

//           if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

//             if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//               this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//               return false;
//             }
//             if (this.form.controls.txtEPanNo.value.length != 10) {
//               this.openSnackBar('Please Enter 10 digits  pan Number.');
//               return false;
//             }
//             let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
//             if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//               this.openSnackBar("Please Enter correct pan no ");
//               return false;
//             }

//             if (this.formGroup.controls.txtEGstNo.value.length != 15) {
//               this.openSnackBar('Please Enter 15 digits  Gst Number at address no' + (index + 1));
//               return false;
//             }
//           }
//         }
//       }
//     }
//     return true;
//   }//end of func

//   validateEditGSTPAN(selectedEditIndex): any {
//     console.log(" validateEditGSTPAN **********")

//     for (let index = 0; index <= selectedEditIndex; index++) {

//       this.getrows = this.form.get('arrayEditAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       //check home country_flg
//       let ectr_home_country_flg: string = 'N'
//       for (let i = 0; i < this.countryELists[index].length; i++) {
//         if (this.formGroup.controls.cmbECountry.value == this.countryELists[index][i].ctr_code) {
//           ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
//         }
//       }

//       // If the country is out of India, there is no need to validate gst no or pan no
//       if (ectr_home_country_flg == 'Y') {


//   //      console.log(this.formGroup.controls.txtEGstNo.value, ' GST NO.... ')
//   //      console.log(this.defaultGst, ' defaultGst GST NO.... ')

//         if (this.formGroup.controls.txtEGstNo.value == '' || this.formGroup.controls.txtEGstNo.value == undefined) {
//           if (index == selectedEditIndex) {
//             this.callNextEditFunction(selectedEditIndex)
//           }
//         } else {
//           if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

//             if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//               this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//               return false;
//             }
//             if (this.form.controls.txtEPanNo.value.length != 10) {
//               this.openSnackBar('Please Enter 10 digits  pan Number.');
//               return false;
//             }
//             let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
//             if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//               this.openSnackBar("Please Enter correct pan no ");
//               return false;
//             }

//             if (this.form.controls.txtEPanNo.value != '' || this.form.controls.txtEPanNo.value != undefined) {

//               this.payload = {
//                 userInformationDto: {
//                   usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//                   usr_name: atob(sessionStorage.getItem(btoa('username'))),
//                   fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//                   fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//                   fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//                   usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//                   usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//                   usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//                   usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//                 },
//                 cd_pan_no: this.form.get("txtEPanNo").value,
//                 callFrom: "complete",
//                 cust_code_flg: 'S',
//                 cd_cust_supplr_code: this.cust_supplr_code,
//                 cd_grp_code:this.form.get('cmbEGrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("cmbEGrpCode").value.cs_cust_supplr_code : ''
//               }

//               //check duplicate pan_no
//               this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
//                 data => {
//                   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                     console.log('data.responseData[0] =', data.responseData[0]);
//                     if (data.responseData[0] == "Y") {
//                       this.openSnackBar("PAN NO IS ALREADY EXISTS");
//                       return false;
//                     }
//                     else {

//                       //if not default_gst
//                       if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

//                         this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
//                         this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

//                         this.customerMasterService.validateGstWithPan(this.payload).subscribe(
//                           data => {
//                             if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                               console.log('data.responseData[0] =', data.responseData[0]);
//                               if (data.responseData[0] != "Y") {
//                                 this.openSnackBar(data.responseData[0]);
//                                 return false;
//                               } else {
//                                 //check_duplicate_gst_no
//                                 this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
//                                 this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

//                                 this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
//                                   data => {
//                                     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                                       console.log('data.responseData[0] =', data.responseData[0]);
//                                       if (data.responseData[0] == "Y") {
//                                         this.openSnackBar("GST NO IS ALREADY EXISTS");
//                                         return false;
//                                       } else {
//                                         if (index == selectedEditIndex) {
//                                           this.callNextEditFunction(selectedEditIndex)
//                                         }
//                                       }
//                                     }
//                                   }
//                                 )
//                               }
//                             }
//                           }
//                         )
//                       }//defaultGst
//                       else {
//                         if (index == selectedEditIndex) {
//                           this.callNextEditFunction(selectedEditIndex)
//                         }
//                       }
//                     }
//                   }
//                 }
//               )
//             }//txtPanNo
//           } else {
//             if (index == selectedEditIndex) {
//               this.callNextEditFunction(selectedEditIndex)
//             }
//           }
//         }
//       }//ctr_home_country_flg
//       else {
//         if (index == selectedEditIndex) {
//           this.callNextEditFunction(selectedEditIndex)
//         }
//       }
//     }//for
//     return true;
//   }//func

//   getEditAddressData() {
//     console.log(" this.selectedIndex ", this.selectedEditAddrIndex)

//     this.custAddressArray = [];

//     for (let index = 0; index <= this.selectedEditAddrIndex; index++) {

//       this.getrows = this.form.get('arrayEditAdress') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       this.custAddressArray.push({
//         cdad_type_of_address: 'B',
//         cdad_addr_code: this.formGroup.controls.txtEAddCode.value, //this.addressCode,
//         cdad_address1: this.formGroup.controls.txtEAddrOne.value,
//         cdad_address2: this.formGroup.controls.txtEAddrSecond.value,
//         cdad_address3: this.formGroup.controls.txtEAddrThird.value,
//         cdad_address4: this.formGroup.controls.txtEAddrFourth.value,
//         cdad_address: this.formGroup.controls.txtEAddrOne.value + ',' +
//           this.formGroup.controls.txtEAddrSecond.value + ',' +
//           this.formGroup.controls.txtEAddrThird.value + ',' +
//           this.formGroup.controls.txtEAddrFourth.value,
//         cdad_country_code: this.formGroup.controls.cmbECountry.value,
//         cdad_state_code: this.formGroup.controls.cmbEState.value,
//         cdad_city: this.formGroup.controls.txtECity.value,
//         cdad_pincode: this.formGroup.controls.txtEPinCode.value,
//         cdad_tel_no1: this.formGroup.controls.txtETelNoOne.value,
//         cdad_tel_no2: this.formGroup.controls.txtETelNoSecond.value,
//         cdad_fax_1: this.formGroup.controls.txtEFaxNoOne.value,
//         cdad_fax_2: this.formGroup.controls.txtEFaxNoSecond.value,
//         cdad_email_1: this.formGroup.controls.txtEEmailIdOne.value,
//         cdad_email_2: this.formGroup.controls.txtEEmailIdSecond.value,
//         cdad_hotline_no: this.formGroup.controls.txtEHotLineNo.value,
//         cdad_mobile_no: this.formGroup.controls.txtEMobileNo.value,
//         cdad_gst_no: this.formGroup.controls.txtEGstNo.value,
//         cdad_ecc_code: null,
//         cdad_tin_no: null,
//         cdad_csttin_no: null,
//         cdad_vattin_no: null,
//         cdad_std1: null,
//         cdad_std2: null,
//         cdad_std3: null,
//         cdad_std4: null,
//         cdad_latitude: this.formGroup.controls.txtELattitude.value,
//         cdad_longitude: this.formGroup.controls.txtELongitude.value,
//         cdad_vendor_code: this.formGroup.controls.txtEVendorCode.value,
//         cdad_domain_name: this.formGroup.controls.txtEDomainName.value,
//         cdad_std_code: this.formGroup.controls.txtEStdCode.value,
//         cdad_isd_code: this.formGroup.controls.txtEIsdCode.value,
//         cdad_tax_type: this.formGroup.controls.cmbETaxType.value != undefined ? this.formGroup.controls.cmbETaxType.value : '',
//         cdad_transporter_code: this.formGroup.controls.cmbETransporter.value != undefined ? this.formGroup.controls.cmbETransporter.value.tr_code : '',
//         cdad_transporter: this.formGroup.controls.cmbETransporter.value != undefined ? this.formGroup.controls.cmbETransporter.value.tr_name : '',
//         cdad_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
//       }
//       );
//     }
//   }

//   callNextEditFunction(selectedEditIndex) {

//     this.getEditAddressData();
//     this.getContactData();
//     this.updateSupplier();
//   }

//   newAddressIndex:number=-1;
//   initNewAddressRow(index) {
//     this.newAddressIndex=index;
//     console.log("initNewAddressRow ", this.addressCode)
//     this.addNewAddressRow(0)
//     this.showIconFLg = false
//   }

//   enableContact(event, i) {
//     if (event.checked) {
//       this.form.get('txtP' + i + 'Name').enable()
//       this.form.get('txtP' + i + 'Email').enable()
//       this.form.get('txtP' + i + 'StdCode').enable()
//       this.form.get('txtP' + i + 'Teleno').enable()
//       this.form.get('txtP' + i + 'FaxNo').enable()
//       this.form.get('txtP' + i + 'MobileNo').enable()
//       this.form.get('txtP' + i + 'AadharNo').enable()
//     } else {
//       this.form.get('txtP' + i + 'Name').disable()
//       this.form.get('txtP' + i + 'Email').disable()
//       this.form.get('txtP' + i + 'StdCode').disable()
//       this.form.get('txtP' + i + 'Teleno').disable()
//       this.form.get('txtP' + i + 'FaxNo').disable()
//       this.form.get('txtP' + i + 'MobileNo').disable()
//       this.form.get('txtP' + i + 'AadharNo').disable()
//     }
//   }

//   setContactData(data: any) {
//     for (let i = 0; i < data.length; i++) {
//       let j = data[i].condr_code;
//       this.form.controls["chkContactDtl" + j].setValue(true);
//       this.form.controls["txtP" + j + "Name"].setValue(data[i].condr_name);
//       this.form.controls["txtP" + j + "Name"].enable();
//       this.form.controls["txtP" + j + "Email"].setValue(data[i].condr_email);
//       this.form.controls["txtP" + j + "Email"].enable();
//       this.form.controls["txtP" + j + "StdCode"].setValue(data[i].condr_std);
//       this.form.controls["txtP" + j + "StdCode"].enable();
//       this.form.controls["txtP" + j + "Teleno"].setValue(data[i].condr_telno_off_1);
//       this.form.controls["txtP" + j + "Teleno"].enable();
//       this.form.controls["txtP" + j + "FaxNo"].setValue(data[i].condr_fax1);
//       this.form.controls["txtP" + j + "FaxNo"].enable();
//       this.form.controls["txtP" + j + "MobileNo"].setValue(data[i].condr_mobile_no1);
//       this.form.controls["txtP" + j + "MobileNo"].enable();
//       this.form.controls["txtP" + j + "AadharNo"].setValue(data[i].condr_aadhar_no);
//       this.form.controls["txtP" + j + "AadharNo"].enable();
//     }
//   }

//   setContactControls() {
//     for (let i = 1; i < 12; i++) {
//       this.form.addControl('chkContactDtl' + i, new FormControl(false));
//       this.form.addControl('txtP' + i + 'Name', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'Email', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'StdCode', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'Teleno', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'FaxNo', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'MobileNo', new FormControl({ value: '', disabled: true }));
//       this.form.addControl('txtP' + i + 'AadharNo', new FormControl({ value: '', disabled: true }));
//     }
//   }

//   getContactData() {

//     this.contactArray = [];
//     for (let i = 1; i <= this.contactDtlLabelArray.length; i++) {
//       if (this.form.controls["chkContactDtl" + i].value) {
//         this.contactArray.push({
//           condr_code: i,
//           condr_cdad_code: '1',
//           condr_name: this.form.controls["txtP" + i + "Name"].value,
//           condr_email: this.form.controls["txtP" + i + "Email"].value,
//           condr_std: this.form.controls["txtP" + i + "StdCode"].value,
//           condr_telno_off_1: this.form.controls["txtP" + i + "Teleno"].value,
//           condr_fax1: this.form.controls["txtP" + i + "FaxNo"].value,
//           condr_mobile_no1: this.form.controls["txtP" + i + "MobileNo"].value,
//           condr_aadhar_no: this.form.controls["txtP" + i + "AadharNo"].value,
//           condr_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//           condr_deleted_flg: 'N',
//         }
//         );
//       }
//     }
//   }

//   showMap(index) {
//     this.getrows = this.form.get('arrayAddAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     let errorRowIndex: number = 0
//     errorRowIndex = index + 1

//     let ctr_home_country_flg: string = 'N'
//     for (let i = 0; i < this.countryLists[index].length; i++) {
//       if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
//         ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
//       }
//     }

//     if (this.formGroup.controls.txtAddrOne.value == '' || this.formGroup.controls.txtAddrOne.value == null) {
//       this.openSnackBar('Please Enter Address 1 at address no' + (errorRowIndex));
//       return false;
//     }

//     if (this.formGroup.controls.txtAddrSecond.value == '' || this.formGroup.controls.txtAddrSecond.value == null) {
//       this.openSnackBar('Please Enter Address 2 at address no' + (errorRowIndex));
//       return false;
//     }

//     if (this.formGroup.controls.cmbCountry.value == '' || this.formGroup.controls.cmbCountry.value == null) {
//       this.openSnackBar('Please Select Country at address no' + (errorRowIndex));
//       return false;
//     }

//     if (ctr_home_country_flg == 'Y') {

//       if (this.formGroup.controls.cmbState.value == '' || this.formGroup.controls.cmbState.value == null) {
//         this.openSnackBar('Please Select State at address no' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.txtPinCode.value == "" || this.formGroup.controls.txtPinCode.value == null) {
//         this.openSnackBar('Please enter pincode  at address no' + (errorRowIndex));
//         return false;
//       } else {
//         if (!this.formGroup.controls.txtPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
//           this.openSnackBar("Please Enter valid  pincode at address no" + (errorRowIndex));
//           return false;
//         }
//       }

//     }

//     const toSelectedCountry = this.countryLists[index].find(c => c.ctr_code == this.formGroup.controls.cmbCountry.value)
   
//     let fullAddress: string
//     fullAddress = this.formGroup.controls.txtAddrOne.value + "," +
//       this.formGroup.controls.txtAddrSecond.value + ",";

//     if (this.formGroup.controls.cmbState.value !== null && this.formGroup.controls.cmbState.value !== undefined &&
//       this.formGroup.controls.cmbState.value !== '') {
//       fullAddress += this.formGroup.controls.cmbState.value.st_state + " ";
//     } else if (this.formGroup.controls.txtPinCode.value !== null && this.formGroup.controls.txtPinCode.value !== undefined &&
//       this.formGroup.controls.txtPinCode.value !== '') {
//       fullAddress += this.formGroup.controls.txtPinCode.value + ",";
//     }

//     fullAddress += toSelectedCountry.ctr_desc
//     console.log(" fullAddress ", fullAddress)

//     this.openMapDialog(fullAddress.toUpperCase(), index, "add");
//   }

//   //added addres map
//   showEMap(index) {
//     this.getrows = this.form.get('arrayEditAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     let ectr_home_country_flg: string = 'N'
//     for (let i = 0; i < this.countryELists[index].length; i++) {
//       if (this.formGroup.controls.cmbECountry.value === this.countryELists[index][i].ctr_code) {
//         ectr_home_country_flg = this.countryELists[index][i].ctr_home_country_flg
//       }
//     }

//     if (this.formGroup.controls.txtEAddrOne.value == '' || this.formGroup.controls.txtEAddrOne.value == null) {
//       this.openSnackBar('Please Enter Address 1 at address no' + (index + 1));
//       return false;
//     }

//     if (this.formGroup.controls.txtEAddrSecond.value == '' || this.formGroup.controls.txtEAddrSecond.value == null) {
//       this.openSnackBar('Please Enter Address 2 at address no' + (index + 1));
//       return false;
//     }

//     if (this.formGroup.controls.cmbECountry.value == '' || this.formGroup.controls.cmbECountry.value == null) {
//       this.openSnackBar('Please Select Country at address no' + (index + 1));
//       return false;
//     }

//     if (ectr_home_country_flg == 'Y') {

//       if (this.formGroup.controls.cmbEState.value == '' || this.formGroup.controls.cmbEState.value == null) {
//         this.openSnackBar('Please Select State at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtEPinCode.value == "" || this.formGroup.controls.txtEPinCode.value == null) {
//         this.openSnackBar('Please enter pincode  at address no' + (index + 1));
//         return false;
//       } else {
//         if (!this.formGroup.controls.txtEPinCode.value.match(/^[a-zA-Z0-9\s\.\-]+$/)) {
//           this.openSnackBar("Please Enter valid  pincode at address no" + (index + 1));
//           return false;
//         }
//       }
//     }

//     const toSelectedCountry = this.countryELists[index].find(c => c.ctr_code == this.formGroup.controls.cmbECountry.value)
//     console.log(" toSelectedCountry.ctr_desc ", toSelectedCountry.ctr_desc)

//      const toSelectedState = this.stateELists[index].find(c => c.st_code == this.formGroup.controls.cmbEState.value)
//      //console.log(" toSelectedState ", toSelectedState.st_state)


//     /* let fullAddress: string
//      fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
//        this.formGroup.controls.txtEAddrSecond.value + "," +
//        toSelectedState.st_state + " " +
//        this.formGroup.controls.txtEPinCode.value + "," +
//        toSelectedCountry.ctr_desc */

//     let fullAddress: string
//     fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
//       this.formGroup.controls.txtEAddrSecond.value + ",";
//       console.log('toSelectedState.st_state = ',toSelectedState.st_state);
//       console.log('cmbEState = ',this.formGroup.controls.cmbEState.value);

//     if (this.formGroup.controls.cmbEState.value !== null && this.formGroup.controls.cmbEState.value !== undefined &&
//       this.formGroup.controls.cmbEState.value !== '') {
//       fullAddress += toSelectedState.st_state + " ";
//     }  
//     if (this.formGroup.controls.txtEPinCode.value !== null && this.formGroup.controls.txtEPinCode.value !== undefined &&
//       this.formGroup.controls.txtEPinCode.value !== '') {
//       fullAddress += this.formGroup.controls.txtEPinCode.value + ",";
//     }

//     fullAddress += toSelectedCountry.ctr_desc

//     console.log(" fullAddress ", fullAddress)
//     this.openMapDialog(fullAddress.toUpperCase(), index, "edit");

//   }

//   openMapDialog(fullAddress, index, callFrom) {
//     const dialogConfig = new MatDialogConfig()
//     dialogConfig.height = '100% !important'
//     dialogConfig.maxHeight = '200vh'
//     dialogConfig.width = '100% !important'
//     dialogConfig.disableClose = true
//     dialogConfig.autoFocus = true
//     dialogConfig.data = {
//       id: 1,
//       title: "AvaxPro Map",
//       fullAddress: fullAddress,
//     }
//     const dialogRef = this.dialog.open(MapDialogComponentComponent, dialogConfig)
//     dialogRef.afterClosed().subscribe(item => {
//       console.log("MapDialogComponentComponent ", item)

//       if (item == true) {

//         //user clicks on close button
//         this.openSnackBar("Please select Location")
//         return false

//       } 
//       else if(item=='undefined::undefined'){
//         this.openSnackBar("Please wait for map to load.")
//         return false
//       }
//       else {

//         //user clicks on save location button

//         this.openSnackBar("Location save successfully ")

//         if (callFrom == "add") {

//           this.getrows = this.form.get('arrayAddAdress') as FormArray;
//           this.aryTableControl = this.getrows.controls;
//           this.formGroup = this.aryTableControl[index] as FormGroup;

//           this.formGroup.controls.txtLattitude.setValue(item.split("::")[0])
//           this.formGroup.controls.txtLongitude.setValue(item.split("::")[1])

//         } else {

//           this.getrows = this.form.get('arrayEditAdress') as FormArray;
//           this.aryTableControl = this.getrows.controls;
//           this.formGroup = this.aryTableControl[index] as FormGroup;

//           this.formGroup.controls.txtELattitude.setValue(item.split("::")[0])
//           this.formGroup.controls.txtELongitude.setValue(item.split("::")[1])
//         }
//       }
//     })
//   }

//   enableRadiobtn(value: any) {
//     console.log(value, ' value')
//     if (this.tableData[value].show == false) {
//       this.tableData[value].show = true;
//     } else {
//       this.tableData[value].show = false;
//     }
//     // else {
//     //   this.tableData[value].flg_extend = "Y";
//     // }
//   }

//   verifyEmail(i,cntrlName,flg,addr_code){
//     let aryName='arrayAddAdress'
//     if(flg=='M'){
//       aryName='arrayEditAdress'
//     }
//     this.getrows = this.form.get(aryName) as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[i] as FormGroup;
//     if(this.formGroup.get(cntrlName).value == null || this.formGroup.get(cntrlName).value == '')
//     {
//       this.openSnackBar("Please Enter Email Id");
//       return false;
//     }
//     let payload:any={party_code:this.cust_supplr_code,email_id:this.formGroup.get(cntrlName).value,addr_code:addr_code}
//     this.utilityServiceAvaxPro.verifyEmail(payload).subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           if(data.responseData.length == 0){
//             this.openSnackBar("Email id does not exist. Please enter correct email id.")    
//           }else
//           if(data.responseData[0].csad_email_flg == 'Y')
//           {
//             this.openSnackBar("Email verified successfully.")
//             // this.csad_email_flg[i]=data.responseData[0].csad_email_flg
//           }
//           else{
//             this.openSnackBar("Email id does not exist. Please enter correct email id.")
//             // this.csad_email_flg[i]=data.responseData[0].csad_email_flg
//           }
//           this.ngOnInit();
//         }
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getEmailVerificationFlag(){
//     this.utilityServiceAvaxPro.getEmailVerificationFlag().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//          this.email_verification_flg = data.responseData[0]    
//          this.gst_verification_flg = data.responseData[1]      
//         }else{
//           this.email_verification_flg = "N"
//           this.gst_verification_flg = "N"
//         }
//         console.log("this.email_verification_flg -- " + this.email_verification_flg)
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }
//   validateGst(addr_Code:Number,gstNo:string,flg:any){
//     console.log("draft code ="+this.cust_supplr_code)

//     let payload={
//       gstNo:gstNo,
//       cust_supplr_code:this.cust_supplr_code,
//       draftFlg:flg,
//       addr_Code:addr_Code,
//       userInformationDto: {
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//       },
//     }
//     this.lstAddedAdress=[]
//     this.customerMasterService.validateGst(payload).subscribe(data=>{
//       if(data.responseStatus==='SUCCESS' && data.responseCode==='RES_200'){
//         this.getSupplierDetail(this.cust_supplr_code)
//         this.openSnackBar(data.message)
//         if(this.lstAddedAdress.length>0){
//           this.gstValid=true;
//         }
//       }
//       else{
//     const dialogConfig = new MatDialogConfig()
//               dialogConfig.width = '750px'
//               dialogConfig.minWidth = '750px'
//               dialogConfig.disableClose = true
//               dialogConfig.autoFocus = true
//               dialogConfig.data = {
//                 dialogType:'ERROR',
//                 message:data.message
//               }
//               const dialogRef = this.dialog.open(CommonConfirmationDialogComponent, dialogConfig)
//                 dialogRef.afterClosed().subscribe(item => {
//                   this.getSupplierDetail(this.cust_supplr_code)
//                     this.gstValid=false;
//                 })
//                 return;     
//               }
//             })
//   }
//   reVerify(rowAddrGst:any){
//     console.log("reVerify")
//     if(rowAddrGst.csad_gst_flg=='Y'){
//       let payload={
//         flgDraft:'N',
//         cd_cust_supplr_code: this.cust_supplr_code,
//         csad_addr_code:rowAddrGst.csad_addr_code
//       }
//      this.customerMasterService.updateGSTFlg(payload).subscribe(data=>{
//       if(data.responseStatus==='SUCCESS' && data.responseCode==='RES_200'){
//        this.getSupplierDetail(this.cust_supplr_code)
//       }
//       else{
//        this.getSupplierDetail(this.cust_supplr_code)
//       }
//      })
//     }
//   }
// }


