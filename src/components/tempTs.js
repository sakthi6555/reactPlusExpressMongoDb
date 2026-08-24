import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { selectCartItems } from '../../../../store/cart/cart.selectors';

@Component({
  selector: 'app-current-order',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    DecimalPipe
  ],
  templateUrl: './current-order.html',
  styleUrl: './current-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentOrder {

  private readonly store = inject(Store);

  readonly cartItems$ = this.store.select(selectCartItems);
}