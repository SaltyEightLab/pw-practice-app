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

45. What Is Page Objects

Page Object Model についてさわりだけ学習しました！

Page Object Model とは
ページごとに、そのページのテストに必要なメソッドをまとめたオブジェクトを作成してテストを行なっていく手法のこと。
これを行うことで、
DRY: Don't Repeat Yourself
KISS: Keep It Simple and Stupid
のメリットを享受することができる。

Playwright: Web Automation Testing From Zero to Hero
Section 6: Page Objects Model 47. Navigation Page Object
UI にアニメーションが含まれている場合、
テストコードの処理がアニメーションの終了を待たずに処理されるため、
本来通りの結果が得られないことがある。
例えば、以下のような例だ。

① サイドメニュー項目「プロフィール」をクリック
② アニメーションを伴ってサイドメニュー項目が展開される。
③ プロフィール項目内の「編集」をクリック
④ 編集ページに遷移

上記のような場合、② のアニメーションの終了を待たないと、③ のクリックは成功しない。
よって、② の終了を待機する必要がある。

推奨される対策:
waitForSelector を使用して要素の状態変化を待機
アニメーション完了を示す CSS クラスの付与を待機
テスト環境では可能な限りアニメーションを無効化
data-testid 属性を使用して、アニメーション状態に依存しない要素の特定

DRY or KISS ?

今、Page Object Model を学んでいる。
Page Object Model とはつまり、テストしたいページのテストに必要なメソッドやロケーターをまとめたクラスを作ることによって、テストコードのメンテナンス性を高めようというもの。

この Pege Object Model を学習する中で、意識すべき２つの原則が紹介された。

DRY: Don't Repeat Yourself（同じコードを２度記述しない）
KISS: Keep It Simple and Stupid（シンプルでわかりやすいコードを書く）

この２つは、競合してしまう時もある。
例えば、図のようにプロパティでロケーターを定義し、コンストラクタの中でロケーターを取得し、それを、クラス内のメソッドの中で使用する場合、確かにメソッドの中で同じロケーターの取得処理を何度も行うことはなくなり、これは DRY の原則に則っていることになる。
しかし、その一方で、使用するロケーターの数が多くなればなるほど、プロパティとコンストラクタが膨大になっていき、使用するロケーターを探す作業も大変になっていくため、これは KISS の原則に反していることになる。

よって、チームのメンバーや後の開発を考えた場合、
DRY or KISS ?
どちらを優先するべきなのかを考える必要がある。

49. Parametrized Methods

    async submitUsingTheGrigdWithCredentialsAndSelectOption(){

    }
    メソッドに分かりやすい名前をつけることを恐れないでください。

css セレクターを用いて html 要素を検索する際、
'.day-cell.ng-star-inserted' と '.day-cell .ng-star-inserted' は全く異なる意味を持つ。

'.day-cell.ng-star-inserted'
・半角スペースなし
・同じ要素が両方のクラスを持つことを意味する
・以下のような要素にマッチする

<div class="day-cell ng-star-inserted">...</div>

'.day-cell .ng-star-inserted'
・半角スペースあり
・.day-cell クラスを持つ要素の子孫要素の中で.ng-star-inserted クラスを持つものを指す
・以下のような要素にマッチする

<div class="day-cell">
  <div class="ng-star-inserted">...</div>
</div>
