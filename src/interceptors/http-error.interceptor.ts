import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable({
    providedIn: 'root',
  })
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor() {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = error.error;
  
          if (typeof error.error === 'object') {
            errorMessage = error.error.message;
          }
          
          console.log(errorMessage);
          return throwError(errorMessage);
        })
      );
    }
  }
  