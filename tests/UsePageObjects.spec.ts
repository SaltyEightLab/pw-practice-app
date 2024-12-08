import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FromLayoutsPage } from '../page-objects/fromLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('navigation to form page', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.fromLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test('parametrized methods', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FromLayoutsPage(page);
  const onDatepickerPage = new DatepickerPage(page);
  await navigateTo.fromLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', false);
  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatePickerDateFromToday(10);
  await onDatepickerPage.selectDatepickerWithRangeFromToday(6, 15);
});
