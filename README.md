## Angul-It

### Overview

In this project, you will build an **interactive multi-stage CAPTCHA web application** called **Angul-It**, designed to test and enhance user validation mechanisms through engaging visual and logical challenges.  
The application will challenge users with various CAPTCHA stages — such as identifying images, solving small puzzles, or entering verification text — and display the results at the end.

This project focuses on mastering **Angular** for building dynamic single-page applications with strong **state management**, **form validation**, and **responsive UI**.

### Role Play

You are a **frontend developer** at a company developing innovative CAPTCHA systems to distinguish real users from bots.  
Your mission is to design a secure, interactive, and user-friendly CAPTCHA system that enhances user experience while maintaining strong security and validation integrity.

### Learning Objectives

- Master **Angular fundamentals** (components, services, routing, directives)
- Implement **multi-stage workflows** and dynamic component interaction
- Apply **form validation** and **user input control**
- Use **state management** (e.g., services, local storage, or NgRx) to preserve progress
- Handle **conditional navigation** and access control between pages
- Ensure **responsive design** across devices
- Build **reusable and modular components**
- Write **unit tests** for components and services

### Instructions

#### Environment Setup

- Initialize a new Angular project using the Angular CLI
- Explore the default folder structure and configuration
- Install necessary dependencies (e.g., Angular Material or Bootstrap for UI styling)

#### Core Components

- Create the following key components:
  - **HomeComponent** – entry point introducing the app and starting the challenge
  - **CaptchaComponent** – main challenge interface displaying CAPTCHA tasks
  - **ResultComponent** – results summary page after completing all challenges

#### Captcha Challenges

- Design multiple CAPTCHA stages (e.g., select all images with cats)
- Allow navigation between previous and next stages
- Ensure each challenge validates user input before proceeding

#### Form Validation

- Implement Angular form validation for each stage
- Prevent users from advancing without completing the current challenge correctly
- Display clear error messages or hints for invalid inputs

#### State Management

- Use Angular services, local storage, or NgRx to maintain user progress
- Preserve state even when the page is refreshed
- Retrieve stored state upon reloading and resume from the correct stage

#### Results Page

- Display a summary of completed challenges and user performance
- Include a **Restart Challenge** button to begin a new session
- Block direct access to the results page without proper challenge completion — redirect users to the current challenge instead

### Constraints

- Use the latest version of **Angular**
- Do **not** use external CAPTCHA libraries — implement your own logic
- State must persist across refreshes
- The UI must be **responsive** and **accessible**
- All navigation must occur via Angular routing (no page reloads)

### Evaluation

This project will be evaluated through a **code review** and **live demo**.  
Evaluation criteria include:

- ⚙️ **Functionality**: All stages work correctly and transition smoothly
- 🔒 **Validation & Security**: Proper user input control and restricted access
- 💾 **State Management**: Persistent and reliable progress tracking
- 🎨 **UI/UX**: Clean, responsive, and engaging interface

### Bonus

- Diversify the challenge types and randomly allocate a unique set for each user session (e.g., image selection, math problem-solving, text input).
- Incorporate animations to ensure fluid transitions between challenges.
- Optimize the application for responsiveness, ensuring a seamless experience on both desktop and mobile platforms.
- Construct comprehensive unit tests for your components.

### Resources

- [Angular Official Documentation](https://angular.io/docs)
- [Angular CLI Guide](https://angular.io/cli)
- [Reactive Forms in Angular](https://angular.io/guide/reactive-forms)
- [Angular Routing & Navigation](https://angular.io/guide/router)
- [NgRx Store for State Management](https://ngrx.io/guide/store)
- [Angular Material Components](https://material.angular.io/components/categories)
- [Unit Testing in Angular](https://angular.io/guide/testing)
