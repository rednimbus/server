const BookInstance = require('../models/bookinstance');

// 显示完整的书籍副本列表
exports.bookinstance_list = (req, res) => {
    BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
};

exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id).populate('book').then(data => {
      res.render('bookinstance_detail', {bookinstance: data});
    }).catch(err => next());
}