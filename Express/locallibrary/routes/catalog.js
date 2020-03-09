const express = require('express');
const router = express.Router();

// 导入控制器模块
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');

/// 藏书路由 ///

// GET 获取藏书编目主页
router.get('/', book_controller.index);

// GET 请求完整藏书列表
router.get('/book', (req, res) => res.redirect('./books'));
router.get('/books', book_controller.book_list);

// GET 藏书副本
router.get('/bookinstances', book_instance_controller.bookinstance_list);

// GET 作者列表
router.get('/author', (req, res) => res.redirect('./authors'));
router.get('/authors', author_controller.author_list);

// GET 书籍种类
router.get('/genre', (req, res) => res.redirect('./genres'));
router.get('/genres', genre_controller.genre_list);
/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///

module.exports = router;