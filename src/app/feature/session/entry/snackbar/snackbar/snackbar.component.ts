import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  imports : [MatIcon],
  standalone: true
})
export class SnackbarComponent {
  className='data'
  msg=''
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,    
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.msg = data
    if(data.type!=undefined && data.type=='E'){
       this.className='error'
    }
    if(data.msg!=undefined){
      this.msg=data.msg
   }
  }

} 

