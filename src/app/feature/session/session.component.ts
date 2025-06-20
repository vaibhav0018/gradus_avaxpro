import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ViewChildren,
  QueryList,
  ElementRef,
  
} from '@angular/core'
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router'
//import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective, } from 'ngx-perfect-scrollbar'
import { AppSettings } from '../../app.settings'
import { Settings } from '../../app.settings.model'
import { MenuService } from '../../shared/components/menu/menu.service'
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterService } from '../../shared/services/router.service'
import { ConstantsService } from '../../core/services/constants.service'
import { MatDialog } from '@angular/material/dialog'
import { MatDialogConfig } from '@angular/material/dialog'
import { ItemQueryComponent } from './item-query/item-query.component'
import { ViewUserInfoComponent } from './user-information-view/view-user-info/view-user-info.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { matDrawerAnimations, MatDrawerMode } from '@angular/material/sidenav';  
import { V } from '@angular/cdk/keycodes'


@Component({
  selector: 'app-session',
  imports: [CommonModule,SharedMaterialModule, SidenavComponent, ReactiveFormsModule, RouterModule, FullScreenComponent, UserMenuComponent, BreadcrumbComponent],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [MenuService],
  standalone : true,
})
export class SessionComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any
  @ViewChild('backToTop') backToTop: any
  @ViewChild('backToBottom') backToBottom: any
 // @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>


  public type: string = 'component';

  public disabled: boolean = false;

  @ViewChild('divMain') private divMain: ElementRef;

  // public config: PerfectScrollbarConfigInterface = {};

  // @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  // @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

  settings: Settings
  menus = ['vertical', 'horizontal']
  menuOption: string
  menuTypes = ['default', 'compact', 'mini']
  menuTypeOption: string
  isStickyMenu: boolean = false
  lastScrollTop: number = 0
  public showBackToTop: boolean = true
  toggleSearchBar: boolean = false
  private defaultMenu: string //declared for return default menu when window resized
  loggedInYear: string
  loggedInBranch: string
  selectedMenu = '4'
  sidemenu_mode :MatDrawerMode = 'side'
  form: FormGroup = this.formBuilder.group({});
  userName: string = ''
  constructor(
    private appSettings: AppSettings,
    private router: Router,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private routerService: RouterService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.settings = this.appSettings.settings
    const branchName = sessionStorage.getItem(btoa('usr_br_name'));
    const branchCity = sessionStorage.getItem(btoa('usr_br_city'));
    this.loggedInBranch = (branchName ? atob(branchName) : '') + " -" + (branchCity ? atob(branchCity) : '');
    const finYearBeg = sessionStorage.getItem(btoa('fin_year_beg')) || '';
    const finYearEnd = sessionStorage.getItem(btoa('fin_year_end')) || '';
    this.loggedInYear = atob(finYearBeg) + " - " + atob(finYearEnd);
  }

  
  ngOnInit() {
    console.log("Session Component Init")
    let token = localStorage.getItem('loggedIn');
    console.log("token "+token);
    if(token == undefined) { 
     this.openSnackBar("Please Login Again")
     this.router.navigate(['/non-session/login'])
    } else {
      if (window.innerWidth <= 768) {
        this.settings.menu = 'vertical'
        this.settings.sidenavIsOpened = false
        this.settings.sidenavIsPinned = false
      }
      this.menuOption = this.settings.menu
      this.menuTypeOption = this.settings.menuType
      this.defaultMenu = this.settings.menu
  
      const encodedUserName = sessionStorage.getItem(btoa('usr_name'));
      this.userName = encodedUserName ? atob(encodedUserName) : '';
      this.loggedInBranch =
        atob(sessionStorage.getItem(btoa('usr_br_name')) || '') +
        ' -' +
        atob(sessionStorage.getItem(btoa('usr_br_city')) || '')
      this.loggedInYear =
        atob(sessionStorage.getItem(btoa('fin_year_beg')) || '') +
        ' - ' +
        atob(sessionStorage.getItem(btoa('fin_year_end')) || '')
  
      this.form = this.formBuilder.group({
        cmbMenu: [''],
      })
  
      if (localStorage.getItem('selectedMenu') != undefined) {
        this.selectedMenu = localStorage.getItem('selectedMenu') || ''
      }
    }
  }

  ngAfterViewInit() {
    console.log("Session Component After View Init")
    setTimeout(() => {
      this.settings.loadingSpinner = false
    }, 300)
    this.backToTop.nativeElement.style.display = 'none'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.settings.sidenavIsPinned) {
          this.sidenav.close()
        }
        if (window.innerWidth <= 768) {
          this.sidenav.close()
        }
      }
    })
    if (this.settings.menu == 'vertical') {
      //console.log('session menuItems1')
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems())
    }
  }

  
  openSnackBar(message :any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

  public chooseMenu() {
    this.settings.menu = this.menuOption
    this.defaultMenu = this.menuOption
    this.router.navigate(['/'])
  }

  public chooseMenuType() {
    this.settings.menuType = this.menuTypeOption
  }

  public changeTheme(theme : any) {
    this.settings.theme = theme
  }

  public toggleSidenav() {
    this.sidenav.toggle()
  }

  public closeSidenav() {
    this.sidenav.close()
  }

  // public onPsScrollY(event) {
  //   event.target.scrollTop > 10
  //     ? (this.backToTop.nativeElement.style.display = 'flex')
  //     : (this.backToTop.nativeElement.style.display = 'none')

  //   event.target.scrollTop > 10
  //     ? (this.backToBottom.nativeElement.style.display = 'none')
  //     : (this.backToBottom.nativeElement.style.display = 'flex')

  //   if (this.settings.menu == 'horizontal') {
  //     if (this.settings.fixedHeader) {
  //       var currentScrollTop = event.target.scrollTop > 56 ? event.target.scrollTop : 0
  //       currentScrollTop > this.lastScrollTop
  //         ? (this.isStickyMenu = true)
  //         : (this.isStickyMenu = false)
  //       this.lastScrollTop = currentScrollTop
  //     } else {
  //       event.target.scrollTop > 56
  //         ? (this.isStickyMenu = true)
  //         : (this.isStickyMenu = false)
  //     }
  //   }
  // }

  public scrollToTop() {
    // this.pss.forEach(ps => {
    //   if (
    //     ps.elementRef.nativeElement.id == 'main' ||
    //     ps.elementRef.nativeElement.id == 'main-content'
    //   ) {
    //     ps.scrollToTop(0, 250)
    //   }
    // })

    try {
      this.divMain.nativeElement.scrollTop = 0;
      this.backToTop.nativeElement.style.display = 'none'
      this.backToBottom.nativeElement.style.display = 'flex'
    } catch(err) { } 
  }

  public scrollToBottom() {
    // this.pss.forEach(ps => {
    //   if (
    //     ps.elementRef.nativeElement.id == 'main' ||
    //     ps.elementRef.nativeElement.id == 'main-content'
    //   ) {
    //     ps.scrollToBottom(0, 250)
    //   }
    // })
    try {
      this.divMain.nativeElement.scrollTop = this.divMain.nativeElement.scrollHeight;
      this.backToBottom.nativeElement.style.display = 'none'
      this.backToTop.nativeElement.style.display = 'flex'
    } catch(err) { } 
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 768) {
      this.settings.sidenavIsOpened = false
      this.settings.sidenavIsPinned = false
      this.settings.menu = 'vertical'
    } else {
      this.defaultMenu == 'horizontal'
        ? (this.settings.menu = 'horizontal')
        : (this.settings.menu = 'vertical')
      this.settings.sidenavIsOpened = false
      this.settings.sidenavIsPinned = false
    }
  }

  funcVoid() {

  }

  public closeSubMenus() {
    let menu = document.querySelector('.sidenav-menu-outer')
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i]
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded')
            child.children[1].classList.remove('show')
          }
        }
      }
    }
  }

  // updateUserDefaultPage() {
  //   this.infoService.updateUserDefaultPage(this.selectedMenu).
  //     subscribe(data => {
  //       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
  //       }
  //     })
  // }

  openPage() {
    //this.updateUserDefaultPage();
    if (this.selectedMenu == '4') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      this.routerService.showDashBoardPage()
    }
    else if (this.selectedMenu == '5') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      this.routerService.showPartyQuery()
    }
    else if (this.selectedMenu == '6') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      this.routerService.showStockQuery()
    } else if (this.selectedMenu == '7') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      this.itemQryView();
      //    this.routerService.showStockQuery()
    }
    else if (this.selectedMenu == '8') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
     this.routerService.showStoppageView()
    }else if (this.selectedMenu == '9') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      this.getUserInformation();
    }
    else {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      //this.router.navigate([ConstantsService.ROUTE_DASHBOARD +'/'+ ConstantsService.ROUTE_MENU])
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU]));
    }
  }

  itemQryView() {
    let element = {}
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '780px'
    dialogConfig.minWidth = '80%',
      dialogConfig.height = '390px',
      // dialogConfig.width = '95%',
      // dialogConfig.minWidth = '95%',
      // dialogConfig.height = '90%',
      dialogConfig.maxHeight = '200vh',
      dialogConfig.disableClose = true,
      dialogConfig.autoFocus = true,
      dialogConfig.data = {
        // data: element,
        // partydtl: this.cmbAccCode + '::' + '',
        // clearSingleStoppageFlg: true,
      }
    const dialogRef = this.dialog.open(ItemQueryComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res != true || res == 'true') {

      } // end of if
    });
  }

  getUserInformation() {
    let element = {}
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '75%',
      dialogConfig.minWidth = '75%',
      dialogConfig.height = '70%',
      dialogConfig.maxHeight = '200vh',
      dialogConfig.disableClose = true,
      dialogConfig.autoFocus = true,
      dialogConfig.data = {
        id: 1,
        title: "User Information"
      }
    const dialogRef = this.dialog.open(ViewUserInfoComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(item => {
    })
  }

}
import { CommonSnackbarComponent } from '../../shared/components/common-snackbar/common-snackbar/common-snackbar.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatRadioModule } from '@angular/material/radio'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { SidenavComponent } from '../../theme/components/sidenav/sidenav.component'
import { FullScreenComponent } from '../../theme/components/fullscreen/fullscreen.component'
import { MatSelect } from '@angular/material/select'
import { UserMenuComponent } from '../../theme/components/user-menu/user-menu.component'
import { BreadcrumbComponent} from '../../theme/components/breadcrumb/breadcrumb.component'
import { MatOptionModule } from '@angular/material/core'
import { CommonModule } from '@angular/common'
import { SharedMaterialModule } from '../../shared/share-material'

