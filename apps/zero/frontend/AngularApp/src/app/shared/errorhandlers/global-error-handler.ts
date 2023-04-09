import { ErrorHandler, Inject, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '@core/base/base.service';
import { WmlNotifyBarType } from '@windmillcode/wml-notify';
import { SentryErrorHandler,ErrorHandlerOptions } from '@sentry/angular-ivy';
import { DevEnv } from '@env/environment.dev';
import { ENV } from '@env/environment';


class SentryErrorHandlerOptions implements ErrorHandlerOptions{

}
@Injectable()
export class GlobalErrorHandler extends SentryErrorHandler {
  constructor(@Inject(SentryErrorHandlerOptions) private configs:ErrorHandlerOptions) {
    super(configs)
    this.baseService =  inject(BaseService);

  }
  private baseService
  override handleError(error) {
    this.baseService.generateWMLNote('global.systemError',WmlNotifyBarType.Error);

    if(ENV.type==="dev"){
      super.handleError(error);
    }
    this.handleError = ()=>{}
  }
}
