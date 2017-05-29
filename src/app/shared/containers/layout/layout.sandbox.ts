import { Injectable } 	     from '@angular/core';
import { Router }            from '@angular/router';
import { Sandbox } 			     from '../../sandbox/base.sandbox';
import { Store }      	     from '@ngrx/store';
import * as store     	     from '../../store';
import * as authActions      from '../../store/actions/auth.action';
import * as settingsActions  from '../../store/actions/settings.action';
import { TranslateService }  from 'ng2-translate';

@Injectable()
export class LayoutSandbox extends Sandbox {

  public selectedLang$       = this.appState$.select(store.getSelectedLanguage);
  public availableLanguages$ = this.appState$.select(store.getAvailableLanguages);
  public user$               = this.appState$.select(store.getLoggedUser);
  private loginLoaded$;

  constructor(
    protected appState$: Store<store.State>,
    private translateService: TranslateService,
    private router: Router
  ) {
  	super(appState$);
  }

  public selectLanguage(lang: any): void {
    this.appState$.dispatch(new settingsActions.SetLanguageAction(lang.code));
    this.appState$.dispatch(new settingsActions.SetCultureAction(lang.culture));
    this.translateService.use(lang.code);
  }

  public logout() {
    this.appState$.dispatch(new authActions.DoLogoutAction());
    this.subscribeToLoginChanges();
  }

  private subscribeToLoginChanges() {
    if (this.loginLoaded$) return;

    this.loginLoaded$ = this.appState$.select(store.getAuthLoaded)
    .subscribe(loaded => {
      if (!loaded) this.router.navigate(['/login'])
    });
  }
}