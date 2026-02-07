import { Injectable } from '@angular/core';
import { CaptchaStage, ImageSelectStage, MathStage, TextStage } from '../models/captcha.models';

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2);

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickMany<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, Math.min(count, arr.length));
}

@Injectable({ providedIn: 'root' })
export class CaptchaEngineService {
  private catPaths = Array.from({ length: 9 }, (_, i) => `/cats/cat${i + 1}.jpeg`);
  private otherPaths = Array.from({ length: 9 }, (_, i) => `/other/meme${i + 1}.jpeg`);

  buildStages(): CaptchaStage[] {
    return shuffle([this.imageStage(), this.mathStage(), this.textStage()]);
  }

  private imageStage(): ImageSelectStage {
    const gridSize = 9;
    const catCount = randInt(3, 5);

    const cats = pickMany(this.catPaths, catCount).map(url => ({
      id: uid(),
      label: 'cat' as const,
      url,
    }));

    const others = pickMany(this.otherPaths, gridSize - catCount).map(url => ({
      id: uid(),
      label: 'other' as const,
      url,
    }));

    return {
      id: uid(),
      type: 'image-select',
      title: 'Select all images with cats',
      hint: `Select the ${catCount} cat images, then press Next.`,
      targetLabel: 'cat',
      images: shuffle([...cats, ...others]),
    };
  }

  private mathStage(): MathStage {
    const ops = ['+', '-', '*'] as const;
    const op = ops[randInt(0, ops.length - 1)];

    let a = randInt(2, 15);
    let b = randInt(2, 15);
    if (op === '-' && b > a) [a, b] = [b, a];

    const answer = op === '+'
      ? a + b
      : op === '-'
      ? a - b
      : a * b;

    return {
      id: uid(),
      type: 'math',
      title: 'Solve the math',
      hint: 'Quick check you are human 🙂',
      question: `${a} ${op} ${b}`,
      answer,
    };
  }

  private textStage(): TextStage {
    const texts = [
      'ANGUL-IT',
      'I AM HUMAN',
      'CAPTCHA',
      'zone01',
      'Morocco',
    ];

    const expected = texts[randInt(0, texts.length - 1)];

    return {
      id: uid(),
      type: 'text',
      title: 'Type verification text',
      hint: 'Type exactly what you see.',
      prompt: `Type: ${expected}`,
      expected,
      caseSensitive: true,
    };
  }
}
