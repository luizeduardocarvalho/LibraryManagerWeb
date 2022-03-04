import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseUrl } from 'settings';
import { ChangePassword } from 'src/models/change-password';
import { CreateUser } from 'src/models/create-user';
import { User } from 'src/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + 'login/login', user, httpOptions);
  }

  register(user: CreateUser) {
    return this.http.post<CreateUser>(baseUrl + 'login/register', user);
  }

  changePassword(user: ChangePassword) {
    return this.http.patch<ChangePassword>(baseUrl + 'login/changepassword', user);
  }
}
