.auth-container {
  min-height: calc(100vh - 64px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 480px;
}

mat-card-header {
  margin-bottom: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

mat-form-field {
  width: 100%;
}

.submit-button {
  width: 100%;
  height: 48px;
  margin-top: 8px;
}

.login-link {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
}

.login-link a {
  text-decoration: none;
  font-weight: 500;
}

.register-error {
  padding: 12px;
  margin: 8px 0;
  text-align: center;
  border-radius: 4px;
}





import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadComponent: () =>
      import(
        './features/products/pages/product-list/product-list.component'
      ).then(m => m.ProductListComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import(
        './features/user/pages/login/login.component'
      ).then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import(
        './features/user/pages/register/register.component'
      ).then(m => m.RegisterComponent)
  }

];