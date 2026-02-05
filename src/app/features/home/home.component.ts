import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router, private state: CaptchaStateService) {}

  start() {
    this.state.startNewSession();
    this.router.navigateByUrl('/captcha');
  }
}
