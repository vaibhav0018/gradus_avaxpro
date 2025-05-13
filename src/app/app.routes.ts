import { Routes } from '@angular/router';
import { ConstantsService } from './core/services/constants.service';
import { A } from '@angular/cdk/keycodes';
import { AppComponent } from './app.component';
import { LoginComponent } from './feature/non-session/login/login.component';

export const routes: Routes = [
    // // {
    // //     path: '', 
    // //     component: AppComponent,
    // // },

    // {
    //     path: '',
    //     loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
    // },

    // { 
    //     path: 'login', 
    //     loadComponent: () => import('./feature/non-session/login/login.component').then(c => c.LoginComponent),
    // },
    // {
    //     path: ConstantsService.ROUTE_NON_SESSION,
    //     loadChildren: () => import('./feature/non-session/non-session.routing').then(p => p.NonSessionRoutingModule)
    // },

    // { 
    //     path: 'landing', 
    //     loadComponent: () => import('./pages/landing/landing.component').then(c => c.LandingComponent),
    // },

    // { 
    //     path: 'register', 
    //     loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
    // },
    // { 
    //     path: 'error', 
    //     loadComponent: () => import('./pages/errors/error/error.component').then(c => c.ErrorComponent),
    //     data: { breadcrumb: 'Error' }  
    // },
    // { 
    //     path: '**', 
    //     loadComponent: () => import('./pages/errors/not-found/not-found.component').then(c => c.NotFoundComponent)  
    // }

    // { path: 'login', component: LoginComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    // { path: 'heroes', component: HeroesComponent, canActivate: [authGuard] },
    // { path: 'detail/:id', component: HeroDetailComponent, canActivate: [authGuard] }

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    
    {
        path: 'Dashboard',
        // loadChildren: () => import('../app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
    },
];




