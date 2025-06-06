import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Settings, SettingsService } from './services/settings.service';
import { NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from "./feature/non-session/login/login.component";
// import { DailogBoxComponent } from './feature/session/master/miscellaneouse-master/make-master/components/dailog-box/dailog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DailogBoxComponent } from './feature/session/master/miscellaneouse-master/make-master/components/dailog-box/dailog-box.component';

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    NgClass,
    MatProgressSpinnerModule,
    LoginComponent,
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  settingsService = inject(SettingsService);
  settings: Settings = this.settingsService.settings;

  // readonly dialog = inject(MatDialog);
  // openDialog() {
  //   console.log('app component -- opendialog')
  //   this.dialog.open(DailogBoxComponent, {
  //     width: '500px',
  //     data: {
  //       animal: 'Dog',
  //       name: 'Sam'
  //     } 
  //   })
  //    console.log('app component -- opendialog2')
  // }
}
