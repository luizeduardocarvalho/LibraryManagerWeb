import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseUrl } from 'settings';
import { ChangePassword } from 'src/models/change-password';
import { CreateUser } from 'src/models/create-user';
import { User } from 'src/models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `${this.tokenService.getToken()}`
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + 'login/login', user, this.httpOptions);
  }

  register(user: CreateUser) {
    return this.http.post<CreateUser>(baseUrl + 'login/register', user, this.httpOptions);
  }

  changePassword(user: ChangePassword) {
    return this.http.patch<ChangePassword>(baseUrl + 'login/changepassword', user, this.httpOptions);
  }
}
