# ユーザー管理API (Node.js MVC構成)

このプロジェクトは、Node.js + Express を使った簡易ユーザー管理APIです。MVCアーキテクチャに基づいて構成されており、テスト用アカウントを用意しています。

## 構成 (MVC)

- Model: `models/user.js`
- View: （APIレスポンスを通じてJSONで提供）
- Controller: `controllers/userController.js`
- Entry Point: `index.js`

## テスト用アカウント

以下のアカウントはサーバー起動時に初期データとして登録されています。

| user_id     | password   | nickname | comment         |
|-------------|------------|----------|------------------|
| TaroYamada | PaSSwd4TY  | たろー   | 僕は元気です     |

## セットアップ方法

1. パッケージをインストール
```bash
npm install
```

2. サーバーを起動
```bash
node index.js
```

- デフォルトポート: `3000`
- `.env` に `PORT` を指定することで変更可能

## APIエンドポイント

### POST /api/login
- ログイン処理
```json
{
  "user_id": "TaroYamada",
  "password": "PaSSwd4TY"
}
```

### GET /api/user/:user_id
- ユーザー情報取得

### PATCH /api/user/:user_id
- ユーザー情報更新
```json
{
  "nickname": "新しい名前",
  "comment": "新しいコメント"
}
```

### POST /api/user/delete
- ユーザー削除
```json
{
  "user_id": "TaroYamada"
}
```

## TODO (今後の改善ポイント)

- [ ] パスワードをハッシュ化する
- [ ] ユーザーデータを永続化（DB接続）
- [ ] JWT認証の導入
- [ ] Swagger (OpenAPI) によるAPIドキュメント生成
- [ ] ユニットテスト・E2Eテスト追加
- [ ] 管理者権限・権限管理追加
