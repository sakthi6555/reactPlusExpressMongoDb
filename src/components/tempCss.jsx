.best-seller-badge {
  position: absolute;
  top: 12px;
  left: 12px;

  padding: 6px 12px;

  background: #e91e63;
  color: white;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  text-transform: uppercase;
}




 @if (product().isBestSeller) {
      <span class="best-seller-badge">
        Best Seller
      </span>
    }