// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
// import { CustomerMasterService } from '../../customer-master.service';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
// import { MatDialogConfig } from '@angular/material/dialog';
// import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
// import { Router } from '@angular/router';
// import { debounceTime, tap, switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { DatePipe, formatDate } from '@angular/common';
// import { CustTypeModel, SelectionListModel, AccountModel, GroupCodeModel, PartyModel } from '../../customer-master.model';
// import { CommonSnackbarComponent } from '../../../../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
// import { StateMasterListModel, CountryListModel } from '../misc-party-maintenance-menu/misc-party-maintenance.model';
// import { TableColumnHeaderViews as defaultGst } from '../constants'
// import { APP_DATE_FORMATS, AppDateAdapter } from '../../../../../../core/services/date-adapter/app-date-adapter';
// import { MapDialogComponentComponent } from '../../../../map-dialog-component/map-dialog-component.component';
// import { CommonConfirmationDialogComponent } from 'src/app/shared/components/common-confirmation-dialog/common-confirmation-dialog.component';

// @Component({
//   selector: 'app-vendor-draft-master',
//   templateUrl: './vendor-draft-master.component.html',
//   styleUrls: ['./vendor-draft-master.component.scss'],
//   providers: [{
//     provide: DateAdapter, useClass: AppDateAdapter
//   },
//   { provide: DatePipe },
//   {
//     provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
//   }],
// })
// export class VendorDraftMasterComponent implements OnInit {
//   @ViewChild('tabGroup') tabGroup: any;

//   form: FormGroup
//   rows: FormArray = this.formBuilder.array([]);
//   getrows: FormArray = this.formBuilder.array([]);
//   aryTableControl: AbstractControl[]
//   formGroup: FormGroup
//   gstValid:boolean=false;
//   gst_verification_flg:any;
//   tempDatasource: any;
//   companyListDatasource: any;

//   lstBank: any;
//   toSelectedBank: any
//   custTypeList: any[]
//   selectionList: any[]
//   payload: any = {}
//   list_map: any = [];

//   addview: boolean = false
//   menuview: boolean = true
//   addcontactview: boolean = false

//   countryLists: any = []
//   filteredCountryLists: Observable<any>

//   accLists: AccountModel[] = new Array<AccountModel>()
//   filteredAccLists: AccountModel[] = new Array<AccountModel>()
//   filteredAccLists1: AccountModel[] = new Array<AccountModel>()
//   st_ctr_code: any;

//   grpLists: GroupCodeModel[] = new Array<GroupCodeModel>()
//   filteredgrpLists: GroupCodeModel[] = new Array<GroupCodeModel>()

//   stateDataStr: string;
//   stateData: any;
//   flgModify: string = 'N'
//   flgAuthorize: string = 'N'
//   cs_authorised: string = 'N'
//   flgSave: boolean = false
//   cust_supplr_code: any = "NEW";
//   cust_supplr_name: any;
//   chkEmailRegx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
//   saveDraftAction: string = 'save'

//   industryTypeList: any = []
//   companyList: any[]

//   stateLists: any = [];

//   stateELists: any = [];
//   countryELists: any = []

//   stateEditResLists: any = [];
//   stateEditOffLists: any = [];
//   stateResLists: any = [];
//   stateOffLists: any = [];

//   addressCode: number = 1
//   contactCode: number = 1

//   addressview: boolean = false
//   lstAddedAdress: any = [];
//   addedFlag: boolean = false
//   addedContactFlag: boolean = false
//   showAddAddrRowFlag: boolean = false
//   showAddContactRowFlag: boolean = false
//   lstAddedContact: any = [];

//   filteredInstructedByLists: Observable<any>
//   lstHandledBy: any = []

//   lstSupDetail: any = [];
//   lstCustOf: any = [];
//   debitExpList: any = []
//   cs_rcm_flg: string = 'N'
//   cs_service_tax_flg: string = 'N'
//   ccs_attachment_reqd:string=''
//   cs_tds_per_transaction_flg: string = 'N'
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

//   sectionOfList: any = []
//   selectedIndex: number = -1;
//   selectedEditIndex: number = -1;
//   selectedEExpIndex: number = -1;
//   selectedExpenseDataArray: any[] = []
//   selectedEditExpenseDataArray: any[] = []
//   lstAddedDebitExpense: any = [];
//   showAddedDebitExpenseFlg: boolean = true
//   vem_tds_per_transaction_flg: any = []
//   vem_tds_applicable_flag:any = []
//   vem_gst_credit_blocked:any = []
//   toCustOfSelected: any = []

//   defaultGst: string
//   stateArray: any = []
//   countryArray: any = []

//   queryParams = {}
//   selectedContactIndex: number = 0
//   contactCodeArray: any = [];
//   selectedAddressIndex: number = 0
//   addressCodeArray: any = [];
//   toSelected: any = []
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

//   showExpIconFLg: boolean = false
//   showAddNewExpenseIconFlg:boolean = false

//   hideBtnDiv: boolean = false
//   flgAddRights: boolean = false
//   flgModifyRights: boolean = false
//   flgViewCustRights: boolean = false
//   isForViewFlg: any;
//   email_verification_flg: any;
//   filterVenList: PartyModel[] = new Array<PartyModel>()
//   extended_company: string;
//   constructor(
//     private formBuilder: FormBuilder,
//     private utilityServiceAvaxPro: UtilityServiceAvaxPro,
//     private router: Router,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog,
//     private customerMasterService: CustomerMasterService,
//   ) {
//     this.form = this.formBuilder.group({
//       txtVendorName: [''],
//       rdbAccFlag: ['V'],
//       txtGrpCode: [''],
//       txtPanNo: [''],
//       rdbRcmFlg: ['N'],
//       rdbServiceTaxFlg: ['N'],
//       attachment_reqd:[''],
//       txtuanno: [''],
//       txtbankbranch: [''],
//       txtbankadd: [''],
//       txtaccno: [''],
//       txtifscCode: [''],
//       txtcontactNo: [''],
//       txtemailID: [''],
//       cmbBank: [''],

//       arrayAddAdress: this.formBuilder.array([]),
//       arrayEditAdress: this.formBuilder.array([]),

//       arrayAddDebExpense: this.formBuilder.array([]),
//       arrayEditDebExpense: this.formBuilder.array([]),

//       txtEVendorName: [''],
//       txtEPanNo: [''],
//       txtEGrpCode: [''],
//       cmbECustType: [''],
//       txtEUanNo: [''],
//       rdbERcmFlg: ['N'],
//       rdbEServiceTaxFlg: ['N'],
//       txtESacNo: [''],
//       cmbEBank: [''],
//       txtEBankBranch: [''],
//       txtEBankAddr: [''],
//       txtEAccNo: [''],
//       attachment_reqd1:[''],
//       txtEIfscCode: [''],
//       txtEContactName: [''],
//       txtEEmailID: [''],

//       txtAuthRemark: ['']
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

//   ngOnDestroy() {
//     sessionStorage.removeItem("refData");
//   }

//   loadPageData() {

//     if (sessionStorage.refData)
//       this.stateDataStr = sessionStorage.getItem("refData") || '';
//     else {
//       this.stateDataStr = sessionStorage.getItem("stateData") || ;
//       sessionStorage.removeItem("stateData");
//       sessionStorage.setItem("refData", this.stateDataStr);
//     }
//     this.stateData = JSON.parse(this.stateDataStr)
//     if (this.stateData != null) {
//       this.cust_supplr_code = this.stateData.cust_supplr_code
//       this.flgModify = this.stateData.flgModify
//       this.flgAuthorize = this.stateData.flgAuthorize
//       this.cs_authorised = this.stateData.cs_authorised
//       this.selectedIndex = -1
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
//       this.selectedIndex = 0
//       this.flgAddRights = true
//       this.isForViewFlg = 'A'
//     }

//     this.hideBtnDiv = false

//     this.getSelectionTdsList()
//     this.getCustomerTypeList()

//     this.getCompanyList()

//     //group code
//     this.form.get('txtGrpCode')?.valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filteredgrpLists = new Array<GroupCodeModel>()
//     }),
//       switchMap((value: any) => {
//         if (value != null && value != undefined) {
//           value = typeof value === 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name;
//           return value.length > 3 ? this.getGroupCodeList(value) :(['']);
//         }
//         return ([]);
//       })
//     ).subscribe((data: any) => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filteredgrpLists = data.responseData[0].map((item : any) => {
//           return new GroupCodeModel(item.cs_cust_supplr_code, item.cs_name)
//         })
//       }
//       return this.filteredgrpLists
//     },
//       error: error => {
//         console.log(error)
//       }
//     )

//     if (this.flgModify == 'Y') {
//       this.getVendorDetail(this.cust_supplr_code)
//       this.showIconFLg = false
//       this.showExpIconFLg = false
//     }
//     else if (this.flgModify == 'N') {
//       this.showIconFLg = false
//       this.showExpIconFLg = false
//       this.addNewAddressRow(0); //initilize address row
//       this.arrayAddDebExpenseRow(0); //expense 
//       this.getBankList()
//     }

//     this.selectedExpenseDataArray = []
//     this.selectedEditExpenseDataArray = []
//     this.custAddressArray = []
//     this.custContactArray = []
//     this.debitExpAccCodeArry = []
    
//     this.form.get('txtVendorName').valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filterVenList = new Array<PartyModel>()
//     }),
//       switchMap(value => {
//         value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//         return value.length > 5 && this.flgAddRights && this.flgModify=='N' ? this.customerMasterService.searchParty(value,'M') : ['']
//       })
//     ).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filterVenList = data.responseData.map(item => {
//           return new PartyModel(item.cs_cust_supplr_code, item.cs_name)
//         })
//       }
//       return this.filterVenList
//     },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getAccountList(account): Observable<any> {
//     return this.customerMasterService.getAccountAccDropDown(account)
//   }

//   displayAcclist(value): string | undefined {
//     return value ? value.acc_code + ' :: ' + value.acc_name : undefined
//   }

//   filterAcc(val: string) {
//     return this.accLists.filter(option => {
//       return (option.acc_code.toUpperCase().includes(val.toUpperCase()) ||
//         option.acc_name.toUpperCase().includes(val.toUpperCase())
//       )
//     })
//   }

//   displayAcclist1(value): string | undefined {
//     return value ? value.acc_code + ' :: ' + value.acc_name : undefined
//   }

//   filterAcc1(val: string) {
//     return this.accLists.filter(option => {
//       return (option.acc_code.toUpperCase().includes(val.toUpperCase()) ||
//         option.acc_name.toUpperCase().includes(val.toUpperCase())
//       )
//     })
//   }

//   getGroupCodeList(account): Observable<any> {
//     return this.customerMasterService.getGroupCode(account)
//   }

//   displayGrplist(value): string | undefined {
//     return value ? value.cs_cust_supplr_code + ' :: ' + value.cs_name : undefined
//   }

//   filterGrp(val: string) {
//     return this.grpLists.filter(option => {
//       return (option.cs_cust_supplr_code.toUpperCase().includes(val.toUpperCase()) ||
//         option.cs_name.toUpperCase().includes(val.toUpperCase())
//       )
//     })
//   }

//   getCompanyList() {
//     this.utilityServiceAvaxPro.getCompanyList().subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.tempDatasource = data.responseData[0];
//       }
//       this.companyListDatasource = data.responseData[0];
//       this.tempDatasource.forEach(item => {
//         this.form.addControl('chkcmp' + item.sc_company_code, new FormControl(false))
//       })
//     },
//       error => {
//         console.log(error)
//       })
//   }

//   getBankList() {
//     this.customerMasterService.getBankList({}).subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.lstBank = data.responseData[0]
//           if (this.flgModify == 'Y') {
//             const selectedBank = this.lstBank.find(c => c.bnk_code_brch == this.toSelectedBank)
//             this.form.get('cmbEBank').setValue(selectedBank);
//           }
//         }
//       })
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

//   getSelectionTdsList() {
//     this.utilityServiceAvaxPro.getSelectionList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.selectionList = data.responseData[0].map(item => {
//             return new SelectionListModel(item.sm_code, item.sm_percentage, item.sm_corporate_perc)
//           })
//         }
//         return this.selectionList
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   checkDraftValidation(): any {

//     if (this.form.get('txtVendorName').value == '' || this.form.get('txtVendorName').value == null) {
//       this.openSnackBar('Please Enter Vendor Name');
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

//     let regex = /^[a-zA-Z]*$/;
//     if (!regex.test(this.form.get('txtbankbranch').value)) {
//       this.openSnackBar("Please Dont Enter Special Characters For BANK BRANCH  ");
//       return false;
//     }

//     this.list_map = [];
//     this.tempDatasource.forEach(item => {
//       if (this.form.get('chkcmp' + item.sc_company_code).value == true) {
//         console.log(item, ' CMP NAME ITEM')
//         this.list_map.push({ "sc_name": item.sc_name, "sc_company_code": item.sc_company_code, "sc_company_short_name": item.sc_company_short_name })
//       }
//     })

//     if (this.list_map.length == 0) {
//       this.openSnackBar('Please select COMPANY. ');
//       return false;
//     }

//     return true;
//   }

//   getExpenseCodeData() {

//     this.selectedExpenseDataArray = []
//     console.log(" this.selectedIndex ", this.selectedIndex)

//     for (let index = 0; index <= this.selectedIndex; index++) {

//       this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       let threshold = ''
//       if (this.formGroup.controls.txtThresHold.value == "" || this.formGroup.controls.txtThresHold.value == undefined || this.formGroup.controls.txtThresHold.value == null) {
//         threshold = ""
//       } else {
//         threshold = this.formGroup.controls.txtThresHold.value
//       }

//       let sacno = ''
//       if (this.formGroup.controls.txtSacNo.value == "" || this.formGroup.controls.txtSacNo.value == undefined || this.formGroup.controls.txtSacNo.value == null) {
//         sacno = ""
//       } else {
//         sacno = this.formGroup.controls.txtSacNo.value
//       }

//       this.selectedExpenseDataArray.push({
//         vem_cust_supplr_code: this.cust_supplr_code,
//         vem_tds_type: this.formGroup.controls.txtTypeOfTds.value,
//         vem_tds_section: this.formGroup.controls.cmbSelectionOfTds.value.sm_code,
//         vem_tds_percent: this.formGroup.controls.txtPercOfTds.value,
//         vem_threshold: threshold,
//         vem_debit_expensecode: this.formGroup.controls.txtDebitExpCode.value.acc_code,
//         vem_igst_percentage: this.formGroup.controls.txtIgstPerc.value,
//         vem_cgst_percentage: this.formGroup.controls.txtCgstPerc.value,
//         vem_sgst_percentage: this.formGroup.controls.txtSgstPerc.value,
//         vem_tds_per_transaction_flg: this.formGroup.controls.rdbTdsPerTransFlg.value,
//         vem_tds_applicable_flag: this.formGroup.controls.rdbTdsApplFlg.value,
//         vem_tds_acc_code: this.formGroup.controls.txtTdsAccCode.value.acc_code,
//         vem_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//         vem_deleted_flg: 'N',
//         vem_sac_no: sacno,
//         vem_gst_credit_blocked: this.formGroup.controls.rdbGstCblk.value,
//         vem_cust_flg: this.formGroup.controls.cmbCustOf.value != undefined ? this.formGroup.controls.cmbCustOf.value : '-',
//         vem_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       })

//     }
//   }


//   saveVendorDraft() {

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
//       cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//       cd_deleted_flg: 'N',
//       cd_name: this.form.get('txtVendorName').value,
//       cs_ts_origin: 'NO_DATE',
//       cs_cust_supplr_flg: this.form.get('rdbAccFlag').value,
//       cd_grp_code: this.form.get('txtGrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("txtGrpCode").value.cs_cust_supplr_code : '',
//       cd_pan_no: this.form.get('txtPanNo').value,
//       cs_rcm_flg: this.form.get('rdbRcmFlg').value,
//       cs_service_tax_flg: this.form.get('rdbServiceTaxFlg').value,
//       cd_uan_no: this.form.get('txtuanno').value,
//       ccs_attachment_reqd:this.form.get('attachment_reqd').value,
//       companyList: this.list_map,
//       cd_bank_code: this.form.get('cmbBank').value.bnk_code,
//       cd_bank_name: this.form.get('cmbBank').value.bnk_code_brch,
//       cd_bank_branch: this.form.get('txtbankbranch').value,
//       cd_bank_address: this.form.get('txtbankadd').value,
//       cd_account_no: this.form.get('txtaccno').value,
//       cd_bank_ifsc_code: this.form.get('txtifscCode').value,
//       cs_bank_contact_name: this.form.get('txtcontactNo').value != undefined ? this.form.get('txtcontactNo').value : '',
//       cs_bank_email_id: this.form.get('txtemailID').value != undefined ? this.form.get('txtemailID').value : '',
//       vemDto: this.selectedExpenseDataArray,
//       contactDto: this.contactArray,
//       custAddrDto: this.custAddressArray,
//     }

//     this.customerMasterService.completeSupplierVendor(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.cust_supplr_code = data.responseData[1]
//         this.cust_supplr_name = data.responseData[2]
//         this.selectedExpenseDataArray = []
//         this.custAddressArray = []
//         this.custContactArray = []

//         if (data.responseData[0] == "INSERTED SUCCESSFULLY") {

//           this.openSnackBar("vendor INSERTED SUCCESSFULLY and vendor code is " + this.cust_supplr_code);
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
//           this.router.navigate(['/session/master/customer-draft-master/vendor'], { state: datastr });
//           this.showIconFLg = false
//           this.tabGroup.selectedIndex = 0
//           return true;
//         }


//       } else {
//         this.openSnackBar("Error While updating vendor details");
//         return false;
//       }
//     })



//   }

//   openSnackBar(message) {
//     this.snackBar.openFromComponent(CommonSnackbarComponent, {
//       data: message,
//       duration: 10000
//     });
//   }

//   getFormattedDate(res: any) {
//     const format = 'dd-MM-yyyy';
//     const locale = 'en-US';
//     const formattedDate = formatDate(res, format, locale);
//     return formattedDate
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

//   selectedEditAddrIndex: number = 0
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
//     // this.formGroup.controls.txtEAddrThird.setValue(current_row.csad_address3)
//     this.formGroup.controls.txtEAddrThird.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address3));
//     // this.formGroup.controls.txtEAddrFourth.setValue(current_row.csad_address4)
//     this.formGroup.controls.txtEAddrFourth.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_address4));
//     // this.formGroup.controls.txtECity.setValue(current_row.csad_city)
//     this.formGroup.controls.txtECity.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_city));
//     this.formGroup.controls.txtEPinCode.setValue(current_row.csad_pincode)
//     this.formGroup.controls.txtELattitude.setValue(current_row.csad_latitude)
//     this.formGroup.controls.txtELongitude.setValue(current_row.csad_longitude)
//     this.formGroup.controls.txtETelNoOne.setValue(current_row.csad_tel_no1)
//     this.formGroup.controls.txtETelNoSecond.setValue(current_row.csad_tel_no2)
//     this.formGroup.controls.txtEStdCode.setValue(current_row.csad_std_code)
//     this.formGroup.controls.txtEIsdCode.setValue(current_row.csad_isd_code)
//     // this.formGroup.controls.txtEFaxNoOne.setValue(current_row.csad_fax_1)
//     this.formGroup.controls.txtEFaxNoOne.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_fax_1));
//     // this.formGroup.controls.txtEFaxNoSecond.setValue(current_row.csad_fax_2)
//     this.formGroup.controls.txtEFaxNoSecond.setValue(this.utilityServiceAvaxPro.doTrim(current_row.csad_fax_2));
//     this.formGroup.controls.txtEEmailIdOne.setValue(current_row.csad_email_1)
//     this.formGroup.controls.txtEEmailIdSecond.setValue(current_row.csad_email_2)
//     this.formGroup.controls.txtEHotLineNo.setValue(current_row.csad_hotline_no)
//     this.formGroup.controls.txtEMobileNo.setValue(current_row.csad_mobile_no)

//     if (current_row.csad_email_flg != '') {
//       this.csad_email_flg[index] = current_row.csad_email_flg
//     } else {
//       this.csad_email_flg[index] = 'N'
//     }

//     if (current_row.csad_gst_no != "") {
//       this.formGroup.controls.txtEGstNo.setValue(current_row.csad_gst_no)
//     } else {
//       this.formGroup.controls.txtEGstNo.setValue(this.defaultGst)
//     }

//     this.countryArray[index] = current_row.csad_country_code
//     this.formGroup.controls.cmbECountry.setValue(current_row.csad_country_code)

//     this.getESetStateDropdown(index, current_row.csad_state_code)

//     //this.lstETax[index] = this.lstDummyTax
//     //this.lstETransporter[index] = this.lstDummyTransporter
//     console.log('index = ', index);
//     console.log(this.lstETax[index]);
//     console.log(this.lstETransporter[index]);

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

//   saveVendorAddress(index) {

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
//       cs_cust_supplr_flg: 'V',
//       cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
//       cd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//       cd_pan_no: this.form.controls.txtEPanNo.value != undefined ? this.form.controls.txtEPanNo.value : '-',
//       custAddrDto: this.custAddressArray,
//     }
//     this.customerMasterService.saveSupplierVendorAddress(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.newAddressIndex=-1
//         this.openSnackBar(" Vendor details updated successfully ")
//         this.selectedEditExpenseDataArray = []
//         this.custContactArray = []
//         this.custAddressArray = []
//         this.resetExpenseCodeEntryRow();
//         this.getUpdateVendorDetail(this.cust_supplr_code)
//         this.tabGroup.selectedIndex = 0

//         this.debititems.removeAt(0)

//         // return true;

//         // console.log(" data.responseData ", data.responseData)
//         // this.openSnackBar(" Address Details Inserted Successfully");

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

//   getVendorDetail(cust_supplier_code) {

//     this.payload = {
//       cd_cust_supplr_code: cust_supplier_code,
//       cs_cust_supplr_flg: 'V',
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

//         this.debitExpList = data.responseData[8]
//         this.getDebitExpenseDetails(data.responseData[8]); //vem_list

//         this.addressview = true
//         this.addedFlag = false
//         this.showAddAddrRowFlag = true

//         this.lstDummyTax = data.responseData[6] //tax_list
//         this.lstDummyTransporter = data.responseData[7] //transporter_list
//         if(data.responseData[9].extended_company == 'N'){
//           this.extended_company="Not Extended in Logged in Company"
//         }else{
//           this.extended_company=""
//         }
//         this.lstAddedAdress = data.responseData[4]
//         if (this.lstAddedAdress.length > 0) {
//           this.showIconFLg = true
//           for (let index = 0; index < this.lstAddedAdress.length; index++) {
//             this.initAddedAddressRow(index, this.lstAddedAdress[index])
//             this.addressCode = this.lstAddedAdress[index].csad_addr_code
//           }
//           this.addressCode = (Number(this.addressCode) + 1)
//           //this.addNewAddressRow(0)
//         } else {
//           this.showIconFLg = false
//           this.addressCode = 1
//           this.addNewAddressRow(0)
//         }

//         /* this.addcontactview = true
//         this.addedContactFlag = false
//         this.showAddContactRowFlag = true

//         this.lstAddedContact = data.responseData[5]
//         if (this.lstAddedContact.length > 0) {
//           for (let index = 0; index < this.lstAddedContact.length; index++) {
//             this.initAddedContactRow(index, this.lstAddedContact[index])
//             this.contactCode = this.lstAddedContact[index].con_code
//           }
//           this.contactCode = (Number(this.contactCode) + 1)
//           this.addNewContactRow(0)
//         } else {
//           this.contactCode = 1
//           this.addNewContactRow(0)
//         } */



//         this.sisConcernLists[0] = data.responseData[1]

//         // this.form.get("txtEVendorName").setValue(this.lstSupDetail.cs_name)
//         this.form.get("txtEVendorName").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_name));
// //        this.form.get("txtEPanNo").setValue(this.lstSupDetail.cs_pan_no)
//         this.form.get("txtEPanNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_pan_no));
//         // this.form.get("txtEUanNo").setValue(this.lstSupDetail.cs_msme_uan_no)
//         this.form.get("txtEUanNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_msme_uan_no));
//         this.form.get('rdbERcmFlg').setValue(this.lstSupDetail.cs_rcm_flg)
//         this.form.get('attachment_reqd1').setValue(this.lstSupDetail.ccs_attachment_reqd)
//         // this.form.get('rdbETdsPerTransFlg').setValue(this.lstSupDetail.cs_rcm_flg)
//         //rdbETdsPerTransFlg

//         if (this.lstSupDetail.cs_grp_code.length > 1) {
//           this.form.get('txtEGrpCode').setValue(new GroupCodeModel(this.lstSupDetail.cs_grp_code, this.lstSupDetail.cs_grp_name));
//         }

//         this.form.get('txtEGrpCode').valueChanges.pipe(debounceTime(100), tap(() => {
//           this.filteredgrpLists = new Array<GroupCodeModel>()
//         }),
//           switchMap(value => {
//             if (value != null || value != undefined) {
//               value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//               return value.length > 3 ? this.getGroupCodeList(value) : ['']
//             }
//           })
//         ).subscribe(data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//             this.filteredgrpLists = data.responseData[0].map(item => {
//               return new GroupCodeModel(item.cs_cust_supplr_code, item.cs_name)
//             })
//           }
//           return this.filteredgrpLists
//         },
//           error => {
//             console.log(error)
//           }
//         )

//         this.cs_cust_of = this.lstSupDetail.cs_cust_of
//         this.cs_rcm_flg = this.lstSupDetail['cs_rcm_flg']
//         this.cs_service_tax_flg = this.lstSupDetail['cs_service_tax_flg']
//         this.cs_tds_per_transaction_flg = this.lstSupDetail['cs_tds_per_transaction_flg']
//           this.ccs_attachment_reqd=this.lstSupDetail['ccs_attachment_reqd']
//           // console.log(this.lstSupDetail['ccs_attachment_reqd'])
//         // this.form.get("txtEBankBranch").setValue(this.lstSupDetail.cs_bank_branch)
//         // this.form.get("txtEBankAddr").setValue(this.lstSupDetail.cs_bank_address)
//         // this.form.get("txtEAccNo").setValue(this.lstSupDetail.cs_account_no)

//         this.form.get("txtEBankBranch").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_bank_branch));
//         this.form.get("txtEBankAddr").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_bank_address));
//         this.form.get("txtEAccNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_account_no));

//         this.form.get("txtEIfscCode").setValue(this.lstSupDetail.cs_rtgs_code == null ||
//           this.lstSupDetail.cs_rtgs_code == undefined ||
//           this.lstSupDetail.cs_rtgs_code == '' ? '' : this.lstSupDetail.cs_rtgs_code.trim())
//         this.form.get("txtEContactName").setValue(this.lstSupDetail.cs_bank_contact_name)
//         this.form.get("txtEEmailID").setValue(this.lstSupDetail.cs_bank_email_id)

//         this.toSelectedBank = this.lstSupDetail['cs_bank_name']
//         console.log(" toSelectedBank ", this.toSelectedBank)
//         this.getBankList();

//         //this.getContactCountryList(0);

//         this.lstTax[0] = this.lstDummyTax
//         this.lstTransporter[0] = this.lstDummyTransporter

//         //this.contactList = data.responseData[9].contactList;
//         this.lstAddedContact = data.responseData[5]
//         this.setContactData(this.lstAddedContact)
//       }
//     })
//   }

//   getUpdateVendorDetail(cust_supplier_code) {

//     this.payload = {
//       cd_cust_supplr_code: cust_supplier_code,
//       cs_cust_supplr_flg: 'V',
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

//         this.debitExpList = data.responseData[8]
//         this.getDebitExpenseDetails(data.responseData[8]); //vem_list

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

//         // this.form.get("txtEVendorName").setValue(this.lstSupDetail.cs_name)
//         // this.form.get("txtEPanNo").setValue(this.lstSupDetail.cs_pan_no)
//  //     this.form.get("txtEUanNo").setValue(this.lstSupDetail.cs_msme_uan_no)
//         this.form.get("txtEVendorName").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_name));
//         this.form.get("txtEPanNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_pan_no));
//         this.form.get("txtEUanNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_msme_uan_no));

//         if (this.lstSupDetail.cs_grp_code.length > 1) {
//           this.form.get('txtEGrpCode').setValue(new GroupCodeModel(this.lstSupDetail.cs_grp_code, this.lstSupDetail.cs_grp_name));
//         }

//         this.form.get('txtEGrpCode').valueChanges.pipe(debounceTime(100), tap(() => {
//           this.filteredgrpLists = new Array<GroupCodeModel>()
//         }),
//           switchMap(value => {
//             if (value != null || value != undefined) {
//               value = typeof value == 'string' || value instanceof String ? value : value.cs_cust_supplr_code || value.cs_name
//               return value.length > 3 ? this.getGroupCodeList(value) : ['']
//             }
//           })
//         ).subscribe(data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//             this.filteredgrpLists = data.responseData[0].map(item => {
//               return new GroupCodeModel(item.cs_cust_supplr_code, item.cs_name)
//             })
//           }
//           return this.filteredgrpLists
//         },
//           error => {
//             console.log(error)
//           }
//         )

//         this.cs_cust_of = this.lstSupDetail.cs_cust_of
//         this.cs_rcm_flg = this.lstSupDetail['cs_rcm_flg']
//         this.cs_service_tax_flg = this.lstSupDetail['cs_service_tax_flg']
//         this.cs_tds_per_transaction_flg = this.lstSupDetail['cs_tds_per_transaction_flg']
//           this.ccs_attachment_reqd=this.lstSupDetail['ccs_attachment_reqd']

//         this.getBankList();

//         // this.form.get("txtEBankBranch").setValue(this.lstSupDetail.cs_bank_branch)
//         // this.form.get("txtEBankAddr").setValue(this.lstSupDetail.cs_bank_address)
//         // this.form.get("txtEAccNo").setValue(this.lstSupDetail.cs_account_no)

//         this.form.get("txtEBankBranch").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_bank_branch));
//         this.form.get("txtEBankAddr").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_bank_address));
//         this.form.get("txtEAccNo").setValue(this.utilityServiceAvaxPro.doTrim(this.lstSupDetail.cs_account_no));

//         //this.form.get("txtEIfscCode").setValue(this.lstSupDetail.cs_rtgs_code)
//         this.form.get("txtEIfscCode").setValue(this.lstSupDetail.cs_rtgs_code == null ||
//           this.lstSupDetail.cs_rtgs_code == undefined ||
//           this.lstSupDetail.cs_rtgs_code == '' ? '' : this.lstSupDetail.cs_rtgs_code.trim())


//         this.form.get("txtEContactName").setValue(this.lstSupDetail.cs_bank_contact_name)
//         this.form.get("txtEEmailID").setValue(this.lstSupDetail.cs_bank_email_id)

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

//     if (this.form.get('txtEVendorName').value == '' || this.form.get('txtEVendorName').value == null) {
//       this.openSnackBar('Please Enter vendor Name');
//       return false;
//     }

//     let regAplhaNum = /^\d*[a-zA-Z][a-zA-Z\d]*$/;
//     if (this.utilityServiceAvaxPro.doTrim(this.form.get('txtEIfscCode').value )!= "") {
//       /* if (!isNaN(this.form.get('txtEIfscCode').value)) {
//         this.openSnackBar("Please Enter Only AlphaNumeric Value ");
//         return false;
//       } */
//       if (!this.form.get('txtEIfscCode').value.trim().match(regAplhaNum)) {
//         this.openSnackBar("Please Dont Enter Special Characters For RTGS/IFSC CODE  ");
//         return false;
//       }
//     }

//     /*  if (this.form.get('txtEEmailID').value != "") {
//        if (!this.chkEmailRegx.test(this.form.get('txtEEmailID').value)) {
//          this.openSnackBar("Please Enter a valid email address")
//          return false
//        }
//      }
//   */

//     let regex = /^[a-zA-Z]*$/;
    
//     if (this.utilityServiceAvaxPro.doTrim(this.form.get('txtEBankBranch').value)!= "") {
//       if (!regex.test(this.form.get('txtEBankBranch').value)) {
//         this.openSnackBar("Please Dont Enter Special Characters For BANK BRANCH  ");
//         return false;
//       }
//     }
//     return true;
//   }//end of func

//   //modify calls
//   updateVendor() {
// //console.log(this.form.get('cmbEBank').value.bnk_code_brch , ' tbnk_code_brch ')
// //console.log(this.form.get('cmbEBank').value , ' cmbEBank ')
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
//       cd_name: this.form.get('txtEVendorName').value,
//       cs_cust_supplr_flg: 'V',
//       cd_cust_supplr_code: this.cust_supplr_code,
//       cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),

//       cd_grp_code: this.form.get('txtEGrpCode').value.cs_cust_supplr_code != undefined ? this.form.get("txtEGrpCode").value.cs_cust_supplr_code : '',
//       cd_cust_flg: this.form.get('cmbECustType').value != undefined ? this.form.get('cmbECustType').value : '',
//       cs_rcm_flg: this.form.get('rdbERcmFlg').value,
//       cs_service_tax_flg: this.form.get('rdbEServiceTaxFlg').value,
//       cd_pan_no: this.form.get('txtEPanNo').value != undefined ? this.form.get("txtEPanNo").value : '',
//       // cd_bank_name: this.form.get('cmbEBank').value.bnk_code_brch,
//       cd_bank_name: this.form.get('cmbEBank').value != undefined  ? this.form.get('cmbEBank').value.bnk_code_brch : '',
//       cd_bank_branch: this.form.get('txtEBankBranch').value != undefined ? this.form.get("txtEBankBranch").value : '',
//       cd_bank_address: this.form.get('txtEBankAddr').value != undefined ? this.form.get("txtEBankAddr").value : '',
//       cd_account_no: this.form.get('txtEAccNo').value != undefined ? this.form.get("txtEAccNo").value : '',
//       cd_rtgs_code: this.form.get('txtEIfscCode').value != undefined ? this.form.get("txtEIfscCode").value : '',
//       cs_bank_contact_name: this.form.get('txtEContactName').value != undefined ? this.form.get('txtEContactName').value : '',
//       cs_bank_email_id: this.form.get('txtEEmailID').value != undefined ? this.form.get('txtEEmailID').value : '',
//       cd_uan_no: this.form.get('txtEUanNo').value != undefined ? this.form.get("txtEUanNo").value : '',
//       cd_deleted_flg: 'N',
//       cd_aadhar_no: '',
//       vemDto: this.selectedEditExpenseDataArray,
//       contactDto: this.contactArray,
//       custAddrDto: this.custAddressArray,
//       ccs_attachment_reqd:this.form.get('attachment_reqd1').value,
//     }

    
//     console.log(" updateSupplierVendor ", this.payload)

//     this.customerMasterService.updateSupplierVendor(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         if(this.newAddressIndex>=0 || this.newExpenseIndex>=0){
//           if(this.newAddressIndex>=0){
//             this.AddNewAddress(this.newAddressIndex);
//           }
//           if(this.newExpenseIndex>=0){
//             this.AddExpenseRow(this.newExpenseIndex)
//           }
//         }
//         else{
//           this.openSnackBar(" Vendor details updated successfully ")
//           this.selectedEditExpenseDataArray = []
//           this.custContactArray = []
//           this.custAddressArray = []
//           this.resetExpenseCodeEntryRow();
//           this.getUpdateVendorDetail(this.cust_supplr_code)
//           this.tabGroup.selectedIndex = 0
  
//           this.debititems.removeAt(0)
  
//           return true;
//         }
//       } else {
//         this.openSnackBar("Error While updating vendor details");
//         return false;
//       }
//     })

//   }

//   filterHandledBy(val: string) {
//     return this.lstHandledBy.filter(option => {
//       return option.usr_name.toLowerCase().includes(val.toLowerCase())
//     })
//   }

//   displayHandledBy(value): string | undefined {
//     return value ? value.usr_name : undefined
//   }

//   get debititems(): FormArray { return this.form.get('arrayAddDebExpense') as FormArray; }

//   arrayAddDebExpenseRow(index) {
//     this.selectedIndex = index
//     let control = <FormArray>this.form.controls.arrayAddDebExpense;
//     control.push(
//       this.formBuilder.group({
//         txtTypeOfTds: [''],
//         cmbSelectionOfTds: [''],
//         txtPercOfTds: [''],
//         txtThresHold: [''],
//         txtDebitExpCode: [''],
//         txtSgstPerc: [''],
//         txtCgstPerc: [''],
//         txtIgstPerc: [''],
//         rdbTdsPerTransFlg: ['N'],
//         rdbTdsApplFlg : ['N'],
//         txtTdsAccCode: [''],
//         txtSacNo: [''],
//         cmbCustOf: [''],
//         rdbGstCblk: ['N'],
//         rdbCreditBlock:[''],
//       })
//     )
//     this.getSectionOfTdsList(index)

//     this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     this.formGroup.controls.txtDebitExpCode.valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filteredAccLists = new Array<AccountModel>()
//     }),
//       switchMap(value => {
//         if (value != null || value != undefined) {
//           value = typeof value == 'string' || value instanceof String ? value : value.acc_code || value.acc_name
//           return value.length > 3 ? this.getAccountList(value) : ['']
//         }
//       })
//     ).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filteredAccLists = data.responseData[0].map(item => {
//           return new AccountModel(item.acc_code, item.acc_name)
//         })
//       }
//       return this.filteredAccLists
//     },
//       error => {
//         console.log(error)
//       }
//     )

//     this.formGroup.controls.txtTdsAccCode.valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filteredAccLists1 = new Array<AccountModel>()
//     }),
//       switchMap(value => {
//         if (value != null || value != undefined) {
//           value = typeof value == 'string' || value instanceof String ? value : value.acc_code || value.acc_name
//           return value.length > 3 ? this.getAccountList(value) : ['']
//         }
//       })
//     ).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filteredAccLists1 = data.responseData[0].map(item => {
//           return new AccountModel(item.acc_code, item.acc_name)
//         })
//       }
//       return this.filteredAccLists1
//     },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   getSectionOfTdsList(index) {
//     this.utilityServiceAvaxPro.getSelectionList().subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.sectionOfList[index] = data.responseData[0].map(item => {
//             return new SelectionListModel(item.sm_code, item.sm_percentage, item.sm_corporate_perc)
//           })
//         }
//         return this.sectionOfList[index]
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }

//   debitExpAccCodeArry: any[] = []
//   selectedExpCode: number = 0
//   AddExpenseRow(index) {
//     console.log(" AddExpenseRow ", index)
//     console.log(" this.selectedIndex = index ", this.selectedIndex)

//     if (this.flgModify == 'Y') {

            
//       this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[this.selectedIndex] as FormGroup;

//       const codeindex: number = this.debitExpAccCodeArry.indexOf(this.formGroup.controls.txtDebitExpCode.value.acc_code);
//       console.log(" codeindex ", codeindex)

//       if (codeindex !== -1 && codeindex == 0) {
//         this.openSnackBar("Debit Exp.Account Code should not be same.");
//         return false;
//       } else {

//         if (this.checkDebitExpense(this.selectedIndex)) {

//           this.getExpenseCodeData();

//           this.payload = {
//             userInformationDto: {
//               usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//               usr_name: atob(sessionStorage.getItem(btoa('username'))),
//               fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//               fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//               fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//               usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//               usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//               usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//               usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//               usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//             },
//             cs_cust_supplr_flg: 'V',
//             cd_cust_supplr_code: this.cust_supplr_code,
//             cd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//             cd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
//             vemDto: this.selectedExpenseDataArray,
//           }
//           console.log(" addExpenseCodeEntry ", this.payload)

//           this.customerMasterService.addExpenseCodeEntry(this.payload).subscribe(data => {
//             if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//               if (data.responseData[0] == "success") {
//                 this.openSnackBar(" expense code details added successfully ")
//                 this.selectedExpenseDataArray = []
//                 this.debitExpAccCodeArry = []
//                 this.resetExpenseCodeEntryRow();
//                 this.getUpdateVendorDetail(this.cust_supplr_code)
//                 this.debititems.removeAt(0)
//               }
//               else if (data.responseData[0] == "duplicate") {
//                 this.openSnackBar(" Debit Exp.Account Code Duplicates are not allowed ")
//               }
//               return true;
//             } else {
//               this.openSnackBar("Error While updating vendor details");
//               return false;
//             }
//           })
//         }
//       }

//     } else {

//       this.debitExpAccCodeArry = []

//       for (let i = 0; i <= index; i++) {

//         this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//         this.aryTableControl = this.getrows.controls;
//         this.formGroup = this.aryTableControl[i] as FormGroup;
//         this.debitExpAccCodeArry.push(this.formGroup.controls.txtDebitExpCode.value.acc_code)
//       }

//       //at draft level
//       if (this.checkDebitExpense(index)) {

//         if (index != 0) {
//           this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//           this.aryTableControl = this.getrows.controls;
//           this.formGroup = this.aryTableControl[index] as FormGroup;

//           const codeindex: number = this.debitExpAccCodeArry.indexOf(this.formGroup.controls.txtDebitExpCode.value.acc_code);
//           console.log(" codeindex ", codeindex)

//           if (codeindex !== -1 && codeindex == 0) {
//             this.openSnackBar("Debit Exp.Account Code should not be same.");
//             return false;
//           } else {
//             this.arrayAddDebExpenseRow(index + 1)
//             this.selectedExpCode = index + 1
//           }
//         } else {
//           this.arrayAddDebExpenseRow(index + 1)
//           this.selectedExpCode = index + 1
//         }
//       }
//     }
//   }

//   setThreshold(event, i) {
//     this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[i] as FormGroup;

//     if (this.formGroup.controls.rdbTdsPerTransFlg.value == 'Y') {
//       //disbale
//       this.formGroup.controls.txtThresHold.disable()
//     }
//     else {
//       //enanble
//       this.formGroup.controls.txtThresHold.enable();
//     }

//   }
//   setEThreshold(event, i) {
//     this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[i] as FormGroup;

//     if (this.formGroup.controls.rdbETdsPerTransFlg.value == 'Y') {
//       //disbale
//       this.formGroup.controls.txtEThresHold.disable()
//     }
//     else {
//       //enanble
//       this.formGroup.controls.txtEThresHold.enable();
//     }
//   }

//   checkDebitExpense(selectedIndex): any {

//     for (let index = 0; index <= selectedIndex; index++) {

//       this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       if (this.formGroup.controls.txtDebitExpCode.value == '' || this.formGroup.controls.txtDebitExpCode.value == null) {
//         this.openSnackBar('Debit expense Account Code Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtTypeOfTds.value == '' || this.formGroup.controls.txtTypeOfTds.value == null) {
//         this.openSnackBar('TDS Type Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtPercOfTds.value == '' || this.formGroup.controls.txtPercOfTds.value == null) {
//         this.openSnackBar('Please Enter Percentage Of TDS at row ' + (index + 1));
//         return false;
//       }

//       let percRegax = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
//       if (!percRegax.test(this.formGroup.controls.txtPercOfTds.value)) {
//         this.openSnackBar('Please Enter Valid Percentage Of TDS at row ' + (index + 1));
//         return false;
//       }

//       if (parseFloat(this.formGroup.controls.txtPercOfTds.value.trim()) > 100) {
//         this.openSnackBar("Please Enter Numeric Value For PERCENTAGE OF TDS at row " + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.rdbTdsPerTransFlg.value == 'N') {
//         if (this.formGroup.controls.txtThresHold.value == '' || this.formGroup.controls.txtThresHold.value == null) {
//           this.openSnackBar('Threshold Can Not Be Blank at row ' + (index + 1));
//           return false;
//         }
//         if (!this.formGroup.controls.txtThresHold.value.match(/^([0-9])+$/)) {
//           this.openSnackBar('Please Enter Valid Threshold at row ' + (index + 1));
//           return false;
//         }
//       }

//       if (this.formGroup.controls.txtSgstPerc.value == '' || this.formGroup.controls.txtSgstPerc.value == null) {
//         this.openSnackBar('SGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtSgstPerc.value)) {
//         this.openSnackBar('Please Enter Valid SGST at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtCgstPerc.value == '' || this.formGroup.controls.txtCgstPerc.value == null) {
//         this.openSnackBar('CGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtCgstPerc.value)) {
//         this.openSnackBar('Please Enter Valid CGST at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtIgstPerc.value == '' || this.formGroup.controls.txtIgstPerc.value == null) {
//         this.openSnackBar('IGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtIgstPerc.value)) {
//         this.openSnackBar('Please Enter Valid IGST at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtTdsAccCode.value == '' || this.formGroup.controls.txtTdsAccCode.value == null) {
//         this.openSnackBar('TDS Account Code Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }


//       if (this.formGroup.controls.cmbCustOf.value == '' || this.formGroup.controls.cmbCustOf.value == null) {
//         this.openSnackBar('cust type Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }
//     }
//     return true;

//   }

//   getDebitExpenseDetails(responseList) {
//     this.lstAddedDebitExpense = responseList
//     if (this.lstAddedDebitExpense.length > 0) {
//       this.showExpIconFLg = true
//       for (let index = 0; index < this.lstAddedDebitExpense.length; index++) {
//         this.initAddedDebitExpenseRow(index, this.lstAddedDebitExpense[index])
//         this.selectedEditIndex = index
//       }
//     } else {
//       this.showExpIconFLg = false
//       this.showAddNewExpenseIconFlg = true;
//     }
//   }

//   initAddedDebitExpenseRow(index, current_row) {
//     this.selectedEExpIndex = index
//     let control = <FormArray>this.form.controls.arrayEditDebExpense;
//     control.push(
//       this.formBuilder.group({
//         txtESerialNo: [''],
//         txtETypeOfTds: [''],
//         cmbESelectionOfTds: [''],
//         txtEPercOfTds: [''],
//         txtEThresHold: [''],
//         txtEDebitExpCode: [''],
//         txtHiddenEDebitExpCode: [''],
//         txtESgstPerc: [''],
//         txtECgstPerc: [''],
//         txtEIgstPerc: [''],
//         rdbETdsPerTransFlg: [current_row.vem_tds_per_transaction_flg],
//         rdbETdsApplFlg:[current_row.vem_tds_applicable_flag],
//         txtETdsAccCode: [''],
//         txtESacNo: [''],
//         cmbECustOf: [''],
//         rdbEGstCblk:[current_row.vem_gst_credit_blocked],
//       }
//       )
//     )

//     this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

//     this.formGroup.controls.txtESerialNo.setValue(current_row.vem_serial_no)

//     this.formGroup.controls.txtETypeOfTds.setValue(current_row.vem_tds_type)

//     this.getSectionOfTdsList(index)

//     this.toSelected[index] = current_row.vem_tds_section

//     this.formGroup.controls.txtEPercOfTds.setValue(current_row.vem_tds_percent)
//     this.formGroup.controls.txtEThresHold.setValue(current_row.vem_threshold)
//     this.formGroup.controls.txtESgstPerc.setValue(current_row.vem_sgst_percentage)
//     this.formGroup.controls.txtECgstPerc.setValue(current_row.vem_cgst_percentage)
//     this.formGroup.controls.txtEIgstPerc.setValue(current_row.vem_igst_percentage)

//     this.vem_tds_per_transaction_flg[index] = current_row.vem_tds_per_transaction_flg
    
//     this.vem_tds_applicable_flag[index] = current_row.vem_tds_applicable_flag
    
//     this.vem_gst_credit_blocked[index] = current_row.vem_gst_credit_blocked

//     this.formGroup.controls.txtESacNo.setValue(current_row.vem_sac_no)

//     this.formGroup.controls.txtEDebitExpCode.setValue(current_row.vem_debit_expensecode + '::' + current_row.vem_debit_expense_name);

//     this.debitExpAccCodeArry.push(current_row.vem_debit_expensecode);

//     this.formGroup.controls.txtHiddenEDebitExpCode.setValue(current_row.vem_debit_expensecode);

//     this.formGroup.controls.txtETdsAccCode.setValue(new AccountModel(current_row.vem_tds_acc_code, current_row.vem_tds_acc_name));

//     this.formGroup.controls.txtETdsAccCode.valueChanges.pipe(debounceTime(100), tap(() => {
//       this.filteredAccLists1 = new Array<AccountModel>()
//     }),
//       switchMap(value => {
//         if (value != null || value != undefined) {
//           value = typeof value == 'string' || value instanceof String ? value : value.acc_code || value.acc_name
//           return value.length > 3 ? this.getAccountList(value) : ['']
//         }
//       })
//     ).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.filteredAccLists1 = data.responseData[0].map(item => {
//           return new AccountModel(item.acc_code, item.acc_name)
//         })
//       }
//       return this.filteredAccLists1
//     },
//       error => {
//         console.log(error)
//       }
//     )

//     this.toCustOfSelected[index] = current_row.vem_cust_flg

//   }

//   checkEditDebitExpense(selectedIndex): any {

//     console.log('this.lstAddedDebitExpense.length = ',this.lstAddedDebitExpense.length);
//     // if(this.lstAddedDebitExpense.length==0){
//     //   this.openSnackBar("Please Add Expense code");
//     //   return false;
//     // }

//     for (let index = 0; index <= selectedIndex; index++) {
//       this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       if (this.formGroup.controls.txtETypeOfTds.value == '' || this.formGroup.controls.txtETypeOfTds.value == null) {
//         this.openSnackBar('TDS Type Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtEPercOfTds.value == '' || this.formGroup.controls.txtEPercOfTds.value == null) {
//         this.openSnackBar('Please Enter Percentage Of TDS at row ' + (index + 1));
//         return false;
//       }

//       let chkRegex = /^([0-9])+$/
//       let percRegax = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;

//       if (!percRegax.test(this.formGroup.controls.txtEPercOfTds.value)) {
//         this.openSnackBar('Please Enter Valid Percentage Of TDS at row ' + (index + 1));
//         return false;
//       }

//       if (parseFloat(this.formGroup.controls.txtEPercOfTds.value) > 100) {
//         this.openSnackBar("Please Enter Numeric Value For PERCENTAGE OF TDS at row " + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.rdbETdsPerTransFlg.value == 'N') {
//         if (this.formGroup.controls.txtEThresHold.value != 0) {
//           if (!chkRegex.test(this.formGroup.controls.txtEThresHold.value)) {
//             this.openSnackBar('Please Enter Valid Threshold at row ' + (index + 1));
//             return false
//           }
//         }
//       }

//       if (this.formGroup.controls.txtESgstPerc.value == '' || this.formGroup.controls.txtESgstPerc.value == null) {
//         this.openSnackBar('SGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtESgstPerc.value)) {
//         this.openSnackBar('Please Enter Valid SGST at row ' + (index + 1));
//         return false
//       }

//       if (this.formGroup.controls.txtECgstPerc.value == '' || this.formGroup.controls.txtECgstPerc.value == null) {
//         this.openSnackBar('CGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtEPercOfTds.value)) {
//         this.openSnackBar('Please Enter Valid CGST at row ' + (index + 1));
//         return false
//       }

//       if (this.formGroup.controls.txtEIgstPerc.value == '' || this.formGroup.controls.txtEIgstPerc.value == null) {
//         this.openSnackBar('IGST Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (!percRegax.test(this.formGroup.controls.txtEIgstPerc.value)) {
//         this.openSnackBar("Please Enter Valid IGST at row " + (index + 1))
//         return false
//       }

//       if (this.formGroup.controls.txtETdsAccCode.value == '' || this.formGroup.controls.txtETdsAccCode.value == null) {
//         this.openSnackBar('TDS Account Code Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.cmbECustOf.value == '' || this.formGroup.controls.cmbECustOf.value == null) {
//         this.openSnackBar('cust type Can Not Be Blank at row ' + (index + 1));
//         return false;
//       }
//     }
//     return true;
//   }

//   getEditExpenseCodeData() {

//     this.selectedEditExpenseDataArray = []
//     console.log(" this.selectedEditIndex ", this.selectedEditIndex)

//     for (let index = 0; index <= this.selectedEditIndex; index++) {

//       this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       let threshold = ''
//       if (this.formGroup.controls.txtEThresHold.value == "" || this.formGroup.controls.txtEThresHold.value == undefined || this.formGroup.controls.txtEThresHold.value == null) {
//         threshold = ""
//       } else {
//         threshold = this.formGroup.controls.txtEThresHold.value
//       }

//       let sacno = ''
//       if (this.formGroup.controls.txtESacNo.value == "" || this.formGroup.controls.txtESacNo.value == undefined || this.formGroup.controls.txtESacNo.value == null) {
//         sacno = ""
//       } else {
//         sacno = this.formGroup.controls.txtESacNo.value
//       }

//       this.selectedEditExpenseDataArray.push({
//         vem_cust_supplr_code: this.cust_supplr_code,
//         vem_tds_type: this.formGroup.controls.txtETypeOfTds.value,
//         vem_tds_section: this.formGroup.controls.cmbESelectionOfTds.value,
//         vem_tds_percent: this.formGroup.controls.txtEPercOfTds.value,
//         vem_threshold: threshold,
//         vem_debit_expensecode: this.formGroup.controls.txtHiddenEDebitExpCode.value,
//         vem_igst_percentage: this.formGroup.controls.txtEIgstPerc.value,
//         vem_cgst_percentage: this.formGroup.controls.txtECgstPerc.value,
//         vem_sgst_percentage: this.formGroup.controls.txtESgstPerc.value,
//         vem_tds_per_transaction_flg: this.formGroup.controls.rdbETdsPerTransFlg.value,
//         vem_tds_applicable_flag: this.formGroup.controls.rdbETdsApplFlg.value,
//         vem_tds_acc_code: this.formGroup.controls.txtETdsAccCode.value.acc_code,
//         vem_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//         vem_deleted_flg: 'N',
//         vem_sac_no: sacno,
//         vem_cust_flg: this.formGroup.controls.cmbECustOf.value != undefined ? this.formGroup.controls.cmbECustOf.value : '-',
//         vem_gst_credit_blocked: this.formGroup.controls.rdbEGstCblk.value,
//         vem_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         vem_serial_no: this.formGroup.controls.txtESerialNo.value
//       })

//     }
//   }

//   DeleteExpenseRow(index) {
//     console.log(" DeleteExpenseRow index ", index)
//     //console.log(' this.lstAddedDebitExpense.length = ' ,this.lstAddedDebitExpense.length);
//     if(this.lstAddedDebitExpense.length==1){
//             this.openSnackBar(" You cant delete expense code");
//             return false;
//     }

//     this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;

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
//       cs_cust_supplr_flg: 'V',
//       vem_cust_supplr_code: this.cust_supplr_code,
//       vem_debit_expensecode: this.formGroup.controls.txtHiddenEDebitExpCode.value,
//       vem_created_by: atob(sessionStorage.getItem(btoa('userId'))),
//       vem_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//       vem_serial_no: this.formGroup.controls.txtESerialNo.value,
//     }

//     this.customerMasterService.deleteExpenseCodeEntry(this.payload).subscribe(data => {
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.openSnackBar(" expense details updated successfully ")
//         this.selectedExpenseDataArray = []
//         this.selectedEditExpenseDataArray = []
//         this.debitExpAccCodeArry = []
//         this.getUpdateVendorDetail(this.cust_supplr_code)
//         return true;

//       } else {
//         this.openSnackBar("Error While updating vendor details");
//         return false;
//       }
//     })
//   }

//   resetExpenseCodeEntryRow() {
//     console.log(" resetExpenseCodeEntryRow index ")

//     for (let index = 0; index <= this.selectedIndex; index++) {

//       this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//       this.aryTableControl = this.getrows.controls;
//       this.formGroup = this.aryTableControl[index] as FormGroup;

//       this.formGroup.controls.txtTypeOfTds.setValue('')
//       this.formGroup.controls.cmbSelectionOfTds.setValue('')
//       this.formGroup.controls.txtPercOfTds.setValue('')
//       this.formGroup.controls.txtThresHold.setValue('')
//       this.formGroup.controls.txtDebitExpCode.setValue('')
//       this.formGroup.controls.txtSgstPerc.setValue('')
//       this.formGroup.controls.txtCgstPerc.setValue('')
//       this.formGroup.controls.txtIgstPerc.setValue('')
//       this.formGroup.controls.rdbTdsPerTransFlg.setValue('N')
//       this.formGroup.controls.txtTdsAccCode.setValue('')
//       this.formGroup.controls.txtSacNo.setValue('')
//       this.formGroup.controls.cmbCustOf.setValue('')
//       this.formGroup.controls.rdbGstCblk.setValue('N')

//     }
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

//   completeVendor() {

//     if (this.checkDraftValidation()) {

//       if (this.checkDebitExpense(this.selectedIndex)) {

//         this.getExpenseCodeData();
//         console.log(" this.selectedExpenseDataArray ", this.selectedExpenseDataArray)

//         if (this.selectedExpenseDataArray.length > 0) {

//           //check address
//           if (this.checkAddressValidation(this.selectedAddressIndex, "allAddress")) {

//             if (this.validateGSTPAN(this.selectedAddressIndex, "allAddress")) {
//               //validate and call next  validation for contact
//             }
//           }

//         }//selectedExpenseDataArray
//       }
//     }
//   }

//   modifyVendor() {


//     //update header
//     if (this.checkModifyValidation()) {

//       if (this.checkEditDebitExpense(this.selectedEditIndex)) {

//         this.getEditExpenseCodeData();

//         //validate addrss
//         if (this.checkModifyAddressValidation(this.selectedEditAddrIndex)) {

//           //validate gst_pan valdiation 
//           if (this.validateEditGSTPAN(this.selectedEditAddrIndex)) {
//             //check validation call next update supplier function
//           }
//         }
//       }//checkEditDebitExpense

//     }//checkModifyValidation

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
//       if (this.formGroup.controls.txtLattitude.value.trim() == '' || this.formGroup.controls.txtLattitude.value.trim() == null) {
//         this.openSnackBar('Please select lattitude at address no ' + (errorRowIndex));
//         return false;
//       }

//       if (this.formGroup.controls.txtLongitude.value.trim() == '' || this.formGroup.controls.txtLongitude.value.trim() == null) {
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

//       // if (index == 0 && this.flgModify == 'N') {
//       //   console.log(' flgModify = ', this.flgModify, ' index = ', index);
//       //   if (this.formGroup.controls.txtEmailIdOne.value == "" || this.formGroup.controls.txtEmailIdOne.value == null ||
//       //     this.formGroup.controls.txtEmailIdOne.value == undefined) {
//       //     this.openSnackBar('Please Enter Email Id for Address 1');
//       //     return false;
//       //   }
//       // }

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
 
//      console.log(" checkAddressValidation startedIndex ", startedIndex)
 
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
//    }//end of func */

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

        
// // console.log( this.formGroup.controls.txtGstNo.value , ' GST NO.... ')
// // console.log( this.defaultGst , ' defaultGst GST NO.... ')

// if (this.formGroup.controls.txtGstNo.value == '' || this.formGroup.controls.txtGstNo.value == undefined) {
//   if (index == selectedIndex) {
//     this.callNextFunction(callFrom, selectedIndex)
//   }
// }else{


//   if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {
//     if (this.flgModify == 'N') {

//       if (this.form.controls.txtPanNo.value == '' || this.form.controls.txtPanNo.value == undefined) {
//         this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//         return false;
//       }
//       if (this.form.controls.txtPanNo.value.length != 10) {
//         this.openSnackBar('Please Enter 10 digits  pan Number.');
//         return false;
//       }

//       if (!panRegex.test(this.form.controls.txtPanNo.value)) {
//         this.openSnackBar("Please Enter correct pan no ");
//         return false;
//       }

//       this.payload = {
//         userInformationDto: {
//           usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//           usr_name: atob(sessionStorage.getItem(btoa('username'))),
//           fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//           fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//           fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//           usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//           usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//         },
//         cd_pan_no: this.form.get("txtPanNo").value,
//         callFrom: "complete",
//         cust_code_flg: 'V',
//       }
//       if (this.cust_supplr_code != 'NEW') {
//         this.payload.cd_cust_supplr_code = this.cust_supplr_code
//       }
//     } else {
//       if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//         this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//         return false;
//       }
//       if (this.form.controls.txtEPanNo.value.length != 10) {
//         this.openSnackBar('Please Enter 10 digits  pan Number.');
//         return false;
//       }

//       if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//         this.openSnackBar("Please Enter correct pan no ");
//         return false;
//       }

//       this.payload = {
//         userInformationDto: {
//           usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//           usr_name: atob(sessionStorage.getItem(btoa('username'))),
//           fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//           fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//           fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//           usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//           usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//         },
//         cd_pan_no: this.form.get("txtEPanNo").value,
//         callFrom: "complete",
//         cust_code_flg: 'V',
//         cd_cust_supplr_code: this.cust_supplr_code
//       }
//     }
//     //check duplicate pan_no
//     // this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
//     //   data => {
//     //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//     //       console.log('data.responseData[0] =', data.responseData[0]);
//     //       if (data.responseData[0] == "Y") {
//     //         this.openSnackBar("PAN NO IS ALREADY EXISTS");
//     //         return false;
//     //       }
//     //       else {
//             //if not default_gst
//             if (this.formGroup.controls.txtGstNo.value != this.defaultGst) {

//               this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
//               this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

//               this.customerMasterService.validateGstWithPan(this.payload).subscribe(
//                 data => {
//                   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                     console.log('data.responseData[0] =', data.responseData[0]);

//                     if (data.responseData[0] != "Y") {

//                       this.openSnackBar(data.responseData[0]);
//                       return false;
//                     } else {

//                       //check_duplicate_gst_no
//                       this.payload.cdad_state_code = this.formGroup.controls.cmbState.value.st_code
//                       this.payload.cdad_gst_no = this.formGroup.controls.txtGstNo.value

//                       this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
//                         data => {
//                           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                             console.log('data.responseData[0] =', data.responseData[0]);
//                             if (data.responseData[0] == "Y") {
//                               this.openSnackBar("GST NO IS ALREADY EXISTS");
//                               return false;
//                             } else {
//                               if (index == selectedIndex) {
//                                 this.callNextFunction(callFrom, selectedIndex)
//                               }
//                             }
//                           }
//                         }
//                       )
//                     }
//                   }
//                 }
//               )
//             }//defaultGst
//             else {
//               if (index == selectedIndex) {
//                 this.callNextFunction(callFrom, selectedIndex)
//               }
//             }
//     //       }
//     //     }
//     //   }
//     // ) 
//   } else {
//     if (index == selectedIndex) {
//       this.callNextFunction(callFrom, selectedIndex)
//     }
//   }
// }

//       }//ctr_home_country_flg
//       else {
//         if (index == selectedIndex) {
//           this.callNextFunction(callFrom, selectedIndex)
//         }
//       }

//     }//forvalidateGSTPAN
//     //return true;
//   }//func

//   callNextFunction(callFrom, selectedIndex) {
//     if (callFrom == "singleAddress") {
//       if (this.flgModify == 'Y') {
//         this.saveVendorAddress(selectedIndex);
//       } else {
//         this.addressCode = (Number(this.addressCode) + 1)
//         this.addNewAddressRow(selectedIndex + 1)
//       }
//     } else {

//       //compelet vendor
//       //if (this.checkContactValidation(this.selectedContactIndex, "allContact")) {

//       this.getAddressData();

//       this.getContactData();

//       this.saveVendorDraft();
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
//       // trim() not is used
//       // if (this.formGroup.controls.txtELongitude.value.trim() == '' || this.formGroup.controls.txtELongitude.value.trim() == null) {
//       //   this.openSnackBar('Please select Lattitide at address no' + (index + 1));
//       //   return false;
//       // }

//       // if (this.formGroup.controls.txtELattitude.value.trim() == '' || this.formGroup.controls.txtELattitude.value.trim() == null) {
//       //   this.openSnackBar('Please select longitude at address no' + (index + 1));
//       //   return false;
//       // }

//       if (this.formGroup.controls.txtELongitude.value == '' || this.formGroup.controls.txtELongitude.value == null) {
//         this.openSnackBar('Please select Lattitide at address no' + (index + 1));
//         return false;
//       }

//       if (this.formGroup.controls.txtELattitude.value == '' || this.formGroup.controls.txtELattitude.value == null) {
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


//       // if (index == 0) {
//       //   console.log(' index = ', index);
//       //   if (this.formGroup.controls.txtEEmailIdOne.value == "" || this.formGroup.controls.txtEEmailIdOne.value == null ||
//       //     this.formGroup.controls.txtEEmailIdOne.value == undefined) {
//       //     this.openSnackBar('Please Enter Email Id for Address 1');
//       //     return false;
//       //   }
//       // }

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

        
// // console.log( this.formGroup.controls.txtEGstNo.value , ' GST NO.... ')
// // console.log( this.defaultGst , ' defaultGst GST NO.... ')

// if (this.formGroup.controls.txtEGstNo.value == '' || this.formGroup.controls.txtEGstNo.value == undefined) {
//   if (index == selectedEditIndex) {
//     this.callNextEditFunction(selectedEditIndex)
//   }
// }else{
//   if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

//     if (this.form.controls.txtEPanNo.value == '' || this.form.controls.txtEPanNo.value == undefined) {
//       this.openSnackBar('Please Enter PAN NO before To Validate GST NO');
//       return false;
//     }
//     if (this.form.controls.txtEPanNo.value.length != 10) {
//       this.openSnackBar('Please Enter 10 digits  pan Number.');
//       return false;
//     }
//     let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
//     if (!panRegex.test(this.form.controls.txtEPanNo.value)) {
//       this.openSnackBar("Please Enter correct pan no ");
//       return false;
//     }

//     if (this.form.controls.txtEPanNo.value != '' || this.form.controls.txtEPanNo.value != undefined) {

//       this.payload = {
//         userInformationDto: {
//           usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//           usr_name: atob(sessionStorage.getItem(btoa('username'))),
//           fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//           fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//           fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//           usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//           usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code'))),
//         },
//         cd_pan_no: this.form.get("txtEPanNo").value,
//         callFrom: "complete",
//         cust_code_flg: 'V',
//         cd_cust_supplr_code: this.cust_supplr_code
//       }

//       //check duplicate pan_no
//       // this.customerMasterService.checkDuplicatePanNo(this.payload).subscribe(
//       //   data => {
//       //     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//       //       console.log('data.responseData[0] =', data.responseData[0]);
//       //       if (data.responseData[0] == "Y") {
//       //         this.openSnackBar("PAN NO IS ALREADY EXISTS");
//       //         return false;
//       //       }
//       //       else {

//               //if not default_gst
//               if (this.formGroup.controls.txtEGstNo.value != this.defaultGst) {

//                 this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
//                 this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

//                 this.customerMasterService.validateGstWithPan(this.payload).subscribe(
//                   data => {
//                     if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                       console.log('data.responseData[0] =', data.responseData[0]);
//                       if (data.responseData[0] != "Y") {
//                         this.openSnackBar(data.responseData[0]);
//                         return false;
//                       } else {
//                         //check_duplicate_gst_no
//                         this.payload.cdad_state_code = this.formGroup.controls.cmbEState.value
//                         this.payload.cdad_gst_no = this.formGroup.controls.txtEGstNo.value

//                         this.customerMasterService.checkDuplicateGstNo(this.payload).subscribe(
//                           data => {
//                             if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                               console.log('data.responseData[0] =', data.responseData[0]);
//                               if (data.responseData[0] == "Y") {
//                                 this.openSnackBar("GST NO IS ALREADY EXISTS");
//                                 return false;
//                               } else {
//                                 if (index == selectedEditIndex) {
//                                   this.callNextEditFunction(selectedEditIndex)
//                                 }
//                               }
//                             }
//                           }
//                         )
//                       }
//                     }
//                   }
//                 )
//               }//defaultGst
//               else {
//                 if (index == selectedEditIndex) {
//                   this.callNextEditFunction(selectedEditIndex)
//                 }
//               }
//       //       }
//       //     }
//       //   }
//       // )
//     }//txtPanNo
//   } else {
//     if (index == selectedEditIndex) {
//       this.callNextEditFunction(selectedEditIndex)
//     }
//   }
// }

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

//     this.updateVendor();
//   }

//   newAddressIndex:number=-1;
//   initNewAddressRow(index) {
//     this.newAddressIndex=index
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

//   newExpenseIndex:number=-1
//   initNewExpenseRow(index) {
//     if(index==-1){
//       index=0
//     }
//     this.newExpenseIndex=index
//     console.log("initNewExpenseRow ", index)
//     this.arrayAddDebExpenseRow(0); //expense 
//     this.showExpIconFLg = false
//     this.showAddNewExpenseIconFlg = false;
//   }

//   removeNewExpenseRow(index) {
//     this.debititems.removeAt(0);
//     this.getDebitExpenseDetails(this.debitExpList)
//   }

//   showMap(index) {
//     this.getrows = this.form.get('arrayAddAdress') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;


//     let ctr_home_country_flg: string = 'N'
//     for (let i = 0; i < this.countryLists[index].length; i++) {
//       if (this.formGroup.controls.cmbCountry.value === this.countryLists[index][i].ctr_code) {
//         ctr_home_country_flg = this.countryLists[index][i].ctr_home_country_flg
//       }
//     }

//     let errorRowIndex: number = 0
//     errorRowIndex = index + 1

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
//     console.log(" toSelectedCountry.ctr_desc ", toSelectedCountry.ctr_desc)

//     /*let fullAddress: string
//     fullAddress = this.formGroup.controls.txtAddrOne.value + "," +
//       this.formGroup.controls.txtAddrSecond.value + "," +
//       this.formGroup.controls.cmbState.value.st_state + " " +
//       this.formGroup.controls.txtPinCode.value + "," +
//       toSelectedCountry.ctr_desc
// */

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
//     console.log(" toSelectedState ", toSelectedState.st_state)

//     /*
//         let fullAddress: string
//         fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
//           this.formGroup.controls.txtEAddrSecond.value + "," +
//           toSelectedState.st_state + " " +
//           this.formGroup.controls.txtEPinCode.value + "," +
//           toSelectedCountry.ctr_desc */

//     let fullAddress: string
//     fullAddress = this.formGroup.controls.txtEAddrOne.value + "," +
//       this.formGroup.controls.txtEAddrSecond.value + ",";

//     if (this.formGroup.controls.cmbEState.value !== null && this.formGroup.controls.cmbEState.value !== undefined &&
//       this.formGroup.controls.cmbEState.value !== '') {
//       //fullAddress += this.formGroup.controls.cmbEState.value.st_state + " ";
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

//   setPerc(event, value, index) {
//     this.getrows = this.form.get('arrayAddDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;
//     if (value == 'A') {
//       let tempval = event.value.sm_percentage;
//       this.formGroup.controls.txtPercOfTds.setValue(tempval.toString())
//     }
//     if (value == 'B') {
//       if (this.formGroup.controls.cmbSelectionOfTds.value != '' && this.formGroup.controls.cmbSelectionOfTds.value != null) {
//         if (event.value == 'C') {
//           let tempval = this.formGroup.controls.cmbSelectionOfTds.value.sm_corporate_perc;
//           this.formGroup.controls.txtPercOfTds.setValue(tempval.toString())
//         }
//       }
//     }
//   }


//   setEPerc(event, value, index) {
//     this.getrows = this.form.get('arrayEditDebExpense') as FormArray;
//     this.aryTableControl = this.getrows.controls;
//     this.formGroup = this.aryTableControl[index] as FormGroup;
//     if (value == 'A') {
//       let tempval = event.value.sm_percentage;
//       this.formGroup.controls.txtEPercOfTds.setValue(tempval.toString())
//     }
//     if (value == 'B') {
//       if (this.formGroup.controls.cmbSelectionOfTds.value != '' && this.formGroup.controls.cmbSelectionOfTds.value != null) {
//         if (event.value == 'C') {
//           let tempval = this.formGroup.controls.cmbSelectionOfTds.value.sm_corporate_perc;
//           this.formGroup.controls.txtEPercOfTds.setValue(tempval.toString())
//         }
//       }
//     }
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
//           this.gst_verification_flg ="N"
//         }
//         console.log("this.email_verification_flg -- " + this.email_verification_flg)
//         console.log("this.gst_verification_flg -- " + this.gst_verification_flg)
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
//         this.getVendorDetail(this.cust_supplr_code)
//         this.openSnackBar(data.message)
//         if(this.lstAddedAdress.length>0){
//           this.gstValid=true;
//         }
//       }
//       else{
//         const dialogConfig = new MatDialogConfig()
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
//                   this.getVendorDetail(this.cust_supplr_code)
//                     this.gstValid=false;
//                 })
//                 return;     
//               }
//             })
//       }
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
//         this.getVendorDetail(this.cust_supplr_code)
//       }
//       else{
//         this.getVendorDetail(this.cust_supplr_code)
//       }
//      })
//     }
//   }
// }
