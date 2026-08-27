// cirrent order ts:


import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { CurrencyPipe, DatePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-current-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './current-order.html',
  styleUrl: './current-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentOrder {

  readonly order =
    input.required<Order>();

}




// html


<mat-card class="current-order-card">

  <mat-card-header>

    <div class="order-header">

      <div>

        <mat-card-title>
          Order #{{ order().id }}
        </mat-card-title>

        <mat-card-subtitle>
          {{ order().createdAt | date:'medium' }}
        </mat-card-subtitle>

      </div>

      <span
        class="order-status"
        [class.confirmed]="
          order().orderStatus === 'CONFIRMED'
        "
        [class.processing]="
          order().orderStatus === 'PROCESSING'
        "
        [class.cancelled]="
          order().orderStatus === 'CANCELLED'
        ">

        {{ order().orderStatus }}

      </span>

    </div>

  </mat-card-header>


  <mat-card-content>

    <div class="order-items">

      @for (item of order().items; track item.productId) {

        <div class="order-item">

          <img
            [src]="item.image"
            [alt]="item.name">

          <div class="item-details">

            <h3>
              {{ item.name }}
            </h3>

            <p>
              Color:
              {{ item.selectedColor }}
            </p>

            <p>
              Size:
              {{ item.selectedSize }}
            </p>

            <p>
              Quantity:
              {{ item.quantity }}
            </p>

          </div>

          <div class="item-price">

            {{ item.price * item.quantity | currency:'INR' }}

          </div>

        </div>

      }

    </div>


    <div class="order-total">

      <span>
        Total
      </span>

      <strong>
        {{ order().total | currency:'INR' }}
      </strong>

    </div>

  </mat-card-content>


  <mat-card-actions>

    <button
      mat-button
      color="primary">

      View Order Details

    </button>

  </mat-card-actions>

</mat-card>







// scsss



.current-order-card {
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  box-shadow: none;
}

.order-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-status {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.order-status.confirmed {
  background: #e8f5e9;
  color: #2e7d32;
}

.order-status.processing {
  background: #fff3e0;
  color: #ef6c00;
}

.order-status.cancelled {
  background: #ffebee;
  color: #c62828;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #ededed;
}

.order-item img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 12px;
  background: #f5f5f5;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.item-details p {
  margin: 3px 0;
  color: #777;
  font-size: 13px;
}

.item-price {
  font-weight: 600;
}

.order-total {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  font-size: 18px;
}