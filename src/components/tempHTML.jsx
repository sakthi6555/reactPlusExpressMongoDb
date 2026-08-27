// order list ts

import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { AsyncPipe } from '@angular/common';

import {
  catchError,
  map,
  of,
  shareReplay
} from 'rxjs';

import { OrderService } from '../../../../core/services/order.service';

import { CurrentOrder } from '../../components/current-order/current-order';
import { OrderHistory } from '../../components/order-history/order-history';

@Component({
  selector: 'app-order-list-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrentOrder,
    OrderHistory
  ],
  templateUrl: './order-list-page.html',
  styleUrl: './order-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListPage {

  private readonly orderService =
    inject(OrderService);


  /*
   * For now using dummy logged-in user.
   *
   * Later this should come from
   * your User/Auth state.
   */
  private readonly userId =
    'USR-001';


  readonly orders$ =
    this.orderService
      .getOrdersByUser(this.userId)
      .pipe(

        catchError(error => {

          console.error(
            'Unable to load orders',
            error
          );

          return of([]);

        }),

        shareReplay({
          bufferSize: 1,
          refCount: true
        })

      );


  readonly currentOrder$ =
    this.orders$.pipe(

      map(orders => {

        if (!orders.length) {
          return null;
        }

        return [...orders]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )[0];

      })

    );


  readonly orderHistory$ =
    this.orders$.pipe(

      map(orders => {

        return [...orders]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(1);

      })

    );
}





// order list html

<div class="orders-page">

  <div class="page-header">

    <h1>YOUR ORDERS</h1>

    <p>
      View your current order and previous orders
    </p>

  </div>


  @if (orders$ | async; as orders) {

    @if (orders.length === 0) {

      <div class="no-orders">

        <mat-icon>
          shopping_bag
        </mat-icon>

        <h2>No orders found</h2>

        <p>
          You haven't placed any orders yet.
        </p>

        <button
          mat-raised-button
          color="primary"
          routerLink="/products">

          Continue Shopping

        </button>

      </div>

    } @else {

      <!-- CURRENT ORDER -->

      <section class="current-order-section">

        <h2>Current Order</h2>

        @if (currentOrder$ | async; as currentOrder) {

          <app-current-order
            [order]="currentOrder">
          </app-current-order>

        }

      </section>


      <!-- ORDER HISTORY -->

      <section class="order-history-section">

        <h2>Order History</h2>

        @if (orderHistory$ | async; as history) {

          @if (history.length > 0) {

            <app-order-history
              [orders]="history">
            </app-order-history>

          } @else {

            <p class="no-history">
              No previous orders found.
            </p>

          }

        }

      </section>

    }

  }

</div>






// scss




.orders-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-header {
  margin-bottom: 40px;
}

.page-header h1 {
  margin: 0;
  font-size: 36px;
  font-weight: 800;
}

.page-header p {
  color: #777;
  margin-top: 8px;
}

.current-order-section,
.order-history-section {
  margin-bottom: 40px;
}

.current-order-section h2,
.order-history-section h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.no-orders {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px dashed #ddd;
  border-radius: 20px;
  background: #fafafa;
}

.no-orders mat-icon {
  width: 60px;
  height: 60px;
  font-size: 60px;
  margin-bottom: 20px;
}

.no-orders h2 {
  margin: 0;
}

.no-orders p {
  color: #777;
}

.no-history {
  color: #777;
}