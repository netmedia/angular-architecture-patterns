import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
}                                    from '@angular/forms';
import { AuthRoutingModule }         from './auth-routing.module';
import { RegisterComponent }         from './register/register.component';
import { LoginComponent }            from './login/login.component';
import { ComponentsModule }          from '../shared/components';
import { TranslateModule }           from 'ng2-translate';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthSandbox }               from './auth.sandbox';
import { AuthApiClient }             from './authApiClient.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
    SimpleNotificationsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthApiClient,
    AuthSandbox
  ]
})
export class AuthModule {}
