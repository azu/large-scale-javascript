# Infra

インフラストラクチャの層。

DBや外部APIなどのやり取りを実装したものを置く

- Repositoryの実装
- 各種APIクライアント
- Loggerの実装

ドメインはInfraに直接依存はせずに、外から受け取る形にする。

## Repository

Repositoryはデータをコレクションのように扱えるインターフェイスを持つ。

## 永続的なもの

Socket APIのように永続化する必要があるクライアントは、
初期化する[use-case](./use-case.md)においてインスタンス化し、
ライフサイクルが一致する[domain](domain.md)のプロパティとして持つようにする。