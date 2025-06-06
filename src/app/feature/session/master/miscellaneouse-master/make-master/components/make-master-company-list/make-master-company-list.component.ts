import { Component,OnInit, Inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { FilterModel,TableSettings, MakeMasterTableModel } from '../make-master-menu/make-master-menu.model';
import { BehaviorSubject } from 'rxjs';
import { MakeMasterService } from '../make-master-menu/make-master-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { SharedModule } from '../../../../../../../shared/shared.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-make-master-company-list',
  templateUrl: './make-master-company-list.component.html',
  styleUrl: './make-master-company-list.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})

export class MakeMasterCompanyListComponent implements OnInit {

  dataSource:any =[];
  public makecompanyform: FormGroup
  tableData: any;
  company_code: string;
  company_short_name: String;
  viewMode: boolean = false;
  Flag: any;
  val: any;
  make_code: string;
  make_short_name: string;
  make_description: string;
  myObjStr: any;
  var:any;
  flgdisable: boolean = false;
  // @Output() childSettingsFormOutput = new EventEmitter()
  
  settingsForm: any;
  constructor(
    public formBuilder: FormBuilder,
    private makemasterservice: MakeMasterService,
    private dialogRef: MatDialogRef<MakeMasterCompanyListComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.makecompanyform = this.formBuilder.group({
    });
    this.Flag = data.value;
    this.val = 'OPL';
    this.make_code = 'OPL'
      this.make_short_name = 'OPL',
      this.make_description = data.make_description
  }

  displayedColumns: string[] = ['company_list', 'radio_btn'];
  ngOnInit() {
    console.log('in dialog comp')
    this.CompanyList();
  }

  CompanyList(): void {
    this.data.make_code,
      this.data.value
    this.makemasterservice.getCompanyList(this.data.make_code, this.data.value).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //       console.log(data.responseData, '....data....');
          this.tableData = data.responseData[0].map((item: any) => {
            //    console.log(item.cmk_principal_mfg_flg, '....ITEM DATA....');
            //    console.log(item.flg_extend, '....ITEM flg_extend....');
            //    debugger
            if (item.flg_extend == 'Y') {
              this.flgdisable = true
            } else {
              this.flgdisable = false
            }
            return new FilterModel(
              item.company_code,
              item.company_short_name,
              item.flg_extend,
              item.make_cmp_flag,
              this.flgdisable
            )
            //   console.log(item,'....data....');
            // console.log(item.make_cmp_flag,'....@@data....');

            // if (this.data.value == 'insert') {
            //   console.log('In If');
            //   return new FilterModel(
            //     item.company_code,
            //     item.company_short_name,
            //     "N",
            //     item.make_cmp_flag
            //   )
            // } else {
            //   console.log('In ELse');
            //   return new FilterModel(
            //     item.company_code,
            //     item.company_short_name,
            //     item.flg_extend,
            //     item.make_cmp_flag
            //   )
            // }
          })
        }
        this.dataSource = new MatTableDataSource(this.tableData);
        let group: Record<string, FormControl> = {};
        this.tableData.forEach((item: any) => {
          group['chkcmp' + item.company_code] = new FormControl('', Validators.required);
          group['rdbmfgflag' + item.company_code] = new FormControl('', Validators.required);
          group['rdbmfgflag' + item.company_code].setValue(item.cmk_principal_mfg_flg);
          if (item.flg_extend == 'Y') {
            group['chkcmp' + item.company_code] = new FormControl(item.flg_extend);
          }
        })
        this.makecompanyform = new FormGroup(group);
        console.log("sahil" , this.makecompanyform.value)
        
      },
      error => {
        console.log(error)
      }
    )
  }
  

  save(values: any) {
    if (this.data.value == 'insert') {
    //    console.log(values, "values")
      this.make_code = this.data.make_code,
        this.make_short_name = this.data.make_short_name,
        this.make_description = this.data.make_description,
        this.makemasterservice.createNewMake(this.make_code, this.make_short_name, this.make_description, values).subscribe(
          data => {
            if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_409') {
              this.openSnackBar("already exists");
              return false;
            } else {
              this.openSnackBar("Inserted Successfully");
              return true;
            }
          })
    } else {
 //     console.log(' values ', values);
      this.make_code = this.data.make_code,
        this.make_short_name = this.data.make_short_name,
        this.make_description = this.data.make_description
      this.makemasterservice.updateMakeMasterData(this.make_short_name, this.make_description, this.make_code, values).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar("Updated Successfully");
        }
      })
    }

  }

  enableRadiobtn(value: any) {
    //console.log('value', value);
 //   console.log('flg_extend ', this.tableData[value].flg_extend);
 //   console.log(this.tableData[value].excluded, 'Falg val')
 //   console.log(this.flgdisable, 'this.flgdisable')
  //  if (this.flgdisable) {
      //  if(this.tableData[value].flg_extend == "N"){
      if (this.tableData[value].flg_extend == "Y") {
        this.flgdisable = false
     //   console.log(this.tableData[value].flg_extend, 'Falg val in If before ')
        this.tableData[value].flg_extend = "N";
    //    console.log(this.tableData[value].flg_extend, 'Falg val in else before ')
      }
      else {
     //   console.log(this.tableData[value].flg_extend, 'Falg val in Else')
        this.tableData[value].flg_extend = "Y";
     //   console.log(this.tableData[value].flg_extend, 'Falg val in else before ')
      }
      /*     }else{
            console.log(this.tableData[value].flg_extend, 'Falg val in Main Else')
            this.tableData[value].flg_extend = "Y";
            console.log(this.tableData[value].flg_extend, 'Falg val in Main else before ')
          } */
  //  }
  }

  //For Snack Bar
  openSnackBar(message: any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
    }

  }
