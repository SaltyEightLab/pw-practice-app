import { test as base } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';

// フィクスチャとして他のテストで使用したいものの型を定義します。
export type TestOptions = {
  globalsQaURL: string;
  formLayoutsPage: string;
  pageManager: PageManager;
};

//
export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],
  formLayoutsPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await use('');
  },

  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
