import {
  Component,
  ChangeDetectionStrategy
}                           from '@angular/core';
import { Router }           from '@angular/router';
import { Subscription }     from "rxjs";
import { ProductsSandbox }  from './products.sandbox';
import { Product }          from '../shared/models';

@Component({
  selector: 'app-products',
  template: `
    <app-layout>
      <h1>{{ 'Products.Title' | translate }}</h1>
      <div class="products-grid-wrapper">
        <ngx-datatable
          class="material striped"
          [rows]="productsSandbox.products$ | async"
          [columns]="[
            { prop: 'name', name: 'ProductDetails.Name' | translate },
            { prop: 'serialNumber', name: 'ProductDetails.SerialNumber' | translate },
            { prop: 'warrantyExpiration', name: 'ProductDetails.WarrantyExpiration' | translate },
            { prop: 'category', name: 'ProductDetails.Category' | translate },
            { prop: 'price', name: 'ProductDetails.Price' | translate },
            { prop: 'currency', name: 'ProductDetails.Currency' | translate }
          ]"
          [columnMode]="'force'"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="43"
          [limit]="10"
          [selectionType]="'single'"
          (select)="onSelect($event)">
        </ngx-datatable>

        <spinner [isRunning]="productsSandbox.productsLoading$ | async"></spinner>
      </div>
    </app-layout>
  `,
  styles: ['.products-grid-wrapper { position: relative; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  constructor(
    private router: Router,
    public productsSandbox: ProductsSandbox
  ) {}

  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onSelect({ selected }): void {
    this.productsSandbox.selectProduct(selected[0]);
    this.router.navigate(['/products', selected[0].id]);
  }
}
