import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { UtilityService } from '../../../../../../../core/services/utility/utility.service';
// import { MatSnackBar, MatDialogConfig, MatDialog, MatPaginator, MatSort, PageEvent, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GodownModel, PhysicalLocationModel, addLocationModel } from './physical-location-master.model';
import { PhysicalLocationMasterService } from '../physical-location-master-menu/physical-location-master.service';
import { PhysicalLocationCardListComponent } from '../physical-location-card-list/physical-location-card-list.component';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { ConfirmDialogComponentComponent } from '../ConfirmDialog/confirm-dialog-component/confirm-dialog-component.component';
import { ConstantsService } from '../../../../../../../core/services/constants.service';
import { UtilityServiceAvaxPro } from '../../../../../../../core/services/utility/utility_avaxpro.service';
import { ConfirmationDailogComponent } from '../../confirmation-dailog/confirmation-dailog.component';


const ELEMENT_DATA: addLocationModel[] = [
  {
    txtPhysicalLocation: ''
  },
]

@Component({
  selector: 'app-physical-location-master-menu',
  templateUrl: './physical-location-master-menu.component.html',
  // styleUrls: ['./physical-location-master-menu.component.scss', '/src/app/feature/session/master/master.scss'],
  styleUrls: ['../../../../master.scss' , './physical-location-master-menu.component.scss', ],
  standalone: false
})
export class PhysicalLocationMasterMenuComponent implements OnInit {
  // public phylocatioform: FormGroup
  rows: FormArray = this.formBuilder.array([]);
  getrows: FormArray = this.formBuilder.array([]);
  phylocatioform: FormGroup = this.formBuilder.group({ 'arrayAddLocation': this.rows });
  filteredGodownLists: Observable<any>

  flag: boolean = false;
  flagdelet: boolean = false;

  showIconFlag: boolean[] = []

  //formGroup: FormGroup
  gpl_loc: any;
  aryTableControl: AbstractControl[]

  displayedColumns: string[] = ['serial_no', 'physical_location', 'scrap_flag', 'select'];
  addColumns: string[] = ['serial_no', 'physical_location','select'];
  godown_code: string;
  /**
 * PhysicalLocation
 */
  physicalLocationList: any;
  deleteshow: boolean = false;
  addshow: boolean = false;

  /*add row new logic */
  data: addLocationModel[] = [{
    txtPhysicalLocation: '',
  }];


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


  // pageNumber: number = 1
  // pageSize: number = 10
  dataSource: MatTableDataSource<PhysicalLocationModel>
  // dataSource = new BehaviorSubject<AbstractControl[]>([]);
  adddataSource = new BehaviorSubject<AbstractControl[]>([]);

  public godownLists: any = []
  tableData: any;
  tempDataN: any = [];
  tempDataY: any = [];
  variable: any = 10;
  constructor(
    private PhysicalLocationMasterService: PhysicalLocationMasterService,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private utilityService: UtilityService,
    public dialog: MatDialog,
    private utilityServiceAvaxpro: UtilityServiceAvaxPro,
  ) {
    this.phylocatioform = this.formBuilder.group({
      godown: [''],

      //add card table
      arrayAddLocation: this.phylocatioform.get('arrayAddLocation') as FormArray,
    });
  }
  get arrayAddLocation() {
    return this.phylocatioform.get('arrayAddLocation') as FormArray;
  }


  addNewCardRow(i: number, arrayAddLocation: any, callFrom: string, d?: addLocationModel, noUpdate?: boolean): boolean {
    this.flag = true
    this.flagdelet = false

    if (callFrom != "addNewLocation") {
      //   alert('In First If')
      if (this.arrayAddLocation.value[i].txtPhysicalLocation == "") {
        this.openSnackBar("Please enter Physical Location !");
        //       alert("in secound if")
        return false;
      } else {
        //    alert("in secound else")
        const row = this.formBuilder.group({
          txtPhysicalLocation: ['', [Validators.pattern(/^([A-Z,a-z,0-9,\-,\s])+$/)]],
        });

        for (var index in this.rows.value) {
          //  console.log(this.rows.value[index].txtPhysicalLocation, 'Values');
          if (!this.rows.value[index].txtPhysicalLocation.match(/^([A-Z,a-z,0-9,\-,\s])+$/)) {
            this.openSnackBar("Please enter Valid Physical Location !");
            return false;
          }
        }

        this.rows.push(row);
        if (!noUpdate) { this.updateView(); }

        this.showIconFlag = []

        let len = this.rows.length;
        for (let index = 0; index < len; index++) {
          this.showIconFlag[index] = false
        }
        if (len > 0)
          this.showIconFlag[len - 1] = true;
      }     
    }
    else {
      //    alert('In First Else')
      let len = this.rows.length;
      if (len > 0) {
        this.rows = this.formBuilder.array([])
      }
      this.rows.push(this.formBuilder.group({
        txtPhysicalLocation: ['', [Validators.pattern(/^([A-Z,a-z,0-9,\-,\s])+$/)]],
      }));

      if (!noUpdate) { this.updateView(); }
      this.showIconFlag = []
      this.showIconFlag[0] = true;
    }

    return true;
  }

  deleteCardRow(i: number, arrayAddLocation: any, noUpdate?: boolean) {
    if (this.arrayAddLocation.value[i] != undefined && this.arrayAddLocation.value[i] != "") {
      if (this.arrayAddLocation.value[i].txtPhysicalLocation == "") {
        this.openSnackBar("Please enter Physical Location !");
        //    alert("Please enter Physical Loc !")
        return false;
      }
      this.arrayAddLocation.removeAt(i);
      if (!noUpdate) { this.updateView(); }

      let len = this.rows.length;
      for (let index = 0; index < len; index++) {
        this.showIconFlag[index] = false
      }
      if (len > 0)
        this.showIconFlag[len - 1] = true;
    }
    return true;
  }

  updateView() {
    this.adddataSource.next(this.rows.controls);
    // this.dataSource.next(this.rows.controls);
  }

  ngOnInit() {
    this.phylocatioform.reset()
    this.flag = false
    this.getGodownDropdown()
    this.filteredGodownLists = this.godownLists
    const godownControl = this.phylocatioform.get('godown');
    // this.filteredGodownLists = godownControl
    //   ? godownControl.valueChanges.pipe(
    //       map(value => {
    //         value =
    //           typeof value == 'string' || value instanceof String ? value : value.godown_name
    //         return this.filterGodowns(value)
    //       })
    //     )
    //   : new Observable<any>(observer => observer.next([]));
  }

  // getGodownDropdown() {
  //   this.utilityServiceAvaxpro.getGodownMasterList().subscribe(
  //     data => {
  //       console.log('Godown Data', data);        
  //       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
  //         // console.log('Godown Data2', data.responseData[0]);
          
  //         this.godownLists = data.responseData[0].map((item: any) => {
  //           return new GodownModel(item.gd_godown_code, item.gd_godown_name)
  //         })
  //         console.log('Godown Data3', this.godownLists);
          
  //       }
  //       return this.godownLists
  //     },
  //     error => {
  //       console.log('Error', error)
  //     }
  //   )
  // }

  getGodownDropdown() {
  this.utilityServiceAvaxpro.getGodownMasterList().subscribe(
    data => {
      console.log('Godown Data', data);
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.godownLists = data.responseData[0].map((item: any) => {
          return new GodownModel(item.gd_godown_code, item.gd_godown_name);
        });
        console.log('Godown Data3', this.godownLists);
        this.filteredGodownLists = this.godownLists
      }
    },
    error => {
      console.log('Error', error);
    }
  );
}


  // filterGodowns(val: string) {
  //   return this.godownLists.filter((option: any) => {
  //     return option.godown_name.toLowerCase().includes(val.toLowerCase())
  //   })
  // }
  addNewLocation() {
    if (this.phylocatioform.get('godown')?.value == null || this.phylocatioform.get('godown')?.value.godown_code == '') {
      this.openSnackBar("Please select Godown");
      return false;
    } else {
      this.godown_code = this.phylocatioform.get('godown')?.value.godown_code;
      this.addshow = true;
      this.deleteshow = false;

      let len = this.arrayAddLocation.length
      for (let index = 1; index <= len; index++) {
        this.arrayAddLocation.removeAt(this.arrayAddLocation.length - index)
      }
      this.tempDataN = [];
      this.tempDataY = [];
      this.data.forEach((d: addLocationModel) => this.addNewCardRow(0, d, 'addNewLocation', d, false));

    }

    return true;
  }



  searchLocation() {
    // console.log('GoDown ', this.phylocatioform.get('godown').value);
    if (this.phylocatioform.get('godown')?.value == null || this.phylocatioform.get('godown')?.value.godown_code == '') {
      this.openSnackBar("Please select Godown");
      return false;
    } else {
      this.godown_code = this.phylocatioform.get('godown')?.value.godown_code;
      this.dataSource = new MatTableDataSource<PhysicalLocationModel>([]);
      this.getPhysicalLocation(this.godown_code);

    }

    return true;
  }

  deleteElement(row: any) {
    //  console.log("Row ", row);
    this.PhysicalLocationMasterService.deletePhysicalLocation(row.gpl_loc,row.godown_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        }
      },
      error => {
        console.log(error)
      }
    )
    this.getPhysicalLocation(this.godown_code);
  }


  addToScrap(row: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '600px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      gpl_loc: row.gpl_loc,
      godown_code: this.godown_code
    }
    const dialogRef = this.dialog.open(PhysicalLocationCardListComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      if (!item == true) {
        this.getPhysicalLocation(this.godown_code)
        this.updateView
      }
    })
    this.getPhysicalLocation(this.godown_code)
    this.updateView
  }

  getPhysicalLocation(godownCode: any) {
    //console.log('!');
    this.PhysicalLocationMasterService.getPhysicalLocation(godownCode).subscribe(data => {
      if (data.responseData.length == 0) {
        return false;
      } else {
        this.deleteshow = true;
        this.addshow = false;
        this.updateView
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.physicalLocationList = data.responseData[0].map((item: any) => {
            return new PhysicalLocationModel(
              item.gpl_loc,
              item.gpl_phyloc_flg,
              item.serial_no
            )

          })
          
        }
      }
      this.dataSource = new MatTableDataSource(this.physicalLocationList)
      return true;
      //  this.dataSource = this.physicalLocationList
    },
      error => {
        console.log(error)
      }
    )
  }


//   onClickConfirm(values: any) {
//     values.value.splice(values.value.length-1,1)
//     for (var index in values.value) {
//       if (!values.value[index].txtPhysicalLocation.match(/^([A-Z,a-z,0-9,\-,\s])+$/)) {
//         this.openSnackBar("Please enter Valid Physical Location !");
//         return false;
//       }

//     }

//     let lstCheckDuplicate: any = [];

//     for (let index = 0; index < this.arrayAddLocation.value.length; index++) {
//       let current_var = this.arrayAddLocation.value[index].txtPhysicalLocation;
//       // alert(current_var)
//       if (lstCheckDuplicate.indexOf(current_var) < 0) {
//         lstCheckDuplicate.push(current_var);
//       }
//       else {
//         this.openSnackBar('Duplicate value');
//       }
//     }

//     //debugger
//     //alert(this.arrayAddLocation);
//     let tempValue: any;
//     // console.log("this.arrayAddConsignor.value[i]======before", this.arrayAddConsignor.value[i])
//  //   console.log("values.value=======", values.value)
//     tempValue = values.value
//  //   console.log("values.value=======", values.value)
//     let i = this.arrayAddLocation.value.length - 1;
//     if (this.arrayAddLocation.value[i] != undefined && this.arrayAddLocation.value[i] != "") {
//       if (this.arrayAddLocation.value[i].txtPhysicalLocation == "") {
//         this.openSnackBar("Please enter Physical Location !");
//         return false;
//       } else {

//          this.PhysicalLocationMasterService.addNewPhysicalLocation(tempValue, this.godown_code).subscribe(data => {
//               if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                 console.log('data.responseData', data.responseData);
//               }})

//       //   const dialogConfig = new MatDialogConfig()
//       //   // dialogConfig.width = '350px !important'
//       //   dialogConfig.disableClose = true
//       //   dialogConfig.autoFocus = true
//       //   dialogConfig.data = {

//       //   }
//       //   const dialogRef = this.dialog.open(ConfirmationDailogComponent, dialogConfig)
//       //   dialogRef.afterClosed().subscribe(item => {
//       //     if (!item == true) {
//       //      console.log("values.value after", values.value)
//       //       this.PhysicalLocationMasterService.addNewPhysicalLocation(tempValue, this.godown_code).subscribe(data => {
//       //         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//       //           this.tableData = data.responseData[0].map((item: any) => {
//       //             if (item.n != undefined) {
//       //               this.tempDataN.push(item.n)
//       //             }
//       //             if (item.y != undefined) {
//       //               this.tempDataY.push(item.y)
//       //             }
//       //           })
//       //           console.log('this.tempDataN', this.tempDataN.length);
//       //           console.log('this.tempDataY', this.tempDataY.length);
//       //           if (this.tempDataN.length == 0) {
//       //             this.openSnackBar(' Physical Location ' + this.tempDataY + ' Added Successfully');
//       //           } else if (this.tempDataY.length == 0) {
//       //             this.openSnackBar('Physical Location ' + this.tempDataN + ' Already Exists ');
//       //           } else {
//       //             this.openSnackBar('Physical Location ' + this.tempDataN + ' Already Exists And Physical Location ' + this.tempDataY + ' Added Successfully');
//       //           }
//       //           this.addshow = false;
//       //         }
//       //       })
//       //     }
//       //   })
//       }
//     }
//     else {
//       this.openSnackBar("Please enter Physical Location !");
//       return false
//     }
//     this.phylocatioform.reset()
//     let len = this.arrayAddLocation.length
//     for (let index = 1; index <= len; index++) {
//       this.arrayAddLocation.removeAt(this.arrayAddLocation.length - index)
//     }
//     this.updateView();
//     this.adddataSource = new BehaviorSubject<AbstractControl[]>([]);
//     return true;
//   }

onClickConfirm(values: any): boolean {
    values.value.splice(values.value.length-1,1)
    for (var index in values.value) {
      if (!values.value[index].txtPhysicalLocation.match(/^([A-Z,a-z,0-9,\-,\s])+$/)) {
        this.openSnackBar("Please enter Valid Physical Location !");
        return false;
      }
    }

    let lstCheckDuplicate: any = [];
    let hasDuplicate = false;

    for (let index = 0; index < this.arrayAddLocation.value.length; index++) {
      let current_var = this.arrayAddLocation.value[index].txtPhysicalLocation;
      if (lstCheckDuplicate.indexOf(current_var) < 0) {
        lstCheckDuplicate.push(current_var);
      }
      else {
        this.openSnackBar('Duplicate value');
        hasDuplicate = true;
      }
    }

    if (hasDuplicate) {
      return false;
    }

    let tempValue: any;
    tempValue = values.value
    let i = this.arrayAddLocation.value.length - 1;
    if (this.arrayAddLocation.value[i] != undefined && this.arrayAddLocation.value[i] != "") {
      if (this.arrayAddLocation.value[i].txtPhysicalLocation == "") {
        this.openSnackBar("Please enter Physical Location !");
        return false;
      } else {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.disableClose = true
        dialogConfig.autoFocus = true
        dialogConfig.data = {}
        const dialogRef = this.dialog.open(ConfirmationDailogComponent, dialogConfig)
        dialogRef.afterClosed().subscribe(item => {
          if (!item == true) {
            this.PhysicalLocationMasterService.addNewPhysicalLocation(tempValue, this.godown_code).subscribe(data => {
              if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
                this.tableData = data.responseData[0].map((item: any) => {
                  if (item.n != undefined) {
                    this.tempDataN.push(item.n)
                  }
                  if (item.y != undefined) {
                    this.tempDataY.push(item.y)
                  }
                })
                if (this.tempDataN.length == 0) {
                  this.openSnackBar(' Physical Location ' + this.tempDataY + ' Added Successfully');
                } else if (this.tempDataY.length == 0) {
                  this.openSnackBar('Physical Location ' + this.tempDataN + ' Already Exists ');
                } else {
                  this.openSnackBar('Physical Location ' + this.tempDataN + ' Already Exists And Physical Location ' + this.tempDataY + ' Added Successfully');
                }
                this.addshow = false;
              }
            })
          }
        })
      }
    }
    else {
      this.openSnackBar("Please enter Physical Location !");
      return false
    }
    this.phylocatioform.reset()
    let len = this.arrayAddLocation.length
    for (let index = 1; index <= len; index++) {
      this.arrayAddLocation.removeAt(this.arrayAddLocation.length - index)
    }
    this.updateView();
    this.adddataSource = new BehaviorSubject<AbstractControl[]>([]);
    return true;
  }



  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }

  deleteElementConfig(row: any) {

    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '350px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true 
    dialogConfig.data = {
      gpl_loc: row.gpl_loc,
      godown_code: this.godown_code
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      if (!item == true) {
        this.getPhysicalLocation(this.godown_code);
        this.updateView
        //   this.variable = this.physicalLocationList
      }
    })
    // this.getPhysicalLocation(this.godown_code);
    // this.updateView
  }

  public pagination(event: PageEvent): PageEvent {
    //this.makeMasterView(event.pageIndex + 1, event.pageSize)
    return event
  }
  // setPage(index: number) {
  //   this.paginator.pageIndex = const index;
  // }

  // applyFilter(filterValue: string, flg: any) {
  //   // console.log( " filterValue ",filterValue)
  //   // console.log( " flg ",flg)
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
  //   this.dataSource.filter = filterValue;
  // }

  applyFilter(filterValue: string, flg: any) {
  filterValue = filterValue.trim().toLowerCase(); // Clean input
  this.dataSource.filter = filterValue;           // Trigger filter on the table
}

}