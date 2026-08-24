.current-order-card {
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  box-shadow: none;
}

mat-card-header {
  padding-bottom: 16px;
}

mat-card-title {
  font-size: 20px;
  font-weight: 700;
}

.order-items {
  display: flex;
  flex-direction: column;
}

.order-item {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 20px;
  padding: 20px 0;

  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }
}

.product-image {
  width: 90px;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.product-details {

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 4px 0;
    color: #777;
    font-size: 13px;
  }
}

.product-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-weight: 600;

  span {
    font-size: 17px;
  }

  small {
    margin-top: 5px;
    color: #777;
  }
}

.empty-order {
  min-height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #777;

  mat-icon {
    font-size: 40px;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 600px) {

  .order-item {
    grid-template-columns: 70px 1fr;
  }

  .product-image {
    width: 70px;
    height: 70px;
  }

  .product-price {
    grid-column: 2;
    align-items: flex-start;
  }
}