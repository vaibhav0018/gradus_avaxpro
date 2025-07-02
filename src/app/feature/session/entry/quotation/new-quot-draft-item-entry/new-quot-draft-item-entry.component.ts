import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { UtilityServiceAvaxPro } from 'src/app/core/services/utility/utility_avaxpro.service';
import { Router } from '@angular/router';
import { QuotationService } from '../quotation.service';
import { ItemModelwithLP, UomModelWithCnv } from '../../commons/commons.model';
import { MakeModel } from 'src/app/core/services/utility/common/common-entity.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ItemServiceAvaxPro } from 'src/app/core/services/utility/utilities/item_avaxpro.service';
import { ConstantsServiceAvaxPro } from 'src/app/core/services/constants_avaxpro.service';
import { ItemCalcComponent } from '../../commons/item-calc/item-calc.component';
import { DefaultItemCalc } from '../../commons/item-calc/item-calc.model';
import { QuotItemOtherInfoComponent } from '../quot-item-other-info/quot-item-other-info.component';
import { ModifyHeaderPageComponent } from '../modify-header-page/modify-header-page.component';
import { AddedItemModel } from '../quotation.model';
import { ItemDetailHistoryComponent } from '../../item-detail-history/item-detail-history.component';
import { ItemOtherInfoDetailsComponent } from '../../commons/item-other-info-details/item-other-info-details.component';
import { DocumentListModel } from '../../challan/components/challan-menu.model';
import { DataService } from '../../commons/item-calc/data.service';
import { BulkAdditionComponent } from '../../commons/bulk-addition/bulk-addition.component';
import { BulkAdditionThroughExcelComponent } from '../../commons/bulk-addition-through-excel/bulk-addition-through-excel.component';
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
  cmbLayout:string;
}
@Component({
  selector: 'app-new-quot-draft-item-entry',
  templateUrl: './new-quot-draft-item-entry.component.html',
  styleUrls: ['./new-quot-draft-item-entry.component.scss', '../../entry.scss']
})

export class NewQuotDraftItemEntryComponent implements OnInit {


  addItemPanelFlg: boolean = true;

  objBulkData: any = {}

  objDraftHeader: any
  showAoItemListFlag: boolean = false
  //additem
  itemLists: any = []
  objItem: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  //public itemList: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  filteredFromItemNames: Observable<any[]>[] = [];
  filteredItem: any = new Array<any>()

  makeLists: any = []
  mkList: MakeModel[] = new Array<MakeModel>()
  filteredMakeLists: Observable<any>

  uomLists: UomModelWithCnv[] = new Array<UomModelWithCnv>();

  filteredUomLists: Observable<any[]>[] = [];

  docHeaderViewDataRow: object = {}
  docHeaderViewData: any

  params: any
  otherInfoPageData: any

  otherInfoParams: any

  otherInfoPageDataFlag: boolean = false
  mmx_value: any
  itemLp = []
  displayItemColumns: string[] = [
    'serial_no',
    'item_code',
    'make',
    'it_product_code',
    'itm_catalog_ref_no',
    'layout',
    'quot_qty',
    'uom_code',
    'list_price',
    'rate',
    'amt',
    'calculator',
    'select'
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
    cmbLayout:''
  }];

  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);
  form: FormGroup = this.formBuilder.group({ 'arrayAddItem': this.rows });
  aryTableControl: AbstractControl[]
  formGroup: FormGroup
  stateData: any

  payload: object = {}
  tableData: any
  tempDataSource: any;

  addedItemRow: object = {}
  showAddedItemFlag: boolean = false
  itemCalcDataInArray = []
  itemCalcData: any;

  // to show complete quotation related docs

  docData = {}

  columnsOtherInfo = ['sr_no', 'item_code', 'ao_no', 'ao_date', 'ao_qty', 'ao_src', 'challan_no', 'challan_date',
    'challan_item_qty', 'po_no', 'po_date', 'po_item_qty', 'po_party']
  dataSourceOtherInfo: any

  columnsDocTerms = ['sr_no', 'trans_name', 'trans_name_value']
  dataSourceDocTerms: any

  columnsModifyTracking = ['sr_no', 'voucher_no', 'modify_date', 'modified_by', 'column_name', 'column_value']
  dataSourceModifyTracking: any
  docLists: any = []
  docCalcData: any;
  docCalcDataInArray: any[];
  modifyHeaderFlag: boolean = false;
  showHistoryOfChangesFlg: boolean = false;
  showCompleteDraftBtnFlg: boolean = false;
  stateDataStr: string;
  tempDate: Date;
  draftno: string
  isFromPendingDraft: string = 'N';
  isForViewQuotation: string = 'N';
  docCalcDataInput: any;
  callFrom: string = 'Draft';

  bulkAdditionFromExcelFlg: boolean = false;

  showOtherDocs: boolean = false;
  relatedDocs: boolean = false;
  historyOfChanges: boolean = false;
  docTerms: boolean = false;
  paymentVchrShowMtTblFlg1: boolean = false;

  makeList: any[] = []

  showItmHistryIconFlg:boolean = false;
  cit_phased_out: string;

  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private quotationService: QuotationService,
    private router: Router,
    private itemService: ItemServiceAvaxPro,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private objDataService: DataService,
  ) {
  }

  ngOnInit() {
    console.log('chk')
    if (sessionStorage.refData)
      this.stateDataStr = sessionStorage.getItem("refData");
    else {
      this.stateDataStr = sessionStorage.getItem("stateData");
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }

    this.stateData = JSON.parse(this.stateDataStr);
    this.objDraftHeader = this.stateData;

    this.otherInfoParams = JSON.parse(this.stateDataStr);
    this.docCalcDataInput = JSON.parse(this.stateDataStr);
    this.isFromPendingDraft = this.objDraftHeader.isFromPendingDraft;

    if (this.isFromPendingDraft != 'N') {
      this.isForViewQuotation = this.objDraftHeader.isForViewQuotation;
      this.displayAddedItems(this.objDraftHeader.qt_draft_no, "Draft");
      this.draftno = this.objDraftHeader.qt_draft_no;
      this.displayAddFrItemView(this.objDraftHeader.qt_draft_no, 0);
      //this.getItmList(0);
      this.showCompleteDraftBtnFlg = false;
    }

    this.isForViewQuotation = this.objDraftHeader.isForViewQuotation;

    if (this.isFromPendingDraft == 'N') {
      this.modifyHeaderFlag = true;
      this.loadCompleteQuotData(this.objDraftHeader.qt_quot_no, 'COMPLETE');
    }

    this.addItemPanelFlg = true;
    this.bulkAdditionFromExcelFlg = false;
    this.getProjectDtl()
  }


  loadCompleteQuotData(qt_quot_no, callFrom) {

    this.docData = JSON.parse(this.stateDataStr);
    this.getCompleteQuotHeaderDetails(qt_quot_no, callFrom);

    //this.getItemMakeList(0);

    this.data.forEach((d: ItemTableData) => this.addNewItemRow(0, d, false));
    this.updateView();


    this.displayAddedItemsForCompleteQuot(qt_quot_no, callFrom);
    this.draftno = this.objDraftHeader.qt_quot_no;
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
        this.objDraftHeader = data.responseData[0].QUOT_HEADER;
        this.dataSourceOtherInfo = data.responseData[0].OTHER_DOC_LIST;

        this.docLists = data.responseData[0].DOC_LIST.map(item => {
          return new DocumentListModel(
            item.fl_siscon_code,
            item.fl_branch_code,
            item.fl_doc_no,
            item.fl_doc_name,
            item.fl_file_name,
            item.fl_ts_created
          )
        })


      })
  }

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

    if (this.draftno == "NEW") {
      //this.getItmList(index);
    } else {
      this.displayAddedItems(this.draftno, "Draft")
    }

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

  prevItem :any={}
  onItemCodeChange(data, selectedItemObj, ind: any) {
    if (data.isUserInput == false) {
      return
    }
    this.cit_phased_out=selectedItemObj.cit_phased_out
    if(this.checkPhasedOut()){
      return false;
    }
    this.prevItem=selectedItemObj

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
      this.getItemMakeList(ind);

      this.formGroup.controls.txtProductCode.setValue(selectedItemObj.item_name);
      this.formGroup.controls.txtCatRef.setValue(selectedItemObj.catrefno);
      this.formGroup.controls.cmbMake.setValue(selectedItemObj.item_make);
      this.formGroup.controls.txtListPrice.setValue(selectedItemObj.item_price);
      this.itemLp[ind] = selectedItemObj.item_price
      if (this.formGroup.controls.cmbMake.value != '' && this.formGroup.controls.cmbMake.value != null &&
        this.formGroup.controls.cmbMake != undefined && this.formGroup.controls.cmbMake.value!=null &&
        this.formGroup.controls.cmbMake!=undefined) {
        this.showItmHistryIconFlg = true;
        this.getUomList(selectedItemObj.item_make, selectedItemObj.item_code, ind, selectedItemObj.mmx_uom, selectedItemObj.item_price);
      }
      else if(ind>0){
        this.formGroup.controls.cmbMake.setValue(this.tableData[ind-1].make)  
        selectedItemObj.item_make=this.tableData[ind-1].make
        selectedItemObj.readonly=false
        this.onMakeCodeChange(ind,selectedItemObj,'M');
      }
    }
  }

  filterItemsList(ind) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[ind] as FormGroup;

    let val = this.formGroup.controls.cmbItem.value
    if(this.itemLists != undefined && this.itemLists.length > 0){
    this.filteredItem= this.itemLists[ind].filter(option => {
      return (
        option.item_name.toLowerCase().includes(val.toLowerCase()) ||
        option.item_code.toLowerCase().includes(val.toLowerCase()) ||
        option.catrefno.toLowerCase().includes(val.toLowerCase()) ||
        option.item_make.toLowerCase().includes(val.toLowerCase())
      )
    })
  }
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
      this.itemService.getEntryItemList(itmValue,'QUOT').subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemLists[ind] = data.responseData[0].map(item => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp, item.mmx_uom, "", item.it_tariff_code,'',item.cit_phased_out)
            })

            this.filteredItem= data.responseData[0].map(item => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp, item.mmx_uom, "", item.it_tariff_code,'',item.cit_phased_out)
            })
          }
          else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            this.openSnackBar(data.message);
            return false;
          }
          return this.itemLists[ind]
        },
      )
    }
  }

  getUomList(make_code, item_code, ind, mmx_uom, item_price) {
    this.payload = {
      item_code: item_code, make: make_code,
    }

    let selectedObj;
    this.utilityServiceAvaxPro.getUomList(this.payload).subscribe(
      data => {

        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.uomLists[ind] = data.responseData[0].map(item => {

            if (mmx_uom != "" || mmx_uom != undefined || mmx_uom != null) {
              if (mmx_uom == item.uom_code) {
                selectedObj = new UomModelWithCnv(item.uom_code, item.uom_desc, item.cnv_conversion_factor)
                return selectedObj;
              } else {
                return new UomModelWithCnv(item.uom_code, item.uom_desc, item.cnv_conversion_factor)
              }
            }
            else {
              return new UomModelWithCnv(item.uom_code, item.uom_desc, item.cnv_conversion_factor)
            }
          })

          this.getrows = this.form.get('arrayAddItem') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[ind] as FormGroup;
          this.formGroup.get('cmbUom').setValue(selectedObj);
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  filterUom(val: string) {
    return this.uomLists.filter(option =>
      option.uom_desc.toLowerCase().includes(val.toLowerCase())
    )
  }

  displayUom(value): string | undefined {
    return value ? value.uom_desc : undefined
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
      cmbLayout:[''],
      cmbUom: [''],
      txtQty: [''],
      txtListPrice: [''],
      txtInputRate: [''],
      txtAmt: [''],
      txtCalcDesc: [''],
      chkItem: [''],
    });
    this.rows.push(row);
    this.itemLp[index] = ''
    //if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    //this.dataSource.next(this.rows.controls);
  }

  loadEditItem(i, rowDraft, arrayAddItem) {
    rowDraft.showEditIcon = true;
    this.getItemMakeList(i);
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;
    this.formGroup.controls.cmbItem.setValue(new ItemModelwithLP(
      rowDraft.item_code, rowDraft.it_prod_code, rowDraft.cat_refno,
      rowDraft.make, rowDraft.original_lp, "", ""//it_tariff_code
    ));
    this.formGroup.controls.txtQty.setValue(rowDraft.qty);
    this.formGroup.controls.txtInputRate.setValue(rowDraft.rate);
    this.formGroup.controls.txtListPrice.setValue(rowDraft.lp);
    this.formGroup.controls.cmbMake.setValue(rowDraft.make);
    this.getUomList(rowDraft.make, rowDraft.item_code, i, rowDraft.uom, rowDraft.original_lp);
    this.formGroup.controls.cmbUom.setValue(new UomModelWithCnv(rowDraft.uom_code, rowDraft.uom_desc, rowDraft.cnv_conversion_factor))
    this.formGroup.controls.cmbLayout.setValue(rowDraft.prjd_serial);
  }


  displayAddedItemsForCompleteQuot(draftNo, callfrom) {

    let index1 = 0;
    this.quotationService.getAddedItemDetailsList(draftNo, callfrom).subscribe(
      data => {

        if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);          
          return false;     
        } else {
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
            false, // add button,
            '',//qtd_item_note
            '',//qtd_variation_code
            '',//qtd_variation_len
            '',//delremarks
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
            'N', //chk_flag
            false, //readonly 
            true,  //edit
            true,

          );
          //this.getItmList(index1);
        }
        this.dataSource = this.tableData;
        }
      })
  }

  displayAddedItems(draftNo, callfrom) {

    let index1 = 0;
    this.quotationService.getAddedItemDetailsList(draftNo, callfrom).subscribe(
      data => {

        if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);          
          return false;   
        } else {
        if (data.responseData[0].length > 0) {
          this.showCompleteDraftBtnFlg = true;
        } else {
          this.showCompleteDraftBtnFlg = false;
        }

        this.tempDataSource = data.responseData[0];

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
            '',//delremarks
            item.prjd_layout_type,
            item.prjd_serial
          )
        });
        this.setArrayItemValues(index1, this.tableData);
        
        if(callfrom=='Draft' && this.tableData.length>0){
          this.getItemMakeList(index1);
          this.getrows = this.form.get('arrayAddItem') as FormArray;
          this.aryTableControl = this.getrows.controls;
          this.formGroup = this.aryTableControl[index1] as FormGroup;
          //prevItem
          if(this.prevItem.item_code!=undefined){
            this.formGroup.controls.cmbItem.setValue(this.prevItem);
            this.onItemCodeChange({isUserInput:true},this.prevItem,this.tableData.length)
            this.formGroup.controls.cmbMake.setValue(this.tableData[this.tableData.length-1].make)  
            this.onMakeCodeChange(this.tableData.length,this.prevItem,'S');
          }
          else{
            this.formGroup.controls.cmbMake.setValue(this.tableData[this.tableData.length-1].make)  
          }
          
        }

        this.tableData[this.tableData.length] = new AddedItemModel(
          '', '', 'N', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          '', '', '', '', '',
          'N', //chk_flag
          false, //readonly 
          true,  //edit
          true,
        );
        this.dataSource = this.tableData
        this.updateView();

        }
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

    if (this.formGroup.controls.cmbUom.value == '' || this.formGroup.controls.cmbUom.value == undefined) {
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

    if (this.formGroup.controls.txtInputRate.value == undefined || this.formGroup.controls.txtInputRate.value == '' ||
      this.formGroup.controls.txtInputRate.value == null) { } else {
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
                  this.openItemCalc(i,
                    this.formGroup.controls.cmbItem.value.item_code,
                    this.formGroup.controls.cmbItem.value.item_make,
                    'A',
                    null,
                    cnv_lp)
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
              this.openItemCalc(i,
                this.formGroup.controls.cmbItem.value.item_code,
                this.formGroup.controls.cmbItem.value.item_make,
                'A',
                null,
                cnv_lp)
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
      dialogConfig.data.flg_draft = 'Y'
    }

    const dialogRef = this.dialog.open(ItemCalcComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(item => {

      if (item !== 'close') {
        this.itemCalcData = null;
        this.objDataService.currentMessage.subscribe(message => this.itemCalcData = message);
        if (fromFlg == 'U') {
          this.editItem(index, rowDraft, 'F');
        } else {
          this.addItem(index, 'F');
        }
      }

    })
  }

  addItem(index, flgCalc, flgBulkAdd?) {

    if (this.stateData.qt_draft_no == "NEW") {
      this.generateDraft(index, flgCalc, flgBulkAdd);
    } else {
      this.addDraftItem(index, flgCalc, flgBulkAdd)
    }
  }

  lstProjectDtl:any=[]
  getProjectDtl() {
    
    let payload = {
      common_row:{siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon'))),branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch'))),prj_no:this.stateData.qt_project_code}
    }
    this.utilityServiceAvaxPro.getProjectDtl(payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstProjectDtl = data.responseData[0]
        }
      })
  }

  generateDraft(index, flgCalc, flgBulkAdd?) {
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
      qt_doc_type_code: "QOT",
      qt_source_type: 'FR',
      qt_inv_type_code: "-",
      qt_inv_type_code_desc: "-",
      qt_draft_date: this.utilityServiceAvaxPro.getFormatDate(this.stateData.qt_draft_date, 'yyyy-MM-dd'),
      qt_quotation_date: this.utilityServiceAvaxPro.getFormatDate(this.stateData.qt_draft_date, 'dd/MM/yyyy'),
      qt_del_terms_code: this.stateData.qt_del_terms_code,
      qt_delivery_days: this.stateData.qt_delivery_days,
      qt_valid_days: this.stateData.qt_valid_days,
      qt_type: this.stateData.qt_type,
      qt_enq_no: this.stateData.qt_enq_no,
      qt_enq_date: this.stateData.qt_enq_date,
      qt_attention: this.stateData.qt_attention,
      qt_ccto: this.stateData.qt_ccto,
      qt_destination: this.stateData.qt_destination,
      qt_reference: this.stateData.qt_reference,
      qt_tax_type_code: this.stateData.qt_tax_type_code,
      qt_spl_tax_flg: this.stateData.qt_spl_tax_flg,
      qt_cust_code: this.stateData.qt_cust_code,
      qt_disp_to_code: this.stateData.qt_disp_to_code,
      qt_bill_addr_code: this.stateData.qt_bill_addr_code,
      qt_disp_addr_code: this.stateData.qt_disp_addr_code,
      qt_disp_state_code: this.stateData.qt_disp_state_code,
      qt_handled_by: this.stateData.qt_handled_by,
      qt_follow_up_by: this.stateData.qt_follow_up_by,
      qt_instructed_by: this.stateData.qt_instructed_by,
      qt_broker_code: this.stateData.qt_broker_code,
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      qt_deleted_flg: "N",
      qt_project_code:this.stateData.qt_project_code
    }

    if (this.stateData.qt_delivery_days == '') {
      this.payload['qt_delivery_days'] = '0'
    }

    this.quotationService.generateDraft(this.payload)
      .toPromise()
      .then(data => {

        if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);     
          return false;     
        } else {
        //this.stateData = data.responseData[0].HEADERDEATAILS;
        this.stateData = data.responseData[0].headerdeatails;
        this.stateData["callFrom"] = "Draft";
        this.stateData["isFromPendingDraft"] = "Y";
        this.stateData["isForViewQuotation"] = "N";
        this.stateData["revisionFlag"] = "N";
        sessionStorage.setItem('refData', JSON.stringify(this.stateData))
        this.objDraftHeader = this.stateData
        this.addDraftItem(index, flgCalc, flgBulkAdd)
        }
      })
      .catch(err => {
      });
  }

  addDraftItem(index, flgCalc, flgBulkAdd?) {
    let dbl_lp = 0;
    let dbl_original_lp = 0;
    let qtd_rate = 0;
    let qtd_item_code = ''
    let qtd_make = ''
    let qtd_qty = ''
    let qtd_uom = ''
    let qtd_project_serial = '0'

    this.itemCalcDataInArray = []

    if (flgBulkAdd == 'Y') {
      let objItemCalc = new DefaultItemCalc().getDefaultItemCalc('', '')
      this.itemCalcDataInArray.push(objItemCalc);
    } else {

      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      qtd_item_code = this.formGroup.controls.cmbItem.value.item_code
      qtd_make = this.formGroup.controls.cmbItem.value.item_make
      qtd_uom = this.formGroup.controls.cmbUom.value.uom_code
      qtd_qty = this.formGroup.controls.txtQty.value
      dbl_original_lp = this.formGroup.controls.cmbItem.value.item_price;
      qtd_project_serial = this.formGroup.controls.cmbLayout.value
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
       //dbl_original_lp = Number((dbl_original_lp * this.formGroup.controls.cmbUom.value.cnv_conversion_factor).toFixed(2));

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
      qtd_item_code: qtd_item_code,
      qtd_make: qtd_make,
      qtd_uom: qtd_uom,
      qtd_quantity: qtd_qty,
      qtd_rate: qtd_rate,
      qtd_lp: dbl_lp,
      qtd_orig_lp: dbl_original_lp,
      qtd_original_lp: dbl_original_lp,
      qtd_cal_rate_desc: '',
      qtd_party_item_code: "",
      qtd_item_note: "",
      qtd_item_remark: "",
      qtd_itemsch_id: ConstantsServiceAvaxPro.DEFAULT_ITEM_CALC,
      qt_draft_no: this.objDraftHeader.qt_draft_no,
      qtd_draft_no: this.objDraftHeader.qt_draft_no,
      qtd_project_serial:qtd_project_serial
    }

    this.payload['callFrom'] = this.isFromPendingDraft == 'Y' ? 'Draft' : 'COMPLETE';

    if (this.isFromPendingDraft == 'N') {
      this.payload['qt_quot_no'] = this.objDraftHeader.qt_quot_no;
      this.payload['qtd_quot_no'] = this.objDraftHeader.qt_quot_no;
    }

    this.quotationService.addItemToQoutDraft(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.stateData['draft'] = true
          sessionStorage.removeItem('data')
          sessionStorage.setItem('data', JSON.stringify(this.stateData))
          if (this.isFromPendingDraft == 'N') {
            this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
            let temp = this.docCalcDataInput;
            this.docCalcDataInput = null;
            this.docCalcDataInput = temp;
            this.itemLists = []
          } else {
            this.displayAddedItems(this.objDraftHeader.qt_draft_no, this.objDraftHeader.callFrom);
          }
        }
        else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
      },
      error => {
        console.log(error)
      })
  }

  updateItemRow(i: number, row: any, rowDraft: any) {
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[i] as FormGroup;

    if (this.formGroup.controls.cmbMake.value == '' || this.formGroup.controls.cmbMake.value == null || this.formGroup.controls.cmbMake.value == undefined) {
      this.openSnackBar("PLease select Make");
      return false;
    }

    //if (this.formGroup.controls.cmbUom.value.uom_desc == undefined) {
    if (this.formGroup.controls.cmbUom.value == undefined) {
      this.openSnackBar("Please select UOM.");
      return false;
    }

    if (this.formGroup.controls.txtQty.value == '') {
      this.openSnackBar("Please enter QTY.");
      return false;
    }
    else if (isNaN(this.formGroup.controls.txtQty.value)) {
      this.openSnackBar("Please enter valid QTY.");
      return false;
    }
    if (this.formGroup.controls.txtListPrice.value == '') {
      this.openSnackBar("Please enter LP.");
      return false;
    }
    else if (isNaN(this.formGroup.controls.txtListPrice.value)) {
      this.openSnackBar("Please enter valid LP.");
      return false;
    }
    if (Number(this.formGroup.controls.txtListPrice.value) < 0) {
      this.openSnackBar('Lp can not be less than 0');
      return false;
    }

    if (this.formGroup.controls.txtInputRate.value != '' || this.formGroup.controls.txtInputRate.value != undefined) {
      if (isNaN(this.formGroup.controls.txtInputRate.value)) {
        this.openSnackBar("Please enter valid RATE.");
        return false;
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
      this.editItem(i, row, 'R');
    }
    else {
      let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor;
      let cnv_lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
      //let cnv_lp = Number(row.lp * cnv_factor).toFixed(2);
      //let cnv_lp = Number(this.formGroup.controls.txtListPrice.value * cnv_factor).toFixed(2);
      this.openItemCalc(i,
        //this.formGroup.controls.cmbItem.value.item_code,
        //this.formGroup.controls.cmbItem.value.item_make,
        row.item_code,
        row.make,
        'U',
        row,
        cnv_lp);


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

    dbl_original_lp = rowDraft.original_lp;
    if (flgCalc == 'F') {
      this.itemCalcDataInArray.push(this.itemCalcData);
      if (dbl_original_lp == 0) {
        dbl_original_lp = this.itemCalcData.amtList_Price
      }
      dbl_lp = this.itemCalcData.amtList_Price
    }
    else {
      if (dbl_original_lp == 0) {
        dbl_original_lp = this.formGroup.controls.txtInputRate.value
      }
      dbl_lp = this.formGroup.controls.txtListPrice.value //this.formGroup.controls.txtInputRate.value
      dbl_original_lp = Number((dbl_original_lp * this.formGroup.controls.cmbUom.value.cnv_conversion_factor).toFixed(2));

      let objItemCalc = new DefaultItemCalc().getDefaultItemCalc(dbl_original_lp, dbl_lp)
      //dbl_lp = dbl_original_lp
      this.itemCalcDataInArray.push(objItemCalc);
    }

    if (flgCalc == "R") {
      qtd_rate = this.formGroup.controls.txtInputRate.value;
    } else {
      qtd_rate = dbl_lp;
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
      callFrom: this.isFromPendingDraft == 'Y' ? 'Draft' : 'COMPLETE',
      qtd_project_serial:this.formGroup.controls.cmbLayout.value
    }
    this.quotationService.editItem(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar('Item updated successfully.');
          rowDraft.showEditIcon = false;
          if (this.isFromPendingDraft == 'N') {
            this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
            let temp = this.docCalcDataInput;
            this.docCalcDataInput = null;
            this.docCalcDataInput = temp;

          } else {
            this.displayAddedItems(rowDraft.qtd_draft_no, 'Draft');
          }
        }
        else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);     
          return false;     
        }

      })
  }

  deleteItemRow(i: number, itemData: any, d?: ItemTableData, noUpdate?: boolean) {
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

    }

    if (this.isFromPendingDraft == 'N') {
      this.payload['qt_quot_no'] = this.objDraftHeader.qt_quot_no;
      this.payload['qtd_quot_no'] = this.objDraftHeader.qt_quot_no;
    }

    this.quotationService.deleteDraftItem(this.payload).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData[0] == "DRAFT_DELETE") {
            this.openSnackBar("Draft deleted successfully");
            this.router.navigate(['session/entry/quotation/'])
            return false;
          } else {
            if (this.isFromPendingDraft == 'N') {
              this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');
            } else {
              this.displayAddedItems(this.objDraftHeader.qt_draft_no, 'Draft');
            }
          }
        }
      },
      error => {
        console.log(error)
      })
  }


  editOtherItemInfo(index, row) {
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
        this.openSnackBar('Closing snack bar in a few seconds');
      }

      if (this.isFromPendingDraft == 'N') {
        this.displayAddedItemsForCompleteQuot(this.objDraftHeader.qt_quot_no, 'COMPLETE');

      } else {
        this.displayAddedItems(this.objDraftHeader.qt_draft_no, this.objDraftHeader.callFrom);
      }

    });

  }

  setLp(index, row) {

    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    let cnv_factor = this.formGroup.controls.cmbUom.value.cnv_conversion_factor

    if (this.formGroup.controls.cmbItem.value.item_price == undefined || this.formGroup.controls.cmbItem.value.item_price == '' ||
      this.formGroup.controls.cmbItem.value.item_price == null) {
      let lp = Number(row.original_lp * cnv_factor).toFixed(2);
      this.formGroup.controls.txtListPrice.setValue(lp);
      this.itemLp[index] = lp
    } else {
      let lp = Number(this.formGroup.controls.cmbItem.value.item_price * cnv_factor).toFixed(2);
      this.formGroup.controls.txtListPrice.setValue(lp);
      this.itemLp[index] = lp
    }
    
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
    dialogConfig.width = '55%',
    dialogConfig.minWidth = '55%',
    dialogConfig.height = '90%',
    dialogConfig.minHeight = '90%',
    dialogConfig.maxWidth = '95%',
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
        module_id: 'QUOT',
      },
    }
    const dialogRef = this.dialog.open(ItemOtherInfoDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
  }

  opneShowItemHistoryDetails(row,index) {

    let json = {}
    
    if(row=='N'){      
      this.getrows = this.form.get('arrayAddItem') as FormArray;
      this.aryTableControl = this.getrows.controls;
      this.formGroup = this.aryTableControl[index] as FormGroup;

      json['item_code']=this.formGroup.controls.cmbItem.value.item_code;
      json['make']=this.formGroup.controls.cmbMake.value;

    }else{
      json = row;
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

  completeDraft() {

    let i = 0;
    this.tempDataSource.forEach(item => {
      if (item.calratedesc == '-') {
        i++;
      }
    })

    if (i > 0) {
      this.openSnackBar(" You can not complete the draft until you not define Calculator.");
      return false;
    }

    this.addItemPanelFlg = false;
    this.showAoItemListFlag = false;
    this.otherInfoPageDataFlag = true;
    this.addedItemRow = []
    this.addedItemRow = {
      stateData: this.stateData,
      qt_draft_no: this.objDraftHeader.qt_draft_no,
      callFrom: "Draft",
      showView: "itemDisplay"
    }

    this.params = this.addedItemRow;
    this.otherInfoPageData = []
    this.otherInfoPageDataFlag = true
    this.otherInfoPageData = {
      stateData: this.stateData,
      callFrom: "Draft",
      isFromDraft: "Y",
      qt_quot_no: this.objDraftHeader.qt_draft_no,
      qt_draft_no: this.objDraftHeader.qt_draft_no,
      qt_cust_code: this.stateData.qt_cust_code,
    }
    this.otherInfoParams['qt_quot_no'] = this.objDraftHeader.qt_draft_no
    this.otherInfoParams['qt_draft_no'] = this.objDraftHeader.qt_draft_no
    this.otherInfoParams['qt_draft_date'] = this.stateData.qt_draft_date
    //this.otherInfoParams['qt_quotation_date']= this.utilityServiceAvaxPro.getFormatDate(this.stateData.qt_draft_date, 'dd/MM/yyyy')

  }

  modifyHeader() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '80%'
    dialogConfig.minWidth = '75%'
    dialogConfig.height = '80%'
    dialogConfig.maxHeight = '200vh'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Header Modification',
      qt_quot_no: this.stateData.qt_quot_no,
    }

    const dialogRef = this.dialog.open(ModifyHeaderPageComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      console.log(" item ", item)
    })
  }

  modifyOtherInfo() {
    this.showAoItemListFlag = false;
    this.addedItemRow = []

    this.addedItemRow = {
      stateData: this.stateData,
      qt_quot_no: this.objDraftHeader.qt_quot_no,
      callFrom: "COMPLETE",
      showView: "itemDisplay"
    }

    this.params = this.addedItemRow;
    this.otherInfoPageData = []
    this.otherInfoPageDataFlag = true
    this.otherInfoPageData = {
      stateData: this.stateData,
      callFrom: "COMPLETE",
      isFromDraft: "N",
    }

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
        console.log('item of bulkaddition = ', item);
        this.objBulkData = null;
        this.objBulkData = item
        this.bulkAdditionFromExcelFlg = true;
        this.addItem(-1, 'F', 'Y')
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
          draft_no = rowDraft.qtd_draft_no

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
            callFrom: this.isFromPendingDraft == 'Y' ? 'Draft' : 'COMPLETE',
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
        this.displayAddedItems(draft_no, 'Draft');
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

  onMakeCodeChange(index, element,flg) {
    this.showItmHistryIconFlg=true;
    this.getrows = this.form.get('arrayAddItem') as FormArray;
    this.aryTableControl = this.getrows.controls;
    this.formGroup = this.aryTableControl[index] as FormGroup;

    if (this.formGroup.controls.cmbItem.value == null || this.formGroup.controls.cmbItem.value == '') {
      this.openSnackBar("Please search Item ");
      return false
    }
    let item_code: any
    if(flg=='M'){
      item_code = element.item_code
    }
    else if (element.readonly == true) {
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
              data.responseData[0].itm_uom,
              "", ""//it_tariff_code
            )
            console.log(" objItem ", objItem)
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