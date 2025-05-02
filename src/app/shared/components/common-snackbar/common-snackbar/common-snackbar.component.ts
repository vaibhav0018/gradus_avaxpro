import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-common-snackbar',
  templateUrl: './common-snackbar.component.html',
  styleUrls: ['./common-snackbar.component.scss'],
  imports: [MatIcon]
})
export class CommonSnackbarComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<CommonSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}


