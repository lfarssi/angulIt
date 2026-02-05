import { Injectable } from '@angular/core';
import { CaptchaStage } from '../models/captcha.models';

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2);
}

@Injectable({ providedIn: 'root' })
export class CaptchaEngineService {
  buildStages(): CaptchaStage[] {
    const sets: CaptchaStage[] = [
      {
        id: uid(),
        type: 'image-select',
        title: 'Select all images with cats',
        hint: 'Tap all the cats, then next.',
        targetLabel: 'cat',
        images: [
          { id: uid(), label: 'cat', url: 'assets/img/cat1.jpg' },
          { id: uid(), label: 'dog', url: 'assets/img/dog1.jpg' },
          { id: uid(), label: 'cat', url: 'assets/img/cat2.jpg' },
          { id: uid(), label: 'car', url: 'assets/img/car1.jpg' },
          { id: uid(), label: 'cat', url: 'assets/img/cat3.jpg' },
          { id: uid(), label: 'tree', url: 'assets/img/tree1.jpg' },
        ],
      },
      {
        id: uid(),
        type: 'math',
        title: 'Solve the math',
        question: '7 + 5',
        answer: 12,
        hint: 'Just a quick check you are human 🙂',
      },
      {
        id: uid(),
        type: 'text',
        title: 'Type verification text',
        prompt: 'Type: ANGUL-IT',
        expected: 'ANGUL-IT',
        caseSensitive: true,
      },
    ];

    // Shuffle stages for a unique session feel (bonus)
    return sets.sort(() => Math.random() - 0.5);
  }
}
