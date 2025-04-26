// index.js
const express = require('express');
const UserController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// コントローラーのインスタンス作成
const userController = new UserController();

// ルーティングの設定
app.post('/signup', (req, res) => userController.signup(req, res));
app.get('/users/:user_id', (req, res) => userController.getUser(req, res));
app.patch('/users/:user_id', (req, res) => userController.updateUser(req, res));
app.post('/close', (req, res) => userController.deleteUser(req, res));

app.listen(PORT, () => {
  console.log(`✅ サーバー起動完了: http://localhost:${PORT}`);
});
