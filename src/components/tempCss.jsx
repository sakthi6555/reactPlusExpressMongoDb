.payment-card {
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  box-shadow: none;
}

mat-card-title {
  font-size: 20px;
  font-weight: 700;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 20px 0 25px;
}

.payment-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

mat-form-field {
  width: 100%;
}

.card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cod-message {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 20px;

  border-radius: 12px;
  background: #f5f5f5;

  color: #555;

  mat-icon {
    flex-shrink: 0;
  }

  p {
    margin: 0;
  }
}

.pay-button {
  width: 100%;
  height: 48px;

  margin-top: 25px;

  border-radius: 999px;

  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 600px) {

  .card-row {
    grid-template-columns: 1fr;
  }

}