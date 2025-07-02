
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarComponent } from '../../snackbar/snackbar/snackbar.component';
import { QuotationService } from '../quotation.service';
import { VariationModel } from '../quotation.model';
@Component({
  selector: 'app-quot-item-other-info',
  templateUrl: './quot-item-other-info.component.html',
  styleUrls: ['./quot-item-other-info.component.scss', '../../entry.scss']
})
export class QuotItemOtherInfoComponent implements OnInit {

  formItemOtherInfo: FormGroup
  flgAbbeyance: boolean = false
  payload: object = {}
  objRow: any
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<QuotItemOtherInfoComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private quotationService: QuotationService,
  ) {
    this.getQuotItemOtherInfo(this.data.ao_item['qtd_draft_no'], this.data.ao_item['serial_no']);
    this.formItemOtherInfo = this.formBuilder.group({
      txtPartyItemCode: [''],
      txtItemNote: [''],
      txtItemRemarks: [''],
      txtToleranceLength: [''],
      cmbTolerance: [''],
    })
  }

  ngOnInit() {
    console.log('data:', this.data.ao_item)
  }

  tableData: any
  getQuotItemOtherInfo(draft_no : any, serial_no : any) {
    this.quotationService.getQuotItemOtherInfo(draft_no, serial_no, this.data.callFrom).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          this.tableData = data.responseData[0].variationcode.map((item : any) => {
            return new VariationModel(
              item.var_desc,
              item.var_code,
              item.var_percent
            )
          })

          this.objRow = data.responseData[0].lstdraftheader
          this.formItemOtherInfo.controls.txtPartyItemCode.setValue(this.objRow['qtd_party_item_code']);
          this.formItemOtherInfo.controls.txtItemNote.setValue(this.objRow['qtd_item_note']);
          this.formItemOtherInfo.controls.txtItemRemarks.setValue(this.objRow['qtd_item_remark']);
          this.formItemOtherInfo.controls.txtToleranceLength.setValue(this.objRow['qtd_variation_len']);
          this.formItemOtherInfo.controls.cmbTolerance.setValue(this.objRow['qtd_variation_code']);
          
        }
      })
  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
      panelClass: ['blue-snackbar']
    });
  }


  updateAOItemOtherInfo() {
    let variation_len = this.formItemOtherInfo.controls.txtToleranceLength.value
    if (variation_len == "") {
      variation_len = "0"
    }
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))||""),
        usr_name: atob(sessionStorage.getItem(btoa('username'))||""),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))||""),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))||""),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))||""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))||""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))||""),
      },

      callFrom: this.data.callFrom,
      qtd_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))||""),
      qtd_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))||""),
      qtd_serial_no: this.data.ao_item['serial_no'],
      qtd_draft_no: this.data.ao_item['qtd_draft_no'],
      qtd_quot_no: this.data.ao_item['qtd_draft_no'],
      qtd_party_item_code: this.formItemOtherInfo.controls.txtPartyItemCode.value,
      qtd_item_note: this.formItemOtherInfo.controls.txtItemNote.value,
      qtd_item_remark: this.formItemOtherInfo.controls.txtItemRemarks.value,
      qtd_variation_code: this.formItemOtherInfo.controls.cmbTolerance.value,
      qtd_variation_len: variation_len,
      aod_edited_by: atob(sessionStorage.getItem(btoa('userId'))||"")
    }
    this.quotationService.updateQuotItemOtherInfo(this.payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar('Item Other Info Updated Successfully');
          this.dialogRef.close();
        }
      })
  }

}
