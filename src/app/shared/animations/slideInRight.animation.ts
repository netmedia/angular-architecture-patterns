import { AnimationEntryMetadata } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const slideInRightAnimation: AnimationEntryMetadata =
  trigger('slideInRightAnimation', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);