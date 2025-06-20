export class ReservationView {
    rsv_rsv_no: string;
    rsv_rsv_for: string;
    rsv_rsvfor: string;
    rsv_qty_rsv: string
    rsv_ts_rsv_on: string
    rsv_ts_rsv_upto: string
    constructor(
        rsv_rsv_no: string,
        rsv_rsv_for: string,
        rsv_rsvfor: string,
        rsv_qty_rsv: string,
        rsv_ts_rsv_on: string,
        rsv_ts_rsv_upto: string,
    ) {
        this.rsv_rsv_no = rsv_rsv_no
        this.rsv_rsv_for = rsv_rsv_for
        this.rsv_rsvfor = rsv_rsvfor
        this.rsv_qty_rsv = rsv_qty_rsv
        this.rsv_ts_rsv_on = rsv_ts_rsv_on
        this.rsv_ts_rsv_upto = rsv_ts_rsv_upto
    }
}

export class StockModel {
    rsv_qty_rsv: string;
    rsv_doc_no: string;
    rsv_rsv_by: string;
    rsv_by: string
    hnd_by: string
    rsv_ts_rsv_on: string
    rsv_ts_rsv_upto: string
    rsv_rsv_for: string
    rsv_rsv_no: string
    rsv_rsv_for_flg: string
    rsv_ts_rsv_upto_temp: string
    temp_date: string
    rsv_rsv_for_code: string
    constructor(
        rsv_qty_rsv: string,
        rsv_doc_no: string,
        rsv_rsv_by: string,
        rsv_by: string,
        hnd_by: string,
        rsv_ts_rsv_on: string,
        rsv_ts_rsv_upto: string,
        rsv_rsv_for: string,
        rsv_rsv_no: string,
        rsv_rsv_for_flg: string,
        rsv_ts_rsv_upto_temp: string,
        temp_date: string,
        rsv_rsv_for_code: string
    ) {
        this.rsv_qty_rsv = rsv_qty_rsv
        this.rsv_doc_no = rsv_doc_no
        this.rsv_rsv_by = rsv_rsv_by
        this.rsv_by = rsv_by
        this.hnd_by = hnd_by
        this.rsv_ts_rsv_on = rsv_ts_rsv_on
        this.rsv_ts_rsv_upto = rsv_ts_rsv_upto
        this.rsv_rsv_for = rsv_rsv_for
        this.rsv_rsv_no = rsv_rsv_no
        this.rsv_rsv_for_flg = rsv_rsv_for_flg
        this.rsv_ts_rsv_upto_temp = rsv_ts_rsv_upto_temp
        this.temp_date = temp_date
        this.rsv_rsv_for_code = rsv_rsv_for_code
    }
}


export class StockQty {
    stm_opening_qty: string;
    stm_discrepancy_qty: string;
    uomnm: string;
    stm_issued_qty: string
    bal_qty: string
    bal_good_qty: string
    bal_free_for_rsv: string
    bal_good_free_for_rsv: string
    stm_damage_qty: string
    stm_rsv_qty: string
    constructor(
        stm_opening_qty: string,
        stm_discrepancy_qty: string,
        uomnm: string,
        stm_issued_qty: string,
        bal_qty: string,
        bal_good_qty: string,
        bal_free_for_rsv: string,
        bal_good_free_for_rsv: string,
        stm_damage_qty: string,
        stm_rsv_qty: string,
    ) {
        this.stm_opening_qty = stm_opening_qty
        this.stm_discrepancy_qty = stm_discrepancy_qty
        this.uomnm = uomnm
        this.stm_issued_qty = stm_issued_qty
        this.bal_qty = bal_qty
        this.bal_good_qty = bal_good_qty
        this.bal_free_for_rsv = bal_free_for_rsv
        this.bal_good_free_for_rsv = bal_good_free_for_rsv
        this.stm_damage_qty = stm_damage_qty
        this.stm_rsv_qty = stm_rsv_qty
    }
}
