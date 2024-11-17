import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  //by tag name
  await page.locator("input").first().click();

  //by id
  page.locator("#inputEmail1");

  //by class value
  page.locator(".shape-rectangle");

  //by attribute
  page.locator('[placeholder="Email"]');

  //by class value (full)
  page.locator(
    "[input-full-width size-medium status-basic shape-rectangle nb-transition]"
  );

  //combine different selectors
  page.locator('input[placeholder="Email"][nbinput]');

  //by partial test match
  page.locator(":text('Using')");

  //by exact text match
  page.locator(":text-is('Using the Grid')");
});

test("user facing locators ", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using the Grid").click();

  await page.getByTestId("Sign in").click();

  await page.getByTitle("IoT Dashboard").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio :text-is('Option 1')").click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 1')")
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
});
