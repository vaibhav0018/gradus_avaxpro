// // shared-material.ts
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatListModule } from '@angular/material/list';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRippleModule } from '@angular/material/core';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatStepperModule } from '@angular/material/stepper';
// import { FlexLayoutModule } from '@ngbracket/ngx-layout';

// export const MATERIAL_MODULES = [
//   FlexLayoutModule,
//   MatButtonModule,
//   MatMenuModule,
//   MatToolbarModule,
//   MatSidenavModule,
//   MatIconModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatGridListModule,
//   MatSortModule,
//   MatTableModule,
//   MatInputModule,
//   MatSelectModule,
//   MatSliderModule,
//   MatRadioModule,
//   MatListModule,
//   MatProgressSpinnerModule,
//   MatChipsModule,
//   MatTooltipModule,
//   MatExpansionModule,
//   MatDialogModule,
//   MatAutocompleteModule,
//   MatTabsModule,
//   MatSlideToggleModule,
//   MatPaginatorModule,
//   MatButtonToggleModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
//   MatProgressBarModule,
//   MatRippleModule,
//   MatSnackBarModule,
//   MatStepperModule
// ];

import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { MatRadioModule } from '@angular/material/radio'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatChipsModule } from '@angular/material/chips'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatRippleModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatStepperModule } from '@angular/material/stepper'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { CheckBoxModel } from './components/shared-settings/shared-settings.model'
import { TranslateModule } from '@ngx-translate/core'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
const MATERIAL_MODULES = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatRadioModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatDialogClose,
  MatDialogModule,
  TranslateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatOption,
  MatSelect,
  MatFormField
]

@NgModule({
  imports: [FlexLayoutModule, MATERIAL_MODULES],
  exports: [FlexLayoutModule, MATERIAL_MODULES],
})
export class SharedMaterialModule {}




