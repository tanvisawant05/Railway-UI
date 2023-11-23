import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
//HttpInterceptor interface provides the necessary methods to intercept and modify HTTP requests and responses.
  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if(token){
      request=request.clone({
        setHeaders:{Authorization: `Bearer ${token}`},
      });
    }
    //If a token exists, the request is cloned and modified by adding the Authorization header with the token using the request.clone method.
    return next.handle(request);
    //The modified request is then passed to the next.handle method to continue the request pipeline.
  }
  //The intercept method takes the intercepted HttpRequest and HttpHandler as parameters and returns an Observable of HttpEvent.
  //Inside the intercept method, the JWT token is retrieved from the AuthService using the getToken method.
  //
}
