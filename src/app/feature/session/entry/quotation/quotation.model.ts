export class QuotationModel {

  total_count: number
  qt_quot_no: string
  qt_draft_no: string
  qt_draft_date: string
  qt_handled_by: string
  qt_cust_code: string
  qt_cust_name: string
  qt_disp_to_name: string
  qt_tax_type_code: string
  qt_gross_amt: string
  qt_disp_to_code: string
  qt_source_type: string
  qt_doc_type_code: string
  qt_inv_type_code: string
  qt_siscon_code?: string
  qt_branch_code?: string
  qt_project_code:string
  constructor(
    total_count: number,
    qt_quot_no: string,
    qt_draft_no: string,
    qt_draft_date: string,
    qt_handled_by: string,
    qt_cust_code: string,
    qt_cust_name: string,
    qt_disp_to_name: string,
    qt_tax_type_code: string,
    qt_gross_amt: string,
    qt_disp_to_code: string,
    qt_source_type: string,
    qt_doc_type_code: string,
    qt_inv_type_code: string,
    qt_siscon_code?: string,
    qt_branch_code?: string,
    qt_project_code?:string
  ) {
    this.total_count = total_count
    this.qt_quot_no = qt_quot_no
    this.qt_draft_no = qt_draft_no
    this.qt_draft_date = qt_draft_date
    this.qt_handled_by = qt_handled_by
    this.qt_cust_code = qt_cust_code
    this.qt_cust_name = qt_cust_name
    this.qt_disp_to_name = qt_disp_to_name
    this.qt_tax_type_code = qt_tax_type_code
    this.qt_gross_amt = qt_gross_amt
    this.qt_disp_to_code = qt_disp_to_code
    this.qt_source_type = qt_source_type
    this.qt_doc_type_code = qt_doc_type_code
    this.qt_inv_type_code = qt_inv_type_code
    this.qt_siscon_code = qt_siscon_code
    this.qt_branch_code = qt_branch_code
    this.qt_project_code = qt_project_code ?? ''
  }

}


export class AddedItemModel {
  qtd_executed_qty: string
  qtd_saleable_stock: string
  qtd_deleted_flg: string
  qtd_draft_no: string
  item_code: string
  serial_no: string
  cal_flg: string
  lp: string
  original_lp: string
  it_prod_code: string
  make: string
  mk_desc: string
  uom: string
  um_short_desc: string
  rate: string
  amt: string
  qty: string
  cat_refno: string
  calratedesc: string
  src_type: string
  chk_flag: string
  readonly?: boolean
  showEditIcon?: boolean
  addFLg?: boolean
  qtd_item_note?: string
  qtd_variation_code?: string
  qtd_variation_len?: string  
  delremarks:string
  prjd_layout_type:string
  prjd_serial:string
  constructor(
    qtd_executed_qty: string,
    qtd_saleable_stock: string,
    qtd_deleted_flg: string,
    qtd_draft_no: string,
    item_code: string,
    serial_no: string,
    cal_flg: string,
    lp: string,
    original_lp: string,
    it_prod_code: string,
    make: string,
    mk_desc: string,
    uom: string,
    um_short_desc: string,
    rate: string,
    amt: string,
    qty: string,
    cat_refno: string,
    calratedesc: string,
    src_type: string,
    chk_flag: string,
    readonly?: boolean,
    showEditIcon?: boolean,
    addFLg?: boolean,
    qtd_item_note?: string,
    qtd_variation_code?: string,
    qtd_variation_len?: string,
    delremarks?:string,
    prjd_layout_type?:string,
    prjd_serial?:string
  ) {

    this.qtd_executed_qty = qtd_executed_qty
    this.qtd_saleable_stock = qtd_saleable_stock
    this.qtd_deleted_flg = qtd_deleted_flg

    this.qtd_draft_no = qtd_draft_no
    this.item_code = item_code
    this.serial_no = serial_no
    this.cal_flg = cal_flg
    this.lp = lp
    this.original_lp = original_lp
    this.it_prod_code = it_prod_code
    this.make = make
    this.mk_desc = mk_desc
    this.uom = uom
    this.um_short_desc = um_short_desc
    this.rate = rate
    this.amt = amt
    this.qty = qty
    this.cat_refno = cat_refno
    this.calratedesc = calratedesc
    this.src_type = src_type
    this.chk_flag = chk_flag
    this.readonly = readonly
    this.showEditIcon = showEditIcon
    this.addFLg = addFLg
    this.qtd_item_note = qtd_item_note
    this.qtd_variation_code = qtd_variation_code
    this.qtd_variation_len = qtd_variation_len
    this.delremarks = delremarks ?? ''
    this.prjd_layout_type = prjd_layout_type ?? ''
    this.prjd_serial = prjd_serial ?? ''
  }
}


export class VariationModel {
  var_desc: string;
  var_code: string;
  var_percent: string;
  constructor(
    var_desc: string,
    var_code: string,
    var_percent: string
  ) {
    this.var_desc = var_desc
    this.var_code = var_code
    this.var_percent = var_percent
  }

}

export class QuotTypeModel {
  qty_code: string
  qty_type: string
  constructor(qty_code: string, qty_type: string) {
    this.qty_code = qty_code,
      this.qty_type = qty_type
  }
}


export class DocTermsModel {
  docterms: any
  /* doctermsname:string
  doctermsnamevalue:string */
}