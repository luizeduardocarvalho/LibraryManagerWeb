import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { baseUrl } from 'settings';
import { ChangePassword } from 'src/models/change-password';
import { CreateUser } from 'src/models/create-user';
import { User } from 'src/models/user';
import { ErrorHandlerHelper } from './error-handler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + 'login/login', user, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }

  register(user: CreateUser) {
    return this.http.post<CreateUser>(baseUrl + 'login/register', user).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }

  changePassword(user: ChangePassword) {
    return this.http.patch<ChangePassword>(baseUrl + 'login/changepassword', user).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }
}
