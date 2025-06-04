import { Component, OnInit, Inject } from '@angular/core';

import { InfoCardsService } from '../info-cards/info-cards.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DateValidator } from 'src/app/core/services/custom-validations/custom-validators';
// import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/entry/commons/date-adapter/app-date-adapter.service';
// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe, formatDate, NgIf } from '@angular/common';
import { CommonSnackbarComponent } from '../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { CommonsService } from '../../../shared/services/commons.service';
import { UtilityService } from '../../../core/services/utility/utility.service';
import { BranchModel } from '../../../shared/models/model/branch.model';
import { ElementModel } from '../../../shared/models/model/element.model';
import { MakeModel } from '../../../shared/models/model/make.model';
import { GroupModel } from '../../../shared/models/model/group.model';
import { Observable } from 'rxjs';
import { ItemServiceAvaxPro } from '../../../core/services/utilities/item_avaxpro.service';
import { ItemModelwithLP } from '../../../feature/session/entry/commons/commons.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateAdapter } from 'angular-calendar';
import { MAT_DATE_FORMATS, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { CustomSpinnerComponent } from "../../../feature/session/custom-spinner/custom-spinner.component";
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dailog.component.html',
  styleUrls: ['./dashboard-dailog.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [
    CustomSpinnerComponent,
    MatIcon,
    MatButtonModule,
    NgxChartsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule

],
  // providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
  // { provide: DatePipe },
  // { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }],
})
export class DashboardDialogComponent implements OnInit {

  fromDate = new Date(new Date().getFullYear(), 0, 1)
  toDate = new Date()
  todayDate = new Date();
  todayDate1 = new Date();
  todayDateWayBill = new Date();
  yesterDateDate: Date = new Date();

  showFlag1: boolean = true
  showFlag2: boolean = false
  table2: boolean = false
  showMenuFlag: boolean = true

  maxDate = new Date(new Date().setDate(new Date().getDate()))
  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_end')) || ''))
  minDate = new Date(this.controlValue.getFullYear(), 3, 1);
  monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  currentDate = new Date()
  monthEndDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  serializedDate = new FormControl((new Date()).toISOString());

  dtTrgDate = new FormControl(new Date());
  tooSelected: any
  dataSource: any = []
  dataSource1: any = []
  dataSourceChart: any = []
  lstColumn: any = []
  lstDisplayCoumn: any = []
  lstColumn1: any = []
  lstDisplayCoumn1: any = []
  title: any = ''
  value: any = ''
  explodeSlices: any = ''
  doughnut: any = ''
  chartName:any
  flgViewChart: any = false;
  legendTitle: string = 'Years';
  public showLabels=true
  public autoScale = true
  public single: any[]
  public showXAxis = true
  public showYAxis = true
  public gradient = false
  public showLegend = true
  public showXAxisLabel = true
  public xAxisLabel = 'Quarter'
  public showYAxisLabel = true
  public yAxisLabel = 'Sales'
  viewSalesBarChart: [number, number] = [370, 350];
  viewSalesPieChart: [number, number] = [460, 363];
  view: [number, number] = [800, 400]
  viewPie:any[]=[300,200]
  flgRPDetail: string = 'N';
  selectedDisplayType = '1'
  selectedPeriod = 'T'
  selectedDisplayOrder: any
  form: FormGroup
  payload: any = {}
  as_on_date: string = ''
  rpt_type = ''
  report_name: string = ''
  group_code: any
  branch: string = ''
  doc_type: string = '';

  displaytypeflg: boolean = false
  periodtextflg: boolean = false
  fromdateflg: boolean = false
  todateflg: boolean = false
  dateflg: boolean = false
  fmdateflg: boolean = false
  flgselection: boolean = false
  flgselected: boolean = false
  cmbDisplayOrder: boolean = false
  flgbutton: boolean = false
  docsflg: boolean = false
  branchFlg: boolean = false
  flgitemmaingroup: boolean = false
  flgitemsubgroup: boolean = false
  flgindustry: boolean = false
  todateotherflg: boolean = false
  trgFlg: boolean = false
  currentDtFlg: boolean = false
  to_date: any
  from_date: any
  /**
  * Branch
  */
  branchList: BranchModel[] = []
  branchLst: BranchModel[] = []

  /** itemMainGroupList */
  public itemMainGroupList: GroupModel[] = []
  filteredItemMainGroupList: Observable<GroupModel[]>

  /** itemSubGroupList */
  public itemSubGroupList: GroupModel[] = []
  filteredItemSubGroupList: Observable<GroupModel[]>

  public industryTypeList: any[]

  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'],
  }

  showStkValFlag: boolean = false
  public makeLists: any = []
  public itemList: any = []
  setDisplayType: string = "1"
  asOnDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private objservice: InfoCardsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private commonsService: CommonsService,
    private utilityService: UtilityService,
    private itemService: ItemServiceAvaxPro,
    private dialog: MatDialog,
  ) {

    this.form = this.formBuilder.group({
      cmbDisplayType: ['1'],
      cmbPeriod: ['1'],
      // dtFromDate: [new Date(), [DateValidator()]],
      // dtToDate: [new Date(), [DateValidator()]],
      cmbSelection: [''],
      cmbDisplayOrder: [''],
      cmbBranchList: [''],
      cmbIndustry: [''],
      cmbItemSubGroup: [''],
      cmbItemMainGroup: [''],
      dtTrgDate: [''],

      txtItem: [''],
      cmbMake: [''],
      cmbItem: [''],
      txtAsOnDate: [new Date()],
      cmbSelOption: ['1']

    });
  }
  getFormattedDate(res: any) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  onSelect(event: any): void {
    console.log('Selected item:', event);
    // Add your logic here
  }

  translate(value: any) {
    console.log("value", value)
  }
  

  ngOnInit() {
    /* IndusryLists */
    //this.getIndustryTypeList()

    /* MainGroupLists */
    //this.getItemMainGroupList()

    /* SubGroupLists */
    //this.getItemSubGroupList(-1)
    if (this.data.title == "BRANCH SALES") {
      this.showFlag2 = false
      this.showFlag1 = true
      this.table2 = false
    }

    console.log("data", this.data)
    if (this.data.flgRPDetail != undefined && this.data.flgRPDetail == 'Y') {

      /* Setting Default Value to Branch */
      this.form.get('cmbBranchList')!.setValue(new BranchModel(
        '',
        '',
        '',
        'All'))

      this.title = this.data.title
      this.value = this.data.rpt_type
      console.log("this.value", this.value)
      this.flgViewChart = false
      // console.log(" this.report_name ", this.report_name)
      console.log("this.data.report_name= ", this.data.report_name)
      this.report_name = this.data.report_name
      console.log(" this.report_name ", this.report_name)
      this.flgRPDetail = 'Y'
      this.rpt_type = this.data.rpt_type

      if (this.report_name == 'RECEIVABLE') {

        this.displaytypeflg = true
        this.periodtextflg = true
        this.fromdateflg = false
        this.todateflg = false
        this.flgselection = false
        this.flgselected = false
        this.cmbDisplayOrder = false
        this.flgbutton = false
        this.docsflg = false
        this.showStkValFlag = false

        this.lstColumn = [
          { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
          { col_name: 'Code', db_col: 'cob_cust_code', flgLink: false, col_type: 'TAX' },
          { col_name: 'Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'HB', db_col: 'hb_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'GH', db_col: 'gh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'RH', db_col: 'rh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'Industry', db_col: 'ind_industry', flgLink: false, col_type: 'TXT' },
        ];
        this.lstDisplayCoumn = ['br_city', 'cob_cust_code', 'cs_name', 'hb_name', 'gh_name', 'rh_name', 'ind_industry']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        this.loadOSDetail();
      }
      else if (this.report_name == 'SALES') {

        this.showStkValFlag = false
        if (this.data.rpt_type == 'Sale(CYMTD)') {
          this.branch = this.data.branch
          this.dateflg = true
          this.fmdateflg = false
          this.todateotherflg = false
          this.todateflg = true
          this.trgFlg = false
          this.currentDtFlg = true


          this.form.get('dtFromDate')!.setValue(this.commonsService.date_ymd(this.monthStartDate))

        } else if (this.data.rpt_type == 'Yesterday Sale') {

          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = false
          this.todateflg = true
          this.trgFlg = false
          this.currentDtFlg = true

          console.log("this.data.days========" + this.data.payload.from_date)

          // let aryDate = this.data.payload.yesterday_date.split("/")
          this.yesterDateDate = new Date(this.yesterDateDate.setDate(this.yesterDateDate.getDate() - 1));
          this.form.get('dtFromDate')!.setValue(this.commonsService.date_ymd(this.yesterDateDate))
          this.form.get('dtToDate')!.setValue(this.commonsService.date_ymd(this.yesterDateDate))
          this.branch = this.data.branch
          this.todayDate1 = this.yesterDateDate
          this.loadOSDetail()
        } else if (this.data.rpt_type == 'Sale(CYTD)') {
          this.branch = this.data.branch
          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = false
          this.todateflg = true
          this.trgFlg = false
          this.currentDtFlg = true

          let finYearStart = atob(sessionStorage.getItem(btoa('fin_year_beg')) || '')
          this.from_date = new Date(Number(finYearStart.split("/")[2]), 3, 1)
          this.form.get('dtFromDate')!.setValue(this.from_date)

        } else if (this.data.rpt_type == 'Sale(LYTD)') {
          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = false
          this.todateflg = true
          this.trgFlg = false
          this.currentDtFlg = true

          let fin_end_dt = atob(sessionStorage.getItem(btoa('fin_year_end')) || '')
          let endDate: any = fin_end_dt.split("/")[1] + "/" + fin_end_dt.split("/")[0] + "/" + fin_end_dt.split("/")[2]
          this.form.get('dtFromDate')!.setValue(new Date(endDate))

        } else if (this.data.rpt_type == 'Sale(LYMTD)') {
          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = false
          this.todateflg = true
          this.trgFlg = false
          this.currentDtFlg = true

          let fin_end_dt = atob(sessionStorage.getItem(btoa('fin_year_end'))  ||  '')
          let endDate: any = fin_end_dt.split("/")[1] + "/" + fin_end_dt.split("/")[0] + "/" + fin_end_dt.split("/")[2]
          this.form.get('dtFromDate')!.setValue(new Date(endDate))


        } else if (this.data.rpt_type == 'TARGET(CYTD)') {

          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = true
          this.todateflg = false
          this.trgFlg = true
          this.currentDtFlg = false

          let finYearStart = atob(sessionStorage.getItem(btoa('fin_year_beg')) || '')
          this.from_date = new Date(Number(finYearStart.split("/")[2]), 3, 1)
          this.form.get('dtFromDate')!.setValue(this.from_date)

          let fin_end_dt = atob(sessionStorage.getItem(btoa('fin_year_end')) || '')
          console.log(" fin_end_dt ", fin_end_dt)

          let endDate: any = fin_end_dt.split("/")[1] + "/" + fin_end_dt.split("/")[0] + "/" + fin_end_dt.split("/")[2]
          console.log(" new date format     ", new Date(endDate))

          if (new Date(this.todayDate) > new Date(endDate)) {
            console.log(" greater ")
            this.todayDate = new Date(endDate)
          } else {
            console.log(" less ")
            this.todayDate = new Date()
          }
          console.log(" final todayDate ", this.todayDate)

        } else {
          this.dateflg = false
          this.fmdateflg = true
          this.todateotherflg = false
          this.todateflg = false
          this.currentDtFlg = true
          this.trgFlg = false

          /*by default set from_date */
          let finYearStart = atob(sessionStorage.getItem(btoa('fin_year_beg')) || '')
          this.from_date = new Date(Number(finYearStart.split("/")[2]), 3, 1)
          this.form.get('dtFromDate')!.setValue(this.from_date)

          /*by default set to_date */
          let finYearEnd = atob(sessionStorage.getItem(btoa('fin_year_end')) || '')
          this.to_date = new Date(Number(finYearEnd.split("/")[2]), 3, 1)
          this.form.get('dtToDate')!.setValue(this.commonsService.date_ymd(this.monthEndDate))
        }

        this.displaytypeflg = false
        this.periodtextflg = false
        this.fromdateflg = true
        this.todateflg = true
        this.flgselection = false
        this.flgselected = false
        this.cmbDisplayOrder = false
        this.flgbutton = true
        this.docsflg = false

        this.lstColumn = [
          { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
          { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
          { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
          { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
          { col_name: 'Invoice No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
          { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
          { col_name: 'GP%', db_col: 'gp', flgLink: false, col_type: 'NUM' },
        ];
        this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'gp']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        this.loadOSDetail();
      }
      else if (this.report_name == 'DOCS') {
        // this.showFlag1 = true
        // this.showFlag2 = false
        this.showStkValFlag = false
        this.selectedDisplayOrder = "BR"
        if (this.data.rpt_type == 'PO VALUE') {

          this.title = this.data.rpt_type
          this.displaytypeflg = false
          this.periodtextflg = false
          this.fromdateflg = false
          this.todateflg = false
          this.flgselection = true
          this.flgselected = false
          this.cmbDisplayOrder = true
          this.flgbutton = false
          this.docsflg = true

          this.lstColumn = [
            { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
            { col_name: 'Doc No', db_col: 'doc_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Doc Date', db_col: 'doc_date', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order No', db_col: 'po_ult_cust_ord_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order Date', db_col: 'po_ts_ult_cust_ord', flgLink: false, col_type: 'TXT' },
            { col_name: 'Party', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'RH', db_col: 'rh', flgLink: false, col_type: 'TXT' },
            { col_name: 'GH', db_col: 'gh', flgLink: false, col_type: 'TXT' },
            { col_name: 'Hand', db_col: 'hby', flgLink: false, col_type: 'TXT' },
            { col_name: 'Industry', db_col: 'ind_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Main Group', db_col: 'grp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Sub Group', db_col: 'subgrp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Catref No', db_col: 'itm_catalog_ref_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Item Code', db_col: 'pod_item_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Prod Code', db_col: 'it_prod_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Bal Qty', db_col: 'bal_qty', flgLink: false, col_type: 'NUM' },
            { col_name: 'Bal Value', db_col: 'bal_val', flgLink: false, col_type: 'NUM' },
            { col_name: 'Type', db_col: 'po_src_code', flgLink: false, col_type: 'TXT' },
          ];
          this.lstDisplayCoumn = ['br_city', 'doc_no', 'doc_date', 'po_ult_cust_ord_no', 'po_ts_ult_cust_ord', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'grp_name', 'subgrp_name', 'itm_catalog_ref_no', 'pod_item_code', 'it_prod_code', 'bal_qty', 'bal_val', 'po_src_code']
          this.as_on_date = this.data.payload.as_on_date
          this.dataSource = []
          this.payload = this.data.payload
          this.rpt_type = this.data.rpt_type

          this.onSubmitPo()

        }
        else if (this.data.rpt_type == 'AO VALUE') {
          this.title = this.data.rpt_type
          this.displaytypeflg = false
          this.periodtextflg = false
          this.fromdateflg = false
          this.todateflg = false
          this.flgselection = true
          this.flgselected = false
          this.cmbDisplayOrder = true
          this.flgbutton = false
          this.docsflg = true

          this.lstColumn = [
            { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
            { col_name: 'Doc No', db_col: 'doc_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Doc Date', db_col: 'doc_date', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order No', db_col: 'ao_cust_order_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order Date', db_col: 'ao_ts_cust_order_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Party', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'RH', db_col: 'rh', flgLink: false, col_type: 'TXT' },
            { col_name: 'GH', db_col: 'gh', flgLink: false, col_type: 'TXT' },
            { col_name: 'Hand', db_col: 'hby', flgLink: false, col_type: 'TXT' },
            { col_name: 'Industry', db_col: 'ind_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Main Group', db_col: 'grp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Sub Group', db_col: 'subgrp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Catref No', db_col: 'itm_catalog_ref_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Item Code', db_col: 'aod_item_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Prod Code', db_col: 'it_prod_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Bal Qty', db_col: 'bal_qty', flgLink: false, col_type: 'NUM' },
            { col_name: 'Bal Value', db_col: 'bal_val', flgLink: false, col_type: 'NUM' },
            { col_name: 'Type', db_col: 'ao_source_type', flgLink: false, col_type: 'TXT' },
          ];
          this.lstDisplayCoumn = ['br_city', 'doc_no', 'doc_date', 'ao_cust_order_no', 'ao_ts_cust_order_no', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'grp_name', 'subgrp_name', 'itm_catalog_ref_no', 'aod_item_code', 'it_prod_code', 'bal_qty', 'bal_val', 'ao_source_type']
          this.as_on_date = this.data.payload.as_on_date
          this.dataSource = []
          this.payload = this.data.payload
          this.rpt_type = this.data.rpt_type

          this.onSubmitAo();

        }
        else if (this.data.rpt_type == 'QOT VALUE') {

          this.title = 'QUOTATION VALUE'
          this.displaytypeflg = false
          this.periodtextflg = false
          this.fromdateflg = false
          this.todateflg = false
          this.flgselection = true
          this.flgselected = false
          this.cmbDisplayOrder = true
          this.flgbutton = false
          this.docsflg = true

          this.lstColumn = [
            { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
            { col_name: 'Doc No', db_col: 'doc_no', flgLink: false, col_type: 'TAX' },
            { col_name: 'Doc Date', db_col: 'doc_date', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order No', db_col: 'qt_ult_cust_order_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Order Date', db_col: 'qt_ts_cust_order_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Party', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'RH', db_col: 'rh', flgLink: false, col_type: 'TXT' },
            { col_name: 'GH', db_col: 'gh', flgLink: false, col_type: 'TXT' },
            { col_name: 'Hand', db_col: 'hby', flgLink: false, col_type: 'TXT' },
            { col_name: 'Industry', db_col: 'ind_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Main Group', db_col: 'maingrp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Sub Group', db_col: 'subgrp_name', flgLink: false, col_type: 'TXT' },
            { col_name: 'Catref No', db_col: 'itm_catalog_ref_no', flgLink: false, col_type: 'TXT' },
            { col_name: 'Item Code', db_col: 'qtd_item_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Prod Code', db_col: 'it_prod_code', flgLink: false, col_type: 'TXT' },
            { col_name: 'Bal Qty', db_col: 'bal_qty', flgLink: false, col_type: 'NUM' },
            { col_name: 'Bal Value', db_col: 'bal_val', flgLink: false, col_type: 'NUM' },
            // { col_name: 'Type', db_col: 'doctype', flgLink: false, col_type: 'TXT' },
          ];
          this.lstDisplayCoumn = ['br_city', 'doc_no', 'doc_date', 'qt_ult_cust_order_no', 'qt_ts_cust_order_no', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'maingrp_name', 'subgrp_name', 'itm_catalog_ref_no', 'qtd_item_code', 'it_prod_code', 'bal_qty', 'bal_val']
          this.as_on_date = this.data.payload.as_on_date
          this.dataSource = []
          this.payload = this.data.payload
          this.rpt_type = this.data.rpt_type

          this.onSubmitQtn();
        }
      }
      else if (this.report_name == 'BRANCH_SALE') {
        // alert("here")
        this.dateflg = false
        this.fmdateflg = false
        this.todateotherflg = false
        this.todateflg = false
        this.trgFlg = false
        this.currentDtFlg = false
        // this.showFlag1 = true
        // this.showFlag2 = false
        if (this.data.rpt_type == 'YESTERDAY AMT') {
          this.yesterDateDate = new Date(this.yesterDateDate.setDate(this.yesterDateDate.getDate() - 1));
          this.form.get('dtFromDate')!.setValue(this.commonsService.date_ymd(this.yesterDateDate))
        }
        else if (this.data.rpt_type == 'TODAY AMT') {
          // this.form.get('dtFromDate').setValue(this.commonsService.date_ymd(this.yesterDateDate))
          this.form.get('dtFromDate')!.setValue(this.commonsService.date_ymd(this.data.payload.as_on_date))
        }

        console.log("this.data in branch sales======",this.data)

        // this.as_on_date = this.data.payload.as_on_date
        // if (this.data.rpt_type == 'YESTERDAY AMT') {
        //   this.yesterDateDate = new Date(this.yesterDateDate.setDate(this.yesterDateDate.getDate() - 1));
        //   this.payload.from_date = this.commonsService.date_ymd(this.yesterDateDate)
        // } else if (this.data.rpt_type == 'TODAY AMT') {
        //   this.payload.from_date = this.data.payload.as_on_date
        // }
        // this.payload.to_date = this.data.payload.as_on_date

        this.displaytypeflg = false
        this.periodtextflg = false
        this.flgselection = false
        this.flgselected = false
        this.cmbDisplayOrder = false
        this.flgbutton = false
        this.docsflg = false

        this.showStkValFlag = false

        this.lstColumn = [
          { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
          { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
          { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
          { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
          { col_name: 'Invoice No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
          { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
          { col_name: 'GP%', db_col: 'gp', flgLink: false, col_type: 'NUM' },
        ];
        this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'gp']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type

        console.log("this.payload in link====", this.payload)
        this.loadOSDetail();
      }
      else if (this.report_name == 'STOCK') {

        this.dateflg = false
        this.fmdateflg = false
        this.todateotherflg = false
        this.todateflg = false
        this.trgFlg = false
        this.currentDtFlg = false
        this.displaytypeflg = false
        this.periodtextflg = false
        this.flgselection = false
        this.flgselected = false
        this.cmbDisplayOrder = false
        this.flgbutton = false
        this.docsflg = false

        //flags for stock links
        this.showStkValFlag = true
        this.asOnDate = new Date();
        this.setDisplayType = '1'
        this.branchFlg = true
        this.getBranchList()
        this.lstColumn = [
          { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
          { col_name: 'Product', db_col: 'msv_itprod_code', flgLink: false, col_type: 'TXT' },
          { col_name: 'Item Code', db_col: 'msv_item_code', flgLink: false, col_type: 'TXT' },
          { col_name: 'Catalog Ref.No.', db_col: 'msv_catalog_ref_no', flgLink: false, col_type: 'TXT' },
          { col_name: 'Make', db_col: 'msv_make_code', flgLink: false, col_type: 'TXT' },
          { col_name: 'Value', db_col: 'bal_val', flgLink: false, col_type: 'NUM' },
        ];
        this.lstDisplayCoumn = ['br_city', 'msv_itprod_code', 'msv_item_code', 'msv_catalog_ref_no', 'msv_make_code', 'bal_val']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        this.onStockValSubmitClickHandler();
      }
    }
    else {
      this.flgRPDetail = 'N'
      this.dataSource = this.data.dataSource
      this.lstColumn = this.data.lstColumn
      this.lstDisplayCoumn = this.data.lstDisplayCoumn
      this.title = this.data.title
      this.dataSourceChart = this.data.dataSourceChart
      this.chartName=this.data.chartName
      this.flgViewChart = this.data.flgViewChart
    }
  }

  viewReport(element: any, col_name: any) {

    console.log("report_name check =", this.report_name)
    console.log("col_name check =", col_name)
    console.log("element check =", element)
    console.log("data check =", this.value)
    this.showFlag1 = false;
    this.showFlag2 = true;
    this.table2 = true
    this.dateflg = false
    this.fmdateflg = false
    this.todateotherflg = false
    this.todateflg = false
    this.trgFlg = false
    this.currentDtFlg = false
    this.displaytypeflg = false
    this.periodtextflg = false
    this.flgselection = false
    this.flgselected = false
    this.cmbDisplayOrder = false
    this.flgbutton = false
    this.docsflg = false
    this.displaytypeflg = false
    this.periodtextflg = false
    this.fromdateflg = false
    this.todateflg = false
    this.showStkValFlag = false
    console.log("this.data.title=", this.data.title)


    this.dataSource1 = []
    // this.payload = this.data.payload

    this.as_on_date = this.data.payload.as_on_date
    if (col_name == 'YESTERDAY AMT') {
      this.yesterDateDate = new Date(this.yesterDateDate.setDate(this.yesterDateDate.getDate() - 1));
      this.payload.from_date = this.commonsService.date_ymd(this.yesterDateDate)
    } else {
      this.payload.from_date = this.data.payload.as_on_date
    }
    this.payload.rpt_type = col_name
    this.payload.to_date = this.data.payload.as_on_date
    this.payload.siscon_code = this.data.payload.siscon_code
    this.payload.branch_code = this.data.payload.branch_code
    this.payload.doc_type = element.dst_doc_type

    console.log("this.payload =", this.payload)
    console.log("this.data.title =", this.data.title)
    console.log("this.data.dataSource =", this.data.dataSource)

    if (this.data.title == "BRANCH SALES") {
      this.branch = element.branch
      console.log(" this.branch ", this.branch)

      if (this.payload.doc_type == "SALES") {


        this.lstColumn1 = [
          { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Cust Code', db_col1: 'ch_cust_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Cust Name', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Handled By', db_col1: 'handle_by', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Group Head', db_col1: 'group_head', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Invoice No', db_col1: 'inv_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Net Amount', db_col1: 'ch_gross_amt', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'GP%', db_col1: 'gp', flgLink1: false, col_type1: 'NUM' },
        ];

        this.lstDisplayCoumn1 = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'gp']

        if (this.branch == "ALL INDIA") {

          this.payload['siscon_code'] = "ALL"
          this.payload['branch_code'] = "ALL"
          console.log(" payload in if block ", this.payload)

          this.objservice.getSalesDetail(this.payload).subscribe((item: any) => {
            if (item.responseStatus === 'SUCCESS' && item.responseCode === 'RES_200') {
              this.dataSource1 = item.responseData[0]
            }
          })
        }
        else {
          this.utilityService.getBranchList().toPromise().then(
            data => {
              if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                this.branchLst = data.responseData.map((item: any) => {
                  return new BranchModel(item.br_name, item.br_branch_code, item.br_siscon_code, item.br_city)
                })
              }
              this.tooSelected = this.branchLst.find(c => c.branch_city.toLowerCase() == this.branch.toLowerCase())

              this.payload['siscon_code'] = this.tooSelected.siscon_code
              this.payload['branch_code'] = this.tooSelected.branch_code
              console.log(" payload in else block ", this.payload)

              this.objservice.getSalesDetail(this.payload).subscribe((item: any) => {
                if (item.responseStatus === 'SUCCESS' && item.responseCode === 'RES_200') {
                  this.dataSource1 = item.responseData[0]
                }
              })

            }
          ).finally(() => { }).then(() => { })

        }
      } else {

        if (this.branch == "ALL INDIA") {
          this.payload['siscon_code'] = "ALL"
          this.payload['branch_code'] = "ALL"
          console.log(" payload in if block ", this.payload)

          this.objservice.getBranchSalesDocTypeDetail(this.payload).subscribe((data: any) => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.dataSource1 = data.responseData[0]
            }
          })
        }
        else {
          this.utilityService.getBranchList().toPromise().then(
            data => {
              if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                this.branchLst = data.responseData.map((item: any) => {
                  return new BranchModel(item.br_name, item.br_branch_code, item.br_siscon_code, item.br_city)
                })
              }
              this.tooSelected = this.branchLst.find(c => c.branch_city.toLowerCase() == this.branch.toLowerCase())

              this.payload['siscon_code'] = this.tooSelected.siscon_code
              this.payload['branch_code'] = this.tooSelected.branch_code
              console.log(" payload in else block ", this.payload)

              this.objservice.getBranchSalesDocTypeDetail(this.payload).subscribe(data => {
                if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                  this.dataSource1 = data.responseData[0]
                }
              })

            }
          ).finally(() => { }).then(() => { })

        }
        if (this.payload.doc_type == "COLLECTION" || this.payload.doc_type == "PAYMENT") {

          this.lstColumn1 = [
            { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Code', db_col1: 'ch_cust_code', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Name', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Handled By', db_col1: 'handle_by', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Group Head', db_col1: 'group_head', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Invoice No', db_col1: 'inv_no', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Net Amount', db_col1: 'ch_gross_amt', flgLink1: false, col_type1: 'NUM' },
          ];
          this.lstDisplayCoumn1 = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt']
        }
        if (this.payload.doc_type == "AO") {
          this.lstColumn1 = [
            { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Code', db_col1: 'ch_cust_code', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Name', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Handled By', db_col1: 'handle_by', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Group Head', db_col1: 'group_head', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Doc No', db_col1: 'inv_no', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Net Amount', db_col1: 'ch_gross_amt', flgLink1: false, col_type1: 'NUM' },
            { col_name1: 'Order No', db_col1: 'ao_cust_order_no', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Order Date', db_col1: 'ao_ts_cust_order_no', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Type', db_col1: 'ao_src_code', flgLink1: false, col_type1: 'TXT' },
          ];
          this.lstDisplayCoumn1 = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'ao_cust_order_no',
            'ao_ts_cust_order_no', 'ao_src_code']
        }
        if (this.payload.doc_type == "PO") {

          this.lstColumn1 = [
            { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Code', db_col1: 'ch_cust_code', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Cust Name', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Handled By', db_col1: 'handle_by', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Group Head', db_col1: 'group_head', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Doc No', db_col1: 'inv_no', flgLink1: false, col_type1: 'TXT' },
            { col_name1: 'Net Amount', db_col1: 'ch_gross_amt', flgLink1: false, col_type1: 'NUM' },
            { col_name1: 'Type', db_col1: 'po_src_code', flgLink1: false, col_type1: 'TXT' },
          ];
          this.lstDisplayCoumn1 = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'po_src_code']
        }
        // this.objservice.getBranchSalesDocTypeDetail(this.payload).subscribe(data => {
        //   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //     this.dataSource1 = data.responseData[0]
        //   }
        // })
      }
    }

    else if (this.data.title == 'PENDING DOCS') {

      this.flgRPDetail = 'Y'
      this.showStkValFlag = false
      this.docsflg = true
      this.selectedDisplayOrder = "BR"

      this.data.rpt_type = element.name
      this.form.get('cmbBranchList')!.setValue(new BranchModel(
        atob(sessionStorage.getItem(btoa('usr_br_name')) || ''),
        atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        atob(sessionStorage.getItem(btoa('usr_br_city')) || '')))

      if (this.selectedDisplayOrder == 'BR') {
        this.branchFlg = true
        this.flgitemmaingroup = false
        this.flgitemsubgroup = false
        this.flgindustry = false
        this.getBranchList()
      }

      if (element.name == 'PO VALUE') {

        this.title = this.data.rpt_type
        this.displaytypeflg = false
        this.periodtextflg = false
        this.fromdateflg = false
        this.todateflg = false
        this.flgselection = false
        this.flgselected = true
        this.cmbDisplayOrder = true
        this.flgbutton = false
        this.docsflg = true

        this.lstColumn1 = [
          { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Doc No', db_col1: 'doc_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Doc Date', db_col1: 'doc_date', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order No', db_col1: 'po_ult_cust_ord_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order Date', db_col1: 'po_ts_ult_cust_ord', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Party', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'RH', db_col1: 'rh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'GH', db_col1: 'gh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Hand', db_col1: 'hby', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Industry', db_col1: 'ind_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Main Group', db_col1: 'grp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Sub Group', db_col1: 'subgrp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Catref No', db_col1: 'itm_catalog_ref_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Item Code', db_col1: 'pod_item_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Prod Code', db_col1: 'it_prod_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Bal Qty', db_col1: 'bal_qty', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'Bal Value', db_col1: 'bal_val', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'Type', db_col1: 'po_src_code', flgLink1: false, col_type1: 'TXT' },
        ];
        this.lstDisplayCoumn1 = ['br_city', 'doc_no', 'doc_date', 'po_ult_cust_ord_no', 'po_ts_ult_cust_ord', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'grp_name', 'subgrp_name', 'itm_catalog_ref_no', 'pod_item_code', 'it_prod_code', 'bal_qty', 'bal_val', 'po_src_code']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource1 = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        let selection_type = this.form.controls.cmbSelection.value
        this.payload.selection_type = selection_type
        let display_order = this.form.controls.cmbDisplayOrder.value
        this.payload.display_order = display_order
        let branch = this.form.controls.cmbBranchList.value
        this.payload.branch = branch
        let main_group = this.form.controls.cmbItemMainGroup.value
        this.payload.main_group = main_group
        let sub_group = this.form.controls.cmbItemSubGroup.value
        this.payload.sub_group = sub_group
        let industry = this.form.controls.cmbIndustry.value
        this.payload.industry = industry
        this.payload.rpt_type = this.rpt_type

        this.objservice.getPendingDocsAo(this.payload).
          subscribe((data: any) => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.dataSource1 = data.responseData[0]
            }
          })
      }
      else if (element.name == 'AO VALUE') {

        this.title = this.data.rpt_type
        this.displaytypeflg = false
        this.periodtextflg = false
        this.fromdateflg = false
        this.todateflg = false
        this.flgselection = false
        this.flgselected = true
        this.cmbDisplayOrder = true
        this.flgbutton = false
        this.docsflg = true

        this.lstColumn1 = [
          { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Doc No', db_col1: 'doc_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Doc Date', db_col1: 'doc_date', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order No', db_col1: 'ao_cust_order_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order Date', db_col1: 'ao_ts_cust_order_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Party', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'RH', db_col1: 'rh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'GH', db_col1: 'gh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Hand', db_col1: 'hby', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Industry', db_col1: 'ind_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Main Group', db_col1: 'grp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Sub Group', db_col1: 'subgrp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Catref No', db_col1: 'itm_catalog_ref_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Item Code', db_col1: 'aod_item_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Prod Code', db_col1: 'it_prod_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Bal Qty', db_col1: 'bal_qty', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'Bal Value', db_col1: 'bal_val', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'Type', db_col1: 'ao_source_type', flgLink1: false, col_type1: 'TXT' },
        ];
        this.lstDisplayCoumn1 = ['br_city', 'doc_no', 'doc_date', 'ao_cust_order_no', 'ao_ts_cust_order_no', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'grp_name', 'subgrp_name', 'itm_catalog_ref_no', 'aod_item_code', 'it_prod_code', 'bal_qty', 'bal_val', 'ao_source_type']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource1 = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        let selection_type = this.form.controls.cmbSelection.value
        this.payload.selection_type = selection_type
        let display_order = this.form.controls.cmbDisplayOrder.value
        this.payload.display_order = display_order
        let branch = this.form.controls.cmbBranchList.value
        this.payload.branch = branch
        let main_group = this.form.controls.cmbItemMainGroup.value
        this.payload.main_group = main_group
        let sub_group = this.form.controls.cmbItemSubGroup.value
        this.payload.sub_group = sub_group
        let industry = this.form.controls.cmbIndustry.value
        this.payload.industry = industry
        this.payload.rpt_type = this.rpt_type

        this.objservice.getPendingDocsAo(this.payload).
          subscribe((data: any) => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.dataSource1 = data.responseData[0]
            }
          })
      }
      else if (element.name == 'QOT VALUE') {

        this.title = 'QUOTATION VALUE'
        this.displaytypeflg = false
        this.periodtextflg = false
        this.fromdateflg = false
        this.todateflg = false
        this.flgselection = false
        this.flgselected = true
        this.cmbDisplayOrder = true
        this.flgbutton = false
        this.docsflg = true

        this.lstColumn1 = [
          { col_name1: 'Branch', db_col1: 'br_city', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Doc No', db_col1: 'doc_no', flgLink1: false, col_type1: 'TAX' },
          { col_name1: 'Doc Date', db_col1: 'doc_date', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order No', db_col1: 'qt_ult_cust_order_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Order Date', db_col1: 'qt_ts_cust_order_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Party', db_col1: 'cs_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'RH', db_col1: 'rh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'GH', db_col1: 'gh', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Hand', db_col1: 'hby', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Industry', db_col1: 'ind_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Main Group', db_col1: 'maingrp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Sub Group', db_col1: 'subgrp_name', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Catref No', db_col1: 'itm_catalog_ref_no', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Item Code', db_col1: 'qtd_item_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Prod Code', db_col1: 'it_prod_code', flgLink1: false, col_type1: 'TXT' },
          { col_name1: 'Bal Qty', db_col1: 'bal_qty', flgLink1: false, col_type1: 'NUM' },
          { col_name1: 'Bal Value', db_col1: 'bal_val', flgLink1: false, col_type1: 'NUM' },
          // { col_name: 'Type', db_col: 'doctype', flgLink: false, col_type: 'TXT' },
        ];
        this.lstDisplayCoumn1 = ['br_city', 'doc_no', 'doc_date', 'qt_ult_cust_order_no', 'qt_ts_cust_order_no', 'cs_name', 'rh', 'gh', 'hby', 'ind_name', 'maingrp_name', 'subgrp_name', 'itm_catalog_ref_no', 'qtd_item_code', 'it_prod_code', 'bal_qty', 'bal_val']
        this.as_on_date = this.data.payload.as_on_date
        this.dataSource1 = []
        this.payload = this.data.payload
        this.rpt_type = this.data.rpt_type
        let selection_type = this.form.controls.cmbSelection.value
        this.payload.selection_type = selection_type
        let display_order = this.form.controls.cmbDisplayOrder.value
        this.payload.display_order = display_order
        let branch = this.form.controls.cmbBranchList.value
        this.payload.branch = branch
        let main_group = this.form.controls.cmbItemMainGroup.value
        this.payload.main_group = main_group
        let sub_group = this.form.controls.cmbItemSubGroup.value
        this.payload.sub_group = sub_group
        let industry = this.form.controls.cmbIndustry.value
        this.payload.industry = industry
        this.payload.rpt_type = this.rpt_type

        this.objservice.getPendingDocsQtn(this.payload).
          subscribe((data: any) => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.dataSource1 = data.responseData[0]
            }
          })
      }
    }
  }
  loadPendingDocs() {

    if (this.selectedDisplayOrder == 'BR') {
      this.branchFlg = true
      this.flgitemmaingroup = false
      this.flgitemsubgroup = false
      this.flgindustry = false
      this.getBranchList()
    } else if (this.selectedDisplayOrder == 'ITMAIN') {
      this.branchFlg = false
      this.flgitemmaingroup = true
      this.flgitemsubgroup = true
      this.flgindustry = false
      this.getItemMainGroupList()
      this.getItemSubGroupList(-1)
    } else if (this.selectedDisplayOrder == 'ITSUB') {
      this.branchFlg = false
      this.flgitemsubgroup = true
      this.flgitemmaingroup = false
      this.flgindustry = false
      this.getItemSubGroupList(-1)
    } else if (this.selectedDisplayOrder == 'INTRY') {
      this.flgitemmaingroup = false
      this.flgitemsubgroup = false
      this.branchFlg = false
      this.flgindustry = true
      this.getIndustryTypeList()
    }
  }
  getItemMainGroupList() {
    this.utilityService.getGroupList().subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.itemMainGroupList = data.responseData.map((item: any) => {
          return new GroupModel(item.group_code, item.group_name)
        })
      }
      return this.itemMainGroupList
    },
      error => {
        console.log(error)
      }
    )
  }

  onGroupChange(event: any, group_code: number): void {
    if (event.source.selected) {
      this.getItemSubGroupList(group_code)
    }
  }

  getItemSubGroupList(group_code: number) {
    this.utilityService.getSubGroupList(group_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.itemSubGroupList = data.responseData.map((item: any) => {
            return new GroupModel(item.group_code, item.main_group_name)
          })
        }
        // removing ALL option from list
        // this.itemSubGroupList.splice(0, 1);
        return this.itemSubGroupList
      },
      error => {
        console.log(error)
      }
    )
  }


  loadOSDetail() {
    let as_on_date = this.as_on_date
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    this.payload.as_on_date = as_on_date
    this.payload.period = this.selectedPeriod
    this.payload.display_type = this.selectedDisplayType
    this.payload.rpt_type = this.rpt_type
    let from_date = this.form.controls.dtFromDate.value
    this.payload.from_date = from_date
    let to_date = this.form.controls.dtToDate.value
    this.payload.to_date = to_date

    this.showStkValFlag = false

    if (this.report_name == 'RECEIVABLE') {

      this.displaytypeflg = true
      this.periodtextflg = true
      this.fromdateflg = false
      this.todateflg = false
      this.docsflg = false

      if (this.selectedDisplayType == '1') {
        this.lstColumn = [{ col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' }]
        this.lstDisplayCoumn = ['br_city']
      }
      else if (this.selectedDisplayType == '2') {
        this.lstColumn = [
          { col_name: 'RH', db_col: 'rh_name', flgLink: false, col_type: 'TXT' }]
        this.lstDisplayCoumn = ['rh_name']
      }
      else if (this.selectedDisplayType == '3') {
        this.lstColumn = [
          { col_name: 'RH', db_col: 'rh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'GH', db_col: 'gh_name', flgLink: false, col_type: 'TXT' },]
        this.lstDisplayCoumn = ['rh_name', 'gh_name']
      }
      else if (this.selectedDisplayType == '4') {
        this.lstColumn = [
          { col_name: 'RH', db_col: 'rh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'GH', db_col: 'gh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'HB', db_col: 'hb_name', flgLink: false, col_type: 'TXT' },]
        this.lstDisplayCoumn = ['rh_name', 'gh_name', 'hb_name']
      }
      else if (this.selectedDisplayType == '5') {
        this.lstColumn = [
          { col_name: 'RH', db_col: 'rh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'GH', db_col: 'gh_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'HB', db_col: 'hb_name', flgLink: false, col_type: 'TXT' },
          { col_name: 'Code', db_col: 'cob_cust_code', flgLink: false, col_type: 'TAX' },
          { col_name: 'Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },]
        this.lstDisplayCoumn = ['rh_name', 'gh_name', 'hb_name', 'cob_cust_code', 'cs_name']
      }
      else if (this.selectedDisplayType == '6') {
        this.lstColumn = [{ col_name: 'Industry', db_col: 'ind_industry', flgLink: false, col_type: 'TXT' },]
        this.lstDisplayCoumn = ['ind_industry']
      }
      this.objservice.getOSDetail(this.payload).
        subscribe((data: any) => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            let index = 0;
            data.responseData[0].forEach((element: any) => {
              console.log("element===", element)
              this.lstColumn.push({ col_name: element.os_desc, db_col: 'os_amt' + element.os_code, flgLink: false, col_type: 'NUM_WO_DECIMAL' })
              this.lstDisplayCoumn.push('os_amt' + element.os_code)
              index++;
            });
            this.lstColumn.push({ col_name: 'Total OS', db_col: 'total_os', flgLink: false, col_type: 'NUM_WO_DECIMAL' })
            this.lstDisplayCoumn.push('total_os')
            this.dataSource = data.responseData[1]
          }
        })
    }
    else if (this.report_name == 'SALES' || this.report_name == "BRANCH_SALE") {
      this.docsflg = false
      // this.showFlag1 = true
      // this.showFlag2 = false
      this.onSubmitClickHandler()
    }
    else if (this.report_name == 'DOCS') {
      this.docsflg = true
      // this.showFlag1 = true
      // this.showFlag2 = false
      if (this.title == "AO VALUE") {
        this.title = "PENDING AO"
      }
      if (this.title == "QOT VALUE") {
        this.title = "PENDING QUOTATION"
      }
      if (this.title == "PO VALUE") {
        this.title = "PENDING PO"
      }
      if (this.selectedDisplayOrder == 'BR') {
        this.branchFlg = true
        this.flgitemmaingroup = false
        this.flgitemsubgroup = false
        this.flgindustry = false
        this.getBranchList()
      } else if (this.selectedDisplayOrder == 'ITMAIN') {
        this.branchFlg = false
        this.flgitemmaingroup = true
        this.flgitemsubgroup = true
        this.flgindustry = false
        this.getItemMainGroupList()
        this.getItemSubGroupList(-1)
      } else if (this.selectedDisplayOrder == 'ITSUB') {
        this.branchFlg = false
        this.flgitemsubgroup = true
        this.flgitemmaingroup = false
        this.flgindustry = false
        this.getItemSubGroupList(-1)
      } else if (this.selectedDisplayOrder == 'INTRY') {
        this.flgitemmaingroup = false
        this.flgitemsubgroup = false
        this.branchFlg = false
        this.flgindustry = true
        this.getIndustryTypeList()
      }
    }
    else if (this.report_name == 'STOCK') {
      this.docsflg = false
      this.showStkValFlag = true
      this.selectedDisplayOrder = this.form.get("cmbSelOption")!.value
      this.asOnDate = new Date();
      this.form.get('txtAsOnDate')!.setValue(this.asOnDate);
      this.form.get("cmbBranchList")!.setValue("");
      this.form.get("cmbItemMainGroup")!.setValue("");
      this.form.get("cmbMake")!.setValue("");
      this.form.get("cmbItem")!.setValue("");

      if (this.selectedDisplayOrder == '1') {
        this.branchFlg = true
        this.flgitemmaingroup = false
        this.flgitemsubgroup = false
        this.flgindustry = false
        this.getBranchList();
        this.form.get('cmbBranchList')!.setValue(new BranchModel(
          atob(sessionStorage.getItem(btoa('usr_br_name')) || ''),
          atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
          atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
          atob(sessionStorage.getItem(btoa('usr_br_city')) || '')))

      } else if (this.selectedDisplayOrder == '2') {
        this.branchFlg = false
        this.flgitemmaingroup = true
        this.flgitemsubgroup = false
        this.flgindustry = false
        this.getItemMainGroupList()
      } else if (this.selectedDisplayOrder == '3') {
        this.branchFlg = false
        this.flgitemmaingroup = false
        this.flgitemsubgroup = true
        this.flgindustry = false
        this.getMakeList();
      } else if (this.selectedDisplayOrder == '4') {
        this.branchFlg = false
        this.flgitemmaingroup = false
        this.flgitemsubgroup = false
        this.flgindustry = true
      }
    }

  }

  onSubmitClickHandler(): boolean {

    let as_on_date = this.as_on_date
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    this.payload.as_on_date = as_on_date

    this.payload.period = this.selectedPeriod
    this.payload.display_type = this.selectedDisplayType
    this.payload.rpt_type = this.rpt_type

    let from_date = this.form.controls.dtFromDate.value
    this.payload.from_date = from_date

    let to_date = this.form.controls.dtToDate.value
    this.payload.to_date = to_date

    if (new Date(from_date) > new Date(to_date)) {
      this.openSnackBar("From Date Should Not Be Greater Than To Date");
      return false;
    }

    if (this.report_name == 'SALES') {
      this.payload.siscon_code = this.data.payload.siscon_code
      this.payload.branch_code = this.data.payload.branch_code
      this.getSalesDetail();
    } else {

      this.doc_type = this.data.doc_type
      console.log(" doc_type ", this.doc_type)

      this.branch = this.data.branch
      console.log(" this.branch ", this.branch)

      if (this.doc_type == "SALES") {

        if (this.branch == "ALL INDIA") {
          this.data.payload.siscon_code = "ALL"
          this.data.payload.branch_code = "ALL"
          this.getSalesDetail();
        }
        else {
          this.utilityService.getBranchList().subscribe(data => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.branchList = data.responseData.map((item: any )=> {
                return new BranchModel(item.br_name, item.br_branch_code, item.br_siscon_code, item.br_city)
              })
            }

            const toSelected: any = this.branchList.find(c => c.branch_city.toLowerCase() == this.branch.toLowerCase())
            console.log(" toSelected ", toSelected)
            this.data.payload.siscon_code = toSelected.siscon_code
            this.data.payload.branch_code = toSelected.branch_code
            this.getSalesDetail();
          },
            error => {
              console.log(error)
            }
          )
        }
      } else {
        this.getBranchDocTypeDetails();
      }
    }
    return true
  }

  getSalesDetail() {
    // alert("here")
    this.displaytypeflg = false
    this.periodtextflg = false
    // this.showFlag1 = false

    if (this.report_name == 'SALES') {
      this.fromdateflg = true
      this.todateflg = true
    }
    if (this.branch == "ALL INDIA") {
      this.data.payload.siscon_code = "ALL"
      this.data.payload.branch_code = "ALL"
    }

    console.log("this.payload check=", this.payload)
    this.objservice.getSalesDetail(this.payload).subscribe((item: any) => {
      console.log("data=", item)
      if (item.responseStatus === 'SUCCESS' && item.responseCode === 'RES_200') {
        this.dataSource = item.responseData[0]
        // console.log(" this.dataSource1=", this.dataSource1)
      }
    })
  }

  getBranchDocTypeDetails() {

    console.log(' getBranchDocTypeDetails ')
    this.payload.doc_type = this.doc_type

    console.log("this.branch ", this.branch)

    if (this.branch == "ALL INDIA") {
      this.data.payload.siscon_code = "ALL"
      this.data.payload.branch_code = "ALL"
      this.getBranchSalesDetail();
    }
    else {
      this.utilityService.getBranchList().subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.branchList = data.responseData.map((item: any)=> {
            return new BranchModel(item.br_name, item.br_branch_code, item.br_siscon_code, item.br_city)
          })
        }
        const toSelected = this.branchList.find(c => c.branch_city.toLowerCase() == this.branch.toLowerCase())
        console.log(" toSelected ", toSelected)
        this.data.payload.siscon_code = toSelected!.siscon_code
        this.data.payload.branch_code = toSelected!.branch_code
        this.getBranchSalesDetail();
      },
        error => {
          console.log(error)
        }
      )
    }
  }

  getBranchSalesDetail() {
    console.log(" getBranchSalesDetail ")
    this.displaytypeflg = false
    this.periodtextflg = false
    this.fromdateflg = false
    this.todateflg = false
    this.showFlag2 = false
    this.showFlag1 = true
    this.table2 = false
    if (this.payload.doc_type == "SALES") {
      this.lstColumn = [
        { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
        { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
        { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
        { col_name: 'Invoice No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
        { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
        { col_name: 'GP%', db_col: 'gp', flgLink: false, col_type: 'NUM' },
      ];
      this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'gp']
      this.objservice.getSalesDetail(this.payload).subscribe((item: any) => {
        if (item.responseStatus === 'SUCCESS' && item.responseCode === 'RES_200') {
          this.dataSource = item.responseData[0]
        }
      })
    }
    if (this.doc_type == "COLLECTION" || this.doc_type == "PAYMENT") {
      this.lstColumn = [
        { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
        { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
        { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
        { col_name: 'Invoice No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
        { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
      ];
      this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt']
    }
    if (this.doc_type == "AO") {
      this.lstColumn = [
        { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
        { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
        { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
        { col_name: 'Doc No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
        { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
        { col_name: 'Order No', db_col: 'ao_cust_order_no', flgLink: false, col_type: 'TXT' },
        { col_name: 'Order Date', db_col: 'ao_ts_cust_order_no', flgLink: false, col_type: 'DATE' },
        { col_name: 'Type', db_col: 'ao_src_code', flgLink: false, col_type: 'TXT' },
      ];
      this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'ao_cust_order_no',
        'ao_ts_cust_order_no', 'ao_src_code']
    }
    if (this.doc_type == "PO") {

      this.lstColumn = [
        { col_name: 'Branch', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Code', db_col: 'ch_cust_code', flgLink: false, col_type: 'TXT' },
        { col_name: 'Cust Name', db_col: 'cs_name', flgLink: false, col_type: 'TXT' },
        { col_name: 'Handled By', db_col: 'handle_by', flgLink: false, col_type: 'TXT' },
        { col_name: 'Group Head', db_col: 'group_head', flgLink: false, col_type: 'TXT' },
        { col_name: 'Doc No', db_col: 'inv_no', flgLink: false, col_type: 'TXT' },
        { col_name: 'Net Amount', db_col: 'ch_gross_amt', flgLink: false, col_type: 'NUM' },
        { col_name: 'Type', db_col: 'po_src_code', flgLink: false, col_type: 'TXT' },
      ];
      this.lstDisplayCoumn = ['br_city', 'ch_cust_code', 'cs_name', 'handle_by', 'group_head', 'inv_no', 'ch_gross_amt', 'po_src_code']
    }
    this.objservice.getBranchSalesDocTypeDetail(this.payload).subscribe((data: any) => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.dataSource = data.responseData[0]
      }
    })
  }

  onStockValSubmitClickHandler(): boolean {

    console.log(" branch ", this.form.get("cmbBranchList")!.value)
    console.log(" cmbItemMainGroup ", this.form.get("cmbItemMainGroup")!.value)
    console.log(" cmbMake ", this.form.get("cmbMake")!.value)
    console.log(" cmbItem ", this.form.get("cmbItem")!.value)

    this.payload.as_on_date = this.getFormattedDate(this.form.get("txtAsOnDate")!.value);
    this.payload.display_order = this.form.get("cmbSelOption")!.value
    let display_order = this.form.get("cmbSelOption")!.value

    if (display_order == '1') {
      if ((this.form.get('cmbBranchList')!.value == null || this.form.get('cmbBranchList')!.value == '')) {
        this.openSnackBar("Please Select Branch ");
        return false
      } else {
        let branch = this.form.get("cmbBranchList")!.value
        if (branch.branch_city == "All") {
          this.payload.siscon_code = "ALL"
          this.payload.branch_code = "ALL"
        } else {
          this.payload.siscon_code = branch.siscon_code
          this.payload.branch_code = branch.branch_code
        }
      }
    } else {
      this.payload.siscon_code = ""
      this.payload.branch_code = ""
    }

    if (display_order == '2') {
      if ((this.form.get('cmbItemMainGroup')!.value == null || this.form.get('cmbItemMainGroup')!.value == '')) {
        this.openSnackBar("Please Select Product ");
        return false
      } else {
        this.payload.main_group = this.form.get("cmbItemMainGroup")!.value;
      }
    } else {
      this.payload.main_group = ""
    }

    if (display_order == '3') {
      if ((this.form.get('cmbMake')!.value == null || this.form.get('cmbMake')!.value == '')) {
        this.openSnackBar("Please Select make ");
        return false
      } else {
        let makeCode = this.form.get("cmbMake")!.value
        if (makeCode.mk_desc == "All") {
          this.payload.make_code = "ALL"
        } else {
          this.payload.make_code = makeCode.make_code
        }
      }
    } else {
      this.payload.make_code = ""
    }

    if (display_order == '4') {
      if ((this.form.get('cmbItem')!.value == null || this.form.get('cmbItem')!.value == '')) {
        this.openSnackBar("Please Select Item details ");
        return false
      } else {
        let itemCode = this.form.get("cmbItem")!.value
        if (itemCode.mk_desc == "All") {
          this.payload.item_code = itemCode.item_code
        }
      }
    } else {
      this.payload.item_code = ""
    }

    this.payload.rpt_type = this.rpt_type
    this.doc_type = this.data.doc_type

    console.log(" onStockValSubmitClickHandler payload ", this.payload)
    this.objservice.getStockValuationData(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.dataSource = data.responseData[0]
          //this.form.reset()          
        }
      });
      return true
  }

  onSubmitShow() {

    let selection_type = this.form.controls.cmbSelection.value
    this.payload.selection_type = selection_type
    if (selection_type == "BR") {
      let branch = this.form.controls.cmbBranchList.value
      this.payload.branch = branch
      let display_order = this.form.controls.cmbDisplayOrder.value
      this.payload.display_order = display_order
      let selection_type = this.form.controls.cmbSelection.value
      this.payload.selection_type = selection_type
      this.form.controls.cmbIndustry.reset()
      this.form.controls.cmbItemMainGroup.reset()
      this.form.controls.cmbItemSubGroup.reset()
    } else if (selection_type == "INTRY") {
      let display_order = this.form.controls.cmbDisplayOrder.value
      this.payload.display_order = display_order
      let industry = this.form.controls.cmbIndustry.value
      this.payload.industry = industry
      let selection_type = this.form.controls.cmbSelection.value
      this.payload.selection_type = selection_type
      this.form.controls.cmbBranchList.reset()
      this.form.controls.cmbItemMainGroup.reset()
      this.form.controls.cmbItemSubGroup.reset()
    } else if (selection_type == "ITMAIN") {
      let display_order = this.form.controls.cmbDisplayOrder.value
      this.payload.display_order = display_order
      let main_group = this.form.controls.cmbItemMainGroup.value
      this.payload.main_group = main_group
      let sub_group = this.form.controls.cmbItemSubGroup.value
      this.payload.sub_group = sub_group
      let selection_type = this.form.controls.cmbSelection.value
      this.payload.selection_type = selection_type
      this.form.controls.cmbBranchList.reset()
      this.form.controls.cmbIndustry.reset()
    }

    this.payload.rpt_type = this.rpt_type
    console.log("this.payload test=", this.payload)
    console.log("selection_type test=", selection_type)

    if (this.data.rpt_type == 'PO VALUE') {
      this.onSubmitPo()
      //this.form.reset()
    } else if (this.data.rpt_type == 'AO VALUE') {
      this.onSubmitAo()
      //this.form.reset()
    } else if (this.data.rpt_type == 'QOT VALUE') {
      this.onSubmitQtn()
      //this.form.reset()
    }
    if (this.data.title == "PENDING DOCS") {
      if (this.rpt_type == 'PO VALUE') {
        this.objservice.getPendingDocsPo(this.payload).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.dataSource1 = data.responseData[0]
          } else if (data.responseStatus === 'FAILURE' && data.responseStatus === 'RES_109') {
            this.openSnackBar("NO DATA FOUND")
          }
        })
      } else if (this.rpt_type == 'AO VALUE') {
        this.objservice.getPendingDocsAo(this.payload).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.dataSource1 = data.responseData[0]
          } else if (data.responseStatus === 'FAILURE' && data.responseStatus === 'RES_109') {
            this.openSnackBar("NO DATA FOUND")
          }
        })
      } else if (this.rpt_type == 'QOT VALUE') {
        this.objservice.getPendingDocsQtn(this.payload).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.dataSource1 = data.responseData[0]
          } else if (data.responseStatus === 'FAILURE' && data.responseStatus === 'RES_109') {
            this.openSnackBar("NO DATA FOUND")
          }
        })
      }
    }
  }

  onSubmitAo() {

    let selection_type = this.form.controls.cmbSelection.value
    this.payload.selection_type = selection_type
    let display_order = this.form.controls.cmbDisplayOrder.value
    this.payload.display_order = display_order
    let branch = this.form.controls.cmbBranchList.value
    this.payload.branch = branch
    let main_group = this.form.controls.cmbItemMainGroup.value
    this.payload.main_group = main_group
    let sub_group = this.form.controls.cmbItemSubGroup.value
    this.payload.sub_group = sub_group
    let industry = this.form.controls.cmbIndustry.value
    this.payload.industry = industry
    this.payload.rpt_type = this.rpt_type

    this.objservice.getPendingDocsAo(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.loadOSDetail();
          this.dataSource = data.responseData[0]

          //this.form.reset()
        }
      })
  }

  onSubmitPo() {

    let selection_type = this.form.controls.cmbSelection.value
    this.payload.selection_type = selection_type
    let display_order = this.form.controls.cmbDisplayOrder.value
    this.payload.display_order = display_order
    let branch = this.form.controls.cmbBranchList.value
    this.payload.branch = branch
    let main_group = this.form.controls.cmbItemMainGroup.value
    this.payload.main_group = main_group
    let sub_group = this.form.controls.cmbItemSubGroup.value
    this.payload.sub_group = sub_group
    let industry = this.form.controls.cmbIndustry.value
    this.payload.industry = industry
    this.payload.rpt_type = this.rpt_type

    this.objservice.getPendingDocsPo(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.loadOSDetail();
          this.dataSource = data.responseData[0]
          //this.form.reset()
        }
      })
  }

  onSubmitQtn() {

    let selection_type = this.form.controls.cmbSelection.value
    this.payload.selection_type = selection_type
    let display_order = this.form.controls.cmbDisplayOrder.value
    this.payload.display_order = display_order
    let branch = this.form.controls.cmbBranchList.value
    this.payload.branch = branch
    let main_group = this.form.controls.cmbItemMainGroup.value
    this.payload.main_group = main_group
    let sub_group = this.form.controls.cmbItemSubGroup.value
    this.payload.sub_group = sub_group
    let industry = this.form.controls.cmbIndustry.value
    this.payload.industry = industry
    this.payload.rpt_type = this.rpt_type

    this.objservice.getPendingDocsQtn(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.loadOSDetail();
          this.dataSource = data.responseData[0]
          //this.form.reset()
        }
        // else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
        //   this.openSnackBar("NO DATA FOUND")
        // }
      })
  }

  /* * Branch List
   * Contains 2 Functionalities:
   * getBranchList: Fetches data from API
   * compareBranch: Setting a value
   */
  getBranchList(): void {
    this.utilityService.getBranchList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.branchList = data.responseData.map((item: any) => {
            return new BranchModel(
              item.br_name,
              item.br_branch_code,
              item.br_siscon_code,
              item.br_city
            )
          })
        }
        return this.branchList
      },
      error => {
        console.log(error)
      }
    )
    console.log(" this.branchList", this.branchList)
  }

  compareBranch(selected: BranchModel, toSelect: BranchModel): boolean {
    if (selected.branch_code == toSelect.branch_code) {
      return true
    } else {
      return false
    }
  }


  getIndustryTypeList() {
    this.utilityService.getIndustryList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.industryTypeList = data.responseData[0].map((item: any) => {
            return new ElementModel(item.ind_industry_code, item.ind_industry)
          })
        }
        return this.industryTypeList
      },
      error => {
        console.log(error)
      }
    )
  }

  openSnackBar(message: any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

  getMakeList() {
    this.utilityService.getMakeList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.makeLists = data.responseData[0].map((item: any) => {
            return new MakeModel(item.mk_code, item.mk_short_name, item.mk_desc)
          })
        }
        return this.makeLists
      },
      error => {
        console.log(error)
      }
    )
  }

  searchItem(): boolean {

    if ((this.form.get('txtItem')!.value == null || this.form.get('txtItem')!.value == '')) {
      this.openSnackBar("Please Select Item details ");
      return false
    } else {

      let value = this.form.get('txtItem')!.value.trim()
      console.log("value=====", value)

      this.itemService.getItemList1(value).subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemList = data.responseData[0].map((item: any) => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp, item.mmx_uom)
            })
          }
          console.log(this.itemList)
          return this.itemList
        },
        error => {
          this.openSnackBar('ERROR OCCURED.')
        }
      );
      return true
    }
  }

}
