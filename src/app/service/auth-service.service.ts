import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password
    }

    let url = 'http://localhost:8080/api/auth/login';

    // let options = {
    //   observe: 'response' as 'response'
    // }

    return this.http.post<LoginResponse>(url, body);
  }
}
