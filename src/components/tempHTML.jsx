<mat-card class="current-order-card">

  <mat-card-header>
    <mat-card-title>
      REVIEW YOUR ORDER
    </mat-card-title>

    <mat-card-subtitle>
      Items you're purchasing
    </mat-card-subtitle>
  </mat-card-header>


  <mat-card-content>

    @if (cartItems$ | async; as items) {

      @if (items.length > 0) {

        <div class="order-items">

          @for (item of items; track item.id) {

            <div class="order-item">

              <!-- Product Image -->
              <div class="product-image">

                <img
                  [src]="item.image"
                  [alt]="item.name"
                />

              </div>


              <!-- Product Details -->
              <div class="product-details">

                <h3>
                  {{ item.name }}
                </h3>

                <p>
                  Color:
                  {{ item.selectedColor || item.availableColors[0] }}
                </p>

                <p>
                  Size:
                  {{ item.selectedSize || item.availableSizes[0] }}
                </p>

                <p>
                  Quantity:
                  {{ item.quantity }}
                </p>

              </div>


              <!-- Price -->
              <div class="product-price">

                <span>
                  ₹{{ item.price | number:'1.0-0' }}
                </span>

                <small>
                  × {{ item.quantity }}
                </small>

              </div>

            </div>

          }

        </div>

      } @else {

        <div class="empty-order">

          <mat-icon>
            shopping_cart
          </mat-icon>

          <p>
            Your cart is empty.
          </p>

        </div>

      }

    }

  </mat-card-content>

</mat-card>