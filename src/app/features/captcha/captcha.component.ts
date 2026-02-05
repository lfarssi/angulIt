import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { CaptchaStage } from '../../core/models/captcha.models';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './captcha.component.html',
})
export class CaptchaComponent {
  stages: CaptchaStage[] = [];
  currentIndex = 0;

  get stage() {
    return this.stages[this.currentIndex];
  }

  constructor(private router: Router, private state: CaptchaStateService) {
    const s = this.state.getState();
    this.stages = s.stages;
    this.currentIndex = s.currentIndex;
  }

  prev() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.state.setCurrentIndex(this.currentIndex);
  }

  next() {
    // TODO: validate current stage BEFORE allowing next
    const isLast = this.currentIndex >= this.stages.length - 1;

    if (isLast) {
      this.state.markCompleted();
      this.router.navigateByUrl('/result');
      return;
    }

    this.currentIndex++;
    this.state.setCurrentIndex(this.currentIndex);
  }
}
