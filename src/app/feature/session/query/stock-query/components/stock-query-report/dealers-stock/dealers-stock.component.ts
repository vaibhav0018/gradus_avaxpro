import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockQueryDealersStockTableModel } from '../stock-query-report.model';
import { StockQueryReportService } from '../stock-query-report.service';
import { EntryService } from '../../../../../entry/entry.service';
@Component({
  selector: 'app-dealers-stock',
  templateUrl: './dealers-stock.component.html',
  styleUrls: ['./dealers-stock.component.scss',] //'../../../../query.scss'
})

export class DealersStockComponent implements OnInit {

  displayedDealersStockDataColumns : string[] = [
    'ds_code',
    'ds_name',
    'ds_tel_no',
    'ds_catalog_ref_no',
    'ds_stock_as_on_date',
    'br_city',
    'ds_drum_no',
    'ds_qty',
    'ds_uom'
  ]
  dealersStockDataSource : StockQueryDealersStockTableModel
  dealersStockTableData: any
  parentItemCode : string 
  message: any
  modalTitle: string


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stockQueryReportService : StockQueryReportService,
    private entryService: EntryService,
  ) {         
    this.parentItemCode = data.itemCode
    this.modalTitle = data.title
  }

  ngOnInit() {
      this.stockQueryReportService.getDealersStockList(this.parentItemCode).subscribe((data : any) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {                    
          if(data.responseData[0].length == 0){
            this.message = this.entryService.showMsg('error');
            return false
          }
          else{            
            this.dealersStockTableData = data.responseData[0].map((dealersStockItem: { ds_code: string; ds_name: string; ds_tel_no: string; ds_catalog_ref_no: string; ds_stock_as_on_date: string; br_city: string; ds_drum_no: string; ds_qty: string; ds_uom: string; }) => {                                                    
              return new StockQueryDealersStockTableModel(
                dealersStockItem.ds_code,
                dealersStockItem.ds_name,
                dealersStockItem.ds_tel_no,
                dealersStockItem.ds_catalog_ref_no,
                dealersStockItem.ds_stock_as_on_date,
                dealersStockItem.br_city,
                dealersStockItem.ds_drum_no,
                dealersStockItem.ds_qty,
                dealersStockItem.ds_uom
              )
            })
            this.dealersStockDataSource = this.dealersStockTableData
          }
        }
      })           
  }
}
