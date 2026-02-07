import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { CaptchaEngineService } from './captcha-engine.service';
import { CaptchaSessionState, StageResult } from '../models/captcha.models';

const KEY = 'angulit.session.v1';

const newId = () =>
  crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2);

@Injectable({ providedIn: 'root' })
export class CaptchaStateService {
  private state: CaptchaSessionState | null;

  constructor(
    private store: LocalStorageService,
    private engine: CaptchaEngineService
  ) {
    this.state = this.store.get<CaptchaSessionState>(KEY);
  }

  getState(): CaptchaSessionState {
    if (!this.state) this.startNewSession();
    return this.state!;
  }

  startNewSession(): CaptchaSessionState {
    this.state = {
      sessionId: newId(),
      startedAt: new Date().toISOString(),
      currentIndex: 0,
      stages: this.engine.buildStages(),
      results: [],
      completed: false,
    };
    this.save();
    return this.state;
  }

  setCurrentIndex(i: number): void {
    const s = this.getState();
    s.currentIndex = Math.max(0, Math.min(i, s.stages.length - 1));
    this.save();
  }

  upsertResult(result: StageResult): void {
    const s = this.getState();
    const idx = s.results.findIndex(r => r.stageId === result.stageId);
    if (idx >= 0) s.results[idx] = result;
    else s.results.push(result);
    this.save();
  }

  markCompleted(): void {
    const s = this.getState();
    s.completed = true;
    this.save();
  }

  isCompleted(): boolean {
    return this.getState().completed;
  }

  private save(): void {
    if (this.state) this.store.set(KEY, this.state);
  }
}
