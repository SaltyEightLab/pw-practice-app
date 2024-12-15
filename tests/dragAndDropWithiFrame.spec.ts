import { expect } from '@playwright/test';
import { test } from '../test-options';

test('drag and drop with iFrame case1', async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL);

  //page内のiFrameを取得
  const iFrame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  //iFrame内に存在する画像UI「High Tatras 4」を取得
  const target = iFrame.locator('li', { hasText: 'High Tatras 4' });
  //iFrame内に存在するtrashUIを取得
  const trash = iFrame.locator('#trash');
  //画像UIをtrashUIにドラッグ
  await target.dragTo(trash);

  //trashUI内に画像UI「High Tatras 4」が存在することを確認
  await expect(trash.locator('li h5')).toContainText('High Tatras 4');
});

test('drag and drop with iFrame case2', async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL);

  //page内のiFrameを取得
  const iFrame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  //iFrame内に存在するtrashUIを取得
  const trash = iFrame.locator('#trash');
  //iFrame内に存在する画像UI「High Tatras 2」を取得
  const target = iFrame.locator('li', { hasText: 'High Tatras 2' });
  //画像UIをtrashUIにドラッグ
  await target.hover();
  await page.mouse.down();
  await trash.hover();
  await page.mouse.up();

  //trashUI内に画像UI「High Tatras 2」が存在することを確認
  await expect(trash.locator('li h5')).toContainText('High Tatras 2');
});
