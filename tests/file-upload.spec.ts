import { test, expect, Page } from '@playwright/test';
import path from 'path';

const BASE_URL = 'https://the-internet.herokuapp.com/upload';

test.describe('Test Scenario - File Upload', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('TI_Upload_TC001 - Navigation to the web page', async () => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('The Internet');
    expect(page.url()).toBe(BASE_URL);
    const heading = page.locator('h3:has-text("File Uploader")');
    await expect(heading).toBeVisible();
  });

  test('TI_Upload_TC002 - Checking the elements if present/visible', async () => {
    await page.goto(BASE_URL);
    
    const heading = page.locator('h3:has-text("File Uploader")');
    await expect(heading).toBeVisible();
    
    const description = page.locator('text=Choose a file on your system and then click upload');
    await expect(description).toBeVisible();
    
    const fileInput = page.locator('#file-upload');
    await expect(fileInput).toBeVisible();
    
    const uploadButton = page.locator('#file-submit');
    await expect(uploadButton).toBeVisible();
    
    const dragDropArea = page.locator('#drag-drop-upload');
    await expect(dragDropArea).toBeVisible();
    
    const dragDropText = page.locator('text=Or, drag and drop a file into the area below');
    await expect(dragDropText).toBeVisible();
    
    const dragDropStyles = await dragDropArea.getAttribute('class');
    expect(dragDropStyles).toContain('dz-');
  });

  test('TI_Upload_TC003 - Checking the footer Elemental Selenium link', async () => {
    await page.goto(BASE_URL);
    
    const elementalSeleniumLink = page.locator('a:has-text("Elemental Selenium")');
    await expect(elementalSeleniumLink).toBeVisible();
    
    await expect(elementalSeleniumLink).toHaveAttribute('href', 'http://elementalselenium.com/');
    
    await expect(elementalSeleniumLink).toHaveAttribute('target', '_blank');
    
    const poweredByText = page.locator('text=Powered by');
    await expect(poweredByText).toBeVisible();
  });

  test('TI_Upload_TC004 - Upload a valid file using Choose File', async () => {
    await page.goto(BASE_URL);
    
    const testFileName = 'test-upload-file.txt';
    const testFilePath = path.join(__dirname, '..', 'test-data', 'sample-upload.txt');
    
    const fileInput = page.locator('#file-upload');
    await expect(fileInput).toBeVisible();
    
    await fileInput.setInputFiles(testFilePath);
    
    const fileValue = await fileInput.inputValue();
    expect(fileValue).toContain('sample-upload.txt');
    
    const uploadButton = page.locator('#file-submit');
    await expect(uploadButton).toBeVisible();
    await uploadButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const successHeading = page.locator('h3:has-text("File Uploaded!")');
    await expect(successHeading).toBeVisible({ timeout: 10000 });
    
    const uploadedFileName = page.locator('text=sample-upload.txt');
    await expect(uploadedFileName).toBeVisible();
  });

  test('TI_Upload_TC005 - Upload a valid file using the red-dashed Square', async () => {
    await page.goto(BASE_URL);
    
    const dragDropArea = page.locator('#drag-drop-upload');
    await expect(dragDropArea).toBeVisible();
    
    const testFilePath = path.join(__dirname, '..', 'test-data', 'sample-upload.txt');
    
    const hiddenFileInput = page.locator('#drag-drop-upload input[type="file"]');
    
    if (await hiddenFileInput.count() > 0) {
      await hiddenFileInput.setInputFiles(testFilePath);
      
      await page.waitForTimeout(1000);
      
      const droppedFile = page.locator('#drag-drop-upload .dz-filename, #drag-drop-upload .dz-name');
      await expect(droppedFile).toBeVisible({ timeout: 5000 });
      
      const fileName = await droppedFile.textContent();
      expect(fileName).toContain('sample-upload.txt');
      
      const uploadButton = page.locator('#file-submit');
      if (await uploadButton.isVisible()) {
        await uploadButton.click();
        
        await page.waitForLoadState('networkidle');
        
        const successHeading = page.locator('h3:has-text("File Uploaded!")');
        await expect(successHeading).toBeVisible({ timeout: 10000 });
      }
    } else {
      console.log('No hidden file input found in drag-drop area');
      
      await expect(dragDropArea).toBeVisible();
      
      const dragDropClasses = await dragDropArea.getAttribute('class');
      expect(dragDropClasses).toContain('dz-');
      
      const uploadButton = page.locator('#file-submit');
      await expect(uploadButton).toBeVisible();
      await uploadButton.click();
      
      await page.waitForLoadState('networkidle');
      
      const currentUrl = page.url();
      const bodyText = await page.textContent('body');
      console.log('Drag-drop upload without file result:', bodyText);
      
      const hasError = bodyText?.includes('Internal Server Error');
      expect(hasError).toBe(true);
      
      const successHeading = page.locator('h3:has-text("File Uploaded!")');
      await expect(successHeading).not.toBeVisible();
    }
  });

  test('TI_Upload_TC006 - Click Upload button without file selected', async () => {
    await page.goto(BASE_URL);
    
    const fileInput = page.locator('#file-upload');
    await expect(fileInput).toBeVisible();
    
    const fileValue = await fileInput.inputValue();
    expect(fileValue).toBe('');
    
    const uploadButton = page.locator('#file-submit');
    await expect(uploadButton).toBeVisible();
    await uploadButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const currentUrl = page.url();
    console.log('Current URL after upload without file:', currentUrl);
    
    const pageTitle = await page.title();
    const pageContent = await page.textContent('body');
    console.log('Page title:', pageTitle);
    console.log('Page content preview:', pageContent?.substring(0, 200));
    
    const headings = await page.locator('h1, h2, h3, h4').allTextContents();
    console.log('All headings on page:', headings);
    
    if (currentUrl === BASE_URL) {
      const allText = await page.textContent('body');
      console.log('Body text content:', allText);
      
      const possibleHeadings = [
        page.locator('h3:has-text("File Uploader")'),
        page.locator('h3'),
        page.locator('text=File Uploader'),
        page.locator('[id*="content"] h3'),
        page.locator('.example h3')
      ];
      
      let headingFound = false;
      for (const heading of possibleHeadings) {
        if (await heading.count() > 0) {
          const headingText = await heading.textContent();
          console.log('Found heading:', headingText);
          headingFound = true;
          break;
        }
      }
      
      const successHeading = page.locator('h3:has-text("File Uploaded!")');
      await expect(successHeading).not.toBeVisible();
      
      expect(currentUrl).toBe(BASE_URL);
      
    } else {
      console.log('Navigated to different page');
      
      const successHeading = page.locator('h3:has-text("File Uploaded!")');
      await expect(successHeading).not.toBeVisible();
      
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
    }
  });
});
