// payment form on clicking paynow


onPayNow(): void {

  if (this.paymentForm.invalid) {

    this.paymentForm.markAllAsTouched();

    return;
  }

  const paymentRequest: PaymentRequest = {

    orderId: '',

    amount: this.totalAmount,

    paymentMethod:
      this.paymentForm.value.paymentMethod,

    card:
      this.paymentForm.value.paymentMethod === 'CARD'
        ? {
            cardHolderName:
              this.paymentForm.value.cardHolderName,

            cardNumber:
              this.paymentForm.value.cardNumber,

            expiry:
              this.paymentForm.value.expiry,

            cvv:
              this.paymentForm.value.cvv
          }
        : undefined,

    upiId:
      this.paymentForm.value.paymentMethod === 'UPI'
        ? this.paymentForm.value.upiId
        : undefined

  };

  this.store.dispatch(
    PaymentActions.payNow({
      payment: paymentRequest
    })
  );
}









//. 