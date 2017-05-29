import { Action } from '@ngrx/store';
import { type } from '../../utility';

export const ActionTypes = {
  SET_LANGUAGE: type('[Settings] SetLanguage'),
  SET_CULTURE:  type('[Settings] SetCulture')
};

/**
 * Settings Actions
 */
export class SetLanguageAction implements Action {
  type = ActionTypes.SET_LANGUAGE;

  constructor(public payload: string) { }
}

export class SetCultureAction implements Action {
  type = ActionTypes.SET_CULTURE;

  constructor(public payload: string) { }
}

export type Actions
  = SetLanguageAction
  | SetCultureAction;