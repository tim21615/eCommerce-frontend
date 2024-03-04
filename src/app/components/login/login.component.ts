import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private authService: AuthServiceService) { }

  loginData = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError: boolean = false;

  submit() {

    if (this.loginData.valid) {
      this.authService.login(this.loginData.value.email!, this.loginData.value.password!)
        .pipe(catchError(error => {
          this.loginError = true;
          return throwError(error);
        })
        )
        .subscribe(res => {
          this.loginError = false;
          localStorage.setItem('token', res.accessToken);
        });
    } else {
      this.loginData.markAllAsTouched();
    }
  }
}
