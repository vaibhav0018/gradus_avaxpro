import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
import { UserListModel } from '../../../../entry/commons/commons.model';
import { switchMap, debounceTime, tap } from 'rxjs/operators';
import { SnackbarQueryComponent } from '../../../snackbar-query/snackbar-query.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TooltipPosition } from '@angular/material/tooltip';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate, DatePipe } from '@angular/common';
import { ReservationService } from './reservation.service';
import { StockQty, StockModel } from './reservation.mode';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/feature/session/reports/stock-report/sr-register/components/sr-register-report/sr-register-filter/date.adapter';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { CommonsService } from '../../../../../../shared/services/commons.service';


export interface Hours {
  value: string;
  viewValue: string;
}

export interface Minuts {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss', '../../../query.scss'
  ],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],
})


export class ReservationComponent implements OnInit {
  form: FormGroup
  displayedColumns: string[] = ['resv_qty', 'doc_no', 'resv_by', 'resv_for', 'hand_by', 'resv_from_date', 'resv_upto_date', 'select'];
  //  displayedColumns: string[] = ['resv_qty', 'doc_no', 'resv_by', 'resv_for', 'hand_by', 'resv_from_date', 'resv_upto_date'];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  displayedViewColumns: string[] = ['opening', 'discrepancy', 'issued', 'balance', 'damged', 'resv', 'total_free', 'good_free'];
  ViewdataSource = new BehaviorSubject<AbstractControl[]>([]);

  addflg: boolean = false;
  updateflg: boolean = false;
  viewflg: boolean = false;

  filterLable: string = "SELECT CUSTOMER"
  showList: boolean;
  radioValue: string


  payload: object = {}
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ]


  hrs: Hours[] = [
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '00', viewValue: '00' },
  ];

  mins: Minuts[] = [
    { value: '00', viewValue: '00' },
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '24', viewValue: '24' },
    { value: '25', viewValue: '25' },
    { value: '26', viewValue: '26' },
    { value: '27', viewValue: '27' },
    { value: '28', viewValue: '28' },
    { value: '29', viewValue: '29' },
    { value: '30', viewValue: '30' },
    { value: '31', viewValue: '31' },
    { value: '32', viewValue: '32' },
    { value: '33', viewValue: '33' },
    { value: '34', viewValue: '34' },
    { value: '35', viewValue: '35' },
    { value: '36', viewValue: '36' },
    { value: '37', viewValue: '37' },
    { value: '38', viewValue: '38' },
    { value: '39', viewValue: '39' },
    { value: '40', viewValue: '40' },
    { value: '41', viewValue: '41' },
    { value: '42', viewValue: '42' },
    { value: '43', viewValue: '43' },
    { value: '44', viewValue: '44' },
    { value: '45', viewValue: '45' },
    { value: '46', viewValue: '46' },
    { value: '47', viewValue: '47' },
    { value: '48', viewValue: '48' },
    { value: '49', viewValue: '49' },
    { value: '50', viewValue: '50' },
    { value: '51', viewValue: '51' },
    { value: '52', viewValue: '52' },
    { value: '53', viewValue: '53' },
    { value: '54', viewValue: '54' },
    { value: '55', viewValue: '55' },
    { value: '56', viewValue: '56' },
    { value: '57', viewValue: '57' },
    { value: '58', viewValue: '58' },
    { value: '59', viewValue: '59' },
  ];

  selectedMinuts: any = '00'
  selectedHour: any = '00';

  userNameLists: UserListModel[] = new Array<UserListModel>()
  filteredUserLists: UserListModel[] = new Array<UserListModel>()

  userNameListsUpdate: UserListModel[] = new Array<UserListModel>()
  filteredUserListsUpdate: UserListModel[] = new Array<UserListModel>()

  panelOpenState: boolean = true
  stateDataStr: any;
  stateData: any;
  fromAuthData: any;
  vouchar_no: any;
  month: any;
  it_prod_code: any;
  um_short_desc: any;
  old_item_code: any;
  stm_make: any;
  card_no: any;
  godown_name: any;
  item_code: any;
  txtresvfor: boolean;
  godown_code: any;
  navigateData: any = {}
  stockList: any = []
  stockQtyList: any = []
  itm_catalog_ref_no: any;

  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''));
  minDate = new Date(this.controlValue.getFullYear(), 3, 1);
  maxDate = new Date(new Date().setDate(new Date().getDate()))

  voucherdate: Date;
  rsv_no: any;
  ballace_qty: any;
  from_entry: any;
  stm_damage_qty: any;
  stm_rsv_qty: any;
  bal_good_free_for_rsv: any;
  bal_free_for_rsv: any;
  stm_issued_qty: any;
  bal_good_qty: any;
  stm_opening_qty: any;
  uomnm: any;
  stm_discrepancy_qty: any;
  it_tech_desc: any;
  inout: any;
  stm_suffix: any;
  rsvOnDate: boolean;
  crd_no: any;
  rsvOnDate1: any;
  prev_rsv_qty_entred: any;

  reqDate: Date;
  minutes: any;
  hours: any;
  value: any;
  modalTitle: string
  dialogConfig = new MatDialogConfig()

  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private snackBar: MatSnackBar,
    private commonService :CommonsService,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    //  this.modalTitle = this.stateData
    this.form = this.formBuilder.group({
      rdbUserType: ['C'],
      cmbUserList: [''],
      txtResvDate: new Date(),
      txtresvqty: [''],
      txtresvfor: [''],
      txtresvqtyupdate: [''],
      txtresvforupdate: [''],
      txtResvDateupdate: new Date(),
      rdbUserTypeupdate: [''],
      cmbUserListUpdate: [''],
      dtminupdate: [''],
      dthoursupdate: [''],
      dtmin: [''],
      dthours: [''],
    })
    this.item_code = data.item_code,
      this.godown_name = data.godown_name,
      this.it_prod_code = data.it_prod_code,
      this.card_no = data.card_no,
      this.stm_make = data.stm_make,
      this.old_item_code = data.old_item_code,
      this.um_short_desc = data.um_short_desc,
      this.godown_code = data.gd_godown_code,
      this.itm_catalog_ref_no = data.itm_catalog_ref_no,
      this.from_entry = data.from_entry,
      this.it_tech_desc = data.it_tech_desc,
      this.stm_suffix = data.stm_suffix,
      this.ballace_qty = data.ballace_qty
    this.stm_rsv_qty = data.stm_rsv_qty
    this.stm_opening_qty = data.stm_opening_qty
    this.stm_issued_qty = data.stm_issued_qty
    this.stm_discrepancy_qty = data.stm_discrepancy_qty

  }

  ngOnInit() {

    this.stateData = JSON.parse(sessionStorage.getItem("stateData") || "");
    this.fromAuthData = sessionStorage.getItem("stateData");
    //   console.log(this.stateData, ' this.stateData')
    // this.item_code = this.stateData.item_code
    // this.godown_name = this.stateData.godown_name
    // this.it_prod_code = this.stateData.it_prod_code
    // this.card_no = this.stateData.card_no
    // this.stm_make = this.stateData.stm_make
    // this.old_item_code = this.stateData.old_item_code
    // this.um_short_desc = this.stateData.um_short_desc
    // this.godown_code = this.stateData.godown_code
    // this.itm_catalog_ref_no = this.stateData.itm_catalog_ref_no
    // this.from_entry = this.stateData.from_entry
    // this.it_tech_desc = this.stateData.it_tech_desc
    // this.stm_suffix = this.stateData.stm_suffix


    if (this.from_entry == 'Stock_Qry') {
      this.inout = this.card_no.split("---")[1]
      this.crd_no = this.card_no.split("---")[0]
    }

    if (this.from_entry == 'Card_Ledger') {
      this.inout = this.card_no.split("--")[1]
      this.crd_no = this.card_no.split("---")[0]
    }

    // if (this.inout.trim() == '' || this.inout.trim() == null || this.inout == undefined)  {
      if (this.inout == '' || this.inout == null || this.inout == undefined)  {
      this.inout = '0'
    }
    // console.log(this.godown_code ,' this.godown_code ' )
    // console.log(this.card_no ,' this.card_no ' )
    // console.log(this.inout ,' this.inout ' )
    // console.log(this.from_entry ,' this.from_entry ' )
    this.getStockData(this.godown_code, this.card_no, this.inout, this.from_entry)
    this.getStockQtyData(this.godown_code, this.card_no, this.inout, this.from_entry)


    // console.log(this.inout, ' inout ')
    // console.log(this.from_entry, ' this.from_entry ')
    // console.log(this.card_no, ' this.card_no ')
    // console.log(this.card_no.split("--")[0], ' !!! ')
    // console.log(this.card_no.split("--")[1], ' @@@ ')



  }
  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  getStockData(godown_code : any, card_no : any, inot_no : any, from_entry : any) {
    this.reservationService.getStockData(godown_code, card_no, inot_no, from_entry).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.stockList = data.responseData[0].map((item : any) => {
        //  console.log('stockList ', item)
          return new StockModel(item.rsv_qty_rsv, item.rsv_doc_no
            , item.rsv_rsv_by
            , item.rsv_by
            , item.hnd_by
            , item.rsv_ts_rsv_on
            , item.rsv_ts_rsv_upto
            , item.rsv_rsv_for
            , item.rsv_rsv_no
            , item.rsv_rsv_for_flg,
            item.rsv_ts_rsv_upto_temp,
            item.temp_date,
            item.rsv_rsv_for_code)
          //  return new ChequeBounsModel(item.chqbr_code, item.chqbr_desc)
        })
      }
      this.dataSource = this.stockList
      console.log(" dataSource -- " + this.dataSource)
    })
  }

  getStockQtyData(godown_code : any, card_no : any, inot_no : any, from_entry : any) {
    this.reservationService.getStockQtyData(godown_code, card_no, inot_no, from_entry).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.stockQtyList = data.responseData[0].map((item : any) => {
          // console.log(' stockQtyList ', item)
          this.ballace_qty = item.bal_qty
          this.stm_opening_qty = item.stm_opening_qty
          this.uomnm = item.uomnm
          this.stm_issued_qty = item.stm_issued_qty
          this.bal_good_qty = item.bal_good_qty
          this.bal_free_for_rsv = item.bal_free_for_rsv
          this.bal_good_free_for_rsv = item.bal_good_free_for_rsv
          this.stm_damage_qty = item.stm_damage_qty
          this.stm_rsv_qty = item.stm_rsv_qty
          this.stm_discrepancy_qty = item.stm_discrepancy_qty
          return new StockQty(
            item.stm_opening_qty,
            item.stm_discrepancy_qty
            , item.uomnm
            , item.stm_issued_qty
            , item.bal_qty
            , item.bal_good_qty
            , item.bal_free_for_rsv
            , item.bal_good_free_for_rsv,
            item.stm_damage_qty,
            item.stm_rsv_qty)
        })
      }
      this.ViewdataSource = this.stockQtyList
    })
  }

  addResv() {
    this.addflg = true
    this.updateflg = false


    /* customer /user / broker list */
    this.radioValue = this.form?.get("rdbUserType")?.value || ''
    this.form.get('cmbUserList')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredUserLists = new Array<UserListModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.user_userName
        return value.length > 2 ? this.getUserTypeList(value, this.radioValue) : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //     console.log('data.responseData[0].length', data.responseData[0].length)
        if (data.responseData[0].length == 0) {
          if (this.radioValue == "U") {
            this.openSnackBar('No user Found')
            return false
          }
          if (this.radioValue == "C") {
            this.openSnackBar('No Customer Found')
            return false
          }
          if (this.radioValue == "B") {
            this.openSnackBar('No Broker Found')
            return false
          }
        }
        else {
          this.filteredUserLists = data.responseData[0].map((item : any) => {
            return new UserListModel(
              item.user_userid,
              item.user_username,
            )
          })
        }
      }
      return this.filteredUserLists
    },
      error => {
        console.log(error)
      }
    )
  }

  /*user List  */
  getUserTypeList(userValue : any, radioValue : any): Observable<any> {
    return this.utilityServiceAvaxPro.getUserTypeList(userValue, radioValue)
  }
  displayUser(value : any): string | undefined {
    //    console.log('value user ', value)
    return value ? value.user_userId + ' :: ' + value.user_userName : undefined
  }
  filterUser(val: string) {
    return this.filteredUserLists.filter(option =>
      option.user_userName.toLowerCase().includes(val.toLowerCase())
    )
  }

  displayUserupdate(value : any): string | undefined {
    //    console.log('value user ', value)
    return value ? value.user_userId + ' :: ' + value.user_userName : undefined
  }
  filterUserUpdate(val: string) {
    return this.filteredUserListsUpdate.filter(option =>
      option.user_userName.toLowerCase().includes(val.toLowerCase())
    )
  }

  modifyResc(row : any, action : any) {
    // console.log(row.rsv_rsv_for_flg, ' rsv_rsv_for_flg ')
    if (this.form) {
      this.form.get('rdbUserTypeupdate')?.setValue(row.rsv_rsv_for_flg);
    }
    this.radioValue = this.form?.get("rdbUserTypeupdate")?.value || ''

    // if(row.hnd_by != '-'){
    //   this.value =  row.rsv_rsv_for_code;
    // }else{
    //   this.value = row.rsv_rsv_for_code
    // }

    this.utilityServiceAvaxPro.getUserTypeList(row.rsv_rsv_for_code, this.radioValue).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.filteredUserListsUpdate = data.responseData[0].map((item : any) => {
            //        console.log( ' item ',item) 
            return new UserListModel(
              item.user_userid,
              item.user_username,
            )
          })
        }
        this.modifyResc1(row, action)
        //     console.log(this.filteredUserListsUpdate , ' this.filteredUserListsUpdate ' )
        return this.filteredUserListsUpdate
      },
      error => {
        console.log(error)
      }
    )

  }

  modifyResc1(row : any, action : any) {

    //  console.log(this.form.get("rdbUserTypeupdate").value, ' rdbUserTypeupdate 1')
    // console.log(row, ' ROw')
    // console.log(row.rsv_ts_rsv_upto, ' rsv_ts_rsv_upto')

    let tmp_date = row.temp_date.substring(0, 10)
    let tmp_hrs = row.rsv_ts_rsv_upto.substring(11, 13)
    let tmp_min = row.rsv_ts_rsv_upto.substring(14, 16)

    // console.log( ' tmp_date ',tmp_date )
    // console.log( ' tmp_hrs ',tmp_hrs)
    // console.log( ' tmp_min ',tmp_min)

    this.reqDate = new Date(row.temp_date.substring(0, 10))
    this.minutes = tmp_min
    this.hours = tmp_hrs

    // this.form.get('txtresvfor').setValue(this.minutes)
    // this.form.get('txtresvfor').setValue(this.hours )


    //  console.log(this.form.get("rdbUserTypeupdate").value, ' rdbUserTypeupdate 2')
    //  console.log(action, ' action')
    this.radioValue = this.form.get("rdbUserTypeupdate")?.value || ''

    this.form.get('cmbUserListUpdate')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredUserListsUpdate = new Array<UserListModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.user_userName
        return value.length > 2 ? this.getUserTypeList(value, this.radioValue) : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //       console.log('data.responseData[0].length', data.responseData[0].length)
        if (data.responseData[0].length == 0) {
          if (this.radioValue == "U") {
            this.openSnackBar('No user Found')
            return false
          }
          if (this.radioValue == "C") {
            this.openSnackBar('No Customer Found')
            return false
          }
          if (this.radioValue == "B") {
            this.openSnackBar('No Broker Found')
            return false
          }
        }
        else {
          this.filteredUserListsUpdate = data.responseData[0].map((item : any) => {
            return new UserListModel(
              item.user_userid,
              item.user_username,
            )
          })
        }
      }
      return this.filteredUserListsUpdate
    },
      error => {
        console.log(error)
      }
    )
    // console.log(this.filteredUserListsUpdate, ' filteredUserListsUpdate');
    // console.log(this.filteredUserLists, ' filteredUserLists');

    if (this.form) {
      this.form.get('rdbUserTypeupdate')?.setValue(row.rsv_rsv_for_flg);
    }
    if (this.form) {
      this.form.get('txtresvqtyupdate')?.setValue(row.rsv_qty_rsv.toString());
    }
    let usr = row.rsv_by + "::" + row.rsv_rsv_by
    let usr1 = row.rsv_rsv_for_code + "::" + row.rsv_rsv_for
    if (this.form) {
      this.form.get('txtresvforupdate')?.setValue(usr1);
    }
    this.rsv_no = row.rsv_rsv_no

    // if(row.hnd_by != '-'){
    //   let Obj =  this.filteredUserListsUpdate.find(({ user_userId }) => user_userId == row.hnd_by);
    //   this.form.get('cmbUserListUpdate').setValue(Obj);
    // }else{
    //   let Obj = this.filteredUserListsUpdate.find(({ user_userId }) => user_userId == row.rsv_by);
    //   this.form.get('cmbUserListUpdate').setValue(Obj);
    // }
    // console.log('this.filteredUserListsUpdate === ', this.filteredUserListsUpdate);
    let Obj = this.filteredUserListsUpdate.find(({ user_userId }) => user_userId == row.rsv_rsv_for_code);
    if (this.form.get('cmbUserListUpdate')) {
      this.form.get('cmbUserListUpdate')?.setValue(Obj);
    }
    // console.log(' selected Obj ', Obj);

    //this.form.get('cmbUserListUpdate').setValue(Obj);
    this.rsvOnDate = row.rsv_ts_rsv_upto
    this.rsvOnDate1 = row.rsv_ts_rsv_upto_temp
    this.prev_rsv_qty_entred = row.rsv_qty_rsv

    this.addflg = false
    this.updateflg = true
    this.viewflg = false;
  }

  onRadioButonChangeupdate(event : any) {
    //   console.log('radVale.valueevent  ', event.value);
    this.showList = false
    this.radioValue = event.value
    if (this.radioValue != "U") {
      const cmbUserListUpdateControl = this.form.get('cmbUserListUpdate');
      if (cmbUserListUpdateControl) {
        cmbUserListUpdateControl.setValue('');
      }
    } else {
      this.form.get('cmbUserListUpdate')?.setValue(new UserListModel(atob(sessionStorage.getItem(btoa('userId')) ?? ""),
        atob(sessionStorage.getItem(btoa('username')) || "")));
    }

    if (this.radioValue == "U") {
      this.filterLable = "SELECT USER"
    }

    if (this.radioValue == "B") {
      this.filterLable = "SELECT BROKER"
    }

    if (this.radioValue == "C") {
      this.filterLable = "SELECT CUSTOMER"
    }

    //   console.log(" this.form.get('cmbUserListUpdate').", this.form.get('cmbUserListUpdate').value)
  }

  onRadioButonChange(event : any) {
    //    console.log('radVale.valueevent  ', event.value);
    this.showList = false
    this.radioValue = event.value
    if (this.radioValue != "U") {
      this.form.get('cmbUserList')?.setValue('');
    } else {
      this.form.get('cmbUserList')?.setValue(new UserListModel(atob(sessionStorage.getItem(btoa('userId')) || ""),
        atob(sessionStorage.getItem(btoa('username')) || "")));
    }

    if (this.radioValue == "U") {
      this.filterLable = "SELECT USER"
    }

    if (this.radioValue == "B") {
      this.filterLable = "SELECT BROKER"
    }

    if (this.radioValue == "C") {
      this.filterLable = "SELECT CUSTOMER"
    }

    //  console.log(" this.form.get('cmbUserList').", this.form.get('cmbUserList').value)
  }

  getDataView() {

    //this.addflg = true
    this.updateflg = false;
    this.viewflg = true;
    /* customer /user / broker list */
    this.radioValue = this.form.get("rdbUserType")?.value
    this.form.get('cmbUserList')?.valueChanges.pipe(debounceTime(100), tap(() => {
      this.filteredUserLists = new Array<UserListModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.user_userName
        return value.length > 2 ? this.getUserTypeList(value, this.radioValue) : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //     console.log('data.responseData[0].length', data.responseData[0].length)
        if (data.responseData[0].length == 0) {
          if (this.radioValue == "U") {
            this.openSnackBar('No user Found')
            return false
          }
          if (this.radioValue == "C") {
            this.openSnackBar('No Customer Found')
            return false
          }
          if (this.radioValue == "B") {
            this.openSnackBar('No Broker Found')
            return false
          }
        }
        else {
          this.filteredUserLists = data.responseData[0].map((item : any) => {
            return new UserListModel(
              item.user_userid,
              item.user_username,
            )
          })
        }
      }
      return this.filteredUserLists
    },
      error => {
        console.log(error)
      }
    )


    /*  if ((this.form.get('cmbUserList').value == null || this.form.get('cmbUserList').value == '') || this.form.get('cmbUserList').value.user_userId == undefined) {
       this.openSnackBar('Please Select User');
       return false;
     }  */
    //else {
    let usr = this.form.get('cmbUserList')?.value.user_userId + "::" + this.form.get('cmbUserList')?.value.user_userName
    //this.form.get('txtresvfor').setValue(usr)
    this.txtresvfor = this.form.get('cmbUserList')?.value.user_userId
    let d = new Date()
    let hm = this.formatAMPM(new Date());
    let hour = hm.split(':')[0];
    let minutes = hm.split(':')[1];
    // console.log(' hour = ', hour, ' minutes = ', minutes);
    this.form.get("dthours")?.setValue(hour);
    this.form.get("dtmin")?.setValue(minutes);

    //}
  }

  formatAMPM(date :any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    //var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    var strTime = hours + ':' + minutes;
    // console.log('strTime == ', strTime);
    return strTime;
  }

  saveData () {

    let labelSearchFor = ' USER';
    if (this.form.get('rdbUserType')?.value == 'C') {
      labelSearchFor = "";
      labelSearchFor = " CUSTOMER";
    }
    else if (this.form.get('rdbUserType')?.value == 'B') {
      labelSearchFor = "";
      labelSearchFor = " BROKER";
    }

    if (this.form.get('cmbUserList')?.value == null ||
      this.form.get('cmbUserList')?.value == undefined ||
      this.form.get('cmbUserList')?.value == '') {
      this.openSnackBar('Please select ' + labelSearchFor);
      return false;
    }

    let txtresvqty = this.form.get('txtresvqty')?.value
    if (txtresvqty != null || txtresvqty != "") {
      if (isNaN(txtresvqty)) {
        this.openSnackBar("Quantity should be Numeric ");
        return;
      }
      if (txtresvqty == 0) {
        this.openSnackBar("Please enter Quantity ");
        return;
      }
    } else {
      this.openSnackBar("Please enter  Quantity ");
      return;
    }

    // if (this.form.get('txtresvqty').value == '' || this.form.get('txtresvqty').value == null) {
    //   this.openSnackBar('Please Enter Quantity to procced  ');
    //   return false;
    // } else if (!this.form.get('txtresvqty').value.match(/^([0-9])+$/)) {
    //   this.openSnackBar('Please Enter Valid Quantity');
    //   return false;
    // } else 
    console.log('bal_good_free_for_rsv = ', this.bal_good_free_for_rsv);
    if (parseFloat(this.bal_good_free_for_rsv) < parseFloat(this.form.get('txtresvqty')?.value)) {
      this.openSnackBar('Reserve qty should be less than or equal to balance qty ');
      return false;
    } else if (this.form.get('dthours')?.value == '' || this.form.get('dthours')?.value == null) {
      this.openSnackBar("Please Select Hours ");
      return false;
    } else if (this.form.get('dtmin')?.value == '' || this.form.get('dtmin')?.value == null) {
      this.openSnackBar("Please Select Minuts");
      return false;
    }
    else {
      let reserved_upto = this.commonService.date_ymd(this.form.get("txtResvDate")?.value)+" "+this.form.get("dthours")?.value+":"+this.form.get("dtmin")?.value+":00";
      console.log("reserved_upto"+reserved_upto);
      this.payload = {
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
        },
        rsv_godown_no: this.godown_code,
        rsv_card_no: this.card_no,
        rsv_inout_number: this.inout,
        rsv_for: this.form.get('cmbUserList')?.value.user_userId,
        rsv_qty: this.form.get('txtresvqty')?.value,
        rsv_req_date: this.getFormattedDate(this.form.get('txtResvDate')?.value),
        rsv_for_flg: this.form.get('rdbUserType')?.value,
        rsv_current_date: new Date(new Date().getTime()),
        from_entry: this.from_entry,
        temp_date: this.utilityServiceAvaxPro.getFormatDate(this.form.get('txtResvDate')?.value, 'yyyy-MM-dd'),
        rsv_date_hrs: this.form.get('dthours')?.value,
        rsv_date_min: this.form.get('dtmin')?.value,
        reserved_upto: reserved_upto,
      }


      this.reservationService.addReservation(this.payload).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {


          this.navigateData["header"] = data.responseData[0]

          this.navigateData["item_code"] = this.item_code
          this.navigateData["godown_name"] = this.godown_name
          this.navigateData["it_prod_code"] = this.it_prod_code
          this.navigateData["card_no"] = this.card_no
          this.navigateData["stm_make"] = this.stm_make
          this.navigateData["old_item_code"] = this.old_item_code
          this.navigateData["um_short_desc"] = this.um_short_desc
          this.navigateData["godown_code"] = this.godown_code
          this.navigateData["itm_catalog_ref_no"] = this.itm_catalog_ref_no
          this.navigateData["it_tech_desc"] = this.it_tech_desc
          this.navigateData["status"] = "insert"

          sessionStorage.removeItem("stateData");
          sessionStorage.removeItem("refData");

          sessionStorage.setItem("stateData", JSON.stringify(this.navigateData));
          // this.router.navigate(['session/query/reservation/status-view'], {});
          this.getStockData(this.godown_code, this.card_no, this.inout, this.from_entry)
          this.openSnackBar("Inserted Successfully");
          return true;
        }
        else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          if(data.responseData[0] == 'INVALID DATE')
          {
          this.openSnackBar(data.responseData[0]);
          }
          else{
            this.openSnackBar("Error While Inserting");
          }
          return false;
          // console.log(data.responseData,' 0 ' )
          // console.log(data.responseData[0],' 1 ' )
        } else {
          this.openSnackBar("Error While Inserting");
          return false;
        }
      })
    }
  }

  deleteRsv() {
    this.payload = {
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
      },
      rsv_godown_no: this.godown_code,
      rsv_card_no: this.card_no,
      rsv_inout_number: this.inout,
      rsv_no: this.rsv_no,
      rsv_qty: this.form.get('txtresvqtyupdate')?.value,
      from_entry: this.from_entry
      // vouchar_no: this.vou_no,
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '350px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      message: "Are You Sure to DELETE Reservation"
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
      if (!item == true) {
        this.reservationService.deleteReservation(this.payload).subscribe({
          next: (data: any) => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.openSnackBar("Deleted Successfully");
              this.getStockData(this.godown_code, this.card_no, this.inout, this.from_entry);
              this.addflg = false;
              this.updateflg = false;
              return true;
            } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
              this.openSnackBar(data.responseData[0]);
              return false;
            } else {
              this.openSnackBar("Error While Deleting");
              return false;
            }
          },
          error: (err: any) => {
            this.openSnackBar("Error While Deleting");
            return false;
          }
        });
      }
    })
  }
  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarQueryComponent, {
      data: message,
      duration: 10000
    });
  }

  getFormattedDate(res: any) {
    const format = 'yyyy-MM-dd HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);

    return formattedDate
  }

  getFormattedDate1(res: any) {
    const format = 'dd/mm/yyyy :hh24:mi';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);

    return formattedDate
  }



  updateRsv(): boolean {
    let txtresvqty = this.form.get('txtresvqtyupdate')?.value;
    if (txtresvqty != null || txtresvqty != "") {
      if (isNaN(txtresvqty)) {
        this.openSnackBar("Quantity should be Numeric ");
        return false;
      }
      if (txtresvqty == 0) {
        this.openSnackBar("Please enter Quantity ");
        return false;
      }
    } else {
      this.openSnackBar("Please enter Quantity ");
      return false;
    }

    if (this.form.get('dthoursupdate')?.value == '' || this.form.get('dthoursupdate')?.value == null) {
      this.openSnackBar("Please Select Hours ");
      return false;
    } else if (this.form.get('dtminupdate')?.value == '' || this.form.get('dtminupdate')?.value == null) {
      this.openSnackBar("Please Select Minutes");
      return false;
    } else if (parseFloat(this.bal_good_free_for_rsv) < parseFloat(txtresvqty)) {
      this.openSnackBar('Reserve qty should be less than or equal to balance qty ');
      return false;
    } else if ((this.form.get('cmbUserListUpdate')?.value == null || this.form.get('cmbUserListUpdate')?.value == '') || this.form.get('cmbUserListUpdate')?.value.user_userId == undefined) {
      this.openSnackBar('Please Select User');
      return false;
    } else {
      this.payload = {
        userInformationDto: {
          usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
          usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
          fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
          fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
          fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
          usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
          usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
          usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
          usr_br_acc_code: atob(sessionStorage.getItem(btoa('usr_br_acc_code')) ?? ''),
        },
        rsv_godown_no: this.godown_code,
        rsv_card_no: this.card_no,
        rsv_inout_number: this.inout,
        rsv_no: this.rsv_no,
        rsv_qty: this.form.get('txtresvqtyupdate')?.value,
        from_entry: this.from_entry,
        rsv_req_date: this.getFormattedDate(this.form.get('txtResvDateupdate')?.value),
        rsv_date_hrs: this.form.get('dthoursupdate')?.value,
        rsv_date_min: this.form.get('dtminupdate')?.value,
        rsvOnDate: this.rsvOnDate1,
        rsv_req_date1: this.utilityServiceAvaxPro.getFormatDate(this.form.get('txtResvDateupdate')?.value, 'dd-MM-yyyy'),
        rsv_for: this.form.get('cmbUserListUpdate')?.value.user_userId,
        rsv_for_flg: this.form.get('rdbUserTypeupdate')?.value,
        prev_rsv_qty_entred: this.prev_rsv_qty_entred,
        temp_date: this.utilityServiceAvaxPro.getFormatDate(this.form.get('txtResvDateupdate')?.value, 'yyyy-MM-dd'),
      };

      this.reservationService.updateReservation(this.payload).subscribe((data: any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar("Updated Successfully");
          this.getStockData(this.godown_code, this.card_no, this.inout, this.from_entry);
          this.addflg = false;
          this.updateflg = false;
          return true;
        } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.responseData[0]);
          return false;
        } else {
          this.openSnackBar("Error While Updating");
          return false;
        }
      });
      return true; // Ensure a return value for all paths
    }
  }
}
