import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
   
    this._el.nativeElement.value = initalValue.replace(/[^A-Z,a-z,0-9_]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
