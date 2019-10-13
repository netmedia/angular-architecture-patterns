import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { LayoutSandbox } from './layout.sandbox';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <app-header
      (selectLanguage)="layoutSandbox.selectLanguage($event)"
      (logout)="layoutSandbox.logout()"
      [selectedLanguage]="layoutSandbox.selectedLang$ | async"
      [availableLanguages]="layoutSandbox.availableLanguages$ | async"
      [userImage]="userImage"
      [userEmail]="userEmail">
    </app-header>
    <navigation></navigation>
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutContainer {

  public userImage = '';
  public userEmail = '';
  private assetsFolder: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private configService: ConfigService,
    public layoutSandbox: LayoutSandbox
  ) {
    this.assetsFolder = this.configService.get('paths').userImageFolder;
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private registerEvents() {
    // Subscribes to user changes
    this.subscriptions.push(this.layoutSandbox.user$.subscribe(user => {
      if (user) {
        this.userImage = this.assetsFolder + 'user.jpg';
        this.userEmail = user.email;
      }
    }));
  }
}
