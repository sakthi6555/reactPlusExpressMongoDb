<mat-card class="payment-card">

  <mat-card-header>

    <mat-card-title>
      PAYMENT METHOD
    </mat-card-title>

  </mat-card-header>


  <mat-card-content>

    <form [formGroup]="paymentForm">


      <!-- Payment Method -->

      <mat-radio-group
        formControlName="paymentMethod"
        (change)="onPaymentMethodChange($event.value)"
        class="payment-methods">

        <mat-radio-button value="card">
          Credit / Debit Card
        </mat-radio-button>

        <mat-radio-button value="upi">
          UPI
        </mat-radio-button>

        <mat-radio-button value="cod">
          Cash on Delivery
        </mat-radio-button>

      </mat-radio-group>


      <!-- ========================= -->
      <!-- CARD -->
      <!-- ========================= -->

      @if (paymentMethod === 'card') {

        <div class="payment-fields">


          <!-- Card Number -->

          <mat-form-field appearance="outline">

            <mat-label>
              Card Number
            </mat-label>

            <input
              matInput
              formControlName="cardNumber"
              maxlength="16"
              inputmode="numeric"
              placeholder="1234567890123456"
            />

            @if (
              paymentForm.get('cardNumber')?.hasError('required')
              && paymentForm.get('cardNumber')?.touched
            ) {

              <mat-error>
                Card number is required
              </mat-error>

            }

            @if (
              paymentForm.get('cardNumber')?.hasError('pattern')
            ) {

              <mat-error>
                Enter a valid 16 digit card number
              </mat-error>

            }

          </mat-form-field>


          <!-- Card Holder -->

          <mat-form-field appearance="outline">

            <mat-label>
              Card Holder Name
            </mat-label>

            <input
              matInput
              formControlName="cardHolder"
              placeholder="Enter card holder name"
            />

            @if (
              paymentForm.get('cardHolder')?.invalid
              && paymentForm.get('cardHolder')?.touched
            ) {

              <mat-error>
                Card holder name is required
              </mat-error>

            }

          </mat-form-field>


          <!-- Expiry + CVV -->

          <div class="card-row">


            <mat-form-field appearance="outline">

              <mat-label>
                Expiry
              </mat-label>

              <input
                matInput
                formControlName="expiry"
                maxlength="5"
                placeholder="MM/YY"
              />

              @if (
                paymentForm.get('expiry')?.invalid
                && paymentForm.get('expiry')?.touched
              ) {

                <mat-error>
                  Enter expiry as MM/YY
                </mat-error>

              }

            </mat-form-field>


            <mat-form-field appearance="outline">

              <mat-label>
                CVV
              </mat-label>

              <input
                matInput
                type="password"
                formControlName="cvv"
                maxlength="3"
                inputmode="numeric"
              />

              @if (
                paymentForm.get('cvv')?.invalid
                && paymentForm.get('cvv')?.touched
              ) {

                <mat-error>
                  Enter valid CVV
                </mat-error>

              }

            </mat-form-field>


          </div>

        </div>

      }


      <!-- ========================= -->
      <!-- UPI -->
      <!-- ========================= -->

      @if (paymentMethod === 'upi') {

        <div class="payment-fields">

          <mat-form-field appearance="outline">

            <mat-label>
              UPI ID
            </mat-label>

            <input
              matInput
              formControlName="upiId"
              placeholder="example@upi"
            />

            @if (
              paymentForm.get('upiId')?.invalid
              && paymentForm.get('upiId')?.touched
            ) {

              <mat-error>
                Enter a valid UPI ID
              </mat-error>

            }

          </mat-form-field>

        </div>

      }


      <!-- ========================= -->
      <!-- COD -->
      <!-- ========================= -->

      @if (paymentMethod === 'cod') {

        <div class="cod-message">

          <mat-icon>
            local_shipping
          </mat-icon>

          <p>
            You can pay when your order is delivered.
          </p>

        </div>

      }


      <!-- Pay -->

      <button
        mat-raised-button
        class="pay-button"
        type="button"
        (click)="pay()">

        Pay Now

      </button>


    </form>

  </mat-card-content>

</mat-card>