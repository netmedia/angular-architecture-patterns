import { CommonModule }        from "@angular/common";
import {
  NgModule,
  ModuleWithProviders
}                              from "@angular/core";
import { HttpService }         from '../../services/http.service';
import { HttpResponseHandler } from '../../services/httpResponseHandler.service';

@NgModule({
  imports: [CommonModule]
})
export class HttpServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpServiceModule,

      providers: [
        HttpService,
        HttpResponseHandler
      ]
    };
  }
}
