import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigation to form page @smoke @regression', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().fromLayoutsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test('parametrized methods @block', async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullname = faker.person.fullName();
  const randomEmail = `${randomFullname.toLowerCase().replace(/\s+/g, '.')}${faker.number.int(1000)}@test.com`;

  await pm.navigateTo().fromLayoutsPage();
  await pm.onFormLayoutsPage().submitUsingTheGridWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
  await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullname, randomEmail, false);
  // await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', false);
  // await pm.navigateTo().datepickerPage();
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15);
});
