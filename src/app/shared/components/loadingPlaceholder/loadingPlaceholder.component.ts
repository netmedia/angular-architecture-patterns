// import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy, ElementRef } from '@angular/core';

// @Component({
//   selector: 'loading-placeholder',
//   template: `
//     <div class="timeline-item" [hidden]="!isRunning">
//       <div class="animated-background">
//         <div class="background-masker header-top"></div>
//         <div class="background-masker header-left"></div>
//         <div class="background-masker header-right"></div>
//         <div class="background-masker header-bottom"></div>
//         <div class="background-masker subheader-left"></div>
//         <div class="background-masker subheader-right"></div>
//         <div class="background-masker subheader-bottom"></div>
//         <div class="background-masker content-top"></div>
//         <div class="background-masker content-first-end"></div>
//         <div class="background-masker content-second-line"></div>
//         <div class="background-masker content-second-end"></div>
//         <div class="background-masker content-third-line"></div>
//         <div class="background-masker content-third-end"></div>
//       </div>
//     </div>
//   `,
//   styleUrls: ['./loadingPlaceholder.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class LoadingPlaceholderComponent {

//   @Input() isRunning: boolean;

//   constructor() {}
// }