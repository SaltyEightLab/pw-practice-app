import { faker } from '@faker-js/faker';
import { test } from '../test-options';

test('parametrized methods', async ({ page, formLayoutsPage, pageManager }) => {
  // const pm = new PageManager(page);
  const randomFullname = faker.person.fullName();
  const randomEmail = `${randomFullname.toLowerCase().replace(/\s+/g, '.')}${faker.number.int(1000)}@test.com`;

  // await pm.navigateTo().fromLayoutsPage();
  await pageManager.onFormLayoutsPage().submitUsingTheGridWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
  await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullname, randomEmail, false);
});
