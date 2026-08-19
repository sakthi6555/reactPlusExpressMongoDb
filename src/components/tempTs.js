import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import {
  selectProducts,
  selectProductsLoading
} from '../../stores/product.selectors';

import { loadProducts } from '../../stores/product.actions';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import {
  ProductFilterComponent,
  ProductFilter
} from '../../components/product-filter/product-filter.component';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    AsyncPipe,
    ProductFilterComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  private store = inject(Store);

  products = this.store.select(selectProducts);

  loading = this.store.select(selectProductsLoading);


  // Current filter value
  private filterSubject = new BehaviorSubject<ProductFilter>({
    search: '',
    category: 'all',
    sortBy: 'default'
  });


  // Products after search + category + sorting
  filteredProducts = combineLatest([
    this.products,
    this.filterSubject
  ]).pipe(

    map(([products, filter]) =>
      this.applyFilter(products, filter)
    )

  );


  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }


  onFilterChange(filter: ProductFilter): void {
    this.filterSubject.next(filter);
  }


  private applyFilter(
    products: Product[],
    filter: ProductFilter
  ): Product[] {

    let result = [...products];


    // -------------------------
    // SEARCH
    // -------------------------

    if (filter.search.trim()) {

      const searchText = filter.search
        .toLowerCase()
        .trim();

      result = result.filter(product =>
        product.title
          .toLowerCase()
          .includes(searchText)
      );
    }


    // -------------------------
    // CATEGORY
    // -------------------------

    if (filter.category !== 'all') {

      result = result.filter(product =>
        product.category === filter.category
      );
    }


    // -------------------------
    // SORT
    // -------------------------

    switch (filter.sortBy) {

      case 'name-asc':

        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        break;


      case 'name-desc':

        result.sort((a, b) =>
          b.title.localeCompare(a.title)
        );

        break;


      case 'price-asc':

        result.sort((a, b) =>
          a.price - b.price
        );

        break;


      case 'price-desc':

        result.sort((a, b) =>
          b.price - a.price
        );

        break;


      case 'rating-asc':

        result.sort((a, b) =>
          a.rating.rate - b.rating.rate
        );

        break;


      case 'rating-desc':

        result.sort((a, b) =>
          b.rating.rate - a.rating.rate
        );

        break;
    }


    return result;
  }


  viewProduct(event: Product): void {
    console.log(event);
  }


  addToCart(event: Product): void {
    console.log(event);
  }

}