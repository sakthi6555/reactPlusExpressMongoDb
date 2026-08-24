import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { map } from 'rxjs';

import { selectCartItems } from '../../../../store/cart/cart.selectors';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [
    DecimalPipe,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './payment-summary.html',
  styleUrl: './payment-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSummary {

  private readonly store = inject(Store);

  readonly cartItems$ = this.store.select(selectCartItems);

  readonly subtotal$ = this.cartItems$.pipe(
    map(items =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      )
    )
  );

  readonly discount$ = this.subtotal$.pipe(
    map(subtotal => subtotal * 0.20)
  );

  readonly deliveryFee$ = this.cartItems$.pipe(
    map(items => items.length > 0 ? 15 : 0)
  );

  readonly total$ = this.subtotal$.pipe(
    map(subtotal => subtotal - subtotal * 0.20 + 15)
  );
}