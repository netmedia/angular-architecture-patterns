import { NgModule }         from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';

export const PIPES = [
  SanitizeHtmlPipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }