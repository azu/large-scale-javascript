# Store

## 役割
`State` を内包し、その参照を提供する。  
Repository の変更イベントに対する処理を持つ。  
UseCase のイベントを State につなぐ。

# State

## 役割
Domain の情報を、Component が利用しやすい形に変換する。  
UseCase のイベントに対する処理を持つ。

## 原則

- Domain の entity が入れ子になっている場合などは、entity をそのまま利用してもよいし、Component 用に変換が必要な場合は、単純なオブジェクトや、変換用のクラスを用意してもよい。
- 理由としては、変更がある度に新規インスタンスを返す仕組みとイベント周りのつなぎ込みが複雑になりそうなためと、Domain の情報から State は作れるはずなため。

## 作り方
### 命名規則
```
名詞(entity 名) + State
```
entity と対応している場合はその entity 名が入る

### ディレクトリの切り方
State の入れ子は作らないため、基本的には store/ 直下に entity 名でディレクトリを切り、  
その下に`HogeStore.js`、`HogeStae.js`を配置する。  
Component を意識した形になるので、大きくなりすぎず、逆に細かく分けすぎて情報のかぶりがあまりでないように State を分ける。

### Component を意識したプロパティの作成
例えば Component の HogeButton を非表示にしたい場合  

Containerに渡すHogeStateに`isHidden`のようなプロパティを追加する

```js
export default class HogeState {
    constructor({isHidden}){
        this.isHidden = isHidden;
    }
}
```

そして、HogeButton の親の container で以下のようにpropsとして渡す。

```jsx
<HogeButton hidden={hogeState.isHidden}/>
```

HogeButtonComponent内では、hidden の値を見て render メソッド内で null を返したり、className に state 情報として出力し、css から非表示にしたりなどする。
特別な理由がない場合は、メソッドを生やして render 毎に動的に計算するよりかは、constructor で計算したものを定義しておいた方が負荷的に良さそう。
(stateはStoreGroupによってキャッシュされる)

### State#equals メソッド
Store が UseCase や Repository のイベントによって State を生成し直した際に、内容に変更がないケースはありうる。変更がないことを判断するために State に自身のプロパティと比較する equals メソッドを用意し、Store でそれを利用する。
