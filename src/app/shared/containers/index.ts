import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { ComponentsModule } from '../components';
import { LayoutContainer }  from './layout/layout.container';
import { LayoutSandbox } 		from './layout/layout.sandbox';
import { TranslateModule } 	from 'ng2-translate';

export const CONTAINERS = [
  LayoutContainer
];

@NgModule({
  imports: [
  	CommonModule,
  	ComponentsModule,
  	TranslateModule
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
  providers: [LayoutSandbox]
})
export class ContainersModule { }