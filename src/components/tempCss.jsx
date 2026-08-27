// order history html

import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import {
  CurrencyPipe,
  DatePipe
} from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCardModule
  ],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHistory {

  readonly orders =
    input.required<Order[]>();

}




//. html


<div class="history-list">

  @for (order of orders(); track order.id) {

    <mat-card class="history-card">

      <div class="history-header">

        <div>

          <h3>
            Order #{{ order.id }}
          </h3>

          <span>
            {{ order.createdAt | date:'mediumDate' }}
          </span>

        </div>

        <span class="status">
          {{ order.orderStatus }}
        </span>

      </div>


      <div class="history-content">

        <span>
          {{ order.items.length }} item(s)
        </span>

        <strong>
          {{ order.total | currency:'INR' }}
        </strong>

      </div>

    </mat-card>

  }

</div>




// scss


.history-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.history-card {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  box-shadow: none;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-header h3 {
  margin: 0 0 5px;
}

.history-header span {
  color: #777;
  font-size: 13px;
}

.status {
  padding: 5px 12px;
  border-radius: 999px;
  background: #f1f1f1;
  font-size: 12px;
  font-weight: 600;
}

.history-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}




