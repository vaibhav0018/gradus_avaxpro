import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-non-session',
  imports: [],
  templateUrl: './non-session.component.html',
  styleUrl: './non-session.component.scss'
})
export class NonSessionComponent implements OnInit {
  public settings: Settings

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings
  }

  ngOnInit() {}
}

