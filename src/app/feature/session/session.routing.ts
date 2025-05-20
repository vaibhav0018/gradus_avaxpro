import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SessionComponent } from './session.component'
import { ConstantsService } from '../../core/services/constants.service'
import { ConstantsServiceAvaxPro } from '../../core/services/constants_avaxpro.service'

export const SessionRoutes: Routes = [
  {
    path: '',
    component: SessionComponent,
    data: { breadcrumb: 'Session' },
  },

  {
    path: ConstantsServiceAvaxPro.ROUTE_MASTER,
    loadChildren: () => import('./master/master-routing.routes').then(m => m.MasterRoutingModule),
    data: { breadcrumb: 'Session' },
  }


]
