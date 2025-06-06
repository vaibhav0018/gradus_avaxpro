import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ConstantsService } from './services/constants.service'
import { SharedModule } from '../shared/shared.module'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { AuthGuard } from './gaurds/auth.gaurd'
import { HttpService } from './services/http.service'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
//import { HttpConfigInterceptor } from './interceptors/httpConfig.interceptor'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatSpinner } from '@angular/material/progress-spinner'

const CORE_SERVICES = [ConstantsService, AuthGuard, HttpService]

const CORE_COMPONENTS = [HeaderComponent, FooterComponent]

@NgModule({
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,

    // App Imports
    SharedModule,
    OverlayModule,
  ],
  providers: [
    CORE_SERVICES,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true },
  ],
  exports: [CORE_COMPONENTS],
  declarations: [],
})
export class CoreModule {}