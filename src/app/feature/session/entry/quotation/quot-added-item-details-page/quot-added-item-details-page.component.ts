import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { QuotationService } from '../quotation.service';
import { AddedItemModel } from '../quotation.model';

@Component({
  selector: 'app-quot-added-item-details-page',
  templateUrl: './quot-added-item-details-page.component.html',
  styleUrls: ['./quot-added-item-details-page.component.scss', '../../entry.scss']
})

export class QuotAddedItemDetailsPageComponent implements OnInit, OnChanges {

  @Input() addedItemData: any;

  tableData: any
  displayColumn: string[] = [
    'serial_no',
    'item_code',
    'cat_refno',
    'it_prod_code',
    'mk_desc',
    'um_short_desc',
    'qty',
    'rate',
    'amt',
    'calratedesc'
  ]
  dataSource: AddedItemModel

  constructor(
    private quotationService: QuotationService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {

    console.log(' on changes data ', this.addedItemData)
    this.displayAddedItemDetails(this.addedItemData)

    if (this.addedItemData.showView != 'itemDisplay') { }
    //displayColumn['select']
  }

  displayAddedItemDetails(params : any) {
    this.quotationService.getAddedItemDetailsList(
      params.qt_draft_no, params.callFrom
    ).subscribe({
      next:(data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          console.log(' data.responseData[0] ', data.responseData[0])
          this.tableData = data.responseData[0].map((item : any) => {
            return new AddedItemModel(
              item.qtd_executed_qty,
              item.qtd_saleable_stock,
              item.qtd_deleted_flg,
              item.qtd_draft_no,
              item.item_code,
              item.serial_no,
              item.cal_flg,
              item.lp,
              item.original_lp,
              item.it_prod_code,
              item.make,
              item.mk_desc,
              item.uom,
              item.um_short_desc,
              item.rate,
              item.amt,
              item.qty,
              item.cat_refno,
              item.calratedesc,
              item.src_type,
              item.chk_flag,
            )
          })
          this.dataSource = this.tableData
          console.log('tabledata ', this.tableData);
          console.log('dataSourceAoItemList ', this.dataSource);
        }
      },
      error: (error : any) => {
        console.log(error)
      }})

  }

  deleteAoItem(row : any) {
    console.log(' deleteAoItem ', this.addedItemData.stateData)
    console.log(" row for deletion ", row)
  }

}
