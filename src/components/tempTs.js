// login

.auth-container {
  min-height: calc(100vh - 64px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
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
  margin-top: 8px;
  height: 48px;
}

.register-link {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
}

.register-link a {
  text-decoration: none;
  font-weight: 500;
}

.login-error {
  padding: 12px;
  margin: 8px 0;
  border-radius: 4px;
  text-align: center;
}