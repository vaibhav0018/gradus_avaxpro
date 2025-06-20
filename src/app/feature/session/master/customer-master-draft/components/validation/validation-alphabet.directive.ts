import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidationAlphabet]'
})
export class ValidationAlphabetDirective {

  constructor(private _el: ElementRef) {



  }

  @HostListener('input', ['$event']) onInputChange(event : any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^A-Z,a-z]*/g, '');

    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
