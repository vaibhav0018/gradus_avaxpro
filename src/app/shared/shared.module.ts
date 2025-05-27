import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

// import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'
import { OverlayContainer } from '@angular/cdk/overlay'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { AppSettings } from '../app.settings'
// import { CustomOverlayContainer } from './utils/custom-overlay-container'
// App Imports
// import { SharedFormsModule } from './shared-forms.module'
import { SharedMaterialModule } from './share-material'
// import { SharedTranslateModule } from './shared-translate.module'
// import { SharedDirectivesModule } from './shared-directives.module'
// import { DirectivesModule } from './directives/directives.module'
// import { PipesModule } from './pipes/pipes.module'
// import { I18nService } from './services/i18n.service'

import { RouterService } from './services/router.service'

// import { FullScreenComponent } from './components/fullscreen/fullscreen.component'
// import { SidenavComponent } from './components/sidenav/sidenav.component'
import { VerticalMenuComponent } from './components/menu/vertical-menu/vertical-menu.component'
import { HorizontalMenuComponent } from './components/menu/horizontal-menu/horizontal-menu.component'
// import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component'
// import { FlagsMenuComponent } from './components/flags-menu/flags-menu.component'
// import { ApplicationsComponent } from './components/applications/applications.component'
// import { MessagesComponent } from './components/messages/messages.component'
// import { UserMenuComponent } from './components/user-menu/user-menu.component'

// App Imports
// import { SharedMatSelectSearchComponent } from './components/shared-mat-select-search/shared-mat-select-search.component'
// import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component'
// import { SharedMatDatePickerComponent } from './components/shared-mat-date-picker/shared-mat-date-picker.component'
import { NgxSpinnerModule } from 'ngx-spinner'
// import { SharedMatTableRowComponent } from './components/shared-mat-table-row/shared-mat-table-row.component'
// import { SharedMatTableRowDynamicComponent } from './components/shared-mat-table-row-dynamic/shared-mat-table-row-dynamic.component'
// import { SharedBasicMatTableRowDynamicComponent } from './components/shared-basic-mat-table-row-dynamic/shared-basic-mat-table-row-dynamic.component'
// import { SharedMatTableComponent } from './components/shared-mat-table/shared-mat-table.component'
// import { SharedBasicMatTableComponent } from './components/shared-basic-mat-table/shared-basic-mat-table.component'
// import { SettingsComponent } from 'src/app/shared/components/shared-settings/shared-settings.component'
// import { SharedMatTableComponentCheckBox } from './components/shared-mat-table-check-box/shared-mat-table-check-box.component'
// import { SharedMatTableDynamicComponent } from './components/shared-mat-table-dynamic/shared-mat-table-dynamic.component'
import { CustomSpinnerComponent } from '../feature/session/custom-spinner/custom-spinner.component'
import { S } from '@angular/cdk/keycodes'
// import { DocCalcViewComponent } from '../feature/session/entry/commons/doc-calc-view/doc-calc-view.component'
//import { PartySecurityChequeDtlComponent } from '../feature/session/common-module/party-security-cheque-dtl/party-security-cheque-dtl.component'
// import { UtilityMatTableViewComponent } from '../feature/session/common-module/utility-mat-table-view/utility-mat-table-view.component'
// import { StoppageClearComponent } from '../feature/session/stoppage-clear/stoppage-clear.component'
// import { StoppageClearancePageComponent } from '../feature/session/stoppage-clearance-page/stoppage-clearance-page.component'
// import { ErrorMessageComponent } from 'src/app/feature/session/error-message/error-message.component';
// import { CommonSnackbarComponent } from './components/common-snackbar/common-snackbar.component';
// import { CommonConfirmationDialogComponent } from './components/common-confirmation-dialog/common-confirmation-dialog.component'
// import { CommonMatTableViewComponent } from '../feature/sModuleWithProvidersession/common-module/common-mat-table-view/common-mat-table-view.component'
// import { SrDocumentDetailViewComponent } from '../feature/session/entry/stock/stock-receipt/components/stock-receipt-menu/sr-document-detail-view/sr-document-detail-view.component'
// import { SharedMatTableCustomComponent } from './components/shared-mat-table-custom/shared-mat-table-custom.component'
// import { UserInfoDetailsComponent } from '../feature/session/user-profile-display/user-info-details/user-info-details.component'
// import { SharedMatTableCustomIconComponent } from './components/shared-mat-table-custom-icon/shared-mat-table-custom.component'
// import { SharedTableWithoutPaginationComponent } from './components/shared-table-without-pagination/shared-table-without-pagination/shared-table-without-pagination.component'
// import { GroupOsPageComponent } from '../feature/session/followup/outstanding-followup/components/group-os-page/group-os-page.component'
// import { FollActEntryPageComponent } from '../feature/session/followup/outstanding-followup/components/foll-act-entry-page/foll-act-entry-page.component'
// import { MiscPartyMaintenanceMenuComponent } from '../feature/session/master/customer-master-draft/components/misc-party-maintenance-menu/misc-party-maintenance-menu.component'
// import { SharedUtilityHtmlTableComponent } from './components/shared-utility-html-table/shared-utility-html-table.component'
// import { ChallanAddedItemDetailsComponent } from '../feature/session/entry/challan/commons/challan-added-item-details/challan-added-item-details.component'
// import { ViewUserInfoComponent } from '../feature/session/user-information-view/view-user-info/view-user-info.component'
// import { SharedCommanDialogBoxComponent } from './comman-dialog-box/shared-comman-dialog-box/shared-comman-dialog-box.component'



const SHARED_SERVICES = [ RouterService]    

// [I18nService, RouterService]

// Gradus Constant
// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   wheelPropagation: true,
//   suppressScrollX: true,
// }

const SHARED_COMPONENTS = [
  // FullScreenComponent,
  // SidenavComponent,
  VerticalMenuComponent,
  HorizontalMenuComponent,
  // BreadcrumbComponent,
  // FlagsMenuComponent,
  // ApplicationsComponent,
  // MessagesComponent,
  // UserMenuComponent,
  // UserInfoDetailsComponent,
  // ViewUserInfoComponent,
  // SharedCommanDialogBoxComponent

]

const SHARED_COMPONENTS_AVAXPRO = [
  // SharedMatSelectSearchComponent,
  // MenuListItemComponent,
  // SharedMatDatePickerComponent,
  // SharedMatTableRowComponent,
  // SharedMatTableRowDynamicComponent,
  // SharedTableWithoutPaginationComponent,
  // SharedBasicMatTableRowDynamicComponent,
  // SharedMatTableComponent,
  // SharedBasicMatTableComponent,
  // SettingsComponent,
  // SharedMatTableComponentCheckBox,
  // SharedMatTableDynamicComponent,
  // SharedMatSelectSearchComponent,
  CustomSpinnerComponent,
  /*  PartySecurityChequeDtlComponent, */
  // UtilityMatTableViewComponent,
  // DocCalcViewComponent,
  // StoppageClearancePageComponent,
  // StoppageClearComponent,
  // ErrorMessageComponent,
  // CommonSnackbarComponent,
  // CommonConfirmationDialogComponent,
  // CommonMatTableViewComponent,
  // SrDocumentDetailViewComponent,
  // SharedMatTableCustomComponent,
  // SharedMatTableCustomIconComponent,
  // GroupOsPageComponent,
  // FollActEntryPageComponent,
  // MiscPartyMaintenanceMenuComponent,
  // SharedUtilityHtmlTableComponent,
  // ChallanAddedItemDetailsComponent,
  // OtherInfoViewPopupComponent
]

// const SHARED_DIRECTIVES = [SharedDirectivesModule]

@NgModule({
  imports: [
    // CommonModule,
    // SharedFormsModule,
    SharedMaterialModule,
    SHARED_COMPONENTS,
    SHARED_COMPONENTS_AVAXPRO,
    // SharedTranslateModule,
    // PerfectScrollbarModule,
    // RouterModule,
    // PipesModule,
    // NgxSpinnerModule,
    // DirectivesModule,
    // ScrollingModule
  ],
  
  exports: [
    SharedMaterialModule,
    SHARED_COMPONENTS,
    SHARED_COMPONENTS_AVAXPRO,
  ],


  //   exports: [
  //   // SharedFormsModule,
  //   SharedMaterialModule,
  //   // SharedTranslateModule,
  //   // PipesModule,
  //   // PerfectScrollbarModule,
  //   SHARED_COMPONENTS,
  //   SHARED_COMPONENTS_AVAXPRO,
  //   // SHARED_DIRECTIVES
  //   // DirectivesModule,
  //   // NgxSpinnerModule,
  //   // ScrollingModule
  // ],


  providers: [
    AppSettings,
    // { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // { provide: OverlayContainer, useClass: CustomOverlayContainer },
    SHARED_SERVICES,
  ],
  // declarations: [SHARED_COMPONENTS, SHARED_COMPONENTS_AVAXPRO],
  // entryComponents: [SettingsComponent, CommonSnackbarComponent, CommonConfirmationDialogComponent, UserInfoDetailsComponent, GroupOsPageComponent,
    // FollActEntryPageComponent, MiscPartyMaintenanceMenuComponent,ViewUserInfoComponent,SharedCommanDialogBoxComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [HttpClientModule],
    }
  }
}
