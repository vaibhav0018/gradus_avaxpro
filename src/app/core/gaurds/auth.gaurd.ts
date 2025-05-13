import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // const token = localStorage.getItem(btoa('token'))
    // if (!token) {
    //   this.router.navigate(['/login'])
    //   return false
    // }
    // return true

    const token = sessionStorage.getItem(btoa('token'))
    if (!token) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = sessionStorage.getItem(btoa('token'))
    if (!token) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
  // CanActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   const token = (localStorage.getItem(btoa('token')));
  //   if (!token) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }
}

