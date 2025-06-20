import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appValidationEmail]'
})
export class ValidationEmailDirective {
  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event : any) {
    const initalValue = this._el.nativeElement.value;
   
    this._el.nativeElement.value = initalValue.replace(/[^A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2})$/, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
