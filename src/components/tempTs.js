<button
  mat-icon-button
  [matMenuTriggerFor]="cartMenu"
  aria-label="Shopping cart"
>
  <mat-icon>shopping_cart</mat-icon>
</button>


<mat-menu
  #cartMenu="matMenu"
  class="cart-menu"
>

  <div
    class="cart-popover"
    (click)="$event.stopPropagation()"
  >

    <!-- Header -->

    <div class="cart-header">

      <h3>Shopping Cart</h3>

    </div>


    <!-- Empty Cart -->

    @if (cartIsEmpty | async) {

      <div class="empty-cart">

        <mat-icon>shopping_cart</mat-icon>

        <p>Your cart is empty.</p>

        <span>
          Add products to your cart to see them here.
        </span>

      </div>

    }


    <!-- Cart Items -->

    @else {

      <div class="cart-items">

        @for (
          item of (cartItems | async);
          track item.id
        ) {

          <div class="cart-item">

            <!-- Product Image -->

            <img
              [src]="item.image"
              [alt]="item.name"
              class="product-image"
            />


            <!-- Product Details -->

            <div class="product-details">

              <div class="product-name">
                {{ item.name }}
              </div>

              <div class="product-price">
                ₹{{ item.price }}
              </div>


              <!-- Quantity -->

              <div class="quantity-controls">

                <button
                  mat-icon-button
                  (click)="decrease(item.id)"
                  aria-label="Decrease quantity"
                >
                  <mat-icon>remove</mat-icon>
                </button>


                <span class="quantity">
                  {{ item.quantity }}
                </span>


                <button
                  mat-icon-button
                  (click)="increase(item.id)"
                  aria-label="Increase quantity"
                >
                  <mat-icon>add</mat-icon>
                </button>

              </div>

            </div>

          </div>

        }

      </div>


      <!-- Footer -->

      <div class="cart-footer">

        <div class="total">

          <span>Total</span>

          <strong>
            ₹{{ cartTotal | async }}
          </strong>

        </div>


        <button
          mat-raised-button
          color="primary"
          (click)="viewCart()"
        >
          View Cart
        </button>

      </div>

    }

  </div>

</mat-menu>



css



.cart-popover {
  width: 360px;
}

.cart-header {
  padding: 16px;
  border-bottom: 1px solid #ddd;

  h3 {
    margin: 0;
  }
}

.cart-items {
  max-height: 350px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.product-details {
  flex: 1;
}

.product-name {
  font-weight: 500;
}

.product-price {
  margin-top: 4px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.quantity {
  min-width: 25px;
  text-align: center;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;

  mat-icon {
    font-size: 40px;
    width: 40px;
    height: 40px;
  }

  p {
    font-weight: 500;
    margin: 12px 0 4px;
  }

  span {
    font-size: 13px;
  }
}

.cart-footer {
  padding: 16px;
  border-top: 1px solid #ddd;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}