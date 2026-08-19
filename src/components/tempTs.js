<div class="auth-container">

  <mat-card class="auth-card">

    <mat-card-header>

      <mat-card-title>
        Create Account
      </mat-card-title>

      <mat-card-subtitle>
        Register a new account
      </mat-card-subtitle>

    </mat-card-header>


    <mat-card-content>

      <form
        [formGroup]="registerForm"
        (ngSubmit)="onRegister()">


        <!-- First Name -->

        <mat-form-field appearance="outline">

          <mat-label>First Name</mat-label>

          <input
            matInput
            formControlName="firstName">


          @if (
            registerForm.controls.firstName.hasError('required')
            && registerForm.controls.firstName.touched
          ) {

            <mat-error>
              First name is required
            </mat-error>

          }

        </mat-form-field>


        <!-- Last Name -->

        <mat-form-field appearance="outline">

          <mat-label>Last Name</mat-label>

          <input
            matInput
            formControlName="lastName">


          @if (
            registerForm.controls.lastName.hasError('required')
            && registerForm.controls.lastName.touched
          ) {

            <mat-error>
              Last name is required
            </mat-error>

          }

        </mat-form-field>


        <!-- Email -->

        <mat-form-field appearance="outline">

          <mat-label>Email</mat-label>

          <input
            matInput
            type="email"
            formControlName="email">


          @if (
            registerForm.controls.email.hasError('required')
            && registerForm.controls.email.touched
          ) {

            <mat-error>
              Email is required
            </mat-error>

          }


          @if (
            registerForm.controls.email.hasError('email')
          ) {

            <mat-error>
              Enter a valid email address
            </mat-error>

          }


          @if (
            registerForm.controls.email.hasError('emailExists')
          ) {

            <mat-error>
              This email is already registered
            </mat-error>

          }

        </mat-form-field>


        <!-- Password -->

        <mat-form-field appearance="outline">

          <mat-label>Password</mat-label>

          <input
            matInput
            type="password"
            formControlName="password">


          @if (
            registerForm.controls.password.hasError('required')
            && registerForm.controls.password.touched
          ) {

            <mat-error>
              Password is required
            </mat-error>

          }


          @if (
            registerForm.controls.password.hasError('minlength')
          ) {

            <mat-error>
              Password must be at least 8 characters
            </mat-error>

          }


          @if (
            registerForm.controls.password.hasError('pattern')
          ) {

            <mat-error>
              Must contain uppercase, lowercase, digit and symbol
            </mat-error>

          }

        </mat-form-field>


        <!-- Confirm Password -->

        <mat-form-field appearance="outline">

          <mat-label>Confirm Password</mat-label>

          <input
            matInput
            type="password"
            formControlName="confirmPassword">


          @if (
            registerForm.controls.confirmPassword.hasError('required')
            && registerForm.controls.confirmPassword.touched
          ) {

            <mat-error>
              Confirm password is required
            </mat-error>

          }


          @if (
            registerForm.hasError('passwordMismatch')
            && registerForm.controls.confirmPassword.touched
          ) {

            <mat-error>
              Passwords do not match
            </mat-error>

          }

        </mat-form-field>


        <!-- Registration Error -->

        @if (registerError) {

          <div class="register-error">
            {{ registerError }}
          </div>

        }


        <!-- Submit -->

        <button
          mat-flat-button
          type="submit"
          class="submit-button">

          Register

        </button>


      </form>


      <!-- Login -->

      <div class="login-link">

        <span>
          Already have an account?
        </span>

        <a routerLink="/login">
          Sign In
        </a>

      </div>

    </mat-card-content>

  </mat-card>

</div>