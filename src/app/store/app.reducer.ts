import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { combineReducersEnhanced } from 'combine-reducers-enhanced';
import * as fromAuthStore from '../shared/store/index';



export interface State {
  auth: fromAuthStore.AuthState;
}

export const reducers = {
  auth: fromAuthStore.combinedReducers,

};

export const rootReducer = combineReducersEnhanced(reducers, false);

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Registered Reducers');

export const reducerProvider = [
  { provide: reducerToken, useValue: rootReducer }
];




// import {
//   ActionReducer,
//   combineReducers
// }                                 from '@ngrx/store';
// import { compose }                from '@ngrx/core';
// import {combineReducersEnhanced}  from "combine-reducers-enhanced";

// import { InjectionToken }   from '@angular/core';
// import { ActionReducerMap } from '@ngrx/store';

// export interface State {
//   auth:             fromAuth.State
// };

// export const reducers = {
//   auth:             fromAuth.combinedReducers
// };

// export const rootReducer = combineReducersEnhanced(reducers, false);

// export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Registered Reducers');

// export const reducerProvider = [
//   { provide: reducerToken, useValue: rootReducer }
// ];
