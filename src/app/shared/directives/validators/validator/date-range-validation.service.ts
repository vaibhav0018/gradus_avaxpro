import {
  ValidatorFn,
  ValidationErrors,
  FormGroup,
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms'
import { CommonsService } from '../../../services/commons.service'
import { Directive } from '@angular/core'

export const dtRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const formGroup = control as FormGroup
  const errors: ValidationErrors = {}
  const fromDate = formGroup.get('dtFromDate')?.value
  const toDate = formGroup.get('dtToDate')?.value

  const commonsService = new CommonsService()
  const diff_years = commonsService.date_diff_ymd(
    commonsService.date_ymd(fromDate),
    commonsService.date_ymd(toDate)
  )
  if (diff_years && diff_years > 0) {
    errors.dtRangeOverflow = {
      message: 'Range of From Date and To Date Should not be more than 1 year',
    }
  }
  return errors ? errors : null
}

@Directive({
  selector: '[appDtRangeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: DateRangeValidatorDirective, multi: true },
  ],
})
export class DateRangeValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return dtRangeValidator(control) || {}
  }
}
