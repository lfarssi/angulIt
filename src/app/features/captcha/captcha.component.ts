import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { CaptchaStage, ImageSelectStage, MathStage, TextStage } from '../../core/models/captcha.models';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './captcha.component.html',
})
export class CaptchaComponent {
  stages: CaptchaStage[] = [];
  currentIndex = 0;

  // form controls (used depending on stage type)
  mathCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
  textCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });

  // image selections
  selected = new Set<string>();

  errorMsg = '';

  get stage(): CaptchaStage | undefined {
    return this.stages[this.currentIndex];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private state: CaptchaStateService
  ) {
    const s = this.state.getState();
    this.stages = s.stages;

    // allow deep-link to current stage from guard query param
    const qpStage = this.route.snapshot.queryParamMap.get('stage');
    const idx = qpStage ? Number(qpStage) : s.currentIndex;
    this.currentIndex = Number.isFinite(idx) ? Math.max(0, Math.min(idx, this.stages.length - 1)) : s.currentIndex;

    this.state.setCurrentIndex(this.currentIndex);
    this.loadExistingAnswer();
  }

  prev() {
    this.errorMsg = '';
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.state.setCurrentIndex(this.currentIndex);
    this.loadExistingAnswer();
  }

  toggleImage(id: string) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
    this.errorMsg = '';
  }

  next() {
    this.errorMsg = '';

    const st = this.stage;
    if (!st) return;

    const valid = this.validateAndSave(st);
    if (!valid) return;

    const isLast = this.currentIndex >= this.stages.length - 1;
    if (isLast) {
      this.state.markCompleted();
      this.router.navigateByUrl('/result');
      return;
    }

    this.currentIndex++;
    this.state.setCurrentIndex(this.currentIndex);
    this.loadExistingAnswer();
  }

  private validateAndSave(st: CaptchaStage): boolean {
    if (st.type === 'image-select') {
      const s = st as ImageSelectStage;

      if (this.selected.size === 0) {
        this.errorMsg = 'Select at least one image.';
        return false;
      }

      const correctIds = new Set(s.images.filter(i => i.label === s.targetLabel).map(i => i.id));
      const userIds = new Set(this.selected);

      let correct = userIds.size === correctIds.size;
      if (correct) {
        for (const id of userIds) {
          if (!correctIds.has(id)) { correct = false; break; }
        }
      }

      this.state.upsertResult({
        stageId: s.id,
        correct,
        userAnswer: Array.from(userIds),
      });

      if (!correct) this.errorMsg = 'Wrong selection. Try again.';
      return correct;
    }

    if (st.type === 'math') {
      const s = st as MathStage;

      this.mathCtrl.markAsTouched();
      if (this.mathCtrl.invalid) {
        this.errorMsg = 'Enter your answer.';
        return false;
      }

      const value = Number(this.mathCtrl.value);
      const correct = Number.isFinite(value) && value === s.answer;

      this.state.upsertResult({
        stageId: s.id,
        correct,
        userAnswer: this.mathCtrl.value,
      });

      if (!correct) this.errorMsg = 'Incorrect answer. Try again.';
      return correct;
    }

    // text
    const s = st as TextStage;

    this.textCtrl.markAsTouched();
    if (this.textCtrl.invalid) {
      this.errorMsg = 'Type the verification text.';
      return false;
    }

    const user = this.textCtrl.value;
    const expected = s.caseSensitive ? s.expected : s.expected.toLowerCase();
    const actual = s.caseSensitive ? user : user.toLowerCase();
    const correct = actual === expected;

    this.state.upsertResult({
      stageId: s.id,
      correct,
      userAnswer: user,
    });

    if (!correct) this.errorMsg = 'Text does not match. Try again.';
    return correct;
  }

  private loadExistingAnswer() {
    this.errorMsg = '';
    this.selected.clear();
    this.mathCtrl.setValue('');
    this.textCtrl.setValue('');
    this.mathCtrl.markAsUntouched();
    this.textCtrl.markAsUntouched();

    const st = this.stage;
    if (!st) return;

    const s = this.state.getState();
    const existing = s.results.find(r => r.stageId === st.id);
    if (!existing) return;

    if (st.type === 'image-select' && Array.isArray(existing.userAnswer)) {
      for (const id of existing.userAnswer) this.selected.add(id);
    } else if (st.type === 'math') {
      this.mathCtrl.setValue(String(existing.userAnswer ?? ''));
    } else if (st.type === 'text') {
      this.textCtrl.setValue(String(existing.userAnswer ?? ''));
    }
  }
  get imageStage(): ImageSelectStage | null {
  const st = this.stage;
  return st && st.type === 'image-select' ? st : null;
}

get mathStage(): MathStage | null {
  const st = this.stage;
  return st && st.type === 'math' ? st : null;
}

get textStage(): TextStage | null {
  const st = this.stage;
  return st && st.type === 'text' ? st : null;
}

}
