# File Upload Tests - The Internet Herokuapp

This project contains comprehensive Playwright test scripts for testing file upload functionality on https://the-internet.herokuapp.com/upload

## Features Tested

### ✅ Test Cases Implemented

1. **Navigation to the web page**
   - Verifies page loads correctly
   - Validates page title and URL
   - Confirms main heading is visible

2. **Element Visibility Checks**
   - File input element (Choose File button)
   - Upload button
   - Drag and drop area (red-dashed square)
   - Description texts and instructions

3. **Footer Elemental Selenium Link**
   - Verifies link is visible and clickable
   - Validates href attribute
   - Checks target="_blank" attribute

4. **Valid File Upload via Choose File**
   - Uploads a test file using the file input
   - Verifies file selection
   - Confirms successful upload with success message

5. **Drag and Drop Upload (Red-dashed Square)**
   - Tests drag and drop functionality
   - Verifies drop zone interaction
   - Handles different drag-drop implementations

6. **Upload Button without File Selected**
   - Tests error handling when no file is selected
   - Verifies appropriate error response (Internal Server Error)
   - Ensures no successful upload occurs

7. **Accessibility and Functionality**
   - Tests keyboard navigation
   - Verifies element focus states
   - Checks GitHub fork link (when visible)

8. **Comprehensive Element Verification**
   - Validates all required page elements
   - Checks proper form structure
   - Verifies button types and attributes

## Project Structure

```
├── tests/
│   └── file-upload-complete.spec.ts    # Main test suite
├── test-data/
│   └── sample-upload.txt               # Test file for uploads
├── allure-results/                     # Test results for reporting
├── allure-report/                      # Generated HTML reports
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Dependencies and scripts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all file upload tests:
```bash
npx playwright test file-upload-complete.spec.ts
```

### Run tests in specific browser:
```bash
npx playwright test file-upload-complete.spec.ts --project=chromium
npx playwright test file-upload-complete.spec.ts --project=firefox
npx playwright test file-upload-complete.spec.ts --project=webkit
```

### Run specific test case:
```bash
npx playwright test file-upload-complete.spec.ts -g "Navigation to the web page"
npx playwright test file-upload-complete.spec.ts -g "Upload a valid file using Choose File"
```

### Run tests in headed mode (visible browser):
```bash
npx playwright test file-upload-complete.spec.ts --headed
```

### Debug mode:
```bash
npx playwright test file-upload-complete.spec.ts --debug
```

## Reporting

### Generate Allure Report:
```bash
npm run allure:generate
```

### Open Allure Report:
```bash
npm run allure:open
```

### Standard Playwright Report:
```bash
npx playwright show-report
```

## Test Data

The project includes a sample test file (`test-data/sample-upload.txt`) used for file upload testing. The tests dynamically create file paths and handle file selection appropriately.

## Key Features

### ✨ Playwright Best Practices Implemented:

- **Dynamic Element Selection**: Uses specific IDs and robust selectors
- **Proper Wait Strategies**: Implements `waitForLoadState` and timeouts
- **Clean Test Structure**: Well-organized test suites with proper setup/teardown
- **Error Handling**: Graceful handling of different scenarios
- **Cross-browser Testing**: Configured for Chrome, Firefox, and Safari
- **Comprehensive Assertions**: Validates both positive and negative scenarios
- **Accessibility Testing**: Includes focus and keyboard navigation tests

### 🎯 Test Coverage:

- ✅ Page navigation and loading
- ✅ Element visibility and interaction
- ✅ File upload via input element
- ✅ Drag and drop functionality testing
- ✅ Error scenarios and edge cases
- ✅ Link validation and attributes
- ✅ Form validation and submission
- ✅ Accessibility and keyboard navigation

## Notes

- **Drag and Drop**: The drag and drop test handles different implementations and provides informational messages when manual verification is needed
- **GitHub Link**: The GitHub fork link is often hidden (ribbon/overlay) and the test handles this gracefully
- **Error Handling**: Upload without file selection results in "Internal Server Error" which is properly tested
- **Screenshots**: Automatic screenshots are captured on test failures for debugging

## Configuration

The tests are configured to run with:
- **Parallel execution** for faster test runs
- **Retry logic** for flaky test handling
- **Multiple browsers** support
- **Allure reporting** integration
- **Screenshot capture** on failures
- **Trace collection** for debugging

Run `npx playwright test --help` for more options and configurations.
