import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { AppSettings } from '../../../app.settings'
import { Settings } from '../../../app.settings.model'
import { CheckBoxModel, TableSettings } from './shared-settings.model'

@Component({
  selector: 'app-settings',
  templateUrl: './shared-settings.component.html',
  styleUrls: ['./shared-settings.component.scss'],
  providers: [],
  standalone: false,
})
export class SettingsComponent implements OnInit {
  public settings: Settings
  public settingsForm: FormGroup
  tableSettings: TableSettings
  checkBoxModel: CheckBoxModel
  @Output() childSettingsFormOutput = new EventEmitter()
  modalTitle: string
  fromPage: string
  userId: string
  checkbox_name: string

  get column_names(): FormArray {
    return this.settingsForm.get('column_names') as FormArray
  }

  constructor(
    public appSettings: AppSettings,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingsComponent>
  ) {
    this.settings = this.appSettings.settings
    this.modalTitle = data.title
    this.fromPage = data.fromPage
  }

  ngOnInit() {
    this.tableSettings = new TableSettings()
    this.tableSettings.checkbox_fields = this.data.dynamicColumnsData
      .map((item : any) => {
        if (!item.is_dynamic) {
          return new CheckBoxModel(
            item.column_name,
            item.enabled,
            item.column_id,
            item.column_code,
            item.type,
            item.routerLink,
            item.fixed_column,
            item.disable_sort,
            item.filter_condition_col_name,
            item.mat_icon
          )
        }
        return null; // Ensure all code paths return a value
      })
      .filter((item: any) => item)
    this.createForm(this.tableSettings)
  }

  createForm(tableSettings: TableSettings) {
    const columnsFA: FormArray = this.createDefaultForm(tableSettings)
    this.settingsForm = this.formBuilder.group({
      column_names: columnsFA,
    })
  }

  createDefaultForm(tableSettings: TableSettings): FormArray {
    const fgs: FormGroup[] = tableSettings.checkbox_fields.map(field => {
      const fg = new FormGroup({
        checkbox_columnId: new FormControl(field.checkbox_columnId),
        checkbox_name: new FormControl({ value: field.checkbox_name, disabled: true }),
        selected: new FormControl({
          value: field.selected,
          disabled: !!field.fixed_column,
        }),
        checkbox_code: new FormControl(field.checkbox_code),
        type: new FormControl(field.type),
        routerLink: new FormControl(field.routerLink),
        condition_select: new FormControl(),
        fixedColumn: new FormControl(field.fixed_column),
        disableSort: new FormControl(field.disable_sort),
        filterConditionColName: new FormControl(field.filter_condition_col_name),
        mat_icon:new FormControl(field.mat_icon),
      })
      return fg
    })
    const columnsFA = new FormArray(fgs)
    return columnsFA
  }
  onSubmit(values: Object): void {
    if (this.settingsForm.valid) {
      this.childSettingsFormOutput.emit(this.settingsForm.getRawValue())
    }
  }
  save() {
    if (this.settingsForm.valid) {
      this.dialogRef.close(this.settingsForm.getRawValue())
    }
  }
}
