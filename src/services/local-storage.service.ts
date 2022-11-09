import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  user = new BehaviorSubject(this._user);

  set _user(data: any) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.user.next(this._user);
  }

  get _user() {
    return localStorage.getItem('user');
  }
}
