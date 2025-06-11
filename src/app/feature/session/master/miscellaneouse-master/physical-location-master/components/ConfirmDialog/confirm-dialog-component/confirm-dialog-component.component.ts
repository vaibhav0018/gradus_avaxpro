import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PhysicalLocationMasterService } from '../../physical-location-master-menu/physical-location-master.service'
import { SnackbarMasterComponent } from '../../../../../snackbar-master/snackbar-master.component';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrls: ['./confirm-dialog-component.component.scss'],
  standalone: false
})
export class ConfirmDialogComponentComponent implements OnInit {
  
  public dailogform: FormGroup
  tableData: any;
  phy_loc: String;
  godownCode: String;
  private dialogRef: MatDialogRef<ConfirmDialogComponentComponent>

  constructor(private PhysicalLocationMasterService: PhysicalLocationMasterService, public formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar) {
    this.dailogform = this.formBuilder.group({

    });
    this.phy_loc = data.gpl_loc;
    this.godownCode = data.godown_code;
  }

  ngOnInit() {
  }
  save() {
    this.PhysicalLocationMasterService.deletePhysicalLocation(this.phy_loc,this.godownCode).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar(' '+ this.phy_loc +' Deleted Successfully');
          return true;
        }else {
          this.openSnackBar("Error While Deleting !");
          return false;
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }
}
