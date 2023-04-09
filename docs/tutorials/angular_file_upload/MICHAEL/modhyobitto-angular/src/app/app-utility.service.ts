import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppDictionaryService } from './app-dictionary.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModhyobittoDialogComponent } from './modules/__shared-utilities/modhyobitto-dialog/modhyobitto-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AppUtilityService extends AppDictionaryService {

  private globals: { [key:string]: any } = {
    ongoing_request_count: 0,
    loading_animation_control: new Subject<any>(),
    banner_control: new Subject<any>()
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private overlay: Overlay
  ) { super(); }

  serviceWrapper(
    HTTP_method: string,
    API_URL: string,
    responseProcessing: any,
    request_data?: any,
    skip_loading_animation?: string
  ): Subject<any> {

    let response_subject = new Subject<any>();

    // If it has not been explicitly mentioned to not show the loader, please show.
    if(!!!skip_loading_animation){
      this.globals.ongoing_request_count ++;
      this.globals.loading_animation_control.next(true);
    }

    // Hide snackbars and banners if any
    this.hideSnackbar();
    this.hideBanner();

    // For local API requests, fetch the JSON file instead
    if(!environment.production || environment.dummy_JSONs){
      HTTP_method = 'GET';
      API_URL += '.json';
    }

    this.http.request(
      HTTP_method,
      API_URL,
      request_data
    ).pipe(
      finalize(
        () => {
          if(!!!skip_loading_animation){
            if(this.globals.ongoing_request_count > 0){
              this.globals.ongoing_request_count --;
            }
            // Hiding the loading animation
            this.globals.loading_animation_control.next(false);
          }
        }
      )      
    ).subscribe(
      (response: any) => {
        // If this is an error object directly send it across
        if(!!response['errorCode']){
          response_subject.error(response);
        }else{
          let processed_response = responseProcessing(response);
          if(!!processed_response.error){
            response_subject.error(processed_response.error);
          }else{
            response_subject.next(processed_response.data);
          }
        }
      },
      (error) => {
        let error_object = {
          'message' : this.error_messages.service_failure
        };
        response_subject.error(error_object);
      }
    );

    return response_subject;
  }

  login(user_credentials: any){
    let credentials = {...user_credentials};
    return this.serviceWrapper(
      'POST',
      this.getAPI('login'),
      (response: any) => {
        if(response.responseCode == 200){
          return (user_credentials.username=="error")?
                  {'error': response}: {'data': response};
        }else{
          return {'error': response};
        }
      },
      {
        body: credentials
      }
    );
  }

  downloadFile(){
    return this.serviceWrapper(
      'POST',
      this.getAPI('file_download'),
      (response: any) => {
        let file_name = "dummy_file.pdf";
        saveAs(response, file_name);
        return {'data': {'message': 'download success'}};
      },
      {
        body: {
          'dummy': 'data'
        },
        responseType: "blob"
      }
    );
  }

  uploadFile(form_data: any, API: string){
    return this.serviceWrapper(
      'POST',
      API,
      (response: any)=>{
        return {'data': { 'message': response.uploadStatus}};
      },
      {
        body: form_data
      }, 
      'skip_loader_animation'     
    );
  }

  showBanner(text?: string){
    let options = {
      to_show: true,
      text: text ||  this.error_messages.service_failure
    };
    this.globals.banner_control.next(options);
  }

  hideBanner(){
    let options = {
      to_show: false
    };
    this.globals.banner_control.next(options);
  }

  showSnackbar(message?: string){
    setTimeout(()=>{
      let snackar_ref = this.snackbar.open(
        message || this.error_messages.service_failure,
        'OK',
        {panelClass: 'modhyobitto-snackbar'});
      this.setGlobalData('global_snackbar',snackar_ref);
    },1200);
  }

  hideSnackbar(){
    this.getGlobalData('global_snackbar')?.dismiss();
  }

  displayAlertDialog(options?: any){
    let global_options = {
      autoFocus: false,
      panelClass: 'modhyobitto-dialog-container',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    };
    let dialog_config = {...global_options, ...options};
    let dialog_ref = this.dialog.open(
      ModhyobittoDialogComponent,
      dialog_config
    );
    return dialog_ref;
  }

  toggleFormControls(
    form_group: FormGroup, 
    control_list: string[], 
    to_enable: boolean){
      let control_count = control_list.length;
      for(let i=0; i < control_count; i++){
        let current_control = form_group.get(control_list[i]);
        if(to_enable){
          current_control?.enable({emitEvent: false});
        }else{
          current_control?.disable({emitEvent: false});
        }
      }
  }

  scrollToElement(element_ref: any, offset = 10){
    setTimeout(()=>{
      let is_selector = (typeof element_ref) == 'string';
      let element = (is_selector)? document.querySelector(element_ref) : element_ref;
      let scroll_extent = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, scroll_extent);
    }, 200);
  }

  onRouteActivation(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  navigateToURL(URL: string){
    this.router.navigateByUrl(URL);
  }

  /* TODO
  getCookie(name: string){
    return this.cookieService.get(name);
  }

  setCookie(name, value){
    this.cookieService.set(name, value, {path: '/', expires: new Date('12/31/9999')});
  }

  deleteCookie(name){
    this.cookieService.delete(name);
  }

  */

  unsubscribeAll(subs: Subscription[]){
    let sub_count = subs.length;
    for(let i=0; i < sub_count; i++){
      let current_sub = subs[i];
      if(!!current_sub){
        current_sub.unsubscribe();
      }
    }
  }

  setGlobalData(key: string, value: any){
    this.globals[key] = value;
  }

  getGlobalData(key: string){
    return this.globals[key];
  }


}

