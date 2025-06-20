import { CommonModule } from '@angular/common'
import { SessionRoutingModule } from './session.routing'
import { SessionComponent } from './session.component'
import { CoreModule } from '@ngbracket/ngx-layout'
import { SharedModule } from '../../shared/shared.module'
import { NgModule } from '@angular/core'
import { GoogleMapsModule } from '@angular/google-maps';
// import { StoppageClearancePageComponent } from './stoppage-clearance-page/stoppage-clearance-page.component'
// import { StoppageClearComponent } from './stoppage-clear/stoppage-clear.component'
import { AlphaNumericDirective } from '../../shared/directives/numeric/alpha-numeric.directive'
// import { MapDialogComponentComponent } from './map-dialog-component/map-dialog-component.component';
import { AgmCoreModule } from '@agm/core';
import { GeocodeService } from './map-dialog-component/geocode.service'
import { SharedMaterialModule } from '../../shared/share-material'
import { ViewUserInfoComponent } from './user-information-view/view-user-info/view-user-info.component'
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms'
import { StockQueryReportComponent } from './query/stock-query/components/stock-query-report/stock-query-report.component'
import { FullScreenComponent } from "../../theme/components/fullscreen/fullscreen.component";
import { UserMenuComponent } from "../../theme/components/user-menu/user-menu.component";
import { BreadcrumbComponent } from "../../theme/components/breadcrumb/breadcrumb.component";
import { SidenavComponent } from "../../theme/components/sidenav/sidenav.component";
import { MatOption, MatOptionModule } from '@angular/material/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MakeMasterCompanyListComponent } from './master/miscellaneouse-master/make-master/components/make-master-company-list/make-master-company-list.component'
// import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
// import { ReportFilteringComponent } from './report-filtering/report-filtering.component';
// import { RcmAmountDetailsComponent } from './entry/accounts/rcm/components/rcm-amount-details/rcm-amount-details.component'
// import { StarDtlDialogComponent } from './entry/challan/components/challan-menu/star-dtl-dialog/star-dtl-dialog.component' 
// import { CommonUploadExcelComponent } from './common-module/common-upload-excel/common-upload-excel.component'

@NgModule({
  declarations: [AlphaNumericDirective,StockQueryReportComponent,],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    SessionRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SessionComponent,
    FullScreenComponent,
    UserMenuComponent,
    BreadcrumbComponent,
    SidenavComponent,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ViewUserInfoComponent
],
  exports: [AlphaNumericDirective, StockQueryReportComponent, FullScreenComponent, UserMenuComponent, BreadcrumbComponent, SidenavComponent],
  // entryComponents: [StoppageClearancePageComponent, StoppageClearComponent, MapDialogComponentComponent,GenericDialogComponent,ReportFilteringComponent,RcmAmountDetailsComponent,StarDtlDialogComponent,CommonUploadExcelComponent],
  providers: [GeocodeService],
})
export class SessionModule { }

