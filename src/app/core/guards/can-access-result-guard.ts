import { CanActivateFn } from '@angular/router';

export const canAccessResultGuard: CanActivateFn = (route, state) => {
  return true;
};
