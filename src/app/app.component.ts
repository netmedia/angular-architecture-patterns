import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { AppSandbox } from './app.sandbox';

@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <simple-notifications [options]="appSandbox.getNotificationOptions()"></simple-notifications>
  `,
  host:     {'[class.body-loginPage]':'isLoginPage'},
  providers: [AppSandbox]
})
export class AppComponent {

  public isLoginPage: boolean;

  constructor(
    private router: Router,
    public appSandbox: AppSandbox
  ) {}

  ngOnInit() {
    this.appSandbox.setupLanguage();
    // Load user from local storage into redux state
    this.appSandbox.loadUser();
    this.registerEvents();
  }

  /**
   * Registers events needed for the application
   */
  private registerEvents(): void {
    // Subscribes to route change event and sets "isLoginPage" variable in order to set correct CSS class on body tag.
    this.router.events.subscribe((route) => {
      this.isLoginPage = route['url'] === '/login' ? true : false;
    });
  }
}
