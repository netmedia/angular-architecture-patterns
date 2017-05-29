import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
}                           from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Subscription }     from "rxjs";
import { ProductsSandbox }  from './products.sandbox';
import { Product }          from '../shared/models';

@Component({
  selector: 'app-product-details',
  template: `
    <app-layout>
      <h1>{{ 'ProductDetails.Title' | translate }}</h1>
      <div class="callout large">
        <h3>{{ product?.name }}</h3>

        <div class="productDetails-contentWrapper">
          <div class="columns">
            <h5>{{ 'ProductDetails.SerialNumber' | translate }}</h5>
            <p>{{ product?.serialNumber }}</p>
          </div>

          <div class="columns">
            <h5>{{ 'ProductDetails.Category' | translate }}</h5>
            <p>{{ product?.category }}</p>
          </div>

          <div class="columns">
            <h5>{{ 'ProductDetails.Description' | translate }}</h5>
            <p>{{ product?.description }}</p>
          </div>

          <div class="columns">
            <h5>{{ 'ProductDetails.WarrantyExpiration' | translate }}</h5>
            <p>{{ productsSandbox.formatDate(product?.warrantyExpiration) }}</p>
          </div>

          <div class="columns">
            <h5>{{ 'ProductDetails.Price' | translate }}</h5>
            <p>{{ product?.price }} {{ product?.currency }}</p>
          </div>
        </div>

        <a routerLink="/products">
          <button type="button" class="button basic-btn productDetails-backBtn">
            <strong><</strong> {{ 'BackBtn' | translate }}
          </button>
        </a>

        <spinner [isRunning]="productsSandbox.productDetailsLoading$ | async"></spinner>
        
      </div>
    </app-layout>
  `,
  styles: ['.productDetails-contentWrapper { margin-top: 20px; } .productDetails-backBtn { position: absolute; top: 20px; right: 20px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public product:        Product;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public productsSandbox: ProductsSandbox,
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerEvents(): void {
    // Subscribes to product details
    this.subscriptions.push(this.productsSandbox.productDetails$.subscribe((product: any) => {
      if (product) {
        this.changeDetector.markForCheck();
        this.product = product;
      }
    }));
  }
}
