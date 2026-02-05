import { CanActivateFn } from '@angular/router';

export const canAccessCaptchaGuard: CanActivateFn = (route, state) => {
  return true;
};
