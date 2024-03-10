import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  loginData = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError: boolean = false;

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user !== null) {
        this.router.navigate(['home']);
      }
    });
  }

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

          this.router.navigate(['home']);
        });
    } else {
      this.loginData.markAllAsTouched();
    }
  }
}
