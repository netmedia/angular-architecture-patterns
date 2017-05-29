import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'profile-action-bar',
  template: `
    <div class="profileActionBar">
      <div class="profileActionBar-anchor">
        <a class="profileActionBar-imgWrapper"><img src="{{ userImage }}" alt=""></a>
        <span>{{ userEmail }} | </span>
        <span (click)="logout.emit($event)" class="profileActionBar-logout">{{ 'ProfileActionBar.Logout' | translate }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./profileActionBar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileActionBarComponent {

  @Input() userImage: string;
  @Input() userEmail: string;
	@Output() logout: EventEmitter<any> = new EventEmitter();

  constructor() {}
}