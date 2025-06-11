import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core' //npm install @ngx-translate/core @ngx-translate/http-loader --legacy-peer-deps

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en')
    this.translate.use('en')
  }
  switchLanguage = (language: string) => {
    this.translate.use(language)
  }
}
