# Playwright JS Automation Basics

This repository contains my practice work while learning Playwright for browser automation using JavaScript. It covers basic concepts like selectors, navigation, assertions, and test structure.

## Tech Stack

- JavaScript (Node.js)
- Playwright

## Project Structure
```text
playwright-basics/ 
│── pages/                  # Page Object classes (UI interactions)

│── api/                    #(api client layer) 

│── fixtures/ 
    │── api-fixtures 
    │── ui-fixtures 
    │── combined-fixtures 

│── tests/              
    │── api                 # api tests
    │── ui                  # ui tests

│── utils/ 
│── test-data/              # centralized test data 
│── playwright.config.js 
│── package.json
```

## Getting Started
1. Clone the repository: `git clone https://github.com/gleela/playwright-learnings.git`
2. Install dependencies: `npm install` 
3. Run the tests: `npx playwright test` 



