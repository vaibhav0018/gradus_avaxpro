import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhysicalLocationMasterService } from '../physical-location-master-menu/physical-location-master.service';
import { CardDetailsModel, PhysicalLocationModel } from '../physical-location-master-menu/physical-location-master.model';
import { SnackbarMasterComponent } from '../../../../snackbar-master/snackbar-master.component';

@Component({
  selector: 'app-physical-location-card-list',
  templateUrl: './physical-location-card-list.component.html',
  styleUrls: ['./physical-location-card-list.component.scss'],
  standalone: false
})
export class PhysicalLocationCardListComponent implements OnInit {
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  public carddetailsform: FormGroup
  tableData: any;
  phy_loc: String;
  godownCode: String;
  physicalLocationList: any;
  intRecordCount: any = 0;
  private dialogRef: MatDialogRef<PhysicalLocationCardListComponent>

  constructor(private PhysicalLocationMasterService: PhysicalLocationMasterService, public formBuilder: FormBuilder, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.carddetailsform = this.formBuilder.group({
    });
    this.phy_loc = data.gpl_loc;
    this.godownCode = data.godown_code;
  }
  displayedColumns: string[] = ['card_no', 'item', 'prod_code', 'make', 'bal_qty', 'uom'];
  ngOnInit() {
    this.getCardDetails();
  }

  getCardDetails() {
    //   console.log('phy_loc ',this.phy_loc);
    //   console.log('Godown Code ',this.godownCode);
    this.PhysicalLocationMasterService.getCardDetails(this.phy_loc, this.godownCode).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.tableData = data.responseData[0].map((item: any) => {
            return new CardDetailsModel(
              item.stm_card_no,
              item.stm_item_code,
              item.it_prod_code,
              item.stm_make,
              item.stm_balance_quantity,
              item.um_short_desc
            )
          })
        }
        this.dataSource = this.tableData
        this.intRecordCount=this.tableData.length;
      },
      error => {
        console.log(error)
      }
    )
  }

  save() {
    this.PhysicalLocationMasterService.addToScrapPhysicalLocation(this.phy_loc, this.godownCode).subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.openSnackBar(' ' + this.phy_loc + ' Successfully Move To Scrap Location ');
          //         alert("Successfully Scrap");
          this.PhysicalLocationMasterService.getPhysicalLocation(this.godownCode).subscribe(data => {
            if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
              this.physicalLocationList = data.responseData.map((item: any) => {
                ///  console.log('gpl_phyloc_flg', item.gpl_phyloc_flg)
                return new PhysicalLocationModel(
                  item.gpl_loc,
                  item.gpl_phyloc_flg,
                  item.serial_no,
                )
              })
            }
          },
            error => {
              console.log(error)
            }
          )
          //
        } else {
          this.openSnackBar("Please select Godown");
          //   alert("Please Select Godown.....");
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarMasterComponent, {
      data: message,
      duration: 10000
    });
  }
}
