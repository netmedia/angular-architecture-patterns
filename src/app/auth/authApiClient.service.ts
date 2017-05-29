import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import {
  LoginForm,
  RegisterForm
}                       from '../shared/models';
import {
  HttpService,
  POST,
  Body,
  DefaultHeaders,
  Adapter
}                       from '../shared/asyncServices/http';
import { AuthSandbox }  from './auth.sandbox';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class AuthApiClient extends HttpService {

  /**
   * Submits login form to the server
   * 
   * @param form
   */
  @POST("/account/login")
  @Adapter(AuthSandbox.authAdapter)
  public login(@Body form: LoginForm): Observable<any> { return null; };

  /**
   * Submits register form to the server
   * 
   * @param form
   */
  @POST("/account/register")
  @Adapter(AuthSandbox.authAdapter)
  public register(@Body form: RegisterForm): Observable<any> { return null; };

  /**
   * Logs out current user
   */
  @POST("/account/logout")
  public logout(): Observable<any> { return null; };
}