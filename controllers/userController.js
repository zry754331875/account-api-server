// controllers/userController.js
const userModel = require('../models/user');

// ログイン処理
function login(req, res) {
  const { user_id, password } = req.body;
  if (!user_id || !password) {
    return res.status(400).json({ message: 'user_idとpasswordは必須です' });
  }
  const success = userModel.login(user_id, password);
  if (success) {
    return res.json({ message: 'ログイン成功' });
  } else {
    return res.status(401).json({ message: 'ログイン失敗' });
  }
}

// ユーザー情報取得
function getUser(req, res) {
  const { user_id } = req.params;
  const user = userModel.getUser(user_id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: 'ユーザーが見つかりません' });
  }
}

// ユーザー情報更新
function updateUser(req, res) {
  const { user_id } = req.params;
  const { nickname, comment } = req.body;
  const success = userModel.updateUser(user_id, { nickname, comment });
  if (success) {
    return res.json({ message: '更新成功' });
  } else {
    return res.status(404).json({ message: 'ユーザーが見つかりません' });
  }
}

// ユーザー削除
function deleteUser(req, res) {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: 'user_idは必須です' });
  }
  const success = userModel.deleteUser(user_id);
  if (success) {
    return res.json({ message: '削除成功' });
  } else {
    return res.status(404).json({ message: 'ユーザーが見つかりません' });
  }
}

module.exports = {
  login,
  getUser,
  updateUser,
  deleteUser,
};
