# データの流れ
## 概略図

- [ ] 図

## アプリの初期化フロー

以下は大まかなAppの 初期化から表示の更新 におけるフローです。

1. Mount
1. Initialize domain
1. Routing
1. Update State 
1. Update View

これ以降は、[use-case](./use-case.md)を使い、[domain](./domain.md)や[store](./store.md)を更新する。
AppContainerはstoreの変更を監視しているため、stateが変更される度にViewを更新するのが基本的な表示の更新フローです。

## 更新のパターン
### 永続化するパターン
View -> UseCase -> Domain -> Repository -> State -> View -> ...

### Stateを直接更新するパターン
View -> UseCase -> State -> View -> ...

Stateのみに存在する情報を更新したいときに、`dispatch`による更新を行う。
## 各クラスの概要
### View(Component)
ユーザーアクションやポーリングなどにより UseCase を生成し実行する。  
UseCase 実行時に必要なデータを渡す。

Component内にも役割の階層があるため、詳細は[Component](./component.md)を参照。

### UseCase
受け取ったデータを用いて、entity の生成、変更を行い、結果を Repository に保存する。  
もしくは、受け取ったデータを必要に応じて加工し、State へ向けたイベントを発する。

### Domain
生成されたり、変更される対象。  
扱われるデータのひとつなので、Domain が他クラスにデータを渡すことはない。

### Repository
永続化周りの処理を担当。  
データの保存が行われた際に、State へ向けたイベントを発する。

### State
生成されたり、変更される対象。  
View を意識したデータを持ち、UseCase のイベントの処理を行う。

### Store
UseCase と Repository のイベントを監視し、State の生成、変更を行う。  
State の更新がある場合は、View に向けたイベントを発する。


# 実装フロー例

## ボタンを追加したい
※ この順で実装すべきというものではなく、あくまで参考です。

### Component の用意

- component/project 下に HogeButton.js を追加する。  
- component/container 下から、HogeButton を利用したい container を選び、HogeButton 利用する。  

詳細は [ComponentのREADME](./component.md) を参照して下さい。

### UseCase の追加や利用
既に HogeButton を利用した際の UseCase がある場合は、container 内で HogeButton のハンドラを定義し、HogeButton へ渡す。
※ project 下では UseCase に依存させないため、container でハンドラを定義する。

UseCase がない場合は新規に作成し、それを利用する。
(詳細は [UseCase の README](./use-case.md) を参照して下さい。)

### Domain の関数/プロパティの追加や変更
既存の関数で要件が満たせない場合は、関数の追加や変更を行う。  
また、新規プロパティが必要な場合は追加を行う。
(詳細は [Domain の README](./domain.md) を参照して下さい。)

### State の変更
Domain の変更により、Component にも新たに情報を渡す必要がある場合は、対応する State のプロパティを追加したり、getter 関数を修正したりする。
(詳細は [State の README](./store.md) を参照して下さい。)

### Component の変更
State の変更により、表示内容に変更がある場合は、props の追加や、処理の変更を行う。
