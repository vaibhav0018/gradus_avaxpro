import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../home.service';
import { Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unsubscribed-email',
  imports: [CommonModule,MatIconModule],
  templateUrl: './unsubscribed-email.component.html',
  styleUrl: './unsubscribed-email.component.scss'
})
export class UnsubscribedEmailComponent implements OnInit {
  payload: any = [];
  msg: string = 'PLEASE WAIT';
  flg: string;

  constructor(
      @Inject(HomeService) private service: HomeService,
      private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    console.log('unsubscribe-email');

    this.activatedRoute.queryParams.subscribe(params => {
      this.payload = {
        cs_cust_supplr_code: params['cust_code'],
        company_code: params['company_code']
      };

      console.log('payload =>', this.payload);

      this.service.emailUnsubscribed(this.payload).subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.msg = data.message;
          this.flg = 's';
        } else {
          this.msg = data.message;
          this.flg = 'f';
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