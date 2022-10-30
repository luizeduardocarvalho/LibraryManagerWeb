import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChangePassword } from 'src/models/change-password';
import { CreateUser } from 'src/models/create-user';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'login/login', user);
  }

  register(user: CreateUser) {
    return this.http.post<CreateUser>(
      environment.baseUrl + 'login/register',
      user
    );
  }

  changePassword(user: ChangePassword) {
    return this.http.patch<ChangePassword>(
      environment.baseUrl + 'login/changepassword',
      user
    );
  }
}
