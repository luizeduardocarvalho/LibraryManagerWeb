import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(localStorage.getItem('user') as string);
    if (
      user &&
      !this.jwtHelper.isTokenExpired(this.tokenService.getToken()) &&
      (user.role == 'Administrator' || user.role == 'Teacher')
    ) {
      return true;
    }

    this.tokenService.clearToken();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
