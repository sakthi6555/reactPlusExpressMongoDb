export const PRODUCT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list')
        .then(m => m.ProductList)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail')
        .then(m => m.ProductDetail),

    resolve: {
      product: productDetailResolver
    }
  }

];


