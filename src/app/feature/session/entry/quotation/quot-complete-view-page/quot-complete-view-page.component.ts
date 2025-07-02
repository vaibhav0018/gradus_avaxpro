import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-quot-complete-view-page',
  templateUrl: './quot-complete-view-page.component.html',
  styleUrls: ['./quot-complete-view-page.component.scss']
})
export class QuotCompleteViewPageComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  stateDataStr:any;
  ngOnInit() {


    if (sessionStorage.refData)
      this.stateDataStr = sessionStorage.getItem("refData");
    else {
      this.stateDataStr = sessionStorage.getItem("stateData");
      sessionStorage.removeItem("stateData");
      sessionStorage.setItem("refData", this.stateDataStr);
    }

    sessionStorage.setItem("stateData", JSON.stringify(this.stateDataStr));
    this.router.navigate(['session/entry/quotation/newquotitementry'], { state:this.stateDataStr });


  }

}
