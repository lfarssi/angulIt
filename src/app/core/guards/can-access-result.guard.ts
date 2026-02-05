import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CaptchaStateService } from '../services/captcha-state.service';

export const canAccessResultGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  const router = inject(Router);

  if (state.isCompleted()) return true;

  const s = state.getState();
  return router.createUrlTree(['/captcha'], { queryParams: { stage: s.currentIndex } });
};
