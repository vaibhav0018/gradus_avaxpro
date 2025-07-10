// import { NgModule } from '@angular/core'
// import { CommonModule } from '@angular/common'

import { CommonModule } from "@angular/common";
import { CoreModule, FlexLayoutModule } from "@ngbracket/ngx-layout";
import { SharedModule } from "../../shared/shared.module";
import { GeocodeService } from "./map-dialog-component/geocode.service";
import { SessionComponent } from "./session.component";
import { MapDialogComponentComponent } from "./map-dialog-component/map-dialog-component.component";
import { SessionRoutingModule } from "./session.routing";
import { NgModule } from "@angular/core";

// import { SessionComponent } from './session.component'
// import { CoreModule } from 'src/app/core/core.module'
// import { SharedModule } from 'src/app/shared/shared.module'
// import { StoppageClearancePageComponent } from './stoppage-clearance-page/stoppage-clearance-page.component'
// import { StoppageClearComponent } from './stoppage-clear/stoppage-clear.component'
// import { AlphaNumericDirective } from 'src/app/shared/directives/numeric/alpha-numeric.directive'
// import { MapDialogComponentComponent } from './map-dialog-component/map-dialog-component.component'
 import { AgmCoreModule } from '@agm/core';
import { RouterOutlet } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelect } from "@angular/material/select";
import { FullScreenComponent } from "../../theme/components/fullscreen/fullscreen.component";
import { SidenavComponent } from "../../theme/components/sidenav/sidenav.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MatOptionModule } from "@angular/material/core";
import { BreadcrumbComponent } from "../../theme/components/breadcrumb/breadcrumb.component";
import { UserMenuComponent } from "../../theme/components/user-menu/user-menu.component";
// import { GeocodeService } from './map-dialog-component/geocode.service';
// import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
// import { ReportFilteringComponent } from './report-filtering/report-filtering.component';
// import { RcmAmountDetailsComponent } from './entry/accounts/rcm/components/rcm-amount-details/rcm-amount-details.component'
// import { StarDtlDialogComponent } from './entry/challan/components/challan-menu/star-dtl-dialog/star-dtl-dialog.component' 
// import { CommonUploadExcelComponent } from './common-module/common-upload-excel/common-upload-excel.component'

@NgModule({
  declarations: [],
  imports: [
    SessionComponent,
    MapDialogComponentComponent,
    CommonModule,
    RouterOutlet,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    FlexLayoutModule,
    NgScrollbarModule,
    SidenavComponent,
    FullScreenComponent,
    MatSelect,
    UserMenuComponent,
    BreadcrumbComponent,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    SharedModule,
    SessionRoutingModule,
  // AgmCoreModule.forRoot({
  //   apiKey: 'AIzaSyDZKgLPNA-kgGGOzDaHQfccKQvD9w5UgQY',
  //   libraries: ['places']
  // }),
],
  // entryComponents: [StoppageClearancePageComponent, StoppageClearComponent, MapDialogComponentComponent,GenericDialogComponent,ReportFilteringComponent,RcmAmountDetailsComponent,StarDtlDialogComponent,CommonUploadExcelComponent],
  providers: [GeocodeService],
})
export class SessionModule { }
