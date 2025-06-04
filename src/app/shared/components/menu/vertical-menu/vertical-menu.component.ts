import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from '../menu.service';
import { Settings, SettingsService } from '../../../../services/settings.service';
import { Menu } from '../../../../common/models/menu.model';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppSettings } from '../../../../app.settings';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-vertical-menu',
    providers: [MenuService],
    imports: [
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    standalone: true,
    templateUrl: './vertical-menu.component.html',
    styleUrls: ['./vertical-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
// export class VerticalMenuComponent implements OnInit {
//   @Input('menuItems') menuItems: Menu[];
//   @Input('menuParentId') menuParentId: any;
//   @Output() onClickMenuItem:EventEmitter<any> = new EventEmitter<any>();
//   parentMenu:Array<any>;
//   public settings: Settings;
//   static flgLoadMenu: boolean;
//   static root_id: number;
//   static lstMenu: never[];
//   static aryAllMenu: never[];
//   constructor(public settingsService: SettingsService, public menuService:MenuService, public router:Router) { 
//     this.settings = this.settingsService.settings;
//   }

//   ngOnInit() {     
//     this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);  
//   }
  

//   ngAfterViewInit(){
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         if(this.settings.fixedHeader){
//           let mainContent = document.getElementById('main-content');
//           if(mainContent){
//             mainContent.scrollTop = 0;
//           }
//         }
//         else{
//           document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
//         }
//       }                
//     });
//   }

//   onClick(menuId: any){
//     this.menuService.toggleMenuItem(menuId);
//     this.menuService.closeOtherSubMenus(this.menuItems, menuId);
//     this.onClickMenuItem.emit(menuId);     
//   }

// }

//-----------------------------------------------------------------------------------------------------------------//

export class VerticalMenuComponent implements OnInit {
  @Input('menuItems') menuItems: any[]
  @Input('menuParentId') menuParentId: number
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>()
  parentMenu: Array<any>
  static customMenu: Array<any>
  static aryAllMenu: Array<any>
  public settings: Settings;
  static lstMenu: any = []
  static flgLoadMenu: boolean = true
  lstRecentMenu: any = []
  static root_id: any = 0
  lstFav: any = []
  lstRecent: any = []

  constructor(
    private objMenuService: MenuService,
    private appSettings: AppSettings,
    private menuService: MenuService,
    private router: Router
  ) {
    this.settings = this.appSettings.settings
  }

  ngOnInit() {
    // this.getFavouriteMenu()
    if (VerticalMenuComponent.flgLoadMenu) {
      console.log('1')
      this.getUserMenuList(VerticalMenuComponent.root_id);
      this.parentMenu = this.menuItems.filter((item: { parentId: any; }) => item.parentId == this.menuParentId)
    }
    else {
      if(Number(VerticalMenuComponent.root_id)!=0){
        console.log('2')
        this.menuItems = VerticalMenuComponent.customMenu
        this.parentMenu = VerticalMenuComponent.customMenu.filter(item => item.parentId == this.menuParentId)
      }
      else{
        console.log('3')
        this.parentMenu = this.menuItems.filter((item: { parentId: any; }) => item.parentId == this.menuParentId)
      }
    }
  }

  ngOnChanges() {

  }


  getUserMenuList(params: any) {
    console.log('inside getUserMenuList');
  
    this.menuItems = [];
    this.menuItems.push(new Menu(1, 'Dashboard', '/template_home/', null, 'dashboard', null, false, 0));
  
    let company_code = sessionStorage.getItem(btoa('usr_company_code'));
    company_code = company_code ? atob(company_code) : '';
    console.log('company_code', company_code);
    console.log('user_id', atob(sessionStorage.getItem(btoa('userId')) || ''));
    console.log('gm_id', VerticalMenuComponent.root_id);
  
    this.menuService.getUserMenuList({
      company_code: company_code,
      user_id: atob(sessionStorage.getItem(btoa('userId')) || ''),
      gm_id: VerticalMenuComponent.root_id
    }).subscribe({
      next: (data) => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          VerticalMenuComponent.flgLoadMenu = false;
  
          data.responseData[0].map((item: any) => {
            if (item.level == 1 && item.json_data && item.json_data !== 'null') {
              let aryLevel1 = JSON.parse(item.json_data)[0];
              let ary = aryLevel1.child;
  
              let sorted_ary = ary.sort((a: any, b: any) => Number(a.serial_no) - Number(b.serial_no));
              aryLevel1.child = sorted_ary;
  
              let i_index = 0;
              aryLevel1.child.forEach((element: any) => {
                let objChild = data.responseData[0].find(({ gm_id }: { gm_id: any }) => gm_id == element.id);
                if (objChild && objChild.json_data && objChild.json_data !== 'null') {
                  element.child = JSON.parse(objChild.json_data)[0];
  
                  let aryx = element.child.child;
                  let sorted_aryx = aryx.sort((a: any, b: any) => Number(a.serial_no) - Number(b.serial_no));
                  element.child.child = sorted_aryx;
                } else {
                  aryLevel1.child[i_index].child = element;
                }
                i_index++;
              });
  
              VerticalMenuComponent.lstMenu.push(aryLevel1);
            }
          });
  
          VerticalMenuComponent.lstMenu.forEach((element: any) => {
            this.menuItems.push(new Menu(
              Number(element.id),
              element.name,
              element.gm_url,
              null,
              'menu',
              null,
              true,
              0
            ));
  
            element.child.forEach((subrow: any) => {
              if (this.isIterable(subrow.child?.child)) {
                this.menuItems.push(new Menu(
                  Number(subrow.id),
                  subrow.name,
                  subrow.gm_url,
                  null,
                  'view_module',
                  null,
                  true,
                  Number(element.id)
                ));
  
                subrow.child.child.forEach((level2: any) => {
                  this.menuItems.push(new Menu(
                    Number(level2.id),
                    level2.name,
                    level2.gm_url,
                    null,
                    'view_module',
                    null,
                    false,
                    Number(subrow.id)
                  ));
                });
              } else {
                this.menuItems.push(new Menu(
                  Number(subrow.id),
                  subrow.name,
                  subrow.gm_url,
                  null,
                  'view_module',
                  null,
                  false,
                  Number(element.id)
                ));
              }
            });
          });
  
          if (Number(VerticalMenuComponent.root_id) === 0) {
            VerticalMenuComponent.aryAllMenu = this.menuItems;
          }
  
          this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);
        }
      },
      error: (error) => {
        console.error('Error in getUserMenuList:', error);
      }
    });
  }
  

  isIterable(obj : any) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          let mainContent = document.getElementById('main-content')
          if (mainContent) {
            mainContent.scrollTop = 0
          }
        } else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0
        }
      }
    })
  }

  getFavouriteMenu(){
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.objMenuService.getFavouriteMenu({
      company_code: company_code,
      user_id: atob(sessionStorage.getItem(btoa('userId')) || ''),
    }).subscribe((data : any) => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        //console.log('lstMenu',this.lstMenu)
        this.lstFav = data.responseData[0]
        this.lstRecent = data.responseData[1]
      }
    },
      ( error: any) => {
        console.log(error)
      })
  }

  findRoot(selected_id: any): any {

    let parent = this.menuItems.find(c => c.id == selected_id);
    if (parent != undefined && Number(parent.parentId) != 0) {
      return this.findRoot(parent.parentId)
    }
    else {
      return selected_id
    }
  }
  onClick(menu : any) {
    if (sessionStorage.getItem("recent_menu") != null) {
      let stateDataStr = sessionStorage.getItem("recent_menu");
      this.lstRecentMenu = stateDataStr ? JSON.parse(stateDataStr) : []
    }    
    // let parent = this.menuItems.find(c => c.id == menu.id);

    // if (parent.hasSubMenu == false) {
    //   let current_root = this.findRoot(menu.id)
    //   // if(VerticalMenuComponent.root_id!=current_root){
    //   VerticalMenuComponent.root_id = current_root
    //   //   VerticalMenuComponent.flgLoadMenu=true  
    //   // }
    //   this.menuItems = []

    //   VerticalMenuComponent.lstMenu.forEach(element => {
    //     if (element.id == VerticalMenuComponent.root_id) {
    //       this.menuItems.push(new Menu(
    //         Number(element.id),
    //         element.name,
    //         element.gm_url,
    //         null,
    //         'menu',
    //         null,
    //         true,
    //         0
    //       ))
    //       element.child.forEach(subrow => {
    //         if (this.isIterable(subrow.child.child)) {
    //           this.menuItems.push(new Menu(
    //             Number(subrow.id),
    //             subrow.name,
    //             subrow.gm_url,
    //             null,
    //             'view_module',
    //             null,
    //             true,
    //             Number(element.id)
    //           ))
    //           subrow.child.child.forEach(level2 => {
    //             this.menuItems.push(new Menu(
    //               Number(level2.id),
    //               level2.name,
    //               level2.gm_url,
    //               null,
    //               'view_module',
    //               null,
    //               false,
    //               Number(subrow.id)
    //             ))
    //           });
    //         }
    //         else {
    //           this.menuItems.push(new Menu(
    //             Number(subrow.id),
    //             subrow.name,
    //             subrow.gm_url,
    //             null,
    //             'view_module',
    //             null,
    //             false,
    //             Number(element.id)
    //           ))
    //         }
    //       });
    //     }
    //   });

    //   this.menuItems.push(new Menu(2, 'Recent', '/template_home/', null, 'dashboard', null, true, 0))
    //   this.lstRecent.forEach(element => {
    //     this.menuItems.push(new Menu(
    //       Number(element.gm_id),
    //       element.gm_name,
    //       element.gm_url,
    //       null,
    //       'view_module',
    //       null,
    //       false,
    //       2
    //     ))
    //   }
    //   );
    //   this.menuItems.push(new Menu(3, 'Favourite', '/template_home/', null, 'dashboard', null, true, 0))
    //   this.lstFav.forEach(element => {
    //     this.menuItems.push(new Menu(
    //       Number(element.gm_id),
    //       element.gm_name,
    //       element.gm_url,
    //       null,
    //       'view_module',
    //       null,
    //       false,
    //       3
    //     ))
    //   })
      // this.parentMenu = []
      // VerticalMenuComponent.customMenu = this.menuItems
      // this.parentMenu = VerticalMenuComponent.customMenu.filter(item => item.parentId == VerticalMenuComponent.root_id)
    //}

    
    /*
    if(Number(VerticalMenuComponent.root_id)!=0){
      //this.expandMenu(VerticalMenuComponent.root_id)
    }
    else{
      this.toggleMenuItem(menu.id)
    }
    */
    // this.expandMenu(menu.id)
    // console.log('menu.id', menu.id)
    this.toggleMenuItem(menu.id);

    this.closeOtherSubMenus(this.menuItems, menu.id)

    this.onClickMenuItem.emit(menu.id)
    // console.log('menuid' ,menu.id)
    // console.log('menu.routerLink', menu.routerLink)
    // console.log('menu.target', menu.target)
    // console.log('menu.parentId', menu.parentId)

    // this.utility.addToRecent({
    //   company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
    //   user_id: atob(sessionStorage.getItem(btoa('userId'))),
    //   gm_id: menu.id
    // }).subscribe(data => {
    //   if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
    //     //this.getFavouriteMenu()
    //     //this.openSnackBar('Menu Added to Favourite.')
    //   }
    // })
    sessionStorage.setItem("current_page", JSON.stringify({ 'id': menu.id, 'routerLink': menu.routerLink, 'title': menu.title }));
    console.log('menuid', menu.id)
    localStorage.setItem('selectedMenu', "4");
  }

  public expandMenu(menuId: number) {
    let menuItem = document.getElementById('menu-item-' + menuId)
    let subMenu = document.getElementById('sub-menu-' + menuId)
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        // subMenu.classList.remove('show')
        // menuItem.classList.remove('expanded')
      } else {
        subMenu.classList.add('show')
        menuItem!.classList.add('expanded')
      }
    }
    else {
      menuItem!.classList.add('expanded')
    }
  }

  public toggleMenuItem(menuId: number) {
    let menuItem = document.getElementById('menu-item-' + menuId)
    let subMenu = document.getElementById('sub-menu-' + menuId)
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show')
        menuItem!.classList.remove('expanded')
      } else {
        subMenu.classList.add('show')
        menuItem!.classList.add('expanded')
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId: number) {
    let currentMenuItem = menu.filter(item => item.id == menuId)[0]
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id)
          let menuItem = document.getElementById('menu-item-' + item.id)
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show')
              menuItem!.classList.remove('expanded')
            }
          }
        }
      })
    }
  }
}
