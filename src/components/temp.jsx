import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import {
  increaseQuantity,
  decreaseQuantity
} from '../../../../store/cart/cart.actions';

import {
  selectCartItems,
  selectCartIsEmpty,
  selectCartTotal
} from '../../../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart-popover',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './cart-popover.html',
  styleUrl: './cart-popover.scss'
})
export class CartPopover {

  private store = inject(Store);
  private router = inject(Router);

  cartItems = this.store.select(selectCartItems);

  cartIsEmpty = this.store.select(selectCartIsEmpty);

  cartTotal = this.store.select(selectCartTotal);

  increase(productId: number): void {
    this.store.dispatch(
      increaseQuantity({ productId })
    );
  }

  decrease(productId: number): void {
    this.store.dispatch(
      decreaseQuantity({ productId })
    );
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }
}






