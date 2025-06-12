import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { DragulaModule } from 'ng2-dragula';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { LoginComponent } from "../../feature/non-session/login/login.component";
import { Settings } from '@services/settings.service';
import { AppSettings } from '../../app.settings';

@Component({
    selector: 'app-dashboard',
    imports: [
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    DragulaModule,
    InfoCardsComponent,

],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    // public icons = [ "home", "person", "alarm", "work", "mail", "favorite", "vaibhav"];
    // public colors = [ "accent", "primary", "warn", "warn-light", "accent-light", "primary-light" ];
    public settings: Settings
    constructor(public appSettings: AppSettings) {
      this.settings = this.appSettings.settings
    }
  
    ngOnInit() {}
  }

