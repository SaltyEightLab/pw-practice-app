import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    const dateToAssert = await this.selectDateInTheCalender(numberOfDaysFromToday);

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
    const calenderInputField = this.page.getByPlaceholder('Range Picker');
    await calenderInputField.click();

    const dateToAssertStart = await this.selectDateInTheCalender(startDayFromToday);
    const dateToAssertEnd = await this.selectDateInTheCalender(endDayFromToday);
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calenderInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalender(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expecteDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
    const expectexMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expecteDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = ` ${expectexMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator("nb-calendar-pageable-navigation [data-name='chevron-right']").click();
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(expecteDate, { exact: true }).click();
    return dateToAssert;
  }
}
