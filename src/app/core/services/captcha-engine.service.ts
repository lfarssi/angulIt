import { Injectable } from '@angular/core';
import { CaptchaStage, ImageSelectStage, MathStage, TextStage } from '../models/captcha.models';

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2);
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickMany<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  // Fisher–Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

@Injectable({ providedIn: 'root' })
export class CaptchaEngineService {
  private catPaths = Array.from({ length: 9 }, (_, i) => `/cats/cat${i + 1}.jpeg`);
  private otherPaths = Array.from({ length: 9 }, (_, i) => `/other/meme${i + 1}.jpeg`);

  buildStages(): CaptchaStage[] {
    const imageStage = this.buildImageStage();
    const mathStage = this.buildMathStage();
    const textStage = this.buildTextStage();

    // shuffle stage order (bonus)
    return shuffle([imageStage, mathStage, textStage]);
  }

  private buildImageStage(): ImageSelectStage {
    // choose how many cats/others in grid (e.g. 3x3 = 9 images)
    const gridSize = 9;

    const catCount = randInt(3, 5);
    const otherCount = gridSize - catCount;

    const cats = pickMany(this.catPaths, catCount).map(url => ({
      id: uid(),
      label: 'cat',
      url,
    }));

    const others = pickMany(this.otherPaths, otherCount).map(url => ({
      id: uid(),
      label: 'other',
      url,
    }));

    const images = shuffle([...cats, ...others]);

    return {
      id: uid(),
      type: 'image-select',
      title: 'Select all images with cats',
      hint: `Select the ${catCount} cat images, then press Next.`,
      targetLabel: 'cat',
      images,
    };
  }

  private buildMathStage(): MathStage {
    // operations: +, -, *
    const ops = ['+', '-', '*'] as const;
    const op = ops[randInt(0, ops.length - 1)];

    let a = randInt(2, 15);
    let b = randInt(2, 15);

    // keep subtraction non-negative (simple UX)
    if (op === '-' && b > a) [a, b] = [b, a];

    let answer = 0;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else answer = a * b;

    return {
      id: uid(),
      type: 'math',
      title: 'Solve the math',
      hint: 'Quick check you are human 🙂',
      question: `${a} ${op} ${b}`,
      answer,
    };
  }

  private buildTextStage(): TextStage {
    const texts = [
      { prompt: 'Type: ANGUL-IT', expected: 'ANGUL-IT', caseSensitive: true },
      { prompt: 'Type: I AM HUMAN', expected: 'I AM HUMAN', caseSensitive: true },
      { prompt: 'Type: CAPTCHA', expected: 'CAPTCHA', caseSensitive: true },
      { prompt: 'Type: zone01', expected: 'zone01', caseSensitive: true },
      { prompt: 'Type: Morocco', expected: 'Morocco', caseSensitive: true },
    ];

    const t = texts[randInt(0, texts.length - 1)];

    return {
      id: uid(),
      type: 'text',
      title: 'Type verification text',
      prompt: t.prompt,
      expected: t.expected,
      caseSensitive: t.caseSensitive,
      hint: 'Type exactly what you see.',
    };
  }
}
