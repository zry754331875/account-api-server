// models/user.js

// ユーザーデータ（メモリ内）
const users = new Map()

// 初期ユーザーデータ作成
function initUsers() {
  users.set('TaroYamada', {
    user_id: 'TaroYamada',
    password: 'PaSSwd4TY',
    nickname: 'たろー',
    comment: '僕は元気です',
  })
}

// ユーザー取得
function getUser(user_id) {
  return users.get(user_id)
}

// ユーザー更新
function updateUser(user_id, data) {
  const user = users.get(user_id)
  if (user) {
    users.set(user_id, { ...user, ...data })
    return true
  }
  return false
}

// ユーザー削除
function deleteUser(user_id) {
  return users.delete(user_id)
}

// ログイン認証
function login(user_id, password) {
  const user = users.get(user_id)
  return user && user.password === password
}

module.exports = {
  initUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
}
