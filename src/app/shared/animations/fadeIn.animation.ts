import { AnimationEntryMetadata } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation: AnimationEntryMetadata =
  trigger('fadeInAnimation', [
    state('true' , style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('1 => 0', animate('100ms')),
    transition('0 => 1', animate('250ms'))
  ]);
  // trigger('fadeInAnimation', [
  //   transition('void => *', [
  //     style({opacity:0}), //style only for transition transition (after transiton it removes)
  //     animate(100, style({opacity:1})) // the new state of the transition(after transiton it removes)
  //   ]),
  //   transition('* => void', [
  //     animate(100, style({opacity:0})) // the new state of the transition(after transiton it removes)
  //   ])
  // ]);