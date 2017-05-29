import { Action }   from '@ngrx/store';
import { Product }  from '../../models';
import { type }     from '../../utility';

export const ActionTypes = {
  LOAD:         type('[Product Details] Load'),
  LOAD_SUCCESS: type('[Product Details] Load Success'),
  LOAD_FAIL:    type('[Product Details] Load Fail')
};

/**
 * Product Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: number = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Product) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;