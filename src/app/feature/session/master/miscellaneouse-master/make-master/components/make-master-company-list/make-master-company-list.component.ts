import { Component,OnInit, Inject, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { FilterModel,TableSettings, MakeMasterTableModel } from '../make-master-menu/make-master-menu.model';
import { BehaviorSubject, elementAt } from 'rxjs';
import { MakeMasterService } from '../make-master-menu/make-master-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';
import { SharedModule } from '../../../../../../../shared/shared.module';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-make-master-company-list',
  templateUrl: './make-master-company-list.component.html',
  styleUrl: './make-master-company-list.component.scss',
  standalone: false
})

export class MakeMasterCompanyListComponent implements OnInit {

  // dataSource = new BehaviorSubject<AbstractControl[]>([]);                                             
  dataSource:any=[]; 
  public makecompanyform: FormGroup
  tableData:any=[];                                               
  // tableData: FilterModel[] = [];
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
  // @ViewChild(MatTable) table: MatTable<any>;
  flgdisable: boolean = false;
  // @Output() childSettingsFormOutput = new EventEmitter()
  
  settingsForm: any;
  constructor(
    public formBuilder: FormBuilder,
    private makemasterservice: MakeMasterService,
    private dialogRef: MatDialogRef<MakeMasterCompanyListComponent>,
    public snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.makecompanyform = this.formBuilder.group({
    });
    this.Flag = data.value;
    this.val = data.name;
    this.make_code = data.make_code,
      this.make_short_name = data.make_name,
      this.make_description = data.make_description
  }

  displayedColumns: string[] = ['company_list', 'radio_btn'];
  dataSource1 :any=[];
  ngOnInit() {
    console.log('in dialog comp')
    this.CompanyList();
  }

  // CompanyList(): void {
  //   this.data.make_code,
  //     this.data.value
  //   this.makemasterservice.getCompanyList(this.data.make_code, this.data.value).subscribe(
  //     data => {
  //       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
  //         //       console.log(data.responseData, '....data....');
  //         // this.tableData = data.responseData;
  //         data.responseData[0].map((item: any) => {
  //           this.tableData.push(item);

  //           if (item.flg_extend == 'Y') {
  //             this.flgdisable = true
  //           } else {
  //             this.flgdisable = false
  //           }
  //           return new FilterModel(
  //             item.company_code,
  //             item.company_short_name,
  //             item.flg_extend,
  //             item.make_cmp_flag,
  //             this.flgdisable
  //           )
  //         });
  //           //    console.log(item.cmk_principal_mfg_flg, '....ITEM DATA....');
  //           //    console.log(item.flg_extend, '....ITEM flg_extend....');
  //           //    debugger
  //           // //   console.log(item,'....data....');
  //           // console.log(item.make_cmp_flag,'....@@data....');

  //           // if (this.data.value == 'insert') {
  //           //   console.log('In If');
  //           //   return new FilterModel(
  //           //     item.company_code,
  //           //     item.company_short_name,
  //           //     "N",
  //           //     item.make_cmp_flag
  //           //   )
  //           // } else {
  //           //   console.log('In ELse');
  //           //   return new FilterModel(
  //           //     item.company_code,
  //           //     item.company_short_name,
  //           //     item.flg_extend,
  //           //     item.make_cmp_flag
  //           //   )
  //           // }
  //         // })
  //         this.dataSource1 = this.tableData;
  //         console.log(this.dataSource1, '....dataSource1....');
  //         this.cdr.detectChanges();
  //       }
        
  //       let group: Record<string, FormControl> = {};
  //       this.tableData.forEach((item: any) => {
  //         group['chkcmp' + item.company_code] = new FormControl('', Validators.required);
  //         group['rdbmfgflag' + item.company_code] = new FormControl('', Validators.required);
  //         group['rdbmfgflag' + item.company_code].setValue(item.cmk_principal_mfg_flg);
  //         if (item.flg_extend == 'Y') {
  //           group['chkcmp' + item.company_code] = new FormControl(item.flg_extend);
  //         }
  //       })
  //       this.makecompanyform = new FormGroup(group);
  //       console.log("sahil" , this.makecompanyform.value)
        
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }



CompanyList(): void {
  this.makemasterservice.getCompanyList(this.data.make_code, this.data.value, this.data.make_short_name, this.data.make_desc, this.data.flag).subscribe(
    data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        const formGroup: Record<string, FormControl> = {};
        this.dataSource1 = data.responseData[0].map((item: any) => {
          formGroup['chkcmp' + item.company_code] = new FormControl(item.flg_extend === 'Y');
          formGroup['rdbmfgflag' + item.company_code] = new FormControl(item.cmk_principal_mfg_flg);
          return item;
        });
        this.makecompanyform = new FormGroup(formGroup);
      }
    },
    error => console.error(error)
  );
}



  

save(values: any) {
  if (this.data.value == 'insert') {
    this.make_code = this.data.make_code;
    this.make_short_name = this.data.make_short_name;
    this.make_description = this.data.make_description;

    this.makemasterservice.createNewMake(this.make_code, this.make_short_name, this.make_description, values).subscribe(
      data => {
        if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_409') {
          this.openSnackBar("Already exists");
          return;
        } else {
          this.openSnackBar("Inserted Successfully");
          this.dialogRef.close(true); // 👈 close dialog after success
        }
      },
      error => {
        console.error(error);
        this.openSnackBar("Error occurred during insert");
      }
    );
  } else {
    this.make_code = this.data.make_code;
    this.make_short_name = this.data.make_short_name;
    this.make_description = this.data.make_description;

    this.makemasterservice.updateMakeMasterData(this.make_short_name, this.make_description, this.make_code, values).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar("Updated Successfully");
          this.dialogRef.close(true); // 👈 close dialog after update
        }
      },
      error => {
        console.error(error);
        this.openSnackBar("Error occurred during update");
      }
    );
  }
}


enableRadiobtn(element: any): void {
  // ✅ Defensive check
  if (!element) {
    console.warn('Invalid index or tableData not initialized');
    return;
  }
  
  element.flg_extend = (element.flg_extend === "Y") ? "N" : "Y";


  // const company = this.tableData[index];

  // company.flg_extend = (company.flg_extend === "Y") ? "N" : "Y";


  // ✅ Toggle flag
  // if (company.flg_extend === "Y") {
  //   this.flgdisable = false;
  //   company.flg_extend = "N";
  // } else {
  //   company.flg_extend = "Y";
  // }

  // ✅ Optional: manually trigger change detection if view not updating
  // this.cdr.detectChanges();
}


  //For Snack Bar
  openSnackBar(message: any) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
    }


}




