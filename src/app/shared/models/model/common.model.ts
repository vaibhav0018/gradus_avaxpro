export class CommonEntity {}

export class GodownModel {
  godown_code: string
  godown_name: string

  constructor(godown_code: string, godown_name: string) {
    this.godown_code = godown_code
    this.godown_name = godown_name
  }
}

export class MakeModel {
  make_code: string
  make_name: string
  make_short_name:string

  constructor(make_code: string, make_name: string, make_short_name:string) {
    this.make_code = make_code
    this.make_name = make_name
    this.make_short_name = make_short_name
  }
}

export class ItemModel {
  item_code: string
  item_name: string
  item_cat_ref_no:string
  constructor(item_code: string, item_name: string,  item_cat_ref_no:string) {
    this.item_code = item_code
    this.item_name = item_name
    this.item_cat_ref_no = item_cat_ref_no
  }
}

export class OrderByModel {
  orderBy_code: string
  orderBy_name: string

  constructor(orderBy_code: string, orderBy_name: string) {
    this.orderBy_code = orderBy_code
    this.orderBy_name = orderBy_name
  }
}

export class PhysicalLocationModel {
  physical_location_code: string
  physical_location_name: string

  constructor(physical_location_code: string, physical_location_name: string) {
    this.physical_location_code = physical_location_code
    this.physical_location_name = physical_location_name
  }
}

export class BranchModel {
  branch_code: string
  siscon_code: string
  branch_city: string
  branch_name: string
  branch_company_code: string
  br_acc_code:string | undefined
  br_capital_acc_code:string| undefined
  br_state_code:string| undefined
  constructor(
    branch_code: string,
    siscon_code: string,
    branch_city: string,
    branch_name: string,
    branch_company_code: string,
    br_acc_code?:string,
    br_capital_acc_code?:string,
    br_state_code?:string
  ) {
    this.branch_code = branch_code
    this.siscon_code = siscon_code
    this.branch_city = branch_city
    this.branch_name = branch_name
    this.branch_company_code = branch_company_code
    this.br_acc_code = br_acc_code
    this.br_capital_acc_code = br_capital_acc_code
    this.br_state_code = br_state_code
  }
}

export class GodownWiseStockStatusReportPayload {
  as_on_date?: string
  godown_code?: string
  make_code?: string
  from_item_code?: string
  to_item_code?: string
  file_name?: string
  file_extension?: string
}

export class UserFinYearModel {
  df_year_beg: string
  df_year_end: string
  df_year_format: string

  constructor(df_year_beg: string, df_year_end: string, df_year_format: string) {
    this.df_year_beg = df_year_beg
    this.df_year_end = df_year_end
    this.df_year_format = df_year_format
  }
}


export class UsrFinYearModel {
  df_year_beg: string
  df_year_end: string
  df_year_format: string
  year_beg:string
  year_end:string
  constructor(df_year_beg: string, df_year_end: string, df_year_format: string,year_beg:string,year_end:string) {
    this.df_year_beg = df_year_beg
    this.df_year_end = df_year_end
    this.df_year_format = df_year_format
    this.year_beg = year_beg
    this.year_end = year_end
  }
}

export class ItemMainGroupModel {
  group_code: number
  group_name: string

  constructor(group_code: number, group_name: string) {
    this.group_code = group_code
    this.group_name = group_name
  }
}
