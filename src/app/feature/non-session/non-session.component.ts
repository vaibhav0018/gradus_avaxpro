import { Component, OnInit } from '@angular/core';
import { Settings } from '@services/settings.service';
import { AppSettings } from '../../app.settings';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-non-session',
  imports: [RouterOutlet],
  templateUrl: './non-session.component.html',
  styleUrl: './non-session.component.scss'
})
export class NonSessionComponent implements OnInit {
  public settings: Settings

  constructor(public appSettings: AppSettings) {
  }
  // The constructor initializes the settings property with the appSettings.settings value.
  // The settings property is of type Settings, which is imported from the @services/settings.service module.
  // The constructor is called when an instance of the NonSessionComponent class is created.    

  ngOnInit() {}
}
