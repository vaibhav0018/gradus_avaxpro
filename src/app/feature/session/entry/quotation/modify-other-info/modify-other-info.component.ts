import { Component, OnInit, Inject } from '@angular/core';
// import { MatSnackBar,  TooltipPosition, DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from '@angular/material'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router'
import { UtilityServiceAvaxPro } from '../../../../../core/services/utility/utility_avaxpro.service';
import { SnackbarComponent } from '../../snackbar/snackbar/snackbar.component';
import { ConfirmValidParentMatcher, errorMessages } from '../../../../../core/services/utility/error-messages';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/reports/stock-report/sr-register/components/sr-register-report/sr-register-filter/date.adapter';
import { CurrencyModel, DocAddressModel } from '../../challan/components/challan-menu.model';

import moment from 'moment';
import { QuotationService } from '../quotation.service';
import { DocTermsModel } from '../quotation.model';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-modify-other-info',
  templateUrl: './modify-other-info.component.html',
  styleUrls: ['./modify-other-info.component.scss'],
  providers: [{
    //provide : DateAdapter,
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],
})

export class ModifyOtherInfoComponent implements OnInit {

  // @Input() dialogData: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right',]
  confirmValidParentMatcher = new ConfirmValidParentMatcher()
  errors = errorMessages
  queryParams : any = {}
  stateData: any
  // form: FormGroup
  calculatorDesc: any;
  docCalcLists: any = []
  taxCode: string
  docGrossAmt: string
  docCalcId: any
  docCalcData: any;
  docCalcDataInArray = []
  payload: any 

  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_beg')) ||""))
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

  taxcodeAndGrossAmount: any = {};
  dataSourceDocTerms: any;

  qt_quot_no: string
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
  qt_curr_code: string = "";


   tempObj: {
    qt_term: any;
    qt_term_data: any;
  }


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
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private router: Router,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    //private data: DataService,
    private quotationService: QuotationService,
  ) {

    this.form = this.formBuilder.group({
      //cmbDocCalcFormula: [''],
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




      chkTypeTc: [false],
      chkGurntCertf: [false],
      chkInspReport: [false],
      txtDocReq: [false],
      txtInspNote: [false],

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
      //docCalcData : [''],
      arrayAddItem: this.formBuilder.array([]),
    });


  }

  date_ymd(dateValue : any) {
    return moment(dateValue).format(this.DATE_YMD)
  }

  dataArrayOfDocTerm: DocTermsModel[] = [];

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
    return true;

  }

  deleteRow(index : any) {
    const control = <FormArray>this.form.controls['arrayAddItem'];
    control.removeAt(index);

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.controlsRowsLength = this.getrows.controls.length - 1;
  }

  setDocTermsData(data: any) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    for (let i = 0; i < data.length; i++) {
      this.formGroup = this.aryTableControl[i] as FormGroup;
      this.formGroup.controls.txtTermName.setValue(data[i].qt_term);
      this.formGroup.controls.txtTermNameValue.setValue(data[i].qt_term_data);
    }
  }



  getDocTermsData() {
    this.docTermsArray = []
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;

    for (let i = 0; i < this.getrows.controls.length; i++) {
      this.formGroup = this.aryTableControl[i] as FormGroup;
      let tempObj : any = {
        //:this.formGroup.controls.cmbDocTerm.value(),
        qt_term: this.formGroup.controls.txtTermName.value(),
        qt_term_data: this.formGroup.controls.txtTermNameValue.value(),
      }
      this.docTermsArray.push(tempObj);
    }

  }


  ngOnInit() {
    this.getOtherInfoCommonList();

    this.getQuotOtherinfoList();
    this.getBilledAddressDropdown();
    this.getOtherInfoDtl();

    // this.setDefaultValues();
    this.addNewRow();
  }

  getQuotOtherinfoList() {

    this.payload = {
      qt_quot_no: this.dialogData.qt_quot_no,
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""),
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))  ||""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  ||""),
      callFrom: "Complete",
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ||""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ||""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ||""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ||""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ||""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ||""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ||""),
      }
    }


    this.quotationService.getQuotOtherinfoList(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.tableData = data.responseData[0].quot_header;
          this.qt_quot_no = this.tableData.qt_quot_no
          this.qt_disc_perc = this.tableData.qtconddiscperc
          this.qt_tax_type = this.tableData.qt_tax_type
          this.qt_handled_by = this.tableData.qt_handled_by
          this.qt_cust_code = this.tableData.qt_cust_code

          this.qt_ult_cust_ord_no = this.tableData.qtultcustordno
          // this.form.get('txtUltimateCustOrderNo').setValue(this.qt_ult_cust_ord_no)

          this.qt_ts_ult_cust = this.tableData.qt_ts_ult_cust

          this.form.get('txtPartyOrderNo')?.setValue(this.tableData.qtcustorderno);

          this.qt_cash_disc_days = this.tableData.qt_cash_disc_days
          this.form.get('txCondDiscDays')?.setValue(this.qt_cash_disc_days)

          this.qt_cond_disc_amt = this.tableData.qtconddiscamt
          this.form.get('txCondDiscAmt')?.setValue(this.qt_cond_disc_amt)
          this.qt_cond_disc_perc = this.tableData.qtconddiscperc
          this.form.get('txCondDiscPerc')?.setValue(this.qt_cond_disc_perc)
          this.qt_email1 = this.tableData.qt_email1 == null || this.tableData.qt_email1 == undefined || this.tableData.qt_email1.trim()==''?null:this.tableData.qt_email1 
          this.form.get('txtEmailTo1')?.setValue(this.qt_email1)
          this.qt_email2 = this.tableData.qt_email2 == null || this.tableData.qt_email2 == undefined || this.tableData.qt_email2.trim()==''?null:this.tableData.qt_email2 
          this.form.get('txtEmailTo2')?.setValue(this.qt_email2)
          this.qt_email3 = this.tableData.qt_email3 == null || this.tableData.qt_email3 == undefined || this.tableData.qt_email3.trim()==''?null:this.tableData.qt_email3
          this.form.get('txtEmailTo3')?.setValue(this.qt_email3)
          this.qt_email4 = this.tableData.qt_email4 == null || this.tableData.qt_email4 == undefined || this.tableData.qt_email4.trim()==''?null:this.tableData.qt_email4
          this.form.get('txtEmailTo4')?.setValue(this.qt_email4)
          this.qt_email5 = this.tableData.qt_email5 == null || this.tableData.qt_email5 == undefined || this.tableData.qt_email5.trim()==''?null:this.tableData.qt_email5
          this.form.get('txtEmailTo5')?.setValue(this.qt_email5)
          this.qt_inspec_note = this.tableData.qt_inspec_note
          this.form.get('txtInspNote')?.setValue(this.qt_inspec_note)
          this.qt_other_doc_note = this.tableData.qt_other_doc_note
          this.qt_inter_info = this.tableData.qt_inter_info
          this.qt_remarks = this.tableData.qtremarks
          this.form.get('txtRemarks')?.setValue(this.qt_remarks)

          this.qt_normal_tc_flg = this.tableData.qt_normal_tc_flg
          this.qt_routine_tc_flg = this.tableData.qt_routine_tc_flg
          this.qt_type_tc_flg = this.tableData.qt_type_tc_flg
          this.qt_g_cert_flg = this.tableData.qt_g_cert_flg
          this.qt_insp_rep_flg = this.tableData.qt_insp_rep_flg



          this.qt_npay_days = this.tableData.qtnpaydays
          this.form.controls.txNoOfDays.setValue(this.qt_npay_days)
          
          this.qt_pay_code = this.tableData.qtpaycode
          this.qt_cash_disc_days = this.tableData.qt_cash_disc_days
          this.qt_ts_cash_disc = this.tableData.qt_ts_cash_disc
          this.qt_cust_order_no = this.tableData.qtcustorderno
          this.qt_ts_cust_order_no = this.tableData.qt_ts_cust_order_no
          this.qt_doc_del_addr_code = this.tableData.qt_doc_del_addr_code
          this.qt_del_addr_code = this.tableData.qt_del_addr_code
          this.qt_docsch_id = this.tableData.qt_docsch_id
          this.form.controls.cmbPayTerms.setValue(this.tableData.qtpaycode)
          this.qt_curr_code = this.tableData.qt_curr_code
          //let objCurr = this.CurrencyList.find(({ curr_currency_code }) => curr_currency_code== this.qt_curr_code);

          this.form.controls.cmbCurrency.setValue(this.CurrencyList[0]);
          //})
        }
      }
    )
  }

  getOtherInfoDtl() {

    this.payload = {
      callFrom: "Complete",
      qt_cust_code: this.dialogData.qt_cust_code,
      qt_quot_no: this.dialogData.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))  ||""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  ||""),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ||""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ||""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ||""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ||""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ||""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ||""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ||""),
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
          this.paytermsList = data.responseData[0][2];

          //this.form.controls.txNoOfDays.setValue(this.paymentTermsDays.pay_terms_day);
          //this.form.controls.cmbPayTerms.setValue(this.paymentTermsDays.ccs_pay_code);

          this.taxcodeAndGrossAmount = data.responseData[0][3];

          this.dataSourceDocTerms = data.responseData[0][5];

          data.responseData[0][5].forEach((item : any) => {
            this.addNewRow();
          })

          this.setDocTermsData(this.dataSourceDocTerms);

        }
      });

  }


  getPaymentTerm() {
    let pay_day = this.form.controls.txNoOfDays.value;
    if (pay_day == '') {
      pay_day = 0;
    }

    if (this.form.controls.txNoOfDays.value > this.paymentTermsDays.pay_terms_day) {
      this.form.controls.txNoOfDays.setValue(this.paymentTermsDays.pay_terms_day)
      this.openSnackBar("no of days should not be greater than " + this.paymentTermsDays.pay_terms_day);
      return false;
    }

    this.utilityServiceAvaxPro.getPaymentTerm(pay_day).
    subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.paytermsList = data.responseData[0];
        let objPayterm = this.paytermsList.find(({ pt_code } : any) => pt_code == this.paymentTermsDays.ccs_pay_code);
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
    this.quotationService.showAddQuotFilterList(this.dialogData.qt_cust_code)
      .toPromise()
      .then()
      .finally(() => {
      }).then(data => {

        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.billedAddrList = data.responseData[0][2]
          const toSelect = this.billedAddrList.find((c : any) => c.csad_addr_code == "1")
          this.form.get('cmbBilledAddress')?.setValue(toSelect);
          const toSelectedAddr = this.billedAddrList.find((c : any) => c.csad_addr_code == "1")
          this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
        }
      });

  }

  getOtherInfoCommonList() {

    this.utilityServiceAvaxPro.getOtherinfoCommonList(this.dialogData.qt_cust_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.billedAddrList = data.responseData[0][5].map((item : any) => {
            return new DocAddressModel(item.csad_addr_code, item.csad_address)
          })


          //qt_del_addr_code,qt_delivery_addr

          if (this.qt_del_addr_code == "0" || this.qt_del_addr_code == undefined) {

            const toSelect = this.billedAddrList.find((c : any) => c.csad_addr_code == "1")
            this.form.get('cmbBilledAddress')?.setValue(toSelect);

            const toSelectedAddr = this.billedAddrList.find((c : any) => c.csad_addr_code == "1")
            this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }
          else {
            const toSelect = this.billedAddrList.find(( c : any) => c.csad_addr_code == this.qt_del_addr_code)
            this.form.get('cmbBilledAddress')?.setValue(toSelect);

            const toSelectedAddr = this.billedAddrList.find((c : any) => (c : any) => c.csad_addr_code == this.qt_del_addr_code)
            this.form.get('txtBillAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }

          this.DocAddressList = data.responseData[0][5].map((item : any) => {
            return new DocAddressModel(item.csad_addr_code, item.csad_address)
          })

          if (this.qt_doc_del_addr_code == "0" || this.qt_doc_del_addr_code == undefined) {

            const toSelect = this.DocAddressList.find((c : any) => c.csad_addr_code == "1")
            this.form.get('cmbDocDelvAddress')?.setValue(toSelect);

            const toSelectedAddr = this.DocAddressList.find((c : any) => c.csad_addr_code == "1")
            this.form.get('txtDocDelvAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }
          else {
            const toSelect = this.DocAddressList.find((c : any) => c.csad_addr_code == this.qt_doc_del_addr_code)
            this.form.get('cmbDocDelvAddress')?.setValue(toSelect);

            const toSelectedAddr = this.DocAddressList.find((c : any) => c.csad_addr_code == this.qt_doc_del_addr_code)
            this.form.get('txtDocDelvAddressDetail')?.setValue(toSelectedAddr.csad_address);
          }



          this.CurrencyList = data.responseData[0][6].map((item : any) => {
            return new CurrencyModel(item.curr_currency_code, item.curr_currency_desc)
          })



        }
      }
    )
  }


  showBillAddrDtls(event : any) {
    this.form.get("txtBillAddressDetail")?.setValue(event.source.value.csad_address)
  }

  showDocumentAddrDtls(event : any) {
    this.form.get("txtDocDelvAddressDetail")?.setValue(event.source.value.csad_address)
  }

  checkTermsConditions(event : any) {
  }

  setPercOrAmt(flg : any) {
    if (flg == "P") {
      this.form.controls.txCondDiscAmt.setValue('');
    } else {
      this.form.controls.txCondDiscPerc.setValue('');
    }
  }


  updateOtherInfo() {

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
      this.form.controls.txCondDiscPerc.value === null || this.form.controls.txCondDiscPerc.value == '0') {
    } else {
      if (isNaN(this.form.controls.txCondDiscPerc.value)) {
        this.openSnackBar("Please Enter Valid Condition Disc Percentage.");
        return false;
      }
    }

    /* if (this.form.controls.txCondDiscDays.value === '' ||
      this.form.controls.txCondDiscDays.value === undefined ||
      this.form.controls.txCondDiscDays.value === null) {
      if (this.form.controls.txCondDiscPerc.value === '' ||
        this.form.controls.txCondDiscPerc.value === undefined ||
        this.form.controls.txCondDiscPerc.value === null) {
      } else {
        this.openSnackBar("Please Enter Condition Discount Days.");
        return false;
      }
    } */

    if (this.form.controls.txCondDiscAmt.value == '' ||
      this.form.controls.txCondDiscAmt.value == undefined ||
      this.form.controls.txCondDiscAmt.value == null ||
      this.form.controls.txCondDiscAmt.value == '0') {

    } else {
      if (isNaN(this.form.controls.txCondDiscAmt.value)) {
        this.openSnackBar("Please Enter Valid Condition Disc Amount.");
        return false;
      }
    }

    /* if (this.form.controls.txCondDiscDays.value === '' ||
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
 */

    if (this.form.controls.cmbPayTerms.value === "" ||
      this.form.controls.cmbPayTerms.value === undefined ||
      this.form.controls.cmbPayTerms.value === null) {
      this.openSnackBar("Select Payment Terms.");
      return false;
    }

    if (this.form.controls.txtEmailTo1.value === undefined || this.form.controls.txtEmailTo1.value === null || this.form.controls.txtEmailTo1.value.trim() === '') {
    } else {
      if (!this.form.controls.txtEmailTo1.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 1");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo2.value === undefined || this.form.controls.txtEmailTo2.value === null || this.form.controls.txtEmailTo2.value.trim() === '') {
    } else {
      if (!this.form.controls.txtEmailTo2.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 2");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo3.value === undefined || this.form.controls.txtEmailTo3.value === null || this.form.controls.txtEmailTo3.value.trim() === '') {
    } else {
      if (!this.form.controls.txtEmailTo3.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 3");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo4.value === undefined || this.form.controls.txtEmailTo4.value === null || this.form.controls.txtEmailTo4.value.trim() === '') {
    } else {
      if (!this.form.controls.txtEmailTo4.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 4");
        return false;
      }
    }

    if (this.form.controls.txtEmailTo5.value === undefined || this.form.controls.txtEmailTo5.value === null || this.form.controls.txtEmailTo5.value.trim() === '') {
    } else {
      if (!this.form.controls.txtEmailTo5.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
        this.openSnackBar("Please Enter Valid EmailId 5");
        return false;
      }
    }

    console.log('inside update other info ')

    if (this.form.controls.cmbCurrency.value == '' || this.form.controls.cmbCurrency.value == null
      || this.form.controls.cmbCurrency.value == undefined) {
      this.openSnackBar("Please select currency.");
      return false;
    }

    this.payload = {

      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ||""),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ||""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ||""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ||""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ||""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ||""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ||""),
 
      },
      callFrom: 'COMPLETE',
      qt_quot_no: this.dialogData.qt_quot_no,
      qtd_quot_no: this.dialogData.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))  ||""),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))  ||""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  ||""),
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))  ||""),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))  ||""),
      qtd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  ||""),


      qt_cash_disc_days: this.form.controls.txCondDiscDays.value == "" ? '0' : this.form.controls.txCondDiscDays.value,
      qt_cond_disc_perc: this.form.controls.txCondDiscPerc.value == "" ? '0' : this.form.controls.txCondDiscPerc.value,      
      qt_disc_flg: this.form.controls.txCondDiscPerc.value == '' ? 'A' : 'P',
      qt_discamt: this.form.controls.txCondDiscAmt.value == '' ? '0' : this.form.controls.txCondDiscAmt.value,

      //qt_ts_cust_order_no: this.form.controls.txtPartyOrderDate.value,
      qt_ts_cust_order_no: this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.txtPartyOrderDate.value),
      qt_cust_order_no: this.form.controls.txtPartyOrderNo.value == '' || this.form.controls.txtPartyOrderNo.value == undefined ||
        this.form.controls.txtPartyOrderNo.value == '' ? '' : this.form.controls.txtPartyOrderNo.value,
      //qt_ts_cash_disc: this.form.controls.txtCashDiscUptoDate.value,
      qt_ts_cash_disc: this.utilityServiceAvaxPro.getFormattedDate(this.form.controls.txtCashDiscUptoDate.value),

      qt_curr_code: this.form.controls.cmbCurrency.value != '' ?
        this.form.controls.cmbCurrency.value.curr_currency_code : '',

      qt_del_addr_code: this.form.controls.cmbBilledAddress.value.csad_addr_code,
      qt_delivery_addr: this.form.controls.txtBillAddressDetail.value,

      qt_doc_del_addr_code: this.form.controls.cmbDocDelvAddress.value.csad_addr_code,
      qt_doc_del_addr: this.form.controls.txtDocDelvAddressDetail.value,


      qt_remarks: this.form.controls.txtRemarks.value == '' ||
        this.form.controls.txtRemarks.value == undefined ||
        this.form.controls.txtRemarks.value == '' ? '' : this.form.controls.txtRemarks.value,

      qt_email1: this.form.controls.txtEmailTo1.value == undefined ||
        this.form.controls.txtEmailTo1.value == null || this.form.controls.txtEmailTo1.value.trim() == '' ? null : this.form.controls.txtEmailTo1.value,

      qt_email2: this.form.controls.txtEmailTo2.value == undefined ||
        this.form.controls.txtEmailTo2.value == null || this.form.controls.txtEmailTo2.value.trim() == '' ? null : this.form.controls.txtEmailTo2.value,

      qt_email3: this.form.controls.txtEmailTo3.value == undefined ||
        this.form.controls.txtEmailTo3.value == null || this.form.controls.txtEmailTo3.value.trim() == '' ? null : this.form.controls.txtEmailTo3.value,

      qt_email4: this.form.controls.txtEmailTo4.value == undefined ||
        this.form.controls.txtEmailTo4.value == null || this.form.controls.txtEmailTo4.value.trim() == '' ? null : this.form.controls.txtEmailTo4.value,

      qt_email5: this.form.controls.txtEmailTo5.value == undefined ||
        this.form.controls.txtEmailTo5.value == null || this.form.controls.txtEmailTo5.value.trim() == '' ? null : this.form.controls.txtEmailTo5.value,

      qt_npay_days: this.form.controls.txNoOfDays.value == '' ||this.form.controls.txNoOfDays.value == undefined ? '0' : this.form.controls.txNoOfDays.value,
      qt_pay_code: this.form.controls.cmbPayTerms.value == '' ? '' : this.form.controls.cmbPayTerms.value,

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
      console.log('for loop tempObj', tempObj);
      this.docTermsArray.push(tempObj);
    }

    this.payload["docTermsArray"] = this.docTermsArray;

    this.quotationService.modifyHeaderdetails(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.openSnackBar(data.responseData[0][0]);

          if (data.responseData[0][1] == "Y") {
            this.queryParams["docNo"] = this.dialogData.qt_quot_no;
            this.queryParams["qt_quot_no"] = this.dialogData.qt_quot_no;
            this.queryParams["isFromPendingDraft"] = "N";
            this.queryParams["callFrom"] = "COMPLETE";
            this.queryParams["isForViewQuotation"] = "Y";
            this.queryParams["userInformationDto"] = {
              usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ||""),
              usr_userid: atob(sessionStorage.getItem(btoa('userId')) ||""),
              usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""),
              usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""),
            }
            sessionStorage.removeItem("data");
            sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
            this.router.navigate(['session/entry/quotation/quotview'], { state: this.queryParams });
          }


        }
      })
      return true;
  }

  saveCcsPreferenceData(flg : any) {
    this.payload = {
      party_code: this.dialogData.qt_cust_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ||""),
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
    subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        console.log(" Successfully saveCcsPreferenceData")
      }
    })
    return true;
  
  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

}

