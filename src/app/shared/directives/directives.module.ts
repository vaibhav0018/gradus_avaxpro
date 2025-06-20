import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DetectScrollDirective } from './detect-scroll/detect-scroll.directive'
import { FilterItemDirective } from './filter-item/filter-item.directive'
import { NumericDirective } from './numeric/numeric.directive'
import { NumberDirective } from './numeric/numbers-only.directive'

import { DateRangeValidatorDirective } from './validators/validator/date-range-validation.service'
import { MultiFieldRequiredValidatorDirective } from './validators/validator/item-pair-validation.service'

const SHARED_DIRECTIVES = [
  DateRangeValidatorDirective,
  MultiFieldRequiredValidatorDirective,
]
@NgModule({
  imports: [CommonModule],
  declarations: [
    DetectScrollDirective,
    FilterItemDirective,
    NumericDirective,
    NumberDirective,

    SHARED_DIRECTIVES,
  ],
  exports: [
    DetectScrollDirective,
    FilterItemDirective,
    NumericDirective,
    NumberDirective,

    SHARED_DIRECTIVES,
  ],
})
export class DirectivesModule {}
