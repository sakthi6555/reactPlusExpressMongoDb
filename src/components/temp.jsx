import { Component, inject } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import {
  catchError,
  map,
  Observable,
  of
} from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);


  registerError = '';


  registerForm = this.fb.nonNullable.group({

    firstName: [
      '',
      [
        Validators.required
      ]
    ],

    lastName: [
      '',
      [
        Validators.required
      ]
    ],

    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [
          this.emailExistsValidator()
        ],
        updateOn: 'blur'
      }
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
        )
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]

  }, {
    validators: [
      this.passwordMatchValidator()
    ]
  });


  // --------------------------------------------------
  // Async Email Validator
  // --------------------------------------------------

  private emailExistsValidator(): AsyncValidatorFn {

    return (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {

      if (!control.value) {
        return of(null);
      }


      return this.userService
        .getUserByEmail(control.value)
        .pipe(

          map(users =>
            users.length > 0
              ? { emailExists: true }
              : null
          ),

          catchError(() =>
            of(null)
          )

        );

    };

  }


  // --------------------------------------------------
  // Password + Confirm Password
  // --------------------------------------------------

  private passwordMatchValidator(): ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const password =
        control.get('password')?.value;

      const confirmPassword =
        control.get('confirmPassword')?.value;


      if (
        !password ||
        !confirmPassword
      ) {

        return null;

      }


      return password === confirmPassword
        ? null
        : { passwordMismatch: true };

    };

  }


  // --------------------------------------------------
  // Register
  // --------------------------------------------------

  onRegister(): void {

    this.registerError = '';


    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.registerForm.getRawValue();


    const user: User = {

      firstName: formValue.firstName,

      lastName: formValue.lastName,

      email: formValue.email,

      password: formValue.password

    };


    this.userService
      .registerUser(user)
      .subscribe({

        next: () => {

          // Registration successful
          // Go back to login

          this.router.navigate(['/login']);

        },

        error: () => {

          this.registerError =
            'Unable to register. Please try again.';

        }

      });

  }

}