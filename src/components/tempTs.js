// NEW
export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);




on(
  CartActions.loadCartSuccess,
  (state, { items }) => ({
    ...state,
    items
  })
)







// effect

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';

import * as CartActions from './cart.actions';
import { selectCartItems } from './cart.selectors';
import { CartItem } from './cart.state';

@Injectable()
export class CartEffects {

  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  // Save cart whenever cart changes
  saveCart$ = createEffect(
    () => {

      return this.actions$.pipe(

        ofType(
          CartActions.addToCart,
          CartActions.increaseQuantity,
          CartActions.decreaseQuantity,
          CartActions.removeFromCart,
          CartActions.clearCart
        ),

        withLatestFrom(
          this.store.select(selectCartItems)
        ),

        tap(([_, items]) => {

          localStorage.setItem(
            'cart',
            JSON.stringify(items)
          );

        })

      );

    },
    {
      dispatch: false
    }
  );


  // Load cart from localStorage
  loadCart$ = createEffect(() => {

    return this.actions$.pipe(

      ofType(CartActions.loadCart),

      map(() => {

        const storedCart =
          localStorage.getItem('cart');

        const items: CartItem[] =
          storedCart
            ? JSON.parse(storedCart)
            : [];

        return CartActions.loadCartSuccess({
          items
        });

      })

    );

  });

}

