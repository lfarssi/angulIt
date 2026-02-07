import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { CaptchaSessionState, StageResult } from '../../core/models/captcha.models';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
})
export class ResultComponent {
  session!: CaptchaSessionState;

  constructor(
    private router: Router,
    private state: CaptchaStateService
  ) {
    this.session = this.state.getState();
  }

  restart() {
    this.state.startNewSession();
    this.router.navigateByUrl('/captcha');
  }

  get score() {
    const total = this.session.stages.length;
    const correct = this.session.results.filter(r => r.correct).length;
    return { total, correct };
  }
  getResultFor(stageId: string): StageResult | undefined {
    return this.session.results.find(r => r.stageId === stageId);
  }

  statusLabel(stageId: string): string {
    const r = this.getResultFor(stageId);
    if (!r) return '❌ Missing/Wrong';
    return r.correct ? '✅ Correct' : '❌ Missing/Wrong';
  }
}
