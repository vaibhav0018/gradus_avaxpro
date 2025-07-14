import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router'
import { UtilityServiceAvaxPro } from '../../../../../core/services/utility/utility_avaxpro.service';
import { SnackbarComponent } from '../../snackbar/snackbar/snackbar.component';
import { ConfirmValidParentMatcher, errorMessages } from 'src/app/core/services/custom-validations/custom-validators';
import { AppSettings } from '../../../../../app.settings';
import { Settings } from '../../../../../app.settings.model';
import { DocCalcComponent } from '../../commons/doc-calc/doc-calc.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/reports/stock-report/sr-register/components/sr-register-report/sr-register-filter/date.adapter';
import { CurrencyModel, DocAddressModel } from '../../challan/components/challan-menu.model';
import moment from 'moment';
import { QuotationService } from '../quotation.service';
import { ConstantsServiceAvaxPro } from '../../../../../core/services/constants_avaxpro.service';
import { DocTermsModel } from '../quotation.model';
import { DocCalcService } from '../../commons/doc-calc/doc-calc.service';
import { FormBuilder, FormGroup,  FormControl,  FormArray, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-quot-other-info-page',
  templateUrl: './quot-other-info-page.component.html',
  styleUrls: ['./quot-other-info-page.component.scss', '../../entry.scss'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],
})

export class QuotOtherInfoPageComponent implements OnInit {

  @Input() otherInfoPageData: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right',]

  confirmValidParentMatcher = new ConfirmValidParentMatcher()
  errors = errorMessages
  settings: Settings


  queryParams = {}

  stateData: any
  // form: FormGroup

  calculatorDesc: any;

  docCalcLists: any = []
  taxCode: string
  docGrossAmt: string
  docCalcId: any
  docCalcData: any;
  docCalcDataInArray = []
  payload: object = {}
  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_beg'))||""))
  minDate = new Date(this.controlValue.getFullYear(), 3, 1);
  maxDate = new Date(new Date().setDate(new Date().getDate()))


  serializedDate = new FormControl((new Date()).toISOString());
  todayDate = new Date(new Date().setFullYear(new Date().getFullYear()));

  serializedDate1 = new FormControl((new Date()).toISOString());
  todayDate1 = new Date(new Date().setFullYear(new Date().getFullYear()));


  currentDate = new Date()
  DATE_YMD = 'YYYY-MM-DD'
  DATE_DMY = 'DD-MM-YYYY'

  billedAddrList: any = []
  CurrencyList: any = []
  DocAddressList: any = []
  paytermsList: any = []
  partyPayTermList: any = []
  tableData: any
  taxcodeAndGrossAmount: any = {}
  qt_draft_no: string
  qt_disc_perc: string
  qt_tax_type: string
  dprftscreated: string
  qt_handled_by: string
  qt_cust_code: string
  qt_ult_cust_ord_no: string
  qt_ts_ult_cust: string
  qt_cond_disc_amt: string
  qt_cond_disc_perc: string
  qt_email1: string
  qt_email2: string
  qt_email3: string
  qt_email4: string
  qt_email5: string
  qt_inspec_note: string
  qt_other_doc_note: string
  qt_inter_info: string
  qt_remarks: string
  qt_normal_tc_flg: string = "N"
  qt_routine_tc_flg: string = "N"
  qt_type_tc_flg: string = "N"
  qt_g_cert_flg: string = "N"
  qt_insp_rep_flg: string = "N"
  qt_npay_days: string
  qt_pay_code: string
  qt_transp_code: string
  qt_destination: string
  qt_cash_disc_days: string
  qt_ts_cash_disc: string
  qt_cust_order_no: string
  qt_ts_cust_order_no: string
  qt_doc_del_addr_code: string
  qt_del_addr_code: string
  qt_docsch_id: string
  qt_amt: string


  isFromDraft: string = 'N';
  isFromPendingDraft: string = 'N';


  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);

  formGroup: FormGroup;
  form: FormGroup = this.formBuilder.group({ 'arrayAddItem': this.rows });

  aryTableControl: AbstractControl[]
  controlsRowsLength: number

  docTermList: any;

  paymentTermsDays: any = {};

  docTermsArray = []

  constructor(
    private appSettings: AppSettings,
    private router: Router,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    // private data: DocCalcService,-----------------------------------------------------
    private quotationService: QuotationService,
  ) {
    this.settings = this.appSettings.settings
    this.form = this.formBuilder.group({
      txtPartyOrderDate: new Date(),
      txtPartyOrderNo: [''],
      txCondDiscDays: [''],
      txCondDiscPerc: [''],
      txCondDiscAmt: [''],
      txtCashDiscUptoDate: new Date(),
      cmbCurrency: [''],
      cmbBilledAddress: [''],
      txtBillAddressDetail: [''],
      cmbDocDelvAddress: [''],
      txtDocDelvAddressDetail: [''],
      txtRemarks: [''],
      chkTypeTc: [''],
      chkGurntCertf: [''],
      chkInspReport: [''],
      txtDocReq: [''],
      txtInspNote: [''],
      txtInternalNoteInfo: [''],
      txtEmailTo1: [''],
      txtEmailTo2: [''],
      txtEmailTo3: [''],
      txtEmailTo4: [''],
      txtEmailTo5: [''],
      txNoOfDays: [''],
      cmbPayTerms: [''],
      txtConsignee: [''],
      cmbConsigner: [''],
      arrayAddItem: this.formBuilder.array([]),
    });


  }

  date_ymd(dateValue : any) {
    return moment(dateValue).format(this.DATE_YMD)
  }

  dataArrayOfDocTerm: DocTermsModel[] = [];
  docTermFlag: boolean = false;

  ngOnInit() {
  }

  get items(): FormArray { return this.form.get('arrayAddItem') as FormArray; }

  addNewRow() {

    this.getrows = this.form.get('arrayAddItem') as FormArray;

    if (this.getrows.controls.length == 15) {
      this.openSnackBar(" We Cant Add More than 15 Doc Terms.");
      return false;
    } else {
      let control = <FormArray>this.form.controls.arrayAddItem;
      control.push(
        this.formBuilder.group({
          cmbDocTerm: [''],
          txtTermName: [''],
          txtTermNameValue: [''],
        })
      )

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.controlsRowsLength = this.getrows.controls.length - 1;
    }
    return true

  }

  deleteRow(index : any) {
    const control = <FormArray>this.form.controls['arrayAddItem'];
    control.removeAt(index);

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.controlsRowsLength = this.getrows.controls.length - 1;
  }

  showDocTerms() {
    this.docTermFlag = true;
  }

  ngOnChanges() {
    
    this.docTermFlag = false;
    this.getBilledAddressDropdown();
    this.getOtherInfoCommonList();
    this.getOtherInfoDtl();

    this.isFromPendingDraft = this.otherInfoPageData.isFromPendingDraft;
    this.form.get('txtPartyOrderDate')?.setValue(this.date_ymd(this.currentDate))
    this.form.get('txtCashDiscUptoDate')?.setValue(this.date_ymd(this.currentDate))
    this.addNewRow();

    this.getCcsPreferenceData();

  }

  getCcsPreferenceData() {
    let data = {
      party_code: this.otherInfoPageData.qt_cust_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||"")
    }
    this.utilityServiceAvaxPro.getCcsPreferenceData(data).
    subscribe((data :any) => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (data.responseData.length > 0) {
          this.form.controls.txCondDiscDays.setValue(data.responseData[0].ccs_conditional_disc_days)
          this.form.controls.txCondDiscPerc.setValue(data.responseData[0].ccs_conditional_disc)          
        }
      }
    })
  }


  getOtherInfoDtl() {
    this.payload = {
      callFrom: "Draft",
      qt_cust_code: this.otherInfoPageData.qt_cust_code,
      qt_draft_no: this.otherInfoPageData.qt_draft_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
    }

    this.quotationService.getOtherInfoDtl(this.payload)
      .toPromise()
      .then()
      .finally(() => {
      }).then(data => {

        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.docTermList = data.responseData[0][0];
          this.paymentTermsDays = data.responseData[0][1];
          this.form.controls.txNoOfDays.setValue((this.paymentTermsDays.pay_terms_day).toString());
          this.paytermsList = data.responseData[0][2];
          this.getPaymentTerm()
          this.taxcodeAndGrossAmount = data.responseData[0][3];
        }
      });

  }

  getPaymentTerm() {
    let pay_day = this.form.controls.txNoOfDays.value;
    if (pay_day == '') {
      pay_day = 0;
    }

    if (this.form.controls.txNoOfDays.value > this.paymentTermsDays.pay_terms_day) {
      this.openSnackBar("no of days should not be greater than " + this.paymentTermsDays.pay_terms_day);
      return false;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(pay_day).
    subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.paytermsList = data.responseData[0];
        let objPayterm = this.paytermsList.find((item: { pt_code: string }) => item.pt_code == this.paymentTermsDays.ccs_pay_code);
        if(objPayterm!=undefined){
          this.form.controls.cmbPayTerms.setValue(objPayterm.pt_code);
        }
        else{
          this.form.controls.cmbPayTerms.setValue(this.paytermsList[0].pt_code);
        }
        
      }
    })
    return true;
  }

  getBilledAddressDropdown() {
    this.quotationService.showAddQuotFilterList(this.otherInfoPageData.qt_cust_code)
      .toPromise()
      .then()
      .finally(() => {
      }).then(data => {

        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.billedAddrList = data.responseData[0][2]
          const toSelect = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
          this.form.get('cmbBilledAddress')?.setValue(toSelect);
          const toSelectedAddr = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
          this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
        }
      });

  }

  getOtherInfoCommonList() {
    this.utilityServiceAvaxPro.getOtherinfoCommonList(this.otherInfoPageData.qt_cust_code).subscribe(
      (      data: { responseStatus: string; responseCode: string; responseData: any[][][]; }) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.billedAddrList = data.responseData[0][5].map((item: { csad_addr_code: any; csad_address: any; }) => {
            return new DocAddressModel(item.csad_addr_code, item.csad_address)
          })

          if (this.qt_del_addr_code == "0" || this.qt_del_addr_code == undefined) {
            const toSelect = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
            this.form.get('cmbBilledAddress')?.setValue(toSelect);
            const toSelectedAddr = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
            this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }
          else {
            const toSelect = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == this.qt_del_addr_code)
            this.form.get('cmbBilledAddress')?.setValue(toSelect);

            const toSelectedAddr = this.billedAddrList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == this.qt_del_addr_code)
            this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }

          this.DocAddressList = data.responseData[0][5].map((item: { csad_addr_code: any; csad_address: any; }) => {
            return new DocAddressModel(item.csad_addr_code, item.csad_address)
          })

          if (this.qt_doc_del_addr_code == "0" || this.qt_doc_del_addr_code == undefined) {

            const toSelect = this.DocAddressList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
            this.form.get('cmbDocDelvAddress')?.setValue(toSelect);

            const toSelectedAddr = this.DocAddressList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == "1")
            this.form.get('txtDocDelvAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }
          else {
            const toSelect = this.DocAddressList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == this.qt_doc_del_addr_code)
            this.form.get('cmbDocDelvAddress')?.setValue(toSelect);

            const toSelectedAddr = this.DocAddressList.find((c: { csad_addr_code: string; }) => c.csad_addr_code == this.qt_doc_del_addr_code)
            this.form.get('txtDocDelvAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }


          this.CurrencyList = data.responseData[0][6].map((item: { curr_currency_code: any; curr_currency_desc: any; }) => {
            return new CurrencyModel(item.curr_currency_code, item.curr_currency_desc);
          })


          console.log('CurrencyList= ', this.CurrencyList);

          let currObj = this.CurrencyList.find(({ curr_currency_code  }) => curr_currency_code
            == "INR");
          console.log('currObj  = ', currObj);
          this.form.get('cmbCurrency')?.setValue(currObj);

        }
      }
    )
  }


  showBillAddrDtls(event: { source: { value: { csad_address: any; }; }; }) {
    console.log(" showBillAddrDtls ", event.source.value.csad_address)
    this.form.get("txtBillAddressDetail")?.setValue(event.source.value.csad_address)
  }

  showDocumentAddrDtls(event: { source: { value: { csad_address: any; }; }; }) {
    console.log(" showDocumentAddrDtls ", event.source.value.csad_address)
    this.form.get("txtDocDelvAddressDetail")?.setValue(event.source.value.csad_address)
  }

  checkTermsConditions(event: any) {
    console.log(" checkTermsConditions ", event)
  }

  setPercOrAmt(flg: string) {
    if (flg == "P") {
      this.form.controls.txCondDiscAmt.setValue('');
    } else {
      this.form.controls.txCondDiscPerc.setValue('');
    }
  }


  openDocCalcPopUp() {

    if (this.form.controls.txCondDiscDays.value === '' ||
      this.form.controls.txCondDiscDays.value === undefined ||
      this.form.controls.txCondDiscDays.value === null) {

    } else {
      if (isNaN(this.form.controls.txCondDiscDays.value)) {
        this.openSnackBar("Please Enter Valid Condition Disc Days");
        return false;
      }
    }


    if (this.form.controls.txCondDiscPerc.value === '' ||
      this.form.controls.txCondDiscPerc.value === undefined ||
      this.form.controls.txCondDiscPerc.value === null) {
    } else {
      if (isNaN(this.form.controls.txCondDiscPerc.value)) {
        this.openSnackBar("Please Enter Valid Condition Disc Percentage.");
        return false;
      }
    }

    if (this.form.controls.txCondDiscDays.value === '' ||
      this.form.controls.txCondDiscDays.value === undefined ||
      this.form.controls.txCondDiscDays.value === null) {
      if (this.form.controls.txCondDiscPerc.value === '' ||
        this.form.controls.txCondDiscPerc.value === undefined ||
        this.form.controls.txCondDiscPerc.value === null) {
      } else {
        this.openSnackBar("Please Enter Condition Discount Days.");
        return false;
      }
    }

    if (this.form.controls.txCondDiscAmt.value === '' ||
      this.form.controls.txCondDiscAmt.value === undefined ||
      this.form.controls.txCondDiscAmt.value === null) {

    } else {
      if (isNaN(this.form.controls.txCondDiscAmt.value)) {
        this.openSnackBar("Please Enter Valid Condition Disc Amount.");
        return false;
      }
    }

    if (this.form.controls.txCondDiscDays.value === '' ||
      this.form.controls.txCondDiscDays.value === undefined ||
      this.form.controls.txCondDiscDays.value === null) {
      if (this.form.controls.txCondDiscAmt.value === '' ||
        this.form.controls.txCondDiscAmt.value === undefined ||
        this.form.controls.txCondDiscAmt.value === null) {
      } else {
        this.openSnackBar("Please Enter Condition Discount Days.");
        return false;
      }
    }


    /* if ((this.form.controls.txCondDiscPerc.value == '') && (
      this.form.controls.txCondDiscAmt.value == '')) {
    } else {
      this.openSnackBar("Please Enter Either Condition Discount Amount Or Percentage.");
      return false;
    } */


    if (this.form.controls.txNoOfDays.value == "" || this.form.controls.txNoOfDays.value == undefined || this.form.controls.txNoOfDays.value == null) {
      this.openSnackBar("Please Enter no of days");
      return false;
    } else {
      if(isNaN(this.form.controls.txCondDiscAmt.value)){
        if (this.form.controls.txNoOfDays.value > this.paymentTermsDays.pay_terms_day) {
          this.openSnackBar("no of days should not be greater than " + this.paymentTermsDays.pay_terms_day);
          return false;
        }
      }
      // else{
      //   this.openSnackBar("Please Enter Valid NO Of Days");
      // }
    }


    if (this.form.controls.cmbPayTerms.value === "" ||
      this.form.controls.cmbPayTerms.value === undefined ||
      this.form.controls.cmbPayTerms.value === null) {
      this.openSnackBar("Select Payment Terms.");
      return false;
    }



    if (this.form.controls.txtEmailTo1.value !== null && this.form.controls.txtEmailTo1.value.trim() !== '') {
      if (!this.form.controls.txtEmailTo1.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 1");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo2.value !== null  && this.form.controls.txtEmailTo2.value.trim() !== '' ) {
      if (!this.form.controls.txtEmailTo2.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 2");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo3.value !== null && this.form.controls.txtEmailTo3.value.trim() !== '') {
      if (!this.form.controls.txtEmailTo3.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 3");
        return false;
      }
    }


    if (this.form.controls.txtEmailTo4.value !== null && this.form.controls.txtEmailTo4.value.trim() !== '') {
      if (!this.form.controls.txtEmailTo4.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 4");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo5.value !== null && this.form.controls.txtEmailTo5.value.trim() !== '') {
      if (!this.form.controls.txtEmailTo5.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 5");
        return false;
      }
    }






    //  this.docCalcId = this.form.controls.cmbDocCalcFormula.value.scheme_id
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '55%',
    dialogConfig.minWidth = '55%',
    dialogConfig.height = '90%',
    dialogConfig.minHeight = '90%',
    dialogConfig.maxWidth = '95%',
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: ConstantsServiceAvaxPro.DOC_CALC_TITLE,
      docCalcId: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
      docCalcFormulaDesc: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC_DESC,
      tax_type: this.taxcodeAndGrossAmount.qt_tax_type_code,
      grossAmt: this.taxcodeAndGrossAmount.gross_amount,
      callFrom: "insertion",
      partyCode: this.otherInfoPageData.qt_cust_code,
      moduleId: "Q"
    }

    const dialogRef = this.dialog.open(DocCalcComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      if (item !== 'close') {
        this.data.currentMessage.subscribe((message: any) =>
          this.docCalcData = message
        );
        this.completeQuotationDraft();
      }

    })
    return true
  }

  completeQuotationDraft() {
    this.docCalcDataInArray = [];
    this.docCalcDataInArray.push(this.docCalcData);

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))||""),
        usr_name: atob(sessionStorage.getItem(btoa('username'))||""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))||""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))||""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))||""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))||""),
      },
      callFrom: 'Draft',
      qt_type: 'FR',
      qt_doc_type_code: "QOT",
      qt_source_type: 'FR',
      qt_inv_type_code: 'NE',
      qt_draft_date: this.otherInfoPageData.qt_draft_date,
      //qt_draft_date:this.utilityServiceAvaxPro.getFormatDate(this.otherInfoPageData.qt_draft_date, 'dd/MM/yyyy'),
      qt_draft_no: this.otherInfoPageData.qt_draft_no,
      qtd_draft_no: this.otherInfoPageData.qt_draft_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
      qtd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),

      qt_cash_disc_days: this.form.controls.txCondDiscDays.value == "" ? '0' : this.form.controls.txCondDiscDays.value,
      qt_cond_disc_perc: this.form.controls.txCondDiscPerc.value == "" ? '0' : this.form.controls.txCondDiscPerc.value,
      qt_cond_disc_amt: this.form.controls.txCondDiscAmt.value == "" ? '0' : this.form.controls.txCondDiscAmt.value,

      qt_disc_flg: this.form.controls.txCondDiscPerc.value == '' ? 'A' : 'P',
      qt_discamt: this.form.controls.txCondDiscAmt.value == '' ? '0' : this.form.controls.txCondDiscAmt.value,

      //qt_ts_cust_order_no: this.form.controls.txtPartyOrderDate.value,
      qt_ts_cust_order_no: this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.txtPartyOrderDate.value),
      qt_cust_order_no: this.form.controls.txtPartyOrderNo.value,
      //qt_ts_cash_disc: this.form.controls.txtCashDiscUptoDate.value,
      qt_ts_cash_disc: this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.txtCashDiscUptoDate.value),
      qt_curr_code: this.form.controls.cmbCurrency.value.curr_currency_code,

      qt_del_addr_code: this.form.controls.cmbBilledAddress.value.csad_addr_code,
      qt_delivery_addr: this.form.controls.txtBillAddressDetail.value,

      qt_doc_del_addr_code: this.form.controls.cmbDocDelvAddress.value.csad_addr_code,
      qt_doc_del_addr: this.form.controls.txtDocDelvAddressDetail.value,
      //checkbox

      qt_remarks: this.form.controls.txtRemarks.value,
      qt_email1: this.form.controls.txtEmailTo1.value == null || this.form.controls.txtEmailTo1.value.trim() == '' ? null : this.form.controls.txtEmailTo1.value,
      qt_email2: this.form.controls.txtEmailTo2.value == null || this.form.controls.txtEmailTo2.value.trim() == '' ? null : this.form.controls.txtEmailTo2.value,
      qt_email3: this.form.controls.txtEmailTo3.value == null || this.form.controls.txtEmailTo3.value.trim() == '' ? null : this.form.controls.txtEmailTo3.value,
      qt_email4: this.form.controls.txtEmailTo4.value == null || this.form.controls.txtEmailTo4.value.trim() == '' ? null : this.form.controls.txtEmailTo4.value,
      qt_email5: this.form.controls.txtEmailTo5.value == null || this.form.controls.txtEmailTo5.value.trim() == '' ? null : this.form.controls.txtEmailTo5.value,

      qt_npay_days: this.form.controls.txNoOfDays.value == '' ? '0' : this.form.controls.txNoOfDays.value,
      qt_pay_code: this.form.controls.cmbPayTerms.value == '' ? '' : this.form.controls.cmbPayTerms.value,
      qt_docsch_id: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
      docCalcData: this.docCalcDataInArray
    }

    this.docTermsArray = [];
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    for (let i = 0; i < this.getrows.controls.length; i++) {
      this.formGroup = this.aryTableControl[i] as FormGroup;
      let tempObj = {
        qt_term: this.formGroup.controls.txtTermName.value,
        qt_term_data: this.formGroup.controls.txtTermNameValue.value,
      }
      this.docTermsArray.push(tempObj);
    }

    this.payload["docTermsArray"] = this.docTermsArray;
    this.quotationService.completeQuotationDraftService(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //let quot_no = data.responseData[0].QUOTATION_NUMBER;
          let quot_no = data.responseData[0].quotation_number;
          let msg = data.responseData[0].msg;
          if (msg == "success") {
            this.queryParams["docNo"] = quot_no;
            this.queryParams["qt_quot_no"] = quot_no;
            this.queryParams["isFromPendingDraft"] = "N";
            this.queryParams["callFrom"] = "COMPLETE";
            this.queryParams["isForViewQuotation"] = "Y";
            this.queryParams["isCompletionPage"] = "Y";
            this.queryParams["userInformationDto"] = {
              usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),
              usr_userid: atob(sessionStorage.getItem(btoa('userId'))||""),
              usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
              usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
            }
            sessionStorage.removeItem("data");
            sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
            this.router.navigate(['session/entry/quotation/quotview'], { state: this.queryParams });
          }
          else if (msg == "isExist") {
            this.openSnackBar("Quotation is already created for Draft no: " + this.otherInfoPageData.qt_draft_no + " with Quotation no : " + quot_no)
            this.router.navigate(['session/entry/quotation/'])
            return false
          } else {
            this.openSnackBar(" error while updating data ")
            return false
          }
        }
        else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
      })

  }

  saveCcsPreferenceData(flg: string) {
    this.payload = {
      party_code: this.otherInfoPageData.qt_cust_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),
      user_preference_flg:flg
    }  
    if(flg =='cdd'){
      if (this.form.controls.txCondDiscDays.value == undefined ||
        this.form.controls.txCondDiscDays.value == "" ||
        this.form.controls.txCondDiscDays.value == null
      ) {
        this.openSnackBar("Please select COND DISC DAYS ");
        return false;
      }
      this.payload['ccs_conditional_disc_days']=this.form.controls.txCondDiscDays.value
    }
    else if(flg =='cdp'){
      if (this.form.controls.txCondDiscPerc.value == undefined ||
        this.form.controls.txCondDiscPerc.value == "" ||
        this.form.controls.txCondDiscPerc.value == null
      ) {
        this.openSnackBar("Please select COND DISC ");
        return false;
      }
      this.payload['ccs_conditional_disc']=this.form.controls.txCondDiscPerc.value
    }

    this.utilityServiceAvaxPro.saveCcsPreference(this.payload).
    subscribe((data: { responseStatus: string; responseCode: string; }) => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        console.log(" Successfully saveCcsPreferenceData.......")
      }
    })
    return true;
  
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

}
