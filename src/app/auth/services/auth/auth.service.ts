import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL: string = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/register', signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/login', loginRequest);
  }
}
