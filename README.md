***

# 🛡️ Catch App - Angular Multi-Stage Captcha

Catch is a custom Angular application designed to verify human users through a series of randomized, multi-stage challenges. Instead of a single checkbox, users must successfully complete a combination of Math, Image Selection, and Text Verification stages to unlock the final protected result.

## ✨ Features

* **Multi-Stage Challenges:** Generates a randomized sequence of three distinct challenge types:
    * 🖼️ **Image Select:** Find specific images (e.g., "Select all cats") in a 3x3 grid.
    * 🧮 **Math:** Solve a simple, randomly generated arithmetic problem (+, -, *).
    * ⌨️ **Text Match:** Retype a specific case-sensitive string.
* **State Persistence:** Progress is saved automatically. If the user accidentally refreshes or closes the tab, they resume exactly where they left off without losing their answers.
* **Route Guards:** Strictly controls navigation. Users cannot skip directly to the `/captcha` or `/result` pages without starting a valid session and completing the requirements.
* **Dynamic UI:** A single `CaptchaComponent` acts as a carousel, swapping out the interface based on the current challenge without needing to change routes.

---

## 🏗️ Architecture

The app is built using modern Angular (Standalone Components) and is divided into core domains:

* **`HomeComponent`**: The entry point. Initializes a fresh session and directs the user to the challenges.
* **`CaptchaComponent`**: The stage manager. Handles user input via Reactive Forms, validates answers, and manages the "Next/Previous" flow.
* **`ResultComponent`**: The final protected screen. Only accessible once all stages are completed.
* **`CaptchaStateService`**: The "brain" of the app. Manages the current session state, tracks the active stage index, and records user answers.
* **`CaptchaEngineService`**: The factory. Generates the random numbers, text, and image grids for the challenges.
* **`LocalStorageService`**: A safe wrapper around the browser's native `localStorage` for JSON serialization and data persistence.

---

## 💾 Local Storage Data Model

To ensure progress isn't lost on a page refresh, the application saves the session state in the browser's `localStorage` under the key `angulit.session.v1`. 

Here is an example of what that parsed JSON data looks like mid-session:

```json
{
  "sessionId": "4f92-b12a-8839201abc",
  "startedAt": "2026-04-06T14:00:00.000Z",
  "currentIndex": 1,
  "completed": false,
  "stages": [
    {
      "id": "stage-101",
      "type": "math",
      "title": "Solve the math",
      "question": "12 + 5",
      "answer": 17
    },
    {
      "id": "stage-102",
      "type": "text",
      "title": "Type verification text",
      "prompt": "Type: ANGUL-IT",
      "expected": "ANGUL-IT",
      "caseSensitive": true
    },
    {
      "id": "stage-103",
      "type": "image-select",
      "title": "Select all images with cats",
      "targetLabel": "cat",
      "images": [
        { "id": "img-1", "label": "cat", "url": "/cats/cat1.jpeg" },
        { "id": "img-2", "label": "other", "url": "/other/meme1.jpeg" }
      ]
    }
  ],
  "results": [
    {
      "stageId": "stage-101",
      "correct": true,
      "userAnswer": "17"
    }
  ]
}
```

### Data Breakdown:
* **`sessionId`**: A unique UUID for the current attempt.
* **`currentIndex`**: Tracks which stage the user is currently viewing.
* **`stages`**: The pre-generated, randomized list of challenges the user must face.
* **`results`**: An array tracking the user's submissions. Notice how `results` is kept separate from `stages` to maintain a clean separation of "the questions" and "the answers".
* **`completed`**: A boolean flag that unlocks the `/result` route when set to `true`.

---

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fahdaguenouz/angul-it
   cd angul-it
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.