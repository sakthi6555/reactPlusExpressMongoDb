.summary-card {
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  box-shadow: none;
  background: #fff;

  // Keeps the summary visible while scrolling
  position: sticky;
  top: 20px;
}

mat-card-header {
  padding-bottom: 20px;
}

mat-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #222;
}

mat-card-content {
  padding-top: 10px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 18px;

  font-size: 15px;
  color: #555;

  strong {
    font-weight: 600;
    color: #222;
  }
}

.summary-row.discount {
  color: #e91e63;

  strong {
    color: #e91e63;
  }
}

mat-divider {
  margin: 8px 0 20px;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 18px;
  font-weight: 700;
  color: #222;

  strong {
    font-size: 22px;
    font-weight: 800;
  }
}

.pay-button {
  width: 100%;
  height: 48px;

  margin-top: 24px;

  border-radius: 999px;

  font-size: 16px;
  font-weight: 600;

  background: #e91e63;
  color: #fff;
}