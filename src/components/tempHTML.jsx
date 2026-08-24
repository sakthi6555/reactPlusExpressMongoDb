<mat-card class="summary-card">

  <mat-card-header>

    <mat-card-title>
      Order Summary
    </mat-card-title>

  </mat-card-header>


  <mat-card-content>

    <div class="summary-row">

      <span>Subtotal</span>

      @if (subtotal$ | async; as subtotal) {
        <strong>
          ₹{{ subtotal | number:'1.0-0' }}
        </strong>
      }

    </div>


    <div class="summary-row discount">

      <span>Discount (-20%)</span>

      @if (discount$ | async; as discount) {
        <strong>
          -₹{{ discount | number:'1.0-0' }}
        </strong>
      }

    </div>


    <div class="summary-row">

      <span>Delivery Fee</span>

      @if (deliveryFee$ | async; as delivery) {
        <strong>
          ₹{{ delivery | number:'1.0-0' }}
        </strong>
      }

    </div>


    <mat-divider></mat-divider>


    <div class="summary-total">

      <span>Total</span>

      @if (total$ | async; as total) {
        <strong>
          ₹{{ total | number:'1.0-0' }}
        </strong>
      }

    </div>

  </mat-card-content>

</mat-card>