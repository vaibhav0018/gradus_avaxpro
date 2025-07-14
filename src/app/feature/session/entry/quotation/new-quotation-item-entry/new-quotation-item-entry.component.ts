import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,  AbstractControl } from '@angular/forms';
// import { MatSnackBar, MatDialog,  DateAdapter, MAT_DATE_FORMATS, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { UtilityServiceAvaxPro } from '../../../../../core/services/utility/utility_avaxpro.service';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../commons/date-adapter/app-date-adapter.service';
import { QuotationService } from '../quotation.service';
import { MakeModel, FileDescriptionModel } from 'src/app/core/services/utility/common/common-entity.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ItemServiceAvaxPro } from '../../../../../core/services/utilities/item_avaxpro.service';
import { SnackbarComponent } from 'src/app/feature/session/entry/snackbar/snackbar.component';
import { ConstantsServiceAvaxPro } from 'src/app/core/services/constants_avaxpro.service';
import { ItemCalcComponent } from '../../commons/item-calc/item-calc.component';
//import { DataService } from '../../challan/components/challan-menu/data.service';
import { DefaultItemCalc } from '../../commons/item-calc/item-calc.model';
import { QuotItemOtherInfoComponent } from '../quot-item-other-info/quot-item-other-info.component';
import { ModifyHeaderPageComponent } from '../modify-header-page/modify-header-page.component';
import { AddedItemModel } from '../quotation.model';
import { ItemDetailHistoryComponent } from '../../item-detail-history/item-detail-history.component';
import { ItemOtherInfoDetailsComponent } from '../../commons/item-other-info-details/item-other-info-details.component';
import { DocumentListModel } from '../../challan/components/challan-menu.model';
import { DocCalcComponent } from '../../commons/doc-calc/doc-calc.component';
import { EntryService } from '../../entry.service';
import { DocCalcService } from '../../commons/doc-calc/doc-calc.service';
import { DataService } from '../../commons/item-calc/data.service';
import { ItemQtyExeInfoDetailsComponent } from '../item-qty-exe-info-details/item-qty-exe-info-details.component';
import { DatePipe } from '@angular/common';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { BulkAdditionComponent } from '../../commons/bulk-addition/bulk-addition.component';
import { ModifyOtherInfoComponent } from '../modify-other-info/modify-other-info.component';
import { ItemModelwithLP, UomModelWithCnv } from '../../commons/commons.model';
import * as fileSaver from 'file-saver'; // npm i --save file-saver
import { BulkAdditionThroughExcelComponent } from '../../commons/bulk-addition-through-excel/bulk-addition-through-excel.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ItemRemarksUpdateComponent } from '../../commons/item-remarks-update/item-remarks-update.component';
import { CommonConfirmationDialogComponent } from 'src/app/shared/components/common-confirmation-dialog/common-confirmation-dialog.component';


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
  chkItem: string;
  cmbLayout:string
}


@Component({
  selector: 'app-new-quotation-item-entry',
  templateUrl: './new-quotation-item-entry.component.html',
  styleUrls: ['./new-quotation-item-entry.component.scss', '../../entry.scss'],

  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})



export class NewQuotationItemEntryComponent implements OnInit {

  objDraftHeader: any
  showAoItemListFlag: boolean = false
  readonlyFlg: boolean = true;

  objItem: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  //public itemList: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  filteredFromItemNames: Observable<any[]>[] = [];
  filteredItem: any[] = new Array<any>()
  itemLists: any = []

  makeLists: any = []
  mkList: MakeModel[] = new Array<MakeModel>()
  filteredMakeLists: Observable<any>

  uomLists: UomModelWithCnv[] = new Array<UomModelWithCnv>();
  filteredUomLists: Observable<any[]>[] = [];
  params: any
  otherInfoPageData: any
  otherInfoParams: any

  queryParams = {}
  itemLp = []
  displayItemColumns: string[] = [
    //'serial_no',
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
    , 'select'
  ]
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  data: ItemTableData[] = [{
    cmbItem: '',
    txtProductCode: '',
    txtCatRef: '',
    cmbMake: '',
    cmbUom: '',
    txtQty: 0,
    txtListPrice: 0,
    txtInputRate: 0,
    txtAmt: 0,
    txtCalcDesc: 0,
    chkItem: '',
    cmbLayout:'',
  }];





  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);
  form: FormGroup = this.formBuilder.group({ 'arrayAddItem': this.rows });


  aryTableControl: AbstractControl[]
  formGroup: FormGroup

  //form: FormGroup;

  stateData: any

  payload: object = {}
  tableData: any

  addedItemRow: object = {}
  showAddedItemFlag: boolean = false
  itemCalcDataInArray = []
  itemCalcData: any;

  // to show complete quotation related docs

  docData = {}

  columnsOtherInfo = ['sr_no', 'item_code', 'ao_no', 'ao_date', 'ao_qty', 'ao_src', 'challan_no', 'challan_date',
    'challan_item_qty', 'po_no', 'po_date', 'po_item_qty', 'po_party']
  dataSourceOtherInfo: any
  dataSourceTermsData: any
  columnsDocTerms = ['sr_no', 'trans_name', 'trans_name_value']
  dataSourceDocTerms: any = []

  columnsModifyTracking = ['sr_no', 'voucher_no', 'modify_date', 'modified_by', 'column_name', 'column_value']
  dataSourceModifyTracking: any


  quotRevisionShowFlag: boolean = false;
  columnsQuotRevision = ['quot_rev_no', 'handled_by', 'instructed_by', 'tax_code',
    'cond_disc_amt', 'gross_amt', 'tax_amt', 'net_amt', 'round_off', 'del_term_code', 'valid_days',
    'delivery_addr', 'bill_addr', 'disp_addr', 'select_rad']
  dataSourceQuotRevision: any
  quotRevisionFlag: boolean = true;

  docLists: any = []

  docCalcData: any;
  docCalcDataInArray: any[];

  modifyHeaderFlag: boolean = false

  showHistoryOfChangesFlg: boolean = false;

  showFileUploadFlg: boolean = false;
  showGenerateUploadFlg: boolean = false;
  fileOtherInfo: boolean = false;
  objBulkData: any = {}


  stateDataStr: string;
  tempDate: Date;
  draftno: string
  isFromPendingDraft: string = 'N';
  isForViewQuotation: string = 'N';
  revisionFlag: string = 'N';
  docCalcDataInput: any;
  callFrom: string = 'Draft';
  showFloatingButtons = false;



  // file upload
  fileDescriptionLists: any = []
  fileData: File = null;
  shwFileDtls: boolean = false;
  otherDescFlg: boolean = false;
  uploadResponse: any;
  error: any;
  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('file') fileInput;
  fileList: any = [];
  fileUploadFlg: boolean = false;


  uploadResponse1: any;
  fileData1: File;
  error1: any;

  //BULKADDTION THROUGH EXCEL
  bulkAdditionFromExcelFlg: boolean = false;

  makeList: any[] = []

  showItmHistryIconFlg: boolean = false;
  cit_phased_out: string;

  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private quotationService: QuotationService,
    private router: Router,
    private itemService: ItemServiceAvaxPro,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private itemCalcService: DataService,
    private enteryService: EntryService,
    private docCalcService: DocCalcService,
    private fileUploadService: FileUploadService,
    private objDataService: DataService,
  ) {

    this.form = this.formBuilder.group({
      cmbDocList: [''],
      txtFileOtherDesc: [''],
      txtUploadFile: [''],
      txtFileUploadDesc: [''],
      cmbFileDesc: [''],
      arrayAddItem: this.form.get('arrayAddItem') as FormArray,
      txtQtnNo:[''],
    })
  }



  ngOnInit() {

    // this.formGroup.addControl['rdbRevertQuot']='';
    this.quotRevisionShowFlag = false;
    this.quotRevisionFlag = true;
    this.readonlyFlg = true;

    this.bulkAdditionFromExcelFlg = false;


    if (sessionStorage.getItem("stateData") != null) {
      this.stateDataStr = sessionStorage.getItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }
    else {
      this.stateDataStr = sessionStorage.getItem("refData");
    }

    this.stateData = JSON.parse(this.stateDataStr);
    this.objDraftHeader = this.stateData;
    this.otherInfoParams = JSON.parse(this.stateDataStr);
    this.docCalcDataInput = JSON.parse(this.stateDataStr);

    this.isFromPendingDraft = this.objDraftHeader.isFromPendingDraft;
    this.revisionFlag = this.objDraftHeader.revisionFlag;

    this.isForViewQuotation = this.objDraftHeader.isForViewQuotation;

    if (this.isForViewQuotation == "Y") {
      this.displayItemColumns.slice(this.displayItemColumns.length, this.displayItemColumns.length);
    }
    if (this.isFromPendingDraft == 'N') {
      this.modifyHeaderFlag = true;
      this.loadCompleteQuotData(this.objDraftHeader.qt_quot_no, 'COMPLETE');
    }

    this.fetchFileList();
  }


  setPartyDetail(flg) {
  }

  loadCompleteQuotData(qt_quot_no, callFrom) {

    this.getFileDescription();
    this.showFileUploadFlg = false;
    this.fileOtherInfo = false;
    this.docData = JSON.parse(this.stateDataStr);
    this.getCompleteQuotHeaderDetails(qt_quot_no, callFrom);

    //this.getItemMakeList(0);

    this.data.forEach((d: ItemTableData) => this.addNewItemRow(0, d, false));
    this.updateView();


    // this.displayAddedItemsForCompleteQuot(qt_quot_no, callFrom);
    // this.draftno = this.objDraftHeader.qt_quot_no;
    //this.getItmList(0);
  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }



  getCompleteQuotHeaderDetails(quotationNo, callfrom) {

    this.payload = {
      callFrom: callfrom,
      qt_quot_no: quotationNo,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
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
    this.quotationService.getCompleteQuotHeaderDetailsService(this.payload).subscribe(
      data => {

        this.objDraftHeader = null;
        //this.objDraftHeader = data.responseData[0].QUOT_HEADER;
        this.objDraftHeader = data.responseData[0].quot_header;

        //this.dataSourceOtherInfo = data.responseData[0].OTHER_DOC_LIST;
        this.dataSourceOtherInfo = data.responseData[0].other_doc_list;

        //this.dataSourceTermsData = data.responseData[0].TERMS_DATA;

        //this.dataSourceTermsData  = null;
        //data.responseData[0].TERMS_DATA.map(item => {
        data.responseData[0].terms_data.map(item => {
          this.dataSourceDocTerms.push(item);
        }

        )

        this.docLists = data.responseData[0].doc_list.map(item => {
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
        this.getProjectDtl()
        this.draftno = this.objDraftHeader.qt_quot_no;

      })
  }

  showOtherDocs: boolean = false;
  relatedDocs: boolean = false;
  historyOfChanges: boolean = false;
  docTerms: boolean = false;
  paymentVchrShowMtTblFlg1: boolean = false;

  toggle(flag) {


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

  displayAddFrItemView(params, index) {
    this.data.forEach((d: ItemTableData) => this.addNewItemRow(index, d, false));
    this.updateView();
  }

  getItemList1(value: {}): import("rxjs").ObservableInput<{}> {
    throw new Error("Method not implemented.");
  }

  getItemListByCode(itemCode): Observable<any> {
    return this.itemService.getItemList1(itemCode)
  }

  displayItem(value): string | undefined {
    return value ? value.item_code : undefined
  }

  filterItemsList(ind) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[ind] as FormGroup;

    let val = this.formGroup.controls.cmbItem.value
    this.filteredItem[ind] = this.itemLists[ind].filter(option => {
      return (
        option.item_name.toLowerCase().includes(val.toLowerCase()) ||
        option.item_code.toLowerCase().includes(val.toLowerCase()) ||
        option.catrefno.toLowerCase().includes(val.toLowerCase()) ||
        option.item_make.toLowerCase().includes(val.toLowerCase())
      )
    })
  }

  searchItemCatRef(event, ind: any) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[ind] as FormGroup;
    if ((this.formGroup.controls.cmbItem.value == null || this.formGroup.controls.cmbItem.value == '')) {
      this.openSnackBar("Please search Item ");
      return false
    } else {

      let itmValue: any
      if (this.formGroup.controls.cmbItem.value.item_code == "" || this.formGroup.controls.cmbItem.value.item_code == undefined) {
        itmValue = this.formGroup.controls.cmbItem.value
      } else {
        itmValue = this.formGroup.controls.cmbItem.value.item_code
      }
      //this.getItemListByCode(itmValue).subscribe(
      this.itemService.getEntryItemList(itmValue,'QUOT').subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemLists[ind] = data.responseData[0].map(item => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp, item.mmx_uom, "", item.it_tariff_code,'',item.cit_phased_out)
            })

            this.filteredItem[ind] = data.responseData[0].map(item => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp, item.mmx_uom, "", item.it_tariff_code,'',item.cit_phased_out)
            })
          }else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109'){
            this.openSnackBar(data.message)
            return false;
          }
          return this.itemLists[ind]
        },
      )
    }
  }

  onItemCodeChange(data, selectedItemObj, ind: any) {
    if (data.isUserInput == false) {
      return
    }
    this.cit_phased_out=selectedItemObj.cit_phased_out
    if(this.checkPhasedOut()){
      return false;
    }
   
    this.objItem[ind] = new ItemModelwithLP(
      selectedItemObj.item_code,
      selectedItemObj.item_name,
      selectedItemObj.catrefno,
      selectedItemObj.item_make,
      selectedItemObj.item_price,
      selectedItemObj.mmx_uom,
      "",
      selectedItemObj.it_tariff_code
    )

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[ind] as FormGroup;

    if (selectedItemObj.it_tariff_code == "-" || selectedItemObj.it_tariff_code.length < 6) {
      this.openSnackBar("HSN no is invalid for selected item code")
      this.formGroup.controls.txtProductCode.setValue("");
      this.formGroup.controls.txtCatRef.setValue("");
      this.formGroup.controls.cmbMake.setValue("")
      this.formGroup.controls.cmbUom.setValue("")
      this.formGroup.controls.txtListPrice.setValue("");
      this.itemLp[ind] = ""
      return false;
    }
    else {
      this.getItemMakeList(ind)

      this.formGroup.controls.txtProductCode.setValue(selectedItemObj.item_name);
      this.formGroup.controls.txtCatRef.setValue(selectedItemObj.catrefno);
      this.formGroup.controls.cmbMake.setValue(selectedItemObj.item_make);
      this.formGroup.controls.txtListPrice.setValue(selectedItemObj.item_price);
      this.itemLp[ind] = selectedItemObj.item_price
      if(this.formGroup.controls.cmbMake.value!='' && this.formGroup.controls.cmbMake.value!=null &&
        this.formGroup.controls.cmbMake!=undefined){
        this.showItmHistryIconFlg = true;
      }

      this.getUomList(selectedItemObj.item_make, selectedItemObj.item_code, ind, selectedItemObj.mmx_uom,
        selectedItemObj.item_price)
    }

  }


  getUomList(make_code, item_code, ind, mmx_uom, item_price) {
    // debugger
    this.payload = {
      item_code: item_code, make: make_code,
    }

    let selectedObj;
    this.utilityServiceAvaxPro.getUomList(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.uomLists[ind] = data.responseData[0].map(item => {
            if (mmx_uom == item.uom_code) {
              selectedObj = new UomModelWithCnv(item.uom_code, item.uom_desc, item.cnv_conversion_factor)
              return selectedObj;
            }
            else
              return new UomModelWithCnv(item.uom_code, item.uom_desc, item.cnv_conversion_factor)

          })

          this.getrows = this.form.get('arrayAddItem') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[ind] as FormGroup;
          this.formGroup.get('cmbUom').setValue(selectedObj);
          if (selectedObj == null || selectedObj == undefined) {

          } else {
            let cnv_factor = selectedObj.cnv_conversion_factor
            let lp = Number(item_price * cnv_factor).toFixed(2);
            this.formGroup.controls.txtListPrice.setValue(lp);
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  setLp(index, row) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;
    let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor;

    if (this.formGroup.controls.cmbItem.value.item_price == undefined || this.formGroup.controls.cmbItem.value.item_price == '' ||
      this.formGroup.controls.cmbItem.value.item_price == null) {
      let lp = Number(row.original_lp * cnv_factor).toFixed(2);
      this.itemLp[index] = lp
      this.formGroup.controls.txtListPrice.setValue(lp);
    } else {
      let lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
      this.itemLp[index] = lp
      this.formGroup.controls.txtListPrice.setValue(lp);
    }
  }



  openSnackBar(message) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: message,
    //   duration: 2000,
    // });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }

  get arrayAddItem() {
    return this.form.get('arrayAddItem') as FormArray;
  }

  addNewItemRow(index?: number, d?: ItemTableData, noUpdate?: boolean) {

    const row = this.formBuilder.group({
      cmbItem: [''],
      txtProductCode: [''],
      txtCatRef: [''],
      cmbMake: [''],
      cmbUom: [''],
      txtQty: [''],
      txtListPrice: [''],
      txtInputRate: [''],
      txtAmt: [''],
      txtCalcDesc: [''],
      chkItem: [''],
      cmbLayout:['']
    });
    this.itemLp[index] = ''
    this.rows.push(row);
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  loadEditItem(i, rowDraft, arrayAddItem) {
    rowDraft.showEditIcon = true;
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;

    this.getItemMakeList(i);

    this.formGroup.controls.txtQty.setValue(rowDraft.qty);
    this.formGroup.controls.txtInputRate.setValue(rowDraft.rate);
    this.formGroup.controls.cmbMake.setValue(rowDraft.make);
    this.formGroup.controls.txtListPrice.setValue(rowDraft.lp);
    //this.getUomList(rowDraft.make, rowDraft.item_code, i, rowDraft.uom, rowDraft.original_lp);
    this.getUomList(rowDraft.make, rowDraft.item_code, i, rowDraft.uom, rowDraft.lp);
    
  }


  displayAddedItemsForCompleteQuot(draftNo, callfrom) {

    let index1 = 0;
    this.quotationService.getAddedItemDetailsList(draftNo, callfrom).subscribe(
      data => {

        this.dataSource = new BehaviorSubject<AbstractControl[]>([]);


        this.tableData = data.responseData[0].map(item => {
          this.data.forEach((d: ItemTableData) => this.addNewItemRow(index1++, d, false));
          return new AddedItemModel(
            item.qtd_executed_qty,
            item.qtd_saleable_stock,
            item.qtd_deleted_flg,
            item.qtd_draft_no,
            item.item_code,
            item.serial_no,
            item.cal_flg,
            item.lp,
            item.original_lp,
            item.it_prod_code,
            item.make,
            item.mk_desc,
            item.uom,
            item.um_short_desc,
            item.rate,
            item.amt,
            item.qty,
            item.cat_refno,
            item.calratedesc,
            item.src_type,
            item.chk_flag,
            true, //readonly
            false, //edit
            false, // add button
            '',//qtd_item_note
            '',//qtd_variation_code
            '',//qtd_variation_len
            item.delremarks,
            item.prjd_layout_type,
            item.prjd_serial
          )
        });

        //this.getItemMakeList(index1);

        this.setArrayItemValues(index1, this.tableData);
        this.updateView();

        if (this.isForViewQuotation == 'N' || this.isForViewQuotation == undefined) {
          this.tableData[this.tableData.length] = new AddedItemModel(
            '', '',
            'N',
            '', '', '', '', '',
            '', '', '', '', '',
            '', '', '', '', '',
            '', '',
            'N', //item.chk_flag,
            false, //readonly 
            true,  //edit
            true
          );
          //this.getItmList(index1);
          //this.updateView();
        }


        this.dataSource = this.tableData;

      })
  }

  setArrayItemValues(index, item) {
    for (var i = 0; i < item.length; i++) {

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[i] as FormGroup;

      this.arrayAddItem[i] = this.formGroup.controls.cmbItem.setValue(new ItemModelwithLP(
        item.item_code, item.it_prod_code, item.cat_refno,
        item.make, item.lp, "", ""//it_tariff_code
      ));

      this.arrayAddItem[i] = this.formGroup.controls.txtProductCode.setValue(item.it_prod_code)
      this.arrayAddItem[i] = this.formGroup.controls.txtCatRef.setValue(item.cat_refno)
      this.arrayAddItem[i] = this.formGroup.controls.cmbMake.setValue(item.make)

      this.arrayAddItem[i] = this.formGroup.controls.cmbUom.setValue(
        new UomModelWithCnv(item.uom, item.um_short_desc, '1')
      )

      this.arrayAddItem[i] = this.formGroup.controls.txtQty.setValue(item.qty)
      this.arrayAddItem[i] = this.formGroup.controls.txtListPrice.setValue(item.lp)
      this.arrayAddItem[i] = this.formGroup.controls.txtInputRate.setValue(item.rate)
      this.arrayAddItem[i] = this.formGroup.controls.txtAmt.setValue(item.amt)
      this.arrayAddItem[i] = this.formGroup.controls.txtCalcDesc.setValue(item.calratedesc)
      this.arrayAddItem[i] = this.formGroup.controls.chkItem.setValue('')

    }
  }

  addItemRow(i: number, itemData: any, d?: ItemTableData, noUpdate?: boolean) {

    this.showItmHistryIconFlg = false;

    this.objBulkData = null;
    this.bulkAdditionFromExcelFlg = false;

    if (this.arrayAddItem.value[i] != undefined && this.arrayAddItem.value[i] != "") {

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[i] as FormGroup;
      if (this.formGroup.controls.cmbItem.value.item_code == undefined) {
        this.openSnackBar("Please select Item Code.");
        return;
      }

      if (this.formGroup.controls.cmbMake.value == '' || this.formGroup.controls.cmbMake.value == null || this.formGroup.controls.cmbMake.value == undefined) {
        this.openSnackBar("PLease select Make");
        return false;
      }

      if (this.formGroup.controls.txtQty.value.trim() == '') {
        this.openSnackBar("Please enter QTY.");
        return;
      }
      else if (isNaN(this.formGroup.controls.txtQty.value)) {
        this.openSnackBar("Please enter valid QTY.");
        return;
      }

      if (this.formGroup.controls.cmbUom.value == undefined || this.formGroup.controls.cmbUom.value == undefined) {
        this.openSnackBar("Please select UOM.");
        return;
      }

      if (this.formGroup.controls.txtListPrice.value == '') {
        this.openSnackBar('Please Enter LIST PRICE.');
        return false;
      }
      if (Number(this.formGroup.controls.txtListPrice.value) < 0) {
        this.openSnackBar('Lp can not be less than 0');
        return false;
      }

      if (this.formGroup.controls.txtInputRate.value == '' || this.formGroup.controls.txtInputRate.value == null ||
        this.formGroup.controls.txtInputRate.value == undefined) { } else {
        if (isNaN(this.formGroup.controls.txtInputRate.value)) {
          this.openSnackBar("Please enter valid RATE.");
          return;
        }


        if (Number(this.formGroup.controls.txtInputRate.value) == 0) {
          this.openSnackBar("RATE Cant not be Zero");
          return;
        }

      }

      if (Number(this.formGroup.controls.txtListPrice.value) == 0) {
        this.formGroup.controls.txtListPrice.setValue(this.formGroup.controls.txtInputRate.value)
      }

      if (this.formGroup.controls.txtInputRate.value != '' && this.formGroup.controls.txtListPrice.value != '') {
        if (Number(this.formGroup.controls.txtInputRate.value) > Number(this.formGroup.controls.txtListPrice.value)) {
          this.openSnackBar(" Rate Should be less than or equal to lp");
          return false;
        }
      }
      if(this.checkPhasedOut()){
        return false;
      }
      let params = {
        ITEM_CODE: this.formGroup.controls.cmbItem.value.item_code,
        MAKE_CODE: this.formGroup.controls.cmbMake.value,
        QTY: this.formGroup.controls.txtQty.value,
        UOM: this.formGroup.controls.cmbUom.value.uom_code,
        COMPANY_CODE: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      }
      let param = { common_row: params }
       //check item validation     
       this.utilityServiceAvaxPro.checkItemCategoryAndQty(param).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
  
            if (data.responseData[0].length > 0) {
              //let lstItemRespnse = data.responseData[0][0]
              let msg="";
  
              data.responseData[0].forEach(element => {
                msg+=element+" \n"
              });
              const dialogConfig = new MatDialogConfig()
              dialogConfig.width = '350px'
              dialogConfig.disableClose = true
              dialogConfig.autoFocus = true
              dialogConfig.data = {
                //message: "AO No : " + lstItemRespnse.ao_ao_no + " already made for same Item/Make in last 15 days.Are you sure,you want to add item?"
                message:msg+" \n Are you sure,you want to add item?"
              }
              const dialogRef = this.dialog.open(CommonConfirmationDialogComponent, dialogConfig)
              dialogRef.afterClosed().subscribe(item => {
                if (!item == true) {
                  if (this.formGroup.controls.txtInputRate.value != '' && Number(this.formGroup.controls.txtInputRate.value) > 0) {
                    this.addItem(i, 'R');
                  }
                  else {
                    let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor;
                    let cnv_lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
                    //let cnv_lp = Number(this.formGroup.controls.txtListPrice.value * cnv_factor).toFixed(2);
                    this.openItemCalc(i, this.formGroup.controls.cmbItem.value.item_code,
                      this.formGroup.controls.cmbItem.value.item_make, 'A', null, cnv_lp)
                  }
                } else {
                  //no >cancel > no next proccess to perform
                }
              })
            }
            else {
              if (this.formGroup.controls.txtInputRate.value != '' && Number(this.formGroup.controls.txtInputRate.value) > 0) {
                this.addItem(i, 'R');
              }
              else {
                let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor;
                let cnv_lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
                //let cnv_lp = Number(this.formGroup.controls.txtListPrice.value * cnv_factor).toFixed(2);
                this.openItemCalc(i, this.formGroup.controls.cmbItem.value.item_code,
                  this.formGroup.controls.cmbItem.value.item_make, 'A', null, cnv_lp)
              }
            }
          }
          else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            this.openSnackBar(data.message);     
            return false;     
          }
        }
        )



      
    }
  }

  openItemCalc(index, item_code, make, fromFlg, rowDraft, converted_lp) {
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
      title: ConstantsServiceAvaxPro.ITEM_CALC_TITLE,
      itemCalcFormulaId: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC,
      itemCalcFormulaDesc: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC_DESC,
      itemCode: item_code,
      makeCode: make,
      lp: converted_lp,
    }

    if (fromFlg == 'U') {
      dialogConfig.data.siscon_code = atob(sessionStorage.getItem(btoa('usr_of_siscon')))
      dialogConfig.data.branch_code = atob(sessionStorage.getItem(btoa('usr_of_branch')))
      dialogConfig.data.doc_no = this.objDraftHeader.qt_quot_no
      dialogConfig.data.doc_serial_no = rowDraft.serial_no
      dialogConfig.data.flg_draft = 'N'
    }

    const dialogRef = this.dialog.open(ItemCalcComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(item => {
      if (item !== 'close') {
        this.itemCalcService.currentMessage.subscribe(message => this.itemCalcData = message);
        if (fromFlg == 'U') {
          this.editItem(index, rowDraft, 'F');
        } else {
          this.addItem(index, 'F');
        }
      }
    })
  }

  lstProjectDtl:any=[]
  getProjectDtl() {
    
    let payload = {
      common_row:{siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon'))),branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch'))),prj_no:this.objDraftHeader.qt_project_code}
    }
    this.utilityServiceAvaxPro.getProjectDtl(payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstProjectDtl = data.responseData[0]
        }
      })
  }
  addItem(index, flgCalc, flgBulkAdd?) {


    let dbl_lp = 0;
    let dbl_original_lp = 0;
    let qtd_rate = 0;
    let qtd_item_code = ''
    let qtd_make = ''
    let qtd_qty = ''
    let qtd_uom = ''


    this.itemCalcDataInArray = []


    if (flgBulkAdd == 'Y') {
      let objItemCalc = new DefaultItemCalc().getDefaultItemCalc('', '')
      this.itemCalcDataInArray.push(objItemCalc);
    } else {

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      dbl_original_lp = this.formGroup.controls.cmbItem.value.item_price;
      dbl_lp = 0;
      dbl_original_lp = this.itemLp[index]

      if (flgCalc == 'F') {
        this.itemCalcDataInArray.push(this.itemCalcData);
        if (dbl_original_lp == 0) {
          dbl_original_lp = this.itemCalcData.amtList_Price;
        }
        dbl_lp = this.itemCalcData.amtList_Price;
      }
      else {

        if (dbl_original_lp == 0) {
          dbl_original_lp = this.formGroup.controls.txtListPrice.value;
        }

        dbl_lp = this.formGroup.controls.txtInputRate.value //this.formGroup.controls.txtInputRate.value
        dbl_original_lp = Number((dbl_original_lp * this.formGroup.controls.cmbUom.value.cnv_conversion_factor).toFixed(2));

        let objItemCalc = new DefaultItemCalc().getDefaultItemCalc(dbl_original_lp, dbl_lp)
        dbl_lp = dbl_original_lp
        dbl_original_lp = this.formGroup.controls.cmbItem.value.item_price;
        if(dbl_original_lp==null || Number(dbl_original_lp)==0){
          dbl_original_lp = this.itemLp[index]
        }
        this.itemCalcDataInArray.push(objItemCalc);
      }

      if (flgCalc == "R") {
        qtd_rate = this.formGroup.controls.txtInputRate.value;
      } else {
        qtd_rate = dbl_lp;
      }
    }

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
        usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },

      itemCalcData: this.itemCalcDataInArray,

      bulk_data: this.objBulkData,
      bulkAdditionFromExcelFlg: this.bulkAdditionFromExcelFlg,

      qtd_cal_flg: flgBulkAdd == 'Y' ? 'F' : flgCalc,
      qtd_doc_type_code: "QOT",
      qtd_disc_flg: "P",
      qtd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      qtd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qtd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qtd_deleted_flg: "N",
      qtd_item_code: this.formGroup.controls.cmbItem.value.item_code,
      qtd_make: this.formGroup.controls.cmbItem.value.item_make,
      qtd_uom: this.formGroup.controls.cmbUom.value.uom_code,
      qtd_quantity: this.formGroup.controls.txtQty.value,
      qtd_rate: qtd_rate, //this.formGroup.controls.txtInputRate.value, //dbl_lp,
      qtd_lp: dbl_lp,
      qtd_orig_lp: dbl_original_lp,
      qtd_cal_rate_desc: '',

      qtd_party_item_code: "",
      qtd_item_note: "",
      qtd_item_remark: "",
      qtd_itemsch_id: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC,

      //
      qt_draft_no: this.objDraftHeader.qt_draft_no,
      qtd_draft_no: this.objDraftHeader.qt_draft_no,

      callFrom: 'COMPLETE',
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qtd_quot_no: this.objDraftHeader.qt_quot_no,
      qtd_project_serial:this.formGroup.controls.cmbLayout.value
    }

    this.quotationService.addItemToQoutDraft(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar("Item Added Successfully.");
          let draftResponse = data.responseData[0][0];
          this.stateData['draft'] = true
          sessionStorage.removeItem('data')
          sessionStorage.setItem('data', JSON.stringify(this.stateData))
          this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');

          let temp = JSON.stringify(this.docCalcDataInput);
          this.docCalcDataInput = null;
          this.docCalcDataInput = JSON.parse(temp);
          this.itemLists = []
          //  this.docCalcDataInput = this.objCommonSevice.refreshDocCalc(jsonString, this.docCalcDataInput);
        }else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
      },
      error => {
        console.log(error)
      })
  }

  updateItemRow(index, rowDraft) {

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;


    if (this.formGroup.controls.cmbMake.value == '' || this.formGroup.controls.cmbMake.value == null || this.formGroup.controls.cmbMake.value == undefined) {
      this.openSnackBar("PLease select Make");
      return false;
    }

    //if (this.formGroup.controls.cmbUom.value.uom_desc == undefined) {
    if (this.formGroup.controls.cmbUom.value == undefined) {
      this.openSnackBar("Please select UOM.");
      return;
    }
    if (this.formGroup.controls.txtQty.value == '') {
      this.openSnackBar("Please enter QTY.");
      return;
    }
    else if (isNaN(this.formGroup.controls.txtQty.value)) {
      this.openSnackBar("Please enter valid QTY.");
      return;
    }

    if (this.formGroup.controls.txtListPrice.value == '') {
      this.openSnackBar("Please enter LP.");
      return;
    }
    else if (isNaN(this.formGroup.controls.txtListPrice.value)) {
      this.openSnackBar("Please enter valid LP.");
      return;
    }
    if (Number(this.formGroup.controls.txtListPrice.value) < 0) {
      this.openSnackBar('Lp can not be less than 0');
      return false;
    }

    if (isNaN(this.formGroup.controls.txtInputRate.value)) {
      this.openSnackBar("Please enter valid RATE.");
      return;
    }

    if (this.formGroup.controls.txtInputRate.value != '' || this.formGroup.controls.txtInputRate.value != undefined) {
      if (isNaN(this.formGroup.controls.txtInputRate.value)) {
        this.openSnackBar("Please enter valid RATE.");
        return;
      }
    }

    if (Number(this.formGroup.controls.txtListPrice.value) == 0) {
      this.formGroup.controls.txtListPrice.setValue(this.formGroup.controls.txtInputRate.value)
    }

    if (this.formGroup.controls.txtInputRate.value != '' && this.formGroup.controls.txtListPrice.value != '') {
      if (Number(this.formGroup.controls.txtInputRate.value) > Number(this.formGroup.controls.txtListPrice.value)) {
        this.openSnackBar(" Rate Should be less than or equal to lp");
        return false;
      }
    }

    if (this.formGroup.controls.txtInputRate.value != '' && Number(this.formGroup.controls.txtInputRate.value) > 0) {
      this.editItem(index, rowDraft, 'R');
    }
    else {

      let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor;
      let cnv_lp = Number(rowDraft.original_lp * cnv_factor).toFixed(2);
      //let cnv_lp = Number(this.formGroup.controls.txtListPrice.value * cnv_factor).toFixed(2);
      this.openItemCalc(index, rowDraft.item_code, rowDraft.make, 'U', rowDraft, cnv_lp);

    }
  }

  editItem(index, rowDraft, flgCalc) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    this.itemCalcDataInArray = []
    let dbl_original_lp = 0;
    let dbl_lp = 0;
    let qtd_rate = 0;

    if (flgCalc == 'F') {
      dbl_original_lp = this.itemCalcData.amtList_Price;
      this.itemCalcDataInArray.push(this.itemCalcData);
      dbl_lp = this.itemCalcData.amtList_Price
      if (dbl_original_lp == 0) {
        dbl_original_lp = rowDraft.lp
      }
      qtd_rate = dbl_lp;
    }
    else {
      dbl_original_lp = Number((rowDraft.original_lp * this.formGroup.controls.cmbUom.value.cnv_conversion_factor).toFixed(2));
      dbl_lp = this.formGroup.controls.txtListPrice.value //this.formGroup.controls.txtInputRate.value
      let objItemCalc = new DefaultItemCalc().getDefaultItemCalc(dbl_original_lp, dbl_lp)
      //dbl_lp = dbl_original_lp
      dbl_original_lp = rowDraft.original_lp;
      qtd_rate = this.formGroup.controls.txtInputRate.value;
      this.itemCalcDataInArray.push(objItemCalc);
    }

    rowDraft.showEditIcon = true;
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
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),

      qtd_serial_no: rowDraft.serial_no,
      qtd_draft_no: rowDraft.qtd_draft_no,
      qtd_item_code: rowDraft.item_code,
      qtd_make: rowDraft.make,
      qtd_uom: this.formGroup.controls.cmbUom.value.uom_code,
      qtd_quantity: this.formGroup.controls.txtQty.value,

      itemCalcData: this.itemCalcDataInArray,
      qtd_cal_flg: flgCalc,
      qtd_lp: dbl_lp,
      qtd_rate: qtd_rate,
      qtd_cal_rate_desc: '',
      qtd_orig_lp: dbl_original_lp,
      qtd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      callFrom: 'COMPLETE',
      qtd_project_serial:this.formGroup.controls.cmbLayout.value
    }

    if (this.isFromPendingDraft == 'N') {
      this.payload['qt_quot_no'] = this.objDraftHeader.qt_quot_no;
      this.payload['qtd_quot_no'] = this.objDraftHeader.qt_quot_no;
    }

    this.quotationService.editItem(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar(data.responseData[0]);
          rowDraft.showEditIcon = false;
          this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
          let temp = JSON.stringify(this.docCalcDataInput);
          this.docCalcDataInput = null;
          this.docCalcDataInput = JSON.parse(temp);
        }
      })
  }


  deleteItemRemark=''
  deleteItemRow(i: number, itemData: any, d?: ItemTableData, noUpdate?: boolean) {
    if (this.isFromPendingDraft == 'Y') {
      this.deleteItemRemark=''
      this.deleteItem(i,itemData,d,noUpdate)
    }
    else{
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '70%'
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.data = {
        title: 'DELETE ITEM',
        headerTable: {
          fromFlag: 'QT',
          action:'DELETE_ITEM',
        },
      }
      const dialogRef = this.dialog.open(ItemRemarksUpdateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(item => {
        if (item !== true) {
          this.deleteItemRemark =item.remark
          this.deleteItem(i,itemData,d,noUpdate)
        }
      })
    }
  }

  deleteItem(i: number, itemData: any, d?: ItemTableData, noUpdate?: boolean) {
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

      callFrom: this.isFromPendingDraft == 'Y' ? 'Draft' : 'COMPLETE',
      itemCalcData: this.itemCalcDataInArray,
      qtd_serial_no: itemData.serial_no,
      qtd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      qtd_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qtd_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qtd_draft_no: this.objDraftHeader.qt_draft_no,
      qt_draft_no: this.objDraftHeader.qt_draft_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qtd_item_delete_remark:this.deleteItemRemark
    }

    if (this.isFromPendingDraft == 'N') {
      this.payload['qt_quot_no'] = this.objDraftHeader.qt_quot_no;
      this.payload['qtd_quot_no'] = this.objDraftHeader.qt_quot_no;
    }

    this.quotationService.deleteDraftItem(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
          let temp = JSON.stringify(this.docCalcDataInput);
          this.docCalcDataInput = null;
          this.docCalcDataInput = JSON.parse(temp);

        }
      },
      error => {
        console.log(error)
      })


  }



  editOtherItemInfo(index, row) {
    // alert("b")
    const dialogRef = this.dialog.open(QuotItemOtherInfoComponent, {
      data: {
        ao_item: row,
        callFrom: this.objDraftHeader.callFrom,
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
      // if (this.isFromPendingDraft == 'N') {
      //   this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');

      // } else {
      //   this.displayAddedItems(this.objDraftHeader.qt_draft_no, this.objDraftHeader.callFrom);
      // }
      this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
      let temp = JSON.stringify(this.docCalcDataInput);
      this.docCalcDataInput = null;
      this.docCalcDataInput = JSON.parse(temp);

    });

  }

  setCalcDesc(input_rate, index, row) {
    if (input_rate == '') {
      input_rate = 0
      return
    }

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor


    if (this.formGroup.controls.cmbItem.value.item_price == undefined ||
      this.formGroup.controls.cmbItem.value.item_price == null ||
      this.formGroup.controls.cmbItem.value.item_price == '') {
      let lp = Number(row.original_lp * cnv_factor).toFixed(2);
      if (Number(lp) < Number(input_rate)) {
        this.formGroup.controls.txtCalcDesc.setValue('');
      }
      else {
        let calcDesc = lp + ' - ' + ((Number(lp) - Number(input_rate)) / Number(lp) * 100).toFixed(2) + '% = ' + input_rate;
        this.formGroup.controls.txtCalcDesc.setValue(calcDesc);
      }
    } else {
      let lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
      
      if (Number(lp) < Number(input_rate)) {
        this.formGroup.controls.txtCalcDesc.setValue('');
      }
      else {
        let calcDesc = lp + ' - ' + ((Number(lp) - Number(input_rate)) / Number(lp) * 100).toFixed(2) + '% = ' + input_rate;
        this.formGroup.controls.txtCalcDesc.setValue(calcDesc);
      }
    }
  }


  itemOtherInfoDetails(row) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '700px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: 'ITEM OTHER INFO DETAILS',
      /* ITEM CODE		:111023
PARTY ITEM		:-
ITEM NOTE		:-
ITEM REMARKS		:-
TEM VARIATION		:-
ITEM VARIATION LEN	 */
      headerTable: {
        ITEM_CODE: row.item_code,
        PARTY_ITEM: row.qtd_party_item_code,
        ITEM_NOTE: row.qtd_item_note,
        ITEM_VARIATION: row.qtd_variation_code,
        ITEM_VARIATION_LEN: row.qtd_variation_len,
        ITEM_REMARKS: row.qtd_item_remark,
        module_id: 'QUOT',
      },
    }
    const dialogRef = this.dialog.open(ItemOtherInfoDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
  }


  openShowItemHistoryDetails(row, index) {
    let json = {}
    if (row == 'N') {

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;
      json['item_code'] = this.formGroup.controls.cmbItem.value.item_code;
      json['make'] = this.formGroup.controls.cmbMake.value;

    } else {
      json = row;
    }

    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '540px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Item Details History',
      moduleId: "QOT",
      itemCode: json['item_code'],
      make: json['make'],
      doc_cust_code: this.objDraftHeader.qt_cust_code
    }
    const dialogRef = this.dialog.open(ItemDetailHistoryComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {

    })
  }




  modifyDocCalc() {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '55%',
    dialogConfig.minWidth = '55%',
    dialogConfig.height = '90%',
    dialogConfig.minHeight = '90%',
    dialogConfig.maxWidth = '95%',
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data =
    {
      id: 1,
      title: ConstantsServiceAvaxPro.DOC_CALC_TITLE,
      docCalcId: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
      docCalcFormulaDesc: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC_DESC,
      tax_type: '', //this.objDraftHeader.qt_tax_type_code,
      grossAmt: this.objDraftHeader.qt_gross_amt,
      docNo: this.objDraftHeader.qt_quot_no,
      partyCode: this.objDraftHeader.qt_cust_code,
      branchCode: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      sisconCode: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      callFrom: "update",
      moduleId: "Q"
    }

    const dialogRef = this.dialog.open(DocCalcComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(item => {

      this.docCalcService.currentMessage.subscribe(message => this.docCalcData = message);

      this.docCalcDataInArray = null;
      this.docCalcDataInArray = [];
      this.docCalcDataInArray.push(this.docCalcData);
      let jsonString =
      {
        docSchId: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
        docSchemeId: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC,
        docCalcFormulaDesc: ConstantsServiceAvaxPro.DEFAULT_DOC_CALC_DESC,
        docCalcData: this.docCalcDataInArray,
        serviceName: "updateDocumentCalc",
        docAmount: this.objDraftHeader.qt_gross_amt,
        docNo: this.objDraftHeader.qt_quot_no,
        docType: "QOT",
        igstFlag: this.objDraftHeader.igstFlag,
        transactionType: "modify",
        moduleId: "Q",
        //taxCode: this.docCalcDataInput.qt_tax_type_code,
        draftFlg: 'N',
        taxCode: this.objDraftHeader.qt_tax_type_code,
        flgSpecialTax: this.objDraftHeader.qt_spl_tax_flg,
        specialTaxCode: this.objDraftHeader.qt_tax_type_code,
        userInformationDto:
        {
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
          usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
          usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
          usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
        }
      }
      let jsonObj = JSON.parse(JSON.stringify(jsonString))

      this.enteryService.commonUpdateSerice(jsonObj).subscribe
        (
          data => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.docCalcDataInput = null;
              this.docCalcDataInput = JSON.parse(JSON.stringify(jsonString))
            }
          })
    })

  }


  docHeaderViewDataRow: object = {}
  docHeaderViewData: any


  modifyHeader(headerData) {
    /* width:'80%',
    minWidth :'75%', 
    height:'80%',
    maxHeight:'200vh', */
    const dialogConfig = new MatDialogConfig()
    /* dialogConfig.width = '950px'
    dialogConfig.width = '950px'
     */
    dialogConfig.width = '55%',
    dialogConfig.minWidth = '55%',
    dialogConfig.height = '90%',
    dialogConfig.minHeight = '90%',
    dialogConfig.maxWidth = '95%',
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Header Modification',
      qt_quot_no: this.stateData.qt_quot_no,
    }

    const dialogRef = this.dialog.open(ModifyHeaderPageComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      //this.loadCompleteQuotData(this.stateData.qt_quot_no, 'COMPLETE');

      if (item == 'Y') {
        let temp = JSON.stringify(this.docCalcDataInput);
        this.docCalcDataInput = null;
        this.docCalcDataInput = JSON.parse(temp);
        //this.loadCompleteQuotData(this.stateData.qt_quot_no, 'COMPLETE');
      }

    })



  }



  modifyOtherInfo(headerData) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '90%',
    dialogConfig.minWidth = '75%',
    dialogConfig.height = '90%',
    dialogConfig.minHeight = '90%',
    dialogConfig.maxWidth = '95%',
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'OTHER INFO MODIFICATION',
      callFrom: "COMPLETE",
      isFromDraft: "N",
      stateData: this.stateData,
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_cust_code: this.objDraftHeader.qt_cust_code,
      showView: "itemDisplay"
    }
    const dialogRef = this.dialog.open(ModifyOtherInfoComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
     
    })
  }


  getQuotRevisionList() {
    this.quotRevisionShowFlag = true;
    this.quotRevisionFlag = false;
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
    }

    this.quotationService.getQuotRevisionList(this.payload).subscribe
      (
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            if (data.responseData[0].length == 0) {
              this.openSnackBar('No Data Found !');
            } else {
              this.dataSourceQuotRevision = data.responseData[0];
            }
          }
        })
  }

  addNewRevision() {

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),

    }

    this.quotationService.addNewQuotRevision(this.payload).subscribe
      (
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.dataSourceQuotRevision = data.responseData[0];
            this.openSnackBar(" New Quotation Revision Generated Successfully .Quot Rev No = " + data.responseData[0]);
          }
        })

  }

  revertQuotRevision() {

    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },

      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qt_revision_no: '11',
    }

    this.quotationService.revertQuotRevision(this.payload).subscribe
      (
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            if (data.responseData[0].length == 0) {
              this.openSnackBar('No Data Found !');
            } else {
              this.dataSourceQuotRevision = data.responseData[0];
              if (this.dataSourceQuotRevision == "Error Occurred.") {
                this.openSnackBar("Error while reverting quotation revision")
                return false;
              } else {
                this.openSnackBar("quotation Reverted successfully")
                return false;
              }
            }
          }
        })
  }

  viewQuotRevision(row) {
    window.open('session/entry/quotation/newquotitementry', '_blank');
  }


  showExeQtyDtls(row) {
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

  getFileDescription() {
    this.utilityServiceAvaxPro.getFileDescription().subscribe(
      data => {

        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.fileDescriptionLists = data.responseData[0].map(item => {
            return new FileDescriptionModel(item.fd_code, item.fd_description)
          })
        }
        return this.fileDescriptionLists
      },
      error => {
        console.log(error)
      }
    )

  }


  showGenerateUploadDiv() {
    this.showGenerateUploadFlg = !this.showGenerateUploadFlg;
  }

  /* showFileUploadDiv() {
    this.showFileUploadFlg = !this.showFileUploadFlg;
  } */


  enableTextOtherDesc(event) {
    if (event.source.value.fd_code == "P") {
      this.fileOtherInfo = !this.fileOtherInfo;
    }
  }



  generateExcel() {
    this.payload = {
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      fileName: 'QuotationFileView.xls',
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

    const fileExt = 'xls'
    const fileName = 'QuotationFileView.xls'
    this.quotationService.downloadQuotConvertToExcelFile(
      {
        fileName: fileName
      },
      this.payload
    ).subscribe(data => saveAs(new Blob([data], { type: MimeType[fileExt] }), fileName))


  }


  userId(formData: FormData, userId: any) {
    throw new Error("Method not implemented.");
  }

  onFileChange1(fileInput1: any) {
    this.fileData1 = <File>fileInput1.target.files[0];
  }


  userId1(formData: FormData, userId1: any) {
    throw new Error("Method not implemented.");
  }

  uploadQuotExcelFile() {

    if (this.fileData1 == undefined) {
      this.openSnackBar("Please select File.");
      return false;
    }


    const formData = new FormData();
    formData.append('usr_of_branch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('usr_of_siscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('usr_company_code', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('usr_userid', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('usr_state_code', atob(sessionStorage.getItem(btoa('usr_state_code'))));
    formData.append('file', this.fileData1);

    this.quotationService.uploadQuotExcelFile(formData, this.userId)
      .toPromise()
      .then(data => {

        /* this.errorMsgDiv = true;
        if (data.responseData[0].INVALID == 'Y') {
          this.invalidData = data.responseData[0].msg;
        } else if (data.responseData[0].RES == 'Y') {
          this.openSnackBar(data.responseData[0].msg);
          this.errorMsgDiv = false;
          this.invalidData="";
          this.form.reset();
        } else {
          this.invalidData = data.responseData[0].msg;
        }
   */
        this.openSnackBar("File Uploaded Successfully");

      })
      .catch(err => {
      });



  }

  showTax() {
    this.showFloatingButtons = !this.showFloatingButtons;
  }


  showStockQuery(row: any) {
    this.payload = {
      item_code: row.item_code,
      user_userId: atob(sessionStorage.getItem(btoa('userId'))) + "::" + atob(sessionStorage.getItem(btoa('username')))
    }
    sessionStorage.removeItem("data");
    sessionStorage.setItem("stateData", JSON.stringify(this.payload));
    window.open('session/query/stock-query', '_blank'), { state: this.payload };
  }

  deleteQuotation() {

    this.payload = {
      callFrom: 'COMPLETE',
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qt_remarks: '-',
    }

    this.quotationService.deleteDraft(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData[0] == "Y") {
            this.openSnackBar("Quotation Deleted Successfully.")
            let queryParams = {}
            sessionStorage.removeItem("data");
            sessionStorage.setItem("stateData", JSON.stringify(queryParams));
            this.router.navigate(['session/entry/quotation'], { state: queryParams });
          } else {
            this.openSnackBar("Quotation Not Deleted.")
          }
        }
      },
      error => {
        console.log(error)
      })

  }

  fetchFileList() {
    let jsonObj =
    {
      docNo: this.objDraftHeader.qt_quot_no,
      userInformationDto:
      {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      }
    }

    this.fileUploadService.fetchFileList(jsonObj).toPromise().then(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.fileList = data.responseData[0];
        }
      }
    ).finally().then(() => {
    }
    )
  }

  viewFileUploadDtls() {
    if (this.shwFileDtls)
      this.shwFileDtls = false;
    else
      this.shwFileDtls = true
  }


  otherDescFlgFun(event) {
    if (event.isUserInput) {
      if (event.source.value.fd_description == 'Others') {
        this.otherDescFlg = true;
      }
      else {
        this.otherDescFlg = false;
      }
    }

  }


  onFileChange(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }


  uploadFile() {
    if (this.form.controls.cmbFileDesc.value.fd_description == undefined) {
      this.openSnackBar('Please select DESCRIPTION.')
      return false
    }

    if (this.otherDescFlg) {
      if (this.form.controls.txtFileUploadDesc.value == "") {
        this.openSnackBar('Please select OTHER DESCRIPTION.')
        return false
      }
    }
    else {
      this.form.controls.txtFileUploadDesc.setValue(this.form.controls.cmbFileDesc.value.fd_description)
    }
    if (this.fileData == null) {
      this.openSnackBar(" Select File To Upload");
      return false;
    }

    const formData = new FormData();

    formData.append('docFile', this.fileData);
    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docNo', this.objDraftHeader.qt_quot_no);
    formData.append('docType', "QUOT");
    formData.append('docFileDesc', this.form.get("txtFileUploadDesc").value);
    formData.append('docFileName', this.fileData.name);
    this.form.controls.txtFileUploadDesc.setValue("")
    //console.log('file data -- main party query ---',this.fileData);

    this.fileUploadService.uploadFile(formData).subscribe
      (
        (res) => {
          this.uploadResponse = res
          this.fileData = null;

          this.form.get("txtFileUploadDesc").setValue("");
          this.fileUploader.nativeElement.value = null;

          this.openSnackBar("" + res.message);
          this.fetchFileList();

        },
        (err) => {

          this.fileUploader.nativeElement.value = null;
          this.form.get("txtFileUploadDesc").setValue("");
          this.openSnackBar("Error In File Upload. ! ");
          this.error = err;
          this.fileData = null;

        }
      );
  }


  downloadFile() {

    if (this.form.get("cmbDocList").value == null ||
      this.form.get("cmbDocList").value == '' ||
      this.form.get("cmbDocList").value == undefined) {
      this.openSnackBar("please select file from dropdown");
      return false;
    }

    const formData = new FormData();

    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docNo', this.objDraftHeader.qt_quot_no);
    formData.append('docType', "QUOT");
    formData.append('docFileName', this.form.get("cmbDocList").value);

    this.fileUploadService.downloadFile(formData)
      .toPromise().then(
        (res) => this.uploadResponse = res,
      ).finally().then
      (() => {
        const blob = new Blob([this.uploadResponse], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, this.form.get("cmbDocList").value);
      }
      )
  }

  openBulkAddition() {
    const dialogRef = this.dialog.open(BulkAdditionComponent, {
      width: '90%',
      minWidth: '90%',
      height: '80%',
      maxHeight: '200vh',
      data: {
        flgDraft: 'Y'
      }
    });

    dialogRef.afterClosed().subscribe((objBulkData: any) => {
      if (objBulkData != undefined) {
        this.objBulkData = objBulkData
        this.addItem(-1, 'F', 'Y')
      }
    });
  }


  openBulkAdditionExcel() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.minWidth = '900px'
    dialogConfig.minHeight = '225px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.hasBackdrop = false,
      dialogConfig.panelClass = 'filter-popup'
    dialogConfig.data =
    {
      id: 1,
      title: 'BULK ADDITION THROUGH EXCEL FILE',
    }

    const dialogRef = this.dialog.open(BulkAdditionThroughExcelComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(item => {

      if (item !== 'close') {
        this.objBulkData = null;
        this.objBulkData = item
        this.bulkAdditionFromExcelFlg = true;
        this.addItem(-1, 'F', 'Y');
      }
    })
  }

  flgChkAll: boolean = false

  tickItem(event, element) {
    if (event.source.checked == true) {
      element.chk_flag = 'Y'
    }
    else {
      element.chk_flag = 'N'
    }

    let total_chk: number = 0;
    this.tableData.forEach(element => {
      if (element.chk_flag == 'Y') {
        total_chk++;
      }
    });

    if (total_chk == this.tableData.length) {
      this.flgChkAll = true
    }
    else {
      this.flgChkAll = false
    }
  }

  tickAllItem(event) {
    this.tableData.forEach(element => {
      if (event.source.checked == true) {
        element.chk_flag = 'Y'
      }
      else {
        element.chk_flag = 'N'
      }
    });
  }

  @ViewChild(ItemCalcComponent) child;
  openItemCalcDialog() {
    let flgSelected: boolean = false
    this.tableData.forEach(element => {
      if (element.chk_flag == 'Y') {
        flgSelected = true;
      }
    });

    if (flgSelected == false) {
      this.openSnackBar('Please select item.');
      return
    }
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
      title: 'Calculator',
      itemCalcFormulaId: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC,
      itemCalcFormulaDesc: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC_DESC,
      itemCode: '',
      makeCode: '',
      lp: 0,
      multiple: true
    }
    const dialogRef = this.dialog.open(ItemCalcComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      this.objDataService.currentMessage.subscribe(message => this.itemCalcData = message);
      this.editMultipleItem();
    })
  }

  editMultipleItem() {
    let index = 0;
    let draft_no = ''
    let selectedItems: any = []

    this.tableData.forEach(rowDraft => {

      if (rowDraft.chk_flag == 'Y') {

        if (rowDraft.item_code == "" || rowDraft.item_code == null || rowDraft.item_code == undefined) {
        } else {

          draft_no = this.objDraftHeader.qt_quot_no

          this.getrows = this.form.get('arrayAddItem') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[index] as FormGroup;

          this.itemCalcDataInArray = []
          let dbl_original_lp = 0;
          let dbl_lp = 0;
          this.itemCalcData.amtList_Price = Number((rowDraft.original_lp * this.formGroup.controls.cmbUom.value.cnv_conversion_factor).toFixed(2));;
          dbl_original_lp = this.itemCalcData.amtList_Price;
          this.itemCalcDataInArray.push(this.itemCalcData);
          dbl_lp = this.itemCalcData.amtList_Price
          dbl_original_lp = rowDraft.original_lp

          rowDraft.flgedit = 'Y'
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
              usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
            },
            qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
            qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
            qtd_serial_no: rowDraft['serial_no'],
            qtd_draft_no: rowDraft['qtd_draft_no'],
            qtd_uom: rowDraft['uom'],
            qtd_quantity: rowDraft['qty'],
            qtd_item_code: rowDraft.item_code,
            qtd_make: rowDraft.make,
            itemCalcData: this.itemCalcDataInArray,
            qtd_cal_flg: 'F',
            qtd_lp: dbl_lp,
            qtd_rate: dbl_lp,
            qtd_cal_rate_desc: '',
            qtd_orig_lp: dbl_original_lp,
            qtd_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
            callFrom: 'COMPLETE',
            qt_quot_no: rowDraft['qtd_draft_no'],
            qtd_quot_no: rowDraft['qtd_draft_no'],
          }
          selectedItems.push(payload)
        }
      }
      index++;
    });

    if (selectedItems.length == 0) {
      this.openSnackBar('Please select item.');
      return
    }
    this.payload['lstItem'] = selectedItems
    this.quotationService.editItem(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.openSnackBar('Item modified successfully.');
        this.flgChkAll = false;
        this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
      }
    })
  }

  getItemMakeList(index) {
        
    this.utilityServiceAvaxPro.getMakeList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.makeList[index] = data.responseData[0]
        }
        return this.makeList[index]
      },
      error => {
        console.log(error)
      }
    )
  }

  onMakeCodeChange(index, element) {
    this.showItmHistryIconFlg = true;

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    if (this.formGroup.controls.cmbItem.value == null || this.formGroup.controls.cmbItem.value == '') {
      this.openSnackBar("Please search Item ");
      return false
    }
    let item_code: any
    if (element.readonly == true) {
      item_code = element.item_code
    } else {
      item_code = this.formGroup.controls.cmbItem.value.item_code
    }
    let data = {
      item_code: item_code,
      make_code: this.formGroup.controls.cmbMake.value,
      siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      doc_type: 'QT',
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')))
      }
    }
    this.utilityServiceAvaxPro.onMakeCodeChangeList(data).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.formGroup.controls.txtListPrice.setValue(data.responseData[0].itm_list_price);

          if (element.readonly == true) {
            element.uom = data.responseData[0].itm_uom
            element.make = this.formGroup.controls.cmbMake.value
            element.cnv_conversion_factor = data.responseData[0].cnv_conversion_factor

            this.getUomList(element.make, element.item_code, index, element.uom, element.original_lp);
            this.formGroup.controls.cmbUom.setValue(new UomModelWithCnv(element.uom_code, element.uom_desc, element.cnv_conversion_factor))
          }
          else {

            let objItem = new ItemModelwithLP(
              this.formGroup.controls.cmbItem.value.item_code,
              this.formGroup.controls.cmbItem.value.item_name,
              this.formGroup.controls.cmbItem.value.catrefno,
              this.formGroup.controls.cmbMake.value,
              data.responseData[0].itm_list_price,
              data.responseData[0].itm_uom, "", ""//it_tariff_code
            )
            this.itemLp[index] = objItem.item_price
            this.formGroup.controls.cmbItem.setValue(objItem)
            this.getUomList(objItem.item_make, objItem.item_code, index, objItem.mmx_uom, objItem.item_price);

          }

        }
      },
      error => {
        console.log(error)
      }
    )
  }

  ShowQtn(){

    this.payload = {
      advanceSearchFlag: 'Y',
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
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
      }
    }

    this.payload["qt_branch_code"] = atob(sessionStorage.getItem(btoa('usr_of_branch')));
    this.payload["qt_siscon_code"] = atob(sessionStorage.getItem(btoa('usr_of_siscon')));

     if (this.form.controls.txtQtnNo.value == null || this.form.controls.txtQtnNo.value == undefined ||
        this.form.controls.txtQtnNo.value == '') {
        this.openSnackBar("Please Enter Quotation no");
        return false;
      } else {
        this.payload["qt_quot_no"] = this.form.controls.txtQtnNo.value;
      }
    
      let df_year_format = atob(sessionStorage.getItem(btoa('fin_year_format')));
    this.payload["df_year_format"] = df_year_format;

    let row: any = []
    this.quotationService.ShowQtn(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        data.responseData[0].map(item => {

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

             this.getdataForQtn(row , 'N')

        })

        }else{
          this.openSnackBar("NO DATA FOUND")
        }
        
      },
      error => {
        console.log(error)
      }
    )

  }


  getdataForQtn(row , revisionFlag) {

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
      usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
      usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
    }
    this.quotationService.generateDraft(this.payload).toPromise().then(data => {

            this.queryParams = data.responseData[0].headerdeatails;
            this.queryParams["callFrom"] = "COMPLETE";
            this.queryParams["isFromPendingDraft"] = "N";
            this.queryParams["isForViewQuotation"] = "N";
      
              let quot_no = row.qt_quot_no;
              this.queryParams["docNo"] = quot_no;
              this.queryParams["qt_quot_no"] = quot_no;
              this.queryParams["userInformationDto"] = {
                usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
                usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
                usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
                usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
                fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
                fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
              }
                            
            this.queryParams["revisionFlag"] = revisionFlag;
            sessionStorage.removeItem("data");
            sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
            // this.router.navigate(['session/entry/quotation/newquotitementry'], { state: this.queryParams });
            this.ngOnInit()


    }).catch(err => {
    });
  }
  checkPhasedOut(){
    if(this.cit_phased_out!=undefined && this.cit_phased_out!='' && this.cit_phased_out=='Y'){
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '350px'
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.data = {
        //message: "AO No : " + lstItemRespnse.ao_ao_no + " already made for same Item/Make in last 15 days.Are you sure,you want to add item?"
        message:'ITEM IS PHASED OUT',
        dialogType:'ERROR'
      }
      const dialogRef = this.dialog.open(CommonConfirmationDialogComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(item => {
      })
      return true;
    }
  }
  
}
