import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
})
export class ResultComponent {
  constructor(private router: Router, private state: CaptchaStateService) {}

  restart() {
    this.state.startNewSession();
    this.router.navigateByUrl('/captcha');
  }
}
