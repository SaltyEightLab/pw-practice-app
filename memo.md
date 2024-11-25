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

Playwright: Web Automation Testing From Zero to Hero
Section 5: UI Components 39. Web Tables (Part 1)
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
