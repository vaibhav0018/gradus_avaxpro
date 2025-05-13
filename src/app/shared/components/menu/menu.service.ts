import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Menu } from './menu.model'
import { verticalMenuItems, horizontalMenuItems } from './menu'
import { HttpService } from '../../../core/services/http.service'

import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceResponseModel } from '../../../core/models/HttpServiceResponseModel'


const GET_USER_MENU = 'get-user-menu-list'
const GET_FAVOURITE_MENU = 'get-favourite-menu'
const DELETE_FAVOURITE_MENU = 'delete-favourite-menu'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  payload: any = {}
  completeUrl: string
  menuItems: Array<Menu>
  lstMenu: any = [];
  
  constructor(private httpService: HttpService,
  private location: Location) { }


  public getVerticalMenuItems(): Array<Menu> {
    console.log('MenuService.getVerticalMenuItems')
    //return verticalMenuItems
    //this.menuItems = this.getUserSortedMenuList()
    return this.menuItems
  }



  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems
  }

  getUserSortedMenuList(): Array<Menu> {
    let company_code = atob(sessionStorage.getItem(btoa('usr_company_code')) || '')
    this.getUserMenuList({
      company_code: company_code,
      user_id: atob(sessionStorage.getItem(btoa('userId')) || ''),
    }).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        data.responseData[0].map((item: any) => {
          if (item.level == 1) {
            let aryLevel1 = (JSON.parse(item.json_data)[0])

            let ary = aryLevel1.child
            let sorted_ary = ary.sort(function (a: any, b: any) {
              return Number(a.serial_no) - Number(b.serial_no);
            });
            aryLevel1.child = sorted_ary

            //let aryLevel1 = (JSON.parse(item.json_data)[0])
            aryLevel1.ugm_allow = item.ugm_allow
            let i_index = 0
            aryLevel1['child'].forEach((element: any) => {
              let objChild = data.responseData[0].find(({ gm_id }: any) => gm_id == element.id);
              if (objChild != undefined && objChild != null && (JSON.parse(objChild.json_data) != null)) {
                element.child = (JSON.parse(objChild.json_data)[0])
              }
              else {
                aryLevel1['child'][i_index].child = element
              }
              i_index++;
            });
            this.lstMenu.push(aryLevel1)
          }
        })


        this.lstMenu.forEach((element: any) => {
          if (element.ugm_allow == 'Y') {
            this.menuItems.push(new Menu(
              Number(element.id),
              element.name,
              element.gm_url,
              null,
              'menu',
              null,
              true,
              0
            ))
            element.child.forEach((subrow: any) => {
              if (subrow.ugm_allow == 'Y') {
                if (this.isIterable(subrow.child.child)) {
                  this.menuItems.push(new Menu(
                    Number(subrow.id),
                    subrow.name,
                    subrow.gm_url,
                    null,
                    'view_module',
                    null,
                    true,
                    Number(element.id)
                  ))

                  subrow.child.child.forEach((level2: any) => {
                    if (level2.ugm_allow == 'Y') {
                      this.menuItems.push(new Menu(
                        Number(level2.id),
                        level2.name,
                        level2.gm_url,
                        null,
                        'view_module',
                        null,
                        false,
                        Number(subrow.id)
                      ))
                    }
                  });
                }
                else {
                  this.menuItems.push(new Menu(
                    Number(subrow.id),
                    subrow.name,
                    subrow.gm_url,
                    null,
                    'view_module',
                    null,
                    false,
                    Number(element.id)
                  ))
                }
              }
            });
          }
        });

        //console.log('menuItems',this.menuItems)
      }
    },
      error => {
        console.log(error)
      })
    return this.menuItems
  }

  isIterable(obj: any) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let url = this.location.path()
    let routerLink = url // url.substring(1, url.length);
    let activeMenuItem = menu.filter(item => item.routerLink === routerLink)
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0]
      while (menuItem.parentId != 0) {
        let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0]
        menuItem = parentMenuItem
        this.toggleMenuItem(menuItem.id)
      }
    }
  }

  public toggleMenuItem(menuId: any) {
    let menuItem: any = document.getElementById('menu-item-' + menuId)
    let subMenu = document.getElementById('sub-menu-' + menuId)
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show')
        menuItem.classList.remove('expanded')
      } else {
        subMenu.classList.add('show')
        menuItem.classList.add('expanded')
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId: any) {
    let currentMenuItem = menu.filter(item => item.id == menuId)[0]
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id)
          let menuItem: any = document.getElementById('menu-item-' + item.id)
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show')
              menuItem.classList.remove('expanded')
            }
          }
        }
      })
    }
  }

  getUserMenuList(param: any): Observable<any> {
    this.menuItems = []
    this.menuItems.push(new Menu(1, 'Dashboard', '/template_home/', null, 'dashboard', null, false, 0))
    this.completeUrl = environment.baseUrl + '/' + GET_USER_MENU
    this.payload = {
      company_code: param.company_code,
      user_id: param.user_id,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
      },
    }

    if(param.gm_id!=undefined && Number(param.gm_id)>0){
      this.payload.gm_id=param.gm_id
    }
    console.log('pp',this.payload)
    return this.httpService.post_wo_spinner(this.completeUrl, this.payload).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //console.log(res)
        return res['payload']
      })
    )
  }

  getFavouriteMenu(param: any ): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + GET_FAVOURITE_MENU
    this.payload = {
      company_code: param.company_code,
      user_id: param.user_id,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''), 
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),

      },
    }
    return this.httpService.post(this.completeUrl, { common_row: this.payload }).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //console.log(res)
        return res['payload']
      })
    )
  }

  deleteFavourite(param: any): Observable<any> {
    this.completeUrl = environment.baseUrl + '/' + DELETE_FAVOURITE_MENU
    this.payload = {
      company_code: param.company_code,
      user_id: param.user_id,
      gm_id: param.gm_id,
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''), 
        usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),

      },
    }
    return this.httpService.post(this.completeUrl, { common_row: this.payload }).pipe(
      map((res: HttpServiceResponseModel) => {
        res['payload'] = res
        //console.log(res)
        return res['payload']
      })
    )
  }

  

}
