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

  submit() {
    this.authService.login(this.loginData.value.email!, this.loginData.value.password!)
      .subscribe(res => {
        console.log('成功登入');
      });
  }
}
