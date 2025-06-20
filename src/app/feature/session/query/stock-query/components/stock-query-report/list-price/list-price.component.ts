import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material'
import {
  StockQueryPriceListTableModel
} from 'src/app/feature/session/query/stock-query/components/stock-query-report/stock-query-report.model';
import { StockQueryReportService } from '../stock-query-report.service';
import { EntryService } from 'src/app/feature/session/entry/entry.service';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styleUrls: ['./list-price.component.scss',
    '../../../../query.scss'
  ]
})
export class ListPriceComponent implements OnInit {
  parentItemCode: string
  message: any
  modalTitle: string
  priceListDataSource: string[] = []
  priceListTableData: any
  priceListLength: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockQueryReportService: StockQueryReportService,
    private entryService: EntryService,
  ) {
    this.parentItemCode = data.itemCode
    this.modalTitle = data.title
  }

  ngOnInit() {


    this.stockQueryReportService.getPricListForStockList(this.parentItemCode).subscribe(data => {

      this.priceListLength = data.responseData.length
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (data.responseData.length == 0) {
          this.message = this.entryService.showMsg('error');
          return false
        }
        else {
          this.priceListTableData = data.responseData.map(priceListItem => {
            return new StockQueryPriceListTableModel(
              priceListItem.itm_list_price,
              priceListItem.mk_short_name,
              priceListItem.itmsale,
              priceListItem.um_short_desc
            )
          })
          this.priceListDataSource = this.priceListTableData
        }
      }
    })

  }

}
