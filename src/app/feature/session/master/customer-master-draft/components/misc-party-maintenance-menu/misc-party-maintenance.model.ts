
/* export class MiscPartyModel {
  mp_misc_party_code: string;
  mp_name: string;

  constructor(
    mp_misc_party_code: string
    , mp_name: string) {
    this.mp_misc_party_code = mp_misc_party_code
    this.mp_name = mp_name
  }
} */

export class IndustryListModel {
  ind_industry_code: string;
  ind_industry: string;

  constructor(
    ind_industry_code: string
    , ind_industry: string) {
    this.ind_industry_code = ind_industry_code
    this.ind_industry = ind_industry
  }
}

export class StateMasterListModel {
  st_code: string
  st_state: string

  constructor(st_code: string, st_state: string) {
    this.st_code = st_code
    this.st_state = st_state
  }
}

export class CountryListModel {
  ctr_code: string
  ctr_desc: string
  ctr_home_country_flg?: string
  constructor(ctr_code: string, ctr_desc: string, ctr_home_country_flg?: string) {
    this.ctr_code = ctr_code
    this.ctr_desc = ctr_desc
    this.ctr_home_country_flg = ctr_home_country_flg
  }
}

/* export class MiscPartyDataModel {
  data: string;
  mp_misc_party_code: string;
  mp_name: string;
  mp_pay_code: string;
  mp_pay_terms_day: string;
  mp_handled_by: string;
  mp_industry_head_code: string;
  csad_address1: string;
  csad_address2: string;
  csad_address3: string;
  csad_address4: string;
  csad_pincode: string;
  csad_state_code: string;
  csad_latitude: string;
  csad_longitude: string;
  csad_country_code: string;
  csad_tel_no1: string;
  csad_tel_no2: string;
  csad_fax_1: string;
  csad_fax_2: string;
  csad_email_1: string;
  csad_email_2: string;
  csad_pan_no: string;
  csad_gst_no: string;
  csad_allow_special_tax: string

  constructor(
    data: string,
    mp_misc_party_code: string,
    mp_name: string,
    mp_pay_code: string,
    mp_pay_terms_day: string,
    mp_handled_by: string,
    mp_industry_head_code: string,
    csad_address1: string,
    csad_address2: string,
    csad_address3: string,
    csad_address4: string,
    csad_pincode: string,
    csad_state_code: string,
    csad_latitude: string,
    csad_longitude: string,
    csad_country_code: string,
    csad_tel_no1: string,
    csad_tel_no2: string,
    csad_fax_1: string,
    csad_fax_2: string,
    csad_email_1: string,
    csad_email_2: string,
    csad_pan_no: string,
    csad_gst_no: string,
    csad_allow_special_tax: string
  ) {
    this.data = data
    this.mp_misc_party_code = mp_misc_party_code
    this.mp_name = mp_name
    this.mp_pay_code = mp_pay_code
    this.mp_pay_terms_day = mp_pay_terms_day
    this.mp_handled_by = mp_handled_by
    this.mp_industry_head_code = mp_industry_head_code
    this.csad_address1 = csad_address1
    this.csad_address2 = csad_address2
    this.csad_address3 = csad_address3
    this.csad_address4 = csad_address4
    this.csad_pincode = csad_pincode
    this.csad_state_code = csad_state_code
    this.csad_latitude = csad_latitude
    this.csad_longitude = csad_longitude
    this.csad_country_code = csad_country_code
    this.csad_tel_no1 = csad_tel_no1
    this.csad_tel_no2 = csad_tel_no2
    this.csad_fax_1 = csad_fax_1
    this.csad_fax_2 = csad_fax_2
    this.csad_email_1 = csad_email_1
    this.csad_email_2 = csad_email_2
    this.csad_pan_no = csad_pan_no
    this.csad_gst_no = csad_gst_no
    this.csad_allow_special_tax = csad_allow_special_tax
  }
} */

export class MiscPartyMasterMenu {
  cs_cust_supplr_code: string
  cs_name: string
  usr_name: string
  ind_industry: string
  csad_gst_no: string
  csad_address: string
  csad_pincode: string
  csad_state: string
  constructor(cs_cust_supplr_code: string, cs_name: string, usr_name: string, ind_industry: string, csad_gst_no: string, csad_address: string, csad_pincode: string, csad_state: string) {
    this.cs_cust_supplr_code = cs_cust_supplr_code
    this.cs_name = cs_name
    this.usr_name = usr_name
    this.ind_industry = ind_industry
    this.csad_gst_no = csad_gst_no
    this.csad_address = csad_address
    this.csad_pincode = csad_pincode
    this.csad_state = csad_state
  }
}

export class cmpModel {
  sc_name: string
  sc_company_code: string
  sc_company_short_name: string
  show:boolean
  constructor(sc_name: string, sc_company_code: string, sc_company_short_name: string,show:boolean) {
    this.sc_name = sc_name
    this.sc_company_code = sc_company_code
    this.sc_company_short_name = sc_company_short_name
    this.show = show
  }
}





