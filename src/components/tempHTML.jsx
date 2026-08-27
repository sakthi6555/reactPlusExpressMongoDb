<h2 mat-dialog-title>
  Login Required
</h2>

<mat-dialog-content>

  <p>
    Please login to continue with checkout.
  </p>

</mat-dialog-content>

<mat-dialog-actions align="end">

  <button
    mat-button
    mat-dialog-close="cancel">

    Cancel

  </button>

  <button
    mat-raised-button
    color="primary"
    [mat-dialog-close]="'login'">

    OK

  </button>

</mat-dialog-actions>




// ts

import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-required-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
  MatIconModule
  ],
  templateUrl: './login-required-dialog.html',
  styleUrl: './login-required-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRequiredDialog {}



// cart page

import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  AuthService
} from '../../../core/services/auth.service';

import {
  LoginRequiredDialog
} from '../../user/components/login-required-dialog/login-required-dialog';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPage {

  private readonly router =
    inject(Router);

  private readonly dialog =
    inject(MatDialog);

  private readonly authService =
    inject(AuthService);


  checkout(): void {

    // -------------------------
    // User is logged in
    // -------------------------

    if (this.authService.isLoggedIn()) {

      this.router.navigate([
        '/payment'
      ]);

      return;
    }


    // -------------------------
    // User is NOT logged in
    // -------------------------

    const dialogRef =
      this.dialog.open(
        LoginRequiredDialog,
        {
          width: '400px',
          disableClose: true
        }
      );


    dialogRef.afterClosed()
      .subscribe(result => {

        if (result === 'login') {

          this.router.navigate([
            '/login'
          ]);

        }

      });

  }

}


// html


<button
  mat-raised-button
  class="checkout-button"
  (click)="checkout()">

  Go to Checkout
  <mat-icon>arrow_forward</mat-icon>

</button>