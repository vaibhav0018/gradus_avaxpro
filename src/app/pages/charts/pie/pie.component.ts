import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { multi, single } from '@data/charts.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-pie',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        NgxChartsModule
    ],
    templateUrl: './pie.component.html'
})
export class PieComponent {
  public single: any[];
  public multi: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;

  constructor() {
    Object.assign(this, { single, multi });
  }

  public onSelect(event: any) {
    console.log(event);
  }
}
