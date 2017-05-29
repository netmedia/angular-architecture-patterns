import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'page-not-found',
  template: `
    <div class="pageNotFound">
    	<div class="pageNotFound-content">
    		<img src="/assets/images/Martian.png" />
      	<h1>{{ 'PageNotFound.Title' | translate }}</h1>
      	<h3>{{ 'PageNotFound.Subtitle' | translate }}</h3>
      	<button (click)="goBack()">{{ 'PageNotFound.Button' | translate }}</button>
    	</div>
    </div>
  `,
  styleUrls: ['./pageNotFound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
	constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}