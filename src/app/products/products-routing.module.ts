import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { AuthGuard }                from '../shared/guards/auth.guard';
import { CanDeactivateGuard }       from '../shared/guards/canDeactivate.guard';
import { ProductsComponent }        from './products.component';
import { ProductDetailsComponent }  from './product-details.component';
import { ProductsResolver }         from './products.resolver';

const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      name: 'product-list'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    resolve: {
      productDetails: ProductsResolver
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
