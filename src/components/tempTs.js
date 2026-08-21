<!-- ============================= -->
<!-- HEADER BANNER -->
<!-- ============================= -->

<section class="detail-banner">

  <div class="banner-content">

    <h1>
      PRODUCT <span>DETAIL</span>
    </h1>

    <p>Angushop Product Detail</p>

  </div>

</section>


<!-- ============================= -->
<!-- PRODUCT DETAIL -->
<!-- ============================= -->

<section class="product-detail-container">

  <!-- Product Title -->

  <h2 class="product-title">
    {{ product().name }}
  </h2>


  <div class="product-grid">


    <!-- ============================= -->
    <!-- LEFT: PRODUCT GALLERY -->
    <!-- ============================= -->

    <mat-card class="gallery-card">

      <mat-card-content>

        <!-- Main Image -->

        <div class="main-image-container">

          <img
            [src]="activeImage()"
            [alt]="product().name"
            class="main-image"
          />

        </div>


        <mat-divider></mat-divider>


        <!-- Thumbnails -->

        <div class="thumbnail-list">

          @for (
            image of product().subImage;
            track $index
          ) {

            <button
              mat-stroked-button
              class="thumbnail"
              [class.active]="activeImage() === image"
              (click)="selectImage(image)"
            >

              <img
                [src]="image"
                [alt]="product().name"
              />

            </button>

          }

        </div>

      </mat-card-content>

    </mat-card>


    <!-- ============================= -->
    <!-- RIGHT: PRODUCT INFORMATION -->
    <!-- ============================= -->

    <mat-card class="details-card">

      <mat-card-content>


        <!-- Price -->

        <div class="price">

          {{ product().price | currency:'INR':'symbol':'1.2-2' }}

        </div>


        <!-- Wishlist / Compare -->

        <div class="secondary-actions">

          <button
            mat-button
            type="button"
            (click)="toggleWishlist()"
          >

            <mat-icon>
              {{ isWishlisted()
                ? 'favorite'
                : 'favorite_border'
              }}
            </mat-icon>

            Wishlist

          </button>


          <button
            mat-button
            type="button"
            (click)="compareProduct()"
          >

            <mat-icon>
              compare_arrows
            </mat-icon>

            Compare

          </button>

        </div>


        <mat-divider></mat-divider>


        <!-- ============================= -->
        <!-- CART -->
        <!-- ============================= -->

        <div class="cart-action">

          @if (quantity() === 0) {

            <button
              mat-flat-button
              class="add-cart-button"
              (click)="onAddToCart()"
            >

              <mat-icon>
                shopping_cart
              </mat-icon>

              Add to Cart

            </button>

          } @else {

            <div class="quantity-control">

              <button
                mat-icon-button
                (click)="decrease()"
                aria-label="Decrease quantity"
              >

                <mat-icon>
                  remove
                </mat-icon>

              </button>


              <span class="quantity">
                {{ quantity() }}
              </span>


              <button
                mat-icon-button
                (click)="increase()"
                aria-label="Increase quantity"
              >

                <mat-icon>
                  add
                </mat-icon>

              </button>

            </div>

          }

        </div>


        <!-- ============================= -->
        <!-- SPECIFICATIONS -->
        <!-- ============================= -->

        <div class="specifications">

          <!-- Stock -->

          <div class="spec-row">

            <span class="spec-label">
              Stock
            </span>

            <span>
              {{ product().stock }}
            </span>

          </div>


          <!-- Color -->

          <div class="spec-row">

            <span class="spec-label">
              Color
            </span>

            <mat-form-field appearance="outline">

              <mat-label>
                Select Color
              </mat-label>

              <mat-select
                [value]="selectedColor()"
                (selectionChange)="selectColor($event.value)"
              >

                @for (
                  color of product().availableColors;
                  track color
                ) {

                  <mat-option [value]="color">
                    {{ color }}
                  </mat-option>

                }

              </mat-select>

            </mat-form-field>

          </div>


          <!-- Size -->

          <div class="spec-row">

            <span class="spec-label">
              Size
            </span>

            <mat-form-field appearance="outline">

              <mat-label>
                Select Size
              </mat-label>

              <mat-select
                [value]="selectedSize()"
                (selectionChange)="selectSize($event.value)"
              >

                @for (
                  size of product().availableSizes;
                  track size
                ) {

                  <mat-option [value]="size">
                    {{ size }}
                  </mat-option>

                }

              </mat-select>

            </mat-form-field>

          </div>

        </div>


        <mat-divider></mat-divider>


        <!-- ============================= -->
        <!-- DESCRIPTION -->
        <!-- ============================= -->

        <section class="description">

          <h3>
            DESCRIPTION
          </h3>

          <p>
            {{ product().description }}
          </p>

        </section>


        <!-- ============================= -->
        <!-- RATING -->
        <!-- ============================= -->

        <div class="rating">

          <div class="stars">

            @for (
              filled of stars();
              track $index
            ) {

              <mat-icon>
                {{ filled ? 'star' : 'star_border' }}
              </mat-icon>

            }

          </div>

          <span>
            {{ product().rating }}
          </span>

          <span class="review-count">
            ({{ product().reviewCount }} reviews)
          </span>

        </div>


        <!-- ============================= -->
        <!-- CATEGORY / BRAND -->
        <!-- ============================= -->

        <div class="tags">

          <mat-chip-set>

            <mat-chip>
              {{ product().category }}
            </mat-chip>

            <mat-chip>
              {{ product().brand }}
            </mat-chip>

            @if (product().isBestSeller) {

              <mat-chip>
                Best Seller
              </mat-chip>

            }

          </mat-chip-set>

        </div>

      </mat-card-content>

    </mat-card>

  </div>

</section>



// css



/* =========================================
   PRODUCT DETAIL BANNER
   ========================================= */

.detail-banner {
  width: 100%;
  padding: 55px 20px;
  box-sizing: border-box;

  text-align: center;

  background:
    repeating-linear-gradient(
      45deg,
      #f8f8f8,
      #f8f8f8 10px,
      #f2f2f2 10px,
      #f2f2f2 20px
    );
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
}

.banner-content h1 {
  margin: 0;

  font-size: 32px;
  font-weight: 700;
  letter-spacing: 1px;

  color: #333;
}

.banner-content h1 span {
  color: #e91e63;
}

.banner-content p {
  margin: 8px 0 0;

  font-size: 15px;
  color: #777;
}


/* =========================================
   MAIN CONTAINER
   ========================================= */

.product-detail-container {
  max-width: 1200px;

  margin: 40px auto;
  padding: 0 20px;

  box-sizing: border-box;
}


/* =========================================
   PRODUCT TITLE
   ========================================= */

.product-title {
  margin: 0 0 30px;

  font-size: 30px;
  font-weight: 700;

  line-height: 1.3;

  color: #222;
}


/* =========================================
   TWO COLUMN LAYOUT
   ========================================= */

.product-grid {
  display: grid;

  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  gap: 40px;

  align-items: start;
}


/* =========================================
   MATERIAL CARDS
   ========================================= */

.gallery-card,
.details-card {
  height: 100%;
  box-sizing: border-box;
}

.gallery-card mat-card-content,
.details-card mat-card-content {
  padding: 24px;
}


/* =========================================
   MAIN PRODUCT IMAGE
   ========================================= */

.main-image-container {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 420px;

  padding: 20px;

  box-sizing: border-box;

  background: #f6f6f6;

  border-radius: 6px;
}

.main-image {
  width: 100%;
  height: 100%;

  object-fit: contain;

  display: block;
}


/* =========================================
   THUMBNAIL GALLERY
   ========================================= */

.thumbnail-list {
  display: flex;

  gap: 12px;

  margin-top: 20px;

  padding-bottom: 5px;

  overflow-x: auto;
}

.thumbnail {
  flex: 0 0 auto;

  width: 75px;
  height: 75px;

  padding: 4px !important;

  box-sizing: border-box;

  border: 2px solid transparent;

  border-radius: 6px;

  background: #f7f7f7;

  cursor: pointer;

  overflow: hidden;
}

.thumbnail.active {
  border-color: #e91e63;
}

.thumbnail:hover {
  border-color: #e91e63;
}

.thumbnail img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: contain;
}


/* =========================================
   PRICE
   ========================================= */

.price {
  margin-bottom: 15px;

  font-size: 32px;
  font-weight: 700;

  color: #222;
}


/* =========================================
   WISHLIST / COMPARE
   ========================================= */

.secondary-actions {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 20px;
}

.secondary-action {
  color: #555;
}

.secondary-action:hover {
  color: #e91e63;
}

.secondary-action mat-icon {
  margin-right: 4px;
}


/* =========================================
   CART ACTION
   ========================================= */

.cart-action {
  margin: 25px 0;
}


/* Add To Cart */

.add-cart-button {
  width: 100%;

  min-height: 48px;

  background-color: #e91e63 !important;

  color: #fff !important;

  font-size: 16px;
  font-weight: 600;

  border-radius: 5px !important;
}

.add-cart-button mat-icon {
  margin-right: 6px;
}


/* =========================================
   QUANTITY CONTROL
   ========================================= */

.quantity-control {
  display: flex;

  align-items: center;
  justify-content: center;

  width: fit-content;

  margin: 0 auto;

  border: 1px solid #ddd;

  border-radius: 6px;

  overflow: hidden;

  background: #fff;
}

.quantity-control button {
  width: 42px;
  height: 42px;

  border-radius: 0;
}

.quantity-control button:hover {
  background: #f5f5f5;
}

.quantity {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 45px;
  height: 42px;

  font-size: 16px;
  font-weight: 600;

  color: #333;
}


/* =========================================
   SPECIFICATIONS
   ========================================= */

.specifications {
  margin-top: 25px;

  border: 1px solid #e5e5e5;

  border-radius: 6px;

  overflow: hidden;
}

.spec-row {
  display: grid;

  grid-template-columns: 120px 1fr;

  align-items: center;

  min-height: 65px;

  padding: 8px 15px;

  box-sizing: border-box;
}

.spec-row:nth-child(even) {
  background: #fafafa;
}

.spec-label {
  font-weight: 600;

  color: #555;
}


/* Material Select */

.spec-value {
  display: flex;

  align-items: center;
}

.spec-row mat-form-field {
  width: 220px;
}

.spec-row mat-form-field {
  margin: 0;
}


/* =========================================
   DESCRIPTION
   ========================================= */

.description {
  margin-top: 25px;
}

.description h3 {
  margin: 0 0 10px;

  font-size: 16px;
  font-weight: 700;

  letter-spacing: 0.5px;

  color: #333;
}

.description p {
  margin: 0;

  line-height: 1.7;

  font-size: 14px;

  color: #666;
}


/* =========================================
   RATING
   ========================================= */

.rating {
  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 20px;
}

.stars {
  display: flex;

  align-items: center;
}

.stars mat-icon {
  width: 20px;
  height: 20px;

  font-size: 20px;

  color: #e91e63;
}

.rating-value {
  font-weight: 600;

  color: #333;
}

.review-count {
  font-size: 14px;

  color: #777;
}


/* =========================================
   CATEGORY / BRAND TAGS
   ========================================= */

.tags {
  margin-top: 20px;
}

.tags mat-chip-set {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;
}


/* =========================================
   RESPONSIVE - TABLET
   ========================================= */

@media (max-width: 900px) {

  .product-grid {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .main-image-container {
    height: 400px;
  }

}


/* =========================================
   RESPONSIVE - MOBILE
   ========================================= */

@media (max-width: 600px) {

  .detail-banner {
    padding: 40px 15px;
  }

  .banner-content h1 {
    font-size: 25px;
  }

  .product-detail-container {
    margin: 25px auto;

    padding: 0 15px;
  }

  .product-title {
    font-size: 23px;

    margin-bottom: 20px;
  }

  .gallery-card mat-card-content,
  .details-card mat-card-content {
    padding: 16px;
  }

  .main-image-container {
    height: 300px;

    padding: 15px;
  }

  .main-image {
    height: 270px;
  }

  .price {
    font-size: 26px;
  }

  .secondary-actions {
    gap: 5px;

    flex-wrap: wrap;
  }

  .spec-row {
    grid-template-columns: 90px 1fr;

    min-height: 60px;
  }

  .spec-row mat-form-field {
    width: 100%;
  }

}