import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(BASE_URL + 'api/v1/admin/users', {
      headers: this.createAuthorizationHeader(),
    });
  }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/admin/task', taskDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getTtoken()
    );
  }
}
