import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    let options = {
      observe: 'response' as 'response'
    }

    return this.http.post<any>(url, body, options);
  }
}
