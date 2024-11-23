import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  // testInfo.setTimeout(testInfo.timeout + 2000);
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // await successButton.click();
  // const text = await successButton.textContent();

  // await successButton.waitFor({ state: "attached" });
  // const text = await successButton.allTextContents();

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // 1. 要素の出現を待つ
  await page.waitForSelector(".bg-success");

  // // 2. 特定のAPIレスポンスを待つ
  // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  // // 3. ネットワーク通信の完了を待つ
  // await page.waitForLoadState("networkidle");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts, async", async ({ page }) => {
  // tset.setTimeout(10000)
  test.slow();
  const successButton = page.locator(".bg-success");
  await successButton.click();
});
