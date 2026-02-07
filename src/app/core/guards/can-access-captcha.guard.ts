import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CaptchaStateService } from '../services/captcha-state.service';

export const canAccessCaptchaGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  const router = inject(Router);

  if (state.isCompleted()) return router.createUrlTree(['/result']);
  return true;
};
