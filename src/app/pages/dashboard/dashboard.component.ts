import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { DragulaModule } from 'ng2-dragula';
import { InfoCardsComponent } from './info-cards/info-cards.component';

@Component({
    selector: 'app-dashboard',
    imports: [
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    AnalyticsComponent,
    DiskSpaceComponent,
    TodoComponent,
    DragulaModule,
    InfoCardsComponent
],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public icons = [ "home", "person", "alarm", "work", "mail", "favorite", "vaibhav"];
    public colors = [ "accent", "primary", "warn", "warn-light", "accent-light", "primary-light" ];


}
