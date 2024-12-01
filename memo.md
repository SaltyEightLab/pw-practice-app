Playwright: Web Automation Testing From Zero to Hero
Section 5: UI Components

37. Tooltips
    ホバー時に現れる tooltip の表示テスト。
    「tooltip の DOM を探すために、tooltip が表示された状態でブラウザを command + \ で固定する」
    とあったんだけど、できないなー・・・。

38. Dialog Boxes
    削除ボタンを押した時に現れるダイアログの動作テスト。
    通常、Playwright はブラウザのダイアログを自動でキャンセルしてしまうので、
    ダイアログをテストの一環として受け入れるために、
    page.on("dialog", (dialog) => dialog.accept()) を行う必要がある。

39. Web Tables (Part 1)
    【Playwright でテーブル操作のテスト】

✅ テーブルから特定の行を見つけて編集

- 行の絞り込みにはロケーターの二段階フィルターを使用
- 例：const targetRowById = page
  .getByRole("row", { name: "11" })
  .filter({ has: page.locator("td").nth(1).getByText("11") });

✅ 検索機能のテスト

- 検索結果の表示に 0.5 秒くらいラグがある
- タイムアウト設定を忘れずに！

#Playwright #テスト自動化 #フロントエンド

Playwright: Web Automation Testing From Zero to Hero
Section 5: UI Components 41. Date Picker (Part 1)

【カレンダーによる日付取得のテスト】

await page
.locator('[class="day-cell ng-star-inserted"]')
.getByText("1", { exact: true })
.click();

のように、{ exact: true } を指定することで、"1", "10", "11", "12" などの候補から
"1" を指定することができる。

#Playwright #テスト自動化 #フロントエンド #e2e #駆け出しエンジニアと繋がりたい #エンジニア転職

42. Date Picker (Part 2)
    テストの実行日時に応じて、カレンダーから取得する日付を更新してテストする方法を学習。
    テストの要件は、Date オブジェクトを利用して、テスト実行日時を取得し、その翌日を取得するというものなのだけど、動画内でお手本として提示されたコードでは、月をまたぐ場合に上手くいかないと思ったので、自分でコードを修正してみた結果、上手くいったので Playwright が少し分かってきたのかもしれない と少し嬉しい。
