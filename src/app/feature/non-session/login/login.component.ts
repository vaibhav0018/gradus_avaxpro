import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppSettings } from '../../../app.settings';
import { LoginService } from './login.service';
import { Settings } from '../../../app.settings.model'
import { RouterService } from '../../../shared/services/router.service';
import { VerticalMenuComponent } from '../../../shared/components/menu/vertical-menu/vertical-menu.component';
import { ChangePasswordService } from '../../session/master/miscellaneouse-master/change-password/change-password.service';
import { CommonSnackbarComponent } from '../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Menu } from '../../../common/models/menu.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone : true,
  imports: [CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup
  loading = false
  submitted = false
  errorMsg = ''
  username = ''
  password = ''
  settings: Settings
  companyLogo = './assets/img/users/logo.png';
  menuItems: Array<Menu>
  selectedMenu = '4'
  loggedIn = 'true'
  txtType = 'password'
  flgPwdChange:boolean=false
  router: any;
  constructor(
    private appSettings: AppSettings,
    private fb: FormBuilder,
    private loginService: LoginService,
    private routerService: RouterService,
    private snackBar: MatSnackBar,
    private service: ChangePasswordService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.settings = this.appSettings.settings
  }

  ngOnInit() {
    console.log('login component')
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, null])],
      password: [null, Validators.compose([Validators.required, null])],
      txtNewPassword: [],
      txtConfirmPassword: [],
    })
  }

  errorMessage() {
    this.errorMsg = ''
  }
 

  public onSubmit(): void {
    this.submitted = true;
    this.errorMsg = '';
  
    if (this.form.invalid) {
      console.warn('Form is invalid');
      this.openSnackBar('Invalid Credentials.');
      return;
    }
  
    this.username = this.form.value.username;
    this.password = this.form.value.password;
  
    const payload = {
      usr_userid: this.username.trim(),
      usr_password: this.password
    };
  
    console.log('Calling userLogin() with payload:', payload);

    if (this.form.valid) {
      console.log('Form is valid'); 
      this.loginService.userLogin(payload).subscribe({
        next: (data) => {
          console.log('API raw response:', data);
          console.log('Status:', data.responseStatus);
          console.log('Code:', data.responseCode);
    
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            console.log('SUCCESS block entered');
    
            if (data.responseData[0].pwd_change !== undefined && data.responseData[0].pwd_change === 'Y') {
              console.log('Password change required');
              this.flgPwdChange = true;
            } else {
              console.log('No password change; proceeding to dashboard');
              this.flgPwdChange = false;
              this.openSnackBar('Login Successful.');
              VerticalMenuComponent.flgLoadMenu = true;
              VerticalMenuComponent.root_id = 0;
              VerticalMenuComponent.lstMenu = [];
              VerticalMenuComponent.aryAllMenu = [];
              this.storeDataTosessionStorage(data.responseData[0]);
              this.getUserPreference();
            }
          } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            console.warn('FAILURE block hit: Invalid login');
            this.openSnackBar(data.message);
          } else {
            console.warn('Unexpected response status or code:', data.responseStatus, data.responseCode);
            this.openSnackBar('Unexpected response from server.');
          }
        },
        error: (error) => {
          console.error('Error during login request:', error);
          this.loading = false;
          this.openSnackBar('Network or server error during login.');
        },
        complete: () => {
          console.log('Login request completed.');
        }
      });
  }else
    {
      console.warn('Form is invalid');
      this.openSnackBar('Invalid Credentials.');
    }
}
  

  // Removed invalid console.log statement not working 
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });console.log('login component -- onsubmit 123' )
  }


  ngAfterViewInit() {
    this.settings.loadingSpinner = false
    console.log('login component -- ngAfterViewInit')
  }

  openPage() {
    console.log('login component -- openpage' )
    //this.updateUserDefaultPage();
    let redirect=''
    this.activatedRoute.queryParams.subscribe(param =>{
      redirect=param.redirect
    
    })

    if(redirect=='sc'){
      let payload:any={}
      this.activatedRoute.queryParams.subscribe(param =>{
        payload['party_code']=param.pc
      })
      sessionStorage.setItem('data_from_stpg_mail',JSON.stringify(payload));
      this.routerService.showStoppageClr()
    }
    else if (this.selectedMenu == '4') {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      localStorage.setItem("loggedIn", this.loggedIn)
      this.routerService.showDashBoardPage()
      // this.router.navigate(['/template_home']);
    }
    else {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      localStorage.setItem("loggedIn", this.loggedIn)
      this.routerService.showServicePage()
    }
  }

  storeDataTosessionStorage(userData: any): any {

    sessionStorage.setItem(btoa('id'), btoa(userData.usr_userid))
    sessionStorage.setItem(btoa('userId'), btoa(userData.usr_userid))
    sessionStorage.setItem(btoa('token'), btoa(userData.token))
    sessionStorage.setItem(btoa('username'), btoa(userData.usr_name))
    sessionStorage.setItem(btoa('fullName'), btoa(userData.fullName))
    sessionStorage.setItem(btoa('usr_name'), btoa(userData.usr_name))
    sessionStorage.setItem(btoa('usr_of_branch'), btoa(userData.usr_of_branch))
    sessionStorage.setItem(btoa('usr_of_siscon'), btoa(userData.usr_of_siscon))
    sessionStorage.setItem(btoa('fin_year_beg'), btoa(userData.fin_year_beg))
    sessionStorage.setItem(btoa('fin_year_end'), btoa(userData.fin_year_end))
    sessionStorage.setItem(btoa('fin_year_format'), btoa(userData.fin_year_format))
    sessionStorage.setItem(btoa('usr_br_city'), btoa(userData.usr_br_city))
    sessionStorage.setItem(btoa('usr_br_name'), btoa(userData.usr_br_name))
    sessionStorage.setItem(btoa('usr_company_code'), btoa(userData.usr_company_code))
    sessionStorage.setItem(btoa('usr_state_code'), btoa(userData.usr_state_code))
    sessionStorage.setItem(btoa('usr_br_acc_code'), btoa(userData.usr_br_acc_code))
    sessionStorage.setItem(btoa('usr_br_capital_acc_code'), btoa(userData.usr_br_capital_acc_code))
    localStorage.setItem("selectedMenu", '4');
    localStorage.setItem("loggedIn", 'true');
  }

  viewPassword() {
    if (this.txtType == 'password') {
      this.txtType = 'text'
    }
    else {
      this.txtType = 'password'
    }

  }


  getUserPreference() {
    this.selectedMenu='4'
    this.loggedIn = 'true'
    if(localStorage.hasOwnProperty(btoa('ucm_default_menu'))){
      console.log('l-ucm_default_menu',localStorage.getItem(btoa('ucm_default_menu')))
      this.selectedMenu = localStorage.getItem(btoa('ucm_default_menu')) || '';
      this.loggedIn = localStorage.getItem(btoa('ucm_default_menu')) || '';
    }
    
    this.openPage()
  }

  savePassword() {
    let user_id = this.username;
    let new_password = this.form.get('txtNewPassword')?.value || '';
    let confirm_new_password = this.form.get('txtConfirmPassword')?.value || '';
    let loginPassword = new_password;

    if (new_password == "") {
      this.openSnackBar("Please Enter Password !!");
      return false;
    }
    if (confirm_new_password == "") {
      this.openSnackBar("Please Enter Confirm_Password !!");
      return false;
    }

    if (new_password !== confirm_new_password) {
      this.openSnackBar("New Password and Confirm Password did not match.");
      return false;
    }

    this.service.updatePassword(user_id, loginPassword).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.openSnackBar('password updated successfully.');
        const payload = {
          usr_userid: this.username.trim(),
          usr_password: loginPassword,
        }
        this.loginService.userLogin(payload).subscribe({
          next: (data1) => {
            console.log(data1);
            if (data1.responseStatus === 'SUCCESS' && data1.responseCode === 'RES_200') {
              this.flgPwdChange = false;
              this.openSnackBar('Login Successful.');
              VerticalMenuComponent.flgLoadMenu = true;
              VerticalMenuComponent.root_id = 0;
              VerticalMenuComponent.lstMenu = [];
              VerticalMenuComponent.aryAllMenu = [];
              this.storeDataTosessionStorage(data1.responseData[0]);
              this.getUserPreference();
              return true;
            } else if (data1.responseStatus === 'FAILURE' && data1.responseCode === 'RES_109') {
              this.openSnackBar(data1.message);
              return false;
            } else {
              console.warn('Unexpected response status or code:', data1.responseStatus, data1.responseCode);
              this.openSnackBar('Unexpected response from server.');
            }
            return false; // Ensure a return value for all code paths
          },
          error: (error) => {
            console.error('Error during login request:', error);
            this.loading = false;
            this.openSnackBar('Network or server error during login.');
          },
          complete: () => {
            console.log('Login request completed.');
          }
        });
      }
      else {
        console.warn('Form is invalid');
        this.openSnackBar('Invalid Credentials.');}
    });

    return true; // Ensure a return value at the end of the method
  }
}
