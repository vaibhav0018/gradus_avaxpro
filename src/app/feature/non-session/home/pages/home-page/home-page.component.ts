import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../../../shared/services/i18n.service';
import { HomeService } from '../../home.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  title: string = 'Hello Home Page';
  payload: any = [];
  flg: string = 'Please Wait...';

  constructor(
    private i18nService: I18nService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: HomeService
  ) {}

  switchLanguage = (language: string) => {
    this.i18nService.switchLanguage(language);
  };

  ngOnInit() {
    console.log("home page");

    this.activatedRoute.queryParams.subscribe(params => {
      this.payload = {
        verify_code: params['VC'],
        csad_email_1: params['emailId'],
        cd_handled_by: params['handledbyCode'],
        cd_cust_draft_code: params['custCode'],
        userInformationDto: {
          usr_of_siscon: params['sisconCode'],
          usr_of_branch: params['branchCode'],
          usr_company_code: params['companyCode']
        }
      };

      this.service.getEmailVerified(this.payload).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.flg = 'YOUR EMAIL ID IS VERIFIED SUCCESSFULLY, THANK YOU';
        } else {
          this.flg = 'EMAIL VERIFICATION FAILED';
        }
      });
    });
  }

  close_tab() {
    if (window.top) {
      window.top.close();
    }
  }
}
