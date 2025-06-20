import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { UtilityServiceAvaxPro } from '../../../../core/services/utility/utility_avaxpro.service';
import { CommonSnackbarComponent } from '../../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { GroupHeadModel } from '../../entry/commons/commons.model';
import { EntryService } from '../../entry/entry.service';
import { ViewUserInfoServiceService } from '../view-user-info-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedMaterialModule } from '../../../../shared/share-material';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    SharedMaterialModule,
    ReactiveFormsModule]
})
export class ViewUserInfoComponent implements OnInit {
  form: FormGroup
  payload: any

  accLists: GroupHeadModel[] = new Array<GroupHeadModel>()
  filteredUsrLists: GroupHeadModel[] = new Array<GroupHeadModel>()

  viewflg: boolean = false;
  userLists: any = []
  message: any;
  id: any;
  usr_branchnm: any;
  usr_doj: any;
  usr_email: any;
  usr_ghid: any;
  usr_mobile1: any;
  usr_rhname: any;
  usr_short_name: any;
  usr_rhid: any;
  usr_ghname: any;
  usr_name: any;
  usr_mobile2: any;
  fromFlg: string;
  username: any;
  viewsn: boolean = false;
  viewcode: boolean = false;
  viewid: boolean = false;
  usrblockedflg: any;
  usrcreditlimit: any;
  cost_center: any;
  gdgodownname: any;
  mhr_max_days: any;
  mhr_max_hours: any;
  usrdesignation: any;
$focusevent: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private utilityServiceAvaxpro: UtilityServiceAvaxPro,
    private service: ViewUserInfoServiceService,
    private entryService: EntryService,
  ) {

    this.form = this.formBuilder.group({
      txtusrshname: [''],
      cmbUsr: [''],
      txtusrid: ['']
    });
  }

  ngOnInit() {

    this.form.get('cmbUsr')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredUsrLists = new Array<GroupHeadModel>()
    }),
      switchMap((value : any) => {
        if (value != null || value != undefined) {
          value = typeof value == 'string' || value instanceof String ? value : value.usr_userid || value.usr_name
          return value.length > 3 ? this.getUserList(value) : ['']
        }
        return ['']
      })
    ).subscribe({
      next: (data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.filteredUsrLists = data.responseData[0].map((item: any) => {
            //   console.log(item, 'item');
            return new GroupHeadModel(item.usr_userid, item.usr_name);
          });
        }
        return this.filteredUsrLists;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  getUserList(user: any): Observable<any> {
    return this.utilityServiceAvaxpro.getUserList(user)
  }
  displayUserlist(value: any): string | undefined {
    return value ? value.usr_userid + ' :: ' + value.usr_name : undefined
  }

  filterAcc(val: string) {
    return this.accLists.filter(option => {
      return (option.usr_userid.toUpperCase().includes(val.toUpperCase()) ||
        option.usr_name.toUpperCase().includes(val.toUpperCase())
      )
    })
  }

  reset() {
    this.form.reset();
    this.viewflg = false
    this.viewid = false
    this.viewsn = false
    this.viewcode = false
  }

  search() {
    // console.log(' viewid ', this.viewid)
    // console.log(' viewsn ', this.viewsn)
    // console.log(' viewcode ', this.viewcode)

    if(this.viewcode != true){
      if ((this.form.get('cmbUsr')?.value == null || this.form.get('cmbUsr')?.value == '') || this.form.get('cmbUsr')?.value.usr_userid == undefined) {
        if ((this.form.get('cmbUsr')?.value == null || this.form.get('cmbUsr')?.value == '') || this.form.get('cmbUsr')?.value.usr_name == undefined) {
          this.openSnackBar('Please Select Valid User Id Or Name To Process');
          //      alert('Please Select Valid User Id Or Name To Process');
          return false;
        } else {
          this.fromFlg = "0";
          this.username = this.form.get('cmbUsr')?.value.usr_name
        }
      } else {
        this.fromFlg = "0";
        this.username = this.form.get('cmbUsr')?.value.usr_userid;
      }
    }

    if(this.viewid != true){
      if (this.form.get('txtusrid')?.value == null || this.form.get('txtusrid')?.value == '') {
        this.openSnackBar('Please Select Valid User Id To Process');
        return false;
      }else if (!this.form.get('txtusrid')?.value.match(/^([0-9])+$/)) {
        this.openSnackBar('Please Enter Valid USER Id');
        return false;
      } else {
        this.fromFlg = "2";
        this.username = this.form.get('txtusrid')?.value;
      }
    }

    if(this.viewsn != true){
      if (this.form.get('txtusrshname')?.value == null || this.form.get('txtusrshname')?.value == '') {
        this.openSnackBar('Please Select Valid User Short Name To Process');
        return false;
      } else {
        this.fromFlg = "1";
        this.username = this.form.get('txtusrshname')?.value;
      }
    }
    this.service.getAllUserDataInformation(this.fromFlg, this.username).subscribe(data => {
      if (data.responseData[0].length == 0) {
        this.message = this.entryService.showMsg('error')
        this.viewflg = false
        return false;
      } else {
        this.viewflg = true
        this.message = "";
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.userLists = data.responseData[0].map((item : any) => {
            this.id = item.usr_id;
            this.usr_branchnm = item.usr_branchnm;
            this.usr_doj = item.usr_doj;
            this.usr_email = item.usr_email;
            this.usr_ghid = item.usr_ghid;
            this.usr_ghname = item.usr_ghname;
            this.usr_mobile1 = item.usr_mobile1;
            this.usr_mobile2 = item.usr_mobile2;
            this.usr_name = item.usr_name;
            this.usr_rhid = item.usr_rhid;
            this.usr_rhname = item.usr_rhname;
            this.usr_short_name = item.usr_short_name;
            this.usrblockedflg =item.usrblockedflg;
            this.usrcreditlimit = item.usrcreditlimit;
            this.cost_center = item.cost_center;
            this.gdgodownname = item.gdgodownname;
            this.mhr_max_days = item.mhr_max_days;
            this.mhr_max_hours = item.mhr_max_hours;
            this.usrdesignation = item.usrdesignation;
          })
        }
      }
      return this.userLists
    })
    return true;
  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

  disableFeilds(event : any, val : any) {
    // console.log(event, ' event ')
    // console.log(val, ' val ')
    if (val == 'usersn') {
      if (event != null &&  event != '') {
        this.form.controls['cmbUsr'].setValue('');
        this.form.controls['txtusrid'].setValue('');
        this.viewid = true
        this.viewsn = false
        this.viewcode = true
      }
    } else if (val == 'usercode') {
      this.form.controls['txtusrid'].setValue('');
      this.form.controls['txtusrshname'].setValue('');
      this.viewid = true
      this.viewsn = true
      this.viewcode = false
    } else if (val == 'userid') {
      if (event != null && event != '') {
        this.form.controls['cmbUsr'].setValue('');
        this.form.controls['txtusrshname'].setValue('');
        this.viewid = false
        this.viewsn = true
        this.viewcode = true
      }
    }
  }
}
