import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoCardsService } from './info-cards.service';
import { Observable, Subscription } from 'rxjs'
import { formatDate } from '@angular/common';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { BranchModel} from '../../../shared/models/model/branch.model';
import { ElementModel } from '../../../shared/models/model/element.model';
import { GodownModel } from '../../../shared/models/model/godown.model';
import { UserRightsModel } from '../../../shared/models/model/user-rights.model';
import { UtilityService } from '../../../core/services/utility/utility.service';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { DragulaModule, DragulaService } from 'ng2-dragula'
import { CommonsService } from '../../../shared/services/commons.service';
import { environment } from '../../../environments/environment.prod';
import { RouterService } from '../../../shared/services/router.service';
import { DashboardDialogComponent } from '../dashboard-dailog/dashboard-dailog.component';
import { UtilityServiceAvaxPro } from '../../../core/services/utility/utility_avaxpro.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomSpinnerComponent } from "../../../feature/session/custom-spinner/custom-spinner.component";



@Component({
  selector: 'app-infocard',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    NgFor,
    NgxChartsModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    CustomSpinnerComponent,
    DragulaModule
],
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
  providers: [AppSettings],

  animations: [
    trigger(
      'slideView',
      [
        state('true', style({ transform: 'translateX(100%)', opacity: 0 })),
        state('false', style({ transform: 'translateX(0)', opacity: 1 })),
        transition('0 => 1', animate('500ms', style({ transform: 'translateX(0)', 'opacity': 1 }))),
        transition('1 => 1', animate('500ms', style({ transform: 'translateX(100%)', 'opacity': 0 }))),
      ]),

    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),

      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
      ])
    ])
  ]
})

export class InfoCardsComponent implements OnInit {

  salesRightDisplay: boolean = false
  flgsalesRights: boolean = false

  queryParams: object = {}
  currentDate = new Date(new Date().getTime())
  payload: any
  yesterday_day: string
   fromDate: any;
   toDate: any;

   //piechart
  public showLabels = true
  public explodeSlices = false
  public doughnut = false

  orders: any[]
  products: any[]
  customers: any[]
  refunds: any[]
  // viewSalesBarChart: any[] = [170, 150];
  viewSalesBarChart: [number, number] = [210, 160]
  viewSalesPieChart: [number, number] = [260, 163];
  view: [number, number] = [700, 180]
  viewReceivablePieChart:[number, number]=[340,162]
  lstHandledBy: any = []
  filteredHandledByLists: Observable<any>
  legendTitle: string = 'Years';
  autoScale = true
  single: any[]
  showXAxis = true
  showYAxis = true
  gradient = false
  showLegend = true
  showXAxisLabel = true
  xAxisLabel = 'Quarter'
  showYAxisLabel = true
  yAxisLabel = 'Sales'
  flgViewChart = false;
  flgToggleAmt = true;
  flgToggleBrAmt = true;
  flgAmount = 'In Rupees'
  flgSalesAmount = 'In Rupees'
  showPieCHart=false


  colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'],
  }
  aryFlgViewChart: boolean[] = [false, false, false, false, false, false, false, false, false];
  aryToggleAmt: boolean[] = [true, true, true, true, true, true, true, true, true];
  aryColorScheme: any[] = [
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], },
    { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'], }
  ]
  dataSourceQaurter: any[]//Observable<any[]> = new Observable
  dataSourceQaurterInLac: any[]
  dataSourceQaurterInRs: any[]
  txtDataSourceQaurter: any[] = []
  txtDataSourceQaurterInLacs: any[] = []
  txtDataSourceQaurterInRs: any[] = []
  form: FormGroup = this.formBuilder.group({});
  lblTitle: any[] = []
  aryDataSource: any[] = []
  aryTxtDataSource: any[] = []
  txtDataSourceSales: any[] = []

  dataSourceSales: any[]
  dataSourceSalesInLac: any[]
  dataSourceSalesInRs: any[]
  txtDataSourceSalesInLacs: any[] = []
  txtDataSourceSalesInRs: any[] = []

  dataSourceReceivable:any[]
  dataSourceReceivableInLac:any[]
  dataSourceReceivableInRs:any[]
  txtDataSourceReceivable: any[] = []
  txtDataSourceReceivableInLacs: any[] = []
  txtDataSourceReceivableInRs: any[] = []

  txtDataSourceProducts: any[] = []
  txtDataSourceProductsInLacs: any[] = []
  txtDataSourceProductsInRs: any[] = []

  txtDataSourceDocs: any[] = []
  txtDataSourceDocsInLacs: any[] = []
  txtDataSourceDocsInRs: any[] = []

  dataSourceStock:any[]
  dataSourceStockInLac:any[]
  dataSourceStockInRs:any[]
  txtDataSourceStock: any[] = []
  txtDataSourceStockInLacs: any[] = []
  txtDataSourceStockInRs: any[] = []

  txtDataSourceBranch: any[] = []
  txtDataSourceBranchInLacs: any[] = []
  txtDataSourceBranchInRs: any[] = []

  txtDataSourceBranchSales: any[] = []
  txtDataSourceBranchSalesInLacs: any[] = []
  txtDataSourceBranchSalesInRs: any[] = []

  txtDataSourceGodown: any[] = []
  txtDataSourceGodownInLacs: any[] = []
  txtDataSourceGodownInRs: any[] = []

  refresh_dashboard:string='N'
  user_and_company=''
  aryObjDashBoardOrder: any[] = [{ name: 'QUARTER', chart: false, amount: true,chart_name:'bar' },
  { name: 'SALES', chart: false, amount: true }, { name: 'RECEIVABLE', chart: false, amount: true,chart_name:'pie' },
  { name: 'PRODUCT', chart: false, amount: true,chart_name:'' }, { name: 'DOCS', chart: false, amount: true,chart_name:'' },
  { name: 'STOCK', chart: false, amount: true,chart_name:'' }, { name: 'BRANCH', chart: false, amount: true,chart_name:'' },
  { name: 'BRANCH_SALE', chart: false, amount: true,chart_name:'' }, { name: 'GODOWN', chart: false, amount: true,chart_name:'' }]

  todayDate = new Date();
  selectedDate: any
  icons = ['home', 'person', 'alarm', 'work', 'mail', 'favorite']
  colors = ['accent', 'primary', 'warn']

  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''))
  minDate = new Date(this.controlValue.getFullYear(), 3, 1);
  maxDate = new Date(this.controlValue.getFullYear() + 1, 2, 31);

  @ViewChild('resizedDiv') resizedDiv: ElementRef
  previousWidthOfResizedDiv: number = 0
  settings: Settings
  aryLstColumn: any[] = [];
  displayColumnBranch: any[] = ['branch', 'target_sales', 'os_amt', 'pay_amt', 'stk_value', 'gp', 'os_180', 'os_120', 'os_90','comm_pay']
  lstBranchColumn: DashColumnModel[] = [
    { col_name: 'BRANCH', db_col: 'branch', flgLink: false, col_type: 'TXT' },
    { col_name: 'TARGET (ACTUAL)', db_col: 'target_sales', flgLink: false, col_type: 'NUM' },
    { col_name: 'OS AMT (DAYS)', db_col: 'os_amt', flgLink: false, col_type: 'NUM' },
    { col_name: 'PAY AMT', db_col: 'pay_amt', flgLink: false, col_type: 'NUM' },
    { col_name: 'STK VAL (DAYS)', db_col: 'stk_value', flgLink: false, col_type: 'NUM' },
    { col_name: 'GP', db_col: 'gp', flgLink: false, col_type: 'NUM' },
    { col_name: 'OS 180 (PARTIES)', db_col: 'os_180', flgLink: false, col_type: 'NUM' },
    { col_name: 'OS 120 (PARTIES)', db_col: 'os_120', flgLink: false, col_type: 'NUM' },
    { col_name: 'OS 90 (PARTIES)', db_col: 'os_90', flgLink: false, col_type: 'NUM' },
    { col_name: 'COMM PAY', db_col: 'comm_pay', flgLink: false, col_type: 'NUM' },
  ]

  lstTargetColumn: DashColumnModel[] = [
    { col_name: 'Quarterly', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: ' 1st Quarter ', db_col: 'qtr1', flgLink: false, col_type: 'NUM' },
    { col_name: ' 2nd Quarter ', db_col: 'qtr2', flgLink: false, col_type: 'NUM' },
    { col_name: ' 3rd Quarter ', db_col: 'qtr3', flgLink: false, col_type: 'NUM' },
    { col_name: ' 4th Quarter ', db_col: 'qtr4', flgLink: false, col_type: 'NUM' },
  ];
  aryDisplayColumn: any[] = []

  lstSalesColumn: DashColumnModel[] = [
    { col_name: 'Sales', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: 'Amount', db_col: 'amount', flgLink: true, col_type: 'NUM' },
    { col_name: 'GP / NOs', db_col: 'gp', flgLink: true, col_type: 'NUM' },
    { col_name: '#Parties', db_col: 'parties', flgLink: false, col_type: 'NUM' },
 
  ];

  lstReceivableColumn: DashColumnModel[] = [
    { col_name: 'Sales', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: 'Amount', db_col: 'amount', flgLink: true, col_type: 'NUM' },
    { col_name: 'Days/#Parties ', db_col: 'parties', flgLink: false, col_type: 'NUM' },
  ];

  lstProductColumn: DashColumnModel[] = [
    { col_name: 'Products', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: ' 1st Quarter ', db_col: 'qtr1', flgLink: false, col_type: 'NUM' },
    { col_name: ' 2nd Quarter ', db_col: 'qtr2', flgLink: false, col_type: 'NUM' },
    { col_name: ' 3rd Quarter ', db_col: 'qtr3', flgLink: false, col_type: 'NUM' },
    { col_name: ' 4th Quarter ', db_col: 'qtr4', flgLink: false, col_type: 'NUM' },
  ];

  lstDocsColumn: DashColumnModel[] = [
    { col_name: 'Sales', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: 'Amount', db_col: 'amount', flgLink: true, col_type: 'NUM' },
    { col_name: 'GP / NOs', db_col: 'gp', flgLink: false, col_type: 'NUM' },
    { col_name: '#Parties', db_col: 'parties', flgLink: false, col_type: 'NUM' },

  ];

  lstStockColumn: DashColumnModel[] = [
    { col_name: '', db_col: 'name', flgLink: false, col_type: 'TXT' },
    { col_name: 'Stock', db_col: 'amount', flgLink: true, col_type: 'NUM' },
  ];

  displayColumnBranchSales: any[] = [
    'branch', 'dst_doc_type',
    'dst_today_amount', 'dst_today_gp', 'dst_today_nos',
    'dst_yesterday_amount', 'dst_yesterday_gp', 'dst_yesterday_nos',
    'dst_cmtd_amount', 'dst_cmtd_gp', 'dst_cmtd_nos',
    'dst_cytd_amount', 'dst_cytd_gp', 'dst_cytd_nos'
  ]

  lstBranchSalesColumn: DashColumnModel[] = [
    { col_name: 'BRANCH', db_col: 'branch', flgLink: false, col_type: 'TXT' },
    { col_name: 'DOC TYPE', db_col: 'dst_doc_type', flgLink: false, col_type: 'TXT' },
    { col_name: 'TODAY AMT', db_col: 'dst_today_amount', flgLink: true, col_type: 'NUM' },
    { col_name: 'TODAY GP', db_col: 'dst_today_gp', flgLink: false, col_type: 'NUM' },
    { col_name: 'TODAY NOS', db_col: 'dst_today_nos', flgLink: false, col_type: 'NUM' },
    { col_name: 'YESTERDAY AMT', db_col: 'dst_yesterday_amount', flgLink: true, col_type: 'NUM' },
    { col_name: 'YESTERDAY GP', db_col: 'dst_yesterday_gp', flgLink: false, col_type: 'NUM' },
    { col_name: 'YESTERDAY NOS', db_col: 'dst_yesterday_nos', flgLink: false, col_type: 'NUM' },
    { col_name: 'COMM PAYABLE', db_col: 'dst_comm_payable', flgLink: false, col_type: 'NUM' },
    { col_name: 'CMTD AMT', db_col: 'dst_cmtd_amount', flgLink: false, col_type: 'NUM' },
    { col_name: 'CMTD GP', db_col: 'dst_cmtd_gp', flgLink: false, col_type: 'NUM' },
    { col_name: 'CMTD NOS', db_col: 'dst_cmtd_nos', flgLink: false, col_type: 'NUM' },
    { col_name: 'CYTD AMT', db_col: 'dst_cytd_amount', flgLink: false, col_type: 'NUM' },
    { col_name: 'CYTD GP', db_col: 'dst_cytd_gp', flgLink: false, col_type: 'NUM' },
    { col_name: 'CYTD NOS', db_col: 'dst_cytd_nos', flgLink: false, col_type: 'NUM' },
  ];

  displayColumnGodown: any[] = [
    'ddg_branch', 'ddg_godown',
    'ddg_today_challan', 'ddg_today_do', 'ddg_today_line_item',
    'ddg_yesterday_challan', 'ddg_yesterday_do', 'ddg_yesterday_line_item',    
    'ddg_cytd_challan', 'ddg_cytd_do', 'ddg_cytd_line_item'
  ]

  lstGodownColumn: DashColumnModel[] = [
    { col_name: 'BRANCH', db_col: 'ddg_branch', flgLink: false, col_type: 'TXT' },
    { col_name: 'GODOWN', db_col: 'ddg_godown', flgLink: false, col_type: 'TXT' },
    { col_name: 'TODAY CHALLAN#', db_col: 'ddg_today_challan', flgLink: true, col_type: 'NUM' },
    { col_name: 'TODAY DO#', db_col: 'ddg_today_do', flgLink: false, col_type: 'NUM' },
    { col_name: 'TODAY LINE ITEM#', db_col: 'ddg_today_line_item', flgLink: false, col_type: 'NUM' },
    { col_name: 'YESTERDAY CHALLAN#', db_col: 'ddg_yesterday_challan', flgLink: true, col_type: 'NUM' },
    { col_name: 'YESTERDAY DO#', db_col: 'ddg_yesterday_do', flgLink: false, col_type: 'NUM' },
    { col_name: 'YESTERDAY LINE ITEM#', db_col: 'ddg_yesterday_line_item', flgLink: false, col_type: 'NUM' },        
    { col_name: 'CYTD CHALLAN#', db_col: 'ddg_cytd_challan', flgLink: false, col_type: 'NUM' },
    { col_name: 'CYTD DO#', db_col: 'ddg_cytd_do', flgLink: false, col_type: 'NUM' },
    { col_name: 'CYTD LINE ITEM#', db_col: 'ddg_cytd_line_item', flgLink: false, col_type: 'NUM' },

  ];

  lblDraggable: string = "DRAGULA_EVENTS";
  subs = new Subscription();

  userRightsList: UserRightsModel
  reportTypePageId = 'UNBILL_DOC_RPTS_AUTH'

  constructor(private appSettings: AppSettings,
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private dialog: MatDialog,
    private dragula: DragulaService,
    private objservice: InfoCardsService,
    private commonsService: CommonsService,
    private utilityService: UtilityService,
    private routerService: RouterService,
  ) {
    this.settings = this.appSettings.settings
    this.form = this.formBuilder.group({
      dtDashDate: [this.todayDate],
      // txtHandledBy: [''],
    })
    this.selectedDate = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    this.selectedDate = this.selectedDate.split('-')[2] + '-' + this.selectedDate.split('-')[1] + '-' + this.selectedDate.split('-')[0]
   

    this.subs.add(this.dragula.dropModel<any>(this.lblDraggable)
      .subscribe(({ name, el, target, source, sourceModel, targetModel, item }) => {
        let aryTemp: any = []
        let aryFlgCharTemp: any = []
        let aryToggleAmtTemp: any = []

        targetModel.forEach(element => {
          let index = this.aryObjDashBoardOrder.findIndex(
            row => row.name === element.type
          )

          aryTemp.push({ name: element.type, chart: this.aryFlgViewChart[index], amount: this.aryToggleAmt[index] })

          aryFlgCharTemp.push(this.aryFlgViewChart[index]);
          aryToggleAmtTemp.push(this.aryToggleAmt[index])
        });
        this.aryObjDashBoardOrder = aryTemp
        this.aryFlgViewChart = aryFlgCharTemp
        this.aryToggleAmt = aryToggleAmtTemp
        this.updateUserPreference(true);
        // console.log(`drop: ${JSON.stringify(target)}`);
      })
    );
  }

  ngOnInit() {
    this.user_and_company = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')+atob(sessionStorage.getItem(btoa('userId')) || '');
    this.refreshDashboard()
  }

  shiftDashBoard() {
    // added any 
    let i = 0
    let lblEmptyTitle: any = []
    let aryEmptyLstColumn: any = []
    let aryEmptyDisplayColumn: any = []
    let aryEmptyTxtDataSource: any = []

    let lblNonEmptyTitle: any = []
    let aryNonEmptyLstColumn: any = []
    let aryNonEmptyDisplayColumn: any = []
    let aryNonEmptyTxtDataSource: any = []
  

    this.aryObjDashBoardOrder.forEach(element => {
      if (this.aryTxtDataSource[i] == undefined || this.aryTxtDataSource[i].length <= 0) {
        lblEmptyTitle.push(this.lblTitle[i])
        aryEmptyLstColumn.push(this.aryLstColumn[i])
        aryEmptyDisplayColumn.push(this.aryDisplayColumn[i])
        aryEmptyTxtDataSource.push(this.aryTxtDataSource[i])
      }
      else {
        lblNonEmptyTitle.push(this.lblTitle[i])
        aryNonEmptyLstColumn.push(this.aryLstColumn[i])
        aryNonEmptyDisplayColumn.push(this.aryDisplayColumn[i])
        aryNonEmptyTxtDataSource.push(this.aryTxtDataSource[i])
      }
      i++;
    });

    i = 0;
    let j = 0;
    aryNonEmptyTxtDataSource.forEach((element: any) => {
      this.lblTitle[i] = lblNonEmptyTitle[j]
      this.aryLstColumn[i] = aryNonEmptyLstColumn[j]
      this.aryDisplayColumn[i] = aryNonEmptyDisplayColumn[j]
      this.aryTxtDataSource[i] = aryNonEmptyTxtDataSource[j]
      i++;
      j++;
    });

    j = 0;
    aryEmptyTxtDataSource.forEach((element: any) => {
      this.lblTitle[i] = lblEmptyTitle[j]
      this.aryLstColumn[i] = aryEmptyLstColumn[j]
      this.aryDisplayColumn[i] = aryEmptyDisplayColumn[j]
      this.aryTxtDataSource[i] = aryEmptyTxtDataSource[j]
      i++;
      j++;
    });

  }

  onShowClickHandler(formValues: any) {
    this.loadDashData();
  }


  loadDashData() {
    // this.loadSalesData();
    let i = 0;
    this.aryObjDashBoardOrder.forEach(row => {
      console.log("row.name",row.name)
      let element = row.name
      if (element == 'QUARTER') {
        this.lblTitle[i] = { 'title': 'QUARTERLY SALES / TARGET DETAIL', 'type': 'QUARTER' }
        this.aryLstColumn[i] = this.lstTargetColumn
        this.loadQtrData(i);
        this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
      }
      else if (element == 'SALES') {
        this.lblTitle[i] = { 'title': 'SALES DETAIL', 'type': 'SALES' }
        this.aryLstColumn[i] = this.lstSalesColumn
        this.loadSalesData(i)
        this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
      }
      else if (element == 'RECEIVABLE') {
        this.lblTitle[i] = { 'title': ' RECEIVABLE / COLLECTION ', 'type': 'RECEIVABLE' }
        this.aryLstColumn[i] = this.lstReceivableColumn
        this.aryDisplayColumn[i] = ['name', 'amount', 'parties']
        // this.loadReceivableData(i)
      }
      else if (element == 'PRODUCT') {
        this.lblTitle[i] = { 'title': 'PRODUCTS ', 'type': 'PRODUCT' }
        this.aryLstColumn[i] = this.lstProductColumn
        this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
        this.loadProductData(i)
      }
      else if (element == 'DOCS') {
        this.lblTitle[i] = { 'title': 'PENDING DOCS', 'type': 'DOCS' }
        this.aryLstColumn[i] = this.lstDocsColumn
        this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
      }
      else if (element == 'STOCK') {
        this.lblTitle[i] = { 'title': 'STOCK', 'type': 'STOCK' }
        this.aryLstColumn[i] = this.lstStockColumn
        this.aryDisplayColumn[i] = ['name', 'amount']
        this.loadStockData(i);
      }
      else if (element == 'BRANCH') {
        this.lblTitle[i] = { 'title': 'BRANCH', 'type': 'BRANCH' }
        this.aryLstColumn[i] = this.lstBranchColumn
        this.aryDisplayColumn[i] = this.displayColumnBranch
        this.loadBranchData(i);
      }
      else if (element == 'BRANCH_SALE') {
        this.lblTitle[i] = { 'title': 'BRANCH SALES', 'type': 'BRANCH_SALE' }
        this.aryLstColumn[i] = this.lstBranchSalesColumn
        this.aryDisplayColumn[i] = this.displayColumnBranchSales
        this.loadAllBranchSalesData(i);
      }
      else if (element == 'GODOWN') {
        this.lblTitle[i] = { 'title': 'GODOWN', 'type': 'GODOWN' }
        this.aryLstColumn[i] = this.lstGodownColumn
        this.aryDisplayColumn[i] = this.displayColumnGodown
        this.loadGodownData(i);
      }
      i++;
    });
    this.shiftDashBoard()
  }

  reorderDashData() {
    let i = 0;

    this.aryObjDashBoardOrder.forEach(row => {
      let element = row.name
      let flgAmt = this.aryToggleAmt[i];
      if (flgAmt == true) {
        if (element == 'QUARTER') {
          this.lblTitle[i] = { 'title': 'QUARTERLY SALES / TARGET DETAIL', 'type': 'QUARTER' }
          this.aryLstColumn[i] = this.lstTargetColumn
          this.aryDataSource[i] = this.dataSourceQaurterInLac
          this.aryTxtDataSource[i] = this.txtDataSourceQaurterInLacs
          this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
        }
        else if (element == 'SALES') {
          this.lblTitle[i] = { 'title': 'SALES DETAIL', 'type': 'SALES' }
          this.aryLstColumn[i] = this.lstSalesColumn
          this.aryDataSource[i]=this.dataSourceSalesInLac
          this.aryTxtDataSource[i] = this.txtDataSourceSalesInLacs
          this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
        }
        else if (element == 'RECEIVABLE') {
          this.lblTitle[i] = { 'title': ' RECEIVABLE / COLLECTION ', 'type': 'RECEIVABLE' }
          this.aryLstColumn[i] = this.lstReceivableColumn
          this.aryDataSource[i]=this.dataSourceReceivableInLac
          this.aryTxtDataSource[i] = this.txtDataSourceReceivableInLacs
          this.aryDisplayColumn[i] = ['name', 'amount', 'parties']
        }
        else if (element == 'PRODUCT') {
          this.lblTitle[i] = { 'title': 'PRODUCTS ', 'type': 'PRODUCT' }
          this.aryLstColumn[i] = this.lstProductColumn
          this.aryTxtDataSource[i] = this.txtDataSourceProductsInLacs
          this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
        }
        else if (element == 'DOCS') {
          this.lblTitle[i] = { 'title': 'PENDING DOCS', 'type': 'DOCS' }
          this.aryLstColumn[i] = this.lstDocsColumn
          this.aryTxtDataSource[i] = this.txtDataSourceDocsInLacs
          this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
        }
        else if (element == 'STOCK') {
          this.lblTitle[i] = { 'title': 'STOCK', 'type': 'STOCK' }
          this.aryLstColumn[i] = this.lstStockColumn
          this.aryDataSource[i]=this.dataSourceStockInLac
          this.aryTxtDataSource[i] = this.txtDataSourceStockInLacs
          this.aryDisplayColumn[i] = ['name', 'amount']
        }
        else if (element == 'BRANCH') {
          this.lblTitle[i] = { 'title': 'BRANCH', 'type': 'BRANCH' }
          this.aryLstColumn[i] = this.lstBranchColumn
          this.aryDisplayColumn[i] = this.displayColumnBranch
          this.aryTxtDataSource[i] = this.txtDataSourceBranchInLacs
        }
        else if (element == 'BRANCH_SALE') {
          this.lblTitle[i] = { 'title': 'BRANCH SALES', 'type': 'BRANCH_SALE' }
          this.aryLstColumn[i] = this.lstBranchSalesColumn
          this.aryDisplayColumn[i] = this.displayColumnBranchSales
          this.aryTxtDataSource[i] = this.txtDataSourceBranchSalesInLacs
        }
        else if (element == 'GODOWN') {
          this.lblTitle[i] = { 'title': 'GODOWN', 'type': 'GODOWN' }
          this.aryLstColumn[i] = this.lstGodownColumn
          this.aryDisplayColumn[i] = this.displayColumnGodown
          this.aryTxtDataSource[i] = this.txtDataSourceGodownInLacs
        }
      }
      else {
        if (element == 'QUARTER') {
          this.lblTitle[i] = { 'title': 'QUARTERLY SALES / TARGET DETAIL', 'type': 'QUARTER' }
          this.aryLstColumn[i] = this.lstTargetColumn
          this.aryDataSource[i] = this.dataSourceQaurterInRs
          this.aryTxtDataSource[i] = this.txtDataSourceQaurterInRs
          this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
        }
        else if (element == 'SALES') {
          this.lblTitle[i] = { 'title': 'SALES DETAIL', 'type': 'SALES' }
          this.aryLstColumn[i] = this.lstSalesColumn
          this.aryDataSource[i]=this.dataSourceSalesInRs
          this.aryTxtDataSource[i] = this.txtDataSourceSalesInRs
          this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
        }
        else if (element == 'RECEIVABLE') {
          this.lblTitle[i] = { 'title': ' RECEIVABLE / COLLECTION ', 'type': 'RECEIVABLE' }
          this.aryLstColumn[i] = this.lstReceivableColumn
          this.aryDataSource[i]=this.dataSourceReceivableInRs
          this.aryTxtDataSource[i] = this.txtDataSourceReceivableInRs
          this.aryDisplayColumn[i] = ['name', 'amount', 'parties']
        }
        else if (element == 'PRODUCT') {
          this.lblTitle[i] = { 'title': 'PRODUCTS ', 'type': 'PRODUCT' }
          this.aryLstColumn[i] = this.lstProductColumn
          this.aryTxtDataSource[i] = this.txtDataSourceProductsInRs
          this.aryDisplayColumn[i] = ['name', 'qtr1', 'qtr2', 'qtr3', 'qtr4']
        }
        else if (element == 'DOCS') {
          this.lblTitle[i] = { 'title': 'PENDING DOCS', 'type': 'DOCS' }
          this.aryLstColumn[i] = this.lstDocsColumn
          this.aryTxtDataSource[i] = this.txtDataSourceDocsInRs
          this.aryDisplayColumn[i] = ['name', 'amount', 'gp', 'parties']
        }
        else if (element == 'STOCK') {
          this.lblTitle[i] = { 'title': 'STOCK', 'type': 'STOCK' }
          this.aryLstColumn[i] = this.lstStockColumn
          this.aryDataSource[i]=this.dataSourceStockInRs
          this.aryTxtDataSource[i] = this.txtDataSourceStockInRs
          this.aryDisplayColumn[i] = ['name', 'amount']
        }
        else if (element == 'BRANCH') {
          this.lblTitle[i] = { 'title': 'BRANCH', 'type': 'BRANCH' }
          this.aryLstColumn[i] = this.lstBranchColumn
          this.aryDisplayColumn[i] = this.displayColumnBranch
          this.aryTxtDataSource[i] = this.txtDataSourceBranchInRs
        }
        else if (element == 'BRANCH_SALE') {
          this.lblTitle[i] = { 'title': 'BRANCH SALES', 'type': 'BRANCH_SALE' }
          this.aryLstColumn[i] = this.lstBranchSalesColumn
          this.aryDisplayColumn[i] = this.displayColumnBranchSales
          this.aryTxtDataSource[i] = this.txtDataSourceBranchSalesInRs
        }
        else if (element == 'GODOWN') {
          this.lblTitle[i] = { 'title': 'GODOWN', 'type': 'GODOWN' }
          this.aryLstColumn[i] = this.lstGodownColumn
          this.aryDisplayColumn[i] = this.displayColumnGodown
          this.aryTxtDataSource[i] = this.txtDataSourceGodownInRs
        }
      }
      i++;
    });
  }

  changeAmtFormat(flgType: string, index: number) {
    let flgAmt = this.aryToggleAmt[index];
    if (flgAmt == false) {
      if (flgType == 'QUARTER') {
        this.aryDataSource[index] = this.dataSourceQaurterInLac
        this.aryTxtDataSource[index] = this.txtDataSourceQaurterInLacs
      }
      else if (flgType == 'SALES') {  
        this.aryDataSource[index] = this.dataSourceSalesInLac
        this.aryTxtDataSource[index] = this.txtDataSourceSalesInLacs
      }
      else if (flgType == 'RECEIVABLE') {
        this.aryDataSource[index] = this.dataSourceReceivableInLac
        this.aryTxtDataSource[index] = this.txtDataSourceReceivableInLacs
      }
      else if (flgType == 'PRODUCT') {
        this.aryTxtDataSource[index] = this.txtDataSourceProductsInLacs
      }
      else if (flgType == 'DOCS') {
        this.aryTxtDataSource[index] = this.txtDataSourceDocsInLacs
      }
      else if (flgType == 'STOCK') {
        this.aryDataSource[index] = this.dataSourceStockInLac
        this.aryTxtDataSource[index] = this.txtDataSourceStockInLacs
      }
      else if (flgType == 'BRANCH') {
        this.aryTxtDataSource[index] = this.txtDataSourceBranchInLacs
      }
      else if (flgType == 'BRANCH_SALE') {
        this.aryTxtDataSource[index] = this.txtDataSourceBranchSalesInLacs
      }
      else if (flgType == 'GODOWN') {
        this.aryTxtDataSource[index] = this.txtDataSourceGodownInLacs
      }
    }
    else {
      if (flgType == 'QUARTER') {
        this.aryDataSource[index] = this.dataSourceQaurterInRs
        this.aryTxtDataSource[index] = this.txtDataSourceQaurterInRs
      }
      else if (flgType == 'SALES') {
        this.aryDataSource[index]=this.dataSourceSalesInRs
        this.aryTxtDataSource[index] = this.txtDataSourceSalesInRs
      }
      else if (flgType == 'RECEIVABLE') {
        this.aryDataSource[index]=this.dataSourceReceivableInRs
        this.aryTxtDataSource[index] = this.txtDataSourceReceivableInRs
      }
      else if (flgType == 'PRODUCT') {
        this.aryTxtDataSource[index] = this.txtDataSourceProductsInRs
      }
      else if (flgType == 'DOCS') {
        this.aryTxtDataSource[index] = this.txtDataSourceDocsInRs
      }
      else if (flgType == 'STOCK') {
        this.aryDataSource[index]=this.dataSourceStockInRs
        this.aryTxtDataSource[index] = this.txtDataSourceStockInRs
      }
      else if (flgType == 'BRANCH') {
        this.aryTxtDataSource[index] = this.txtDataSourceBranchInRs
      }
      else if (flgType == 'BRANCH_SALE') {
        this.aryTxtDataSource[index] = this.txtDataSourceBranchSalesInRs
      }
      else if (flgType == 'GODOWN') {
        this.aryTxtDataSource[index] = this.txtDataSourceGodownInRs
      }
    }

    if (flgAmt == true) {
      this.aryToggleAmt[index] = false
    }
    else {
      this.aryToggleAmt[index] = true
    }

    let ind = 0
    this.aryObjDashBoardOrder.forEach(element => {
      if (index == ind) {
        element.amount = this.aryToggleAmt[index]
      }
      ind++
    });
    this.updateUserPreference(false)
  }

  showDashboard(rpt_type: any, index: number, flgUpdate: any) {
    if (rpt_type == 'QUARTER') {
      this.showQaurterDashboard(index, flgUpdate);
    }
    else if (rpt_type == 'SALES') {
      this.showSalesDashboard(index, flgUpdate);
    }
    else if (rpt_type == 'RECEIVABLE') {
      this.showReceivableDashboard(index, flgUpdate);
    }else if (rpt_type == 'STOCK'){
      this.showStockDashboard(index, flgUpdate);
    }
  }

  showSalesDashboard(index: number, flgUpdate: any){
    if (this.flgViewChart == true) {
      this.flgViewChart = false
      this.aryFlgViewChart[index] = false
    }
    else {
      this.flgViewChart = true
      this.aryFlgViewChart[index] = true
    }
    let ind = 0
    this.aryObjDashBoardOrder.forEach(element => {
      if (index == ind) {
        element.chart = this.aryFlgViewChart[index]
      }
      ind++
    });
    if (flgUpdate) {
      this.updateUserPreference(false)
    }
  }

  showStockDashboard(index: number, flgUpdate: any){
    if (this.flgViewChart == true) {
      this.flgViewChart = false
      this.aryFlgViewChart[index] = false
    }
    else {
      this.flgViewChart = true
      this.aryFlgViewChart[index] = true
    }
    let ind = 0
    this.aryObjDashBoardOrder.forEach(element => {
      if (index == ind) {
        element.chart = this.aryFlgViewChart[index]
      }
      ind++
    });
    if (flgUpdate) {
      this.updateUserPreference(false)
    }
  }

  showReceivableDashboard(index: number, flgUpdate: any){
    if (this.flgViewChart == true) {
      this.flgViewChart = false
      this.aryFlgViewChart[index] = false
    }
    else {
      this.flgViewChart = true
      this.aryFlgViewChart[index] = true
    }
    let ind = 0
    this.aryObjDashBoardOrder.forEach(element => {
      if (index == ind) {
        element.chart = this.aryFlgViewChart[index]
      }
      ind++
    });
    if (flgUpdate) {
      this.updateUserPreference(false)
    }
  }

  showQaurterDashboard(index: number, flgUpdate: any) {
    if (this.flgViewChart == true) {
      this.flgViewChart = false
      this.aryFlgViewChart[index] = false
    }
    else {
      this.flgViewChart = true
      this.aryFlgViewChart[index] = true
    }
    let ind = 0
    this.aryObjDashBoardOrder.forEach(element => {
      if (index == ind) {
        element.chart = this.aryFlgViewChart[index]
      }
      ind++
    });
    if (flgUpdate) {
      this.updateUserPreference(false)
    }

  }

  checkNull(val: any) {
    if (val == null || val == '') {
      return 0
    }
    else {
      return val;
    }
  }

  checkNaN(num: any) {
    if (isNaN(num)) {
      return 0
    }
    else {
      return num
    }
  }

  loadQtrData(index: number) {

    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    if(this.refresh_dashboard=='Y' && sessionStorage.hasOwnProperty('objQtrData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objQtrData'+this.user_and_company) || '{}');
      this.readQtrData(objData,index);
    }
    else{
      this.objservice.getQtrData(as_on_date).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          let objData = data.responseData[0][0]
          sessionStorage.setItem('objQtrData'+this.user_and_company,JSON.stringify(objData));
          this.readQtrData(objData,index)  
        }
      })
    }
  }

  readQtrData(objData: any,index: number){
    
    this.txtDataSourceQaurter = [
      {
        name: 'TARGET',
        qtr1: this.checkNull(objData.acttr1).toFixed(2),
        qtr2: this.checkNull(objData.acttr2).toFixed(2),
        qtr3: this.checkNull(objData.acttr3).toFixed(2),
        qtr4: this.checkNull(objData.acttr4).toFixed(2)
      },
      {
        name: 'ACTUAL',
        qtr1: this.checkNull(objData.actsl1).toFixed(2),
        qtr2: this.checkNull(objData.actsl2).toFixed(2),
        qtr3: this.checkNull(objData.actsl3).toFixed(2),
        qtr4: this.checkNull(objData.actsl4).toFixed(2)
      },
      {
        name: 'SHORTFALL(%)',
        qtr1: Number(this.checkNull(objData.acttr1)) > 0 ? (((this.checkNull(objData.acttr1) - this.checkNull(objData.actsl1)) / (this.checkNull(objData.acttr1))) * 100).toFixed(2) : 0,
        qtr2: Number(this.checkNull(objData.acttr2)) > 0 ? (((this.checkNull(objData.acttr2) - this.checkNull(objData.actsl2)) / (this.checkNull(objData.acttr2))) * 100).toFixed(2) : 0,
        qtr3: Number(this.checkNull(objData.acttr3)) > 0 ? (((this.checkNull(objData.acttr3) - this.checkNull(objData.actsl3)) / (this.checkNull(objData.acttr3))) * 100).toFixed(2) : 0,
        qtr4: Number(this.checkNull(objData.acttr4)) > 0 ? (((this.checkNull(objData.acttr4) - this.checkNull(objData.actsl4)) / (this.checkNull(objData.acttr4))) * 100).toFixed(2) : 0
      },
      {
        name: 'Service(CYTD)',
        qtr1: (this.checkNull(objData.dhd_qtr1service_amt)).toFixed(2),
        qtr2: (this.checkNull(objData.dhd_qtr2service_amt)).toFixed(2),
        qtr3: (this.checkNull(objData.dhd_qtr3service_amt)).toFixed(2),
        qtr4: (this.checkNull(objData.dhd_qtr4service_amt)).toFixed(2),
      },
      {
        name: 'OS DAYS',
        qtr1: this.checkNull(objData.qtros1).toFixed(2),
        qtr2: this.checkNull(objData.qtros2).toFixed(2),
        qtr3: this.checkNull(objData.qtros3).toFixed(2),
        qtr4: this.checkNull(objData.qtros4).toFixed(2)
      },
      {
        name: 'ACTUAL LYTD',
        qtr1: this.checkNull(objData.lyqtd1_sales).toFixed(2),
        qtr2: this.checkNull(objData.lyqtd2_sales).toFixed(2),
        qtr3: this.checkNull(objData.lyqtd3_sales).toFixed(2),
        qtr4: this.checkNull(objData.lyqtd4_sales).toFixed(2)
      }
    ];
    this.txtDataSourceQaurterInRs = this.txtDataSourceQaurter

    this.txtDataSourceQaurterInLacs = [
      {
        name: 'TARGET',
        qtr1: (this.checkNull(objData.acttr1) / 100000).toFixed(2),
        qtr2: (this.checkNull(objData.acttr2) / 100000).toFixed(2),
        qtr3: (this.checkNull(objData.acttr3) / 100000).toFixed(2),
        qtr4: (this.checkNull(objData.acttr4 / 100000)).toFixed(2)
      },
      {
        name: 'ACTUAL',
        qtr1: (this.checkNull(objData.actsl1) / 100000).toFixed(2),
        qtr2: (this.checkNull(objData.actsl2) / 100000).toFixed(2),
        qtr3: (this.checkNull(objData.actsl3) / 100000).toFixed(2),
        qtr4: (this.checkNull(objData.actsl4) / 100000).toFixed(2)
      },
      {
        name: 'SHORTFALL(%)',
        qtr1: Number(this.checkNull(objData.acttr1)) > 0 ? (((this.checkNull(objData.acttr1) - this.checkNull(objData.actsl1)) / (this.checkNull(objData.acttr1))) * 100).toFixed(2) : 0,
        qtr2: Number(this.checkNull(objData.acttr2)) > 0 ? (((this.checkNull(objData.acttr2) - this.checkNull(objData.actsl2)) / (this.checkNull(objData.acttr2))) * 100).toFixed(2) : 0,
        qtr3: Number(this.checkNull(objData.acttr3)) > 0 ? (((this.checkNull(objData.acttr3) - this.checkNull(objData.actsl3)) / (this.checkNull(objData.acttr3))) * 100).toFixed(2) : 0,
        qtr4: Number(this.checkNull(objData.acttr4)) > 0 ? (((this.checkNull(objData.acttr4) - this.checkNull(objData.actsl4)) / (this.checkNull(objData.acttr4))) * 100).toFixed(2) : 0
      },
      {
        name: 'Service(CYTD)',
        qtr1: (this.checkNull(objData.dhd_qtr1service_amt)/ 100000).toFixed(2),
        qtr2: (this.checkNull(objData.dhd_qtr2service_amt)/ 100000).toFixed(2),//gross profit/sales*100
        qtr3: (this.checkNull(objData.dhd_qtr3service_amt)/ 100000).toFixed(2),
        qtr4: (this.checkNull(objData.dhd_qtr4service_amt)/ 100000).toFixed(2),
      },
      {
        name: 'OS DAYS',
        qtr1: this.checkNull(objData.qtros1).toFixed(2),
        qtr2: this.checkNull(objData.qtros2).toFixed(2),
        qtr3: this.checkNull(objData.qtros3).toFixed(2),
        qtr4: this.checkNull(objData.qtros4).toFixed(2)
      },
      {
        name: 'ACTUAL LYTD',
        qtr1: (this.checkNull(objData.lyqtd1_sales) / 100000).toFixed(2),
        qtr2: (this.checkNull(objData.lyqtd2_sales) / 100000).toFixed(2),
        qtr3: (this.checkNull(objData.lyqtd3_sales) / 100000).toFixed(2),
        qtr4: (this.checkNull(objData.lyqtd4_sales) / 100000).toFixed(2)
      }
    ];

    this.dataSourceQaurter = [
      {
        name: '1st Quarter',
        series: [{ name: 'Target', value: this.checkNull(objData.acttr1).toFixed(2), },
        { name: 'Actual', value: this.checkNull(objData.actsl1).toFixed(2), },
        { name: 'LYQTD', value: this.checkNull(objData.lyqtd1_sales).toFixed(2), },
        ],
      },
      {
        name: '2nd Quarter',
        series: [{ name: 'Target', value: this.checkNull(objData.acttr2).toFixed(2), },
        { name: 'Actual', value: this.checkNull(objData.actsl2).toFixed(2), },
        { name: 'LYQTD', value: this.checkNull(objData.lyqtd2_sales).toFixed(2), },
        ],
      },
      {
        name: '3rd Quarter',
        series: [{ name: 'Target', value: this.checkNull(objData.acttr3).toFixed(2), },
        { name: 'Actual', value: this.checkNull(objData.actsl3).toFixed(2), },
        { name: 'LYQTD', value: this.checkNull(objData.lyqtd3_sales).toFixed(2), },
        ],
      },
      {
        name: '4th Quarter',
        series: [{ name: 'Target', value: this.checkNull(objData.acttr4).toFixed(2), },
        { name: 'Actual', value: this.checkNull(objData.actsl4).toFixed(2), },
        { name: 'LYQTD', value: this.checkNull(objData.lyqtd4_sales).toFixed(2), },
        ],
      },
    ];


    this.dataSourceQaurterInRs = this.dataSourceQaurter
    this.dataSourceQaurterInLac = [
      {
        name: '1st Quarter',
        series: [{ name: 'Target', value: (this.checkNull(objData.acttr1) / 100000).toFixed(2), },
        { name: 'Actual', value: (this.checkNull(objData.actsl1) / 100000).toFixed(2), },
        { name: 'LYQTD', value: (this.checkNull(objData.lyqtd1_sales) / 100000).toFixed(2), },
        ],
      },
      {
        name: '2nd Quarter',
        series: [{ name: 'Target', value: (this.checkNull(objData.acttr2) / 100000).toFixed(2), },
        { name: 'Actual', value: (this.checkNull(objData.actsl2) / 100000).toFixed(2), },
        { name: 'LYQTD', value: (this.checkNull(objData.lyqtd2_sales) / 100000).toFixed(2), },
        ],
      },
      {
        name: '3rd Quarter',
        series: [{ name: 'Target', value: (this.checkNull(objData.acttr3) / 100000).toFixed(2), },
        { name: 'Actual', value: (this.checkNull(objData.actsl3) / 100000).toFixed(2), },
        { name: 'LYQTD', value: (this.checkNull(objData.lyqtd3_sales) / 100000).toFixed(2), },
        ],
      },
      {
        name: '4th Quarter',
        series: [{ name: 'Target', value: (this.checkNull(objData.acttr4) / 100000).toFixed(2), },
        { name: 'Actual', value: (this.checkNull(objData.actsl4) / 100000).toFixed(2), },
        { name: 'LYQTD', value: (this.checkNull(objData.lyqtd4_sales) / 100000).toFixed(2), },
        ],
      },
    ]
    this.aryDataSource[index] = this.dataSourceQaurterInLac
    this.aryTxtDataSource[index] = this.txtDataSourceQaurterInLacs
  }

  loadSalesData(index: number) {
    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    if(this.refresh_dashboard=='Y' && sessionStorage.hasOwnProperty('objSalesData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objSalesData'+this.user_and_company) || '{}');
      let rowRights = JSON.parse(sessionStorage.getItem('objSalesDataRights'+this.user_and_company) || '{}');
      this.readSalesData(objData[0],rowRights,index);
    }
    else{
      this.objservice.getSalesData(as_on_date).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          let objData = data.responseData[0][0]
          let rowRights = data.responseData[1]
          sessionStorage.setItem('objSalesData'+this.user_and_company,JSON.stringify(objData));
          sessionStorage.setItem('objSalesDataRights'+this.user_and_company,JSON.stringify(rowRights));
          this.readSalesData(objData[0],rowRights,index)
          this.yesterday_day = data.responseData[0][0].yesterday_date         
        } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {

        }
      })
    }
  }

  readSalesData(objData: any,rowRights: any,index: number){
     //  this.flgsalesRights ==true
    // let ind_sales = this.aryObjDashBoardOrder.findIndex(
    //   row => row.name === 'SALES'
    // )
    // if (rowRights.showsales=='Y' && index >= 0) {
      this.txtDataSourceSales = [
        {
          name: 'TARGET(CYTD)',
          amount: this.checkNull(objData.targ).toFixed(0),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Sale(CYTD)',
          amount: this.checkNull(objData.act).toFixed(0),
          gp: this.checkNaN(((this.checkNull(objData.gross) / this.checkNull(objData.act)) * 100).toFixed(2)),//gross profit/sales*100
          parties: this.checkNull(objData.cytd_parties),
        },
        {
          name: 'Shortfall(%)',
          amount: Number(this.checkNull(objData.targ)) > 0 ? (100 - ((this.checkNull(objData.act) / this.checkNull(objData.targ)) * 100)).toFixed(2) : 0.00,
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Service(CYTD)',
          amount:  (this.checkNull(objData.dhd_service_amt) ).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: (this.checkNull(objData.dhd_serv_parties) ),
        },
        {
          name: 'Cables(%)',
          amount: this.checkNull(objData.cable_per).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'NonCables(%)',
          amount: this.checkNull(objData.noncable_per).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Yesterday Sale',
          amount: this.checkNull(objData.yestsales).toFixed(0),
          gp: this.checkNaN(((this.checkNull(objData.yestprofit) / this.checkNull(objData.yestsales)) * 100).toFixed(2)),//gross profit/sales*100
          /* parties: this.checkNull(objData.yesterday_parties).toFixed(2), */
          parties: this.checkNull(objData.yesterday_parties),
        },
        {
          name: 'Sale(LYTD)',
          amount: this.checkNull(objData.lytd_sales).toFixed(0),
          gp: this.checkNaN(((this.checkNull(objData.lytd_gross_profit) / this.checkNull(objData.lytd_sales)) * 100).toFixed(2)),//gross profit/sales*100
          parties: this.checkNull(objData.lytd_parties),
        },
        {
          name: 'Sale(CYMTD)',
          amount: this.checkNull(objData.mtdsales).toFixed(0),
          gp: this.checkNaN(((this.checkNull(objData.mtd_profit) / this.checkNull(objData.mtdsales)) * 100).toFixed(2)),//gross profit/sales*100
          //parties: this.checkNull(objData.cymtd_parties).toFixed(2),
          parties: this.checkNull(objData.cymtd_parties),
        },
        {
          name: 'Sale(LYMTD)',
          amount: this.checkNull(objData.lymtd_sales).toFixed(0),
          gp: this.checkNaN(((this.checkNull(objData.lymtd_gross_profit) / this.checkNull(objData.lymtd_sales)) * 100).toFixed(2)),
          parties: this.checkNull(objData.lymtd_parties),
        },
      ]

      this.dataSourceSales = [
        [
          { name: "TARGET", value: this.checkNull(objData.targ).toFixed(0)},
          {name: "SALES", value: this.checkNull(objData.act).toFixed(0)}
        ],

        [
          {name: 'CABLES',value: this.checkNull(objData.cable_per).toFixed(2)},
          {name: 'NONCABLES',value: this.checkNull(objData.noncable_per).toFixed(2)}
        ],

        [
          {name: "CYMTD", value: this.checkNull(objData.mtdsales).toFixed(0)},
          {name: "LYMTD", value: this.checkNull(objData.lymtd_sales).toFixed(0)}
        ]
      ]

      this.dataSourceSalesInRs = this.dataSourceSales
      this.txtDataSourceSalesInRs = this.txtDataSourceSales

      this.dataSourceSalesInLac = [
        [ {name: "TARGET", value: (this.checkNull(objData.targ) / 100000).toFixed(2)},
          {name: "SALES", value: (this.checkNull(objData.act) / 100000).toFixed(2)}
        ],
        [
          {name: 'CABLES',value: this.checkNull(objData.cable_per).toFixed(2)},
          {name: 'NONCABLES',value: this.checkNull(objData.noncable_per).toFixed(2)}
        ],

        [
          {name: "CYMTD", value: (this.checkNull(objData.mtdsales) / 100000).toFixed(2)},
          {name: "LYMTD", value: (this.checkNull(objData.lymtd_sales) / 100000).toFixed(2)}
        ]
      ]

      this.txtDataSourceSalesInLacs = [
        {
          name: 'TARGET(CYTD)',
          amount: (this.checkNull(objData.targ) / 100000).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Sale(CYTD)',
          amount: (this.checkNull(objData.act) / 100000).toFixed(2),
          gp: this.checkNaN(((this.checkNull(objData.gross) / this.checkNull(objData.act)) * 100).toFixed(2)),
          parties: this.checkNull(objData.cytd_parties),
        },
        {
          name: 'Shortfall(%)',
          amount: Number(this.checkNull(objData.targ)) > 0 ? (100 - ((this.checkNull(objData.act) / this.checkNull(objData.targ)) * 100)).toFixed(2) : 0.00,
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Service(CYTD)',
          amount:   (this.checkNull(objData.dhd_service_amt) / 100000).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: (this.checkNull(objData.dhd_serv_parties)),
        },
        {
          name: 'Cables(%)',
          amount: this.checkNull(objData.cable_per).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'NonCables(%)',
          amount: this.checkNull(objData.noncable_per).toFixed(2),
          gp: '',//gross profit/sales*100
          parties: '',
        },
        {
          name: 'Yesterday Sale',
          amount: (this.checkNull(objData.yestsales) / 100000).toFixed(2),
          gp: this.checkNaN(((this.checkNull(objData.yestprofit) / this.checkNull(objData.yestsales)) * 100).toFixed(2)),
          //parties: this.checkNull(objData.yesterday_parties).toFixed(2),
          parties: this.checkNull(objData.yesterday_parties),
        },
        {
          name: 'Sale(LYTD)',
          amount: (this.checkNull(objData.lytd_sales) / 100000).toFixed(2),
          gp: this.checkNaN(((this.checkNull(objData.lytd_gross_profit) / this.checkNull(objData.lytd_sales)) * 100).toFixed(2)),
          /* parties: this.checkNull(objData.lytd_parties).toFixed(2), */
          parties: this.checkNull(objData.lytd_parties),
        },
        {
          name: 'Sale(CYMTD)',
          amount: (this.checkNull(objData.mtdsales) / 100000).toFixed(2),
          gp: this.checkNaN(((this.checkNull(objData.mtd_profit) / this.checkNull(objData.mtdsales)) * 100).toFixed(2)),
          //parties: this.checkNull(objData.cymtd_parties).toFixed(2),
          parties: this.checkNull(objData.cymtd_parties),
        },
        {
          name: 'Sale(LYMTD)',
          amount: (this.checkNull(objData.lymtd_sales) / 100000).toFixed(2),
          gp: this.checkNaN(((this.checkNull(objData.lymtd_gross_profit) / this.checkNull(objData.lymtd_sales)) * 100).toFixed(2)),
          //parties: this.checkNull(objData.lymtd_parties).toFixed(2),
          parties: this.checkNull(objData.lymtd_parties),
        },
      ]
      this.aryTxtDataSource[index] = this.txtDataSourceSalesInLacs
      this.aryDataSource[index] = this.dataSourceSalesInLac
      this.reorderDashData()
    // }

    let ind_rec = this.aryObjDashBoardOrder.findIndex(
      row => row.name === 'RECEIVABLE'
    )
    if (rowRights.showreceivable=='Y' && ind_rec >= 0) {
      this.txtDataSourceReceivable = [
        { name: 'TOTAL OS', amount: this.checkNull(objData.rec).toFixed(0), parties: this.checkNull(objData.rec_days)+" / "+this.checkNull(objData.rec_number)},
        { name: 'OS ABV 90', amount: this.checkNull(objData.salabv90).toFixed(0), parties: this.checkNull(objData.abv90)},
        { name: 'OS ABV 120', amount: this.checkNull(objData.salabv120).toFixed(0), parties: this.checkNull(objData.abv120)},
        { name: 'OS ABV 150', amount: this.checkNull(objData.salabv150).toFixed(0), parties: this.checkNull(objData.abv150)},
        { name: 'OS ABV 180', amount: this.checkNull(objData.salabv180).toFixed(0), parties: this.checkNull(objData.abv180)},
        { name: 'OS ABV 1YR', amount: this.checkNull(objData.salabv1yr).toFixed(0), parties: this.checkNull(objData.abv1yr)},
        { name: 'OS ABV 2YR', amount: this.checkNull(objData.salabv2yr).toFixed(0), parties: this.checkNull(objData.abv2yr)},
        { name: 'OS ABV 3YR', amount: this.checkNull(objData.salabv3yr).toFixed(0), parties: this.checkNull(objData.abv3yr) },
      ]

      this.dataSourceReceivable=[
        [
          { name: 'OS ABV 90', value: this.checkNull(objData.salabv90).toFixed(0)},
          { name: 'OS ABV 120', value: this.checkNull(objData.salabv120).toFixed(0)},
          { name: 'OS ABV 150', value: this.checkNull(objData.salabv150).toFixed(0)},
          { name: 'OS ABV 180', value: this.checkNull(objData.salabv180).toFixed(0)},
          { name: 'OS ABV 1YR', value: this.checkNull(objData.salabv1yr).toFixed(0)},
          { name: 'OS ABV 2YR', value: this.checkNull(objData.salabv2yr).toFixed(0)},
          { name: 'OS ABV 3YR', value: this.checkNull(objData.salabv3yr).toFixed(0)}
        ],

        [
          { name: 'OS ABV 90', value: this.checkNull(objData.abv90)},
          { name: 'OS ABV 120', value: this.checkNull(objData.abv120)},
          { name: 'OS ABV 150', value: this.checkNull(objData.abv150)},
          { name: 'OS ABV 180', value: this.checkNull(objData.abv180)},
          { name: 'OS ABV 1YR', value: this.checkNull(objData.abv1yr)},
          { name: 'OS ABV 2YR', value: this.checkNull(objData.abv2yr)},
          { name: 'OS ABV 3YR', value: this.checkNull(objData.abv3yr)}
        ]
      ]

      this.dataSourceReceivableInRs = this.dataSourceReceivable
      this.txtDataSourceReceivableInRs = this.txtDataSourceReceivable

      this.dataSourceReceivableInLac=[
        [
          { name: 'OS ABV 90', value: (this.checkNull(objData.salabv90)/100000).toFixed(2)},
          { name: 'OS ABV 120', value: (this.checkNull(objData.salabv120)/100000).toFixed(2)},
          { name: 'OS ABV 150', value: this.checkNull((objData.salabv150)/100000).toFixed(2)},
          { name: 'OS ABV 180', value: (this.checkNull(objData.salabv180)/100000).toFixed(2)},
          { name: 'OS ABV 1YR', value: (this.checkNull(objData.salabv1yr)/100000).toFixed(2)},
          { name: 'OS ABV 2YR', value: (this.checkNull(objData.salabv2yr)/100000).toFixed(2)},
          { name: 'OS ABV 3YR', value: (this.checkNull(objData.salabv3yr)/100000).toFixed(2)}
        ],
        [
          { name: 'OS ABV 90', value: this.checkNull(objData.abv90)},
          { name: 'OS ABV 120', value: this.checkNull(objData.abv120)},
          { name: 'OS ABV 150', value: this.checkNull(objData.abv150)},
          { name: 'OS ABV 180', value: this.checkNull(objData.abv180)},
          { name: 'OS ABV 1YR', value: this.checkNull(objData.abv1yr)},
          { name: 'OS ABV 2YR', value: this.checkNull(objData.abv2yr)},
          { name: 'OS ABV 3YR', value: this.checkNull(objData.abv3yr)}
        ]
        ]

      this.txtDataSourceReceivableInLacs = [
        
        { name: 'TOTAL OS', amount: (this.checkNull(objData.rec) / 100000).toFixed(2), parties: this.checkNull(objData.rec_days)+" / "+this.checkNull(objData.rec_number)},
        { name: 'OS ABV 90', amount: (this.checkNull(objData.salabv90) / 100000).toFixed(2), parties: this.checkNull(objData.abv90) },
        { name: 'OS ABV 120', amount: (this.checkNull(objData.salabv120) / 100000).toFixed(2), parties: this.checkNull(objData.abv120) },
        { name: 'OS ABV 150', amount: (this.checkNull(objData.salabv150) / 100000).toFixed(2), parties: this.checkNull(objData.abv150) },
        { name: 'OS ABV 180', amount: (this.checkNull(objData.salabv180) / 100000).toFixed(2), parties: this.checkNull(objData.abv180) },
        { name: 'OS ABV 1YR', amount: (this.checkNull(objData.salabv1yr) / 100000).toFixed(2), parties: this.checkNull(objData.abv1yr) },
        { name: 'OS ABV 2YR', amount: (this.checkNull(objData.salabv2yr) / 100000).toFixed(2), parties: this.checkNull(objData.abv2yr) },
        { name: 'OS ABV 3YR', amount: (this.checkNull(objData.salabv3yr) / 100000).toFixed(2), parties: this.checkNull(objData.abv3yr) }
      
      ]
      this.aryTxtDataSource[ind_rec] = this.txtDataSourceReceivableInLacs
      this.aryDataSource[ind_rec] = this.dataSourceReceivableInLac
    }

    let ind_doc = this.aryObjDashBoardOrder.findIndex(
      row => row.name === 'DOCS'
    )

    if (rowRights.showpendingdocs=='Y' && ind_doc >= 0) {
      this.txtDataSourceDocs = [
        { name: 'AO VALUE', amount: this.checkNull(objData.dhd_pending_ao_value), gp: objData.dhd_pending_ao_nos, parties: objData.ao_parties },
        { name: 'QOT VALUE', amount: this.checkNull(objData.dhd_pending_qt_value), gp: objData.dhd_pending_qt_nos, parties: objData.quot_parties },
        { name: 'PO VALUE', amount: this.checkNull(objData.dhd_pending_po_value), gp: objData.dhd_pending_po_nos, parties: '' },
        { name: 'GSC VALUE', amount: this.checkNull(objData.dhd_tot_gsc_value), gp: objData.dhd_tot_gsc_nos, parties: objData.dhd_tot_gsc_parties },
        { name: 'GSC PENDING', amount: this.checkNull(objData.dhd_pending_gsc_value), gp: objData.dhd_pending_gsc_nos, parties: objData.dhd_pending_gsc_parties },
        { name: 'UNBILLED DOC', amount: this.checkNull(objData.dhd_unbilled_doc_value), gp: objData.dhd_unbilled_doc_nos, parties: objData.dhd_unbilled_doc_parties },
      ]
      this.txtDataSourceDocsInRs = this.txtDataSourceDocs

      this.txtDataSourceDocsInLacs = [
        { name: 'AO VALUE', amount: (this.checkNull(objData.dhd_pending_ao_value) / 100000).toFixed(2), gp: objData.dhd_pending_ao_nos, parties: objData.ao_parties },
        { name: 'QOT VALUE', amount: (this.checkNull(objData.dhd_pending_qt_value) / 100000).toFixed(2), gp: objData.dhd_pending_qt_nos, parties: objData.quot_parties },
        { name: 'PO VALUE', amount: (this.checkNull(objData.dhd_pending_po_value) / 100000).toFixed(2), gp: objData.dhd_pending_po_nos, parties: '' },
        { name: 'GSC VALUE', amount: (this.checkNull(objData.dhd_tot_gsc_value) / 100000).toFixed(2), gp: objData.dhd_tot_gsc_nos, parties: objData.dhd_tot_gsc_parties },
        { name: 'GSC PENDING', amount: (this.checkNull(objData.dhd_pending_gsc_value) / 100000).toFixed(2), gp: objData.dhd_pending_gsc_nos, parties: objData.dhd_pending_gsc_parties },
        { name: 'UNBILLED DOC', amount: (this.checkNull(objData.dhd_unbilled_doc_value) / 100000).toFixed(2), gp: objData.dhd_unbilled_doc_nos, parties: objData.dhd_unbilled_doc_parties },
      ]

      this.aryTxtDataSource[ind_doc] = this.txtDataSourceDocsInLacs
    }

    
    console.log("this.yesterday_day in main call of loadSalesData"+ this.yesterday_day)
  }

  loadProductData(index: number) {
    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    
    if(this.refresh_dashboard=='N' && sessionStorage.hasOwnProperty('objProductData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objProductData'+this.user_and_company) || '{}');
      this.readProductData(objData,index);
    }
    else{
      this.objservice.getProductData(as_on_date).
      subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          let objData = data.responseData[0]
          if(data.responseData[0].length>0){
            sessionStorage.setItem('objProductData'+this.user_and_company,JSON.stringify(objData));
            this.readProductData(objData,index)
          }
        }
      })
    }
  }

  readProductData(objData: any[],index: number){
    this.txtDataSourceProducts = objData.map(item => {
      return { name: item.dpd_product, qtr1: this.checkNull(item.qtr1), qtr2: this.checkNull(item.qtr2), qtr3: this.checkNull(item.qtr3), qtr4: this.checkNull(item.qtr4) }
    })

    this.txtDataSourceProductsInRs = this.txtDataSourceProducts

    this.txtDataSourceProductsInLacs = objData.map(item => {
      return { name: item.dpd_product, qtr1: (this.checkNull(item.qtr1) / 100000).toFixed(2), qtr2: (this.checkNull(item.qtr2) / 100000).toFixed(2), qtr3: (this.checkNull(item.qtr3) / 100000).toFixed(2), qtr4: (this.checkNull(item.qtr4) / 100000).toFixed(2) }
    })

    this.aryTxtDataSource[index] = this.txtDataSourceProductsInLacs
    this.reorderDashData()
  }
  loadStockData(index: number) {
    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]

    if(this.refresh_dashboard=='N' && sessionStorage.hasOwnProperty('objStockData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objStockData'+this.user_and_company) || '{}');
      this.readStockData(objData,index);
    }
    else{
      this.objservice.getStockData(as_on_date).
      subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          let objData = data.responseData[0][0]
          sessionStorage.setItem('objStockData'+this.user_and_company,JSON.stringify(objData));
          this.readStockData(objData,index);
        }
      })
    }
    
  }

  readStockData(objData: any,index: number){
    this.txtDataSourceStock = [
      { name: 'TOTAL VALUE (DAYS)', amount: this.checkNull(objData.stk_val) + '(' + this.checkNull(objData.stk_days).toFixed(2) + ')' },
      { name: 'VALUE F CATEGORY & ABV', amount: this.checkNull(objData.ecat) },
      { name: 'VALUE ABV 6 MONTHS', amount: this.checkNull(objData.stkabv6m) },
      { name: 'VALUE OF MISC + NOT KNOWN ITEMS', amount: this.checkNull(objData.miscval) },
      { name: 'VALUE OF STOCK IN SCRAP', amount: this.checkNull(objData.scrapval) },
      { name: 'VALUE OF STOCK IN TRANSIT', amount: this.checkNull(objData.transval) },
      { name: 'VALUE ABOVE F CATEGORY ABV 6 MONTHS', amount: this.checkNull(objData.catabvmonths) },

    ]

    this.dataSourceStock=[
      { name: 'VALUE F CATEGORY & ABV', value: this.checkNull(objData.ecat) },
      { name: 'VALUE ABV 6 MONTHS', value: this.checkNull(objData.stkabv6m)  },
      { name: 'VALUE OF MISC + NOT KNOWN ITEMS', value: this.checkNull(objData.miscval)  },
      { name: 'VALUE OF STOCK IN SCRAP', value: this.checkNull(objData.scrapval)  },
      { name: 'VALUE OF STOCK IN TRANSIT', value: this.checkNull(objData.transval)  },
      { name: 'VALUE ABOVE F CATEGORY ABV 6 MONTHS', value: this.checkNull(objData.catabvmonths)  },
    ]

    this.txtDataSourceStockInRs = this.txtDataSourceStock
    this.dataSourceStockInRs=this.dataSourceStock

    this.txtDataSourceStockInLacs = [
      { name: 'TOTAL VALUE (DAYS)', amount: ((this.checkNull(objData.stk_val) / 100000).toFixed(2)) + '(' + this.checkNull(objData.stk_days).toFixed(2) + ')' },
      { name: 'VALUE F CATEGORY & ABV', amount: (this.checkNull(objData.ecat) / 100000).toFixed(2) },
      { name: 'VALUE ABV 6 MONTHS', amount: (this.checkNull(objData.stkabv6m) / 100000).toFixed(2) },
      { name: 'VALUE OF MISC  + NOT KNOWN ITEMS', amount: (this.checkNull(objData.miscval) / 100000).toFixed(2) },
      { name: 'VALUE OF STOCK IN SCRAP', amount: (this.checkNull(objData.scrapval) / 100000).toFixed(2) },
      { name: 'VALUE OF STOCK IN TRANSIT', amount: (this.checkNull(objData.transval) / 100000).toFixed(2) },
      { name: 'VALUE ABOVE F CATEGORY ABV 6 MONTHS', amount: (this.checkNull(objData.catabvmonths) / 100000).toFixed(2) },

    ]

    this.dataSourceStockInLac=[
      { name: 'F CATEGORY & ABV', value: (this.checkNull(objData.ecat)/100000).toFixed(2) },
      { name: 'ABV 6 MONTHS', value: (this.checkNull(objData.stkabv6m)/100000).toFixed(2)  },
      { name: 'MISC + NOT KNOWN ITEMS', value: (this.checkNull(objData.miscval)/100000).toFixed(2)  },
      { name: 'STOCK IN SCRAP', value: (this.checkNull(objData.scrapval)/100000).toFixed(2)  },
      { name: 'STOCK IN TRANSIT', value: (this.checkNull(objData.transval)/100000).toFixed(2)  },
      { name: 'ABOVE F CATEGORY ABV 6 MONTHS', value: (this.checkNull(objData.catabvmonths)/100000).toFixed(2)  },
    ]

    this.aryTxtDataSource[index] = this.txtDataSourceStockInLacs
    this.aryDataSource[index] =this.dataSourceStockInLac
    this.reorderDashData()
  }


  loadBranchData(index: any) {
    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    if(this.refresh_dashboard=='N' && sessionStorage.hasOwnProperty('objBranchData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objBranchData'+this.user_and_company) || '{}');
      this.readBranchData(objData,index);
    }
    else{
      this.objservice.getBranchData(as_on_date).
      subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          let objData = data.responseData[0]
          if(data.responseData[0].length>0){
            sessionStorage.setItem('objBranchData'+this.user_and_company,JSON.stringify(objData));
            this.readBranchData(objData,index)
          }
        }
      })
    }
  }

  readBranchData(objData: any,index: number){
    this.txtDataSourceBranch = objData.map((item: any) => {
      //console.log("item" + item)
      return {
        branch: item.branch, target_sales: this.checkNull(item.target_sales) + ' (' + item.actual_sales + ')', os_amt: this.checkNull(item.os_amt) + ' (' + item.os_days + ')',
        pay_amt: this.checkNull(item.pay_amt), stk_value: this.checkNull(item.stk_value) + ' (' + item.stk_days + ')',
        gp: this.checkNull(item.gp), os_180: this.checkNull(item.os_180) + ' (' + item.nos_180 + ')',
        os_120: this.checkNull(item.os_120) + ' (' + item.nos_120 + ')', os_90: this.checkNull(item.os_90) + ' (' + item.nos_90 + ')',
        comm_pay: this.checkNull(item.comm_pay) ,
      }
    })

    this.txtDataSourceBranchInRs = this.txtDataSourceBranch

    this.txtDataSourceBranchInLacs = objData.map((item: any) => {
      return {
        branch: item.branch, target_sales: (this.checkNull(item.target_sales) / 100000).toFixed(2) + ' (' + (this.checkNull(item.actual_sales) / 100000).toFixed(2) + ')', os_amt: (this.checkNull(item.os_amt) / 100000).toFixed(2) + ' (' + item.os_days + ')',
        pay_amt: (this.checkNull(item.pay_amt) / 100000).toFixed(2), stk_value: (this.checkNull(item.stk_value) / 100000).toFixed(2) + ' (' + this.checkNull(item.stk_days) + ')',
        gp: this.checkNull(item.gp), os_180: (this.checkNull(item.os_180) / 100000).toFixed(2) + ' (' + this.checkNull(item.nos_180) + ')',
        os_120: (this.checkNull(item.os_120) / 100000).toFixed(2) + ' (' + this.checkNull(item.nos_120) + ')', os_90: (this.checkNull(item.os_90) / 100000).toFixed(2) + ' (' + this.checkNull(item.nos_90) + ')',
        comm_pay: (this.checkNull(item.comm_pay) / 100000).toFixed(2),
      }
    })

    this.aryTxtDataSource[index] = this.txtDataSourceBranchInLacs
    this.reorderDashData()
  }
  loadAllBranchSalesData(index: number) {
    let as_on_date = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
    as_on_date = as_on_date.split("-")[2] + '/' + as_on_date.split("-")[1] + '/' + as_on_date.split("-")[0]
    if(this.refresh_dashboard=='N' && sessionStorage.hasOwnProperty('objAllBranchData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objAllBranchData'+this.user_and_company) || '{}');
      this.readAllBranchData(objData,index);
    }
    else{
      this.objservice.loadAllBranchSalesData(as_on_date).subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.txtDataSourceBranchSales = data.responseData[0]
          if(data.responseData[0].length>0){
            sessionStorage.setItem('objAllBranchData'+this.user_and_company,JSON.stringify(this.txtDataSourceBranchSales));
            this.readAllBranchData(this.txtDataSourceBranchSales,index)
          }
        }
      })
    }
  }

  readAllBranchData(obj: any,index: number){
    this.txtDataSourceBranchSalesInRs = obj.map((item: any) => {
      return {
        branch: item.branch, dst_doc_type: item.dst_doc_type,
        dst_today_amount: (this.checkNull(item.dst_today_amount)).toFixed(2),
        dst_today_gp: this.checkNaN(((this.checkNull(item.dst_today_gp) / this.checkNull(item.dst_today_amount) * 100)).toFixed(2)),
        dst_today_nos: this.checkNull(item.dst_today_nos).toFixed(0),
        dst_yesterday_amount: (this.checkNull(item.dst_yesterday_amount)).toFixed(2),
        dst_yesterday_gp: this.checkNaN((this.checkNull(item.dst_yesterday_gp) / this.checkNull(item.dst_yesterday_amount) * 100)).toFixed(2),
        dst_yesterday_nos: (this.checkNull(item.dst_yesterday_nos)).toFixed(0),
        dst_comm_payable: (this.checkNull(item.dst_comm_payable)).toFixed(0),
        dst_cmtd_amount: (this.checkNull(item.dst_cmtd_amount)).toFixed(2),
        dst_cmtd_gp: this.checkNaN((this.checkNull(item.dst_cmtd_gp) / this.checkNull(item.dst_cmtd_amount) * 100)).toFixed(2),
        dst_cmtd_nos: (this.checkNull(item.dst_cmtd_nos)).toFixed(0),
        dst_cytd_amount: (this.checkNull(item.dst_cytd_amount)).toFixed(2),
        dst_cytd_gp: this.checkNaN((this.checkNull(item.dst_cytd_gp) / this.checkNull(item.dst_cytd_amount) * 100)).toFixed(2),
        dst_cytd_nos: (this.checkNull(item.dst_cytd_nos)).toFixed(0)
      }
    })

    this.txtDataSourceBranchSalesInLacs = obj.map((item: any) => {
      return {
        branch: item.branch, dst_doc_type: item.dst_doc_type,
        dst_today_amount: (this.checkNull(item.dst_today_amount) / 100000).toFixed(2),
        dst_today_gp: this.checkNaN((this.checkNull(item.dst_today_gp) / this.checkNull(item.dst_today_amount) * 100)).toFixed(2),
        dst_today_nos: (this.checkNull(item.dst_today_nos)).toFixed(0),
        dst_yesterday_amount: (this.checkNull(item.dst_yesterday_amount) / 100000).toFixed(2),
        dst_yesterday_gp: this.checkNaN((this.checkNull(item.dst_yesterday_gp) / this.checkNull(item.dst_yesterday_amount) * 100)).toFixed(2),
        dst_yesterday_nos: (this.checkNull(item.dst_yesterday_nos)).toFixed(0),
        dst_comm_payable: (this.checkNull(item.dst_comm_payable)/100000).toFixed(0),

        dst_cmtd_amount: (this.checkNull(item.dst_cmtd_amount) / 100000).toFixed(2),
        dst_cmtd_gp: this.checkNaN((this.checkNull(item.dst_cmtd_gp) / this.checkNull(item.dst_cmtd_amount) * 100)).toFixed(2),
        dst_cmtd_nos: (this.checkNull(item.dst_cmtd_nos)).toFixed(0),
        dst_cytd_amount: (this.checkNull(item.dst_cytd_amount) / 100000).toFixed(2),
        dst_cytd_gp: this.checkNaN((this.checkNull(item.dst_cytd_gp) / this.checkNull(item.dst_cytd_amount) * 100)).toFixed(2),
        dst_cytd_nos: (this.checkNull(item.dst_cytd_nos)).toFixed(0)
      }
    })
    this.aryTxtDataSource[index] = this.txtDataSourceBranchSalesInLacs
    this.reorderDashData()
  }

  loadGodownData(index: number) {
    
    if(this.refresh_dashboard=='N' && sessionStorage.hasOwnProperty('objGodownData'+this.user_and_company)){
      let objData = JSON.parse(sessionStorage.getItem('objGodownData'+this.user_and_company)  || '{}');
      this.readGodownData(objData,index);
    }
    else{
      this.objservice.loadGodownData().subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.txtDataSourceGodown = data.responseData[0]
          if(data.responseData[0].length>0){
            sessionStorage.setItem('objGodownData'+this.user_and_company,JSON.stringify(this.txtDataSourceGodown));
            this.readGodownData(this.txtDataSourceGodown,index)
          }
        }
      })
    }
  }

  readGodownData(obj: any,index: number){
    this.txtDataSourceGodownInRs = obj.map((item: any) => {
      return {
        ddg_branch : this.checkNull(item.ddg_branch) ,
        ddg_godown : this.checkNull(item.ddg_godown) ,
        ddg_today_challan : this.checkNaN(this.checkNull(item.ddg_today_challan)) ,
        ddg_today_do : this.checkNaN(this.checkNull(item.ddg_today_do)) ,
        ddg_today_line_item : this.checkNaN(this.checkNull(item.ddg_today_line_item)) ,
        ddg_yesterday_challan : this.checkNaN(this.checkNull(item.ddg_yesterday_challan)) ,
        ddg_yesterday_do : this.checkNaN(this.checkNull(item.ddg_yesterday_do)) ,
        ddg_yesterday_line_item : this.checkNaN(this.checkNull(item.ddg_yesterday_line_item)) ,    
        ddg_cytd_challan : this.checkNaN(this.checkNull(item.ddg_cytd_challan)) ,
        ddg_cytd_do : this.checkNaN(this.checkNull(item.ddg_cytd_do)) ,
        ddg_cytd_line_item : this.checkNaN(this.checkNull(item.ddg_cytd_line_item))
      }
    })

    this.txtDataSourceGodownInLacs = obj.map((item: any) => {
      return {
        ddg_branch : this.checkNull(item.ddg_branch) ,
        ddg_godown : this.checkNull(item.ddg_godown) ,
        ddg_today_challan : this.checkNaN(this.checkNull(item.ddg_today_challan)) ,
        ddg_today_do : this.checkNaN(this.checkNull(item.ddg_today_do)) ,
        ddg_today_line_item : this.checkNaN(this.checkNull(item.ddg_today_line_item)) ,
        ddg_yesterday_challan : this.checkNaN(this.checkNull(item.ddg_yesterday_challan)) ,
        ddg_yesterday_do : this.checkNaN(this.checkNull(item.ddg_yesterday_do)) ,
        ddg_yesterday_line_item : this.checkNaN(this.checkNull(item.ddg_yesterday_line_item)) ,    
        ddg_cytd_challan : this.checkNaN(this.checkNull(item.ddg_cytd_challan)) ,
        ddg_cytd_do : this.checkNaN(this.checkNull(item.ddg_cytd_do)) ,
        ddg_cytd_line_item : this.checkNaN(this.checkNull(item.ddg_cytd_line_item))
      }
    })
    this.aryTxtDataSource[index] = this.txtDataSourceGodownInLacs
    this.reorderDashData()
  }

  onSelect(event: any) {
    //console.log(event)
  }

  viewReport(obj: any, rpt_type: any, col_name: string) {
    if (rpt_type.type == 'RECEIVABLE'&& obj.name!='TOTAL OS') {
      const dialogRef = this.dialog.open(DashboardDialogComponent, {
        width: '90%',
        minWidth: '90%',
        height: '80%',
        maxHeight: '200vh',
        data: {
          title: rpt_type.title,
          flgRPDetail: 'Y',
          report_name: 'RECEIVABLE',
          rpt_type: obj.name,
          branch: '',
          doc_type: '',
          payload: {
            as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
            branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
            siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
          }
        }
      });
      dialogRef.afterClosed().subscribe((item: any) => {
      })
    }
    else if (rpt_type.type == 'DOCS') {
      if (obj.name != "UNBILLED DOC") {

        if (obj.name != "GSC VALUE" && obj.name != "GSC PENDING") {
          const dialogRef = this.dialog.open(DashboardDialogComponent, {
            width: '90%',
            minWidth: '90%',
            height: '80%',
            maxHeight: '200vh',
            data: {
              title: rpt_type.title,
              flgRPDetail: 'Y',
              report_name: 'DOCS',
              rpt_type: obj.name,
              branch: '',
              doc_type: '',
              payload: {
                as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
                branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
                siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))   || ''),
              }
            }
          });
          dialogRef.afterClosed().subscribe((item: any) => {
          })
        }
      }
      else {

        let reportPayload: any //FilterFormModel = new FilterFormModel();
        let branch: BranchModel = new BranchModel("", atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
          atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''), "");

        let godown: GodownModel = new GodownModel('', 'All', 'All');
        let ordered_by: ElementModel = new ElementModel("PARTY_HANDLED_BY", "PARTY_HANDLED_BY")
        let yesterDateDate: Date = new Date();
        let fromDate = new Date(yesterDateDate.setDate(yesterDateDate.getDate() - 90));
        let toDate = this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-')
        reportPayload = {
          from_date: this.commonsService.date_ymd(fromDate),
          to_date: toDate,
          branch: branch,
          godown: godown,
          ordered_by: ordered_by,
          callFrom: "dashboard"
        }
        if (this.userRightsList) {
          reportPayload.user_rights_list = this.userRightsList
        }
        console.log("reportPayload            ", reportPayload)
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(reportPayload));
        window.open('session/reports/challan-reports/unbilled-document', '_blank'), { state: reportPayload };
      }
    }
    else if (rpt_type.type == 'SALES') {
      // alert("a")
      // if ((obj.name == "Sale(CYTD)") && col_name == "Amount") {

      //   const dialogRef = this.dialog.open(DashboardDialogComponent, {
      //     width: '90%',
      //     minWidth: '90%',
      //     height: '80%',
      //     maxHeight: '200vh',
      //     data: {
      //       title: rpt_type.title,
      //       flgRPDetail: 'Y',
      //       report_name: 'SALES',
      //       rpt_type: obj.name,
      //       branch: 'ALL INDIA',
      //       doc_type: '',
      //       payload: {
      //         as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
      //         branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      //         siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      //       }
      //     }
      //   });
      //   dialogRef.afterClosed().subscribe(item => {
      //   })
      // } else
      
      if ((obj.name == "Yesterday Sale") && col_name == "Amount") {
        const dialogRef = this.dialog.open(DashboardDialogComponent, {
          width: '90%',
          minWidth: '90%',
          height: '80%',
          maxHeight: '200vh',
          data: {
            title: rpt_type.title,
            flgRPDetail: 'Y',
            report_name: 'SALES',
            rpt_type: obj.name,
            branch: 'ALL INDIA',
            doc_type: '',
            payload: {
              yesterday_date: this.yesterday_day,
              as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
              branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
              siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
            }
          }
        });
        dialogRef.afterClosed().subscribe((item: any) => {
        })
      }
      else {
        if ((obj.name == "Sale(CYTD)") && col_name == "GP / NOs") {
          let reportPayload: any
          let yesterDateDate = this.form.controls.dtDashDate.value
          let asOnDate = new Date(yesterDateDate.setDate(yesterDateDate.getDate() - 1));
          reportPayload = {
            callFrom: "dashboard",
            chkSD: "true",
            branch: 'ALL INDIA',
            txtAsOnDate: this.getFormattedDate(asOnDate),
            userInformationDto: {
              usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''), 
              usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
              fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
              fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
              fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
              usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
              usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
              usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
              usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) || ''),
              usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),

            },
          }

          sessionStorage.removeItem("data");
          sessionStorage.setItem("stateData", JSON.stringify(reportPayload));
          window.open('session/reports/mis-reports/business-reports/SalesDetailsView', '_blank'), { state: reportPayload };
        }
      }
    }
    else if (rpt_type.type == 'BRANCH_SALE') {
      const dialogRef = this.dialog.open(DashboardDialogComponent, {
        width: '90%',
        minWidth: '90%',
        height: '80%',
        maxHeight: '200vh',
        data: {
          title: rpt_type.title,
          flgRPDetail: 'Y',
          report_name: 'BRANCH_SALE',
          rpt_type: col_name,
          branch: obj.branch,
          doc_type: obj.dst_doc_type,
          payload: {
            as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
            branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
            siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
          }
        }
      });
      dialogRef.afterClosed().subscribe((item: any) => {
      })
    }
    else if (rpt_type.type == "STOCK") {
      const dialogRef = this.dialog.open(DashboardDialogComponent, {
        width: '90%',
        minWidth: '90%',
        height: '80%',
        maxHeight: '200vh',
        data: {
          title: rpt_type.title,
          flgRPDetail: 'Y',
          report_name: 'STOCK',
          rpt_type: obj.name,
          branch: '',
          doc_type: '',
          payload: {
            as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
            branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
            siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
          }
        }
      });
      dialogRef.afterClosed().subscribe((item: any) => {
      })
    } 
  }

  getHandledByUserRights(reportTypePageId: any, userCode?: any): void {
    this.utilityService.getHandledByUserRights(reportTypePageId, userCode).subscribe(
      data => {
        let userRightsData = data[0]
        if (
          userRightsData.responseStatus === 'SUCCESS' &&
          userRightsData.responseCode === 'RES_200'
        ) {
          this.userRightsList = new UserRightsModel({
            ghead: userRightsData.responseData[0].ghead,
            guser: userRightsData.responseData[0].guser,
            rhead: userRightsData.responseData[0].rhead,
            suser: userRightsData.responseData[0].suser,
          })
        }
        return this.userRightsList
      },
      error => {
        console.log(error)
      }
    )
  }

  getUserPreference() {
    if(localStorage.hasOwnProperty('aryObjDashBoardOrder')){
      //read from local storage
      this.aryObjDashBoardOrder = JSON.parse(localStorage.getItem('aryObjDashBoardOrder') || '{}')
    }
    else{
      //first time user
      localStorage.setItem('aryObjDashBoardOrder','[{"name":"STOCK","chart":false,"chart_name":"pie","amount":true},{"name":"RECEIVABLE","chart":false,"chart_name":"pie","amount":true},{"name":"SALES","chart":false,"chart_name":"pie/bar","amount":true},{"name":"QUARTER","chart":false,"chart_name":"bar","amount":true},{"name":"DOCS","chart":false,"chart_name":"","amount":true},{"name":"PRODUCT","chart":false,"chart_name":"","amount":true},{"name":"BRANCH","chart":false,"chart_name":"","amount":true},{"name":"BRANCH_SALE","chart":false,"chart_name":"","amount":true} ,{"name":"GODOWN","chart":false,"chart_name":"","amount":true}]')
      this.aryObjDashBoardOrder = JSON.parse(localStorage.getItem('aryObjDashBoardOrder')  || '{}')
    }

    let aryFlgCharTemp: any = []
    let aryToggleAmtTemp: any = []
    let index = 0
    this.aryObjDashBoardOrder.forEach(element => {
      aryFlgCharTemp.push(element.chart)
      aryToggleAmtTemp.push(element.amount)
      // this.showDashboard(element.name, index++, false)
    });

    this.aryFlgViewChart = aryFlgCharTemp
    this.aryToggleAmt = aryToggleAmtTemp
            
    this.loadDashData();
  }

  refreshDashboard() {
    this.objservice.refreshDashboard().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.refresh_dashboard = data.responseData[0]
          if(!sessionStorage.hasOwnProperty(data.responseData[0]+this.user_and_company)) {
            this.refresh_dashboard ='Y'
            sessionStorage.setItem(data.responseData[0]+this.user_and_company,'Y');
          }
          else if(sessionStorage.getItem(data.responseData[0]+this.user_and_company)=='Y') {
            this.refresh_dashboard ='N'
          }
          else{
            this.refresh_dashboard ='Y'
            sessionStorage.setItem(data.responseData[0]+this.user_and_company,'Y');
          }

          this.getUserPreference()
        }
      })
  }
  updateUserPreference(flgUpdate: any) {
    localStorage.setItem('aryObjDashBoardOrder',JSON.stringify(this.aryObjDashBoardOrder));
    if (flgUpdate) {
      this.reorderDashData();
    }
    this.shiftDashBoard()

  }

  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);

    return formattedDate
  }

  ngOnDestroy() {
  }

  ngAfterViewChecked() {
  }

  zoomDialog(title: any, index: number,chartName: any) {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      width: '90%',
      minWidth: '90%',
      height: '80%',
      maxHeight: '200vh',
      data:{
        title: title,
        chartName:chartName,
        dataSource: this.aryTxtDataSource[index],
        dataSourceChart: this.aryDataSource[index],
        lstColumn: this.aryLstColumn[index],
        lstDisplayCoumn: this.aryDisplayColumn[index],
        flgViewChart: this.aryFlgViewChart[index],
        payload: {
          as_on_date: this.utilityServiceAvaxPro.convertDate((this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtDashDate.value, 'dd-MM-yyyy')), '-'),
          branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
          siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        }
      }    
    });
    dialogRef.afterClosed().subscribe((item: any) => {
    })
  }
}

export class DashColumnModel {
  col_name: string
  db_col: string
  flgLink: boolean
  col_type: string
  width?: string
  constructor(
    col_name: string,
    db_col: string,
    flgLink: boolean,
    col_type: string,
    width?: string,
  ) {
    this.col_name = col_name
    this.db_col = db_col
    this.flgLink = flgLink
    this.col_type = col_type
    this.width = width
  }
}


// quarterDetailData = [
//   {
//     quarterly: 'TARGET',
//     q1: 0.00,
//     q2: 0.00,
//     q3: 0.00,
//     q4: 0.00,
//   },
//   {
//     quarterly: 'ACTUAL',
//     q1: 5195.03,
//     q2: 0.00,
//     q3: 0.00,
//     q4: 0.00,
//   },
//   {
//     quarterly: 'SHORTFALL(%)',
//     q1: 0,
//     q2: 0,
//     q3: 0,
//     q4: 0,
//   },
//   {
//     quarterly: 'Service(CYTD)',
//     q1: 100.22,
//     q2: 0.00,
//     q3: 0.00,
//     q4: 0.00,
//   },
//   {
//     quarterly: 'OS DAYS',
//     q1: 35.36,
//     q2: 0.00,
//     q3: 0.00,
//     q4: 0.00,
//   },
//   {
//     quarterly: 'ACTUAL LYTD',
//     q1: 22812.02,
//     q2: 25204.21,
//     q3: 24329.37,
//     q4: 28101.33,
//   },
// ]

// quarterDetailColumns = ['quarterly', 'q1', 'q2', 'q3', 'q4']
