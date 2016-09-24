# CSS

CSSとはレイアウトとコンポーネントのデザインをするもの

## 場所

- `src/component/` 以下にはそれぞれのコンポーネントに対するCSSを置く
- `src/css/` にはベースや変数など全体として適応されるものを置く

## 分類

コンポーネントに関連するCSSはコンポーネント単位でJavaScriptと同居するので同じルールが適応される

- src/component/container/
    - ページから見たレイアウトを扱える
    - Containerコンポーネントのレイアウト
- src/component/project/
    - プロジェクトコンポーネントに対するスタイル
- src/component/ui-kit/
    - ui-kitに対するスタイル

コンポーネント以外のCSSは `src/css` に配置する

- src/css/base.css
    - 指定要素や`*`に対して適応するベースのCSS
    - normalize.cssのようなもの
- src/css/*.css
    - グローバルなCSS Custom Property変数
    - CSS Custom Property変数は上書き禁止(PostCSSでは正しく依存を解決できないため)

## CSSの読み込みについて

全てのCSSは `src/index.css` から `postcss-easy-import` のワイルドカードで読み込まれる。
CSSの読み込みについては次の点に注意する

- Base CSSは最初に読み込まれる
- それ以外のCSSは読み込み順序に依存してはいけない
- 各CSSファイルを読み込むために明示的な `@import "path/to/file.css"` を書く必要はない
  - ワイルドカードで読み込まれるため

## 原則

- 各コンポーネントは `component/分類/<ComponentName>/<ComponentName>.css` のように配置する
    - `ComponentName` は大文字開始のキャメルケール
    - `<ComponentName>.css`にはそのコンポーネントと子コンポーネント(`<ComponentName>-<childName>`)を含んで良い
    - 対となるJavaScript(React)に書かれていないクラスはできるだけ扱わない(コンポーネント間の独立性を保つ)
- 各コンポーネントのStateは `分類/<ComponentName>/<ComponentName>.is-<stateName>.css` のように配置する
    - StateごとにCSSファイルを分ける
- 各コンポーネントのディレクトリの中にはJavaScriptとCSSと同居して存在する

合わせて読む: [ComponentのREADME](./component.md)

## 命名規則

命名規則は[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")の規約に準拠する。

- [SUIT CSS documentation](https://github.com/suitcss/suit/tree/master/doc "SUIT CSS documentation")
- 命名規則: [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md "SUIT CSS naming conventions")

```css
.コンポーネント名 {}
.コンポーネント名-子要素名 {}

.コンポーネント名.is-ステート名 {}
.コンポーネント名--modifier {}
```


ただしSUIT CSSのライブラリなどはそのまま使わなくても良い

- コンポーネント(Container/Project/ui-kit)はそのコンポーネントより上の要素/クラスのスタイルを扱わない
- 上の要素が下の要素のスタイルを扱うのは許容されるが、避けられる場合は避けるようにする
  - 例) containerコンポーネントがprojectコンポーネントに対して `width` を設定する

例) MyComponent

`MyComponent/MyComponent.js` というコンポーネントがあった場合に

```js
import React from "react";
export default class MyComponent extends React.Component {
    render() {
        return <div className="MyComponent">
            <h1 className="MyComponent-title">{this.props.title}</h1>
        </div>;
    }
}
```

CSSは以下のような形で書く

`MyComponent/MyComponent.css`:

```css
.MyComponent {
}
.MyComponent-title {
}
```

### Stateクラス

MyComponentにstateがある場合は、SUIT CSSの規約に基づき `is-*` というクラスが追加される。

次の例は`is-active`というstateが追加されているコンポーネントを示したもの。

```html
<div className="MyComponent is-active">
    <h1 className="MyComponent-title">{this.props.title}</h1>
</div>
```

この`is-active` stateに対するCSSは、`MyComponent/MyComponent.css`とは別ファイルとして作成する。

`コンポーネント名.is-ステート名.css` という命名規則で作成し、stateに関するCSSのみを記述する

`MyComponent/MyComponent.is-active.css`:

```css
MyComponent.is-active {
    /* is-active の時のスタイル */
}
```

stateを別ファイルにすることで、
コンポーネントディレクトリを見た際に、そのコンポーネントのstateが一覧できることを目的にしている。

## Project ComponentのCSS

- Project Componentはそのコンポーネントの内側のスタイルを当てる
- レイアウトを意識したmarginやpadding、heightなどのスタイルは当てない
    - `min-width`などのコンポーネントとして保証できるスタイルは問題ない

## Container ComponentのCSS

- ContainerはProject Componentを使うため、Containerから見たProjectのスタイルを当てても良い
- ある XContainerにある YProjectComponentの `width`や`height`などをレイアウトを指定してもよい

つまり、以下のようにある`.Container`の下の`.ProjectComponent`というスタイルを、
`Container.css`に書いても良い。

```css
.Container .ProjectComponent {

}
```

CSSの詳細度や[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")の規約を考えると、
以下のようにProject Componentは外から`className`を受け取れるようにするとより良い。

`MyComponent`:
```jsx
import React from "react";
// https://github.com/JedWatson/classnames
import classNames from "classnames";
export default class MyComponent extends React.Component {
    render() {
        const classNames = classNames("MyComponent", this.props.className);
        return <div className={classNames}>
            <h1 className="MyComponent-title">{this.props.title}</h1>
        </div>;
    }
}
```

`Container`:
```jsx
import React from "react";
import MyComponent from "./MyComponent";
export default class Container extends React.Component {
    render() {
        return <div className="Container">
            <MyComponent className="Container-MyComponent"/>
        </div>;
    }
}
```

こうすることで、先ほどの`.Container`の下の`.ProjectComponent`というスタイルは、
次のように`Container.css`へ書ける。

```css
.Container-MyComponent{
    
}
```

## 変数名

### 変数と定数

PostCSSを使い、CSS Custom Property(`--variable: <値>;`)を変数として利用できる。
CSS Custom Propertyの仕様的には、変数の上書きはできるが読み込み順序に依存するため、
基本的に変数は再定義しないでグローバルな定数として扱う。

そのため、各コンポーネントに変数を宣言するのではなく、`src/css/`以下に宣言してコンポーネントではそれを利用する。

CSS Custom Propertyの仕様は下記を参照する

- [CSS Custom Properties for Cascading Variables Module Level 1](https://drafts.csswg.org/css-variables/ "CSS Custom Properties for Cascading Variables Module Level 1")
- [CSS カスケード変数のためのカスタムプロパティ — CSS Custom Properties for Cascading Variables Module Level 1 （日本語訳）](http://www.hcn.zaq.ne.jp/___/WEB/css-variables-ja.html "CSS カスケード変数のためのカスタムプロパティ — CSS Custom Properties for Cascading Variables Module Level 1 （日本語訳）")

### 変数の名前

```
--<変数名> : <値>:
```

という形で変数を定義できる。

変数名の名前の区切り文字には`--`を使う。

````
--<種類>--<名前>
```

### 変数の使い道

PostCSSで扱えるCSS Custom Propertyの変数はグローバル変数である。
そのため、グローバルに必要な変数とコンポーネントに紐づく変数を命名規則で分離する。

グローバルな変数はページ全体から見た時に、認識として共通であるものをまとめるために利用する。
現在が同じ色だからという理由で、一つの変数を使いまわすと、
変更する際の変更箇所が増えてしまいまとめた意味がなくなってしまうことに注意する。

- 色
- フォント
- `z-index`
- コンポーネント間の幅(できればコンポーネントに紐づくものとして管理したい)
- 幅や高さ
- など

変数を使わなくても問題ない部分を無理やり変数にまとめようとしない。
(あくまでグローバル変数なので、グローバル変数を増やしすぎるのも逆に問題が起きやすいため)

### Mixinの変数

MixinはCSS @apply Ruleを使い実現する。

次のように書くことでSassなどで見られるMixinを実現できる。

```css
:root {
  --mixin--inline-block: {
    display: inline-block;
    vertical-align: top;
  };
}

.Toolbar {
  @apply --mixin--inline-block;
}
```

- [CSS @apply Rule](https://tabatkins.github.io/specs/css-apply-rule/ "CSS @apply Rule")
  - 現在ドラフトの仕様となっている
  - そのためIDEなどのエディタではまだサポートされていないため構文エラーとして扱われる場合がある

Mixinとなる変数名は、`--mixin--`で始まる変数名を使う

```css
:root {
  --mixin--inline-block: {
    display: inline-block;
    vertical-align: top;
  };
}
```

### コンポーネントに紐づく変数

コンポーネントの要素には一意なコンポーネント名があるため、それに準拠した変数名を使う

```
--<ComponentName>--<PropertyName>: 値:
```

という形式を利用する。


例): `ComponentName-childName` の `width` に対する変数

```css
.ComponentName-childName {
    width: var(ComponentName-childName--width, 100px);
}
```

### z-index

`z-index`の値は [z-index.css](./z-index.css) に定義されているベースの値を各コンポーネントで利用する。

クラス間で前後関係が必要な場合は、`calc`を使い相対値で指定する。

```css
.ComponentB {
  z-index: var(--z-index--default)
}
/* Bより前に表示する */
.ComponentA {
  z-index: calc(var(--z-index--default) + 1)
}
```
