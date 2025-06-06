import { EventEmitter, Injectable } from '@angular/core'
import { Event, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

export interface NavItem {
  displayName: string
  disabled?: boolean
  iconName: string
  route?: string
  children?: NavItem[]
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public appDrawer: any
  public currentUrl = new BehaviorSubject<string>('')

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects)
      }
    })
  }

  public closeNav() {
    this.appDrawer.close()
  }

  public openNav() {
    this.appDrawer.open()
  }
}
