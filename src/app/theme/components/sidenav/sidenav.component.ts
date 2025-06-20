import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';  
import { Settings, SettingsService } from '../../../services/settings.service';
import { MenuService } from '../../../shared/components/menu/menu.service';
import { VerticalMenuComponent } from '../../../shared/components/menu/vertical-menu/vertical-menu.component';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppSettings } from '../../../app.settings';

@Component({
    selector: 'app-sidenav',
    imports: [
        FlexLayoutModule,
        NgScrollbarModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        VerticalMenuComponent,
        CommonModule,
    ],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  @ViewChild(VerticalMenuComponent) objVC: VerticalMenuComponent;
  public userImage = '../assets/img/users/user.jpg'
  public menuItems: Array<any>=[]
  public settings: Settings
  lstMenu:any=[]
  constructor(public appSettings: AppSettings, public menuService: MenuService,
    ) {
    this.settings = this.appSettings.settings
  }

  ngOnInit() {
   // console.log('side nav menuItems1')
    this.menuItems = this.menuService.getVerticalMenuItems() //Commented by Pratik Patel
    if(Number(VerticalMenuComponent.root_id)!=0){
      this.menuItems = VerticalMenuComponent.customMenu

      
    }
    else{
      this.menuItems = VerticalMenuComponent.aryAllMenu
    }
    //console.log('menuItems1',this.menuItems)
    //this.getUserMenuList();
  }  

  public closeSubMenus() {
    let menu = document.getElementById('vertical-menu')
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
}
