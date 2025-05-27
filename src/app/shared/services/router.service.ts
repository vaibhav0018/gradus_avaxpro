import { Injectable } from '@angular/core'
import { Router, NavigationEnd, NavigationExtras } from '@angular/router'
import { Location } from '@angular/common'
import { ConstantsService } from '../../core/services/constants.service'
import { BehaviorSubject } from 'rxjs'
import { ConstantsServiceAvaxPro } from '../../core/services/constants_avaxpro.service'
// import { ConstantsServiceAvaxPro } from 'src/app/core/services/constants_avaxpro.service'

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private currentRoute = new BehaviorSubject<string>('')

  constructor(private router: Router, private location: Location) {}

  public routeChangeListener = this.currentRoute.asObservable()

  goBack = () => {
    this.location.back()
  }

  getCurrentRoute = () => {
    return this.currentRoute.getValue()
  }

  doNavigation = (route: string): void => {
    this.currentRoute.next(route)
    this.router.navigate([route])
  }
  doNavigationWithExtras = (route: string, navigationExtras?: NavigationExtras): void => {
    this.currentRoute.next(route)
    this.router.navigate([route], navigationExtras)
  }

  openDefaultPage = (): void => {
    this.openLandingPage()
  }
  openLandingPage = (): void => {
    this.doNavigation(ConstantsService.ROUTE_NON_SESSION)
  }

  /*
   *
   * All route methods corresponding to NonSessionModule are Arranged alphabetically
   *
   */
  showHomePage = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_NON_SESSION + '/' + ConstantsService.ROUTE_HOME
    )
  }

  showLoginPage = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_NON_SESSION + '/' + ConstantsService.ROUTE_LOGIN
    )
  }

  showDashBoardPage = (): void => {
    this.doNavigation(ConstantsService.ROUTE_DASHBOARD)
  }

  showVersionPage = (): void => {
    this.doNavigation('error')
  }

  //commented because constant_avaxpro service have null repplace string problem

//   showPartyQuery = (): void => {
//     window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_PARTY_QUERY, '_blank'), { };
//     //this.doNavigation( ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_PARTY_QUERY)
//   }

//   showStockQuery = (): void => {
//     window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_STOCK_QUERY, '_blank'), { };
//  //   this.doNavigation( ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_STOCK_QUERY)
//   }

  showStoppageClr = (): void => {
    //window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS + '/' +ConstantsServiceAvaxPro.ROUTE_STOPPAGE_CLEARANCE, '_blank'), { };
    this.doNavigation(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS+ '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS_MODULE+ '/' +ConstantsServiceAvaxPro.ROUTE_STOPPAGE_CLEARANCE);
 //   this.doNavigation( ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_STOCK_QUERY)
  }

  showServicePage = (): void => {
    this.doNavigation(ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU)
  }

//   showRecentMenuPage = (): void => {
//     this.doNavigation(ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU)
//   }
//   showStoppageView = (): void => {
//      window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS+ '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS_MODULE+ '/' +ConstantsServiceAvaxPro.ROUTE_STOPPAGE_CLEARANCE, '_blank'), { };
//   }

  /*
   *
   * All route methods corresponding to SessionModule are Arranged alphabetically
   *
   */
  showStockLessThanNQuantity = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_STOCK_LESS_THAN_N_QUANTITY
    )
  }

  showGodownWiseStockStatusReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_GODOWN_WISE_STOCK_STATUS_REPORT_FILTER
    )
  }

    showPartyQuery = (): void => {
    window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_PARTY_QUERY, '_blank'), { };
    //this.doNavigation( ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_PARTY_QUERY)
  }
 
  showStockQuery = (): void => {
    window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_STOCK_QUERY, '_blank'), { };
//   this.doNavigation( ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_QUERY + '/' +ConstantsServiceAvaxPro.ROUTE_STOCK_QUERY)
  }
 
  showStoppageView = (): void => {
     window.open(ConstantsService.ROUTE_SESSION + '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS+ '/' +ConstantsServiceAvaxPro.ROUTE_MISCELLANEOUS_MODULE+ '/' +ConstantsServiceAvaxPro.ROUTE_STOPPAGE_CLEARANCE, '_blank'), { };
  }
 
 

  showStockReport = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_ITEM_LEDGER
    )
  }

  showStockGateway = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_STOCK_GATEWAY
    )
  }

  showDateWiseStockValueReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_DATE_WISE_STOCK_VALUE_REPORT_FILTER
    )
  }

  showDiscrepancySearchReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_DISCREPANCY_SEARCH_REPORT_FILTER
    )
  }

  showStockTransferReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_TRANSFER_REPORT_FILTER
    )
  }

  showSrDcReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_SR_DC_REPORT_FILTER
    )
  }

  showGdPhysicalLocationStatusFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_GD_PHYSICAL_LOCATION_STATUS
    )
  }
  showGodownStockBankingReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_GODOWN_STOCK_BANKING_REPORT_FILTER
    )
  }

  showStockOverNDaysReport = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_STOCK_OVER_N_DAYS_REPORT
    )
  }

  showGodownItemMakeWiseStockMovement = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_GODOWN_ITEM_MAKE_WISE_STOCK_MOVEMENT
    )
  }

  showStockValuationReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_STOCK_VALUATION_REPORT_FILTER
    )
  }

  showGodownWiseStockWithStockLevelReportFilter = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_REPORT +
        '/' +
        ConstantsService.ROUTE_GD_WISE_STOCK_WITH_STOCK_LEVEL
    )
  }

  showSalesSummary = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_SALES_SUMMARY
    )
  }
  showStockTransferRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_STOCK_TRANSFER_REGISTER
    )
  }
  showTaxSummary = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_TAX_SUMMARY
    )
  }
  showSampleChallan = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_SAMPLE_CHALLAN
    )
  }
  showSalesRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_SALES_REGISTER
    )
  }
  showUnbilledDocument = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_UNBILLED_DOCUMENT
    )
  }
  showQuotationRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_QUOTATION_REGISTER
    )
  }
  showPartyClearance = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_PARTY_CLEARANCE
    )
  }
  showProformaRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_PROFORMA_REGISTER
    )
  }
  showDoPts = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_DO_PTS
    )
  }
  showPoRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_PO_REGISTER
    )
  }
  showPartyChallanItemWise = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_PARTY_CHALLAN_ITEM_WISE
    )
  }
  showCancelledChallan = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_CANCELLED_CHALLAN
    )
  }
  showAoRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_AO_REGISTER
    )
  }
  showPolycabAccRegister = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_POLYCAB_ACC
    )
  }
  showBrokerWiseSales = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_CHALLAN_REPORTS +
        '/' +
        ConstantsService.ROUTE_BROKER_WISE_SALES
    )
  }

  showBranchHandledByWiseSales = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_BRANCH_HANDLED_BY_WISE_DAILY_SALES
    )
  }

  showDocumentWiseData = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_DOCUMENT_WISE_DATA
    )
  }
  showBrokerWiseOutstanding = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_BROKER_WISE_OUTSTANDING
    )
  }

  showItemGroupWiseYearlySales = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_ITEM_GROUP_WISE_YEARLY_SALES
    )
  }

  showStatePartyYearlySales = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_STATE_PARTY_YEARLY_SALES
    )
  }

  showPartyWiseMonthlySalesAnalysis = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_PARTY_WISE_MONTHLY_SALES_ANALYSIS
    )
  }

  showPdcClctdPndngDpst = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_ACCOUNT_REPORTS +
        '/' +
        ConstantsService.ROUTE_PDC_CLCTD_PNDNG_DPST
    )
  }

  showPdcIssuedPndngClrnce = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_ACCOUNT_REPORTS +
        '/' +
        ConstantsService.ROUTE_PDC_ISSUED_PNDNG_CLRNCE
    )
  }

  showAccountLedger = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_ACCOUNT_REPORTS +
        '/' +
        ConstantsService.ROUTE_ACCOUNT_LEDGER
    )
  }

  showDailySalesWithGp = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_DAILY_SALES_WITH_GP
    )
  }

  showRhGrpMnthlyBdgtSls = (): void => {
    this.doNavigation(
      ConstantsService.ROUTE_SESSION +
        '/' +
        ConstantsService.ROUTE_REPORTS +
        '/' +
        ConstantsService.ROUTE_MONTHLY_SALES_ANALYSIS_REPORTS +
        '/' +
        ConstantsService.ROUTE_RH_GRP_MNTHLY_BDGT_SLS
    )
  }
}
