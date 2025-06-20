export class CheckBoxModel {
  constructor(
    public checkbox_name: string,
    public selected: boolean,
    public checkbox_columnId: number,
    public checkbox_code?: string,
    public type?: string,
    public routerLink?: string,
    public fixed_column?: string,
    public disable_sort?: boolean,
    public filter_condition_col_name?: boolean,
    public mat_icon?:string
  ) {}
}

export class TableSettings {
  public checkbox_fields: CheckBoxModel[] = []
}
