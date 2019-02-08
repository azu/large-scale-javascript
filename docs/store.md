# Store

## 役割
`State` を内包し、その参照を提供する。
Repositoryの変更イベントに対する処理をもつ。
UseCaseのイベントをStateにつなぐ。

# State

## 役割
Domainの情報を、Componentが利用しやすい形に変換する。
UseCaseのイベントに対する処理をもつ。

## 原則

- Domainのentityが入れ子になっている場合などは、entityをそのまま利用してもよい。
- Component用に変換が必要な場合は、単純なオブジェクトや、変換用のクラスを用意してもよい。

理由としては、変更がある度に新規インスタンスを返す仕組みとイベント周りのつなぎ込みが複雑になりそうなためと、Domainの情報からStateは作れるはずなため。

## 作り方
### 命名規則
```
名詞(entity 名) + State
```
entityと対応している場合はそのentity名が入る。

### ディレクトリの切り方
Stateの入れ子は作らないため、基本的にはstore/ 直下にentity名でディレクトリを切り、
その下に`HogeStore.js`、`HogeState.js`を配置する。
Componentを意識した形になるので、大きくなりすぎず、逆に細かく分けすぎて情報のかぶりがあまりでないようにStateを分ける。

### Component を意識したプロパティの作成
たとえばComponentのHogeButtonを非表示にしたい場合は次のようにする。

Containerに渡すHogeStateへ`isHidden`のようなプロパティを追加する。

```js
export default class HogeState {
    constructor({isHidden}){
        this.isHidden = isHidden;
    }
}
```

そして、HogeButtonの親のcontainerで次のようにpropsとして渡す。

```jsx
<HogeButton hidden={hogeState.isHidden}/>
```

HogeButtonComponent内では、hiddenの値を見てrenderの処理を行う。
特別な理由がない場合は、メソッドを生やしてrender毎に動的に計算するよりかは、constructorで計算したものを定義しておいた方が負荷的に良さそう。
(stateはStoreGroupによってキャッシュされる)

### State#equals メソッド
StoreがUseCaseやRepositoryのイベントによってStateを生成し直した際に、内容に変更がないケースはありうる。
変更がないことを判断するためにState自身のプロパティと比較するequalsメソッドを用意し、Storeでそれを利用する。
