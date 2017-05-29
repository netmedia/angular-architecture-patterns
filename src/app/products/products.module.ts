import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { BrowserModule }            from "@angular/platform-browser";
import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormControl
}                                   from "@angular/forms";
import { RouterModule }             from '@angular/router';
import { ProductsRoutingModule }    from './products-routing.module';
import { ProductsComponent }        from './products.component';
import { ProductDetailsComponent }  from './product-details.component';
import { ProductsSandbox }          from './products.sandbox';
import { ProductsApiClient }        from './productsApiClient.service';
import { ProductsService }          from './products.service';
import { ProductsResolver }         from './products.resolver';

import { ComponentsModule }         from '../shared/components';
import { ContainersModule }         from '../shared/containers';
import { TranslateModule }          from 'ng2-translate';
import { NgxDatatableModule }       from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    ContainersModule,
    TranslateModule,
    BrowserModule,  
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  providers: [
    ProductsSandbox,
    ProductsService,
    ProductsApiClient,
    ProductsResolver
  ]
})
export class ProductsModule {}
