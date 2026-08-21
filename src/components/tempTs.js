import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatDividerModule } from '@angular/material/divider';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatTooltipModule } from '@angular/material/tooltip';

import {
  selectCartItems
} from '../../../../store/cart/cart.selectors';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from '../../../../store/cart/cart.actions';


@Component({
  selector: 'app-cart-page',

  standalone: true,

  imports: [
    CurrencyPipe,

    MatCardModule,

    MatButtonModule,

    MatIconModule,

    MatDividerModule,

    MatFormFieldModule,

    MatInputModule,

    MatTooltipModule
  ],

  templateUrl: './cart-page.html',

  styleUrl: './cart-page.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class CartPage {

  private store = inject(Store);

  private router = inject(Router);


  // ==========================================
  // CART ITEMS FROM NGRX
  // ==========================================

  cartItems = this.store.selectSignal(
    selectCartItems
  );


  // ==========================================
  // DELIVERY FEE
  // ==========================================

  readonly deliveryFee = 15;


  // ==========================================
  // PROMO RATE
  // ==========================================

  promoRate = signal(0.20);


  // ==========================================
  // PROMO CODE
  // ==========================================

  promoCode = signal('');


  // ==========================================
  // SUBTOTAL
  // ==========================================

  subtotal = computed(() => {

    return this.cartItems().reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  });


  // ==========================================
  // DISCOUNT
  // ==========================================

  discountAmount = computed(() => {

    return this.subtotal() * this.promoRate();

  });


  // ==========================================
  // FINAL TOTAL
  // ==========================================

  finalTotal = computed(() => {

    return (
      this.subtotal()
      - this.discountAmount()
      + this.deliveryFee
    );

  });


  // ==========================================
  // INCREASE
  // ==========================================

  increaseQuantity(itemId: string): void {

    this.store.dispatch(
      increaseQuantity({
        productId: itemId
      })
    );

  }


  // ==========================================
  // DECREASE
  // ==========================================

  decreaseQuantity(itemId: string): void {

    this.store.dispatch(
      decreaseQuantity({
        productId: itemId
      })
    );

  }


  // ==========================================
  // REMOVE
  // ==========================================

  removeItem(itemId: string): void {

    this.store.dispatch(
      removeFromCart({
        productId: itemId
      })
    );

  }


  // ==========================================
  // PROMO
  // ==========================================

  applyPromoCode(): void {

    const code = this.promoCode()
      .trim()
      .toUpperCase();


    // Dummy validation

    if (code === 'SAVE20') {

      this.promoRate.set(0.20);

      return;
    }


    // Invalid / empty code

    this.promoRate.set(0);

  }


  // ==========================================
  // CHECKOUT
  // ==========================================

  checkout(): void {

    if (!this.cartItems().length) {
      return;
    }

    this.router.navigate(['/payment']);

  }

}