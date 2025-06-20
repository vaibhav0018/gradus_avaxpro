import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidationPancard]'
})
export class ValidationPancardDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event : any) {
    const initalValue = this._el.nativeElement.value;
   
    this._el.nativeElement.value =  initalValue.replace(/[^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
