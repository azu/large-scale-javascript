# Components

## 原則

次のような考えが原則として存在します。

- コンポーネントはコンポーネント名でディレクトリ切る
- コンポーネントディレクトリには、コンポーネントと同名のJSとCSSファイルが存在する
- コンポーネントを削除した場合に、同名のCSSファイルを削除しても問題ない状態にする

例) MyButtonというコンポーネントのディレクトリ構造。

```
MyButton
├── MyButton.css
└── MyButton.js
```

## 分類

- container/
    - projectコンポーネントを使ってページをレイアウトするコンポーネント
    - UseCaseに依存し、ユーザーアクションのハンドラ定義を行う
    - Stateオブジェクトを扱うことができるコンポーネント
    - containerは階層的なディレクトリ構造となり、DOM構造をディレクトリとして表現する
    - containerにおいてはReact Context経由で値を受け取ってよい
- project/
    - プロジェクト固有のUI
    - projectコンポーネントは並列的なディレクトリ構造となっている
    - Stateオブジェクトではなくできるだけプリミティブな値に分解し `props` で受け取る
    - ユーザーアクションのハンドラは定義せず、Containerから受け取る
    - projectコンポーネントの中で完結するハンドラは定義して利用してよい
- ui-kit/
    - UIを抽象化したもの
    - projectがuiを継承したプロジェクト固有UIを実装する
    - ui/ にロジックを書くのは避けよう。できるだけ短く小さく

### 例) ActionButton

`ActionButton` を継承(利用)したコンポーネントには`ActionButton`というクラスが付加される。

```js
import React from "react";
import ActionButton from "../../ui/ActionButton";
import Icon from "../../ui/Icon"
export default class BookmarkButton extends React.Component {
    render() {
        return <ActionButton className="BookmarkButton">
            <Icon src="./assets/buttons/bookmark-icon.png"/>
            <span className="BookmarkButton-title">ブックマーク</span>
        </ActionButton>
    }
}
```

このとき `BookmarkButton` の`class`属性値は `class="ActionButton BookmarkButton"` となる。

- `ActionButton` 共通のスタイルは `ui-kit/ActionButton.css` へ
- `BookmarkButton` 固有のスタイルは `components/BookmarkButton.cs` へ

それぞれ書くことで、コンポーネントとCSSの継承を関連づけている。

```css
.ActionButton {
    padding: 0.1em 0.5em;
    margin: 0.3em;
}
```

と。

```css
.BookmarkButton {
    background-color: black;
}

.BookmarkButton-title {
    color: white;
    vertical-align: middle;
}
```

という感じでスタイルも共通と固有がファイルとして分離できることも目的としている。

## 命名規則

- コンポーネントは大文字から開始する
- 主に名詞を使う
    - コンポーネントが自立して動くならその限りではない
- 能動的な名前を付ける(受動的ではない名前)

例)

- MyButton
- HideMyButton
    - ✗ HiddenMyButton

## コンポーネントのクラス名の設定

コンポーネントに指定するクラス名はSUITCSSのルールに従う。

詳細は[CSSのREADME](./css.md)を参照。

コンポーネントクラス名を生成する際には[suitcss-classnames](https://github.com/dwango-js/suitcss-classnames "suitcss-classnames")が利用できる。

### [suitcss-classnames](https://github.com/dwango-js/suitcss-classnames "suitcss-classnames")

[suitcss-classnames](https://github.com/dwango-js/suitcss-classnames "suitcss-classnames")を使うことで、
状態に基づいたクラス名を作成できる。

```js
const className = suitClassNames({
  component: "ComponentName",
  states: {
      "is-disable": false,
      "is-active": true
  }
});
// "ComponentName ComponentName.is-active" が作成される
```

このとき、`states`のキーには`is-`を省略しないようにする。(CSSのクラス名に合わせたstateのキーを書く)

> "States's property key name(isState) should start with is-*"

のようなESLintのエラーがでた場合は、`is-`が省略されている。

- [eslint-plugin-suitcss-classnames](https://github.com/azu/eslint-plugin-suitcss-classnames "eslint-plugin-suitcss-classnames")
