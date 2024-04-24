import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const access = localStorage.getItem('access');
    if(access){
        const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${access}`)
        });
        return next.handle(newReq);
    }
    return next.handle(req);
  }
}

export const AuthInterceptorProvider: Provider = 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }