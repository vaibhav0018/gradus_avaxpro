import { Injectable } from '@angular/core'
import { Settings } from './app.settings.model'

@Injectable({
  providedIn: 'root'
})
export class AppSettings {
  public settings = new Settings(
    'avaxPRO', // theme name
    true, // loadingSpinner
    true, // fixedHeader
    false, // sidenavIsOpened
    false, // sidenavIsPinned
    true, // sidenavUserBlock
    'vertical', // horizontal , vertical
    'default', // default, compact, mini
    'indigo-light', // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false, // true = rtl, false = ltr
    false  // hasFooter
  )
}