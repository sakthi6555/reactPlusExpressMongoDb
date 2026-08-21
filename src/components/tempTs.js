{
  path: 'product/:id',
  loadComponent: () =>
    import('./features/product/pages/product-detail/product-detail')
      .then(m => m.ProductDetail),

  resolve: {
    product: productDetailResolver
  }
}



import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../services/product.service';

export const productDetailResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot
) => {

  const productService = inject(ProductService);

  const productId = route.paramMap.get('id')!;

  return productService.getProductById(productId);
};