# Infra

インフラストラクチャの層。

DBや外部APIなどのやり取りを実装したものを置く。

- Repositoryの実装
- 各種APIクライアント
- Loggerの実装

ドメインはInfraに直接依存はせずに、外から受け取る形にする。

## Repository

Repositoryはデータをコレクションのように扱えるインターフェイスをもつ。

## 永続的なもの

Socket APIのように永続化する必要があるクライアントなどが該当する。
初期化する[use-case](./use-case.md)においてインスタンス化し、
ライフサイクルが一致する[domain](domain.md)の初期化時に渡す。