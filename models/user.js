/**
 * モデル: ユーザーデータを管理するモデル
 */
class UserModel {
  constructor() {
    this.users = new Map() // ユーザーデータを保存するためのMapオブジェクト
  }

  /**
   * ユーザーを作成する
   * @param {string} userId - ユーザーID
   * @param {string} password - パスワード
   * @param {string} nickname - ニックネーム（省略可）
   * @param {string} comment - コメント（省略可）
   * @returns {Object} - 作成されたユーザー情報
   */
  createUser(userId, password, nickname = userId, comment = '') {
    // ユーザーIDが既に存在するか確認
    if (this.users.has(userId)) {
      return {
        error: true,
        code: 400,
        message: 'Account creation failed',
        cause: 'already same user_id is used',
      }
    }

    // IDとパスワードのバリデーション
    if (!this.validateUserId(userId) || !this.validatePassword(password)) {
      return {
        error: true,
        code: 400,
        message: 'Account creation failed',
        cause: 'required user_id and password',
      }
    }

    // ユーザー情報の作成
    const user = {
      user_id: userId,
      password: password,
      nickname: nickname,
      comment: comment,
    }

    // ユーザー情報の保存
    this.users.set(userId, user)

    return {
      error: false,
      code: 200,
      message: 'Account successfully created',
      user: {
        user_id: userId,
        nickname: nickname,
      },
    }
  }

  /**
   * ユーザーの情報を取得する
   * @param {string} userId - ユーザーID
   * @param {string} password - パスワード
   * @returns {Object} - ユーザー情報
   */
  getUser(userId, password) {
    // ユーザーが存在するか確認
    if (!this.users.has(userId)) {
      return { error: true, code: 404, message: 'No User found' }
    }

    const user = this.users.get(userId)

    // パスワード認証
    if (user.password !== password) {
      return { error: true, code: 401, message: 'Authentication Failed' }
    }

    return {
      error: false,
      code: 200,
      message: 'User details by user_id',
      user: {
        user_id: user.user_id,
        nickname: user.nickname,
        comment: user.comment,
      },
    }
  }

  /**
   * ユーザー情報を更新する
   * @param {string} userId - ユーザーID
   * @param {string} password - パスワード
   * @param {string} nickname - 更新するニックネーム
   * @param {string} comment - 更新するコメント
   * @returns {Object} - 更新結果
   */
  updateUser(userId, password, nickname, comment) {
    // ユーザーが存在するか確認
    if (!this.users.has(userId)) {
      return { error: true, code: 404, message: 'No User found' }
    }

    const user = this.users.get(userId)

    // パスワード認証
    if (user.password !== password) {
      return { error: true, code: 401, message: 'Authentication Failed' }
    }

    // user_idとpasswordは更新不可
    if (user.user_id !== userId || user.password !== password) {
      return {
        error: true,
        code: 400,
        message: 'User updation failed',
        cause: 'not updatable user_id and password',
      }
    }

    // nicknameとcommentの少なくとも一方が必要
    if (nickname === undefined && comment === undefined) {
      return {
        error: true,
        code: 400,
        message: 'User updation failed',
        cause: 'required nickname or comment',
      }
    }

    // ユーザー情報の更新
    if (nickname !== undefined) {
      user.nickname = nickname
    }
    if (comment !== undefined) {
      user.comment = comment
    }

    // 更新したユーザー情報の保存
    this.users.set(userId, user)

    return {
      error: false,
      code: 200,
      message: 'User successfully updated',
      recipe: {
        nickname: user.nickname,
        comment: user.comment,
      },
    }
  }

  /**
   * ユーザーアカウントを削除する
   * @param {string} userId - ユーザーID
   * @param {string} password - パスワード
   * @returns {Object} - 削除結果
   */
  deleteUser(userId, password) {
    // ユーザーが存在するか確認
    if (!this.users.has(userId)) {
      return { error: true, code: 404, message: 'No User found' }
    }

    const user = this.users.get(userId)

    // パスワード認証
    if (user.password !== password) {
      return { error: true, code: 401, message: 'Authentication Failed' }
    }

    // ユーザーの削除
    this.users.delete(userId)

    return {
      error: false,
      code: 200,
      message: 'Account and user successfully removed',
    }
  }

  /**
   * ユーザーIDのバリデーション
   * @param {string} userId - ユーザーID
   * @returns {boolean} - バリデーション結果
   */
  validateUserId(userId) {
    // 必須、6文字以上20文字以内、半角英数字
    return (
      userId &&
      typeof userId === 'string' &&
      userId.length >= 6 &&
      userId.length <= 20 &&
      /^[a-zA-Z0-9]+$/.test(userId)
    )
  }

  /**
   * パスワードのバリデーション
   * @param {string} password - パスワード
   * @returns {boolean} - バリデーション結果
   */
  validatePassword(password) {
    // 必須、8文字以上20文字以内、半角英数字記号（空白と制御コードを除くASCII文字）
    return (
      password &&
      typeof password === 'string' &&
      password.length >= 8 &&
      password.length <= 20 &&
      /^[\x21-\x7E]+$/.test(password)
    )
  }
}

module.exports = UserModel