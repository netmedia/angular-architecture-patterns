import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  constructor(private changeDetector: ChangeDetectorRef, private translate: TranslateService) {

    /** 
     * Detaches the change detector from the change detector tree.
     * The detached change detector will not be checked until it is reattached.
     */ 
    // changeDetector.detach();
  }
}
