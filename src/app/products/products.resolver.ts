import { Injectable }       from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                           from '@angular/router';
import { ProductsSandbox }  from './products.sandbox';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  private productsSubscription;

  constructor(public productsSandbox: ProductsSandbox) {}

  /**
   * Triggered when application hits product details route.
   * It subscribes to product list data and finds one with id from the route params.  
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    if (this.productsSubscription) return;

    this.productsSubscription = this.productsSandbox.productDetails$.subscribe(product => {
      if (!product) {
        this.productsSandbox.loadProductDetails(parseInt(route.params.id));
        return;
      }

      this.productsSandbox.selectProduct(product);
    });
  }
}