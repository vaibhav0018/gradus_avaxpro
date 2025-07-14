import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-confirmation-dialog',
  templateUrl: './common-confirmation-dialog.component.html',
  styleUrls: ['./common-confirmation-dialog.component.scss'],
  standalone : false
})
export class CommonConfirmationDialogComponent implements OnInit {
  public dailogform: FormGroup
  message: any;
  dialogType:string='CONFIRM'
  private dialogRef: MatDialogRef<CommonConfirmationDialogComponent>

  constructor(public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.dailogform = this.formBuilder.group({
    });
    this.message = data.message;

    if(data.dialogType!=undefined){
      this.dialogType= data.dialogType
    }

  }

  ngOnInit() {
  }

}

