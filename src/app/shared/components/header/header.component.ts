import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <a routerLink="/products" routerLinkActive="active" class="header-logo">
        <img src="/assets/images/logo_full_dark.png">
      </a>

      <div class="header-profileBarWrapper">
        <profile-action-bar
          (logout)="logout.emit($event)"
          [userImage]="userImage"
          [userEmail]="userEmail">
        </profile-action-bar>
      </div>
      <div class="header-languageSelectorWrapper">
        <language-selector
          (select)="selectLanguage.emit($event)"
          [selectedLanguage]="selectedLanguage"
          [availableLanguages]="availableLanguages">
        </language-selector>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() selectedLanguage:    string;
  @Input() availableLanguages:  Array<any>;
  @Input() userImage:           string;
  @Input() userEmail:           string;

  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() logout:         EventEmitter<any> = new EventEmitter();
}
