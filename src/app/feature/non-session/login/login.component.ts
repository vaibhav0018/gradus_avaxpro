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
import { Menu } from '../../../shared/components/menu/menu.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSidenavModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {


    // form: FormGroup;
    // txtType: string = 'password';
  
    // constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    //   this.form = this.fb.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    //   });
    // }

    // onSubmit() {

    //   this.form.controls.username.value // Storing Username form value to object username
    //   this.form.value.password // Storing Password form value to object password


    //   const payload = {
    //     //'username': this.username.trim().toLowerCase(),
    //     usr_userid: this.form.controls.username.value,
    //     usr_password: this.form.value.password 
    //   }
    //   this.loginService.userLogin(payload).subscribe({
    //     next: (res) => {
    //     if (res.responseStatus === 'SUCCESS' && res.responseCode === 'RES_200') {4
    //       sessionStorage.setItem(btoa('token'), btoa('Bearer ' + res.token)); 
    //       sessionStorage.setItem(btoa('username'), btoa(res.usr_name)); 
    //       sessionStorage.setItem(btoa('userId'), btoa(res.userId));
    //       sessionStorage.setItem(btoa('username'), btoa(res.username));
    //       sessionStorage.setItem(btoa('fin_year_beg'), btoa(res.fin_year_beg));
    //       sessionStorage.setItem(btoa('fin_year_end'), btoa(res.fin_year_end));
    //       sessionStorage.setItem(btoa('fin_year_format'), btoa(res.fin_year_format));
    //       sessionStorage.setItem(btoa('usr_company_code'), btoa(res.usr_company_code));
    //       sessionStorage.setItem(btoa('usr_of_siscon'), btoa(res.usr_of_siscon));
    //       sessionStorage.setItem(btoa('usr_of_branch'), btoa(res.usr_of_branch));
    //       sessionStorage.setItem(btoa('usr_state_code'), btoa(res.usr_state_code));
    //       this.router.navigate(['/Dashboard']);
    //       console.log('login Token:', sessionStorage.getItem(btoa('token')));
    //     }else{
    //       alert('Invalid Login');
    //     }
    //   },
    //   error: () =>alert("login failed")
    //   });

    // }

  form: FormGroup
  loading = false
  submitted = false
  errorMsg = ''
  username = ''
  password = ''
  settings: Settings
  companyLogo = './assets/img/users/logo.png'
  menuItems: Array<Menu>
  selectedMenu: any = '4'
  loggedIn: any = 'true'
  txtType = 'password'
  flgPwdChange:boolean=false
  constructor(
    private appSettings: AppSettings,
    private fb: FormBuilder,
    private loginService: LoginService,
    private routerService: RouterService,
    private snackBar: MatSnackBar,
    private service: ChangePasswordService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.settings = this.appSettings.settings
  }

  ngOnInit() {
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

  // public onSubmit(): void {
  //   this.submitted = true
  //   this.errorMsg = ''
  //   // stop here if form is invalid
  //   if (this.form.invalid) {
  //     return
  //   }
  //   // this.loading = true

  //   this.username = this.form.value.username // Storing Username form value to object username
  //   this.password = this.form.value.password // Storing Password form value to object password

  //   const payload = {
  //     //'username': this.username.trim().toLowerCase(),
  //     usr_userid: this.username.trim(),
  //     usr_password: this.password,
  //   }
  //   if (this.form.valid) {
  //     this.loginService.userLogin(payload).subscribe(
  //       data => {
  //         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            
  //           if(data.responseData[0].pwd_change!=undefined && data.responseData[0].pwd_change=='Y'){
  //             this.flgPwdChange=true
  //           }
  //           else{
  //             this.flgPwdChange=false
  //             this.openSnackBar('Login Successful.')
  //             //this.routerService.showDashBoardPage()
  //             VerticalMenuComponent.flgLoadMenu = true
  //             VerticalMenuComponent.root_id = 0
  //             VerticalMenuComponent.lstMenu = []
  //             VerticalMenuComponent.aryAllMenu = []
  //             this.storeDataTosessionStorage(data.responseData[0])
  //             this.getUserPreference() 
               
  //           }
  //         }
  //         else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
  //           //this.openSnackBar('Invalid login id / password.');      
  //           this.openSnackBar(data.message);
  //           return false;
  //         }
  //          return true;
  //       },
  //       error => {
  //         this.loading = false
  //       }
  //     )
  //   } else {
  //     this.openSnackBar('Invalid Credentials.')
  //   }
  // }

  public onSubmit(): void {
  this.submitted = true;
  this.errorMsg = '';
  
  // stop here if form is invalid
  if (this.form.invalid) {
    return;
  }
  
  // this.loading = true

  this.username = this.form.value.username; // Storing Username form value to object username
  this.password = this.form.value.password; // Storing Password form value to object password

  const payload = {
    usr_userid: this.username.trim(),
    usr_password: this.password,
  };
  
  if (this.form.valid) {
    // Consider adding loading state here
    this.loading = true;
    
    console.log("vaibhav");
    
    this.loginService.userLogin(payload).subscribe({

      
      next: (data) => {
        console.log("data is coming: ",data);
        
        this.loading = false; // Hide loading indicator
        
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          console.log("success");
          
          if (data.responseData[0].pwd_change !== undefined && data.responseData[0].pwd_change === 'Y') {
            this.flgPwdChange = true;
          } else {
            this.flgPwdChange = false;
            this.openSnackBar('Login Successful.');
            //this.routerService.showDashBoardPage()
            // VerticalMenuComponent.flgLoadMenu = true;
            // VerticalMenuComponent.root_id = 0;
            // VerticalMenuComponent.lstMenu = [];
            // VerticalMenuComponent.aryAllMenu = [];
            this.storeDataTosessionStorage(data.responseData[0]);
            this.getUserPreference();
            
          }
        } else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
        this.openSnackBar('An error occurred during login. Please try again.');
      }
    });
  } else {
    this.openSnackBar('Invalid Credentials.');
  }
}

  openSnackBar(message: any) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 10000
    });
  }


  ngAfterViewInit() {
    this.settings.loadingSpinner = false
  }

  openPage() {
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
    }
    else {
      localStorage.setItem("selectedMenu", this.selectedMenu);
      localStorage.setItem("loggedIn", this.loggedIn)
      this.routerService.showServicePage()
    }
  }

  storeDataTosessionStorage(userData: any): any {

    console.log("hi shirya");
    

    sessionStorage.setItem(btoa('id'), btoa(userData.usr_userid))
    sessionStorage.setItem(btoa('userId'), btoa(userData.usr_userid))
    sessionStorage.setItem(btoa('token'), btoa(userData.token))
    console.log("ssssssssssssssssssssssssssssssssssssss",sessionStorage.getItem(btoa('token')))
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",userData.token)
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyy", atob( sessionStorage.getItem(btoa('token')) || ''))
    
    

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
      this.selectedMenu = localStorage.getItem(btoa('ucm_default_menu'))
      this.loggedIn = localStorage.getItem(btoa('ucm_default_menu'))
    }
    
    this.openPage()
  }

  savePassword() {
    let user_id = this.username;
    let new_password = this.form.get('txtNewPassword')?.value;
    let confirm_new_password = this.form.get('txtConfirmPassword')?.value;
    let loginPassword = new_password;

    if (new_password == "") {
      this.openSnackBar("Please Enter Password !!");
      return false
    }
    if (confirm_new_password == "") {
      this.openSnackBar("Please Enter Confirm_Password !!");
      return false
    }

    if (new_password !== confirm_new_password) {
      this.openSnackBar("New Password and Confirm Password did not match.");
      return false
    }

    this.service.updatePassword(user_id, loginPassword).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        this.openSnackBar('password updated successfully.');
        const payload = {
          usr_userid: this.username.trim(),
          usr_password: loginPassword,
        }
        this.loginService.userLogin(payload).subscribe(
          data1 => {
            console.log(data1)
            if (data1.responseStatus === 'SUCCESS' && data1.responseCode === 'RES_200') {
                this.flgPwdChange=false
                this.openSnackBar('Login Successful.')
                //this.routerService.showDashBoardPage()
                VerticalMenuComponent.flgLoadMenu = true
                VerticalMenuComponent.root_id = 0
                VerticalMenuComponent.lstMenu = []
                VerticalMenuComponent.aryAllMenu = []
                this.storeDataTosessionStorage(data1.responseData[0])
                this.getUserPreference()  
            }
            else if (data1.responseStatus === 'FAILURE' && data1.responseCode === 'RES_109') {
              //this.openSnackBar('Invalid login id / password.');      
              this.openSnackBar(data1.message);
              return false;
            }
             return true;
          },
          error => {
            this.loading = false
          }
        )
      }
    });
     return true;          
  } 
  }

