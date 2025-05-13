import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Settings } from '../../../app.settings.model';
import { AppSettings } from '../../../app.settings';
import { RouterService } from '../../../shared/services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonSnackbarComponent } from '../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { ChangePasswordService } from '../../session/master/miscellaneouse-master/change-password/change-password.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { VerticalMenuComponent } from '../../../shared/components/menu/vertical-menu/vertical-menu.component';
import { Login } from './login.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSidenavModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {


    form: FormGroup;
    txtType: string = 'password';
  
    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    onSubmit() {

      this.form.controls.username.value // Storing Username form value to object username
      this.form.value.password // Storing Password form value to object password


      const payload = {
        //'username': this.username.trim().toLowerCase(),
        usr_userid: this.form.controls.username.value,
        usr_password: this.form.value.password 
      }
      this.loginService.userLogin(payload).subscribe({
        next: (res) => {
        if (res.responseStatus === 'SUCCESS' && res.responseCode === 'RES_200') {4
          sessionStorage.setItem(btoa('token'), btoa('Bearer ' + res.token)); 
          sessionStorage.setItem(btoa('username'), btoa(res.usr_name)); 
          sessionStorage.setItem(btoa('userId'), btoa(res.userId));
          sessionStorage.setItem(btoa('username'), btoa(res.username));
          sessionStorage.setItem(btoa('fin_year_beg'), btoa(res.fin_year_beg));
          sessionStorage.setItem(btoa('fin_year_end'), btoa(res.fin_year_end));
          sessionStorage.setItem(btoa('fin_year_format'), btoa(res.fin_year_format));
          sessionStorage.setItem(btoa('usr_company_code'), btoa(res.usr_company_code));
          sessionStorage.setItem(btoa('usr_of_siscon'), btoa(res.usr_of_siscon));
          sessionStorage.setItem(btoa('usr_of_branch'), btoa(res.usr_of_branch));
          sessionStorage.setItem(btoa('usr_state_code'), btoa(res.usr_state_code));
          this.router.navigate(['/Dashboard']);
        }else{
          alert('Invalid Login');
        }
      },
      error: () =>alert("login failed")
      });

    }
  }

