export type CaptchaStageType = 'image-select' | 'math' | 'text';

export interface CaptchaStageBase {
  id: string;
  type: CaptchaStageType;
  title: string;
  hint?: string;
  points?: number; // optional scoring
}

export interface ImageSelectStage extends CaptchaStageBase {
  type: 'image-select';
  images: { id: string; label: string; url: string }[];
  // rule: user must select all images where label matches targetLabel
  targetLabel: string; // e.g. "cat"
}

export interface MathStage extends CaptchaStageBase {
  type: 'math';
  question: string;     // e.g. "7 + 5"
  answer: number;
}

export interface TextStage extends CaptchaStageBase {
  type: 'text';
  prompt: string;       // e.g. "Type: ANGUL-IT"
  expected: string;
  caseSensitive?: boolean;
}

export type CaptchaStage = ImageSelectStage | MathStage | TextStage;

export interface StageResult {
  stageId: string;
  correct: boolean;
  userAnswer: any;
  timeMs?: number;
}

export interface CaptchaSessionState {
  sessionId: string;
  startedAt: string; // ISO
  currentIndex: number;
  stages: CaptchaStage[];
  results: StageResult[];
  completed: boolean;
}
