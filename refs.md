# 参考資料

並び順は適当だけど、後ろに行くほど少し分野違いや読むのが難しい系統。

## [How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html "How to work as a Team")

チームで複雑なJavaScript/Reactアプリを作る前の設計の話。
アーキテクチャに悩んでいる間も実装はコンポーネント思考であるなら並行して進めやすいという話。

## [Almin.js | JavaScriptアーキテクチャ](http://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html "Almin.js | JavaScriptアーキテクチャ")

[Almin.js](https://github.com/almin/almin "Almin.js")は作りながら設計したという話。

## [.NETのエンタープライズアプリケーションアーキテクチャ　第2版　～.NETを例にしたアプリケーション設計原則](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版　～.NETを例にしたアプリケーション設計原則")

DDD本の中では一番読みやすくためになることが多い。
アーキテクトの話なども参考になる。
またDDDの文脈で出てくるモデルやリポジトリなどは、人によって言ってることが違うという事実をちゃんと注記してくれている。
CQRSについてはこの本を読むとよい。

## [Patterns, Principles, and Practices of Domain-Driven Design - Wrox](http://www.wrox.com/WileyCDA/WroxTitle/Patterns-Principles-and-Practices-of-Domain-Driven-Design.productCd-1118714709.html "Patterns, Principles, and Practices of Domain-Driven Design - Wrox")

DDDについて分かりやすく書かれてる書籍。
DDD本/IDDD本が分かりにくいところを分かりやすく書こうとした感じのする内容。
DDDに興味がある人は読むとよい感じな気がする。

## [オブジェクト開発の神髄](http://bpstore.nikkeibp.co.jp/item/books/P82370.html "オブジェクト開発の神髄")

ユースケースという言葉や役割についてはこの本の影響を受けている。
DDDはオブジェクト指向の発展形のように見える。

## [CQRSの小さな演習(1) 現実の問題 - 考える場所](http://blog.fukuchiharuki.me/entry/2016/02/20/173233 "CQRSの小さな演習(1) 現実の問題 - 考える場所")

> CQRSはイベントソーシングが必須ではない。CQRSっぽい実装はすぐにでも初められる。
> Repositoryを介さないで、直接DAOから、Read Modelを構築してそのまま返すのもあり

CQRSの小さな実装例。


## [GUIアーキテクチャパターンの基礎からMVVMパターンへ](https://www.slideboom.com/presentations/591514/GUI%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3 "GUIアーキテクチャパターンの基礎からMVVMパターンへ")

MVVMにおけるViewModelについて
Store/StateはViewModelとかなり近いものになっていくのではという文脈で調べていた。

## [20151110 ドメイン駆動設計によるサービス開発](http://www.slideshare.net/maoohnishi3/20151110-54980095 "20151110 ドメイン駆動設計によるサービス開発")


- [6809.pdf](http://www.unisys.co.jp/tec_info/tr68/6809.pdf "6809.pdf")

## [Developers Summit 2014 「Play2/Scalaでドメイン駆動設計を利用した大規模Webアプリケーションのスクラム…](http://www.slideshare.net/sifue/developers-summit-2014-play2scalaweb "Developers Summit 2014 「Play2/Scalaでドメイン駆動設計を利用した大規模Webアプリケーションのスクラム…")

## [Defining data stores | MobX](http://mobxjs.github.io/mobx/best/store.html "Defining data stores | MobX")

ViewのためのStoreとDomainのためのStoreという考え方について。

## [クリーンアーキテクチャ(The Clean Architecture翻訳)](http://blog.tai2.net/the_clean_architecture.html "クリーンアーキテクチャ(The Clean Architecture翻訳)")

クリーンアーキテクチャの訳。

## [持続可能な開発を目指す ~ ドメイン・ユースケース駆動（クリーンアーキテクチャ） + 単方向に制限した処理 + FRP - Qiita](http://qiita.com/kondei/items/41c28674c1bfd4156186 "持続可能な開発を目指す ~ ドメイン・ユースケース駆動（クリーンアーキテクチャ） + 単方向に制限した処理 + FRP - Qiita")

データの流れについて確認するときに見てた。

## [DDD + Clean Architecture + UCDOM Essence版 // Speaker Deck](https://speakerdeck.com/yoskhdia/ddd-plus-clean-architecture-plus-ucdom-essenceban "DDD + Clean Architecture + UCDOM Essence版 // Speaker Deck")

クリーンアーキテクチャを目指そうとして、Input/Outputのところをどうしようと悩んでいるときに見ていた気がする。

## [Scalaで学ぶヘキサゴナルアーキテクチャ実践入門 // Speaker Deck](https://speakerdeck.com/kimutyam/scaladexue-buhekisagonaruakitekutiyashi-jian-ru-men "Scalaで学ぶヘキサゴナルアーキテクチャ実践入門 // Speaker Deck")

依存関係逆転の原則(DIP)について分かりやすい解説。

## [ECSS: Home Page](http://ecss.io/ "ECSS: Home Page")

CSSは賢く書かないという影響を受けた。
そのためCSSは最低限の拡張をPostCSSでやるようにしてる。

## [states on descendents · Issue #96 · suitcss/suit](https://github.com/suitcss/suit/issues/96 "states on descendents · Issue #96 · suitcss/suit")

CSSのstateの考え方について参考にした。
[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")のルールはしばらく使ってるけど、一番シンプルでReactと相性がいいと思ってる。
コンポーネント志向である場合に相性がいいルールを持ってる。

`.is-state`をファイルとして切り出すのはオリジナルルール。
とにかくCSSはステートを増やしたくないため、常に一覧できるようにするためのルールとして入れた。
`will-change`などでステートを切り替わることを明示できるので、ファイルとして切り出されてるのと意味論的によい感じになった。

## [僕がネイティブな CSS 変数にわくわくする理由](http://terkel.github.io/why-im-excited-about-native-css-variables/ "僕がネイティブな CSS 変数にわくわくする理由")

コンポーネント志向でCSSを書いた場合に、親から子へ影響を出したいという場合にどうするかを考えていた。
コンポーネントでコンポーネントとして外から触れるものを変数として定義して、外からそれを定義し直すことでできそうという話。
現実的にはネイティブなCSS変数じゃないとスコープが実現できないので現時点では諦めていた。

## [Atomic Designの考え方と利点・欠点 - I'm kubosho_](http://blog.kubosho.com/entry/using-atomic-design "Atomic Designの考え方と利点・欠点 - I&#39;m kubosho_")

Atomic DesignをやるとCSSの詳細度が一定になるという話。
[SUIT CSS](http://suitcss.github.io/ "SUIT CSS")とは異なるルールだけど、コンポーネントを考えると大体そうなる。

## [Clean Architecture + DDD + Redux + RxJavaをAndroidでやるときにどこまで分割するか問題](http://izumin.hateblo.jp/entry/2016/01/24/221943)
> [#DroidKaigi 2016で登壇してきた](http://izumin.hateblo.jp/entry/2016/02/21/170909)

Androidでの話。

## [[ Android ] – これからの「設計」の話をしよう – NET BIZ DIV. TECH BLOG](https://tech.recruit-mp.co.jp/mobile/android-architecture/ "[ Android ] – これからの「設計」の話をしよう – NET BIZ DIV. TECH BLOG")

こちらもAndroidの話。

## [いまさらきけない「ドメインモデル」と「トランザクションスクリプト」](http://d.hatena.ne.jp/higayasuo/20080519/1211183826 "いまさらきけない「ドメインモデル」と「トランザクションスクリプト」")

トランザクションスクリプトとドメインモデルについて。

## [DDD: ImmutableなEntityの実装方法〜ステートソーシングなEntityとイベントソーシングなEntity〜 - Qiita](http://qiita.com/suin/items/f559e3dcde7c811ed4e1 "DDD: ImmutableなEntityの実装方法〜ステートソーシングなEntityとイベントソーシングなEntity〜 - Qiita")

ステートソーシングとイベントソーシングについて。
イベントソーシングはまだ上手くやれるイメージがなかったのでステートソーシングで考えている。

## [My thought about beyond flux](http://www.slideshare.net/saneyuki/my-thoughy-about-beyond-flux "My thought about beyond flux")
> [karen-irc/karen: This is the forked project from https://github.com/erming/shout](https://github.com/karen-irc/karen "karen-irc/karen: This is the forked project from https://github.com/erming/shout")

レイヤードアーキテクチャについて。
[Drivers › Cycle.js](http://cycle.js.org/drivers.html "Drivers › Cycle.js")も見るといいかもしれない。


## [最新DDDアーキテクチャとAkkaでの実装ヒントについて // Speaker Deck](https://speakerdeck.com/j5ik2o/zui-xin-dddakitekutiyatoakkadefalseshi-zhuang-hintonituite "最新DDDアーキテクチャとAkkaでの実装ヒントについて // Speaker Deck")

CQRS + ESの話として。

## [20110409_DevLOVE「Building Blocks」_都元ダイスケさん - YouTube](https://www.youtube.com/watch?v=FNEfk-dlIKU "20110409_DevLOVE「Building Blocks」_都元ダイスケさん - YouTube")

DDDはパターン集であるという話。


## [実践ドメイン駆動設計](http://www.shoeisha.co.jp/book/detail/9784798131610 "実践ドメイン駆動設計")

いわゆるIDDD本。

DDD、CQRS、ES。

## [エリック・エヴァンスのドメイン駆動設計](http://www.shoeisha.co.jp/book/detail/9784798121963 "エリック・エヴァンスのドメイン駆動設計")

いわゆるDDD本。

## [エンタープライズアプリケーションアーキテクチャパターン](http://www.shoeisha.co.jp/book/detail/9784798105536 "エンタープライズアプリケーションアーキテクチャパターン")

POEAA。
DDD本の後に読んだけど、DDDはやっぱりこの辺とベースとなる部分は同じ所が多いという感じになった。

## [今日からはじめる情報設計](https://www.amazon.co.jp/dp/4802510012/ "今日からはじめる情報設計")

情報設計(IA)についてかなり分かりやすい本。

構造化の考え方として分類法は次の2つになるという話。

- 並列的構造
- 階層的構造

これは、まさにドメインでは階層的になっていき、Store/Stateでは並列的にするという構造化がおきた。
このIAという分野もパターン・ランゲージから来ていると感じる部分があった。

## [情報アーキテクチャについて | IAAJ: Information Architecture Association Japan](http://iaaj.org/about_ia/ "情報アーキテクチャについて | IAAJ: Information Architecture Association Japan")

IAという言葉もやはり変化していると思って探して見つけた記憶。

## [企業情報システムアーキテクチャ](https://www.amazon.co.jp/dp/B00N0SRXBI/ "企業情報システムアーキテクチャ")

企業システムのアーキテクチャの話として見た。

## [パターン・ランゲージ: 創造的な未来をつくるための言語](https://www.amazon.co.jp/dp/4766419871/ "パターン・ランゲージ: 創造的な未来をつくるための言語")

今ある色々なアーキテクチャの源流的なものを巡っていて、[パタン・ランゲージ―環境設計の手引](https://www.amazon.co.jp/dp/4306041719/ "パタン・ランゲージ―環境設計の手引")を探しているときに見た。

DDDもパターン集であるため、この源流はやはりこの辺にあるのではと思って調べていた。
IAの話もそうだけど、構造化の考え方などは都市構造の考えの話とも一致している感じがする。

> 「何を」作るのかを支援するというもの、抽象的な形で提供される  
> パターンはデザインを支援する。良いデザインは問題を解決する  
> パターンランゲージは言葉で形を表すので、それは誰に取っても同じ形にならないとおかしい  
> 真偽値を科学的なものじゃない、コードとかにも「良い悪い」という適用したのがパターンの面白いところ  

via [http://twilog.org/azu_re/date-160519](http://twilog.org/azu_re/date-160519)

## [アルゴリズミック・デザインの現在](http://www.ieice.org/cs/csbn/program/papers/080516_waseda.pdf "untitled - 080516_waseda.pdf")

パターン・ランゲージのアレグザンダーは1970年代にはコンピュータによるデザイン設計を試みてたという話があった。
建築的にはアルゴリズミック・デザインの源流となる考え方で、それを調べてた。
また1970年代ではまだコンピュータの性能などもあって諦めた部分があって、それの代わりにパターンの流れがあった。

## [Patterns For Large-Scale JavaScript Application Architecture](https://addyosmani.com/largescalejavascript/)
> [Large-scale JavaScript Application Architecture // Speaker Deck](https://speakerdeck.com/addyosmani/large-scale-javascript-application-architecture)

このリポジトリのタイトルの元ネタ。

## amebafresh.tv

公開初期はSourceMapによるソースコードが読めたので参考になった。
[コンポーネント](./docs/component.md)の`project/`ディレクトリの元ネタ。
