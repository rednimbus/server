
const Author = require('../models/author');
const Book = require('../models/book');

exports.author_list = function(req, res, next) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: '作者信息', author_list: list_authors });
    });
};
exports.author_detail = (req, res, next) => {
  Promise.all([
    Author.findById(req.params.id),
    Book.find({author: req.params.id}, 'title summary')
  ]).then(datas => {
    res.render('author_detail', {author: datas[0], author_books: datas[1]})
  }).catch(err => next());
}