import { Component, OnInit, ViewChild } from '@angular/core';
import {
  StockQueryReportFilterModel,
  StockQueryExpectedStockTableModel,
  StockQueryCatalogRefNoTableModel,
  StockQueryStockLevelTableModel,
  StockQueryNextAndPreviousItemTableModel,
  StockQueryShadowItemListTableModel,
  StockQueryReportTableData,
  StockQueryReportTableModel,
  DynamicColumnsModel,
  UpdateDynamicColumnsModel,
  StockQueryPriceListTableModel,
  StockGroupWiseFilterModel
} from './stock-query-report.model';
import { StockQueryService } from '../../../../../../core/services/utilities/stock-query.service';
import { StockQueryReportService } from './stock-query-report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { SnackbarQueryComponent } from '../../../snackbar-query/snackbar-query.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilityService } from '../../../../../../core/services/utility/utility.service';
import { SettingsComponent } from '../../../../../../shared/components/shared-settings/shared-settings.component';
import { TableColumnHeaderViews } from '../constants';
import { SecondTableColumnHeaderViews } from '../constants';
import { forkJoin } from 'rxjs'
import { share } from 'rxjs/operators'
import { DealersStockComponent } from './dealers-stock/dealers-stock.component';
// import { saveAs } from 'file-saver'
import { ListPriceComponent } from './list-price/list-price.component'
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReservationComponent } from '../../../reservation/components/reservation/reservation.component';
import { I } from '@angular/cdk/keycodes';
import { CommonColumnModel } from '../../../../master/customer-master-draft/customer-master.model';
import { ItemModelwithLP } from '../../../../entry/commons/commons.model';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { Router } from '@angular/router';
import { ItemServiceAvaxPro } from '../../../../../../core/services/utilities/item_avaxpro.service';
import { ItemModel } from '../../../../entry/commons/commons.model';

@Component({
  selector: 'app-stock-query-report',
  templateUrl: './stock-query-report.component.html',
  styleUrls: ['./stock-query-report.component.scss', ],  //'../../../query.scss'
  standalone :false,
})
export class StockQueryReportComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort

  closereportflg=false
  groupWiseReportFlg=false
  groupWiseReportViewFlg=true
  myThumbnail: any
  myFullresImage: any

  queryParams: object = {}
  shadowIndex:number
  shadowItem:any

  showMenuFlag: boolean = true
  filterValues: StockQueryReportFilterModel
  filterValues1: StockGroupWiseFilterModel
  showButtonFlag: boolean = false
  ugmAllowRights: boolean = true
  navigateData = {}
  dataMessage: string
  tableData: any
  tableData1: any
  displayedExpectedStockDataColumns: string[] = [
    'stm_item_code',
    'stm_make',
    'ho_po_stock_branch',
    'ho_po_stock_date',
    'oth_po_stock_branch',
    'oth_po_stock_date'
  ]
  expectedStockDataSource: StockQueryExpectedStockTableModel
  expectedStockTableData: any

  catRefNoDataSource: string[] = []
  catRefNoTableData: any
  dataSource1: any

  stockLevelDataSource: string[] = []
  stockLevelTableData: any

  catRefNoLength: number = 0
  stockLevelLength: number = 0
  priceListLength: number = 0
  totalRowsCount: number = 0
  loggedInBranch: string
  dynamicHeader:any=[]
  expectedStockFlag: boolean = false;
  catRefNoFlag: boolean;
  stockLevelFlag: boolean = false;
  listPriceFlag: boolean = false;
  displayDealerStockFlag: boolean = false
  dealerStockFlag: boolean;
  stockQueryReportFlag: boolean = false

  parentItemCode: string
  parentItemCode1: string
  displayedItemDetailsDataColumns: string[] = [
    'it_item_code',
    'it_prod_code',
    'it_image_name',
    'it_tariff_code',
    'it_old_item_code',
    'min_saleable_length'
  ]
  itemDetailsDataSource: any[] = []

  itemDetailsTableData: any

  nextItemDataSource: string[] = []
  nextShadowItemDataSource: string[] = []

  nextItemTableData: any
  nextShadowItemTableData: any


  previousItemDataSource: string[] = []
  previousShadowItemDataSource: string[] = []

  previousItemTableData: any
  previousShadowItemTableData: any

  similarShadowItemTableData: any

  priceListDataSource: string[] = []
  priceListTableData: any

  displayedColumns: string[] = []
  dataSource: MatTableDataSource<StockQueryReportTableData>

  StockQueryReportTableData: any

  fromPage: string
  fromPage1: string

  totalCount: number
  sortDirection: string
  sortBy: string
  dynamicColumns: DynamicColumnsModel[]
  dynamicColumns1:any
  total: number = 0

  cmbItemCode1: string
  rdbUserType1: string
  cmbUserList1: string
  cmbMake1: string 
  cmbState1: string
  cmbBranch1: string
  cmbGodown1: string
  txtQty1: string

  item_code: string
  user_userId: string
  imgUrl: string='';

  stateData: any

  payload: object = {}

  fromPriceListData: string
  showFromPriceListFlag: boolean = false

  stateDataStr: string;

  form: FormGroup
  itm_catalog_ref_no: any;
  it_prod_code: any;
  it_tech_desc: any;
  prevIcon: any = "<<"
  nextIcon: any = ">>"
  starIcon: any = "*"
  stm_suffix: any;
  color_code:any;
  currentItemCode: String
  prod_code: String
  it_image_name: String
  it_tariff_code: String
  min_saleable_length: String
  logged_in_company_code:string=''
  it_item_name:string=''
  utilityData: any;
  lstColumn: CommonColumnModel[] = [  
    { col_name: ' BRANCH CITY', db_col: 'br_city', flgLink: false, col_type: 'TXT' },
    { col_name: 'CATEGORY', db_col: 'category', flgLink: false, col_type: 'TXT' },  
  ];

  grpWiseColumn: CommonColumnModel[] = [
    // { col_name: 'ITEM CODE', db_col: 'ipd_item_code', flgLink: false, col_type: 'TXT' },
    { col_name: 'SR NO', db_col: 'ipd_serial_no', flgLink: false, col_type: 'TXT' },
    { col_name: 'LABEL', db_col: 'ipd_label', flgLink: false, col_type: 'TXT' },
    { col_name: 'VALUE', db_col: 'ipd_value', flgLink: false, col_type: 'TXT' },  
   
  ];
  imgUrlLngth: any;
  productDataSource: any[]
  showProductData: boolean = false

  constructor(
    private stockQueryService: StockQueryService,
    private stockQueryReportService: StockQueryReportService,
    private snackBar: MatSnackBar,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemServiceAvaxPro,


  ) {
    this.fromPage = TableColumnHeaderViews.view_at_init.from_angular_page_id,
    this.fromPage1 = SecondTableColumnHeaderViews.view_at_init.from_angular_page_id

    this.form = this.formBuilder.group({
      hiddenParentItem: [''],
    })
    this.logged_in_company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || "")
  }

  openSelectColumnsModal() {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '300px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      id: 1,
      title: 'Stock Query columns',
      fromPage: this.fromPage,
      dynamicColumnsData: this.dynamicColumns,
    }

    const dialogRef = this.dialog.open(SettingsComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(item => {
      if (typeof item.column_names === 'object') {
        const payload = item.column_names.map((data : any) => {
          return new UpdateDynamicColumnsModel({
            columnId: data.checkbox_columnId,
            tableColumnName: data.checkbox_code,
            displayColumnName: data.checkbox_name,
            enabled: data.selected,
            type: data.type,
            fromPage: this.fromPage,
            routerLink: data.routerLink,
            fixedColumn: data.fixedColumn,
            disableSort: data.disableSort,
            filterConditionColName: data.filterConditionColName,
          })
        })
        this.utilityService.postSaveDynamicColumns(payload).subscribe(data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.dislpayStockQueryReportView(this.fromPage)
            this.onCatRefNoClickHandler()
          }
        })
      }
    })
  }


  ngOnInit() {
    this.showButtonFlag = false
    this.showMenuFlag = true
    this.loadComponent();
    this.logged_in_company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || "")
  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  loadComponent() {
    this.stateDataStr = sessionStorage.getItem("stateData") || '';
    sessionStorage.removeItem("stateData");
    sessionStorage.setItem("refData", this.stateDataStr);

    this.stateData = JSON.parse(this.stateDataStr)
    this.item_code = this.stateData.item_code;
    this.user_userId = this.stateData.user_userId;

    let item: any = { 'item_code': this.stateData.item_code, 'item_name': '', 'item_cat_ref_no': '' };

    let userId = this.stateData.user_userId.split("::")[0]
    let username = this.stateData.user_userId.split("::")[1]
    let user: any = { 'user_userId': userId, 'user_userName': username };
    this.parentItemCode = this.stateData.item_code
    this.cmbItemCode1 = this.stateData.item_code
    this.rdbUserType1 = "U"
    this.cmbUserList1 = user
    this.cmbMake1 = ''
    this.cmbState1 = ''
    this.cmbBranch1 = ''
    this.cmbGodown1 = ''
    this.txtQty1 = ''

    this.filterValues = {
      cmbItemCode: item,
      rdbUserType: "U",
      cmbUserList: user,
      cmbMake: undefined,
      cmbState: undefined,
      cmbBranch: undefined,
      cmbGodown: undefined,
      txtQty: undefined,
      hiddenParentItem: this.form.get("hiddenParentItem")?.value
    }
    this.showMenuFlag = false
    this.closereportflg=false
    this.stockQueryReportFlag = true
    //this.showButtonFlag = true
    this.showFromPriceListFlag = false

    //for dealer stock button rights on load        
    this.stockQueryReportService.checkGrantsForCompany().subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        data.responseData.map((item: any) => {
          if (item.trim() == "Y") {
            //user having no rights for dealers stock buttons
            this.displayDealerStockFlag = true
          }
          else {
            //user having rights for dealers stock buttons
            this.displayDealerStockFlag = false
          }
        })
      }
    })
    this.getItemHeaderDetail(); //get item details
    this.dislpayStockQueryReportView(this.fromPage);    //stock query report companywi 
    //this.onListPriceClickHandler();
    this.onCatRefNoClickHandler()
    //}
  }

  formValue:any=[]

  childFilterFormValues(obj: any) {
    this.groupWiseReportFlg=false
    this.stockQueryReportFlag=false
    this.expectedStockFlag=false;
    this.stockLevelFlag = false;
    this.viewStockQuery(obj);
    this.productDataSource = []
    this.showProductData = false
  }

  viewStockQuery(obj: any){
    if (obj.cmbItemCode == null || obj.cmbItemCode == "")
    {
      
    }
    this.formValue = obj
    this.shadowIndex=0
    this.showMenuFlag = false
    //this.showButtonFlag = true
    this.dataSource = null
    this.previousItemDataSource = null
    this.nextItemDataSource = null
    this.itemDetailsDataSource = []
    this.parentItemCode1= obj.txtItemCode
    
    let item_code = obj.cmbItemCode
    let cmbMainGroup=obj.cmbMainGroup

    if (obj.cmbItemCode != null || obj.cmbItemCode != "") {
      this.parentItemCode = obj.cmbItemCode.item_code
      this.cmbItemCode1 = obj.cmbItemCode
    }
    
    if (obj.rdbUserType != null || obj.rdbUserType != "") {
      this.rdbUserType1 = obj.rdbUserType
    }
    if (obj.cmbUserList != null || obj.cmbUserList != "") {
      this.cmbUserList1 = obj.cmbUserList
    }
    if (obj.cmbMake != null || obj.cmbMake != "") {
      this.cmbMake1 = obj.cmbMake
    }
    if (obj.cmbState != null || obj.cmbState != "") {
      this.cmbState1 = obj.cmbState
    }
    if (obj.cmbBranch != null || obj.cmbBranch != "") {
      this.cmbBranch1 = obj.cmbBranch
    }
    if (obj.cmbGodown != null || obj.cmbGodown != "") {
      this.cmbGodown1 = obj.cmbGodown
    }
    if (obj.txtQty != null || obj.txtQty != "") {
      this.txtQty1 = obj.txtQty
    }
    if (item_code != "" ) {
      this.filterValues = {
        cmbItemCode: obj.cmbItemCode,
        rdbUserType: obj.rdbUserType,
        cmbUserList: obj.cmbUserList,
        cmbMake: obj.cmbMake,
        cmbState: obj.cmbState,
        cmbBranch: obj.cmbBranch,
        cmbGodown: obj.cmbGodown,
        txtQty: obj.txtQty,
        hiddenParentItem: this.form.get("hiddenParentItem").value,
      }
  
      if (obj.fromSubmit != null && obj.fromSubmit != "") {
        if (obj.fromSubmit != "false") {
          this.closereportflg=false
          this.stockQueryReportFlag = true
          //this.showButtonFlag = true
          this.showFromPriceListFlag = false
  
          //for dealer stock button rights on load        
          this.stockQueryReportService.checkGrantsForCompany().subscribe(data => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              data.responseData.map((item : any) => {
                if (item.trim() == "Y") {
                  //user having no rights for dealers stock buttons
                  this.displayDealerStockFlag = true
                }
                else {
                  //user having rights for dealers stock buttons
                  this.displayDealerStockFlag = false
                }
              })
            }
          })
          this.getItemHeaderDetail(); //get item details
          this.getShadowItemHeaderDetail(this.parentItemCode1);
          this.dislpayStockQueryReportView(this.fromPage);    //stock query report companywise
          //this.onListPriceClickHandler();
          this.onCatRefNoClickHandler()
        }
      }
  
      if (obj.fromPriceList != null && obj.fromPriceList != "") {
        if (obj.fromPriceList != "false") {
          this.showMenuFlag = false
          let fromPriceListParams = obj.cmbUserList.user_userId + "-::-" + obj.rdbUserType
          this.fromPriceListData = fromPriceListParams
          this.showFromPriceListFlag = true
          this.stockQueryReportFlag = false
          this.showButtonFlag = false
          this.insertIntoUTfromPriceList()
        }
      }
    }
    if (cmbMainGroup != undefined&&cmbMainGroup !='All'&& cmbMainGroup !='--SELECT--') {
      this.filterValues1 = {
        cmbMainGroup: obj.cmbMainGroup.group_code,
        cmbSubGroup: obj.cmbSubGroup.group_code,
  
        // hiddenParentItem: this.form.get("hiddenParentItem").value,
      }
      if(obj.txtCat!=null && obj.txtCat!=undefined && obj.txtCat!=''){
        this.filterValues1.txtCategory= obj.txtCat.ipd_value
      }
      if (obj.fromSubmit != null && obj.fromSubmit != "") {
        if (obj.fromSubmit != "false") {
      if(obj.cmbItemCode.item_code==undefined||obj.cmbItemCode==""){
      this.dislpayStockGroupWiseReportView(this.fromPage1);    //stock query report companywise
      }
    }
    }
    if (obj.fromPriceList != null && obj.fromPriceList != "") {
      if (obj.fromPriceList != "false") {
        this.showMenuFlag = false
        let fromPriceListParams = obj.cmbUserList.user_userId + "-::-" + obj.rdbUserType
        this.fromPriceListData = fromPriceListParams
        this.showFromPriceListFlag = true
        this.stockQueryReportFlag = false
        this.showButtonFlag = false
        this.insertIntoUTfromPriceList()
      }
    }
  }

}
  dislpayStockGroupWiseReportView(fromPage : any, sortBy : any, sortOrder : any) {
    forkJoin(
      //this.utilityService.postDynamicColumns(fromPage),
      this.stockQueryReportService.getStockGroupWiseView(
        this.filterValues1,
        sortBy,
        sortOrder
      )
    )
      .pipe(share())
      .subscribe(
        (data : any) => {
          const tableResponse = data[0]
          //setting each
          if (tableResponse.responseStatus === 'SUCCESS') {
            this.tableData = tableResponse.responseData[0]
            this.dynamicHeader=tableResponse.responseData[1];
            this.groupWiseReportFlg=true;
            this.groupWiseReportViewFlg=true
            this.stockQueryReportFlag=false;
            this.showFromPriceListFlag=false;
            //stockReportTableView          
            //this.getStockQueryCompanyWiseView(tableResponse)
          }else if(tableResponse.responseStatus=='FAILURE' && tableResponse.responseCode=='RES_109'){
            this.openSnackBar(tableResponse.message)
            return false;
          }
          return false
        })
  }

  insertIntoUTfromPriceList() {
    this.stockQueryReportService.insertIntoUTfromPriceList(this.filterValues).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
      }
    })
  }

  showStockQueryReport(obj: any) {
    this.dataSource = null
    this.previousItemDataSource = null
    this.nextItemDataSource = null
    this.itemDetailsDataSource = []

    let fromPriceListParams = obj.cmbUserList.user_userId + "-::-" + obj.rdbUserType

    this.fromPriceListData = fromPriceListParams
    if (obj.cmbItemCode != null || obj.cmbItemCode != "") {
      this.parentItemCode = obj.cmbItemCode.item_code
      this.cmbItemCode1 = obj.cmbItemCode
    }
    if (obj.rdbUserType != null || obj.rdbUserType != "") {
      this.rdbUserType1 = obj.rdbUserType
    }
    if (obj.cmbUserList != null || obj.cmbUserList != "") {
      this.cmbUserList1 = obj.cmbUserList
    }
    if (obj.cmbMake != null || obj.cmbMake != "") {
      this.cmbMake1 = obj.cmbMake
    }
    if (obj.cmbState != null || obj.cmbState != "") {
      this.cmbState1 = obj.cmbState
    }
    if (obj.cmbBranch != null || obj.cmbBranch != "") {
      this.cmbBranch1 = obj.cmbBranch
    }
    if (obj.cmbGodown != null || obj.cmbGodown != "") {
      this.cmbGodown1 = obj.cmbGodown
    }
    if (obj.txtQty != null || obj.txtQty != "") {
      this.txtQty1 = obj.txtQty
    }
    this.filterValues = {
      cmbItemCode: obj.cmbItemCode,
      rdbUserType: obj.rdbUserType,
      cmbUserList: obj.cmbUserList,
      cmbMake: obj.cmbMake,
      cmbState: obj.cmbState,
      cmbBranch: obj.cmbBranch,
      cmbGodown: obj.cmbGodown,
      txtQty: obj.txtQty,
      hiddenParentItem: this.form.get("hiddenParentItem").value,
    }

    if (obj.fromSubmit != null && obj.fromSubmit != "") {
      this.closereportflg=false
      this.stockQueryReportFlag = true
      this.groupWiseReportViewFlg=false
      //this.showButtonFlag = true
      this.showFromPriceListFlag = false

      //for dealer stock button rights on load        
      this.stockQueryReportService.checkGrantsForCompany().subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          data.responseData.map(item => {
            if (item.trim() == "Y") {
              //user having no rights for dealers stock buttons
              this.displayDealerStockFlag = true
            }
            else {
              //user having rights for dealers stock buttons
              this.displayDealerStockFlag = false
            }
          })
        }
      })

      this.getItemHeaderDetail(); //get item details

      this.dislpayStockQueryReportView(this.fromPage);    //stock query report companywise
      //this.onListPriceClickHandler();
      this.onCatRefNoClickHandler()
      console.log(this.shadowIndex)
    }
    if (obj.fromPriceList != null && obj.fromPriceList != "") {
      this.showFromPriceListFlag = true
      this.stockQueryReportFlag = false
      this.showButtonFlag = false
    }
  }

  getItemHeaderDetail() {

    this.currentItemCode = '';
    this.prod_code = '';
    this.it_image_name = '';
    this.color_code = '';
    this.it_tariff_code = '';
    this.min_saleable_length = '';
    this.it_item_name='';

    this.stockQueryReportService.getItemHeaderDetailsList(this.parentItemCode).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //item details           
        if (data.responseData[0][0].length > 0) {
          this.closereportflg=false
          this.stockQueryReportFlag = true
          this.groupWiseReportViewFlg=false
          this.itemDetailsDataSource = data.responseData[0][0]
          this.currentItemCode = this.itemDetailsDataSource[0].it_item_code
          this.prod_code = this.itemDetailsDataSource[0].it_prod_code
          this.it_tariff_code = this.itemDetailsDataSource[0].it_tariff_code
          this.color_code = this.itemDetailsDataSource[0].it_color_code
          this.it_item_name=this.itemDetailsDataSource[0].it_item_name
          this.it_tech_desc=this.itemDetailsDataSource[0].it_tech_desc
          //image name
          console.log("IMAGE NAME ====> ",data.responseData[0][3]);
          this.imgUrl = data.responseData[0][3];
          // this.myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
          // this.myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

          

          
          this.stockQueryReportService.getPricListForStockList(this.parentItemCode).subscribe(data => {

            this.priceListLength = data.responseData.length
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                this.priceListTableData = data.responseData.map(priceListItem => {
                  return new StockQueryPriceListTableModel(
                    priceListItem.itm_list_price,
                    priceListItem.cmk_code,
                    priceListItem.itmsale,
                    priceListItem.um_short_desc
                  )
                })
                this.priceListDataSource = this.priceListTableData

            }
          })
      
          this.min_saleable_length = this.itemDetailsDataSource[0].min_saleable_length

          //nextItemDetails
          this.nextItemTableData = data.responseData[0][1].map(nextItem => {
            return new StockQueryNextAndPreviousItemTableModel(
              nextItem.it_item_code
            )
          })
          this.nextItemDataSource = this.nextItemTableData

          //previous item details
          this.previousItemTableData = data.responseData[0][2].map(previousItem => {
            return new StockQueryNextAndPreviousItemTableModel(
              previousItem.it_item_code
            )
          })
          this.previousItemDataSource = this.previousItemTableData
        }
      }
    })
  }
  getShadowItemHeaderDetail(parentItemCode1) {
    this.parentItemCode1=parentItemCode1;
    this.currentItemCode = '';
    this.prod_code = '';
    this.it_image_name = '';
    this.color_code = '';
    this.it_tariff_code = '';
    this.min_saleable_length = '';
    this.shadowIndex=0;

    this.stockQueryReportService.getShadowItemHeaderDetailsList(this.parentItemCode1).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //item details           
        // if (data.responseData[0][0].length > 0) {
        //   this.stockQueryReportFlag = true

        //   this.itemDetailsDataSource = data.responseData[0][0]
        //   this.currentItemCode = this.itemDetailsDataSource[0].it_item_code
        //   this.prod_code = this.itemDetailsDataSource[0].it_prod_code
        //   this.it_tariff_code = this.itemDetailsDataSource[0].it_tariff_code
        //   this.color_code = this.itemDetailsDataSource[0].it_color_code
          
        //   this.stockQueryReportService.getPricListForStockList(this.parentItemCode).subscribe(data => {

          //   this.priceListLength = data.responseData.length
          //   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //       this.priceListTableData = data.responseData.map(priceListItem => {
          //         return new StockQueryPriceListTableModel(
          //           priceListItem.itm_list_price,
          //           priceListItem.cmk_code,
          //           priceListItem.itmsale,
          //           priceListItem.um_short_desc
          //         )
          //       })
          //       this.priceListDataSource = this.priceListTableData

          //   }
          // })
      
          // this.min_saleable_length = this.itemDetailsDataSource[0].min_saleable_length

          //next shadow Item Details
          // this.nextShadowItemTableData = data.responseData[0][1].map(nextItem => {
          //   return new StockQueryNextAndPreviousShadowItemTableModel(
          //     nextItem.it_item_code
          //   )
          // })
          // this.nextShadowItemDataSource = this.nextShadowItemTableData

          //previous shadow item details
          // this.previousShadowItemTableData = data.responseData[0][2].map(previousItem => {
          //   return new StockQueryNextAndPreviousShadowItemTableModel(
          //     previousItem.it_item_code
          //   )
          // })
          this.similarShadowItemTableData = data.responseData[0][0].map(previousItem => {
            return new StockQueryShadowItemListTableModel(
              previousItem.sim_shadow_item_code
            )
          })
          console.log(this.similarShadowItemTableData)

          // this.previousShadowItemDataSource = this.previousShadowItemTableData
      }
      })
    
    }

  dislpayStockQueryReportView(fromPage, sortBy?, sortOrder?) {
    forkJoin(
      this.utilityService.postDynamicColumns(fromPage),
      this.stockQueryReportService.getStockQueryReportView(
        this.filterValues,
        sortBy,
        sortOrder
      )
    )
      .pipe(share())
      .subscribe(
        data => {
          this.groupWiseReportViewFlg=false
          const dynamicColumnsResponse = data[0]
          const tableResponse = data[1]
          if (dynamicColumnsResponse.responseStatus === 'SUCCESS' && dynamicColumnsResponse.responseCode === 'RES_200') {
            this.dynamicColumns = dynamicColumnsResponse.responseData[0].userConfigColumnsDto.map(item => {
              return new DynamicColumnsModel(
                item.displayColumnName,
                item.tableColumnName,
                item.enabled,
                item.columnId,
                item.type
              )
            }
            )
            this.displayedColumns = this.dynamicColumns
              .filter(option => {
                return option.enabled === true
              })
              .map(column => column.column_code)

            //stockReportTableView          
            this.getStockQueryCompanyWiseView(tableResponse)
          }
        })
  }


  getStockQueryCompanyWiseView(tableResponse) {
    let totalRowsCount: number = 0
    let serial_no: number = 0
    this.closereportflg=false
    this.stockQueryReportFlag = true
    this.groupWiseReportViewFlg=false

    if (tableResponse.responseData[0][0].length > 0) {
      this.total = 0;
      this.StockQueryReportTableData = tableResponse.responseData[0][0].map(stockQueryReportItem => {
        let stm_suffix = stockQueryReportItem.stm_suffix

        if (stm_suffix == "NA") {
          stm_suffix = "";
        }
        this.stm_suffix = stm_suffix;
        let stm_balance_qty: number;
        stm_balance_qty = stockQueryReportItem.stm_balance_qty; //converted_qty
        this.total = this.total + stm_balance_qty

        serial_no++;
        let sr: string
        sr = serial_no.toString();

        totalRowsCount = stockQueryReportItem.rowcount

        return new StockQueryReportTableModel(
          stockQueryReportItem.stm_card_type + " " + sr, //" " + stockQueryReportItem.stm_approved +
          stockQueryReportItem.gd_city,
          stockQueryReportItem.gd_short_name, //+ "-" + stockQueryReportItem.gd_octroi_flg,
          stockQueryReportItem.stm_card_no + "-" + stm_suffix + "-" + stockQueryReportItem.stm_inout_number,
          stockQueryReportItem.sr_date,
          stockQueryReportItem.stm_drum_no,
          stockQueryReportItem.stm_item_code,
          stockQueryReportItem.statusflg,
          stockQueryReportItem.stm_phy_loc,
          stockQueryReportItem.mk_short_name,
          stockQueryReportItem.stm_rsv_qty.toFixed(2),
          //stockQueryReportItem.stm_damage_qty.toFixed(2),
          stockQueryReportItem.um_short_desc,
          stockQueryReportItem.stm_act_balance_qty.toFixed(2),//actual_qty
          this.total.toFixed(2),
          stockQueryReportItem.stm_issued_qty,
          stockQueryReportItem.stm_discrepancy_qty,
          stockQueryReportItem.stm_opening_qty,
          stockQueryReportItem.sc_company_short_name,
          stockQueryReportItem.stm_oldstock,
          stockQueryReportItem.stm_card_type,
          stockQueryReportItem.gd_godown_code,
          stockQueryReportItem.gd_godown_name,
          //stockQueryReportItem.stm_approved
          stockQueryReportItem.simflag,
          stockQueryReportItem.stm_company_code
        )
      })
    }
    else {
      this.total = 0;
      if (this.StockQueryReportTableData != undefined) {
        this.StockQueryReportTableData.length = 0;
        this.StockQueryReportTableData.push(
          new StockQueryReportTableModel(
            '',
            "NO DATA FOUND",
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            //'',
            //''
            'N' //simflag
          )
        )
      }
    }

    console.log("this.totalRowsCount  ", totalRowsCount)
    this.totalCount = totalRowsCount
    this.dataSource = new MatTableDataSource(this.StockQueryReportTableData)
    console.log(" final dataSource ", this.dataSource)
    this.dataSource1 = tableResponse.responseData[0][2]

    console.log(" category and branch details list", tableResponse.responseData[0][2])
    
    this.showButtonFlag = true

    if (this.form.get("hiddenParentItem").value == null || this.form.get("hiddenParentItem").value == "") {
      this.form.get("hiddenParentItem").setValue(tableResponse.responseData[0][1][0])
    }
  }

  onExpectedStockClickHandler(event) {
    //for first load 
    if (this.expectedStockFlag == false) {
      //expected stock            
      this.stockQueryReportService.getExpectedStockList(this.parentItemCode).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData.length == 0) {
            this.openSnackBar('No Data Found')
            return false
          }
          else {
            this.expectedStockFlag = true
            this.loggedInBranch = atob(sessionStorage.getItem(btoa('usr_br_city')))
            this.expectedStockTableData = data.responseData.map(expectedItem => {
              return new StockQueryExpectedStockTableModel(
                expectedItem.stm_item_code,
                expectedItem.stm_make,
                expectedItem.ho_po_stock.split("::")[0],
                expectedItem.ho_po_stock.split("::")[1],
                expectedItem.oth_po_stock.split("::")[0],
                expectedItem.oth_po_stock.split("::")[1]
              )
            })
            this.expectedStockDataSource = this.expectedStockTableData
          }
        }
      })
    }
    if (this.expectedStockFlag == false) {
      this.expectedStockFlag = true
    } else {
      this.expectedStockFlag = false
    }
  }
  onItemCategoryClickHandler(){
    this.utilityData = {
      dataSource:this.dataSource1,
      lstColumn: this.lstColumn
    }
    this.transferPDCDetails()

  }
  transferPDCDetails() {

    if (this.utilityData.dataSource.length != 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '75%';
      dialogConfig.minWidth = '75%';
      dialogConfig.maxWidth = '75%';

      dialogConfig.data = {
        title: 'Item Category Details',
        doc_no: '',
        table_data: this.utilityData,
        module_flg: 'TRNSFR_PDC_ISSUE'
      }
      
      const dialogRef = this.dialog.open(GenericDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(item => {
        
      })
    }
    else {
      this.openSnackBar("NO DATA FOUND.");
    }
  }
  
  onCatRefNoClickHandler() {
    this.stockQueryReportService.getCatalogRefNoList(this.parentItemCode).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (data.responseData.length == 0) {
          this.openSnackBar('No Data Found')
          return false
        }
        else {
          this.catRefNoFlag = true
          //catref data
          this.catRefNoLength = data.responseData.length //+ 5           
          this.catRefNoTableData = data.responseData.map(catRefNoItem => {
            this.itm_catalog_ref_no = catRefNoItem.itm_catalog_ref_no
            return new StockQueryCatalogRefNoTableModel(
              catRefNoItem.mk_short_name,
              catRefNoItem.itm_catalog_ref_no
            )
          })
          this.catRefNoDataSource = this.catRefNoTableData
        }
      }
    })
  }

  onStockLevelClickHandler(event) {
    if (this.stockLevelFlag == false) {
      this.stockQueryReportService.getStockLevelList(this.parentItemCode).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData.length == 0) {
            this.openSnackBar('No Data Found')
            return false
          }
          else {
            this.stockLevelFlag = true
            //stock level
            this.stockLevelLength = data.responseData.length
            this.stockLevelTableData = data.responseData.map(stockLevelItem => {
              return new StockQueryStockLevelTableModel(
                stockLevelItem.gd_short_name,
                stockLevelItem.make_code,
                stockLevelItem.stlvl,
                stockLevelItem.gd_godown_name
              )
            })
            this.stockLevelDataSource = this.stockLevelTableData
          }
        }
      })
    }
    if (this.stockLevelFlag == false) {
      this.stockLevelFlag = true
    } else {
      this.stockLevelFlag = false
    }
  }

  onDealerStockClickHandler(event) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '800px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    dialogConfig.data = {
      id: 1,
      title: 'DEALERS STOCK DETAILS',
      itemCode: this.parentItemCode
    }
    console.log('dialogConfig ', dialogConfig)
    const dialogRef = this.dialog.open(DealersStockComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
  }

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackbarQueryComponent, {
      data: message,
      duration: 10000
    });
  }

  navigateToViewPrevoiusItem(element) {
    if(this.expectedStockFlag = true){
      this.expectedStockFlag = false
    }
    if(this.stockLevelFlag = true){
      this.stockLevelFlag = false
    }
    this.closereportflg=false
    this.stockQueryReportFlag = true
    this.groupWiseReportViewFlg=false
    this.showFromPriceListFlag = false
    let obj = {
      cmbItemCode: {
        item_code: element
      },
      rdbUserType: this.rdbUserType1,
      cmbUserList: this.cmbUserList1,
      cmbMake: this.cmbMake1,
      cmbState: this.cmbState1,
      cmbBranch: this.cmbBranch1,
      cmbGodown: this.cmbGodown1,
      txtQty: this.txtQty1,
      fromSubmit: "fromSubmit",
      fromPriceList: null
    }

    this.showStockQueryReport(obj)
    this.onCatRefNoClickHandler()

    console.log(obj.cmbItemCode.item_code)
    this.getShadowItemHeaderDetail(obj.cmbItemCode.item_code);
    this.getProductData(obj.cmbItemCode.item_code)

  }

  navigateToViewNextItem(element) {
    //this.showButtonFlag = true
    if(this.expectedStockFlag = true){
      this.expectedStockFlag = false
    }
    if(this.stockLevelFlag = true){
      this.stockLevelFlag = false
    }
    this.closereportflg=false
    this.stockQueryReportFlag = true
    this.groupWiseReportViewFlg=false
    this.showFromPriceListFlag = false

    let obj = {
      cmbItemCode: {
        item_code: element
      },
      rdbUserType: this.rdbUserType1,
      cmbUserList: this.cmbUserList1,
      cmbMake: this.cmbMake1,
      cmbState: this.cmbState1,
      cmbBranch: this.cmbBranch1,
      cmbGodown: this.cmbGodown1,
      txtQty: this.txtQty1,
      fromSubmit: "fromSubmit",
      fromPriceList: null
    }
    console.log('navigateToViewNextItem params  ', obj)
    this.showStockQueryReport(obj)
    this.onCatRefNoClickHandler()

    console.log(obj.cmbItemCode.item_code)
    this.getShadowItemHeaderDetail(obj.cmbItemCode.item_code);
    this.getProductData(obj.cmbItemCode.item_code)


  }
  
  navigateToViewPreviousShadowItem(shadowIndex,similarShadowItemTableData) {
    if(this.expectedStockFlag = true){
      this.expectedStockFlag = false
    }
    if(this.stockLevelFlag = true){
      this.stockLevelFlag = false
    }
    this.shadowIndex=shadowIndex 
    this.closereportflg=false
    this.stockQueryReportFlag = true
    this.groupWiseReportViewFlg=false
    this.showFromPriceListFlag = false
    let simlen=similarShadowItemTableData.length 
    // if(this.shadowIndex==0)
    // {
    //   this.shadowIndex=simlen-1
    //   this.shadowItem=similarShadowItemTableData[this.shadowIndex].sim_shadow_item_code
    // }
    // else{
    //   this.shadowIndex=this.shadowIndex-1
    //   this.shadowItem=similarShadowItemTableData[this.shadowIndex].sim_shadow_item_code


    //////////////
      if(simlen==0){
        this.openSnackBar(" no previous similar item ")
        return
      }

      if(shadowIndex==1 || shadowIndex==0){
        this.shadowIndex=simlen
        this.shadowItem=similarShadowItemTableData[this.shadowIndex-1].sim_shadow_item_code
      }
      else{
        this.shadowIndex=shadowIndex-1
        this.shadowItem= similarShadowItemTableData[this.shadowIndex-1].sim_shadow_item_code
      }
    

///////////////

    let obj = {
      cmbItemCode: {
        item_code: this.shadowItem
      },
      rdbUserType: this.rdbUserType1,
      cmbUserList: this.cmbUserList1,
      cmbMake: this.cmbMake1,
      cmbState: this.cmbState1,
      cmbBranch: this.cmbBranch1,
      cmbGodown: this.cmbGodown1,
      txtQty: this.txtQty1,
      fromSubmit: "fromSubmit",
      fromPriceList: null
    }
  
  
    console.log('navigateToViewPreviousShadowItem params  ', obj)
    this.showStockQueryReport(obj)
    this.onCatRefNoClickHandler()
  
  }

    navigateToViewNextShadowItem(shadowIndex,similarShadowItemTableData) 
    {
      if(this.expectedStockFlag = true){
        this.expectedStockFlag = false
      }
      if(this.stockLevelFlag = true){
        this.stockLevelFlag = false
      }
      this.shadowIndex = shadowIndex
      this.closereportflg=false
      this.stockQueryReportFlag = true
      this.groupWiseReportViewFlg=false
      this.showFromPriceListFlag = false
      let simlen=similarShadowItemTableData.length

      // console.log(this.shadowIndex)
      // if(this.shadowIndex==simlen) 
      // {
      //   this.shadowIndex=0
      //   this.shadowItem=similarShadowItemTableData[this.shadowIndex].sim_shadow_item_code
      // }
      // else{
      //   this.shadowItem=similarShadowItemTableData[this.shadowIndex].sim_shadow_item_code
      //   this.shadowIndex=this.shadowIndex+1

      // }

        if(simlen==0){
          this.openSnackBar(" no next similar item ")

          return
        }
// //////////
        if(shadowIndex==simlen){
          this.shadowIndex=1
          this.shadowItem= similarShadowItemTableData[this.shadowIndex-1].sim_shadow_item_code
        }
        else{
          this.shadowIndex=shadowIndex+1
          this.shadowItem=similarShadowItemTableData[this.shadowIndex-1].sim_shadow_item_code
        }


//////////
      let obj = {
        cmbItemCode: {
          item_code: this.shadowItem
        },
        rdbUserType: this.rdbUserType1,
        cmbUserList: this.cmbUserList1,
        cmbMake: this.cmbMake1,
        cmbState: this.cmbState1,
        cmbBranch: this.cmbBranch1,
        cmbGodown: this.cmbGodown1,
        txtQty: this.txtQty1,
        fromSubmit: "fromSubmit",
        fromPriceList: null
      }

    
      console.log('navigateToViewNextShadowItem params  ', obj)
      this.showStockQueryReport(obj)
      // this.onCatRefNoClickHandler()    
    }    
  navigateToViewParentItem(element) {
    if(this.expectedStockFlag = true){
      this.expectedStockFlag = false
    }
    if(this.stockLevelFlag = true){
      this.stockLevelFlag = false
    }
    if (this.form.get("hiddenParentItem").value != null && this.form.get("hiddenParentItem").value != "") {
      if (element != this.form.get("hiddenParentItem").value) {
        element = this.form.get("hiddenParentItem").value
      } else {
        this.openSnackBar(" this is parent item ")
        return false;
      }
    } else {
      this.openSnackBar(" this is parent item ")
      return false;
    }

    console.log(" final call items      ", element)
    //this.showButtonFlag = true
    this.closereportflg=false
    this.stockQueryReportFlag = true
    this.groupWiseReportViewFlg=false
    this.showFromPriceListFlag = false

    let obj = {
      cmbItemCode: {
        item_code: element
      },
      rdbUserType: this.rdbUserType1,
      cmbUserList: this.cmbUserList1,
      cmbMake: this.cmbMake1,
      cmbState: this.cmbState1,
      cmbBranch: this.cmbBranch1,
      cmbGodown: this.cmbGodown1,
      txtQty: this.txtQty1,
      fromSubmit: "fromSubmit",
      fromPriceList: null
    }
    this.showStockQueryReport(obj)
    this.onCatRefNoClickHandler()
  }

  onSortData(sort: Sort) {
    this.dislpayStockQueryReportView(
      this.fromPage,
      sort.active,
      sort.direction
    )
  }

  downloadExcel() {
    const fileExt = 'xls'
    const fileName = 'StockQueryReportExcel.xls'
    this.formValues()
    this.stockQueryService.downloadFile(
      { fileName: fileName },
      this.payload
    ).subscribe(data => saveAs(new Blob([data], { type: MimeType[fileExt] }), fileName))
  }

  formValues() {
    this.payload = {
      cmbItemCode: this.cmbItemCode1,
      rdbUserType: this.rdbUserType1,
      cmbUserList: this.cmbUserList1,
      cmbMake: this.cmbMake1,
      cmbState: this.cmbState1,
      cmbBranch: this.cmbBranch1,
      cmbGodown: this.cmbGodown1,
      txtQty: this.txtQty1,
      fileName: 'StockQueryReportExcel.xls',
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
      },
    }
  }

  onListPriceClickHandler(event : any) {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '800px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    dialogConfig.data = {
      id: 1,
      title: 'LIST PRICE',
      itemCode: this.parentItemCode
    }
    console.log('dialogConfig ', dialogConfig)
    const dialogRef = this.dialog.open(ListPriceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
    if (this.listPriceFlag == false) {
      this.listPriceFlag = true
    } else {
      this.listPriceFlag = false
    }


    this.stockQueryReportService.getPricListForStockList(this.parentItemCode).subscribe(data => {

      this.priceListLength = data.responseData.length
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (data.responseData.length == 0) {
          //this.message = this.entryService.showMsg('error');
          //return false
        }
        else {
          this.priceListTableData = data.responseData.map((priceListItem : any)=> {
            return new StockQueryPriceListTableModel(
              priceListItem.itm_list_price,
              priceListItem.mk_short_name,
              priceListItem.itmsale,
              priceListItem.um_short_desc
            )
          })
          this.priceListDataSource = this.priceListTableData
        }
      }
    })
  }

  getCardLedgerReport(row : any) {
    let strCardArray = row.stm_card_no
    let strCardNo = strCardArray.split("-")[0]
    let strSuffix = strCardArray.split("-")[1]
    let strInout = strCardArray.split("-")[2]
    this.queryParams = {
      rdbSearchType: "C",
      gd_godown_code: row.gd_godown_code,
      gd_godown_name: row.gd_godown_name,
      txtSuffix: strSuffix,
      txtCardNo: strCardNo
    }
    sessionStorage.removeItem("data");
    sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
    let data = {
      callFrom: 'stock_query',
      itemCode: this.parentItemCode
    }
    localStorage.setItem('callFrom', JSON.stringify(data));
    window.open('session/query/card-ledger', '_blank'), { state: this.queryParams };
  }

  getReserveQtyReport(row: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '95%'
    dialogConfig.minWidth = '95%'
    dialogConfig.height = '95%'
    dialogConfig.maxHeight = '95%'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.itemDetailsDataSource[0].it_prod_code

    this.tableData1 = this.itemDetailsDataSource.map(item => {
      this.it_prod_code = item.it_prod_code
      this.it_tech_desc = item.it_tech_code
    })

    this.itemDetailsDataSource.forEach(item => {
      this.it_prod_code = item.it_prod_code
      this.it_tech_desc = item.it_tech_code
    })

    dialogConfig.data = {
      item_code: row.stm_item_code,
      godown_name: row.gd_short_name,
      it_prod_code: this.it_prod_code,
      card_no: row.stm_card_no,
      stm_make: row.mk_short_name,
      old_item_code: "",
      um_short_desc: row.um_short_desc,
      gd_godown_code: row.gd_godown_code,
      itm_catalog_ref_no: this.itm_catalog_ref_no,
      from_entry: 'Stock_Qry',
      it_tech_desc: this.it_tech_desc,
      stm_suffix: this.stm_suffix,
      ballace_qty: row.stm_balance_qty,
      stm_rsv_qty: row.stm_rsv_qty,
      stm_opening_qty: row.stm_opening_qty,
      stm_issued_qty: row.stm_issued_qty,
      stm_discrepancy_qty: row.stm_discrepancy_qty,

    }
    const dialogRef = this.dialog.open(ReservationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
    })
  }

  getItemLedgerReport(itemCode : any) {
    this.queryParams = {
      item_code: itemCode,
    }
    sessionStorage.removeItem("data");
    sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
    window.open('session/reports/stock-report/item-ledger', '_blank'), { state: this.queryParams };
  }

  //image
  openImageDialog(imgUrl: any, ItemCode: any,ProdCode: any){
    console.log(imgUrl);
    
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '90%',
      minWidth: '90%',
      height: '80%',
      maxHeight: '200vh',
      data: {
        url: imgUrl,
        item_details: "Item Code : "+ItemCode + " Product Code: " + ProdCode,
        item_code:ItemCode
      }
    });
    dialogRef.afterClosed().subscribe((objBulkData: any) => {

    });
  }
  searchItemCode(row : any){
    //sessionStorage.setItem("it_item_code", it_item_code);
    //this.childFilterFormValues(this.formValue)
    this.formValue.cmbItemCode={item_code:row.it_item_code};
    this.formValue.cmbMake={make_code:row.itm_make_code};
    this.groupWiseReportViewFlg=true
    this.groupWiseReportViewFlg=false
    this.viewStockQuery(this.formValue);
    // this.getProductData(row.it_item_code);
    this.showProductData = true
  }
  closestockreport(){
    this.closereportflg=true
  }
  onClickInfo(itemcode : any){
      let a
     let payload = {
       item_Code:itemcode
       }
     this.stockQueryReportService.getProductData(payload).
     subscribe(data => {
       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
         // console.log(data[0])
         a=2
         this.utilityData = {
           lstColumn: this.grpWiseColumn,
           dataSource: data.responseData
         }
       }
       if (data.responseData.length != 0) {
         const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         dialogConfig.width = '75%';
         dialogConfig.minWidth = '75%';
         dialogConfig.maxWidth = '75%';
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
   
         dialogConfig.data = {
           title: 'Product Detail',
           subtitle:data.responseData[0].it_prod_code,
           doc_no: '',
           prod_data: this.utilityData,
           module_flg: 'PRODUCT_DETAIL',
           item_code:itemcode
         }
         const dialogRef = this.dialog.open(GenericDialogComponent, dialogConfig);
         dialogRef.afterClosed().subscribe(item => {
         })
       }
       else {
         this.openSnackBar("NO DATA FOUND.");
       }
   
     })
 
   }
   public itemLists: ItemModel[] = new Array<ItemModel>()  

   searchItemFilter(itemCode,productCode) {
    if ((itemCode == null || itemCode == '')) {
      this.openSnackBar("Please search Item ");
      return false
    } else {

      let value = itemCode
      this.itemService.getItemList1(value, "stkQuery").subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData[0].length == 0) {
            this.openSnackBar('No item Found');
            return false
          } else {
            this.itemLists = data.responseData[0].map((item : any) => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp,'','','',item.it_image_name)
            });

            console.log(" this.itemLists[0] ", this.itemLists[0])
            // this.form.get('cmbItemCode').setValue(this.itemLists[0])


            // image
            this.imgUrl = this.itemLists[0].item_image;
            this.imgUrlLngth = this.itemLists[0].item_image.length
            console.log("IMage "+this.imgUrl);
            if(this.imgUrl!=""){
            this.openImageDialog(this.imgUrl,itemCode,productCode);
            }
            
          }
        }
        return this.itemLists
      })
    }
  }

  getProductData(itemcode : any) {
    this.productDataSource = []
    let payload = {
      item_Code:itemcode
    }
    this.stockQueryReportService.getProductData(payload).subscribe( data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.productDataSource = data.responseData
      }
    })
  }

}

