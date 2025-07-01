import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UtilityServiceAvaxPro } from '../../../../../../../core/services/utility/utility_avaxpro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../../../../../core/services/http.service';
import { GodwonService } from './godwon.service';
import { GodwonMenu } from './godwon-menu.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-godwon-menu',
  templateUrl: './godwon-menu.component.html',
  styleUrls: ['./godwon-menu.component.scss', '../../../../master.scss'],
  standalone : false
})
export class GodwonMenuComponent implements OnInit {
  public form: FormGroup
  displayedColumns: string[] = ['make_code', 'make_short_name', 'make_description', 'make_principle', 'address', 'select'];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  tableData: BehaviorSubject<AbstractControl[]>;
  navigateData: { gd_godown_code?: string } = {}
  constructor(
    private httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private godwonService: GodwonService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({

    })
  }
  ngOnInit() {
    this.getGodwonMaster()
  }

  getGodwonMaster() {
    this.godwonService.getGodownMenuList().subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.tableData = data.responseData[0].map((item : any) => {
    //      console.log('item', item);
          return new GodwonMenu(
            item.gd_godown_code,
            item.gd_godown_name,
            item.gd_short_name,
            item.gd_pts_flg,
            item.gd_address,
            item.br_city
          )
        })
      }
      this.dataSource = this.tableData
    })

  }

  addNewGodown() {
    this.router.navigate(['session/master/miscellaneous-master/open-new-godown/add-godwon']);
  }

  editPage(row : any) {

    console.log(" roww -- " + row)
    this.navigateData["gd_godown_code"] = row.gd_godown_code

    sessionStorage.removeItem("data");
    sessionStorage.setItem("data", JSON.stringify(this.navigateData));
    this.router.navigate(['session/master/miscellaneous-master/open-new-godown/modify-godwon'], { state: this.navigateData });

  }
}
