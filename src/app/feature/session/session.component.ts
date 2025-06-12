// iimport { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidenavComponent } from '../../theme/components/sidenav/sidenav.component';
import { FullScreenComponent } from '../../theme/components/fullscreen/fullscreen.component';
import { UserMenuComponent } from '../../theme/components/user-menu/user-menu.component';
import { BreadcrumbComponent } from '../../theme/components/breadcrumb/breadcrumb.component';
import { AppSettings } from '../../app.settings';
import { RouterService } from '../../shared/services/router.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantsService } from '../../core/services/constants.service';
import { CommonSnackbarComponent } from '../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoCardsService } from '../../pages/dashboard/info-cards/info-cards.service';
import { MatSelect } from '@angular/material/select';
import { Component,ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Settings } from '@services/settings.service';
import { Quick_Menu } from '../../pages/pages.component';
import { MenuService } from '../../shared/components/menu/menu.service';
@Component({
  selector: 'app-session',
  imports: [
        RouterOutlet,
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatRadioModule,
        FlexLayoutModule,
        NgScrollbarModule,
        SidenavComponent,
        FullScreenComponent,
        MatSelect,
        // FlagsMenuComponent,
        // ApplicationsComponent,
        // MessagesComponent,
        UserMenuComponent,
        // HorizontalMenuComponent,
        BreadcrumbComponent,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  @ViewChild('sidenav') sidenav: any
    @ViewChild('backToTop') backToTop: any
    @ViewChild('backToBottom') backToBottom: any
    settings: Settings
    menus = ['vertical', 'horizontal']
    menuOption: string
    menuTypes = ['default', 'compact', 'mini']
    menuTypeOption: string
    isStickyMenu: boolean = false
    lastScrollTop: number = 0
    showBackToTop: boolean = false
    toggleSearchBar: boolean = false
    private defaultMenu: string //declared for return default menu when window resized
    loggedInYear: string
    loggedInBranch: string
    userName: string = ''
    selectedMenu = '4'
    sidemenu_mode: MatDrawerMode = 'side';
    public showSidenav: boolean = false;
    public router: Router;
    
    form: FormGroup = this.formBuilder.group({});
    @ViewChild('divMain') private divMain: ElementRef;
    q_menu: Quick_Menu[] = [
      { value: '1', viewValue: 'Recently visited' },
      { value: '2', viewValue: 'Favourites' },
      { value: '3', viewValue: 'All Services' },
      { value: '4', viewValue: 'Dashboard' },
      { value: '5', viewValue: 'Party Query' },
      { value: '6', viewValue: 'Stock Query' },
      { value: '7', viewValue: 'Item Query' },
    ];
   
    constructor(
      private appSettings: AppSettings,
      private menuService: MenuService,
      private formBuilder: FormBuilder,
      private routerService: RouterService,
      private infoService: InfoCardsService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) {
      this.settings = this.appSettings.settings;
      this.loggedInBranch = atob(sessionStorage.getItem(btoa('usr_br_name')) || '') + " -" + atob(sessionStorage.getItem(btoa('usr_br_city')) || '')
      this.loggedInYear = atob(sessionStorage.getItem(btoa('fin_year_beg')) || '') + " - " + atob(sessionStorage.getItem(btoa('fin_year_end')) || '')
      this.userName = atob(sessionStorage.getItem(btoa('usr_name')) || '')
      this.form = this.formBuilder.group({
        cmbMenu: [''],
      })
    }
   
    ngOnInit() {
      let token = localStorage.getItem('loggedIn');
      console.log("token "+token);
      if(token == undefined) {
       this.openSnackBar("Please Login Again")
       this.router.navigate(['/non-session/login'])
      } else {
         //  this.form.controls['cmbMenu'].setValue('4');
      if (window.innerWidth <= 768) {
        this.settings.menu = 'vertical'
        this.settings.sidenavIsOpened = false
        this.settings.sidenavIsPinned = false
      }
      this.menuOption = this.settings.menu
      this.menuTypeOption = this.settings.menuType
      this.defaultMenu = this.settings.menu
      if (localStorage.getItem('selectedMenu') != undefined) {
        this.selectedMenu = localStorage.getItem('selectedMenu') || ''
      }
      }
    }
   
    ngAfterViewInit() {
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
        //console.log('pages menuItems1')
        this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems())
      }
    }
   
    public onPageScroll(event: any){  
      (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
      if(this.settings.menu == 'horizontal'){
        if(this.settings.fixedHeader){
          var currentScrollTop = (event.target.scrollTop > 56) ? event.target.scrollTop : 0;
          if(currentScrollTop > this.lastScrollTop){
            document.querySelector('#horizontal-menu')!.classList.add('sticky');
            event.target.classList.add('horizontal-menu-hidden');
          }
          else{
            document.querySelector('#horizontal-menu')!.classList.remove('sticky');
            event.target.classList.remove('horizontal-menu-hidden');
          }
          this.lastScrollTop = currentScrollTop;
        }
        else{
          if(event.target.scrollTop > 56){
            document.querySelector('#horizontal-menu')!.classList.add('sticky');
            event.target.classList.add('horizontal-menu-hidden');
          }
          else{
            document.querySelector('#horizontal-menu')!.classList.remove('sticky');
            event.target.classList.remove('horizontal-menu-hidden');
          }  
        }
      }
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
   
    public onPsScrollY(event : any) {
      event.target.scrollTop > 300
        ? (this.backToTop.nativeElement.style.display = 'flex')
        : (this.backToTop.nativeElement.style.display = 'none')
      if (this.settings.menu == 'horizontal') {
        if (this.settings.fixedHeader) {
          var currentScrollTop = event.target.scrollTop > 56 ? event.target.scrollTop : 0
          currentScrollTop > this.lastScrollTop
            ? (this.isStickyMenu = true)
            : (this.isStickyMenu = false)
          this.lastScrollTop = currentScrollTop
        } else {
          event.target.scrollTop > 56
            ? (this.isStickyMenu = true)
            : (this.isStickyMenu = false)
        }
      }
    }
   
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
   
    updateUserDefaultPage() {
      this.infoService.updateUserDefaultPage(this.selectedMenu).
        subscribe((data : any) => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          }
        })
    }
   
    openPage() {
     // console.log(' CAlling 22222 ', this.selectedMenu)
      // console.log( ' txtitemCode ',this.form.get('cmbMenu').value)
   
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
      }
      else if (this.selectedMenu == '7') {
        localStorage.setItem("selectedMenu", this.selectedMenu);
        this.itemQryView()
        //    this.routerService.showStockQuery()
      }
      else {
        localStorage.setItem("selectedMenu", this.selectedMenu);
        //this.router.navigate([ConstantsService.ROUTE_DASHBOARD +'/'+ ConstantsService.ROUTE_MENU])
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU]));
      }
      // if (this.form.get('cmbMenu').value== '4') {
      //   localStorage.setItem("selectedMenu", this.selectedMenu);
      //   this.routerService.showDashBoardPage()
      // }
      // else if (this.form.get('cmbMenu').value== '5') {
      //   localStorage.setItem("selectedMenu", this.selectedMenu);
      //   this.routerService.showPartyQuery()
      // }
      // else if (this.form.get('cmbMenu').value== '6') {
      //   localStorage.setItem("selectedMenu", this.selectedMenu);
      //   this.routerService.showStockQuery()
      // }
      // else if (this.form.get('cmbMenu').value== '7') {
      //   localStorage.setItem("selectedMenu", this.selectedMenu);
      //   this.itemQryView()
      //   //    this.routerService.showStockQuery()
      // }
      // else {
      //   localStorage.setItem("selectedMenu", this.selectedMenu);
      //   //this.router.navigate([ConstantsService.ROUTE_DASHBOARD +'/'+ ConstantsService.ROUTE_MENU])
      //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      //     this.router.navigate([ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU]));
      // }
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
      // const dialogRef = this.dialog.open(ItemQueryComponent, dialogConfig);
   
      // dialogRef.afterClosed().subscribe((res: any) => {
      //   if (res != true || res == 'true') {
   
      //   } // end of if
      // });
    }
   
    openPage1() {
     console.log(' CAlling 1111111 ', this.selectedMenu)
      // console.log( ' txtitemCode ',this.form.get('cmbMenu').value)
   
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
      }
      else if (this.selectedMenu == '7') {
        localStorage.setItem("selectedMenu", this.selectedMenu);
        this.itemQryView()
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
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([ConstantsService.ROUTE_DASHBOARD + '/' + ConstantsService.ROUTE_MENU]));
      }
   
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
      // const dialogRef = this.dialog.open(ViewUserInfoCompone, dialogConfig)
      // dialogRef.afterClosed().subscribe(item => {
      // })
    }
   
    openSnackBar(message : any) {
      this.snackBar.openFromComponent(CommonSnackbarComponent, {
        data: message,
        duration: 10000
      });
    }
   

}
