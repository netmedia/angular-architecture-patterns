import { Action } from '@ngrx/store';
import {
  LoginForm,
  RegisterForm
} from '../../models';
import { type } from '../../utility';

export const ActionTypes = {
  DO_LOGIN: type('[Auth] Do Login'),
  DO_LOGIN_SUCCESS: type('[Auth] Do Login Success'),
  DO_LOGIN_FAIL: type('[Auth] Do Login Fail'),
  DO_REGISTER: type('[Auth] Do Register'),
  DO_REGISTER_SUCCESS: type('[Auth] Do Register Success'),
  DO_REGISTER_FAIL: type('[Auth] Do Register Fail'),
  DO_LOGOUT: type('[Auth] Do Logout'),
  DO_LOGOUT_SUCCESS: type('[Auth] Do Logout Success'),
  DO_LOGOUT_FAIL: type('[Auth] Do Logout Fail'),
  ADD_USER: type('[Auth] Add user'),
  REMOVE_USER: type('[Auth] Remove user')
};

/**
 * Login Actions
 */
export class DoLoginAction implements Action {
  type = ActionTypes.DO_LOGIN;

  constructor(public payload: LoginForm) {
    console.log("payload",payload);

  }
}

export class DoLoginSuccessAction implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public payload: any) {
    console.log("payload",payload);

  }
}

export class DoLoginFailAction implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any = null) {
    console.log("payload",payload);

  }
}

/**
 * Register Actions
 */
export class DoRegisterAction implements Action {
  type = ActionTypes.DO_REGISTER;

  constructor(public payload: RegisterForm) {
    console.log("payload",payload);

  }
}

export class DoRegisterSuccessAction implements Action {
  type = ActionTypes.DO_REGISTER_SUCCESS;

  constructor(public payload: any) {
    console.log("payload",payload);

  }
}

export class DoRegisterFailAction implements Action {
  type = ActionTypes.DO_REGISTER_FAIL;

  constructor(public payload: any = null) {
    console.log("payload",payload);

  }
}


/**
 * Logout Actions
 */
export class DoLogoutAction implements Action {
  type = ActionTypes.DO_LOGOUT;

  constructor(public payload: any = null) {
    console.log("payload",payload);

  }
}

export class DoLogoutSuccessAction implements Action {
  type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public payload: any = null) {
    console.log("payload",payload);

  }
}

export class DoLogoutFailAction implements Action {
  type = ActionTypes.DO_LOGOUT_FAIL;

  constructor(public payload: any = null) {
    console.log("payload",payload);

  }
}


/**
 * User Actions
 */
export class AddUserAction implements Action {
  type = ActionTypes.ADD_USER;

  constructor(public payload: any) {
    console.log("payload",payload);

  }
}

export class RemoveUserAction implements Action {
  type = ActionTypes.REMOVE_USER;

  constructor(public payload: any) {
    console.log("payload",payload);

  }
}

export type Actions
  = DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoRegisterAction
  | DoRegisterSuccessAction
  | DoRegisterFailAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | AddUserAction
  | RemoveUserAction;
