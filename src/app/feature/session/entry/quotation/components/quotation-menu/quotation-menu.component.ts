
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConstantsService } from '../../../../../../core/services/constants.service';
import { Router } from '@angular/router';
import { CommonsService } from '../../../../../../shared/services/commons.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuotationService } from '../../quotation.service';
import { QuotationModel } from '../../quotation.model';
import { SnackbarComponent } from '../../../snackbar/snackbar/snackbar.component';
import { ItemModelwithLP } from '../../../commons/commons.model';
import { HandledByModel } from '../../../commons/commons.model';
import { debounceTime, switchMap, tap, startWith, map } from 'rxjs/operators'
import { BrokerModel } from '../../../commons/commons.model';
import { ItemServiceAvaxPro } from '../../../../../../core/services/utilities/item_avaxpro.service';
import { PartyModel } from '../../../commons/commons.model';
import { UtilityService } from '../../../../../../core/services/utility/utility.service';
import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
import { PartyDetailsModel } from '../../../../../../shared/models/model/party-details.model';
import { UserFinYearModel } from '../../../../../../shared/models/model/common.model';
import { DatePipe, formatDate } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../commons/date-adapter/app-date-adapter.service';
import { UserRightsModel } from '../../../../../../shared/models/model/user-rights.model';
import { GenericDialogComponent } from '../../../../generic-dialog/generic-dialog.component';
@Component({
  selector: 'app-quotation-menu',
  templateUrl: './quotation-menu.component.html',
  styleUrls: ['./quotation-menu.component.scss', '../../../entry.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
  { provide: DatePipe },
  { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
  standalone: false
})

export class QuotationMenuComponent implements OnInit {

  queryParams: any = {}
  displayedColumns: string[] = [
    'qt_draft_no',
    'qt_date',
    'qt_cust_code',
    'qt_disp_to_code',
    'qt_inv_type_code',
    'qt_gross',
    'select',
  ]

  payload: any = {}
  filterValues: any = {}

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  dataSource: MatTableDataSource<QuotationModel>
  loading: boolean = false
  tableData: QuotationModel[] = []
  loggedUserName: string
  loggedUserToken: string
  PAGE_SIZE_ARRAY = ConstantsService.PAGE_SIZE_ARRAY
  pageEvent: PageEvent

  totalCount: number

  sortDirection: string
  sortBy: string

  viewEditPagePayload: object = {}
  message: any
  pendingDraft: boolean = false
  pf_party_name: string

  quotRevisionRights: boolean = false;
  quotModifyRights: boolean = false;
  userRightsList: UserRightsModel
  //qtnModifyPageId = "modify_quotation";
  //qtnRevisionPageId = "revision_quotation";
  qtnModifyPageId = "Quot_ModifySearchPage.htm";
  qtnRevisionPageId = "getQuotRevSrchPage.htm";

  yearFormat: string
  fin_year_end: string
  fin_year_beg: string

  serializedDate1 = new FormControl((new Date()).toISOString());
  todayDate1 = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

  serializedDate2 = new FormControl((new Date()).toISOString());
  todayDate2 = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

  branchList: any = [];
  finanYearList: any;

  partyLists: PartyDetailsModel[] = []
  filteredPartyLists: PartyDetailsModel[] = []

  dispPartyLists: PartyDetailsModel[] = []
  filteredDispPPartyLists: PartyDetailsModel[] = []

  itemList: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  itemList1: ItemModelwithLP[] = new Array<ItemModelwithLP>()
  makeLists: any = [];
  chlTypeLists: any = []

  godownLists: any;
  transporterList: any;
  consigneeList: any;

  filteredCSLists: PartyModel[] = new Array<PartyModel>()
  filteredCSLists1: PartyModel[] = new Array<PartyModel>()

  lstHandledBy: any = []
  lstFollowedBy: any = []
  lstInstructedBy: any = []

  filteredHandledByLists: Observable<any>
  filteredFollowedByLists: Observable<any>
  filteredInstructedByLists: Observable<any>

  advanceSearchFlg: boolean = true;
  lstBroker: any

  form: FormGroup;

  advanceSearchExpandFlg: boolean = false;

  flgOtherBranch: string = 'N'
  oth_siscon: string 
  oth_branch: string

  constructor(
    private quotationService: QuotationService,
    private router: Router,
    private commonsService: CommonsService,
    private snackBar: MatSnackBar,
    private utilityService: UtilityService,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private itemService: ItemServiceAvaxPro,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.form = this.formBuilder.group({

      txtFromItemCode: [''],
      txtToItemCode: [''],
      cmbBranch: [''],
      cmbFinacialYr: [''],
      txtQuotNo: [''],
      cmbCustCode: [''],
      cmbDispTo: [''],
      txtUltCustOrdNo: [''],
      cmbFollowedBy: [''],
      cmbPartyHandledBy: [''],
      txtChlNetAmt: [''],
      cmbInstructedBy: [''],
      txtCustOrdNo: [''],
      cmbBroker: [''],
      cmbGodown: [''],
      txtChlAoNo: [''],
      cmbTransporter: [''],
      cmbConsignee: [''],
      txtLrNo: [''],
      txtCustOrdDate: [''],
      txtOrdDate: [''],
      txtQuotToDate: [''],
      txtChlDate: [''],
      txtQuotFromDate: [''],
      dtLrDate: ['', Validators.required],
      txtHandledBy: [''],
      txtFollowedBy: [''],
      txtInstructedBy: [''],
      cmbMake: [''],

      //FOLLOWING FORM COCTROLS FOR ALL CHECKBOXes
      chktxtFromItemCode: [''],
      chktxtToItemCode: [''],
      chkrdbChallanType: [''],
      chkcmbChlTypeOthers: [true],
      chkcmbBranch: [''],
      chktxtQuotNo: [''],
      chkcmbCustCode: [''],
      chkcmbDispTo: [''],
      chktxtUltCustOrdNo: [''],
      chkcmbFollowedBy: [''],
      chkcmbPartyHandledBy: [''],
      chktxtChlNetAmt: [''],
      chkcmbInstructedBy: [''],
      chktxtCustOrdNo: [''],
      chkcmbBroker: [''],
      chkcmbGodown: [''],
      chktxtChlAoNo: [''],
      chkcmbTransporter: [''],
      chkcmbConsignee: [''],
      chktxtLrNo: [''],
      chktxtCustOrdDate: [''],
      chktxtOrdDate: [''],
      chktxtQuotToDate: [''],
      chktxtChlDate: [''],
      chktxtQuotFromDate: [''],
      chkdtLrDate: ['', Validators.required],
      chktxtHandledBy: [''],
      chktxtFollowedBy: [''],
      chktxtInstructedBy: [''],
      chkcmbMake: [''],

      txtFilter: ['']
    });


  }

  ngOnInit() {

    this.getUserMenuRights(this.qtnModifyPageId, atob(sessionStorage.getItem(btoa('userId'))  || ""))

    this.getUserMenuRights(this.qtnRevisionPageId, atob(sessionStorage.getItem(btoa('userId'))  || ""))

    this.advanceSearchExpandFlg = false;
    this.form.get("txtFilter")?.setValue("")
    this.getBranchList();
    this.getFinanYearList();

    this.getBrokerList();
    this.getItmList();
    this.getItmList1();

    this.quotRevisionRights = false;
    this.quotModifyRights = false;

    /*PartyDetails */
    this.form.get('cmbCustCode')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredCSLists = new Array<PartyModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.cs_code || value.cs_name
        return value.length > 2 ? this.utilityServiceAvaxPro.searchParty(value, '', '') : ['']
      })
    ).subscribe({
      next:(data: any) => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.filteredCSLists = data.responseData[0].map((item: any) => {
          return new PartyModel(item.cs_code, item.cs_name)
        })
      }
      return this.filteredCSLists
    },
      error:(error) => {
        console.log(error)
      }
    }
    )

    /*cmbDispTo */
    this.form.get('cmbDispTo')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredCSLists1 = new Array<PartyModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.cs_code || value.cs_name
        return value.length > 2 ? this.utilityServiceAvaxPro.searchParty(value, '', '') : ['']
      })
    ).subscribe(  {
      next:(data : any) => {  
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.filteredCSLists1 = data.responseData[0].map((item : any) => {
          return new PartyModel(item.cs_code, item.cs_name)
        })
      }
      return this.filteredCSLists1
    },
      error:(error) => {
        console.log(error)
      }}
    )


    /*followed by */

    this.getHandledByDropdown();
    this.filteredHandledByLists = this.form.get('txtHandledBy')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    //this.getFollowedUpByDropdown();
    this.filteredFollowedByLists = this.form.get('txtFollowedBy')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    // this.getInstructedByDropdown();
    this.filteredInstructedByLists = this.form.get('txtInstructedBy')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.pendingDraft = false;
    this.commonsService.show();
    this.filterValues = {
      advanceSearchFlag: 'N',
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg') )  || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      },
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))  || ''),
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))  || '')
    }

    this.getCompletedQuotationList(1, this.PAGE_SIZE_ARRAY[0], this.filterValues);


  }




  getBranchList() {
    this.utilityService.getBranchList().subscribe({
     next: (data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          console.log('branch list = ', data.responseData);
          this.branchList = data.responseData;
        }
        this.branchList.splice(0, 1);
        //return this.branchList

        let brValue = atob(sessionStorage.getItem(btoa('usr_of_branch'))  || '');
        let loggedBrObj = this.branchList.find(({ br_branch_code }: { br_branch_code: string }) => br_branch_code
          == brValue);

        console.log(' inside getBranchList  loggedBrObj = ', loggedBrObj);

        this.form.get('cmbBranch')?.setValue(loggedBrObj);

      },
      error:(error) => {
        console.log(error)
      }
    }
    )
  }

  getFinanYearList() {
    this.payload = {
    }


    let selectedObj : any;
    let dc_no_fmt = atob(sessionStorage.getItem(btoa('fin_year_format'))  ||"");

    this.utilityServiceAvaxPro.getFinancialYear(this.payload).subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          //this.finanYearList = data.responseData[0].finYear.map(item => {
          this.finanYearList = data.responseData[0].finyear.map((item : any) => {

            if (dc_no_fmt == item.df_doc_no_ts_format) {
              selectedObj = new UserFinYearModel(
                item.df_year_beg,
                item.df_year_end,
                item.df_doc_no_ts_format
              )

              return selectedObj;
            }
            else
              return new UserFinYearModel(
                item.df_year_beg,
                item.df_year_end,
                item.df_doc_no_ts_format
              )
          })
        }
        this.form.get('cmbFinacialYr')?.setValue(selectedObj);
      },
      error:(error) => {
        console.log(error)
      }
    }
    )
  }

  getHandledByDropdown() {
    this.utilityServiceAvaxPro.getHandledByList().subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map((item : any) => {
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        return this.lstHandledBy
      },
      error:(error) => {
        console.log(error)
      }
    }
    )
  }

  filterHandledBy(val: string) {
    return this.lstHandledBy.filter((option : any) => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayHandledBy(value : any): string | undefined {
    return value ? value.usr_name : undefined
  }

  getFollowedUpByDropdown() {
    this.utilityServiceAvaxPro.getHandledByList().subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstFollowedBy = data.responseData[0].map((item : any) => {
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        return this.lstFollowedBy
      },
      error: (error) => {
        console.log(error)
      }}
    )
  }


  filterFollowedUpBy(val: string) {
    return this.lstFollowedBy.filter((option : any) => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayFollowedUpBy(value : any): string | undefined {
    return value ? value.usr_name : undefined
  }


  getInstructedByDropdown() {
    this.utilityServiceAvaxPro.getHandledByList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstInstructedBy = data.responseData[0].map((item: any) => {
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
        return this.lstInstructedBy
      },
      error => {
        console.log(error)
      }
    )
  }

  filterInstructedBy(val: string) {
    return this.lstInstructedBy.filter((option: any) => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayInstructedBy(value: any): string | undefined {
    return value ? value.usr_name : undefined
  }


  displaycslist(value: any): string | undefined {
    return value ? value.cs_code + ' :: ' + value.cs_name : undefined
  }

  displaycslist1(value: any): string | undefined {
    return value ? value.cs_code + ' :: ' + value.cs_name : undefined
  }



  getPartyDetails(partySearchKeyword: any, reportType: any): Observable<any> {
    return this.utilityService.getPartyDetails(partySearchKeyword, reportType)
  }

  displayParty(value: any): string | undefined {
    return value ? value.party_name : undefined
  }


  getPartyDetails1(partySearchKeyword: any, reportType: any): Observable<any> {
    return this.utilityService.getPartyDetails(partySearchKeyword, reportType)
  }

  displayParty1(value: any): string | undefined {
    return value ? value.party_name : undefined
  }


  getBrokerList() {
    this.utilityServiceAvaxPro.getBrokerList().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstBroker = data.responseData[0].map((item: any) => {
            return new BrokerModel(item.brk_broker_code, item.brk_broker_name)
          })
        }
      })
  }


  getItmList() {
    this.form.controls.txtFromItemCode.valueChanges.pipe(
      startWith(''), debounceTime(100), tap(() => {
        this.itemList = new Array<ItemModelwithLP>()
      }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value :
          value.item_name
        return value.length > 3 ? this.getItemListByCode(value) : ['']
      }))
      .subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemList = data.responseData[0].map((item: any) => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp)
            })
          }
          return this.itemList
        },
        error => {
          console.log(error)
        }
      )
  }

  getItmList1() {
    this.form.controls.txtToItemCode.valueChanges.pipe(
      startWith(''), debounceTime(100), tap(() => {
        this.itemList1 = new Array<ItemModelwithLP>()
      }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value :
          value.item_name
        return value.length > 3 ? this.getItemListByCode1(value) : ['']
      }))
      .subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemList1 = data.responseData[0].map((item: any) => {
              return new ItemModelwithLP(item.it_code, item.it_name, item.catrefno, item.it_make, item.mmx_lp)
            })
          }
          return this.itemList1
        },
        error => {
          console.log(error)
        }
      )
  }

  getItemList1(value: {}): import("rxjs").ObservableInput<{}> {
    throw new Error("Method not implemented.");
  }

  getItemListByCode(itemCode: any): Observable<any> {
    return this.itemService.getItemList1(itemCode)
  }

  displayItem(value: any): string | undefined {
    return value ? value.item_code : undefined
  }


  getItemListByCode1(itemCode: any): Observable<any> {
    return this.itemService.getItemList1(itemCode)
  }

  displayItem1(value: any): string | undefined {
    return value ? value.item_code : undefined
  }


  public pagination(e: any) {
    this.form.get("txtFilter")?.setValue("")
    if (this.pendingDraft == true) {
      this.getPendingQuotationList(e.pageIndex + 1, this.PAGE_SIZE_ARRAY[0]);
    }
    else {
      this.getCompletedQuotationList(e.pageIndex + 1, this.PAGE_SIZE_ARRAY[0], this.payload);
    }
  }


  OnTabChange(tab: any) {

    this.getUserMenuRights(this.qtnModifyPageId, atob(sessionStorage.getItem(btoa('userId'))  || ""))

    this.getUserMenuRights(this.qtnRevisionPageId, atob(sessionStorage.getItem(btoa('userId'))  || ""))

    this.form.get("txtFilter")?.setValue("")
    if (tab.index == 0) {
      this.pendingDraft = false;
      this.dataSource.data = [];
      this.advanceSearchFlg = true;
      this.payload = {
        advanceSearchFlag: 'N',
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        qt_created_by: atob(sessionStorage.getItem(btoa('userId')) || ""),
        qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || "")

      }
      this.getCompletedQuotationList(1, this.PAGE_SIZE_ARRAY[0], this.payload);
    }
    else if (tab.index == 1) {
      this.pendingDraft = true;
      this.advanceSearchFlg = false;
      this.resetField();
      this.getPendingQuotationList(1, this.PAGE_SIZE_ARRAY[0])
    }
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
    this.dataSource.filter = filterValue;
  }

  getPendingQuotationList(
    pageNumber: number,
    pageSize: number,
    sortOrder?: any,
    sortBy?: any

  ) {

    this.payload = {
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
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
      }

    };
    this.dataSource;
    this.quotationService.getQuotationList(sortBy, sortOrder, pageNumber, pageSize, "Pending", this.payload)
      .subscribe({
        next:(data : any) => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            this.message = "";
            // if (data.responseData[0].length == 0) {
            //   this.openSnackBar("No Records Found.");
            // } else {
              this.tableData = [];
              this.tableData = data.responseData[0].map((item: any) => {
                this.totalCount = item.total_count
                this.pf_party_name = item.csname
                if (this.pf_party_name == null || this.pf_party_name == "-") {
                  this.pf_party_name = item.mp_name
                }
                return new QuotationModel(
                  item.total_count,
                  item.qt_quot_no,
                  item.qt_draft_no,
                  item.qt_draft_date,
                  item.qt_handled_by,
                  item.qt_cust_code,
                  item.qt_cust_name,
                  item.qt_disp_to_name,
                  item.qt_tax_type_code,
                  item.qt_gross_amt,
                  item.qt_disp_to_code,
                  item.qt_source_type,
                  item.qt_doc_type_code,
                  item.qt_inv_type_code,
                  item.qt_siscon_code,
                  item.qt_branch_code,
                  item.qt_project_code
                )
              })
            // }
            //this.totalCount = data.totalRowsCount
          } else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            this.openSnackBar(data.message);
            return false;
          }
          this.dataSource = new MatTableDataSource(this.tableData)
          this.dataSource.sort = this.sort
          return true;
        },
        error:(error : any) => {
          this.loading = false
        }
      }
      )
  }

  getCompletedQuotationList(
    pageNumber: number,
    pageSize: number,
    payload: any,
    sortOrder? : any,
    sortBy? : any,
  ) {
    this.dataSource.data = [];
    this.quotationService.getQuotationList(sortBy, sortOrder, pageNumber, pageSize, "Complete", payload)
      .subscribe({
        next:(data : any) => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

            this.message = "";
            // if (data.responseData[0][0].length == 0) {
            //   this.openSnackBar("No Records Found.");

            // } else {

              /* if (data.responseData[0][1] == "Y") {
                this.quotRevisionRights = true;
              }

              console.log('this.quotRevisionRights = ', this.quotRevisionRights);

              if (data.responseData[0][2] == "Y") {
                this.quotModifyRights = true;
              }

              console.log('this.quotModifyRights = ', this.quotModifyRights); */


              this.tableData = [];
              this.tableData = data.responseData[0][0].map((item: any) => {
                this.totalCount = item.total_count
                this.pf_party_name = item.csname
                if (this.pf_party_name == null || this.pf_party_name == "-") {
                  this.pf_party_name = item.mp_name
                }

                return new QuotationModel(
                  item.total_count,
                  item.qt_quot_no,
                  item.qt_draft_no,
                  item.qt_draft_date,
                  item.qt_handled_by,
                  item.qt_cust_code,
                  item.qt_cust_name,
                  item.qt_disp_to_name,
                  item.qt_tax_type_code,
                  item.qt_gross_amt,
                  item.qt_disp_to_code,
                  item.qt_source_type,
                  item.qt_doc_type_code,
                  item.qt_inv_type_code,
                  item.qt_siscon_code,
                  item.qt_branch_code
                )
              })
            // }
          }else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            this.openSnackBar(data.message);
            return false;
          }
          this.dataSource = new MatTableDataSource(this.tableData)
          this.dataSource.sort = this.sort
          return true;
        },
        error:(error) => {
          this.loading = false
        }
      }
      )
  }


  navigateToView(element: any, row: any) {

    this.payload = row;
    this.payload["generateDraftFlg"] = 'N';

    this.payload["userInformationDto"] = {
      usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
      usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
    }
    if (row.qt_siscon_code != atob(sessionStorage.getItem(btoa('usr_of_siscon')) || "")) {
      this.payload["flgOtherBranch"] = 'Y';
      this.payload["oth_siscon"] = row.qt_siscon_code;
      this.payload["oth_branch"] = row.qt_branch_code;
      this.flgOtherBranch = 'Y'
      this.oth_siscon = row.qt_siscon_code
      this.oth_branch = row.qt_branch_code
    }

    this.quotationService.generateDraft(this.payload).toPromise().then(data => {

      //this.queryParams = data.responseData[0].HEADERDEATAILS;
      this.queryParams = data.responseData[0].headerdeatails;
      this.queryParams["callFrom"] = this.pendingDraft == true ? "Draft" : "COMPLETE";
      this.queryParams["isFromPendingDraft"] = "N";
      this.queryParams["isForViewQuotation"] = "Y";

      if (row.qt_siscon_code != atob(sessionStorage.getItem(btoa('usr_of_siscon')) || "")) {
        this.queryParams["flgOtherBranch"] = 'Y';
        this.queryParams["oth_siscon"] = row.qt_siscon_code;
        this.queryParams["oth_branch"] = row.qt_branch_code;
      }

      console.log('this.pendingDraft === ', this.pendingDraft);
      if (!this.pendingDraft) {
        let quot_no = row.qt_quot_no;
        this.queryParams["docNo"] = quot_no;
        this.queryParams["qt_quot_no"] = quot_no;
        this.queryParams["userInformationDto"] = {
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
        
        }

        
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
        this.router.navigate(['session/entry/quotation/quotview'], { state: this.queryParams });
      }

      if (this.pendingDraft) {
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
        this.router.navigate(['session/entry/quotation/newquotdraftitementry'], { state: this.queryParams });
      }


    }).catch(err => {
    });

  }

  fileUpload(row: any) {
    console.log('row=', row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    dialogConfig.minWidth = '75%';
    dialogConfig.maxWidth = '75%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'FILE UPLOAD',
      doc_no: row.qt_quot_no,
      module_flg: 'QUOT'
    }
    const dialogRef = this.dialog.open(GenericDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
      //dialogRef.close();
      console.log('item res ', item);
    })
  }

  navigateToEdit(element: any, row: any, revisionFlag: any) {
    console.log('row', row);
    console.log('pendingDraft', this.pendingDraft);

    this.payload = row;
    this.payload["generateDraftFlg"] = 'N';

    this.payload["userInformationDto"] = {
      usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
      usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
      usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
    }

    this.quotationService.generateDraft(this.payload).toPromise().then(data => {

      // this.queryParams = data.responseData[0].HEADERDEATAILS;
      this.queryParams = data.responseData[0].headerdeatails;
      this.queryParams["callFrom"] = this.pendingDraft == true ? "Draft" : "COMPLETE";
      this.queryParams["isFromPendingDraft"] = this.pendingDraft == true ? "Y" : "N";
      this.queryParams["isForViewQuotation"] = "N";

      if (!this.pendingDraft) {
        let quot_no = row.qt_quot_no;
        this.queryParams["docNo"] = quot_no;
        this.queryParams["qt_quot_no"] = quot_no;
        this.queryParams["userInformationDto"] = {
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
                  }

      }

      this.queryParams["revisionFlag"] = revisionFlag;

      if (!this.pendingDraft) {
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
        this.router.navigate(['session/entry/quotation/newquotitementry'], { state: this.queryParams });
      }

      if (this.pendingDraft) {
        this.queryParams["qt_project_code"]=row.qt_project_code
        console.log('-----------------------> ', this.queryParams);
        sessionStorage.removeItem("data");
        sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
        this.router.navigate(['session/entry/quotation/newquotdraftitementry'], { state: this.queryParams });
      }


    }).catch(err => {

    });


  }

  /*  navigateToDelete(element, row) {
 
     console.log('row', row);
     console.log('pendingDraft', this.pendingDraft);
 
     this.payload = row;
     this.payload["isFromPendingDraft"] = this.pendingDraft == true ? 'Y' : 'N';
     this.payload["qt_siscon_code"] = atob(sessionStorage.getItem(btoa('usr_of_siscon')));
     this.payload["qt_branch_code"] = atob(sessionStorage.getItem(btoa('usr_of_branch')));
 
     this.payload["userInformationDto"] = {
       usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
       usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
       usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
     }
 
     this.quotationService.deleteDraft(this.payload)
       .toPromise()
       .then(data => {
         this.openSnackBar("Draft deleted Successfully...");
         this.pendingDraft = true;
         this.paginator.pageIndex = 0
         this.getPendingQuotationList(1, this.PAGE_SIZE_ARRAY[0])
 
       })
       .catch(err => {
 
       });
 
 
 
   }
 
  */

  addNewQuotation() {
    this.router.navigate(['session/entry/quotation/addnewquotation'])
  }

  openSnackBar(message: any) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: message,
    //   duration: 1000,
    // });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }

  getCompleteQuotList() {
    this.filterValues = {
      advanceSearchFlag: 'Y',
      qt_created_by: atob(sessionStorage.getItem(btoa('userId')) || ""),
      fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ""),
      fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ""),
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
       
      }
    }

    if (this.form.controls.chktxtFromItemCode.value) {
      if (this.form.controls.txtFromItemCode.value == null || this.form.controls.txtFromItemCode.value == undefined ||
        this.form.controls.txtFromItemCode.value == '') {
        this.openSnackBar("Please Select From Item Code");
        return false;
      } else {
        this.filterValues["qtd_item_code_from"] = this.form.controls.txtFromItemCode.value.item_code;
      }
    }


    if (this.form.controls.chktxtToItemCode.value) {
      if (this.form.controls.txtToItemCode.value == null || this.form.controls.txtToItemCode.value == undefined ||
        this.form.controls.txtToItemCode.value == "") {
        this.openSnackBar("please select To item code");
      } else {
        this.filterValues["qtd_item_code_to"] = this.form.controls.txtToItemCode.value.item_code;
      }
    }

    this.filterValues["qt_branch_code"] = this.form.controls.cmbBranch.value.br_branch_code;
    this.filterValues["qt_siscon_code"] = this.form.controls.cmbBranch.value.br_siscon_code;

    if (this.form.controls.cmbBranch.value.br_siscon_code != atob(sessionStorage.getItem(btoa('usr_of_siscon')) || "")) {
      this.flgOtherBranch = 'Y'
      this.oth_siscon = this.form.controls.cmbBranch.value.br_siscon_code
      this.oth_branch = this.form.controls.cmbBranch.value.br_branch_code
    }

    if (this.form.controls.chktxtQuotNo.value) {
      if (this.form.controls.txtQuotNo.value == null || this.form.controls.txtQuotNo.value == undefined ||
        this.form.controls.txtQuotNo.value == '') {
        this.openSnackBar("Please Enter Quotation no");
        return false;
      } else {
        this.filterValues["qt_quot_no"] = this.form.controls.txtQuotNo.value;
      }
    }
    if (this.form.controls.chkcmbCustCode.value) {
      if (this.form.controls.cmbCustCode.value.cs_code == null || this.form.controls.cmbCustCode.value.cs_code == undefined ||
        this.form.controls.cmbCustCode.value.cs_code == '') {
        this.openSnackBar("Please Select Cust Code");
        return false;
      } else {
        this.filterValues["qt_cust_code"] = this.form.controls.cmbCustCode.value.cs_code;
      }
    }
    if (this.form.controls.chktxtChlNetAmt.value) {
      if (isNaN(this.form.controls.txtChlNetAmt.value)) {
        this.openSnackBar("Please Enter valid Net Amount");
      }
      else {
        this.filterValues["qt_net_amt"] = this.form.controls.txtChlNetAmt.value;
      }
    }

    if (this.form.controls.chkcmbBroker.value) {
      if (this.form.controls.cmbBroker.value == null || this.form.controls.cmbBroker.value == undefined ||
        this.form.controls.cmbBroker.value == '') {
        this.openSnackBar("Please Select Broker");
        return false;
      } else {
        this.filterValues["qt_broker_code"] = this.form.controls.cmbBroker.value;
      }
    }

    if (this.form.controls.chktxtHandledBy.value) {
      if (this.form.controls.txtHandledBy.value.usr_userid == undefined ||
        this.form.controls.txtHandledBy.value.usr_userid == null ||
        this.form.controls.txtHandledBy.value.usr_userid == '') {
        this.openSnackBar("Please select handled by");
        return false;
      } else
        this.filterValues["qt_handled_by"] = this.form.controls.txtHandledBy.value.usr_userid;
    }
    if (this.form.controls.chktxtFollowedBy.value) {
      if (this.form.controls.txtFollowedBy.value.usr_userid == null ||
        this.form.controls.txtFollowedBy.value.usr_userid == '' ||
        this.form.controls.txtFollowedBy.value.usr_userid == undefined) {
        this.openSnackBar("Please select followed by.");
        return false;
      } else
        this.filterValues["qt_follow_up_by"] = this.form.controls.txtFollowedBy.value.usr_userid;
    }
    if (this.form.controls.chktxtInstructedBy.value) {
      if (this.form.controls.txtInstructedBy.value.usr_userid == null ||
        this.form.controls.txtInstructedBy.value.usr_userid == undefined ||
        this.form.controls.txtInstructedBy.value.usr_userid == '') {
        this.openSnackBar("Please Select Instructed By");
        return false;
      } else
        this.filterValues["qt_instructed_by"] = this.form.controls.txtInstructedBy.value.usr_userid;
    }

    if (this.form.controls.chktxtQuotFromDate.value) {
      this.filterValues["qt_from_date"] = this.getFormattedDate(this.form.get("txtQuotFromDate")?.value);
      if (this.form.controls.chktxtQuotToDate.value == false) {
        this.openSnackBar("Please select To Date");
        return false
      }
    }
    if (this.form.controls.chktxtQuotToDate.value) {
      this.filterValues["qt_to_date"] = this.getFormattedDate(this.form.get("txtQuotToDate")?.value);
    }

    if (this.form.controls.chktxtQuotFromDate.value && this.form.controls.chktxtQuotToDate.value) {
      let from_date = this.form.controls.txtQuotFromDate.value
      let to_date = this.form.controls.txtQuotToDate.value
      if (new Date(from_date) > new Date(to_date)) {
        this.openSnackBar("From Date Should Not Be Greater Than To Date");
        return false;
      }
    }

    console.log('this.filterValues = ', this.filterValues);


    let df_year_format = this.form.get("cmbFinacialYr")?.value != null ?
      this.form.get("cmbFinacialYr")?.value.df_year_format : atob(sessionStorage.getItem(btoa('fin_year_format')) || "");
    this.filterValues["df_year_format"] = df_year_format;

    this.pendingDraft = false;
    this.commonsService.show();
    this.advanceSearchExpandFlg = false;
    this.getCompletedQuotationList(1, this.PAGE_SIZE_ARRAY[0], this.filterValues);
    return true;

  }


  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  enabledTxtBox(event: any, formcontrolnamestr: any) {
    if (event.checked) {
      this.form.controls[formcontrolnamestr].enable();
    } else {
      this.form.controls[formcontrolnamestr].disable();
      this.form.controls[formcontrolnamestr].setValue("");
      this.getBranchList();
      this.getFinanYearList();
      this.todayDate1 = new Date();
      this.todayDate2 = new Date();
    }

  }

  resetField() {
    this.form.get("cmbBranch")?.setValue("")
    this.getBranchList();
    this.getFinanYearList();
    this.todayDate1 = new Date();
    this.todayDate2 = new Date();
    this.form.get("chktxtQuotNo")?.setValue(false);
    this.form.get("txtQuotNo")?.setValue("")
    this.form.get("chktxtQuotFromDate")?.setValue(false);
    this.form.get("chktxtQuotToDate")?.setValue(false);
    this.form.get("chktxtFollowedBy")?.setValue(false);
    this.form.get("txtFollowedBy")?.setValue("")
    this.form.get("txtHandledBy")?.setValue("");
    this.form.get("chktxtHandledBy")?.setValue(false);
    this.form.get("chkcmbCustCode")?.setValue(false);
    this.form.get("cmbCustCode")?.setValue("")
    this.form.get("chktxtInstructedBy")?.setValue(false);
    this.form.get("txtInstructedBy")?.setValue("")
    this.form.get("txtChlNetAmt")?.setValue("")
    this.form.get("cmbBroker")?.setValue("")
    this.form.get("chkcmbBroker")?.setValue(false)
    this.form.get("chktxtChlNetAmt")?.setValue(false);
  }

  getUserMenuRights(reportTypePageId: any, userCode: any) {
    this.utilityService.getHandledByUserRights(reportTypePageId, userCode).subscribe({
      next:(data: any) => {
        let userRightsData = data[0]
        if (userRightsData.responseStatus === 'SUCCESS' && userRightsData.responseCode === 'RES_200') {
          this.userRightsList = new UserRightsModel({
            ghead: userRightsData.responseData[0].ghead,
            guser: userRightsData.responseData[0].guser,
            rhead: userRightsData.responseData[0].rhead,
            suser: userRightsData.responseData[0].suser,
          })
        }

        console.log(" this.userRightsList", this.userRightsList)
        if (reportTypePageId == this.qtnRevisionPageId) {
          if (this.userRightsList.suser != "0") {
            this.quotRevisionRights = true;
          } else {
            this.quotRevisionRights = false;
          }
          console.log(" this.quotRevisionRights ", this.quotRevisionRights)

        }
        else {
          if (this.userRightsList.suser != "0") {
            this.quotModifyRights = true;
          } else {
            this.quotModifyRights = false;
          }
          console.log(" this.quotModifyRights ", this.quotModifyRights)
        }
      },
      error:(error) => {
        console.log(error)
      }
    }
    )
    //return this.userRightsList
  }
}
