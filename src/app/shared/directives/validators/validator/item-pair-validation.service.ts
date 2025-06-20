import {
  ValidatorFn,
  ValidationErrors,
  FormGroup,
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms'
import { Directive } from '@angular/core'

export const multiFieldRequiredValidation: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const errors: ValidationErrors = {}
  const fromItemInput = control.get('cmbFromItem')
  const toItemInput = control.get('cmbToItem')
  if (fromItemInput.value === null && toItemInput.value === null) {
    return null
  }
  if (fromItemInput.value === '' && toItemInput.value === '') {
    return null
  }
  if (
    (fromItemInput.value === null && toItemInput.value === '') ||
    (fromItemInput.value === '' && toItemInput.value === null)
  ) {
    return null
  }
  if (fromItemInput.value === null || toItemInput.value === null) {
    return { required: true }
  }
  if (fromItemInput.value === '' || toItemInput.value === '') {
    return { required: true }
  }
  return null
}

@Directive({
  selector: '[appMultiFieldRequiredValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MultiFieldRequiredValidatorDirective,
      multi: true,
    },
  ],
})
export class MultiFieldRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return multiFieldRequiredValidation(control)
  }
}

// export class ItemPairValidationService {
//   multiFieldRequiredValidation(): ValidatorFn {
//     return (control: FormGroup): ValidationErrors | null => {
//       const errors: ValidationErrors = {}
//       const fromItemInput = control.get('cmbFromItem')
//       const toItemInput = control.get('cmbToItem')
//       if (fromItemInput.value === null && toItemInput.value === null) {
//         return null
//       }
//       if (fromItemInput.value === '' && toItemInput.value === '') {
//         return null
//       }
//       if (
//         (fromItemInput.value === null && toItemInput.value === '') ||
//         (fromItemInput.value === '' && toItemInput.value === null)
//       ) {
//         return null
//       }
//       if (fromItemInput.value === null || toItemInput.value === null) {
//         return { required: true }
//       }
//       if (fromItemInput.value === '' || toItemInput.value === '') {
//         return { required: true }
//       }
//       return null
//     }

//     // if (values.every(x => ['', null].indexOf(x) > -1)) {
//     //   return null
//     // } else {
//     //   return { required: true }
//     // }
//     // if (values.every(x => ['', null].indexOf(x) > -1) || values.every(x => ['', null].indexOf(x) < 1)) {
//     // if (values.every(x => ['', null].indexOf(x) > -1) || values.every(x => x !== '')) {
//     // if (values.every(x => ['', null].indexOf(x) > -1)) {
//     // // if (values.every(x => x === '') || values.every(x => x !== '')) {
//     //   return null
//     // } else if ((values[0] !== null || values[0] !== '') && (values[1] !== null || values[1] !== '')) {
//     //   return null
//     // } else {
//     //   return { required: true }
//     // }
//     // if (fromItemInput.value === null || fromItemInput.value === '') {
//     //   if (toItemInput.value === null || toItemInput.value === ''){
//     //   return null
//     //   }
//     // } else if (fromItemInput.value === null || fromItemInput.value === ''){
//     //   return null
//     // }else {
//     //   return { required: true }
//     // }
//   }
// }
