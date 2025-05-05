import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  form: FormGroup;
  txtType: string = 'password';
  companyLogo = './assets/img/users/logo.png';
  

  constructor(private fb: FormBuilder, public router: Router,private loginService: LoginService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  viewPassword(): void {
    this.txtType = this.txtType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    let payload = {
      usr_userid: this.form.value.username.trim(),
      usr_password: this.form.value.password
    };

    console.log('Login payload:', payload);
    // Call Java backend API here later

    //g
    this.loginService.userLogin(payload).subscribe({
      next: (res) => {
        console.log('Login success', res);
        // Optionally store token or user info in session/local storage
        if (res.responseStatus === 'SUCCESS' && res.responseCode === 'RES_200') {
          sessionStorage.setItem('userId', btoa(res.usr_userid));
          sessionStorage.setItem('username', btoa(res.usr_name));
          
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
        }
        else {
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid username or password');
      }
       // this.router.navigate(['/dashboard']);
  
    })
  }
}

