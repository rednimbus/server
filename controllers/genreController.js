const Genre = require('../models/genre');
const Book = require('../models/book');

// 显示完整的书籍分类列表
exports.genre_list = (req, res) => {
    Genre.find({}).exec(function(err, genre_list) {
        res.render('genre_list', {title: '书籍种类', genre_list});
    })
};

// 为每位书籍分类显示详细信息的页面
exports.genre_detail = (req, res, next) => {
    Promise.all([
        Genre.findById(req.params.id),
        Book.find({'genre': req.params.id}),
    ]).then(list => {
        res.render('genre_detail', {title: '种类详情', genre: list[0], genre_books: list[1]});
    }).catch(err => next());
};

// 由 GET 显示创建书籍分类的表单
exports.genre_create_get = (req, res) => { res.send('未实现：书籍分类创建表单的 GET'); };

// 由 POST 处理书籍分类创建操作
exports.genre_create_post = (req, res) => { res.send('未实现：创建书籍分类的 POST'); };

// 由 GET 显示删除书籍分类的表单
exports.genre_delete_get = (req, res) => { res.send('未实现：书籍分类删除表单的 GET'); };

// 由 POST 处理书籍分类删除操作
exports.genre_delete_post = (req, res) => { res.send('未实现：删除书籍分类的 POST'); };

// 由 GET 显示更新书籍分类的表单
exports.genre_update_get = (req, res) => { res.send('未实现：书籍分类更新表单的 GET'); };

// 由 POST 处理书籍分类更新操作
exports.genre_update_post = (req, res) => { res.send('未实现：更新书籍分类的 POST'); };