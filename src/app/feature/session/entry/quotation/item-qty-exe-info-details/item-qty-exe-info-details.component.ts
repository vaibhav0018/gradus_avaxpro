import { Component, OnInit, Inject } from '@angular/core';
import { SnackbarComponent } from '../../snackbar/snackbar/snackbar.component';
import { QuotationService } from '../quotation.service';
// import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-qty-exe-info-details',
  templateUrl: './item-qty-exe-info-details.component.html',
  styleUrls: ['./item-qty-exe-info-details.component.scss', '../../entry.scss']
})
export class ItemQtyExeInfoDetailsComponent implements OnInit {

  columnsQuotQtyExeDtl = ['sr_no', 'doc_no', 'exe_date', 'exe_qty', 'reasion', 'executed_by']
  dataSourceQuotQtyExeDtl: any
  payload: any
  modalTitle: string

  constructor(private quotationService: QuotationService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ItemQtyExeInfoDetailsComponent>,
  ) {
    this.modalTitle = this.data.title
  }

  ngOnInit() {
    console.log('data:', this.data)
    this.getQuotExeQtyDtlList();
  }

  getQuotExeQtyDtlList() {
    this.payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ""),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ""),
      },
      qt_quot_no: this.data.qt_quot_no,
      qtd_serial_no: this.data.qtd_serial_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))  || ""),
      qt_created_by: atob(sessionStorage.getItem(btoa('userId'))  || ""),
      qt_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))  || ""),
    }
    this.quotationService.getQuotExeQtyDtlList(this.payload).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        console.log(' getQuotExeQtyDtlList ', data.responseData[0])
        if (data.responseData[0].length == 0) {
          this.openSnackBar('No Data Found');
          this.dialogRef.close();
        } else {
          this.dataSourceQuotQtyExeDtl = data.responseData[0];
        }
      } else {
        this.openSnackBar('No Data Found');
        this.dialogRef.close();
      }
    })

  }

  openSnackBar(message : any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }


}
