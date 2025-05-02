import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { bubble } from '@data/charts.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-bubble',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        NgxChartsModule
    ],
    templateUrl: './bubble.component.html'
})
export class BubbleComponent {
  public bubble: any[];
  public legendTitle = 'Legend';
  public showLegend = true;
  public tooltipDisabled = false;
  public showGridLines = true;
  public roundDomains = false;
  public maxRadius = 10;
  public minRadius = 3;
  public schemeType: any = 'ordinal';
  public showXAxis = true;
  public showYAxis = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Census Date';
  public showYAxisLabel = true;
  public yAxisLabel = 'Life expectancy [years]';
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public autoScale = true;

  constructor() {
    Object.assign(this, { bubble })
  }

  onSelect(event: any) {
    console.log(event);
  }
}
