// @ts-nocheck
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, concatMap, Observable, tap, throwError } from 'rxjs';

// services
import { AccountService } from '@shared/services/account/account.service';
import { WmlNotifyService } from '@windmillcode/wml-notify';
import { BaseService } from '@core/base/base.service';

@Injectable({ providedIn: 'root' })
export class NewAzureAccessTokenInterceptor implements HttpInterceptor {
  accountService:AccountService
  baseService:BaseService
  constructor(
    public injector:Injector,
    public wmlNotifyService:WmlNotifyService,
  ) {
    setTimeout(()=>{
      // this.accountService = this.injector.get(AccountService);
      this.baseService = this.injector.get(BaseService)
    })
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(

      catchError((err:HttpErrorResponse) => {
        if(err.status === 403){
          return this.accountService.getNewAzureAccessToken()
          .pipe(
            concatMap(()=>{
              request = request.clone({body:{
                data:request.body.data,
                access_token:this.accountService.getAzureAccessToken(),
              }})
              return next.handle(request)
            }),
            tap({
              error:()=>{
                let note = this.baseService.generateWMLNote("global.loginAgain")
                this.wmlNotifyService.create(note)
                this.accountService.login()
              }
            })
          )
        }
        else{
          return throwError(()=>err)
        }
      })
    );
  }
}
