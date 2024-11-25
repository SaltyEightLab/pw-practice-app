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
