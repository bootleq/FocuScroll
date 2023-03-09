import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = `http://localhost:${process.env.TEST_SERVER_PORT}/FocuScroll/`;

// See https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: baseURL,
    viewport: { width: 1366, height: 768 },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  outputDir: 'test-results/',

  webServer: {
    command: 'yarn webpack-dev-server',
    url: baseURL,
    timeout: 10 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
