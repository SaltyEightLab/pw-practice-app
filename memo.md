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

Playwright: Web Automation Testing From Zero to Hero
Section 5: UI Components 42. Date Picker (Part 2)
テスト実行日 + 100 日後に日付を DatePicker 上から拾って照合するテスト。
これまでは動画教材の通りに写経して理解するだけだったけど、少しずつ動画教材がやろうとしていることを自分なりに予測し、コードに落とし込み、動画教材で答え合わせという順序で進めることができるようになってきたので成長を感じる！

Playwright: Web Automation Testing From Zero to Hero
Section 5: UI Components 43. Sliders
図のようなスライダーを操作するテスト。
まずは、
const tempGauge = page.locator(
"[tabtitle='Temperature'] ngx-temperature-dragger circle"
);
でスライダーの ⚫︎ 部分の UI 要素を取得し、
これの位置を動かすために、
await tempGauge.evaluate((node) => {
node.setAttribute("cx", "232.630");
node.setAttribute("cy", "232.630");
});
という処理を行いました。

evaluate((node) => {})というメソッドが初めて出てきたので、？？でしたが、調べてみたらわかりました。

通常、Playwright は、テストを行うために、テストコードによってブラウザを外から操作するいわばユーザー役に徹する。
しかし、今回のようなスライダーを attribute の変更によって操作する場合には、evaluate を宣言することにうよって、ユーザー役ではなく開発者役になることを明示する必要がある。
また、node という引数は UI 要素「tempGauge」の DOM であり、これを渡すことによって、DOM を編集することができるようになる。

ということらしい。
