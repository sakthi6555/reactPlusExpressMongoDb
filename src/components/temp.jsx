<section class="cart-page">

  <!-- ===================================== -->
  <!-- HEADER -->
  <!-- ===================================== -->

  <div class="cart-header">

    <h1>
      YOUR CART
    </h1>

  </div>


  <!-- ===================================== -->
  <!-- EMPTY CART -->
  <!-- ===================================== -->

  @if (cartItems().length === 0) {

    <mat-card class="empty-cart-card">

      <mat-card-content>

        <mat-icon class="empty-cart-icon">
          shopping_cart
        </mat-icon>

        <h2>
          Your cart is empty
        </h2>

        <p>
          Add some products to your cart to see them here.
        </p>

        <button
          mat-flat-button
          class="continue-shopping-button"
          routerLink="/product"
        >
          Continue Shopping
        </button>

      </mat-card-content>

    </mat-card>

  }


  <!-- ===================================== -->
  <!-- CART CONTENT -->
  <!-- ===================================== -->

  @else {

    <div class="cart-layout">


      <!-- ================================= -->
      <!-- LEFT : CART ITEMS -->
      <!-- ================================= -->

      <mat-card class="cart-items-card">

        <mat-card-header>

          <mat-card-title>
            Cart Items
          </mat-card-title>

        </mat-card-header>


        <mat-card-content>

          @for (
            item of cartItems();
            track item.id;
            let last = $last
          ) {

            <div class="cart-item">


              <!-- PRODUCT IMAGE -->

              <div class="product-image-container">

                <img
                  [src]="item.image"
                  [alt]="item.name"
                  class="product-image"
                />

              </div>


              <!-- PRODUCT DETAILS -->

              <div class="product-details">

                <h3>
                  {{ item.name }}
                </h3>


                <p class="product-option">

                  Size:
                  {{ item.selectedSize || item.availableSizes[0] }}

                </p>


                <p class="product-option">

                  Color:
                  {{ item.selectedColor || item.availableColors[0] }}

                </p>


                <div class="product-price">

                  {{ item.price | currency:'INR':'symbol':'1.2-2' }}

                </div>

              </div>


              <!-- ACTIONS -->

              <div class="item-actions">


                <!-- DELETE -->

                <button
                  mat-icon-button
                  color="warn"
                  matTooltip="Remove item"
                  (click)="removeItem(item.id)"
                  aria-label="Remove item"
                >

                  <mat-icon>
                    delete_outline
                  </mat-icon>

                </button>


                <!-- QUANTITY -->

                <div class="quantity-control">


                  <button
                    mat-icon-button
                    (click)="decreaseQuantity(item.id)"
                    [disabled]="item.quantity <= 1"
                    aria-label="Decrease quantity"
                  >

                    <mat-icon>
                      remove
                    </mat-icon>

                  </button>


                  <span class="quantity">
                    {{ item.quantity }}
                  </span>


                  <button
                    mat-icon-button
                    (click)="increaseQuantity(item.id)"
                    [disabled]="
                      item.quantity >= item.stock
                    "
                    aria-label="Increase quantity"
                  >

                    <mat-icon>
                      add
                    </mat-icon>

                  </button>

                </div>

              </div>

            </div>


            @if (!last) {

              <mat-divider></mat-divider>

            }

          }

        </mat-card-content>

      </mat-card>


      <!-- ================================= -->
      <!-- RIGHT : ORDER SUMMARY -->
      <!-- ================================= -->

      <mat-card class="summary-card">

        <mat-card-header>

          <mat-card-title>
            Order Summary
          </mat-card-title>

        </mat-card-header>


        <mat-card-content>


          <!-- SUBTOTAL -->

          <div class="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              {{ subtotal() | currency:'INR':'symbol':'1.2-2' }}
            </strong>

          </div>


          <!-- DISCOUNT -->

          <div class="summary-row discount-row">

            <span>
              Discount (-20%)
            </span>

            <strong>
              -{{ discountAmount() | currency:'INR':'symbol':'1.2-2' }}
            </strong>

          </div>


          <!-- DELIVERY -->

          <div class="summary-row">

            <span>
              Delivery Fee
            </span>

            <strong>
              {{ deliveryFee | currency:'INR':'symbol':'1.2-2' }}
            </strong>

          </div>


          <mat-divider></mat-divider>


          <!-- TOTAL -->

          <div class="total-row">

            <span>
              Total
            </span>

            <strong>
              {{ finalTotal() | currency:'INR':'symbol':'1.2-2' }}
            </strong>

          </div>


          <!-- ================================= -->
          <!-- PROMO CODE -->
          <!-- ================================= -->

          <div class="promo-section">

            <mat-form-field
              appearance="outline"
              class="promo-field"
            >

              <mat-label>
                Add promo code
              </mat-label>

              <mat-icon matPrefix>
                sell
              </mat-icon>

              <input
                matInput
                [value]="promoCode()"
                (input)="
                  promoCode.set(
                    $any($event.target).value
                  )
                "
              />

            </mat-form-field>


            <button
              mat-flat-button
              class="apply-button"
              (click)="applyPromoCode()"
            >
              Apply
            </button>

          </div>


          <!-- ================================= -->
          <!-- CHECKOUT -->
          <!-- ================================= -->

          <button
            mat-flat-button
            class="checkout-button"
            (click)="checkout()"
          >

            Go to Checkout

            <mat-icon>
              arrow_forward
            </mat-icon>

          </button>

        </mat-card-content>

      </mat-card>

    </div>

  }

</section>





// css 


:host {
  display: block;
  min-height: 100%;
  background: #fafafa;
}


/* ==========================================
   PAGE
   ========================================== */

.cart-page {
  max-width: 1200px;

  margin: 0 auto;

  padding: 40px 20px 60px;

  box-sizing: border-box;
}


/* ==========================================
   HEADER
   ========================================== */

.cart-header {
  margin-bottom: 30px;
}

.cart-header h1 {
  margin: 0;

  font-family: sans-serif;

  font-size: 36px;

  font-weight: 800;

  letter-spacing: 0.5px;

  color: #111;
}


/* ==========================================
   TWO COLUMN LAYOUT
   ========================================== */

.cart-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.8fr)
    minmax(320px, 1fr);

  gap: 25px;

  align-items: start;
}


/* ==========================================
   CARDS
   ========================================== */

.cart-items-card,
.summary-card,
.empty-cart-card {
  border: 1px solid #e5e5e5;

  border-radius: 20px;

  background: #fff;

  box-shadow: none;
}

.cart-items-card mat-card-header,
.summary-card mat-card-header {
  padding: 24px 24px 10px;
}

.cart-items-card mat-card-title,
.summary-card mat-card-title {
  font-size: 20px;

  font-weight: 700;
}


/* ==========================================
   CART ITEMS
   ========================================== */

.cart-items-card mat-card-content {
  padding: 10px 24px 24px;
}

.cart-item {
  position: relative;

  display: grid;

  grid-template-columns: 120px minmax(0, 1fr) auto;

  gap: 20px;

  padding: 20px 0;

  align-items: center;
}


/* ==========================================
   IMAGE
   ========================================== */

.product-image-container {
  width: 120px;

  height: 120px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f4f4f4;

  border-radius: 12px;

  overflow: hidden;
}

.product-image {
  width: 100%;

  height: 100%;

  object-fit: contain;

  display: block;
}


/* ==========================================
   PRODUCT DETAILS
   ========================================== */

.product-details {
  min-width: 0;
}

.product-details h3 {
  margin: 0 0 10px;

  font-size: 17px;

  font-weight: 700;

  line-height: 1.4;

  color: #111;
}

.product-option {
  margin: 4px 0;

  font-size: 13px;

  color: #777;
}

.product-price {
  margin-top: 12px;

  font-size: 18px;

  font-weight: 700;

  color: #111;
}


/* ==========================================
   ACTIONS
   ========================================== */

.item-actions {
  display: flex;

  flex-direction: column;

  align-items: flex-end;

  justify-content: space-between;

  gap: 30px;

  height: 120px;
}


/* ==========================================
   QUANTITY
   ========================================== */

.quantity-control {
  display: flex;

  align-items: center;

  justify-content: center;

  min-width: 125px;

  height: 42px;

  padding: 0 5px;

  border-radius: 9999px;

  background: #f3f3f3;
}

.quantity-control button {
  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;
}

.quantity-control button:disabled {
  opacity: 0.4;
}

.quantity-control button mat-icon {
  font-size: 19px;

  width: 19px;

  height: 19px;
}

.quantity {
  min-width: 35px;

  text-align: center;

  font-size: 15px;

  font-weight: 600;

  color: #111;
}


/* ==========================================
   SUMMARY
   ========================================== */

.summary-card {
  position: sticky;

  top: 20px;
}

.summary-card mat-card-content {
  padding: 15px 24px 24px;
}


/* ==========================================
   SUMMARY ROW
   ========================================== */

.summary-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 12px 0;

  font-size: 14px;

  color: #555;
}

.summary-row strong {
  color: #111;

  font-weight: 600;
}

.discount-row {
  color: #e53935;
}

.discount-row strong {
  color: #e53935;
}


/* ==========================================
   TOTAL
   ========================================== */

.total-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 20px 0;

  font-size: 18px;

  font-weight: 700;

  color: #111;
}

.total-row strong {
  font-size: 22px;
}


/* ==========================================
   PROMO
   ========================================== */

.promo-section {
  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 15px;
}

.promo-field {
  flex: 1;

  min-width: 0;
}

.promo-field mat-icon {
  margin-right: 6px;

  color: #777;
}

.apply-button {
  height: 56px;

  padding: 0 20px;

  border-radius: 9999px;

  background: #111 !important;

  color: #fff !important;

  font-weight: 600;
}


/* ==========================================
   CHECKOUT
   ========================================== */

.checkout-button {
  width: 100%;

  height: 52px;

  margin-top: 15px;

  border-radius: 9999px;

  background: #111 !important;

  color: #fff !important;

  font-size: 15px;

  font-weight: 600;
}

.checkout-button mat-icon {
  margin-left: 8px;
}


/* ==========================================
   EMPTY CART
   ========================================== */

.empty-cart-card {
  text-align: center;

  padding: 50px 20px;
}

.empty-cart-card mat-card-content {
  display: flex;

  flex-direction: column;

  align-items: center;
}

.empty-cart-icon {
  width: 60px;

  height: 60px;

  font-size: 60px;

  color: #aaa;
}

.empty-cart-card h2 {
  margin: 20px 0 8px;

  font-size: 22px;

  color: #111;
}

.empty-cart-card p {
  margin: 0 0 25px;

  color: #777;
}

.continue-shopping-button {
  border-radius: 9999px;

  background: #111 !important;

  color: #fff !important;
}


/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 900px) {

  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }

}


@media (max-width: 600px) {

  .cart-page {
    padding: 25px 15px 40px;
  }

  .cart-header h1 {
    font-size: 30px;
  }

  .cart-item {
    grid-template-columns: 90px minmax(0, 1fr);

    gap: 15px;

    padding: 18px 0;
  }

  .product-image-container {
    width: 90px;

    height: 90px;
  }

  .item-actions {
    grid-column: 1 / -1;

    flex-direction: row;

    align-items: center;

    height: auto;

    gap: 10px;
  }

  .quantity-control {
    margin-left: auto;
  }

  .promo-section {
    align-items: stretch;
  }

  .apply-button {
    height: 56px;
  }

}