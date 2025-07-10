import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl } from '@angular/forms';
// import { MatPaginator, MatSort, PageEvent, MatSnackBar, MatDialog } from '@angular/material';
import { ConstantsService } from '../../../../../../../core/services/constants.service';
import { BehaviorSubject } from 'rxjs';
import { UtilityServiceAvaxPro } from '../../../../../../../core/services/utility/utility_avaxpro.service';
import { IndustryMasterService } from './industry-master.service';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { IndustryMenuModel, IndustryMasterModel, SubIndustryMasterModel, SubSubIndustryMasterModel } from './industry-menu.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-industry-master-menu',
  templateUrl: './industry-master-menu.component.html',
  styleUrls: ['./industry-master-menu.component.scss', '../../../../master.scss'],
  standalone: false
})
export class IndustryMasterMenuComponent implements OnInit {
  public form: FormGroup
  tableData: any;

  //pagination

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  loggedUserName: string
  loggedUserToken: string
  PAGE_SIZE_ARRAY = ConstantsService.PAGE_SIZE_ARRAY

  pageEvent: PageEvent
  totalCount: number
  sortDirection: string
  sortBy: string

  subindflag: boolean = false;
  subsubindflag: boolean = false;
  editindflag: boolean = false;
  show: boolean = false;
  subshow: boolean = false;
  subsubshow: boolean = false;
  editsubindflag: boolean = false;
  count:any

  pageNumber: number = 1
  pageSize: number = 10
  //
  public indLists: any = []
  public subindLists: any = []
  public subsubindLists: any = []

  // insert
  ind_code: any
  sub_ind_code: any
  sub_sub_ind_code: any
  new_ind_code: any
  new_ind_name: any
  ind_name: any
  new_sub_ind_code: any
  new_sub_ind_name: any
  sub_ind_name: any
  new_sub_sub_ind_code: any
  new_sub_sub_ind_name: any
  sub_sub_ind_name: any
  //


  displayedColumns: string[] = ['ind_code', 'ind_name', 'sub_ind_code', 'sub_ind_desc', 'sub_sub_ind_code', 'sub_sub_ind_name', 'select'];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  constructor(
    private industrymasterservice: IndustryMasterService,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      cmbIndustry: [''],
      cmbSubIndustry: [''],
      cmbSubSubIndustry: [''],
      txtIndCode: [''],
      txtIndName: [''],
      txtSubIndCode: [''],
      txtSubIndName: [''],
      txtSubSubIndCode: [''],
      txtSubSubIndName: [''],

      txtIndNameUpdate: ['']

    })
  }

  ngOnInit() {
    this.getIndustryList(this.pageNumber, this.pageSize)
    this.getIndustryDropdown();
  }

  getIndustryList(pageNumber: any, pageSize: any) {
    this.industrymasterservice.getIndustryList(pageNumber, pageSize).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.tableData = data.responseData[0].map((item: any) => {
          //       console.log('item', item);
          return new IndustryMenuModel(
            item.ind_industry_code,
            item.ind_industry,
            item.sind_industry_desc,
            item.sind_subindustry_code,
            item.ssind_sub_subindustry_code,
            item.ssind_industry_desc,
            item.row_number,
            false
          )
        })
      }
      this.dataSource = this.tableData
      this.totalCount = data.totalRowsCount
      this.tableData.forEach((item: any) => {
        this.form.addControl('txtIndNameUpdate' + item.row_number, new FormControl(''))
        this.form.addControl('txtSubIndNameUpdate' + item.row_number, new FormControl(''))
        this.form.addControl('txtSubSubIndNameUpdate' + item.row_number, new FormControl(''))
        //      this.form.addControl('txtCityUpdate' + item.brk_broker_code, new FormControl(''))

      })
    })
  }

  getIndustryDropdown() {
    this.utilityServiceAvaxPro.getIndustryDropdown().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.indLists = data.responseData[0].map((item: any) => {
            //     console.log(item, 'item')
            return new IndustryMasterModel(item.ind_industry_code, item.ind_industry)
          })
        }
        return this.indLists
      })
  }
  getSubIndustryDropdown(indCode: any) {
    this.utilityServiceAvaxPro.getSubIndustryDropdown(indCode).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.subindLists = data.responseData[0].map((item: any) => {
            //     console.log(item, 'item SUB')
            return new SubIndustryMasterModel(item.sind_industry_code, item.sind_industry_desc, item.sind_subindustry_code)
          })
        }
        return this.subindLists
      })
  }
  getSubSubIndustryDropdown(indCode: any) {
    this.utilityServiceAvaxPro.getSubSubIndustryDropdown(indCode).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.subsubindLists = data.responseData[0].map((item: any) => {
            //       console.log(item, 'item SUBSUB')
            return new SubSubIndustryMasterModel(item.ssind_industry_code, item.ssind_industry_desc, item.ssind_sub_subindustry_code, item.ssind_subindustry_code)
          })
        }
        return this.subsubindLists
      })
  }

  industryModify(row: any) {
    if (row.show == false) {
      row.show = true
    }
    else {
      row.show = false
    }
  }
  onIndustryChange(event: any) {
    if (event.value != 'NEW') {
      this.getSubIndustryDropdown(event.value.ind_industry_code)
      this.subindflag = true
      this.show = false
      this.form.controls.txtIndCode.setValue('');
      this.form.controls.txtIndName.setValue('');
      this.form.controls.txtSubIndCode.setValue('');
      this.form.controls.txtSubIndName.setValue('');
      this.form.controls.txtSubSubIndCode.setValue('');
      this.form.controls.txtSubSubIndName.setValue('');
    } else {
      this.form.controls.cmbSubIndustry.setValue('');
      this.form.controls.cmbSubSubIndustry.setValue('');
      this.show = true
      this.subsubshow = false
      this.subshow = false
      this.editindflag = true
      this.subindflag = false
      this.subsubindflag = false
    }
  }
  onSubIndustryChange(event: any) {
    if (event.value != 'NEW') {
      this.getSubSubIndustryDropdown(event.value.sind_industry_code)
      this.subsubindflag = true
      this.subshow = false
      this.form.controls.txtSubIndCode.setValue('');
      this.form.controls.txtSubIndName.setValue('');
      this.form.controls.txtSubSubIndCode.setValue('');
      this.form.controls.txtSubSubIndName.setValue('');
    } else {
      this.form.controls.cmbSubSubIndustry.setValue('');
      this.subsubshow = false
      this.subshow = true
      this.editsubindflag = true
      this.subsubindflag = false
    }
  }
  onSubSubIndustryChange(event: any) {
    if (event.value != 'NEW') {
    } else {
      this.subsubshow = true
      this.subshow = false
    }
  }

  AddIndustry() {
    this.ind_code = this.form.get('cmbIndustry')?.value
    this.sub_ind_code = this.form.get('cmbSubIndustry')?.value
    this.sub_sub_ind_code = this.form.get('cmbSubSubIndustry')?.value



    if (this.ind_code == 'NEW') {

      console.log("ind name", this.form.get('txtIndName')?.value)
      if (this.form.get('txtIndCode')?.value == '' || this.form.get('txtIndCode')?.value == null) {
        this.openSnackBar("Please enter Industry Code !");
        return false;
      } else if (!this.form.get('txtIndCode')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Valid Industry Code !");
        return false;
      } else if (this.form.get('txtIndName')?.value == '' || this.form.get('txtIndName')?.value == null) {
        this.openSnackBar("Please enter Industry Name !");
        return false;
      } else if (!this.form.get('txtIndName')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Valid Industry Name !");
        return false;
      } else {
        this.new_ind_code = this.form.get('txtIndCode')?.value
        this.ind_name = this.form.get('txtIndName')?.value
      }
    } else {
      this.ind_code = this.form.get('cmbIndustry')?.value.ind_industry_code
    }

    if (this.sub_ind_code == 'NEW') {
      if (this.form.get('txtSubIndCode')?.value == '' || this.form.get('txtSubIndCode')?.value == null) {
        this.openSnackBar("Please enter Sub-Industry Code !");
        return false;
      } else if (!this.form.get('txtSubIndCode')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Valid Sub-Industry Code !");
        return false;
      } else if (this.form.get('txtSubIndName')?.value == '' || this.form.get('txtSubIndName')?.value == null) {
        this.openSnackBar("Please enter Sub-Industry Name !");
        return false;
      } else if (!this.form.get('txtSubIndName')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Valid Sub-Industry Name !");
        return false;
      } else {
        this.new_sub_ind_code = this.form.get('txtSubIndCode')?.value
        this.sub_ind_name = this.form.get('txtSubIndName')?.value
      }
    } else {
      this.sub_ind_code = this.form.get('cmbSubIndustry')?.value.sind_subindustry_code
    }

    if (this.sub_sub_ind_code == 'NEW') {
      if (this.form.get('txtSubSubIndCode')?.value == '' || this.form.get('txtSubSubIndCode')?.value == null) {
        this.openSnackBar("Please enter Sub-Sub-Industry Code !");
        return false;
      } else if (!this.form.get('txtSubSubIndCode')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Sub-Sub-Industry Code  !");
        return false;
      } else if (this.form.get('txtSubSubIndName')?.value == '' || this.form.get('txtSubSubIndName')?.value == null) {
        this.openSnackBar("Please enter Sub-Sub-Industry Name !");
        return false;
      } else if (!this.form.get('txtSubSubIndName')?.value.match(/^([A-Za-z0-9])+$/)) {
        this.openSnackBar("Please enter Valid Sub-Sub-Industry Name !");
        return false;
      } else {
        this.new_sub_sub_ind_code = this.form.get('txtSubSubIndCode')?.value
        this.sub_sub_ind_name = this.form.get('txtSubSubIndName')?.value
      }
    } else {
      this.sub_sub_ind_code = this.form.get('cmbSubSubIndustry')?.value.ssind_subindustry_code
    }

    /*     console.log(this.ind_code, ' ind_code');
        console.log(this.new_ind_code, ' new_ind_code');
        console.log(this.ind_name, ' ind_name');
        console.log(this.new_sub_ind_code, ' new_sub_ind_code');
        console.log(this.sub_ind_name, ' sub_ind_name');
        console.log(this.new_sub_sub_ind_code, ' new_sub_sub_ind_code');
        console.log(this.sub_sub_ind_name, ' sub_sub_ind_name'); */

    this.industrymasterservice.addNewIndustry(this.ind_code, this.new_ind_code, this.ind_name, this.sub_ind_code, this.new_sub_ind_code, this.sub_ind_name, this.new_sub_sub_ind_code, this.sub_sub_ind_name, this.sub_sub_ind_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
      
          this.count = data.responseData[0]
          console.log(this.count, 'this.count');
          if (this.count >=1) {
            // alert("1")
            this.openSnackBar("INDUSTRY CODE IS ALREADY PRESENT ");
            return false
          } else {
            // alert("2")
            console.log(data.responseData.length, 'lenth');
            this.openSnackBar("Inserted Successfully");
            this.form.reset()
            this.subsubshow = false
            this.subshow = false
            this.show = false
            this.subsubindflag = false
            this.subindflag = false
            this.dataSource.next([]);                                 // Clear the current data source
            this.setPage(0)
            this.getIndustryList(this.pageNumber, this.pageSize)
            this.dataSource = new BehaviorSubject<AbstractControl[]>([]);
            return true;
          }
          // else {
          //   this.openSnackBar("Error While Inserting");
          //   return false;
        }
        return true;
      })
      return true;
  }

  industryUpdate(row: any) {
    console.log(row, 'row')
    //  row.ind_industry_code
    //  row.sind_subindustry_code
    //  row.ssind_sub_subindustry_code
    if (this.form.get('txtIndNameUpdate' + row.row_number)?.value == '') {
      this.new_ind_name = row.ind_industry
    } else {
      if (!this.form.get('txtIndNameUpdate' + row.row_number)?.value.match(/^[A-Za-z0-9 ]*$/gm)) {
        this.openSnackBar("Please enter Industry Name !");
        return false;
      } else {
        this.new_ind_name = this.form.get('txtIndNameUpdate' + row.row_number)?.value
      }
    }
    if (this.form.get('txtSubIndNameUpdate' + row.row_number)?.value == '') {
      this.new_sub_ind_name = row.sind_industry_desc
    } else {
      // if (!this.form.get('txtSubIndNameUpdate' + row.row_number).value.match(/^([A-Za-z0-9])+$/)) {
      //   this.openSnackBar("Please enter Sub-Industry Name !");
      //   return false;
      // } else {
      this.new_sub_ind_name = this.form.get('txtSubIndNameUpdate' + row.row_number)?.value
      // }

    }
    if (this.form.get('txtSubSubIndNameUpdate' + row.row_number)?.value == '') {
      this.new_sub_sub_ind_name = row.ssind_industry_desc
    } else {
      // if (!this.form.get('txtSubSubIndNameUpdate' + row.row_number).value.match(/^([A-Za-z0-9])+$/)) {
      //   this.openSnackBar("Please enter Sub-Sub-Industry Name !");
      //   return false;
      // } else {
      this.new_sub_sub_ind_name = this.form.get('txtSubSubIndNameUpdate' + row.row_number)?.value
      // }
    }
    console.log(this.new_ind_name, 'new_ind_name');
    console.log(row.ind_industry_code, 'row.ind_industry_code');
    console.log(this.new_sub_ind_name, 'this.new_sub_ind_name');
    console.log(row.sind_subindustry_code, 'row.sind_subindustry_code');
    console.log(this.new_sub_sub_ind_name, 'this.new_sub_sub_ind_name');
    console.log(row.ssind_sub_subindustry_code, 'row.ssind_sub_subindustry_code');

    this.industrymasterservice.updateIndustry(this.new_ind_name, row.ind_industry_code, this.new_sub_ind_name, row.sind_subindustry_code, this.new_sub_sub_ind_name, row.ssind_sub_subindustry_code).subscribe(
      data => {
        // alert("0")
        // console.log("data",data)
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          // alert("1")
          this.openSnackBar("Updated Successfully");
          this.form.reset()
          this.subsubshow = false
          this.subshow = false
          this.show = false
          this.subsubindflag = false
          this.subindflag = false
          this.dataSource.next([]);
          this.dataSource = new BehaviorSubject<AbstractControl[]>([]);
          this.getIndustryList(this.pageNumber, this.pageSize)
          return true;
        } else {
          this.openSnackBar("Error While Updating");
          return false;
        }
      })
      return true;

  }

  //For Snack Bar
  openSnackBar(message: any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }

  public pagination(event: PageEvent): PageEvent {
    this.getIndustryList(event.pageIndex + 1, event.pageSize)
    return event
  }
  setPage(index: number) {
    this.paginator.pageIndex = index;
  }

  reset() {
    this.form.controls.txtSubIndCode.reset();
    this.form.controls.txtSubIndName.reset();
    this.form.controls.txtSubSubIndCode.reset();
    this.form.controls.txtSubSubIndName.reset();
    this.form.controls.cmbIndustry.reset(),
    this.form.controls.cmbSubIndustry.reset(),
    this.form.controls.cmbSubSubIndustry.reset(),
    this.form.controls.txtIndCode.reset(),
    this.form.controls.txtIndName.reset(),
    this.form.controls.txtIndNameUpdate.reset()
  }

}
