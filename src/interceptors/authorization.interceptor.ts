import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token.service';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const userAuthorizationToken = this.tokenService.getToken();
  
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${userAuthorizationToken}`,
        },
      });
  
      return next.handle(request);
    }
  }
  