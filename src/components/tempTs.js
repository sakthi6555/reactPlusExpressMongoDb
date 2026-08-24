import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentForm {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);


  /*
   * Main payment form
   */
  paymentForm = this.fb.group({

    paymentMethod: [
      'card',
      Validators.required
    ],

    cardNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{16}$/)
      ]
    ],

    cardHolder: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    expiry: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]
    ],

    cvv: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{3}$/)
      ]
    ],

    upiId: [
      ''
    ]

  });


  /*
   * Selected payment method
   */
  get paymentMethod(): string {

    return this.paymentForm
      .get('paymentMethod')
      ?.value ?? 'card';

  }


  /*
   * Change payment method
   */
  onPaymentMethodChange(method: string): void {

    this.paymentForm
      .get('paymentMethod')
      ?.setValue(method);

    this.clearPaymentValidators();

    if (method === 'card') {

      this.setCardValidators();

    }

    if (method === 'upi') {

      this.setUpiValidators();

    }

  }


  /*
   * Card validators
   */
  private setCardValidators(): void {

    this.paymentForm.get('cardNumber')?.setValidators([
      Validators.required,
      Validators.pattern(/^\d{16}$/)
    ]);

    this.paymentForm.get('cardHolder')?.setValidators([
      Validators.required,
      Validators.minLength(3)
    ]);

    this.paymentForm.get('expiry')?.setValidators([
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ]);

    this.paymentForm.get('cvv')?.setValidators([
      Validators.required,
      Validators.pattern(/^\d{3}$/)
    ]);

    this.paymentForm.get('upiId')?.clearValidators();

    this.updateValidation();

  }


  /*
   * UPI validators
   */
  private setUpiValidators(): void {

    this.paymentForm.get('upiId')?.setValidators([
      Validators.required,
      Validators.pattern(/^[\w.-]+@[\w.-]+$/)
    ]);

    this.paymentForm.get('cardNumber')?.clearValidators();
    this.paymentForm.get('cardHolder')?.clearValidators();
    this.paymentForm.get('expiry')?.clearValidators();
    this.paymentForm.get('cvv')?.clearValidators();

    this.updateValidation();

  }


  /*
   * Cash on Delivery
   */
  private clearPaymentValidators(): void {

    this.paymentForm.get('cardNumber')?.clearValidators();
    this.paymentForm.get('cardHolder')?.clearValidators();
    this.paymentForm.get('expiry')?.clearValidators();
    this.paymentForm.get('cvv')?.clearValidators();
    this.paymentForm.get('upiId')?.clearValidators();

    this.updateValidation();

  }


  /*
   * Refresh validation state
   */
  private updateValidation(): void {

    Object.keys(this.paymentForm.controls)
      .forEach(controlName => {

        this.paymentForm
          .get(controlName)
          ?.updateValueAndValidity();

      });

  }


  /*
   * Payment
   */
  pay(): void {

    if (this.paymentForm.invalid) {

      this.paymentForm.markAllAsTouched();

      return;
    }

    console.log(
      'Payment Details',
      this.paymentForm.getRawValue()
    );

    /*
     * Later:
     *
     * 1. Call payment API
     * 2. Create order
     * 3. Clear cart
     * 4. Navigate to orders
     */

    this.router.navigate(['/orders']);

  }

}