# 複雑なJavaScriptアプリケーションを作るために考えること
> Patterns For Large-Scale JavaScript Application Architecture

具体的なドキュメントは次を読む

- [docs](./docs) - 目次や全体像について
    - [css.md](./docs/css.md)
    - [component.md](./docs/component.md)
    - [domain.md](./docs/domain.md)
    - [infra.md](./docs/infra.md)
    - [store.md](./docs/store.md)
    - [use-case.md](./docs/use-case.md)
- [参考資料](./refs.md)
    - アーキテクチャを考えるときに参考にしたもの

以下は雑多なポエム]です。
考え始めたときににこういう情報を教えてくれる人がいれば助かったのにな、というのを書いて置いておくところです。

Inspired by [https://github.com/tokuhirom/java-handbook](https://github.com/tokuhirom/java-handbook)

## 目標

- 難しいものを簡単につくれる方法を探すのではなく、難しいものは難しく作るしかない
- 考えて作っていくためには、議論できる言語化されたもの(コード)が必要
- ルールは明確に、でも最初から明確なワケではない

## 140文字でOK

難しいものを簡単に作ることはできないため、難しく作る。
難しいものを考えずに作ることは、ほころびを生み壊れやすくなる。

## 複雑なものってどんなもの?

ここでは、ライブラリ抜きで1万LOC以上ぐらいを目安に考えてる。

## 無理なく理解

[Almin.js](https://github.com/almin/almin "Almin.js")はできるだけクラスで書けるようにした。
色々な言語のバックグラウンドを持つ人にとってクラスで書けたほうが直感的に理解ができるため。

Reduxのように関数を主軸した方が柔軟性やImmutabilityとの相性がいいが、
なれるまで大変で、また素のJavaScriptだとPayloadオブジェクトなどに型を付けにくい。

JSDocでは、オブジェクトに対して型を付けるよりも、クラスのインスタンスとした方が型が扱いやすい。
これはTypeScriptやFlowなどを使えば解決し易いが、あくまでJavaScriptとして書いたときの理解を優先している。

## 小さくより小さく

問題が複雑化していくほど一つのモデルでは線形的に複雑度が上がっていく。
モデルを小さく分けていくことは、線形的に上昇する複雑度を軽減するためのパターン。

## 役割分担 - ドメイン、API、View、デザイン、人

小さなプロジェクトなら分割の単位が大きい方が良い場合も多い。
プロジェクトが大きく、人が増えてきた場合にファイルの単位が多いと、
単純にコンフリクトする可能性が上昇する。

無意味に分ける必要はないが、意味的に分けられるなら積極的に分けたほうが
役割が分担され並行的に扱いやすくなる。

## UseCase

## 1UseCase1ファイル

- use-case/ ディレクトリを見たときに、誰(アクター)が何をしたいのかが把握しやすい
- 1つファイルに複数の事が書かれていると読むときのノイズとなりやすい

## UseCaseの名前は能動的
> 参考: [オブジェクト開発の神髄](http://bpstore.nikkeibp.co.jp/item/books/P82370.html "オブジェクト開発の神髄") P189

UseCaseはアクターから見た能動的な名前にし、受動的な名前を避ける。

- ✗「ゼミは学生に指定される」
- ◯「学生はゼミを指定する」

UseCaseの目的は、アクターがシステムをどうしたいかを理解するため。
なので、受動的よりも能動的な表現で理解した方が望ましいため。

この問題はDOMの状態をシステムに反映するときによく考える必要がある。
システムが変更されたからDOMに反映されるではなく、DOMのイベントを起因としてシステムを変更するという形になったときに
UseCaseを受動的にしたくなってしまう。
そこを堪えて能動的な名前にした方が良いと気がしている。(混ざってしまうのを避けたい)

## UseCaseはシナリオを書く
> 参考: [オブジェクト開発の神髄](http://bpstore.nikkeibp.co.jp/item/books/P82370.html "オブジェクト開発の神髄") P189

UseCaseにはそのユースケースにおけるアクションの一連の流れを書く。
機能をUseCaseに書くのではなく、あくまでどういう流れなのかを書く。

実際の機能と呼ばれるロジックはドメインモデルに書き、
UseCaseはそのドメインモデルを使った流れを記述する場所です。


### UseCaseの事前条件

Domainがあるかどうかなど、UseCaseの事前条件はできるだけ絞っておく。
そうすることでUseCase自体はスッキリと実装できる。
そうでない場合は毎回repositoryから取ってきたものがあるかどうかをチェックする必要がでてきしまう。


## ビジネスロジックはどこへ?

ドメインへ

## ドメインを考えられることができる

### ドメインを作るのは難しい
すごい難しい。
そのドメインのしごと、ライフサイクル、複雑度合いなどを考慮してドメインを分ける。
チームメンバーと相談し、都度判断する。

逆に言えば、相談して作れない作りになっていたらおかしい。

## Plain Old JavaScript Object  

ドメインは出来る限りPlain Old JavaScript Object - ただのJavaScriptで書く。
これはドメインの独立性を維持し、コアドメインに集中するためでもある。

Dateやデータ構造的な問題でJavaScriptに足りない機能がある場合はこの限りではない。

> フレームワーク独立

- [The Clean Architecture | 8th Light](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html "The Clean Architecture | 8th Light")
- [クリーンアーキテクチャ(The Clean Architecture翻訳)](http://blog.tai2.net/the_clean_architecture.html "クリーンアーキテクチャ(The Clean Architecture翻訳)")
- [持続可能な開発を目指す ~ ドメイン・ユースケース駆動（クリーンアーキテクチャ） + 単方向に制限した処理 + FRP - Qiita](http://qiita.com/kondei/items/41c28674c1bfd4156186 "持続可能な開発を目指す ~ ドメイン・ユースケース駆動（クリーンアーキテクチャ） + 単方向に制限した処理 + FRP - Qiita")

Alminというフレームワーク?を作って導入しているが、そのフレームワークはドメインに対して影響は与えない。
フレームワークとビジネスドメインは独立してないといけないため。
それをかんたんに推し量る目安として、ドメインはPlain Old Java Objectで書けるというものがある(ライブラリ依存してない)

## システムの状態(ドメイン)とViewの状態(State)

ドメインとStateを分けたことで、システムの状態(ドメイン)とViewの状態(State)を分けて考えられます。
この場合に、Stateは一時的な状態で、[信頼的できる唯一の情報](https://en.wikipedia.org/wiki/Single_source_of_truth)としてはドメインを利用したほうが都合が良いことが多いです。
そのため、Stateはドメインから作成できるようにしておくと、Stateを作り直す事が簡単になります。

逆に、Viewでしか利用しないアニメーションのための状態などはStateだけで管理しておきます。

- [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")

この問題は実際のアプリケーションを作る際に置いて選択を迫られる事が多いです。

- `<video>`は右クリックからUIの状態を変えられるが、システムの状態が齟齬が出たときにどちらを優先するか?
- エラー表示の状態をStateで管理した際に、`pushState`でのページ切り替えをおこなった際にStateはリセットすべきなのか?

この問題は、パフォーマンスや体験などの問題からトレードオフが発生します。
多くの場合において、ドメインよりもStateの方が作り直すことは簡単です。
そのため、基本的にはドメインを信頼できる情報源として、StateはViewのための写像とした方が良いです。

- [ ] State#update

## エラーから始める

React Componentもまずは、すべてのpropTypesを`isRequired`な状態で書き始める。
optionalだと型が違った場合にエラーがでないので、typoもエラーにならない。

```js
    static propTypes = {
        src: React.PropTypes.string.isRequired
    };
```

ドメインなどもどうようにエラーとなるテストを書くところから始める。

## 気付けることはいいこと

開発中はできるだけログをだし、どこで動作がおかしくなったのかを追跡できるようにしているといい。
そのためにはデフォルトは厳しくし、不要なら例外的に外すような作りにしていく必要がある。

たとえば、React ContextはContainer Componentのみが使えるが、
これは次のルールで成り立っている。

1. React Contextは禁止
2. Containerだけホワイトリストで許可

JavaScriptやUIはエラーに気づきにくいので、デフォルトがエラーとなるように寄せたほうがいい。

## 気づけないことはよくないこと

- ログが増えすぎると埋もれてしまい無視してしまうことがある。
- Lintを増やすと警告がでてるのを無視してしまうことがある。
- JSDocの型が嘘をついていて気づかないうちに不正な値が入ってる。

完全に機械的な処理は無理なのでレビューもする必要がある。

- `console`ログは`console.groupCollapsed`でまとめる
- Lintを通らないとgit pushできない[git hook script](https://gist.github.com/azu/e2cefd92af8c8797ecaf457ff8ce40e2)を使う
- [JSDocの型を使いruntime assert](http://efcl.info/2016/03/25/jsdoc-to-assert/)する

など気づけるような仕組みを少しづつでも取り入れていく。

- [良いデバッグログはプロジェクトの資産である // Speaker Deck](https://speakerdeck.com/yhara/liang-idebatuguroguhapuroziekutofalsezi-chan-dearu "良いデバッグログはプロジェクトの資産である // Speaker Deck")

## 気づけないルールは動かないルール

ドキュメントに書いてあっても、気づけないならそれは形骸化する可能性がある。

例えば、UseCaseクラスは次のルールで実装するというドキュメントがあるとする

- ファイル名と同名のUseCaseクラスをexportしている
- `ファイル名+Factory`のUseCaseのFactoryクラスをexportしている

こういうルールは機械的にチェックしやすいように決めているはずなので、機械的にチェックする。
JavaScriptで静的なチェックが難しいなら、メタなテストとして実行してテストする。

こういうことができるようにレイヤーを分けているはずなので、機械的なチェックのしやすさもルールの基準とする。

```js
'use strict';
import assert from 'assert';
import glob from 'glob';
import path from 'path';
import interopRequire from 'interop-require';
const srcDir = path.join(__dirname, '../src/');
const useCaseFiles = glob.sync(`${srcDir}/js/use-case/**/*UseCase.js`);
describe('MetaUseCase testing', () => {
  useCaseFiles.forEach((filePath) => {
    // UseCaseはファイル名と同じUseCaseクラスを定義している
    const UseCaseName = path.basename(filePath, '.js');
    // ES6 modules と CommonJSどちらでも読めるように
    const UseCaseModule = interopRequire(filePath) || require(filePath);
    describe(`${UseCaseName}`, () => {
      it('UseCaseファイルはクラスをexportsしてる', () => {
        assert(UseCaseModule, `UseCaseファイルはexportsしてる: ${filePath}`);
      });
      it('UseCaseファイルはファイル名と同名のUseCaseを持つ', () => {
        const UseCase = UseCaseModule[UseCaseName];
        assert(typeof UseCase === 'function', 'UseCaseクラスが存在する');
      });
      it(`UseCaseファイルは ${UseCaseName}Factory クラスを持つ`, () => {
        const Factory = UseCaseModule[`${UseCaseName}Factory`];
        assert(typeof Factory === 'function', 'Factoryクラスが存在する');
        assert(typeof Factory.create === 'function', 'Factory.create()が実装されている');
      });
    });
  });
});
```

ESLintなどのプラグインを書けば、静的にチェックできる部分も多いはずなので、
1時間以内に書けそうな感じならさっさと書いてしまう方が良い。

## CoCはできるだけ減らす

DDDはCoCと相性が良くないという話もあるが、
CoCが増えるとプロジェクトに参加する人が覚える事が増えるため、できるだけ普通に書けるようにする。

例えば、babel-preset-es2015だけの変換だと、エラーを継承したカスタムエラーは作れない。

```js
class CustomError extends Error {
}
```

エラーのようなオブジェクトを実装して使うというルールを入れるのもいいが、
覚えることが増えるのでツール側で解消できるなら、そちらのほうが覚える事が少ない。

- https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend

## `assert`は外せるので積極的に入れる

Node.jaの`assert`は積極的使っていきたい。
unassertを使えばproduction時に外す事が可能なので、開発中はassertをもっと使っていいはず。

## CSSは賢くやりすぎない

これは[ECSS](http://ecss.io/ "ECSS: Home Page")の考えの中に書いてあったことを参考にしている。
"賢く"とは、Sassなどでネストや関数などを使ってスクリプトのように書くことを言っている。

最終的にCSSはCSSと出力されるので、CSSのメタレイヤーで賢くやりすぎるのも問題があると考えている。
"賢く"やるより、必要がなくなったらすぐに消せるかどうかを判断できるCSSの方が望ましいと考えている。

## 原則は絶対ではない

特にCSSでは例外が出てきやすい。
そのため、原則が守れないと崩壊してしまうルールよりは、例外を規定することで原則を守れるルールの方が良い。

## 詳細度は一定にする

[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")などのルールを使っているのは、詳細度を一定にするためという面が多い。
詳細度を考えてCSSを書くのはとてもむずかしいので、普通に書いたら普通になるという状態を目指しておきたい。
そのためには、特別ではないものはすべて一定の詳細度にしていく。
Stateは必然的に詳細度が上がるので優先されるなどがちゃんと機能する状態を作るためにも詳細度は一定にする。

簡単にいえば、それぞれの要素には一意なクラスを付けてそれを使えば詳細度は大体安定する。
[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")はそういうことを決めた命名規則。

## パターンはパターン

パターンは作り出すものじゃないという話をどっかで読んだ

## ドメインモデルは常に同じパターンで実装されるとは限らない

## すべてのアプリケーションに同一のアーキテクチャは適応できない

このパターンが最強！みたいなものは存在しない。

## [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")

ショッピングカートを実装してみると必要性が分かる

## 1F

ユーザの入力に対して1F以内に反応を適応しないと体験が良くないケースがある

ストップウォッチ

- 押してから1フレーム以内に表示が止まって欲しい

Flux的なフローだと一周回してから反映するため、常に非同期に回す設計だとこの問題への対処が難しい。
そのため、同期的に一周回せるルートを用意しておくと、このような例外的なケースも同じ一方通行のデータフローで書けるはず。

## Stateは新しいか今のままか

StateはImmutableである方が良い

## StateはViewのため型

- StateContainerが受け取る
- こうすることでpropTypesがinstanceofのチェックだけでよくなる

```js
import ViewState from "../path/to/store/ViewState";
export default class ContainerComponent extends React.Component {
    static propTypes = {
        view: React.PropTypes.instanceof(ViewState).isRequired
    };
}
```

## Container Component

Project Componentやui-kitを使ってページをレイアウトするコンポーネント

- React Contextを参照して良い
- 逆にここ以外でもReact Contextを参照するとどこでもグローバルに値を取り出せてしまう
    - そうするとProject Componentなどと分けた意味がなくなるので禁止する
    - https://github.com/azu/eslint-plugin-no-allow-react-context を使いReact Contextが利用できる場所を制限する

## Project Component

プロジェクト固有のUIコンポーネント

## どこから書き始めるか

UIがあるならステートレスなコンポーネントとしてUIから作るのもいい。
その後でUseCaseやドメイン、State作りを実際にアプリケーションを動かせばいい。

ドメインやUseCaseをどう書くべきか迷った場合は、まずUseCaseから考えてみると良い。
まずは、アクターがシステムに対して何をしたいのかを書き出してみると、どのようなドメインがあって何をするべきかがでてくるはず。

> **Start from the Use Cases**  
> The best place to start when trying to understand a new domain is by mapping out use cases.
> A use case lists the steps required to achieve a goal, including the interactions between users and systems. Work with business users to understand what users do with the current system, be it a paper‐based process or one that’s computerized. Be careful to listen for domain terminology, because this
  forms the start of your shared language for describing and communicating the problem domain. It’s also useful to read back the use case to the domain expert in your own understanding, so they can validate that you do understand the use case as they do. Remember: capture a process map of reality, understand the work  ow as it is, and don’t try to jump to a solution too quickly before you truly understand and appreciate the problem.
> -- [Patterns, Principles, and Practices of Domain-Driven Design](http://www.wrox.com/WileyCDA/WroxTitle/Patterns-Principles-and-Practices-of-Domain-Driven-Design.productCd-1118714709.html "Patterns, Principles, and Practices of Domain-Driven Design")

## 翻訳

メッセージの翻訳は仕組み上色々漏れが生まれやすい。
漏れが生まれにくい仕組みにする事が重要。
