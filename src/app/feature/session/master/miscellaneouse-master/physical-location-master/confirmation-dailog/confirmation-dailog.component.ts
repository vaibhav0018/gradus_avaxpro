import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dailog',
  templateUrl: './confirmation-dailog.component.html',
  styleUrls: ['./confirmation-dailog.component.scss'],
  standalone: false
})
export class ConfirmationDailogComponent implements OnInit {
  public dailogform: FormGroup
  
  private dialogRef: MatDialogRef<ConfirmationDailogComponent>
  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dailogform = this.formBuilder.group({
    });
  }
  ngOnInit() {
  }
  save() {
  }
}
