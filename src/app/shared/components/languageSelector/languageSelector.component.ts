import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'language-selector',
  template: `
    <button (click)="onToggle()" class="language-selector-anchor" [ngClass]="{'active': show}" data-toggle="lang-dropdown">{{selectedLanguage}}</button>

    <div class="dropdown-pane top" id="lang-dropdown" data-dropdown *ngIf="show">
      <span *ngFor="let lang of availableLanguages" (click)="selectLanguage(lang)">{{ lang.name }}</span>
    </div>
  `,
  styleUrls: ['./languageSelector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class LanguageSelectorComponent {

  @Input() selectedLanguage: string;
  @Input() availableLanguages: Array<any>;
	@Output() select: EventEmitter<any> = new EventEmitter();

	public show: boolean = false;

  constructor(private elementRef: ElementRef) {}

  public onDocumentClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  public onToggle(): void {
    this.show = !this.show;
  }

  public selectLanguage(lang: any) {
    this.show = false;
    this.select.emit({code: lang.code, culture: lang.culture});
  }
}