import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('input fields', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });
  await usingTheGridEmailInput.fill('test@test.com');
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially('test@test.com', {
    delay: 500,
  });

  //generic assertion
  const inputValue = await usingTheGridEmailInput.inputValue();
  expect(inputValue).toEqual('test@test.com');

  //locator assertion
  await expect(usingTheGridEmailInput).toHaveValue('test@test.com');
});

test('radio buttons', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  const usingTheGridForm = page.locator('nb-card', {
    hasText: 'Using the Grid',
  });

  // await usingTheGridForm.getByLabel("Option 1").check({force: true});
  await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });
  const radioStatus = await usingTheGridForm
    .getByRole('radio', {
      name: 'Option 1',
    })
    .isChecked();
  // await expect(usingTheGridForm).toHaveScreenshot();
  // expect(radioStatus).toBeTruthy();
  // await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

  // await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({
  //   force: true,
  // });
  // expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();
  // expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy();
});

test('checkboxes', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });

  const allboxes = page.getByRole('checkbox');
  for (const box of await allboxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test('lists and dropdowns', async ({ page }) => {
  const dropDownMenu = page.locator('ngx-header nb-select');
  await dropDownMenu.click();

  await page.getByRole('list'); //when the list has a UL tag
  await page.getByRole('listitem'); //when the list has LI tag

  //const optionList = page.getByRole("list").locator("nb-option")
  const optionList = page.locator('nb-option-list nb-option');
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
  await optionList.filter({ hasText: 'Cosmic' }).click();
  const header = page.locator('nb-layout-header');
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

  const colors = {
    Light: 'rgb(255, 255, 255)',
    Dark: 'rgb(34, 43, 69)',
    Cosmic: 'rgb(50, 50, 89)',
    Corporate: 'rgb(255, 255, 255)',
  };

  await dropDownMenu.click();
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS('background-color', colors[color]);
    await dropDownMenu.click();
  }
});

test('tooltips', async ({ page }) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();

  const toolTipCard = page.locator('nb-card', {
    hasText: 'Tooltip Placements',
  });
  await toolTipCard.getByRole('button', { name: 'Top' }).hover();

  page.getByRole('tooltip'); //if you have a role tooltip created
  const tooltip = await page.locator('nb-tooltip').textContent();
  expect(tooltip).toEqual('This is a tooltip');
});

test('dialog box', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  });

  const trashIcon = page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash');

  await trashIcon.click();
  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
});

test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  //1 get the row by any test in this row
  const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
  await targetRow.locator('.nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('Age').clear();
  await page.locator('input-editor').getByPlaceholder('Age').fill('35');
  await page.locator('.nb-checkmark').click();

  //2 get the row based on the value in the specific column
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
  const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') });
  await targetRowById.locator('.nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('E-mail').clear();
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
  await page.locator('.nb-checkmark').click();
  await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

  //3 test filter of the table

  const ages = ['20', '30', '40', '200'];

  for (let age of ages) {
    await page.locator('input-filter').getByPlaceholder('Age').clear();
    await page.locator('input-filter').getByPlaceholder('Age').fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator('tbody tr');

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent();

      if (age == '200') {
        expect(await page.getByRole('table').textContent()).toContain('No data found');
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test('datepicker', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();
  // ページ全体のスクリーンショットを保存
  await page.screenshot({ path: 'screenshots/datepicker.png' });

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();
  // calendarInputField のスクリーンショットを保存
  await calendarInputField.screenshot({ path: 'screenshots/calendarInputField.png' });

  // screenshot をバイナリデータとして取得
  const buffer = await page.screenshot();
  console.log(buffer.toString('base64'));
  /* 長い長い文字列が出力される。screenshot をバイナリデータとして取得することで、
   1. 画像データをテキストとして扱える
   2. データベースへの保存が容易
   3. APIでの送受信が可能
   4. HTMLのimg要素のsrc属性で直接表示可能
  */

  await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click();
  // await expect(calendarInputField).toHaveValue('Nov 1, 2024');
});

test('datepicker2', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();
  await page.locator("[class='appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition']").click();

  let date = new Date();
  date.setDate(date.getDate() + 1);
  const expecteDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expecteDate}, ${expectedYear}`;

  await page.locator("[class='ng-star-inserted']").getByText(expectedYear.toString()).click();
  await page.locator('nb-calendar-month-picker').getByText(expectedMonthShort).click();
  await page.locator("[class='day-cell ng-star-inserted']").getByText(expecteDate, { exact: true }).click();

  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test('datepecker2', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 100);
  const expecteDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
  const expectexMonthLong = date.toLocaleString('En-US', { month: 'long' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expecteDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = ` ${expectexMonthLong} ${expectedYear}`;
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator("nb-calendar-pageable-navigation [data-name='chevron-right']").click();
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  }

  await page.locator("[class='day-cell ng-star-inserted']").getByText(expecteDate, { exact: true }).click();

  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test('slider', async ({ page }) => {
  const tempGauge = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger circle");
  await tempGauge.evaluate(node => {
    node.setAttribute('cx', '232.630');
    node.setAttribute('cy', '232.630');
  });
  await tempGauge.click();
});

// test.describe.only('slider2', () => {
//   test.describe.configure({ retries: 3 });
//   test('slider2', async ({ page }, testInfo) => {
//     if (testInfo.retry) {
//       console.log('This test is being retried');
//     }
//     //マウス操作
//     //対象のUI要素を取得
//     const tempBox = page.locator("[tabtitle='Temperature'] ngx-temperature-dragger");
//     //必要な場合のみ対象のUI要素をブラウザの表示領域にスクロール
//     await tempBox.scrollIntoViewIfNeeded();
//     //対象UI要素の領域の座標を取得
//     const box = await tempBox.boundingBox();
//     //対象UI要素の開始点 + 半分 で対象UI要素の中心座標を取得
//     const centerX = box.x + box.width / 2;
//     const centerY = box.y + box.height / 2;
//     //マウスを対象UI要素の中心座標に移動
//     await page.mouse.move(centerX, centerY);
//     //マウスを押下
//     await page.mouse.down();
//     //マウスを移動
//     await page.mouse.move(centerX + 100, centerY);
//     await page.mouse.move(centerX + 100, centerY + 100);
//     //マウスを離す
//     await page.mouse.up();

//     //tempBoxには30と表示されているはず。
//     expect(tempBox).toContainText('30');
//   });
// });
