export class StockQueryReportFilterModel {
  cmbItemCode?: string
  cmbUserList?: string
  cmbMake?: string
  cmbState?: string
  cmbBranch?: string
  cmbGodown?: string
  rdbUserType?: string
  txtQty?: string
  hiddenParentItem?: string
  constructor() { }
}

export class StockQueryExpectedStockTableModel {
  stm_item_code: string
  stm_make: string
  ho_po_stock_branch: string
  ho_po_stock_date: string
  oth_po_stock_branch: string
  oth_po_stock_date: string
  constructor(
    stm_item_code: string,
    stm_make: string,
    ho_po_stock_branch: string,
    ho_po_stock_date: string,
    oth_po_stock_branch: string,
    oth_po_stock_date: string
  ) {
    this.stm_item_code = stm_item_code
    this.stm_make = stm_make
    this.ho_po_stock_branch = ho_po_stock_branch
    this.ho_po_stock_date = ho_po_stock_date
    this.oth_po_stock_branch = oth_po_stock_branch
    this.oth_po_stock_date = oth_po_stock_date
  }
}

export class StockQueryCatalogRefNoTableModel {
  mk_short_name: string
  itm_catalog_ref_no: string
  constructor(
    mk_short_name: string,
    itm_catalog_ref_no: string,
  ) {
    this.mk_short_name = mk_short_name
    this.itm_catalog_ref_no = itm_catalog_ref_no
  }
}

export class StockQueryStockLevelTableModel {
  gd_short_name: string
  make_code: string
  stlvl: string
  gd_godown_name:string
  constructor(
    gd_short_name: string,
    make_code: string,
    stlvl: string,
    gd_godown_name:string

  ) {
    this.gd_short_name = gd_short_name
    this.make_code = make_code
    this.stlvl = stlvl
    this.gd_godown_name=  gd_godown_name
  }
}

export class StockQueryDealersStockTableModel {
  ds_code: string
  ds_name: string
  ds_tel_no: string
  ds_catalog_ref_no: string
  ds_stock_as_on_date: string
  br_city: string
  ds_drum_no: string
  ds_qty: string
  ds_uom: string
  constructor(
    ds_code: string,
    ds_name: string,
    ds_tel_no: string,
    ds_catalog_ref_no: string,
    ds_stock_as_on_date: string,
    br_city: string,
    ds_drum_no: string,
    ds_qty: string,
    ds_uom: string
  ) {
    this.ds_code = ds_code
    this.ds_name = ds_name
    this.ds_tel_no = ds_tel_no
    this.ds_catalog_ref_no = ds_catalog_ref_no
    this.ds_stock_as_on_date = ds_stock_as_on_date
    this.br_city = br_city
    this.ds_drum_no = ds_drum_no
    this.ds_qty = ds_qty
    this.ds_uom = ds_uom
  }
}

export class StockQueryItemDetailsTableModel {
  it_item_code: string
  it_prod_code: string
  it_tariff_code: string
  it_old_item_code: string
  min_saleable_length: string

  constructor(
    it_item_code: string,
    it_prod_code: string,
    it_tariff_code: string,
    it_old_item_code: string,
    min_saleable_length: string
  ) {
    this.it_item_code = it_item_code
    this.it_prod_code = it_prod_code
    this.it_tariff_code = it_tariff_code
    this.it_old_item_code = it_old_item_code
    this.min_saleable_length = min_saleable_length
  }
}

export class StockQueryNextAndPreviousItemTableModel {
  it_item_code: string
  constructor(
    it_item_code: string
  ) {
    this.it_item_code = it_item_code
  }
}

export class StockQueryNextAndPreviousShadowItemTableModel {
  it_item_code: string
  constructor(
    it_item_code: string
  ) {
    this.it_item_code = it_item_code
  }
}

export class StockQueryShadowItemListTableModel {
  sim_shadow_item_code: string
  constructor(
    sim_shadow_item_code: string
  ) {
    this.sim_shadow_item_code = sim_shadow_item_code
  }
}

export class StockQueryPriceListTableModel {
  itm_list_price: string
  cmk_code: string
  itmsale: string
  um_short_desc: string
  constructor(
    itm_list_price: string,
    cmk_code: string,
    itmsale: string,
    um_short_desc: string
  ) {
    this.itm_list_price = itm_list_price
    this.cmk_code = cmk_code
    this.itmsale = itmsale
    this.um_short_desc = um_short_desc
  }
}

export interface StockQueryReportTableData {
  gd_city: string
  gd_short_name: string
  stm_card_no: string
  sr_date: string
  stm_drum_no: string
  stm_item_code: string
  statusflg: string
  stm_phy_loc: string
  mk_short_name: string
  stm_rsv_qty: string
  stm_damage_qty: string
  um_short_desc: string
  stm_balance_qty: string
  stm_total_conv: string
  stm_issued_qty: string
  stm_discrepancy_qty: string
  stm_opening_qty: string

}

export class StockQueryReportTableModel {
  sr: string
  gd_city: string
  gd_short_name: string
  stm_card_no: string
  sr_date: string
  stm_drum_no: string
  stm_item_code: string
  statusflg: string
  stm_phy_loc: string
  mk_short_name: string
  stm_rsv_qty: string
  //stm_damage_qty : string
  um_short_desc: string
  stm_balance_qty: string
  stm_total_conv: string
  stm_issued_qty: string
  stm_discrepancy_qty: string
  stm_opening_qty: string
  sc_company_short_name: string
  stm_oldstock: string
  stm_card_type: string
  gd_godown_code: string
  gd_godown_name: string
  //stm_approved : string 
  simflag: string
  stm_company_code:string
  constructor(
    sr: string,
    gd_city: string,
    gd_short_name: string,
    stm_card_no: string,
    sr_date: string,
    stm_drum_no: string,
    stm_item_code: string,
    statusflg: string,
    stm_phy_loc: string,
    mk_short_name: string,
    stm_rsv_qty: string,
    //stm_damage_qty : string,
    um_short_desc: string,
    stm_balance_qty: string,
    stm_total_conv: string,
    stm_issued_qty: string,
    stm_discrepancy_qty: string,
    stm_opening_qty: string,
    sc_company_short_name: string,
    stm_oldstock: string,  //for six month  old cards #ccccff or 
    stm_card_type: string, //for transit card 
    gd_godown_code: string,
    gd_godown_name: string,
    //stm_approved : string 
    simflag: string,
    stm_company_code?:string
  ) {
    this.sr = sr
    this.gd_city = gd_city
    this.gd_short_name = gd_short_name
    this.stm_card_no = stm_card_no
    this.sr_date = sr_date
    this.stm_drum_no = stm_drum_no
    this.stm_item_code = stm_item_code
    this.statusflg = statusflg
    this.stm_phy_loc = stm_phy_loc
    this.mk_short_name = mk_short_name
    this.stm_rsv_qty = stm_rsv_qty
    //this.stm_damage_qty =stm_damage_qty
    this.um_short_desc = um_short_desc
    this.stm_balance_qty = stm_balance_qty
    this.stm_total_conv = stm_total_conv
    this.stm_issued_qty = stm_issued_qty
    this.stm_opening_qty = stm_opening_qty
    this.stm_discrepancy_qty = stm_discrepancy_qty
    this.sc_company_short_name = sc_company_short_name
    this.stm_oldstock = stm_oldstock
    this.stm_card_type = stm_card_type
    this.gd_godown_code = gd_godown_code
    this.gd_godown_name = gd_godown_name
    //this.stm_approved = stm_approved 
    this.simflag = simflag
    this.stm_company_code = stm_company_code ?? ''
  }
}
export class StockGroupWiseFilterModel {
  cmbMainGroup?: string
  cmbSubGroup?: string
  cmbUserList?: string
  cmbMake?: string
  cmbState?: string
  cmbBranch?: string
  cmbGodown?: string
  rdbUserType?: string
  txtQty?: string
  hiddenParentItem?: string
  txtCategory?:string
  constructor() { }
}
export class StockGroupWiseReportTableModel {
  main_grp_code:string
subgrp_code:string
maingroup:string
subgroup:string
it_item_code:string
it_prod_code:string
itm_make_code:string
itm_catalog_ref_no:string
  constructor(
      main_grp_code:string,
      subgrp_code:string,
      maingroup:string,
      subgroup:string,
      it_item_code:string,
      it_prod_code:string,
      itm_make_code:string,
      itm_catalog_ref_no:string
  ) {
    this.main_grp_code = main_grp_code
    this.subgrp_code = subgrp_code
    this.maingroup = maingroup
    this.subgroup = subgroup
    this.it_item_code = it_item_code
    this.it_prod_code = it_prod_code
    this.itm_make_code = itm_make_code
    this.itm_catalog_ref_no = itm_catalog_ref_no
 
  }
}
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

/* export class UpdateDynamicColumnsModel {
  columnId: string
  tableColumnName: string
  displayColumnName: string
  enabled: string
  type: string
  fromPage: string

  constructor(
    columnId: string,
    tableColumnName: string,
    displayColumnName: string,
    enabled: string,
    type: string,
    fromPage: string
  ) {
    this.columnId = columnId
    this.tableColumnName = tableColumnName
    this.displayColumnName = displayColumnName
    this.enabled = enabled
    this.type = type
    this.fromPage = fromPage
  }
}
 */

export class UpdateDynamicColumnsModel {
  columnId: string
  tableColumnName: string
  displayColumnName: string
  enabled: boolean
  type: string
  fromPage: string
  routerLink?: boolean
  fixedColumn?: string
  disableSort?: boolean
  filterConditionColName?: string

  constructor({
    columnId,
    tableColumnName,
    displayColumnName,
    enabled,
    type,
    fromPage,
    routerLink,
    fixedColumn,
    disableSort,
    filterConditionColName,
  }: {
    columnId: string
    tableColumnName: string
    displayColumnName: string
    enabled: boolean
    type: string
    fromPage: string
    routerLink?: boolean
    fixedColumn?: string
    disableSort?: boolean
    filterConditionColName?: string
  }) {
    this.columnId = columnId
    this.tableColumnName = tableColumnName
    this.displayColumnName = displayColumnName
    this.enabled = enabled
    this.type = type
    this.fromPage = fromPage
    this.routerLink = routerLink
    this.fixedColumn = fixedColumn
    this.disableSort = disableSort
    this.filterConditionColName = filterConditionColName
  }
}
