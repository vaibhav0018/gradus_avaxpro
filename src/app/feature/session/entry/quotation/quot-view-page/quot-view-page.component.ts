import { Component, OnInit } from '@angular/core';
import {  FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../commons/date-adapter/app-date-adapter.service';
import { QuotationService } from '../quotation.service';
import { BehaviorSubject } from 'rxjs';
import { ItemDetailHistoryComponent } from '../../item-detail-history/item-detail-history.component';
import { ItemOtherInfoDetailsComponent } from '../../commons/item-other-info-details/item-other-info-details.component';
import { DocumentListModel } from '../../challan/components/challan-menu.model';
import { ItemQtyExeInfoDetailsComponent } from '../item-qty-exe-info-details/item-qty-exe-info-details.component';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PrintService } from '../../../print/print.service';
import * as fileSaver from 'file-saver';
import { ConstantsServiceAvaxPro } from '../../../../../core/services/constants_avaxpro.service';
import { Router } from '@angular/router';
import { UtilityServiceAvaxPro } from '../../../../../core/services/utility/utility_avaxpro.service';

const MIME_TYPE = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.  spreadsheetxml.sheet',
}

export interface ItemTableData {
  cmbItem: string;
  txtProductCode: string;
  txtCatRef: string;
  cmbMake: string;
  cmbUom: string;
  txtQty: Number;
  txtListPrice: number;
  txtInputRate: number;
  txtAmt: Number;
  txtCalcDesc: Number;
}

@Component({
  selector: 'app-quot-view-page',
  templateUrl: './quot-view-page.component.html',
  styleUrls: ['./quot-view-page.component.scss', '../../entry.scss'],

  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})

export class QuotViewPageComponent implements OnInit {

  objDraftHeader: any
  showAoItemListFlag: boolean = false
  readonlyFlg: boolean = true;
  params: any
  otherInfoPageData: any

  otherInfoParams: any

  otherInfoPageDataFlag: boolean = false

  queryParams: { callFrom?: string; [key: string]: any } = {};


  displayItemColumns: string[] = [
    'serial_no',
    'item_code',
    'it_product_code',
    'itm_catalog_ref_no',
    'make',
    'layout',
    'quot_qty',
    'exe_qty',
    'salable_stk',
    'uom_code',
    'list_price',
    'rate',
    'amt',
    'calculator'
  ]
  dataSource = new BehaviorSubject<AbstractControl[]>([]);


  form: FormGroup;
  formGroup: FormGroup
  stateData: any

  payload: { [key: string]: any } = {}
  tableData: any

  addedItemRow: object = {}
  showAddedItemFlag: boolean = false
  itemCalcDataInArray = []
  itemCalcData: any;

  docData = {}

  columnsOtherInfo = ['sr_no', 'item_code', 'ao_no', 'ao_date', 'ao_qty', 'ao_src', 'challan_no', 'challan_date',
    'challan_item_qty', 'po_no', 'po_date', 'po_item_qty', 'po_party']
  dataSourceOtherInfo: any
  dataSourceTermsData: any
  columnsDocTerms = ['sr_no', 'trans_name', 'trans_name_value']
  dataSourceDocTerms: any;

  columnsModifyTracking = ['sr_no', 'voucher_no', 'modify_date', 'modified_by', 'column_name', 'column_value']
  dataSourceModifyTracking: any

  docLists: any = []

  docCalcData: any;
  docCalcDataInArray: any[];

  modifyHeaderFlag: boolean = false

  showHistoryOfChangesFlg: boolean = false;
  fileOtherInfo: boolean = false;
  fileDescriptionLists: any = []
  value1 = 50;
  bufferValue = 75;
  uploadResponse: any;
  fileName: any

  flgOtherBranch: string = 'N'
  oth_siscon: string 
  oth_branch: string
  printService: any;

  constructor(
    private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    // private printService: PrintService,------------------------------------------
    private router: Router,
  ) {
     this.form = this.formBuilder.group({
     /* cmbFileDesc: [''],
      txtFileOtherDesc: [''],*/
      txtQtnNo:['']
    }) 
  }

  stateDataStr: string;
  tempDate: Date;
  draftno: string
  isFromPendingDraft: string = 'N';
  isForViewQuotation: string = 'N';
  revisionFlag: string = 'N';
  docCalcDataInput: any;
  callFrom: string = 'Draft';
  showFloatingButtons = false;
  showOtherDocs: boolean = false;
  relatedDocs: boolean = false;
  historyOfChanges: boolean = false;
  docTerms: boolean = false;
  paymentVchrShowMtTblFlg1: boolean = false;
  isCompletionPage: string = "N"

  ngOnInit() {

    this.readonlyFlg = true;

    if (sessionStorage.getItem("stateData")!=null){
      this.stateDataStr = sessionStorage.getItem("stateData") ?? '';
      sessionStorage.setItem("refData", this.stateDataStr);
    }
    else {
      this.stateDataStr = sessionStorage.getItem("refData") ?? '';
    }
    this.stateData = JSON.parse(this.stateDataStr);
    this.objDraftHeader = this.stateData;

    this.otherInfoParams = JSON.parse(this.stateDataStr);
    this.docCalcDataInput = JSON.parse(this.stateDataStr);

    this.isFromPendingDraft = this.objDraftHeader.isFromPendingDraft;

    if(this.objDraftHeader.flgOtherBranch == 'Y'){
    this.flgOtherBranch = this.objDraftHeader.flgOtherBranch;
    this.oth_siscon = this.objDraftHeader.oth_siscon;
    this.oth_branch = this.objDraftHeader.oth_branch;
    }

    this.revisionFlag = this.objDraftHeader.revisionFlag;

    this.isForViewQuotation = this.objDraftHeader.isForViewQuotation;

    if (this.isFromPendingDraft == 'N') {
      this.modifyHeaderFlag = true;
      this.loadCompleteQuotData(this.objDraftHeader.qt_quot_no, 'COMPLETE');
    }

    if (this.objDraftHeader.hasOwnProperty('isCompletionPage')) {
      this.isCompletionPage = this.objDraftHeader.isCompletionPage
    }
  }



  loadCompleteQuotData(qt_quot_no : any, callFrom: any) {
    this.fileOtherInfo = false;
    this.docData = JSON.parse(this.stateDataStr);
    this.getCompleteQuotHeaderDetails(qt_quot_no, callFrom);

  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
    sessionStorage.removeItem("stateData");
  }



  getCompleteQuotHeaderDetails(quotationNo : any, callfrom : any) {

    this.payload = {
      callFrom: callfrom,
      qt_quot_no: quotationNo,
      // qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      // qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      },
    }

    if(this.flgOtherBranch == 'Y'){
      this.payload['qt_siscon_code'] = this.oth_siscon
      this.payload['qt_branch_code'] = this.oth_branch
    }else{
      this.payload['qt_siscon_code'] = atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||"")
      this.payload['qt_branch_code'] = atob(sessionStorage.getItem(btoa('usr_of_branch')) ||"")
    }

    this.quotationService.getCompleteQuotHeaderDetailsService(this.payload).subscribe(
      data => {

        this.objDraftHeader = null;
        //this.objDraftHeader = data.responseData[0].QUOT_HEADER;
        this.objDraftHeader = data.responseData[0].quot_header;
        //this.dataSourceOtherInfo = data.responseData[0].OTHER_DOC_LIST;
        this.dataSourceOtherInfo = data.responseData[0].other_doc_list;
        //this.dataSourceTermsData = data.responseData[0].TERMS_DATA;

        //this.dataSourceTermsData  = null;
        //this.dataSourceDocTerms = data.responseData[0].TERMS_DATA;
        this.dataSourceDocTerms = data.responseData[0].terms_data;

        //this.docLists = data.responseData[0].DOC_LIST.map(item => {
          this.docLists = data.responseData[0].doc_list.map((item : any) => {
          return new DocumentListModel(
            item.fl_siscon_code,
            item.fl_branch_code,
            item.fl_doc_no,
            item.fl_doc_name,
            item.fl_file_name,
            item.fl_ts_created
          )
        })

        this.displayAddedItemsForCompleteQuot(quotationNo, callfrom);
        this.draftno = this.objDraftHeader.qt_quot_no;
      })
  }

  toggle(flag : any) {

    if (flag === 'otherRelatedDtl') {
      if (this.showOtherDocs) {
        this.showOtherDocs = false;
      }
      else {
        this.historyOfChanges = false;
        this.showOtherDocs = true;
        this.relatedDocs = false;
        this.docTerms = false;
      }
    }
    if (flag === 'relatedDocs') {
      if (this.relatedDocs) {
        this.relatedDocs = false;
      }
      else {
        this.historyOfChanges = false;
        this.relatedDocs = true;
        this.showOtherDocs = false;
        this.docTerms = false;
      }
    }

    if (flag === 'historyOfChanges') {
      if (this.historyOfChanges) {
        this.historyOfChanges = false;
      }
      else {
        this.historyOfChanges = true;
        this.relatedDocs = false;
        this.showOtherDocs = false;
        this.docTerms = false;
      }
    }
    if (flag === 'docTerms') {
      if (this.docTerms) {
        this.docTerms = false;
      }
      else {
        this.historyOfChanges = false;
        this.docTerms = true;
        this.showOtherDocs = false;
        this.relatedDocs = false;

      }
    }
  }


  displayAddedItemsForCompleteQuot(draftNo : any, callfrom : any) {
    
    let data: any = []
    if(this.flgOtherBranch == 'Y'){
      data['flgOtherBranch'] = this.flgOtherBranch
      data['oth_siscon'] = this.oth_siscon
      data['oth_branch'] = this.oth_branch
    }
    
    this.quotationService.getAddedItemDetailsList(draftNo, callfrom,data).subscribe(
      data => {
        this.dataSource = new BehaviorSubject<AbstractControl[]>([]);
        this.dataSource = data.responseData[0];
      })
  }

  itemOtherInfoDetails(row : any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '700px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: 'ITEM OTHER INFO DETAILS',
      headerTable: {
        ITEM_CODE: row.item_code,
        PARTY_ITEM: row.qtd_party_item_code,
        ITEM_NOTE: row.qtd_item_note,
        ITEM_VARIATION: row.qtd_variation_code,
        ITEM_VARIATION_LEN: row.qtd_variation_len,
        ITEM_REMARKS: row.qtd_item_remark,
      },
    }
    const dialogRef = this.dialog.open(ItemOtherInfoDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
  }


  openShowItemHistoryDetails(row : any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '540px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Item Details History',
      moduleId: "QOT",
      itemCode: row.item_code,
      make: row.make,
      doc_cust_code: this.objDraftHeader.qt_cust_code
    }
    const dialogRef = this.dialog.open(ItemDetailHistoryComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {

    })
  }

  showExeQtyDtls(row : any) {
    console.log('showExeQtyDtls row', row);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '600px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Quotation Execution Details',
      qt_quot_no: row.qtd_draft_no,
      qtd_serial_no: row.serial_no
    }
    const dialogRef = this.dialog.open(ItemQtyExeInfoDetailsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
    })
  }

  showTax() {
    this.showFloatingButtons = !this.showFloatingButtons;
  }

  openSnackBar(message : any) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: message,
    //   duration: 1000,
    // });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }


  showStockQuery(row: any) {
    this.payload = {
      item_code: row.item_code,
      user_userId: atob(sessionStorage.getItem(btoa('userId'))||"") + "::" + atob(sessionStorage.getItem(btoa('username'))||"")
    }
    sessionStorage.removeItem("data");
    sessionStorage.setItem("stateData", JSON.stringify(this.payload));
    window.open('session/query/stock-query', '_blank'), { state: this.payload };
  }


  printQtnDoc() {

    this.fileName = "Quot_" + atob(sessionStorage.getItem(btoa('usr_of_branch'))||"") + "_" + this.objDraftHeader.qt_quot_no.substring(12) + ".pdf";
    let jsonObj =
    {
      docNo: this.objDraftHeader.qt_quot_no,
      docSubType: 'FR',
      itemCalc: true,
      techDesc: true,
      orderBy: "sr_no",
      displayImage:false,
      userInformationDto:
      {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? '')
      }
    }
    this.value1 = 0;
    this.bufferValue = 20
    this.printService.downloadPdf(JSON.parse(JSON.stringify(jsonObj)), 'QuotationPrintService').toPromise().then((res : any) => this.uploadResponse = res).finally().then
      (
        () => {
          const blob = new Blob([this.uploadResponse], { type: 'application/octet-stream' });
          this.value1 = 100;
          this.bufferValue = 100
          fileSaver.saveAs(blob, this.fileName);
        }
      )
  }

  openLinkClickHandler(res: any) {
    sessionStorage.removeItem("ao_view_data");
    sessionStorage.removeItem("stateData");
    let deleteDraft = '';
    let data = {
      ao_ao_draft_no: '',
      ao_ao_no: res.aod_ao_no,
      pending_draft: '',
      flg_module: '',
      fromFlag: "draft",
      deleteDraft: deleteDraft,
      docNo: res.aod_ao_no,
      draftNo: res.aod_ao_no,
      ao_no: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
      editHeader: "N",
      editItems: "N",
      editDocCalc: "N",
      ao_qt_en_no: '',
      selectedSourcing: '',
      ao_cust_code: '',
      ao_from: '',
      cmbAOSource: '',
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      },
    }
    data.flg_module = 'V'
    sessionStorage.setItem("stateData", JSON.stringify(data));
    window.open('session/entry/ao/ao-item-view', '_blank'), { state: data };
  }

  ShowQtn(){

    this.payload = {
      advanceSearchFlag: 'Y',
      qt_created_by: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      }
    }

    this.payload["qt_branch_code"] = atob(sessionStorage.getItem(btoa('usr_of_branch'))||"");
    this.payload["qt_siscon_code"] = atob(sessionStorage.getItem(btoa('usr_of_siscon'))||"");

    console.log("val -- " + this.form.controls.txtQtnNo.value)

     if (this.form.controls.txtQtnNo.value == null || this.form.controls.txtQtnNo.value == undefined ||
        this.form.controls.txtQtnNo.value == '') {
        this.openSnackBar("Please Enter Quotation no");
        return false;
      } else {
        this.payload["qt_quot_no"] = this.form.controls.txtQtnNo.value;
      }
    
      let df_year_format = atob(sessionStorage.getItem(btoa('fin_year_format'))||"");
    this.payload["df_year_format"] = df_year_format;

    let row: any = []
    this.quotationService.ShowQtn(this.payload).subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          data.responseData[0].map((item : any) => {

               row['total_count']= item.total_count
               row['qt_quot_no']= item.qt_quot_no
               row['qt_draft_no']= item.qt_draft_no
               row['qt_draft_date']= item.qt_draft_date
               row['qt_handled_by']= item.qt_handled_by
               row['qt_cust_code']= item.qt_cust_code
               row['qt_cust_name']= item.qt_cust_name
               row['qt_disp_to_name']= item.qt_disp_to_name
               row['qt_tax_type_code']= item.qt_tax_type_code
               row['qt_gross_amt']= item.qt_gross_amt
               row['qt_disp_to_code']= item.qt_disp_to_code
               row['qt_source_type']= item.qt_source_type
               row['qt_doc_type_code']= item.qt_doc_type_code
               row['qt_inv_type_code']= item.qt_inv_type_code

               console.log("row -- " , row)

               this.getdataForQtn(row)

          });
          return true;
        } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
        return false; // Default return for other cases
      },
      error:(error: any) => {
        console.log(error)
      }}
    )
    return true;

  }

  getdataForQtn(row: any) {

    // this.payload = row;
    this.payload['total_count']= row.total_count
    this.payload['qt_quot_no']= row.qt_quot_no
    this.payload['qt_draft_no']= row.qt_draft_no
    this.payload['qt_draft_date']= row.qt_draft_date
    this.payload['qt_handled_by']= row.qt_handled_by
    this.payload['qt_cust_code']= row.qt_cust_code
    this.payload['qt_cust_name']= row.qt_cust_name
    this.payload['qt_disp_to_name']= row.qt_disp_to_name
    this.payload['qt_tax_type_code']= row.qt_tax_type_code
    this.payload['qt_gross_amt']= row.qt_gross_amt
    this.payload['qt_disp_to_code']= row.qt_disp_to_code
    this.payload['qt_source_type']= row.qt_source_type
    this.payload['qt_doc_type_code']= row.qt_doc_type_code
    this.payload['qt_inv_type_code']= row.qt_inv_type_code

    this.payload["generateDraftFlg"] = 'N';

    this.payload["userInformationDto"] = {
      usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
      usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
    }
    this.quotationService.generateDraft(this.payload).toPromise().then(data => {

      this.queryParams = data.responseData[0].headerdeatails;
      this.queryParams["callFrom"] = "COMPLETE";
      this.queryParams["isFromPendingDraft"] = "N";
      this.queryParams["isForViewQuotation"] = "Y";

        let quot_no = row.qt_quot_no;
        this.queryParams["docNo"] = quot_no;
        this.queryParams["qt_quot_no"] = quot_no;
        this.queryParams["userInformationDto"] = {
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        }

        console.log('-----------------------> ', this.queryParams);
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
        // this.router.navigate(['session/entry/quotation/quotview'], { state: this.queryParams });
        this.ngOnInit()
      

    }).catch(err => {
    });
  }

  onExcelClickHandler(row : any){
    this.payload = {      
      callFrom: "COMPLETE",
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      qt_quot_no: row.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
      },

    }

    if(this.flgOtherBranch == 'Y'){
      this.payload['qt_siscon_code'] = this.oth_siscon
      this.payload['qt_branch_code'] = this.oth_branch
    }else{
      this.payload['qt_siscon_code'] = atob(sessionStorage.getItem(btoa('usr_of_siscon')) || '')
      this.payload['qt_branch_code'] = atob(sessionStorage.getItem(btoa('usr_of_branch')) || '')
    }
    

    const fileName = 'QuotationDetailExcel.xls'

    this.payload['fileName'] = fileName

    this.quotationService.downloadFile(this.payload)
    .subscribe(data => 
      fileSaver.saveAs(new Blob([data], { type: MIME_TYPE['xls'] }), fileName)) 
  }

}

