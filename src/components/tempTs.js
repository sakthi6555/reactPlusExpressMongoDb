// order model

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  image: string;
}

export type PaymentMethod = 'CARD' | 'UPI' | 'COD';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED';

export type OrderStatus =
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: string;

  userId: string;
  userEmail: string;

  items: OrderItem[];

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  paymentId?: string;

  createdAt: string;
}

export interface CreateOrderRequest {
  userId: string;
  userEmail: string;

  items: OrderItem[];

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  createdAt: string;
}







// payment model

import { PaymentMethod, PaymentStatus } from './order.model';

export interface CardPaymentDetails {
  cardHolderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;

  card?: CardPaymentDetails;

  upiId?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;

  status: PaymentStatus;

  createdAt: string;
}





// order service


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  CreateOrderRequest,
  Order
} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/orders';

  createOrder(
    order: CreateOrderRequest
  ) {
    return this.http.post<Order>(
      this.apiUrl,
      order
    );
  }

  getOrdersByUser(
    userId: string
  ) {
    return this.http.get<Order[]>(
      `${this.apiUrl}?userId=${userId}`
    );
  }

  getOrderById(
    orderId: string
  ) {
    return this.http.get<Order>(
      `${this.apiUrl}/${orderId}`
    );
  }

  updatePaymentStatus(
    orderId: string,
    paymentId: string,
    paymentStatus: 'SUCCESS' | 'FAILED'
  ) {

    return this.http.patch<Order>(
      `${this.apiUrl}/${orderId}`,
      {
        paymentId,
        paymentStatus,
        orderStatus:
          paymentStatus === 'SUCCESS'
            ? 'CONFIRMED'
            : 'PAYMENT_PENDING'
      }
    );
  }
}



//. payment service


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Payment,
  PaymentRequest
} from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/payments';

  createPayment(
    payment: PaymentRequest
  ) {
    return this.http.post<Payment>(
      this.apiUrl,
      payment
    );
  }

  getPaymentStatus(
    paymentId: string
  ) {
    return this.http.get<Payment>(
      `${this.apiUrl}/${paymentId}`
    );
  }
}






// payment state


import { Payment } from '../../core/models/payment.model';

export interface PaymentState {

  payment: Payment | null;

  orderId: string | null;

  status:
    | 'IDLE'
    | 'CREATING_ORDER'
    | 'CREATING_PAYMENT'
    | 'PROCESSING'
    | 'SUCCESS'
    | 'FAILED';

  error: string | null;
}

export const initialPaymentState: PaymentState = {

  payment: null,

  orderId: null,

  status: 'IDLE',

  error: null
};







//. payment action


import { createAction, props } from '@ngrx/store';

import { PaymentRequest } from '../../core/models/payment.model';
import { Payment } from '../../core/models/payment.model';

export const payNow = createAction(
  '[Payment] Pay Now',
  props<{
    payment: PaymentRequest;
  }>()
);

export const paymentSuccess = createAction(
  '[Payment] Payment Success',
  props<{
    payment: Payment;
  }>()
);

export const paymentFailed = createAction(
  '[Payment] Payment Failed',
  props<{
    payment: Payment;
  }>()
);

export const paymentError = createAction(
  '[Payment] Payment Error',
  props<{
    error: string;
  }>()
);

export const resetPayment = createAction(
  '[Payment] Reset Payment'
);






// payment reducer


import { createReducer, on } from '@ngrx/store';

import * as PaymentActions from './payment.actions';

import {
  initialPaymentState
} from './payment.state';

export const paymentReducer = createReducer(

  initialPaymentState,

  on(
    PaymentActions.payNow,
    state => ({
      ...state,
      status: 'CREATING_ORDER',
      error: null
    })
  ),

  on(
    PaymentActions.paymentSuccess,
    (state, { payment }) => ({
      ...state,
      payment,
      orderId: payment.orderId,
      status: 'SUCCESS',
      error: null
    })
  ),

  on(
    PaymentActions.paymentFailed,
    (state, { payment }) => ({
      ...state,
      payment,
      orderId: payment.orderId,
      status: 'FAILED'
    })
  ),

  on(
    PaymentActions.paymentError,
    (state, { error }) => ({
      ...state,
      status: 'FAILED',
      error
    })
  ),

  on(
    PaymentActions.resetPayment,
    () => initialPaymentState
  )
);






//. payment selector


import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { PaymentState } from './payment.state';

export const selectPaymentState =
  createFeatureSelector<PaymentState>('payment');

export const selectPayment =
  createSelector(
    selectPaymentState,
    state => state.payment
  );

export const selectPaymentStatus =
  createSelector(
    selectPaymentState,
    state => state.status
  );

export const selectPaymentError =
  createSelector(
    selectPaymentState,
    state => state.error
  );

export const selectOrderId =
  createSelector(
    selectPaymentState,
    state => state.orderId
  );







// effect


import { Injectable, inject } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';

import {
  Store
} from '@ngrx/store';

import {
  catchError,
  map,
  switchMap,
  takeWhile,
  timer,
  withLatestFrom
} from 'rxjs';

import { of } from 'rxjs';

import * as PaymentActions
  from './payment.actions';

import {
  OrderService
} from '../../core/services/order.service';

import {
  PaymentService
} from '../../core/services/payment.service';

import {
  selectCartItems
} from '../cart/cart.selectors';

@Injectable()
export class PaymentEffects {

  private readonly actions$ =
    inject(Actions);

  private readonly store =
    inject(Store);

  private readonly orderService =
    inject(OrderService);

  private readonly paymentService =
    inject(PaymentService);


  payNow$ = createEffect(() => {

    return this.actions$.pipe(

      ofType(PaymentActions.payNow),

      withLatestFrom(
        this.store.select(selectCartItems)
      ),

      // --------------------------------
      // 1. CREATE ORDER
      // --------------------------------

      switchMap(([action, cartItems]) => {

        const order =
          this.createOrderPayload(
            cartItems,
            action.payment
          );

        return this.orderService
          .createOrder(order)

          // --------------------------------
          // 2. CREATE PAYMENT
          // --------------------------------

          .pipe(

            switchMap(createdOrder => {

              return this.paymentService
                .createPayment({

                  ...action.payment,

                  orderId: createdOrder.id

                })

                // --------------------------------
                // 3. START POLLING
                // --------------------------------

                .pipe(

                  switchMap(payment => {

                    return timer(0, 3000).pipe(

                      switchMap(() =>
                        this.paymentService
                          .getPaymentStatus(
                            payment.id
                          )
                      ),

                      takeWhile(
                        currentPayment =>
                          currentPayment.status ===
                          'PROCESSING',
                        true
                      ),

                      map(finalPayment => ({
                        order: createdOrder,
                        payment: finalPayment
                      }))

                    );

                  })

                );

            })

          );

      }),

      // --------------------------------
      // 4. PAYMENT RESULT
      // --------------------------------

      map(({ order, payment }) => {

        if (
          payment.status === 'SUCCESS'
        ) {

          return PaymentActions.paymentSuccess({
            payment
          });

        }

        return PaymentActions.paymentFailed({
          payment
        });

      }),

      catchError(error => {

        console.error(
          'Payment flow failed',
          error
        );

        return of(
          PaymentActions.paymentError({
            error:
              'Unable to process payment.'
          })
        );

      })

    );

  });


  // --------------------------------------
  // UPDATE ORDER AFTER PAYMENT
  // --------------------------------------

  updateOrder$ = createEffect(
    () => {

      return this.actions$.pipe(

        ofType(
          PaymentActions.paymentSuccess,
          PaymentActions.paymentFailed
        ),

        switchMap(({ payment }) => {

          return this.orderService
            .updatePaymentStatus(

              payment.orderId,

              payment.id,

              payment.status === 'SUCCESS'
                ? 'SUCCESS'
                : 'FAILED'

            );

        })

      );

    },

    {
      dispatch: false
    }

  );


  private createOrderPayload(
    cartItems: any[],
    payment: any
  ) {

    const subtotal =
      cartItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      );

    const discount =
      subtotal * 0.20;

    const deliveryFee = 15;

    const total =
      subtotal -
      discount +
      deliveryFee;

    return {

      userId: 'USR-001',
      userEmail: 'test@example.com',

      items: cartItems.map(item => ({

        productId: item.id,

        name: item.name,

        price: item.price,

        quantity: item.quantity,

        selectedColor:
          item.selectedColor,

        selectedSize:
          item.selectedSize,

        image: item.image

      })),

      subtotal,

      discount,

      deliveryFee,

      total,

      paymentMethod:
        payment.paymentMethod,

      paymentStatus:
        'PENDING',

      orderStatus:
        'PAYMENT_PENDING',

      createdAt:
        new Date().toISOString()

    };

  }

}







// extra effects code



@Injectable()
export class PaymentEffects {

  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  private readonly orderService = inject(OrderService);
  private readonly paymentService = inject(PaymentService);


  // 1. CREATE ORDER
  //    ↓
  // 2. CREATE PAYMENT
  //    ↓
  // 3. POLL PAYMENT
  payNow$ = createEffect(() => {

    return this.actions$.pipe(

      ofType(PaymentActions.payNow),

      // your existing code...
      
    );
  });


  // UPDATE ORDER AFTER PAYMENT
  updateOrder$ = createEffect(
    () => {

      return this.actions$.pipe(

        ofType(
          PaymentActions.paymentSuccess,
          PaymentActions.paymentFailed
        ),

        switchMap(({ payment }) => {

          return this.orderService.updatePaymentStatus(
            payment.orderId,
            payment.id,
            payment.status === 'SUCCESS'
              ? 'SUCCESS'
              : 'FAILED'
          );

        })

      );

    },
    {
      dispatch: false
    }
  );


  // CLEAR CART AFTER SUCCESSFUL PAYMENT
  clearCartAfterPayment$ = createEffect(() => {

    return this.actions$.pipe(

      ofType(
        PaymentActions.paymentSuccess
      ),

      map(() =>
        CartActions.clearCart()
      )

    );

  });

}








// payment form component ts


import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import * as PaymentActions from '../../../../store/payment/payment.actions';
import { selectPaymentStatus } from '../../../../store/payment/payment.selectors';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss'
})
export class PaymentForm {

  private readonly store = inject(Store);

  readonly paymentStatus$ =
    this.store.select(selectPaymentStatus);


  onPayNow(): void {

    // Validate your form first

    // Then dispatch:
    this.store.dispatch(
      PaymentActions.payNow({
        payment: this.createPaymentRequest()
      })
    );
  }


  private createPaymentRequest() {

    // Your existing payment form values

    return {
      orderId: '',
      amount: 96015,
      paymentMethod: 'CARD' as const,

      card: {
        cardHolderName: 'Test User',
        cardNumber: 'TEST_CARD',
        expiry: '12/28',
        cvv: '123'
      }
    };
  }
}









// payment form htnl


<div class="payment-form">

  <!-- Your payment form fields -->

  <button
    mat-raised-button
    type="button"
    (click)="onPayNow()"
    [disabled]="(paymentStatus$ | async) === 'PROCESSING'">

    @if ((paymentStatus$ | async) === 'PROCESSING') {

      <mat-spinner
        diameter="20">
      </mat-spinner>

      <span>Processing...</span>

    } @else {

      <span>Pay Now</span>

    }

  </button>

</div>







