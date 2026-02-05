import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { CaptchaComponent } from './features/captcha/captcha.component';
import { ResultComponent } from './features/result/result.component';

import { canAccessResultGuard } from './core/guards/can-access-result.guard';
import { canAccessCaptchaGuard } from './core/guards/can-access-captcha.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent, canActivate: [canAccessCaptchaGuard] },
  { path: 'result', component: ResultComponent, canActivate: [canAccessResultGuard] },
  { path: '**', redirectTo: '' },
];
