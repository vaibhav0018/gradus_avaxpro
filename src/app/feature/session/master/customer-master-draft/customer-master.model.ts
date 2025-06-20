export class CustomerMaster {
}


export class CommonColumnModel {
  col_name: string
  db_col: string
  flgLink: boolean
  col_type: string
  funName?: string
  btnFlg?: boolean
  btnText?: string
  constructor(
    col_name: string,
    db_col: string,
    flgLink: boolean,
    col_type: string,
    funcName?: string,
    btnFlg?: boolean,
    btnText?: string
  ) {
    this.col_name = col_name
    this.db_col = db_col
    this.flgLink = flgLink
    this.col_type = col_type
    this.funName = funcName
    this.btnFlg = btnFlg
    this.btnText = btnText
  }
}


export class CompColumnModel {
  col_name: string
  db_col: string
  flgLink: boolean
  col_type: string
  dropdownflg?: boolean
  textboxflg?: boolean
  btnText?: boolean
  hnd?: boolean
  constructor(
    col_name: string,
    db_col: string,
    flgLink: boolean,
    col_type: string,
    dropdownflg?: boolean,
    textboxflg?: boolean,
    btnText?: boolean,
    hnd?: boolean
  ) {
    this.col_name = col_name
    this.db_col = db_col
    this.flgLink = flgLink
    this.col_type = col_type
    this.dropdownflg = dropdownflg
    this.textboxflg = textboxflg
    this.btnText = btnText
    this.hnd = hnd
  }
}
export class PartyModel {
  cs_code: string
  cs_name: string
  cust_flg?: string
  cs_authorised?: string

  constructor(cs_code: string, cs_name: string, cust_flg?: string, cs_authorised?: string) {
    this.cs_code = cs_code
    this.cs_name = cs_name
    this.cust_flg = cust_flg
    this.cs_authorised = cs_authorised
  }
}
export class CustTypeModel {
  ct_code: string
  ct_customer_type: string

  constructor(ct_code: string, ct_customer_type: string) {
    this.ct_code = ct_code
    this.ct_customer_type = ct_customer_type
  }
}

export class SelectionListModel {
  sm_code: string
  sm_percentage: string
  sm_corporate_perc: string
  constructor(sm_code: string, sm_percentage: string, sm_corporate_perc: string) {
    this.sm_code = sm_code
    this.sm_percentage = sm_percentage
    this.sm_corporate_perc = sm_corporate_perc
  }
}

export class AccountModel {
  acc_code: string
  acc_name: string

  constructor(acc_code: string, acc_name: string) {
    this.acc_code = acc_code
    this.acc_name = acc_name
  }
}

export class BankModel {
  bnk_code: string
  bnk_bbranch_code: string
  bnk_name: string
  bnk_code_branch_code? :string
  constructor(bnk_code: string, bnk_bbranch_code: string, bnk_name: string,bnk_code_branch_code?:string) {
    this.bnk_code = bnk_code
    this.bnk_bbranch_code = bnk_bbranch_code
    this.bnk_name = bnk_name
    this.bnk_code_branch_code = bnk_code_branch_code
  }
}

export class MenuModel {
  cd_cust_draft_code: string
  cd_name: string
  cd_ts_created: string
  usr_name: string
  cs_authorised: string
  rn:string
  gstflg:string
  emailflg?:string
  constructor(
    cd_cust_draft_code: string,
    cd_name: string,
    cd_ts_created: string,
    usr_name: string,
    cs_authorised: string,
    rn:string,
    gstflg:string,
    emailflg?:string
  ) {
    this.cd_cust_draft_code = cd_cust_draft_code
    this.cd_name = cd_name
    this.cd_ts_created = cd_ts_created
    this.usr_name = usr_name
    this.cs_authorised = cs_authorised
    this.rn = rn
    this.gstflg = gstflg
    this.emailflg=emailflg
  }
}

export class GroupCodeModel {
  cs_cust_supplr_code: string
  cs_name: string

  constructor(cs_cust_supplr_code: string, cs_name: string) {
    this.cs_cust_supplr_code = cs_cust_supplr_code
    this.cs_name = cs_name
  }
}
