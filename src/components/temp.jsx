import {
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import {
  selectProductById
} from '../../../../store/product/product.selectors';

import {
  selectCartItems
} from '../../../../store/cart/cart.selectors';

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity
} from '../../../../store/cart/cart.actions';


@Component({
  selector: 'app-product-detail',
  standalone: true,

  imports: [
    CurrencyPipe,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule
  ],

  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {

  private route = inject(ActivatedRoute);

  private store = inject(Store);


  // ==========================================
  // PRODUCT ID FROM URL
  // ==========================================

  productId = this.route.snapshot.paramMap.get('id')!;


  // ==========================================
  // PRODUCT FROM NGRX
  // ==========================================

  product = this.store.selectSignal(
    selectProductById(this.productId)
  );


  // ==========================================
  // CART
  // ==========================================

  cartItems = this.store.selectSignal(
    selectCartItems
  );


  // ==========================================
  // CURRENT PRODUCT QUANTITY
  // ==========================================

  quantity = computed(() => {

    const currentProduct = this.product();

    if (!currentProduct) {
      return 0;
    }

    const cartItem = this.cartItems().find(
      item => item.id === currentProduct.id
    );

    return cartItem?.quantity ?? 0;
  });


  // ==========================================
  // PRODUCT UI STATE
  // ==========================================

  selectedColor = signal('');

  selectedSize = signal('');

  activeImage = signal('');


  // ==========================================
  // WISHLIST / COMPARE
  // ==========================================

  isWishlisted = signal(false);

  isCompared = signal(false);


  // ==========================================
  // INITIALIZE PRODUCT OPTIONS
  // ==========================================

  constructor() {

    effect(() => {

      const product = this.product();

      if (!product) {
        return;
      }

      this.activeImage.set(
        product.subImage?.[0] ?? product.image
      );

      this.selectedColor.set(
        product.availableColors?.[0] ?? ''
      );

      this.selectedSize.set(
        product.availableSizes?.[0] ?? ''
      );

    });

  }


  // ==========================================
  // IMAGE
  // ==========================================

  selectImage(image: string): void {

    this.activeImage.set(image);

  }


  // ==========================================
  // COLOR
  // ==========================================

  selectColor(color: string): void {

    this.selectedColor.set(color);

  }


  // ==========================================
  // SIZE
  // ==========================================

  selectSize(size: string): void {

    this.selectedSize.set(size);

  }


  // ==========================================
  // ADD TO CART
  // ==========================================

  onAddToCart(): void {

    const product = this.product();

    if (!product) {
      return;
    }

    this.store.dispatch(
      addToCart({
        product: product
      })
    );

  }


  // ==========================================
  // INCREASE
  // ==========================================

  increase(): void {

    const product = this.product();

    if (!product) {
      return;
    }

    this.store.dispatch(
      increaseQuantity({
        productId: product.id
      })
    );

  }


  // ==========================================
  // DECREASE
  // ==========================================

  decrease(): void {

    const product = this.product();

    if (!product) {
      return;
    }

    this.store.dispatch(
      decreaseQuantity({
        productId: product.id
      })
    );

  }


  // ==========================================
  // WISHLIST
  // ==========================================

  toggleWishlist(): void {

    this.isWishlisted.update(
      value => !value
    );

  }


  // ==========================================
  // COMPARE
  // ==========================================

  compareProduct(): void {

    this.isCompared.update(
      value => !value
    );

  }


  // ==========================================
  // RATING
  // ==========================================

  stars = computed(() => {

    const product = this.product();

    if (!product) {
      return [];
    }

    return Array.from(
      { length: 5 },
      (_, index) =>
        index < Math.round(product.rating)
    );

  });

}