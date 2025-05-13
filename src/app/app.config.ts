import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UsersData } from '@data/users-data';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; 
import { provideNativeDateAdapter } from '@angular/material/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpConfigInterceptor } from './core/interceptors/httpConfig.interceptor';
import { HttpService } from './core/services/http.service';





export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),  // comment this line for enable lazy-loading
    ), 
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    // importProvidersFrom(InMemoryWebApiModule.forRoot(UsersData, { delay: 1000 })),
    importProvidersFrom(CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })),
    { provide: OverlayContainer, useClass: CustomOverlayContainer },

    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true },
    
  ]
};

 