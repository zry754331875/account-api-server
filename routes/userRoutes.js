// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ログインAPI
router.post('/signup', userController.login);

// ユーザー情報取得API
router.get('/user/:user_id', userController.getUser);

// ユーザー情報更新API
router.patch('/user/:user_id', userController.updateUser);

// ユーザー削除API
router.post('/close', userController.deleteUser);

module.exports = router;
