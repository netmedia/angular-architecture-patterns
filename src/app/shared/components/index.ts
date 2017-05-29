import { NgModule }                     from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
}                                       from '@angular/forms';
import { RouterModule }                 from '@angular/router';
import { CommonModule }                 from '@angular/common';

import { PipesModule }                  from '../pipes';
import { TranslateModule }              from 'ng2-translate';

import { SpinnerComponent }             from './spinner/spinner.component';
import { NavigationComponent }          from './navigation/navigation.component';
import { ProfileActionBarComponent }    from './profileActionBar/profileActionBar.component';
import { HeaderComponent }              from './header/header.component';
import { LanguageSelectorComponent }    from './languageSelector/languageSelector.component';
import { PageNotFoundComponent }        from './pageNotFound/pageNotFound.component';

export const COMPONENTS = [
  SpinnerComponent,
  NavigationComponent,
  ProfileActionBarComponent,
  HeaderComponent,
  LanguageSelectorComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    RouterModule,
  	FormsModule,
  	ReactiveFormsModule,
  	CommonModule,
    TranslateModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }