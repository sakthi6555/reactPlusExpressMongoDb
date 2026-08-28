import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const userEmail =
    localStorage.getItem('user_email');

  if (userEmail) {
    return true;
  }

  return router.createUrlTree([
    '/login'
  ]);
};