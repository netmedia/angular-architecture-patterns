import { Injectable } 	    from '@angular/core';
import { Store }            from '@ngrx/store';
import { Observable }       from 'rxjs/Observable';
import * as store           from '../store';
import * as authActions     from '../store/actions/auth.action';
import { User }             from '../models';
import { localeDateString } from '../utility';

export abstract class Sandbox {

  public loggedUser$: Observable<any> = this.appState$.select(store.getLoggedUser);
  public culture$:    Observable<any> = this.appState$.select(store.getSelectedCulture);
  public culture:     string;

  constructor(protected appState$: Store<store.State>) {}

  /**
   * Pulls user from local storage and saves it to the store
   */
  public loadUser(): void {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    this.appState$.dispatch(new authActions.AddUserAction(new User(user)));
  }

  /**
   * Formats date string based on selected culture
   * 
   * @param value
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}