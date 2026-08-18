.product-list {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
}

.page-header p {
  margin: 4px 0 0;
  opacity: 0.7;
}

.product-count {
  opacity: 0.7;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}


// card css


.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-container {
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.image-container img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

mat-card-content {
  flex: 1;
}

.category {
  font-size: 12px;
  text-transform: uppercase;
  opacity: 0.7;
}

.product-title {
  font-size: 16px;
  line-height: 1.4;
  margin: 8px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 8px 0;
}

.rating mat-icon {
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.review-count {
  opacity: 0.6;
  font-size: 13px;
}

.price {
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
}

mat-card-actions {
  padding: 16px;
  gap: 8px;
}

mat-card-actions button {
  flex: 1;
}