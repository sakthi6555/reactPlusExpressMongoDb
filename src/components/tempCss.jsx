]import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {

  readonly currentYear =
    new Date().getFullYear();

}





<footer class="footer">

  <div class="footer-container">

    <!-- Brand -->
    <div class="footer-section brand-section">

      <h2>AnguShop</h2>

      <p>
        Your one-stop destination for
        quality products at great prices.
      </p>

      <div class="social-links">

        <button
          mat-icon-button
          aria-label="Facebook">

          <mat-icon>facebook</mat-icon>

        </button>

        <button
          mat-icon-button
          aria-label="Instagram">

          <mat-icon>photo_camera</mat-icon>

        </button>

        <button
          mat-icon-button
          aria-label="Twitter">

          <mat-icon>alternate_email</mat-icon>

        </button>

      </div>

    </div>


    <!-- Quick Links -->
    <div class="footer-section">

      <h3>Quick Links</h3>

      <a routerLink="/">
        Home
      </a>

      <a routerLink="/products">
        Products
      </a>

      <a routerLink="/orders">
        Orders
      </a>

      <a routerLink="/cart">
        Cart
      </a>

    </div>


    <!-- Customer Service -->
    <div class="footer-section">

      <h3>Customer Service</h3>

      <a href="#">
        Contact Us
      </a>

      <a href="#">
        Shipping Information
      </a>

      <a href="#">
        Returns & Refunds
      </a>

      <a href="#">
        FAQs
      </a>

    </div>


    <!-- Contact -->
    <div class="footer-section">

      <h3>Contact</h3>

      <p>
        <mat-icon>location_on</mat-icon>
        Chennai, India
      </p>

      <p>
        <mat-icon>email</mat-icon>
        support@angushop.com
      </p>

      <p>
        <mat-icon>phone</mat-icon>
        +91 98765 43210
      </p>

    </div>

  </div>


  <div class="footer-bottom">

    <p>
      © {{ currentYear }} AnguShop.
      All rights reserved.
    </p>

    <div>

      <a href="#">
        Privacy Policy
      </a>

      <a href="#">
        Terms & Conditions
      </a>

    </div>

  </div>

</footer>









.footer {
  margin-top: 60px;
  background: #212121;
  color: #ffffff;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;

  display: grid;
  grid-template-columns:
    2fr 1fr 1fr 1.5fr;

  gap: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand-section h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
}

.brand-section p {
  max-width: 280px;
  color: #bdbdbd;
  line-height: 1.6;
}

.footer-section h3 {
  margin: 0 0 10px;
  font-size: 16px;
}

.footer-section a {
  color: #bdbdbd;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-section a:hover {
  color: #ffffff;
}

.footer-section p {
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0;

  color: #bdbdbd;
  font-size: 14px;
}

.footer-section p mat-icon {
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.social-links {
  display: flex;
  gap: 4px;
}

.social-links button {
  color: #ffffff;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;

  border-top: 1px solid #424242;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #9e9e9e;
  font-size: 13px;
}

.footer-bottom p {
  margin: 0;
}

.footer-bottom div {
  display: flex;
  gap: 20px;
}

.footer-bottom a {
  color: #9e9e9e;
  text-decoration: none;
}

.footer-bottom a:hover {
  color: #ffffff;
}


/* Responsive */

@media (max-width: 768px) {

  .footer-container {
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

}


@media (max-width: 480px) {

  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-bottom div {
    flex-direction: column;
    gap: 8px;
  }

}