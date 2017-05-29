import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable }             from '@angular/core';
import { Effect, Actions }        from '@ngrx/effects';
import { Action }                 from '@ngrx/store';
import { Observable }             from 'rxjs/Observable';
import { of }                     from 'rxjs/observable/of';
import { ProductsApiClient }      from '../../../products/productsApiClient.service';
import * as productsActions       from '../actions/products.action';
import * as productDetailsActions from '../actions/product-details.action';
import { Store }                  from '@ngrx/store';
import * as store                 from '../index';
import { Product }                from '../../models';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsApiClient: ProductsApiClient,
    private appState$: Store<store.State>) {}

  /**
   * Product list
   */
  @Effect()
  getProducts$: Observable<Action> = this.actions$
    .ofType(productsActions.ActionTypes.LOAD)
    .map((action: productsActions.LoadAction) => action.payload)
    .switchMap(state => {
      return this.productsApiClient.getProducts()
        .map(products => new productsActions.LoadSuccessAction(products))
        .catch(error  => of(new productsActions.LoadFailAction()));
    });

  /**
   * Product details
   */
  @Effect()
  getProductDetails$: Observable<Action> = this.actions$
    .ofType(productDetailsActions.ActionTypes.LOAD)
    .map((action: productDetailsActions.LoadAction) => action.payload)
    .switchMap(state => {
      return this.productsApiClient.getProductDetails(state)
        .map(products => new productDetailsActions.LoadSuccessAction(products))
        .catch(error  => of(new productDetailsActions.LoadFailAction()));
    });
}