import { Injectable }       from '@angular/core';
import {
  HttpService,
  GET,
  Path,
  Adapter
}                           from '../shared/asyncServices/http';
import { Observable }       from 'rxjs/Observable';
import { ProductsService }  from './products.service';

@Injectable()
export class ProductsApiClient extends HttpService {

  /**
   * Retrieves all products
   */
  @GET("/product")
  @Adapter(ProductsService.gridAdapter)
  public getProducts(): Observable<any> { return null; };

  /**
   * Retrieves product details by a given id
   * 
   * @param id
   */
  @GET("/product/{id}")
  @Adapter(ProductsService.productDetailsAdapter)
  public getProductDetails(@Path("id") id: number): Observable<any> { return null; };
}