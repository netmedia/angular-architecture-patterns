import {
  NgModule,
  ModuleWithProviders
}                            from "@angular/core";
import { UtilService }       from './utility.service';
import { ValidationService } from './validation.service';

@NgModule()
export class UtilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UtilityModule,

      providers: [
        UtilService,
        ValidationService
      ]
    };
  }
}