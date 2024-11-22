import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("input fields", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });
  await usingTheGridEmailInput.fill("test@test.com");
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially("test@test.com", {
    delay: 500,
  });

  //generic assertion
  const inputValue = await usingTheGridEmailInput.inputValue();
  expect(inputValue).toEqual("test@test.com");

  //locator assertion
  await expect(usingTheGridEmailInput).toHaveValue("test@test.com");
});

test("radio buttons", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  const usingTheGridForm = page.locator("nb-card", {
    hasText: "Using the Grid",
  });

  // await usingTheGridForm.getByLabel("Option 1").check({force: true});
  await usingTheGridForm
    .getByRole("radio", { name: "Option 1" })
    .check({ force: true });
  const radioStatus = await usingTheGridForm
    .getByRole("radio", {
      name: "Option 1",
    })
    .isChecked();
  expect(radioStatus).toBeTruthy();
  await expect(
    usingTheGridForm.getByRole("radio", { name: "Option 1" })
  ).toBeChecked();

  await usingTheGridForm.getByRole("radio", { name: "Option 2" }).check({
    force: true,
  });
  expect(
    await usingTheGridForm.getByRole("radio", { name: "Option 1" }).isChecked()
  ).toBeFalsy();
  expect(
    await usingTheGridForm.getByRole("radio", { name: "Option 2" }).isChecked()
  ).toBeTruthy();
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  const allboxes = page.getByRole("checkbox");
  for (const box of await allboxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});
