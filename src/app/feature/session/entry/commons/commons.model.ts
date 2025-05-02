export class Commons { }

export interface ChallanTableData {
  ch_challan_draft_no: string
  challandate: string
  ch_source_type: string
  ch_inv_type_code: string
  billto: string
  ch_cust_code: string
  dispto: string
  ch_disp_to_code: string
  ch_tax_type: string
  ch_gross_amt: string
}

export class ChallanTableModel {
  ch_challan_draft_no: string
  ch_challan_draft_date: string
  ch_source_type: string
  ch_inv_type_code: string
  billTo: string
  ch_cust_code: string
  dispatchTo: string
  ch_disp_to_code: string
  ch_tax_type: string
  ch_gross_amt: string

  constructor(
    ch_challan_no: string,
    ch_challan_draft_date: string,
    ch_source_type: string,
    ch_inv_type_code: string,
    billTo: string,
    ch_cust_code: string,
    dispatchTo: string,
    ch_disp_to_code: string,
    ch_tax_type: string,
    ch_gross_amt: string
  ) {
    this.ch_challan_draft_no = ch_challan_no
    this.ch_challan_draft_date = ch_challan_draft_date
    this.ch_source_type = ch_source_type
    this.ch_inv_type_code = ch_inv_type_code
    this.billTo = billTo
    this.ch_cust_code = ch_cust_code
    this.dispatchTo = dispatchTo
    this.ch_disp_to_code = ch_disp_to_code
    this.ch_tax_type = ch_tax_type
    this.ch_gross_amt = ch_gross_amt
  }
}

export class ChallanFilterModel {
  ch_branch_code: string
  ch_siscon_code: string
  ch_created_by: string
  constructor() { }
}

// export class DynamicColumnsModel {
//   column_name: string
//   // column_code: string
//   userId: string
//   fromPage: number
//   enabled: boolean
//   column_id: string
//   constructor(
//     column_name: string
//     // column_code: string
//     userId: string
//     fromPage: number
//     enabled: boolean
//     column_id: string
//   ) {
//     this.column_name = column_name
//     // this.column_code = column_code
//     this.userId = userId
//     this.fromPage = fromPage
//     this.enabled = enabled
//     this.column_id = column_id
//   }
// }

export class DynamicColumnsModel {
  column_name: string
  column_code: string
  enabled: boolean
  column_id: string
  type: string
  constructor(
    column_name: string,
    column_code: string,
    enabled: boolean,
    column_id: string,
    type: string
  ) {
    this.column_name = column_name
    this.column_code = column_code
    this.enabled = enabled
    this.column_id = column_id
    this.type = type
  }
}
export class DocCalcModel {

  DCCOMPONENTAMT: string
  DC_COMPONENT_PERC: string
  DC_PERC_AMT_FLG: string
  DC_COMPONENT_CODE: string
  CHSCHARGEDESC: string
  CHS_CHARGE_SUBCODE: string
  ccdesc: string

  constructor(
    DCCOMPONENTAMT: string,
    DC_COMPONENT_PERC: string,
    DC_PERC_AMT_FLG: string,
    DC_COMPONENT_CODE: string,
    CHSCHARGEDESC: string,
    CHS_CHARGE_SUBCODE: string,
    ccdesc: string) {

    DCCOMPONENTAMT = this.DCCOMPONENTAMT
    DC_COMPONENT_PERC = this.DC_COMPONENT_PERC
    DC_PERC_AMT_FLG = this.DC_PERC_AMT_FLG
    DC_COMPONENT_CODE = this.DC_COMPONENT_CODE
    CHSCHARGEDESC = this.CHSCHARGEDESC
    CHS_CHARGE_SUBCODE = this.CHS_CHARGE_SUBCODE
    ccdesc = this.ccdesc

  }

}

export class UpdateDynamicColumnsModel {
  columnId: string
  tableColumnName: string
  displayColumnName: string
  enabled: string
  userId: string
  fromPage: number

  constructor(
    columnId: string,
    tableColumnName: string,
    displayColumnName: string,
    enabled: string,
    userId: string,
    fromPage: number
  ) {
    this.columnId = columnId
    this.tableColumnName = tableColumnName
    this.displayColumnName = displayColumnName
    this.enabled = enabled
    this.userId = userId
    this.fromPage = fromPage
  }
}

export class PartyModel {
  cs_code: string
  cs_name: string
  cust_flg?: string
  constructor(cs_code: string, cs_name: string, cust_flg?: string) {
    this.cs_code = cs_code
    this.cs_name = cs_name
    this.cust_flg = cust_flg
  }
}

export class VariationModel {
  vr_code: string
  vr_desc: string

  constructor(vr_code: string, vr_desc: string) {
    this.vr_code = vr_code
    this.vr_desc = vr_desc
  }
}

export class SchemeModel {
  sc_code: string
  sc_desc: string

  constructor(sc_code: string, sc_desc: string) {
    this.sc_code = sc_code
    this.sc_desc = sc_desc
  }
}

export class MakeModel {
  [x: string]: any
  make_code: string
  make_name: string
  make_desc: string
  constructor(make_code: string, make_name: string, make_desc: string) {
    this.make_code = make_code
    this.make_name = make_name
    this.make_desc = make_desc
  }
}

export class PartyModel1 {
  cs_code: string
  cs_name: string

  constructor(cs_code: string, cs_name: string) {
    this.cs_code = cs_code
    this.cs_name = cs_name
  }
}

export class AoDetailModel {

  aod_serial_no: string
  aod_item_code: string
  aod_make: string
  um_short_desc: string
  aod_qty: string
  itm_list_price: string
  aod_rate: string

  constructor(
    aod_serial_no: any,
    aod_item_code : any,
    aod_make : any,
    um_short_desc : any,
    aod_qty : any,
    itm_list_price : any,
    aod_rate : any) {
    this.aod_serial_no = aod_serial_no
    this.aod_item_code = aod_item_code
    this.aod_make = aod_make
    this.um_short_desc = um_short_desc
    this.aod_qty = aod_qty
    this.itm_list_price = itm_list_price
    this.aod_rate = aod_rate
  }

}
export class GodownModel {
  gd_godown_code: string
  gd_name: string
  gd_address: any
  gstno: any
  gd_pts_flg: any
  constructor(gd_godown_code: string, gd_name: string, gd_address?: string, gstno?: string,gd_pts_flg?:string) {
    this.gd_godown_code = gd_godown_code
    this.gd_name = gd_name
    this.gd_address = gd_address
    this.gstno = gstno
    this.gd_pts_flg= gd_pts_flg
  }
}

export class AoModel {
  ao_no: string


  constructor(ao_no: string) {
    this.ao_no = ao_no
  }
}
export class SpecialTaxModel {
  spt_tax_code: string
  //cs_name: string

  constructor(spt_tax_code: string) {
    this.spt_tax_code = spt_tax_code
    //this.cs_name = cs_name
  }
}

export class BrokerModel {
  brk_broker_code: string
  brk_broker_name: string

  constructor(brk_broker_code: string,
    brk_broker_name: string) {
    this.brk_broker_code = brk_broker_code
    this.brk_broker_name = brk_broker_name
  }
}

export class ItemCalcModel {
  scheme_id: string

  scheme_desc: string

  constructor(scheme_id: string, scheme_desc: string) {
    this.scheme_id = scheme_id

    this.scheme_desc = scheme_desc
  }
}

export class UomModelWithCnv {
  uom_code: string
  uom_desc: string
  cnv_conversion_factor: string
  constructor(uom_code: string, uom_desc: string, cnv_conversion_factor: string) {
    this.uom_code = uom_code
    this.uom_desc = uom_desc
    this.cnv_conversion_factor = cnv_conversion_factor
  }
}

export class UomModel {
  uom_code: string
  uom_desc: string
  constructor(uom_code: string, uom_desc: string) {
    this.uom_code = uom_code
    this.uom_desc = uom_desc
  }
}

export class ItemModel {
  item_code: string
  item_name: string
  catrefno: string
  item_make: string
  constructor(item_code: string, item_name: string, catrefno: string, item_make: string) {
    this.item_code = item_code
    this.item_name = item_name
    this.catrefno = catrefno
    this.item_make = item_make
  }
}

export class ConsignerModel {
  cons_code: string
  cons_desc: string
  constructor(cons_code: string,
    cons_desc: string) {
    this.cons_code = cons_code
    this.cons_desc = cons_desc
  }
}

export class TransporterModel {

  tr_code: string
  tr_name: string
  constructor(tr_code: string,
    tr_name: string) {
    this.tr_code = tr_code,
      this.tr_name = tr_name
  }

}

export class BookingInstrModel {
  bi_code: string
  instr: string
  constructor(bi_code: string,
    instr: string) {
    this.bi_code = bi_code
    this.instr = instr
  }
}

export class CurrencyModel {
  curr_currency_code: string
  curr_currency_desc: string
  constructor(curr_currency_code: string,
    curr_currency_desc: string) {
    this.curr_currency_code = curr_currency_code
    this.curr_currency_desc = curr_currency_desc
  }
}

export class DocDeliveryModel {
  dlm_delivery_code: string
  dlm_desc: string
  constructor(dlm_delivery_code: string,
    dlm_desc: string) {
    this.dlm_delivery_code = dlm_delivery_code
    this.dlm_desc = dlm_desc
  }
}


export class DocAddressModel {
  csad_addr_code: string
  csad_address: string
  csad_city:string | any
  constructor(csad_addr_code: string,
    csad_address: string,csad_city?:string) {
    this.csad_addr_code = csad_addr_code
    this.csad_address = csad_address
    this.csad_city = csad_city
  }
}


export class ItemModelwithLP {
  item_code: string
  item_name: string
  catrefno: string
  item_make: string
  item_price: string
  mmx_uom: string | any
  cit_auto_cutting_flg: string | any
  it_tariff_code: string | any
  item_image?: string
  cit_phased_out?:string
  
  constructor(item_code: string, item_name: string, catrefno: string, item_make: string, item_price: string,
    mmx_uom?: string, cit_auto_cutting_flg?: string, it_tariff_code?: string,item_image?: string,cit_phased_out?:string, ) {
    this.item_code = item_code
    this.item_name = item_name
    this.catrefno = catrefno
    this.item_make = item_make
    this.item_price = item_price
    this.mmx_uom = mmx_uom
    this.cit_auto_cutting_flg = cit_auto_cutting_flg
    this.it_tariff_code = it_tariff_code
    this.item_image = item_image
    this.cit_phased_out = cit_phased_out
  }
}

export class ItemCatRefModel {
  item_code: string
  item_name: string
  itm_catalog_ref_no: string
  constructor(item_code: string, item_name: string, itm_catalog_ref_no: string) {
    this.item_code = item_code
    this.item_name = item_name
    this.itm_catalog_ref_no = itm_catalog_ref_no
  }
}

export class ItemMakeModel {
  uom_code: string
  uom_desc: string
  item_code: string
  item_name: string
  item_lp: string
  make_code: string

  constructor(item_code: string, item_name: string, make_code: string,
    uom_code: string, item_lp: string) {
    this.item_code = item_code
    this.item_name = item_name
    this.item_lp = item_lp
    this.uom_code = uom_code
    this.make_code = make_code
  }
}


export class DocHeaderModel {
  PO_DRAFT_NO: string
  PO_ACCT_CODE: string
  /* POD_CALC_FLG: string
  POD_LP: string
  POD_ORIG_LP: string
  IT_PROD_CODE: string
  POD_MAKE: string
  POD_ITEMSCH_ID: string
  POITEMSCHID: string */

  constructor
    (
      PO_DRAFT_NO: string,
      PO_ACCT_CODE: string
      /*  POD_CALC_FLG: string,
       POD_LP: string,
       POD_ORIG_LP: string,
       IT_PROD_CODE: string,
       POD_MAKE: string,
       POD_ITEMSCH_ID: string,
       POITEMSCHID: string, */
    ) {


    this.PO_DRAFT_NO = PO_DRAFT_NO
    this.PO_ACCT_CODE = PO_ACCT_CODE
    /* this.POD_CALC_FLG     =POD_CALC_FLG                     
    this.POD_LP   =POD_LP                                   
    this.POD_ORIG_LP =POD_ORIG_LP                           
    this.IT_PROD_CODE =IT_PROD_CODE                         
    this.POD_MAKE           =POD_MAKE                       
    this.POD_ITEMSCH_ID     =POD_ITEMSCH_ID                 
    this.POITEMSCHID      =POITEMSCHID   
     */
  }
}


export class PoDetailModel {
  POD_ITEM_CODE: string
  PO_ACCT_CODE: string
  POD_CALC_FLG: string
  POD_LP: string
  POD_ORIG_LP: string
  IT_PROD_CODE: string
  POD_MAKE: string
  POD_ITEMSCH_ID: string
  POITEMSCHID: string
  MK_DESC: string
  POD_UOM: string
  UM_SHORT_DESC: string
  POD_RATE: string
  POD_AMOUNT: string
  POD_QTY: string
  POCALRATEDESC: string
  PO_TAX_TYPE_CODE: string
  POD_TS_COMMTD: string
  POD_AGREED_RATE: string
  POD_AGREED_PERC: string
  POD_PARTY_ITEM_CODE: string
  POD_ITEM_NOTE: string
  POD_ITEM_REMARK: string
  POD_VARIATION_CODE: string
  POD_VARIATION_LEN: string
  POD_ONE_LOT_DELIVERY_FLG: string
  POD_DUE_DATE: string


  constructor
    (
      POD_ITEM_CODE: string,
      PO_ACCT_CODE: string,
      POD_CALC_FLG: string,
      POD_LP: string,
      POD_ORIG_LP: string,
      IT_PROD_CODE: string,
      POD_MAKE: string,
      POD_ITEMSCH_ID: string,
      POITEMSCHID: string,
      MK_DESC: string,
      POD_UOM: string,
      UM_SHORT_DESC: string,
      POD_RATE: string,
      POD_AMOUNT: string,
      POD_QTY: string,
      POCALRATEDESC: string,
      PO_TAX_TYPE_CODE: string,
      POD_TS_COMMTD: string,
      POD_AGREED_RATE: string,
      POD_AGREED_PERC: string,
      POD_PARTY_ITEM_CODE: string,
      POD_ITEM_NOTE: string,
      POD_ITEM_REMARK: string,
      POD_VARIATION_CODE: string,
      POD_VARIATION_LEN: string,
      POD_ONE_LOT_DELIVERY_FLG: string, POD_DUE_DATE: string
    ) {


    this.POD_ITEM_CODE = POD_ITEM_CODE
    this.PO_ACCT_CODE = PO_ACCT_CODE
    this.POD_CALC_FLG = POD_CALC_FLG
    this.POD_LP = POD_LP
    this.POD_ORIG_LP = POD_ORIG_LP
    this.IT_PROD_CODE = IT_PROD_CODE
    this.POD_MAKE = POD_MAKE
    this.POD_ITEMSCH_ID = POD_ITEMSCH_ID
    this.POITEMSCHID = POITEMSCHID
    this.MK_DESC = MK_DESC
    this.POD_UOM = POD_UOM
    this.UM_SHORT_DESC = UM_SHORT_DESC
    this.POD_RATE = POD_RATE
    this.POD_AMOUNT = POD_AMOUNT
    this.POD_QTY = POD_QTY
    this.POCALRATEDESC = POCALRATEDESC
    this.PO_TAX_TYPE_CODE = PO_TAX_TYPE_CODE
    this.POD_TS_COMMTD = POD_TS_COMMTD
    this.POD_AGREED_RATE = POD_AGREED_RATE
    this.POD_AGREED_PERC = POD_AGREED_PERC
    this.POD_PARTY_ITEM_CODE = POD_PARTY_ITEM_CODE
    this.POD_ITEM_NOTE = POD_ITEM_NOTE
    this.POD_ITEM_REMARK = POD_ITEM_REMARK
    this.POD_VARIATION_CODE = POD_VARIATION_CODE
    this.POD_VARIATION_LEN = POD_VARIATION_LEN
    this.POD_ONE_LOT_DELIVERY_FLG = POD_ONE_LOT_DELIVERY_FLG
    this.POD_DUE_DATE = POD_DUE_DATE

  }
}


export class ItemEntryModel {
  draftNo: string
  itemCode: string
  makeCode: string
  itemUom: string
  inputRate: string
  itemLp: string
  itemCalc: string
  itemQty: string
  itemDueDate: string
  itemOneLot: string
  itemAgrredRate: string
  itemAgrredPerc: string
  itemVarCode: string
  itemVarLength: string


  constructor(
    draftNo: string,
    itemCode: string,
    makeCode: string,
    itemUom: string,
    inputRate: string,
    itemLp: string,
    itemCalc: string,
    itemQty: string,
    itemDueDate: string,
    itemOneLot: string,
    itemAgrredRate: string,
    itemAgrredPerc: string,
    itemVarCode: string,
    itemVarLength: string) {
    this.draftNo = draftNo
    this.itemCode = itemCode
    this.makeCode = makeCode
    this.itemUom = itemUom
    this.inputRate = inputRate
    this.itemLp = itemLp
    this.itemCalc = itemCalc
    this.itemQty = itemQty
    this.itemDueDate = itemDueDate
    this.itemOneLot = itemOneLot
    this.itemAgrredRate = itemAgrredRate
    this.itemAgrredPerc = itemAgrredPerc
    this.itemVarCode = itemVarCode
    this.itemVarLength = itemVarLength
  }

}

export class PartyAddrModel {
  party_code: string
  party_name: string
  party_gstNo: string
  party_state: string
  party_addr1: string
  party_addr2: string
  party_addr3: string
  party_addr4: string
  party_stateName: string
  partyAddrCode: string





  constructor(party_code: string,
    party_name: string,
    party_addr1: string,
    party_addr2: string,
    party_addr3: string,
    party_addr4: string,
    party_state: string,
    party_stateName: string,
    party_gstNo: string,
    partyAddrCode: string
  ) {
    this.party_addr1 = party_addr1;
    this.party_addr2 = party_addr2;
    this.party_addr3 = party_addr3
    this.party_addr4 = party_addr4;
    this.party_state = party_state;
    this.party_name = party_name;
    this.party_stateName = party_stateName;
    this.party_code = party_code;
    this.party_gstNo = party_gstNo;
    this.partyAddrCode = partyAddrCode
  }

}



export class LookupModel {
  lkt_group: string;
  lkt_sub_group: string;
  lkt_code: string;
  lkt_desc: string;
  lkt_src_flg: string;
  lkt_por_to_print: string;
  constructor(lkt_group: string,
    lkt_sub_group: string,
    lkt_code: string,
    lkt_desc: string,
    lkt_src_flg: string,
    lkt_por_to_print: string) {
    this.lkt_group = lkt_group;
    this.lkt_sub_group = lkt_sub_group;
    this.lkt_code = lkt_code;
    this.lkt_desc = lkt_desc;
    this.lkt_src_flg = lkt_src_flg;
    this.lkt_por_to_print = lkt_por_to_print;

  }
}

export class DeliveryTermsModel {
  cdl_challan_del_code: string
  cdl_desc: string
  cdl_blocked_flg?: string;
  cdl_customer_to_collect:string | undefined
  constructor(cdl_challan_del_code: string, cdl_desc: string,
     cdl_blocked_flg?: string,cdl_customer_to_collect?:string) {
    this.cdl_challan_del_code = cdl_challan_del_code
    this.cdl_desc = cdl_desc
    this.cdl_blocked_flg = cdl_blocked_flg
    this.cdl_customer_to_collect = cdl_customer_to_collect
  }
}
export class SourcingModel {
  src_sourcing_code: string
  src_desc: string
  src_deleted_flg: string
  src_po_flg: string
  src_from_flg: string
  constructor(
    src_sourcing_code: string,
    src_desc: string,
    src_deleted_flg: string,
    src_po_flg: string,
    src_from_flg: string
  ) {
    this.src_sourcing_code = src_sourcing_code
    this.src_desc = src_desc
    this.src_deleted_flg = src_deleted_flg
    this.src_po_flg = src_po_flg
    this.src_from_flg = src_from_flg
  }
}


export class SpecialTaxListModel {
  spt_tax_code: string
  spt_tax_flg: string
  spt_desc: string
  igst_code: string
  src_from_flg: string
  constructor(
    spt_tax_code: string,
    spt_tax_flg: string,
    spt_desc: string,
    igst_code: string,
  ) {
    this.spt_tax_code = spt_tax_code
    this.spt_tax_flg = spt_tax_flg
    this.spt_desc = spt_desc
    this.igst_code = igst_code
  }
}

export class CityModel {
  ct_code: string
  ct_city: string

  constructor(ct_code: string, ct_city: string) {
    this.ct_code = ct_code,
      this.ct_city = ct_city
  }
}

export class HandledByModel {
  usr_userid: string
  usr_name: string
  usr_acc_code: string

  constructor(usr_userid: string, usr_name: string, usr_acc_code: string) {
    this.usr_userid = usr_userid
    this.usr_name = usr_name
    this.usr_acc_code = usr_acc_code
  }
}
export class AccountModel {
  acc_code: string;
  acc_name: string;
  acc_pl_flg: string;
  acc_receivepay_flg: string;
  cs_cust_supplr_flg: string;
  pbd_bank_branch_code?: string;
  pbd_bank_code?: string;
  bnk_name?: string;
  pbd_bank_branch?: string
  cs_pay_terms_day?: string
  cs_pan_no?:string
  constructor(
    acc_code: string, acc_name: string, acc_pl_flg: string, acc_receivepay_flg: string, cs_cust_supplr_flg: string, pbd_bank_branch_code?: string,
     pbd_bank_code?: string, bnk_name?: string, pbd_bank_branch?: string, cs_pay_terms_day?: string,cs_pan_no?:string) {
    this.acc_code = acc_code
    this.acc_name = acc_name
    this.acc_pl_flg = acc_pl_flg
    this.acc_receivepay_flg = acc_receivepay_flg
    this.cs_cust_supplr_flg = cs_cust_supplr_flg
    this.pbd_bank_branch_code = pbd_bank_branch_code
    this.pbd_bank_code = pbd_bank_code
    this.bnk_name = bnk_name
    this.pbd_bank_branch = pbd_bank_branch
    this.cs_pay_terms_day = cs_pay_terms_day
    this.cs_pan_no=cs_pan_no
  }
}

export class AccountModelCN {
  acc_code: string;
  acc_name: string;
  constructor(
    acc_code: string, acc_name: string) {
    this.acc_code = acc_code
    this.acc_name = acc_name
  }
}

export class GroupLedgerModel {
  cs_grp_code: string;
  acc_name: string;
  acc_pl_flg: string;
  acc_receivepay_flg: string;
  cs_cust_supplr_flg: string;
  pbd_bank_branch_code?: string;
  pbd_bank_code?: string;
  bnk_name?: string;
  pbd_bank_branch?: string
  cs_pay_terms_day?: string

  constructor(
    cs_grp_code: string, acc_name: string, acc_pl_flg: string, acc_receivepay_flg: string, cs_cust_supplr_flg: string, pbd_bank_branch_code?: string, pbd_bank_code?: string, bnk_name?: string, pbd_bank_branch?: string, cs_pay_terms_day?: string) {
    this.cs_grp_code = cs_grp_code
    this.acc_name = acc_name
    this.acc_pl_flg = acc_pl_flg
    this.acc_receivepay_flg = acc_receivepay_flg
    this.cs_cust_supplr_flg = cs_cust_supplr_flg
    this.pbd_bank_branch_code = pbd_bank_branch_code
    this.pbd_bank_code = pbd_bank_code
    this.bnk_name = bnk_name
    this.pbd_bank_branch = pbd_bank_branch
    this.cs_pay_terms_day = cs_pay_terms_day
  }
}


export class addConsignorMasterModel {
  txtConsignorCode: string;
  txtConsignorName: string;
  cmbSiscon: string;
}

export class CityMasterModel {
  br_city: string;
  br_siscon_code: string;
  br_state: string
  state_code: string
  br_branch_code: string
  constructor(
    br_city: string,
    br_siscon_code: string,
    br_state: string,
    state_code: string,
    br_branch_code: string
  ) {
    this.br_city = br_city
    this.br_siscon_code = br_siscon_code
    this.br_state = br_state
    this.state_code = state_code
    this.br_branch_code = br_branch_code
  }
}

export class ExciseTariffModel {
  ex_tariff_code: string;
  ex_tariff_name: string;
  constructor(
    ex_tariff_code: string, ex_tariff_name: string) {
    this.ex_tariff_code = ex_tariff_code
    this.ex_tariff_name = ex_tariff_name

  }
}

export class CustomerAddressModel {
  csad_address: string;
  csad_city: string;
  csad_addr_code: string;
  csad_gst_no:string | any
  constructor(
    csad_address: string, csad_city: string, csad_addr_code: string,csad_gst_no?:string) {
    this.csad_address = csad_address
    this.csad_city = csad_city
    this.csad_addr_code = csad_addr_code
    this.csad_gst_no = csad_gst_no
  }
}


export class PayMentModel {
  pt_code: string;
  pt_desc: string;

  constructor(
    pt_code: string, pt_desc: string) {
    this.pt_code = pt_code
    this.pt_desc = pt_desc
  }
}

export class HSNTaxListModel {
  ex_acc_code: string;
  acc_name: string;
  ex_tariff_code: string;
  ex_tariff_name: string;
  hts_gst_code: string;
  hts_gst_perc: string;
  ex_description: string
  constructor(
    ex_acc_code: string, acc_name: string, ex_tariff_code: string, ex_tariff_name: string, hts_gst_code: string, hts_gst_perc: string, ex_description: string) {
    this.ex_acc_code = ex_acc_code
    this.acc_name = acc_name
    this.ex_tariff_code = ex_tariff_code
    this.ex_tariff_name = ex_tariff_name
    this.hts_gst_code = hts_gst_code
    this.hts_gst_perc = hts_gst_perc
    this.ex_description = ex_description
  }
}


export class SisconBankModel {
  sbnk_acc_code: string;
  sbnk_bbranch_name: string;
  sbnk_code: string;
  sbnk_name: string;
  sbnk_bbranch_code?: string

  constructor(
    sbnk_acc_code: string, sbnk_bbranch_name: string, sbnk_code: string, sbnk_name: string, sbnk_bbranch_code?: string) {
    this.sbnk_acc_code = sbnk_acc_code
    this.sbnk_bbranch_name = sbnk_bbranch_name
    this.sbnk_code = sbnk_code
    this.sbnk_name = sbnk_name
    this.sbnk_bbranch_code = sbnk_bbranch_code

  }
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

export class AccRecoViewModel {
  lg_voucher_no: string;
  lg_voucher_date: string;
  lg_narration: string;
  lg_siscon_code: string;
  lg_branch_code: string;
  lg_closure_voucher_no: string;
  constructor(
    lg_voucher_no: string, lg_voucher_date: string, lg_narration: string, lg_siscon_code: string, lg_branch_code: string, lg_closure_voucher_no: string) {
    this.lg_voucher_no = lg_voucher_no
    this.lg_voucher_date = lg_voucher_date
    this.lg_narration = lg_narration
    this.lg_siscon_code = lg_siscon_code
    this.lg_branch_code = lg_branch_code
    this.lg_closure_voucher_no = lg_closure_voucher_no
  }
}

export class CostCenterViewModel {
  br_city: string;
  ccm_branch_code: string;
  ccm_code: string;
  ccm_name: string;
  constructor(
    br_city: string, ccm_branch_code: string, ccm_code: string, ccm_name: string) {
    this.br_city = br_city
    this.ccm_branch_code = ccm_branch_code
    this.ccm_code = ccm_code
    this.ccm_name = ccm_name
  }
}

export class SubJVModel {
  vt_code: string;
  vt_name: string;
  vt_email_flg: string;
  constructor(
    vt_code: string, vt_name: string, vt_email_flg: string) {
    this.vt_code = vt_code
    this.vt_name = vt_name
    this.vt_email_flg = vt_email_flg
  }
}

export class ExpenseAccountModel {
  acc_code: string;
  acc_name: string;
  acc_pl_flg: string;
  acc_receivepay_flg: string;
  cs_cust_supplr_flg: string;
  pbd_bank_branch_code?: string;
  pbd_bank_code?: string;
  bnk_name?: string;
  pbd_bank_branch?: string

  constructor(
    acc_code: string, acc_name: string, acc_pl_flg: string, acc_receivepay_flg: string, cs_cust_supplr_flg: string, pbd_bank_branch_code?: string, pbd_bank_code?: string, bnk_name?: string, pbd_bank_branch?: string) {
    this.acc_code = acc_code
    this.acc_name = acc_name
    this.acc_pl_flg = acc_pl_flg
    this.acc_receivepay_flg = acc_receivepay_flg
    this.cs_cust_supplr_flg = cs_cust_supplr_flg
    this.pbd_bank_branch_code = pbd_bank_branch_code
    this.pbd_bank_code = pbd_bank_code
    this.bnk_name = bnk_name
    this.pbd_bank_branch = pbd_bank_branch
  }
}

export class RDBViewModel {
  bill_city: string;
  bill_type: string;
  bill_dt: string;
  bill_amt: string;
  rcvd_amt: string;
  rdb_perc: string;
  rdb_auth_flg: string;
  rdb_refvoucher_no: string | undefined
  ch_cond_disc_perc:string | undefined
  closing_vch_br_city:string | undefined
  rdb_closing_voucher_no:string | undefined
  closing_vch_type:string | undefined
  closing_vch_dt:string | undefined
  constructor(
    bill_city: string, bill_type: string, bill_dt: string, bill_amt: string, rcvd_amt: string, rdb_perc: string,
     rdb_auth_flg: string, rdb_refvoucher_no?: string,
     ch_cond_disc_perc?:string,closing_vch_br_city?:string,rdb_closing_voucher_no?:string,closing_vch_type?:string ,
     closing_vch_dt?:string) {
    this.bill_city = bill_city
    this.bill_type = bill_type
    this.bill_dt = bill_dt
    this.bill_amt = bill_amt
    this.rcvd_amt = rcvd_amt
    this.rdb_perc = rdb_perc
    this.rdb_auth_flg = rdb_auth_flg
    this.rdb_refvoucher_no = rdb_refvoucher_no
    this.ch_cond_disc_perc=ch_cond_disc_perc
    this.closing_vch_br_city=closing_vch_br_city
    this.rdb_closing_voucher_no=rdb_closing_voucher_no
    this.closing_vch_type=closing_vch_type
    this.closing_vch_dt=closing_vch_dt
  }
}

export class ChequeBounsModel {
  chqbr_code: string;
  chqbr_desc: string;
  constructor(
    chqbr_code: string, chqbr_desc: string) {
    this.chqbr_code = chqbr_code
    this.chqbr_desc = chqbr_desc
  }
}

export class ActionModel {
  ax_axn_code: string;
  ax_desc: string;
  ax_module_code: string;
  constructor(
    ax_axn_code: string, ax_desc: string, ax_module_code: string) {
    this.ax_axn_code = ax_axn_code
    this.ax_desc = ax_desc
    this.ax_module_code = ax_module_code
  }
}

export class ItemHsnNoModel {
  item_code: string
  item_name: string
  item_hsn_no: string
  constructor(item_code: string, item_name: string, item_hsn_no: string) {
    this.item_code = item_code
    this.item_name = item_name
    this.item_hsn_no = item_hsn_no
  }
}

export class UserListModel {
  user_userId: string
  user_userName: string
  constructor(user_userId: string, user_userName: string) {
    this.user_userId = user_userId
    this.user_userName = user_userName
  }
}

export class GroupHeadModel {
  usr_userid: string
  usr_name: string


  constructor(usr_userid: string, usr_name: string) {
    this.usr_userid = usr_userid
    this.usr_name = usr_name
  }


}

//added on 21-03-2020
export class ChallanTaxTypeModel {
  txs_tax_code: string
  constructor(txs_tax_code: string) {
    this.txs_tax_code = txs_tax_code
  }
}


export class DocumentModel {
  docno: string;
  fl_upld_flg: string;
  docname: string;
  file_name: string;
  constructor(
    docno: string, fl_upld_flg: string, docname: string, file_name: string) {
    this.docno = docno
    this.fl_upld_flg = fl_upld_flg
    this.docname = docname
    this.file_name = file_name
  }
}

export class AddressModel {
  csad_addr_code: string;
  csad_address: string;
  constructor(
    csad_addr_code: string, csad_address: string) {
    this.csad_addr_code = csad_addr_code
    this.csad_address = csad_address
  }
}

export class addDocNumberModel {
  txtDocNumber: string;
}


export class ServiceBillAccountModel {
  party: string;
  acc_code: string;
  acc_name: string;
  constructor(
    party: string, acc_code: string, acc_name: string) {
    this.party = party
    this.acc_code = acc_code
    this.acc_name = acc_name

  }
}


// export class AllUserListModel {
//   usr_branchnm: string;
//   usr_desgi: string;
//   usr_doj: string;
//   usr_email: string;
//   usr_ghid: string;
//   usr_ghname: string;
//   usr_id: string;
//   usr_mobile1: string
//   usr_mobile2: string;
//   usr_name: string;
//   usr_rhid: string;
//   usr_rhname: string;
//   usr_short_name: string

//   constructor(
//     usr_branchnm: string, usr_desgi: string, usr_doj: string,
//     usr_email: string, usr_ghid: string, usr_ghname: string, usr_id: string,
//     usr_mobile1: string, usr_mobile2: string, usr_name: string, usr_rhid: string,
//     usr_rhname: string, usr_short_name: string) {
//     this.usr_branchnm = usr_branchnm
//     this.usr_desgi = usr_desgi
//     this.usr_doj = usr_doj
//     this.usr_email = usr_email
//     this.usr_ghid = usr_ghid
//     this.usr_ghname = usr_ghname
//     this.usr_id = usr_id
//     this.usr_mobile1 = usr_mobile1
//     this.usr_mobile2 = usr_mobile2
//     this.usr_name = usr_name
//     this.usr_rhid = usr_rhid
//     this.usr_rhname = usr_rhname
//     this.usr_short_name = usr_short_name

//   }
// }