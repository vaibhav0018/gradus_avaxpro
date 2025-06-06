import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSpecialcharvalidation]',
  standalone: false
})
export class SpecialcharvalidationDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
   
    this._el.nativeElement.value = initalValue.replace(/[^A-Z,a-z,0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
