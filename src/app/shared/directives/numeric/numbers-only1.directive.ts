import { Directive, ElementRef, HostListener   } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: 'keyup[numbersOnly1]'
})
export class NumberDirective {

  constructor(private _el: ElementRef,private _snackBar: MatSnackBar) { }

 
  
  @HostListener('keyup', ['$event']) onKeyUp(event :any) {
    alert('a')
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      
      this.openSnackBar();
      
      return false;
    }
    return true;
  }

  openSnackBar() {
    this._snackBar.open('Enter Number Only','', {
      duration: 2000
   });
  }


}