import {
  Component,
  computed,
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

import { Product } from '../../../../core/models/product.model';

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
  // PRODUCT FROM RESOLVER
  // ==========================================

  product: Product =
    this.route.snapshot.data['product'];


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

    const item = this.cartItems().find(
      item => item.id === this.product.id
    );

    return item?.quantity ?? 0;

  });


  // ==========================================
  // PRODUCT UI STATE
  // ==========================================

  selectedColor =
    signal(this.product.availableColors[0] ?? '');

  selectedSize =
    signal(this.product.availableSizes[0] ?? '');

  activeImage =
    signal(
      this.product.subImage?.[0]
      ?? this.product.image
    );


  // ==========================================
  // WISHLIST / COMPARE
  // ==========================================

  isWishlisted = signal(false);

  isCompared = signal(false);


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

    this.store.dispatch(
      addToCart({
        product: this.product
      })
    );

  }


  // ==========================================
  // INCREASE
  // ==========================================

  increase(): void {

    this.store.dispatch(
      increaseQuantity({
        productId: this.product.id
      })
    );

  }


  // ==========================================
  // DECREASE
  // ==========================================

  decrease(): void {

    this.store.dispatch(
      decreaseQuantity({
        productId: this.product.id
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

    return Array.from(
      { length: 5 },
      (_, index) =>
        index < Math.round(this.product.rating)
    );

  });

}