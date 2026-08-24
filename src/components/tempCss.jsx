.payment-page {
  padding: 40px;
  background: #fafafa;
  min-height: 100vh;

  h1 {
    margin: 0 0 30px;

    font-size: 32px;
    font-weight: 800;
    letter-spacing: 1px;
  }
}

.payment-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 30px;
  align-items: start;
}

.payment-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.payment-right {
  position: sticky;
  top: 20px;
}


@media (max-width: 900px) {

  .payment-layout {
    grid-template-columns: 1fr;
  }

  .payment-right {
    position: static;
  }
}


@media (max-width: 600px) {

  .payment-page {
    padding: 20px;

    h1 {
      font-size: 26px;
    }
  }
}