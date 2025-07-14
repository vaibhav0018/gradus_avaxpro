import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-custom-spinner',
  imports: [ NgxSpinnerModule],
  standalone: true,
  templateUrl: './custom-spinner.component.html',
  styleUrl: './custom-spinner.component.scss'
})
export class CustomSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
