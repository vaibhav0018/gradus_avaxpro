import {Directive, HostListener, Input, isStandalone} from '@angular/core';

@Directive({
  selector: '[allowedRegExp]',
  standalone: false
})
export class AlphaNumericDirective {
    
   allowedRegExp: string="/[^0-9]*/g"
  
  @HostListener('keydown',['$event']) onKeyDown(event: any) {
    let k=event.target.value + event.key;

  alert('a')

    let re = new RegExp(this.allowedRegExp);
        
    if(!re.test(k)) event.preventDefault();
  }
}