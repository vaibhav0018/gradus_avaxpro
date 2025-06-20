import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonColumnModel } from '../../../../../entry/commons/commons.model';
import { StockQueryReportService } from '../stock-query-report.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-dialog',
  imports: [MatDialogModule,MatIconModule,CommonModule],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss',],
})
export class ImageDialogComponent implements OnInit {
  lstColumn: CommonColumnModel[] = [
    { col_name: 'LABEL', db_col: 'ipd_label', flgLink: false, col_type: 'TXT' },
    { col_name: 'VALUE', db_col: 'ipd_value', flgLink: false, col_type: 'TXT' },  
  ]
  imgUrl: string='';
  item_details: any;
  utilityData: { lstColumn: CommonColumnModel[]; dataSource: any; };
  dataSource: any;
  message: string;

  constructor(
    private stockQueryReportService: StockQueryReportService,

    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageDialogComponent>,
  ) { }

  ngOnInit() {
    let payload = {
      item_Code:this.data.item_code
      }
    this.stockQueryReportService.getProductData(payload).
    subscribe((data1 : any) => {
      if (data1.responseStatus === 'SUCCESS' && data1.responseCode === 'RES_200') {
          this.dataSource= data1.responseData
        }    
      if(data1.responseData==null){
        this.message="DATA NOT FOUND"
      }
        
      })
    
    console.log("DATA === > ",this.data);
    this.imgUrl = this.data.url
    this.item_details = this.data.item_details

  }
  // get displayedColumns(): string[] {
  //   const displayedColumns = this.lstColumn
  //     .map(column => column.db_col)
  //   return displayedColumns
  // }

}
