// playwrightのtestをbaseという名前でimport
import { test as base } from '@playwright/test';

// TestOptions という基本の設定に付け加えたい設定を定義する。
export type TestOptions = {
  globalsQaURL: string;
};

// base という基本の設定に、TestOptions を付け加え、testオブジェクトとする。
export const test = base.extend<TestOptions>({
  globalsQaURL: [
    '',
    {
      option: true,
    },
  ],
});
