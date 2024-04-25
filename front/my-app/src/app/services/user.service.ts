import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _username: string = '';
  BASE_URL = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) {}

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/api/register/`,
      userData
    )
  }
}
