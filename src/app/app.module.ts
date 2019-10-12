// Angular core modules
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
// Third party libraries
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule } from 'ng2-translate';
// Services
import { ConfigService } from './app-config.service';
// Routes
import { AppRoutingModule } from './app-routing.module';
// Modules
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { HttpServiceModule } from './shared/asyncServices/http/http.module';
// Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { CanDeactivateGuard } from './shared/guards/canDeactivate.guard';
import { UtilityModule } from './shared/utility';
import { effects } from './store/app.effect';
import { reducerProvider, reducerToken } from './store/app.reducer';







/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */

export function configServiceFactory(config: ConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    HttpClient,

    // Third party modules
    TranslateModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    NgxDatatableModule,

    // App custom dependencies
    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),

    ProductsModule,
    AuthModule,
    AppRoutingModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * store, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     * https://ngrx.io/api/store-devtools/StoreDevtoolsModule
     */
    // StoreModule.forRoot(store),
    StoreModule.forRoot(reducerToken),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://ngrx.io/api/effects/EffectsModule
     */
    // EffectsModule.forRoot([AuthEffects, ProductsEffects]),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    reducerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
