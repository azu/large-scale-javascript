# UseCase

## 役割
Component と Domain をつなぐ。

- 新規に Entity を作成し、Repository に保存
- Repository から既存の Entity を取り出す
- Entityに変更を加えて、Repository保存

その際に必要な情報をInfraのAPIを使い外部と通信を行い取得したりする。

## 原則

1UseCase1ファイル

UseCaseは入れ子|拡張とすることもできるが、できるかぎりUseCaseの再利用は避ける。
ドメインが正しく振る舞いを持っていれば、UseCaseの再利用をするケースは少なくなる。

### UseCaseを再利用する場合

例) OuterUseCase#execute が InnerUseCaseを呼び出す

`InnerUseCase#execute()` の返り値(resolvedされた値)を使う OuterUseCase は許容しない。
execute 関数では、非同期なら Promise を返す、そうでないなら何も返さない。
その返した値を利用することはできるだけ避ける。(then/catchの成功/失敗だけを見る)

## 作り方

### 命名規則
```
動詞 + 名詞(対象) + UseCase
```
例
```
ChangeTitleUseCase
EnterFullScreenUseCase
```

UseCase はDomainの流れを意識した命名にする。
UI を意識した ClickButtonUseCase といった名前は付けない。

UseCaseはアクターから見た能動的な名前にし、受動的な名前を避ける。

### ディレクトリの切り方
基本的には domain/ または store/ と同じディレクトリ名で揃える

```
- store
    - viewer/
- domain
    - viewer/
- use-case
    - viewer/
```

### entity の変更を通知
変更があった entity を Repository#save することで、Repository の Change イベントが走る。
Store 内で、Repository#onChange にハンドラを渡すことで、Change のイベントとのつなぎ込みを行う。

### dispatch 関数
execute 内で、this.dispatch を叩くことで、UseCase からイベントを発することができる。
Store 内で、Store#onDispatch にハンドラを渡すことで、UseCase からのイベントとのつなぎ込みを行う。
dispatch 関数の引数には以下の様な形式のオブジェクトを渡す

```js
{
  type: 'HogeFugaUseCase',
  hoge: fuga
}
```

#### dispatch 関数 と `type` 定数
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
1. constructor で依存する Repository などを受け取る
1. execute で実行に必要な値を受け取る
1. execute 内部で通信が発生する場合は、その Promise を返すようにする
1. entity の新規作成や、変更を行った場合は Repository#save をする
1. State へ直接イベントを送りたい場合は this.dispatch を利用する
1. 依存を解決するための HogeFugaFactory を作成
