export type CaptchaStageType = 'image-select' | 'math' | 'text';

export interface CaptchaStageBase {
  id: string;
  type: CaptchaStageType;
  title: string;
  hint?: string;
}

export interface ImageSelectStage extends CaptchaStageBase {
  type: 'image-select';
  images: { id: string; label: 'cat' | 'other'; url: string }[];
  targetLabel: 'cat';
}

export interface MathStage extends CaptchaStageBase {
  type: 'math';
  question: string;
  answer: number;
}

export interface TextStage extends CaptchaStageBase {
  type: 'text';
  prompt: string;
  expected: string;
  caseSensitive?: boolean;
}

export type CaptchaStage = ImageSelectStage | MathStage | TextStage;

export interface StageResult {
  stageId: string;
  correct: boolean;
  userAnswer: string | string[]; 
}

export interface CaptchaSessionState {
  sessionId: string;
  startedAt: string;
  currentIndex: number;
  stages: CaptchaStage[];
  results: StageResult[];
  completed: boolean;
}
