import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ItemModel, MakeModel } from '../entry/commons/commons.model';
import { MatDialogModule } from '@angular/material/dialog';
import { EntryService } from '../entry/entry.service';
import { UtilityService } from '../../../core/services/utility/utility.service';
import { UtilityServiceAvaxPro } from '../../../core/services/utility/utility_avaxpro.service';
import { CommonSnackbarComponent } from '../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { ItemQryServiceService } from './item-qry-service.service';
import { ImageDialogComponent } from '../query/stock-query/components/stock-query-report/image-dialog/image-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ItemMainGroupModel } from '../../../shared/models/model/common.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, matFormFieldAnimations } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormField,
    MatAutocomplete,
    MatOption,
    MatGridTile,
    MatGridList,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule],
  selector: 'app-item-query',
  templateUrl: './item-query.component.html',
  styleUrls: ['./item-query.component.scss',]
})
export class ItemQueryComponent implements OnInit {
  form: FormGroup;
  itemList: ItemModel[] = new Array<ItemModel>()

  makeLists: any = []
  filteredMakeLists: Observable<any>

  itemGroupLists: any = []

  itemMainGroupList: any = []
  filteredItemMainGroupList: Observable<any>

  subGroupList: any = []
  filteredSubGroupList: Observable<any>

  itemFlag: boolean = false
  item_code: string;
  tableData: any;
  flag: boolean = false;
  message: any;
  gst_perc: any;
  it_item_code: any;
  it_main_grp_code: any;
  it_main_subgrp_code: any;
  it_main_subgrp_name: any;
  mmx_lp: any;
  it_tariff_code: any;
  it_prod_code: any;
  it_main_grp_name: any;
  it_item_name: any;
  hts_igst_perc: any;
  sub_group_name: any;
  main_group: any;
  um_desc: any;
  make_code: any;
  temp_catref: any;
  catrefno: any;
  catflg: boolean = false;
  imgUrl: string = ' '
  imgUrlLngth: number = 0

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private utilityService: UtilityService,
    private itemQryService: ItemQryServiceService,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
    private entryService: EntryService,
    private dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      cmbItems: [''],
      cmbMake: [''],
      cmbMainGroup: [''],
      cmbSubGroup: [''],
      txtitemCode: [''],
      cmbItemCode: ['']
    });

  }

  ngOnInit() {

    this.form.get('cmbMake')?.setValue(new MakeModel('', 'All', 'All'))
    /* ItemMain Group List */
    this.getMainGroupList()
    this.getSubGroupList(-1)
    /* MakeList */
    this.getMakeList()
  }

  /*Item List  */
  getItemList(itemCode: any): Observable<any> {
    return this.utilityServiceAvaxPro.getItemList(itemCode, 'I')
  }
  // displayItem(value: any): string | undefined {
  //   return value ? value.item_code + ' -- ' + value.item_name + ' -- ' + value.catrefno + ' -- ' + value.itm_make_code : undefined
  // }
  displayItem(value: any): string {
    return value ? value.item_name : '';
  }
  filterItems(val: string) {
    return this.itemList.filter(option =>
      option.item_code.toLowerCase().includes(val.toLowerCase()) ||
      option.item_name.toLowerCase().includes(val.toLowerCase()) ||
      option.catrefno.toLowerCase().includes(val.toLowerCase()) ||
      option.itm_make_code.toLowerCase().includes(val.toLowerCase())
    )
  }
  /*Item List End   */


  getMakeList() {
    this.utilityService.getMakeMultiSelectList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.makeLists = data.responseData[0].map((item: any) => {
            return new MakeModel(item.mk_code, item.mk_desc, item.mk_short_name)
          })
          /* Settig default value to Godown */
          this.form.get('cmbMake')?.setValue(new MakeModel('', 'All', 'All'))
        }
        return this.makeLists
      },
      error => {
        console.log(error)
      }
    )
  }
  compareMake(selected: MakeModel, toSelect: MakeModel): boolean {
    if (selected.make_code == toSelect.make_code) {
      return true
    } else return false
  }


  getMainGroupList(): void {
    this.utilityService.getMainGroupList().subscribe({
        next: (data: any) => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            this.itemGroupLists = data.responseData.map((item: any) => {
              return new ItemMainGroupModel(item.group_code, item.group_name);
            });
            //this.form.get('cmbMainGroup').setValue(new ItemMainGroupModel(-1, 'All'));
          }
          return this.itemGroupLists;
        },
        error: (error: any) => {
        console.log(error)
      }
    }
    )
  }
  compareItemMainGroup(
    selected: ItemMainGroupModel,
    toSelect: ItemMainGroupModel
  ): boolean {
    if (selected.group_code == toSelect.group_code) {
      return true
    } else return false
  }

  displayGroupItem(value: any): string | undefined {
    return value ? value.group_name : undefined
  }
  filterGroupItem(val: string) {
    return this.itemGroupLists.filter((option : any) => {
      return option.group_name.toLowerCase().includes(val.toLowerCase())
    })
  }

  getSubGroupList(group_code: any): void {
    this.utilityService.getSubGroupList(group_code).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.subGroupList = data.responseData.map((item: any) => {
            return new ItemMainGroupModel(item.group_code, item.main_group_name)
          })
        }
        return this.subGroupList
      },
      error => {
        console.log(error)
      }
    )
  }
  compareItemSubGroup(
    selected: ItemMainGroupModel,
    toSelect: ItemMainGroupModel
  ): boolean {
    if (selected.group_code == toSelect.group_code) {
      return true
    } else return false
  }
  filterSubGroup(val: string) {
    return this.subGroupList.filter((option : any) => {
      return option.group_name.toLowerCase().includes(val.toLowerCase())
    })
  }

  onGroupChange(event : any, group_code : any): void {
    this.itemFlag = false
    if (event.source.selected) this.getSubGroupList(group_code)
  }

  openSnackBar(message: any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }

  searchItem() {
    if (this.form.get('cmbItems')?.value != "") {
      // console.log( this.form.get('cmbItems').value , '  @@@@@ ' )
      this.item_code = this.form.get('cmbItems')?.value.item_code;
      this.make_code = this.form.get('txtitemCode')?.value.itm_make_code;
    }
    if (this.item_code == null || this.item_code == '') {
      this.openSnackBar("Please Select Item Code");
      return false;
    } else {
      this.itemQryService.getItemDtls(this.item_code, this.make_code).subscribe(
        data => {
          if (data.responseData[0].length == 0) {
            this.message = this.entryService.showMsg('error')
            this.flag = false
            return false;
          } else {
            this.flag = true
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.tableData = data.responseData[0].map((item : any) => {
                //       console.log('Item  ', item);
                this.gst_perc = item.gst_perc
                this.it_item_code = item.it_item_code
                this.it_item_name = item.it_item_name
                this.it_main_grp_code = item.it_main_grp_code
                this.it_main_grp_name = item.it_main_grp_name
                this.it_main_subgrp_code = item.it_main_subgrp_code
                this.it_main_subgrp_name = item.it_main_subgrp_name
                this.it_prod_code = item.it_prod_code
                this.it_tariff_code = item.it_tariff_code
                this.mmx_lp = item.mmx_lp
                this.main_group = item.main_group
                this.sub_group_name = item.sub_group_name
                this.hts_igst_perc = item.hts_igst_perc
              })
            }
          }
          return true
        }
      )
    }
    return true;
  }

  searchItem1() {

    if ((this.form.get('txtitemCode')?.value == null || this.form.get('txtitemCode')?.value == '')) {
      this.openSnackBar("Please Select Item details.");
      this.flag = false
      return false
    } else if (this.form.get('txtitemCode')?.value && this.form.get('txtitemCode')?.value.length < 3) {
      this.openSnackBar('Please Enter More Then 2 Characters');
      this.flag = false
      return false;
    } else {
      let value = this.form.get('txtitemCode')?.value?.trim() || ''
      this.temp_catref = this.form.get('txtitemCode')?.value?.trim() || ''
      this.utilityServiceAvaxPro.getItemList(value, 'I').subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (data.responseData[0].length == 0) {
            this.openSnackBar("no data found.");
          } else {
            this.itemList = data.responseData[0].map((item : any) => {
              return new ItemModel(item.it_code, item.it_name, item.catrefno, item.itm_make_code)
            })
          }
        }
        return this.itemList
      })
    }
    return true
  }

  viewItemDetails() {
    if ((this.form.get('cmbItemCode')?.value == null || this.form.get('cmbItemCode')?.value == '') || this.form.get('cmbItemCode')?.value.item_code == undefined) {
      this.openSnackBar('Please Select Item');
      return false;
    } else {
      const cmbItemCodeControl = this.form.get('cmbItemCode');
      this.item_code = cmbItemCodeControl && cmbItemCodeControl.value ? cmbItemCodeControl.value.item_code : null;
      this.make_code = this.form.get('txtitemCode')?.value?.itm_make_code || '';
      this.itemQryService.getItemDtls(this.item_code, this.make_code).subscribe(
        data => {
          if (data.responseData[0].length == 0) {
            this.message = this.entryService.showMsg('error')
            this.flag = false
            return false;
          } else {
            this.flag = true
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.tableData = data.responseData[0].map((item : any) => {
                // console.log('Item  ', item);
                this.gst_perc = item.gst_perc
                this.it_item_code = item.it_item_code
                this.it_item_name = item.it_item_name
                this.it_main_grp_code = item.it_main_grp_code
                this.it_main_grp_name = item.it_main_grp_name
                this.it_main_subgrp_code = item.it_main_subgrp_code
                this.it_main_subgrp_name = item.it_main_subgrp_name
                this.it_prod_code = item.it_prod_code
                this.it_tariff_code = item.it_tariff_code
                this.mmx_lp = item.mmx_lp
                this.main_group = item.main_group
                this.sub_group_name = item.sub_group_name
                this.hts_igst_perc = item.hts_igst_perc
              })
            }
          }
          return true
        })
    }
    return true
  }

  viewItemDetails11() {
    if ((this.form.get('txtitemCode')?.value == null || this.form.get('txtitemCode')?.value == '') || this.form.get('txtitemCode')?.value.item_code == undefined) {
      this.openSnackBar('Please Select Item');
      this.flag = false
      return false;
    } else {
      // console.log( this.form.get('txtitemCode').value , ' txtitemCode ')
      // console.log( this.temp_catref , ' this.temp_catref ')

      this.item_code = this.form.get('txtitemCode')?.value?.item_code || '';
      this.make_code = this.form.get('txtitemCode')?.value?.itm_make_code || '';

      this.itemQryService.getItemDtls(this.item_code, this.make_code).subscribe(
        (data : any) => {
          if (data.responseData[0].length == 0) {
            this.message = this.entryService.showMsg('error')
            this.flag = false
            return false;
          } else {
            this.flag = true
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.tableData = data.responseData[0].map((item : any) => {
                // console.log('Item  ', item);
                this.gst_perc = item.gst_perc
                this.it_item_code = item.it_item_code
                this.it_item_name = item.it_item_name
                this.it_main_grp_code = item.it_main_grp_code
                this.it_main_grp_name = item.it_main_grp_name
                this.it_main_subgrp_code = item.it_main_subgrp_code
                this.it_main_subgrp_name = item.it_main_subgrp_name
                this.it_prod_code = item.it_prod_code
                this.it_tariff_code = item.it_tariff_code
                this.mmx_lp = item.mmx_lp
                this.main_group = item.main_group
                this.sub_group_name = item.sub_group_name
                this.hts_igst_perc = item.hts_igst_perc
                this.um_desc = item.um_desc
                this.catrefno = item.catrefno
              })
              this.imgUrl = data.responseData[1];
              this.imgUrlLngth = data.responseData[1].length
            }
            if (this.temp_catref.trim().startsWith(this.catrefno)) {
              this.catflg = true
            } else {
              this.catflg = false
              this.catrefno = ''
            }
            // console.log( '   this.catflg ' ,  this.catflg)
          }
          return true
        })
    }
    return true
  }

  rest() {
    this.itemList = []
    this.flag = false
    this.form.reset();
  }

  openImageDialog(imgUrl: any , ItemCode: any, prod_code: any ){
    console.log(imgUrl);
    
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '90%',
      minWidth: '90%',
      height: '80%',
      maxHeight: '200vh',
      data: {
        url: imgUrl,
        item_details: ItemCode + "-" + prod_code,
        item_code:ItemCode

      }
    });
    dialogRef.afterClosed().subscribe((objBulkData: any) => {

    });
  }
}
