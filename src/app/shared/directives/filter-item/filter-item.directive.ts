import { Directive, HostListener, HostBinding } from '@angular/core'

@Directive({
  selector: '[filter-item-directive]',
})
export class FilterItemDirective {
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    return false
  }
}
