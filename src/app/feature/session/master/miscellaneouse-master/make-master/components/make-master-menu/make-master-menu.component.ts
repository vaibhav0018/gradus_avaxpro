import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
// import { PageEvent, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpService } from '../../../../../../../core/services/http.service';
import { MakeMasterService } from './make-master-menu.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MakeMasterTableModel, FilterModel } from './make-master-menu.model';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { UtilityService } from '../../../../../../../core/services/utility/utility.service'
import { MakeMasterCompanyListComponent } from '../make-master-company-list/make-master-company-list.component'
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { ConstantsService } from '../../../../../../../core/services/constants.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomSpinnerComponent } from "../../../../../custom-spinner/custom-spinner.component";
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { Dialog } from '@angular/cdk/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


// imports: [CustomSpinnerComponent, FormsModule, MatAccordion, MatExpansionModule, MatFormFieldModule, MatTableModule, MatIcon, ReactiveFormsModule],


@Component({
  selector: 'make-master',
  templateUrl: './make-master-menu.component.html',
  styleUrl: './make-master-menu.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class MakeMasterMenuComponent implements OnInit {
  //form instance
  public makeform: FormGroup
  //dynamic table
  loading: boolean = true
  //flags for new n modify
  addShow: boolean = false;

  viewMode: boolean = true;

  //data: TableData[] = [ { aryMakeCode:'111'} ];
  controls: FormArray;

  //variable
  fromPage: string;

  make_code: string;
  make_short_name: string;
  make_description: string;
  make_cmp_name: any;
  make_principle_flg: string;

  company_code: string;
  company_short_name: string;

  make_code_txt: string;

  res: any;
  reportPayload: FilterModel
  tableData: any;
  viewEditPagePayload: object = {}

  make_status: any;
  mk_code: any;

  optionsSelect: Array<any>;

  private editedRowIndex: number;

  element1: MakeMasterTableModel;

  //pagination
  //@ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  loggedUserName: string
  loggedUserToken: string
  PAGE_SIZE_ARRAY = ConstantsService.PAGE_SIZE_ARRAY

  pageEvent: PageEvent
  totalCount: number
  sortDirection: string
  sortBy: string


  // pageNumber: number = 1
  //pageSize: number = 10

  //Testing
  // physicalLocationList: FilterModel[] = new Array<FilterModel>()
  public filteredCompanyMulti: ReplaySubject<FilterModel[]> = new ReplaySubject<FilterModel[]>(1)
  public companyMultiFilterCtrl: FormControl = new FormControl()
  companyData: any;
  public companyLists: FilterModel[] = new Array<FilterModel>()
  private onDestroy = new Subject<void>()

  rows: FormArray = this.fb.array([]);
  getrows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ 'arrayMakeMaster': this.rows });
  aryTableControl: AbstractControl[]
  displayedColumns: string[] = ['make_code', 'make_short_name', 'make_description', 'make_principle', 'select'];
  selection = new SelectionModel<MakeMasterTableModel>(true, []);
//  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  dataSource: MatTableDataSource<MakeMasterTableModel>



  constructor(
    private httpService: HttpService,
    public fb: FormBuilder,
    private makemasterservice: MakeMasterService,
    private router: Router,
    private utilityService: UtilityService,

    public snackBar: MatSnackBar,
    private _el: ElementRef,
    // public dailog: MatDialog,

  ) {
    this.makeform = this.fb.group({
      txtMakeCode: ['', Validators.required],
      txtMakeShortName: ['', Validators.required],
      txtMakeDesc: ['', Validators.required],
    });

  }
  initItemRows() {
    return this.fb.group({
      aryMakeCode: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.makeMasterView();

  }

  addNewMake() {
    this.addShow = true;
    console.log("dekh bhai",this.addShow)
  }

  makeMasterView() {
    this.makemasterservice.getMakeMasterView().subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        console.log('Data ',data);
        this.tableData = data.responseData[0].map((item: any) => {
          console.log(' item ',item);
          return new MakeMasterTableModel(
            item.make_code,
            item.make_short_name,
            item.make_description,
            item.cmk_principal_mfg_flg,
            true,
            false
          )
        })
      }
      this.dataSource = new MatTableDataSource(this.tableData)
  //    this.dataSource = this.tableData
      this.totalCount = data.totalRowsCount
      let group: { [key: string]: FormControl } = {}
      this.tableData.forEach((item: any) => {
        group['txtMakeShortNameUpdate' + item.make_code] = new FormControl('', Validators.required);
        group['txtMakeDescUpdate' + item.make_code] = new FormControl('', Validators.required);
      })


      group['txtMakeCode'] = new FormControl('');
      group['txtMakeShortName'] = new FormControl('');
      group['txtMakeDesc'] = new FormControl('');


      this.makeform = new FormGroup(group);
    })

  }

  makeMasterModify(row: any) {
    if (row.show == false) {
      row.show = true
    }
    else {
      row.show = false
    }
  }

  makeMasterUpdate(row: any):any {
  //  console.log('Val Of Row ', row);
   // console.log('Val Of Make Code ', row.make_code);

    if (this.makeform.get('txtMakeShortNameUpdate' + row.make_code)?.value == '') {
      this.make_short_name = row.make_short_name
    }
    else {
      this.make_short_name = this.makeform.get('txtMakeShortNameUpdate' + row.make_code)?.value
    }

    if (this.makeform.get('txtMakeDescUpdate' + row.make_code)?.value == '') {
      this.make_description = row.make_description
    } else {
      this.make_description = this.makeform.get('txtMakeDescUpdate' + row.make_code)?.value
    }
    if (!this.make_short_name.match(/^([A-Z,a-z,0-9])+$/)) {
      this.openSnackBar("Please Enter Valid Short Name");
      return false;
    } else if (!this.make_description.match(/^([A-Z,a-z,0-9,_ ])+$/)) {
      this.openSnackBar("Please Enter Valid Description");
      return false;
    } else {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '500px'
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.data = {
        make_code: row.make_code,
         make_short_name1: row.make_short_name,
        make_short_name: this.make_short_name,
        make_description: this.make_description,
        value: 'update'
      }
      const dialogRef = this.dialog.open(MakeMasterCompanyListComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(item => {
        //this.setPage(0);
        //  this.pageSize=10;
        this.makeMasterView()
      })
      this.makeMasterView()
    }
    
  }

  readonly dialog = inject(MatDialog);
  // openDialog() {
  //   this.dialog.open(DailogBoxComponent, {
  //     width: '500px',
  //     data: {
  //       animal: 'Dog',
  //       name: 'Sam'
  //     } 
  //   })
  // }


  openDialog(): any {
      
    this.make_code_txt = this.makeform.get('txtMakeCode')?.value
    let make_short_name = this.makeform.get('txtMakeShortName')?.value
    let make_desc = this.makeform.get('txtMakeDesc')?.value
    if (this.make_code_txt == '' || this.make_code_txt == null || this.make_code_txt == undefined) {
      this.openSnackBar("Please Enter Make Code");
      return false;
    } else if (this.make_code_txt.length != 3) {
      this.openSnackBar("Please Enter Valid Make Code");
      return false;
    } else if (!this.make_code_txt.match(/^([A-Z,a-z,0-9])+$/)) {
      this.openSnackBar("Please Enter Valid Make Code");
      return false;
    } else if (!make_short_name.match(/^([A-Z,a-z,0-9])+$/)) {
      this.openSnackBar("Please Enter Valid Short Name");
      return false;
    } else if (!make_desc.trim().match(/^([A-Z,a-z,0-9\s])+$/)) {
      this.openSnackBar("Please Enter Valid Description");
      return false;
    } else if (make_short_name == '' || make_desc == '') {
      this.openSnackBar("Fill The Values");
      return false;
    } else {
     this.makemasterservice.chkDuplicateMake(this.make_code_txt).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.make_status = data.responseData[0]
          const dialogConfig = new MatDialogConfig()
          dialogConfig.minWidth = '90%';
          dialogConfig.minHeight= '90%';
          dialogConfig.disableClose = true
          dialogConfig.autoFocus = true
          dialogConfig.data = {
            name: this.company_short_name,
            value: 'insert',
            make_code: this.makeform.get('txtMakeCode')?.value,
            make_short_name: this.makeform.get('txtMakeShortName')?.value,
            make_description: this.makeform.get('txtMakeDesc')?.value
          }
          const dialogRef = this.dialog.open(MakeMasterCompanyListComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(item => {
          // //   //    //this.setPage(0)
            this.form.reset()
            this.makeMasterView()
          })
          console.log('1212');
          this.makeMasterView()
          return true;
        } else {
          this.make_status = data.responseData[0]
          this.openSnackBar('Make Code ' + this.make_code_txt + ' Already Exist');
          return false;
        }
             
      })
    }
  }

  //For Snack Bar
  openSnackBar(message: any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }

  /*   getMakeCodeStatus(make_code_txt) {
      this.makemasterservice.chkDuplicateMake(make_code_txt).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.make_status = data.responseData[0]
        } else {
          this.make_status = data.responseData[0]
        }
      })
    } */


  // public pagination(event: PageEvent): PageEvent {
  //   //  console.log('event',event);
  //   //console.log('PageEvent',PageEvent);
  //   //this.makeMasterView(event.pageIndex + 1, event.pageSize)
  //   //return event
  // }
  // setPage(index: number) {
  //   //this.paginator.pageIndex = index;
  // }

  applyFilter(filterValue: string) {
    // console.log( " filterValue ",filterValue)
    // console.log( " flg ",flg)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
    this.dataSource.filter = filterValue;
  }


}

