# UseCase

## 役割
ComponentとDomainをつなぐ。

- 新規にEntityを作成し、Repositoryに保存
- Repositoryから既存のEntityを取り出す
- Entityに変更を加えて、Repository保存

その際に必要な情報をInfraのAPIを使い外部と通信を行い取得したりする。

## 原則

1UseCase1ファイル。

UseCaseは入れ子|拡張とすることもできるが、できるかぎりUseCaseの再利用は避ける。
ドメインが正しく振る舞いを持っていれば、UseCaseの再利用をするケースは少なくなる。

### UseCaseを再利用する場合

例) OuterUseCase#executeがInnerUseCaseを呼び出す。

`InnerUseCase#execute()` の返り値(resolvedされた値)を使うOuterUseCaseは許容しない。
execute関数では、非同期ならPromiseを返す、そうでないなら何も返さない。
その返した値を利用することはできるだけ避ける。(then/catchの成功/失敗だけを見る)

## 作り方

### 命名規則
```
動詞 + 名詞(対象) + UseCase
```
例。
```
ChangeTitleUseCase
EnterFullScreenUseCase
```

UseCaseはDomainの流れを意識した命名にする。
UIを意識したClickButtonUseCaseといった名前は付けない。

UseCaseはアクターから見た能動的な名前にし、受動的な名前を避ける。

### ディレクトリの切り方
基本的にはdomain/ またはstore/ と同じディレクトリ名で揃える。

```
- store
    - viewer/
- domain
    - viewer/
- use-case
    - viewer/
```

### entity の変更を通知
変更があったentityをRepository#saveすることで、RepositoryのChangeイベントが走る。
Store内で、Repository#onChangeにハンドラを渡すことで、Changeのイベントとのつなぎ込みを行う。

### dispatch 関数
execute内で、this.dispatchを叩くことで、UseCaseからイベントを発することができる。
Store内で、Store#onDispatchにハンドラを渡すことで、UseCaseからのイベントとのつなぎ込みを行う。
dispatch関数の引数には次の様な形式のオブジェクトを渡す。

```js
{
  type: 'HogeFugaUseCase',
  hoge: fuga
}
```

#### dispatch 関数と `type` 定数
payloadオブジェクトの `type` に利用する定数はUseCaseクラス内にstaticで定義する。

```js
export class EnterTagEditingUseCase extends UseCase {
  static EVENT = {
    ENTER: Symbol('EnterTagEditing')
  };

  execute() {
    this.dispatch({
      type: Symbol('EnterTagEditingUseCase.EVENT.ENTER')
    });
  }
}
```

### 作成ステップ
1. 対象ディレクトリがない場合は作成
1. 対象ディレクトリ下に `HogeFugaUseCase.js` を配置
1. constructorで依存するRepositoryなどを受け取る
1. executeで実行に必要な値を受け取る
1. execute内部で通信が発生する場合は、そのPromiseを返すようにする
1. entityの新規作成や、変更を行った場合はRepository#saveをする
1. Stateへ直接イベントを送りたい場合はthis.dispatchを利用する
1. 依存を解決するためのHogeFugaFactoryを作成
