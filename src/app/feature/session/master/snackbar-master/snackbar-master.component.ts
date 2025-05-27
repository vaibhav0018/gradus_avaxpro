import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-master',
  imports: [ MatIcon],
  templateUrl: './snackbar-master.component.html',
  styleUrl: './snackbar-master.component.scss'
})
export class SnackbarMasterComponent {

    constructor(public snackBarRef: MatSnackBarRef<SnackbarMasterComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
