import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar-query',
  templateUrl: './snackbar-query.component.html',
  styleUrls: ['./snackbar-query.component.scss']
})
export class SnackbarQueryComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarQueryComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
  }

} 