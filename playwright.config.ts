import { defineConfig, devices } from '@playwright/test';

// Only baseURL is overridable; defaults to localhost:8080
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:8080'; // Base URL for the application under test
// Slow down by the given ms value; defaults to 0
const slowMo = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0;
const startLocalServer = baseURL === 'http://localhost:8080';

export default defineConfig({
  testDir: './e2e', //directory where the tests are located
  fullyParallel: true,
  forbidOnly: !!process.env.CI, //fail the build on CI if test.only is left in the code
  retries: process.env.CI ? 2 : 0, //retried tests to execute if it fails
  workers: process.env.CI ? 1 : undefined,  //workers processes to use for parallel execution
  reporter: [
    ['list'],
    ['github']
    ['junit', { outputFile: 'reports-e2e/junit.xml' }],  //standard JUnit XML format
    ['html', { outputFolder: 'reports-e2e/html', open: 'never' }], //but actually will be used html report
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure', //trace will be captured only when test fails
    screenshot: 'only-on-failure', //screenshot will be captured only when test fails
    video: 'retain-on-failure', //video will be captured only when test fails
    launchOptions: slowMo ? { slowMo } : undefined,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },//settings for the browser and device to be used in the test
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: startLocalServer
    ? {
        command: 'npm run dev -- --host 127.0.0.1 --port 8080 --strictPort', //command to start the local server
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      }
    : undefined,
});



