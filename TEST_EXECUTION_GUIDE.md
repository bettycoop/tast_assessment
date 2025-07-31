# Test Automation Framework - Execution Guide

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Installation and Setup](#installation-and-setup)
4. [Test Suite Architecture](#test-suite-architecture)
5. [Test Execution](#test-execution)
6. [Report Generation](#report-generation)
7. [Test Case Documentation](#test-case-documentation)
8. [Troubleshooting](#troubleshooting)
9. [Contact Information](#contact-information)

---

## Overview

This document provides comprehensive instructions for setting up, configuring, and executing the automated test suite for the Test Assessment project. The framework utilizes Playwright for end-to-end testing and includes both web UI and API testing capabilities.

### Project Information
- **Project Name**: Test Assessment Framework
- **Repository**: https://github.com/bettycoop/tast_assessment
- **Framework**: Playwright with TypeScript
- **Testing Scope**: Web UI and REST API automation
- **Report Generation**: HTML and Allure reporting

---

## System Requirements

### Hardware Requirements
- **Processor**: Intel i5 or equivalent (minimum)
- **Memory**: 8 GB RAM (minimum), 16 GB recommended
- **Storage**: 2 GB available disk space
- **Network**: Stable internet connection for test execution

### Software Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **Node.js**: Version 14.0 or higher
- **NPM**: Version 6.0 or higher (included with Node.js)
- **Git**: Version control system for repository management
- **Modern Web Browser**: Chrome, Firefox, or Safari for report viewing

---

## Installation and Setup

### Step 1: Repository Setup
# Clone the repository
git clone https://github.com/bettycoop/tast_assessment.git

# Navigate to project directory
cd tast_assessment

### Step 2: Dependency Installation
# Install project dependencies
npm install

# Install Playwright browsers
npx playwright install

### Step 3: Verification
# Verify installation
npx playwright --version

---

## Test Suite Architecture

### Project Structure
tast_assessment/
├── tests/
│   ├── file-upload.spec.ts          # Web UI file upload tests
│   └── api-jsonplaceholder.spec.ts   # REST API validation tests
├── test-data/
│   └── sample-upload.txt             # Test data files
├── playwright-report/                # HTML test reports
├── allure-results/                   # Raw Allure test data
├── allure-report/                    # Generated Allure reports
├── test-results/                     # Test execution artifacts
├── playwright.config.ts             # Framework configuration
└── package.json                     # Project dependencies

### Test Categories

#### 1. Web UI Testing (file-upload.spec.ts)
- **Target Application**: The Internet - File Upload Demo
- **URL**: https://the-internet.herokuapp.com/upload
- **Test Count**: 6 test cases
- **Browser Coverage**: Chromium, Firefox, WebKit

#### 2. API Testing (api-jsonplaceholder.spec.ts)
- **Target API**: JSON Placeholder REST API
- **Base URL**: https://jsonplaceholder.typicode.com
- **Test Count**: 15 test cases (45 total across browsers)
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE

---

## Test Execution

### Available Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm test` | Execute all tests with default configuration | Complete test suite execution |
| `npm run test:html` | Execute all tests with HTML reporting | Generate standalone reports |
| `npm run test:both` | Execute specific test files with HTML output | Combined test execution |
| `npm run allure:generate` | Generate Allure report from results | Advanced reporting |
| `npm run allure:open` | Open generated Allure report | Report viewing |
| `npm run allure:serve` | Serve Allure report directly | Quick report access |

### Execution Methods

#### Full Test Suite Execution
# Execute all tests with comprehensive reporting
npm run test:both

#### Individual Test File Execution
# Execute file upload tests only
npx playwright test file-upload.spec.ts

# Execute API tests only
npx playwright test api-jsonplaceholder.spec.ts

#### Browser-Specific Execution
# Execute tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

#### Debug Mode Execution
# Execute tests in debug mode
npx playwright test --debug

---

## Report Generation

### HTML Reports (Recommended for Sharing)

#### Generation Process
1. Execute tests with HTML reporter:
   npm run test:both

2. Access generated report:
   npx playwright show-report

#### Report Characteristics
- **Location**: `playwright-report/index.html`
- **Format**: Standalone HTML file
- **Compatibility**: Opens in any modern web browser
- **Sharing**: Can be uploaded as attachment or shared via email

### Allure Reports (Advanced Analytics)

#### Generation Process
1. Execute tests to generate raw data:
   npm test

2. Generate Allure report:
   npm run allure:generate

3. Open report in browser:
   npm run allure:open

#### Report Features
- Interactive dashboards
- Test trend analysis
- Detailed execution timelines
- Test case categorization
- Historical data comparison

---

## Test Case Documentation

### File Upload Test Suite (TI_Upload_TC001-TC006)

| Test Case ID | Description | Expected Result |
|--------------|-------------|-----------------|
| TI_Upload_TC001 | Navigation to upload page | Page loads successfully with correct title |
| TI_Upload_TC002 | Element visibility validation | All required elements are present and visible |
| TI_Upload_TC003 | Footer link verification | Elemental Selenium link functions correctly |
| TI_Upload_TC004 | File upload via Choose File | File uploads successfully through file input |
| TI_Upload_TC005 | File upload via drag-drop | File uploads successfully through drag-drop area |
| TI_Upload_TC006 | Empty upload error handling | Appropriate error handling for empty uploads |

### API Test Suite (TI_API_TC001-TC015)

| Test Case ID | HTTP Method | Endpoint | Description |
|--------------|-------------|----------|-------------|
| TI_API_TC001 | GET | /posts | Retrieve all posts with validation |
| TI_API_TC002 | GET | /posts/{id} | Retrieve specific post by ID |
| TI_API_TC003 | GET | /posts/{id} | Handle non-existent post scenarios |
| TI_API_TC004 | POST | /posts | Create new post with complete data |
| TI_API_TC005 | POST | /posts | Create post with incomplete data |
| TI_API_TC006 | PUT | /posts/{id} | Update entire post |
| TI_API_TC007 | PUT | /posts/{id} | Update non-existent post |
| TI_API_TC008 | PATCH | /posts/{id} | Partial post update |
| TI_API_TC009 | PATCH | /posts/{id} | Multiple field updates |
| TI_API_TC010 | DELETE | /posts/{id} | Delete existing post |
| TI_API_TC011 | DELETE | /posts/{id} | Delete non-existent post |
| TI_API_TC012 | GET | /posts | Response header validation |
| TI_API_TC013 | GET | /posts | Response time validation |
| TI_API_TC014 | POST | /posts | Content-type validation |
| TI_API_TC015 | GET | /posts | JSON schema validation |

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Browser Installation Failures
**Solution**: 
npx playwright install --force

#### Issue: Test Timeouts
**Solution**: Increase timeout in playwright.config.ts:
use: {
  actionTimeout: 30000,
  navigationTimeout: 30000
}

#### Issue: Network Connectivity Errors
**Solution**: 
- Verify internet connection
- Check firewall settings
- Confirm target URLs are accessible

#### Issue: Report Generation Failures
**Solution**:
# Clean previous reports
rm -rf playwright-report allure-results allure-report test-results

# Re-run tests
npm run test:both

### Support Channels
- **Technical Issues**: Create issue in GitHub repository
- **Documentation**: Refer to Playwright official documentation
- **Framework Updates**: Monitor repository for latest changes

---

## Performance Benchmarks

### Expected Execution Times
- **File Upload Tests**: 4-6 seconds per test case
- **API Tests**: 0.5-2 seconds per test case
- **Total Suite Execution**: 30-40 seconds
- **Report Generation**: 5-10 seconds

### Success Criteria
- **Pass Rate**: 100% (51/51 tests)
- **Response Time**: API calls < 5 seconds
- **Browser Compatibility**: All three browsers (Chromium, Firefox, WebKit)

---

## Contact Information

### Project Maintainer
- **Repository Owner**: bettycoop
- **Project Repository**: https://github.com/bettycoop/tast_assessment
- **Branch**: main

### Support Resources
- **Playwright Documentation**: https://playwright.dev/
- **GitHub Issues**: Use repository issue tracker for bug reports
- **Framework Updates**: Monitor repository commits for latest changes

---

**Document Version**: 1.0  
**Last Updated**: July 31, 2025  
**Framework Version**: Playwright 1.54.1  
**Node.js Compatibility**: 14.0+
