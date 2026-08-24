import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { CurrentOrder } from '../../components/current-order/current-order';
import { PaymentForm } from '../../components/payment-form/payment-form';
import { PaymentSummary } from '../../components/payment-summary/payment-summary';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CurrentOrder,
    PaymentForm,
    PaymentSummary
  ],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPage {

}