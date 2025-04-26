const UserModel = require('../models/user')

/**
 * コントローラー: リクエストを処理しレスポンスを返す
 */
class UserController {
  constructor() {
    this.userModel = new UserModel()
  }

  /**
   * Basic認証のヘッダーからユーザーIDとパスワードを抽出する
   * @param {string} authHeader - Authorization ヘッダー
   * @returns {Object} - ユーザーIDとパスワード
   */
  extractCredentials(authHeader) {
    // Authorization ヘッダーが存在するか確認
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return null
    }

    try {
      // Basic認証の値をデコード
      const base64Credentials = authHeader.split(' ')[1]
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8')
      const [userId, password] = credentials.split(':')

      return { userId, password }
    } catch (error) {
      return null
    }
  }

  /**
   * ユーザーアカウント作成のリクエストを処理する
   * @param {Object} req - リクエストオブジェクト
   * @param {Object} res - レスポンスオブジェクト
   */
  signup(req, res) {
    const { user_id, password, nickname, comment } = req.body

    const result = this.userModel.createUser(user_id, password, nickname, comment)

    res.status(result.code).json({
      message: result.message,
      ...(result.cause ? { cause: result.cause } : {}),
      ...(result.user ? { user: result.user } : {}),
    })
  }

  /**
   * ユーザー情報取得のリクエストを処理する
   * @param {Object} req - リクエストオブジェクト
   * @param {Object} res - レスポンスオブジェクト
   */
  getUser(req, res) {
    const authHeader = req.headers.authorization
    const credentials = this.extractCredentials(authHeader)

    if (!credentials) {
      return res.status(401).json({ message: 'Authentication Failed' })
    }

    const { userId, password } = credentials
    const requestedUserId = req.params.user_id

    // 認証されたユーザーIDとリクエストされたユーザーIDが一致するか確認
    if (userId !== requestedUserId) {
      return res.status(403).json({ message: 'No Permission for Update' })
    }

    const result = this.userModel.getUser(userId, password)

    res.status(result.code).json({
      message: result.message,
      ...(result.user ? { user: result.user } : {}),
    })
  }

  /**
   * ユーザー情報更新のリクエストを処理する
   * @param {Object} req - リクエストオブジェクト
   * @param {Object} res - レスポンスオブジェクト
   */
  updateUser(req, res) {
    const authHeader = req.headers.authorization
    const credentials = this.extractCredentials(authHeader)

    if (!credentials) {
      return res.status(401).json({ message: 'Authentication Failed' })
    }

    const { userId, password } = credentials
    const requestedUserId = req.params.user_id
    const { nickname, comment } = req.body

    // 認証されたユーザーIDとリクエストされたユーザーIDが一致するか確認
    if (userId !== requestedUserId) {
      return res.status(403).json({ message: 'No Permission for Update' })
    }

    const result = this.userModel.updateUser(userId, password, nickname, comment)

    res.status(result.code).json({
      message: result.message,
      ...(result.cause ? { cause: result.cause } : {}),
      ...(result.recipe ? { recipe: result.recipe } : {}),
    })
  }

  /**
   * ユーザーアカウント削除のリクエストを処理する
   * @param {Object} req - リクエストオブジェクト
   * @param {Object} res - レスポンスオブジェクト
   */
  deleteUser(req, res) {
    const authHeader = req.headers.authorization
    const credentials = this.extractCredentials(authHeader)

    if (!credentials) {
      return res.status(401).json({ message: 'Authentication Failed' })
    }

    const { userId, password } = credentials

    const result = this.userModel.deleteUser(userId, password)

    res.status(result.code).json({
      message: result.message,
    })
  }
}

module.exports = UserController;