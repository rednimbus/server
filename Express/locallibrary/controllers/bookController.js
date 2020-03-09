const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

// 首页
exports.index = function(req, res) {
    async.parallel({
        book_count: function(callback) {
            Book.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.count({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.count({status:'可供借阅'}, callback);
        },
        author_count: function(callback) {
            Author.count({}, callback);
        },
        genre_count: function(callback) {
            Genre.count({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: '本地图书馆首页', error: err, data: results });
    });
};

// 显示完整的书籍列表
exports.book_list = (req, res, next) => {
    Book.find({}, 'title author')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('book_list', { title: '书籍列表', book_list: list_books });
    });
};

// 书籍详情
exports.book_detail = (req, res, next) => {
    const baseRes = {title: '书名'};
    Promise.all([
        Book.findById(req.params.id).populate('author').populate('genre'),
        BookInstance.find({book: req.params.id})
    ]).then(datas => {
        baseRes.book = datas[0];
        baseRes.book_instances = datas[1];
        res.render('book_detail', baseRes);
    }).catch(err => next());
};
