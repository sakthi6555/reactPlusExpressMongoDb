import { listClasses } from "@mui/material";

product-filter

.filter-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
}

.search-field {
  flex: 1;
}

mat-form-field {
  min-width: 200px;
}

@media (max-width: 768px) {

  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  mat-form-field {
    width: 100%;
  }

}



// product-list

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}