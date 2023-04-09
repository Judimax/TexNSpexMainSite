import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(public tokenExtractor:HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestToForward = request;
    let token = this.tokenExtractor.getToken()
    if(token !== null){
      requestToForward = request.clone({setHeaders: {"X-XSRF-TOKEN": token}});
    }
    return next.handle(requestToForward);
  }
}
