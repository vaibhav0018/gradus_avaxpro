export class GodownModel {
  godown_code: string
  godown_name: string

  constructor(godown_code: string, godown_name: string) {
    this.godown_code = godown_code
    this.godown_name = godown_name
  }
}

export class PhysicalLocationModel {
  gpl_loc: any
  gpl_phyloc_flg: string
  serial_no:string

  constructor(gpl_loc: any , gpl_phyloc_flg: string, serial_no:string) {
    this.gpl_loc = gpl_loc
    this.gpl_phyloc_flg = gpl_phyloc_flg
    this.serial_no = serial_no
  }
}

export class addLocationModel {
  txtPhysicalLocation: string
}

export class CardDetailsModel {
  stm_card_no: string
  stm_item_code: string
  it_prod_code: string
  stm_make: string
  stm_balance_quantity: string
  um_short_desc: string

  constructor( stm_card_no: string,stm_item_code: string,it_prod_code: string,stm_make: string,stm_balance_quantity : string,um_short_desc: string) {
     this.stm_card_no = stm_card_no
     this.stm_item_code = stm_item_code
     this.it_prod_code = it_prod_code
     this.stm_make = stm_make
     this.stm_balance_quantity = stm_balance_quantity
     this.um_short_desc = um_short_desc
  }
}