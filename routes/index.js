var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/web', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.send(fs.readFileSync(path.join(__dirname, './web.html'), 'utf-8'));
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog');
  // res.render('index', {title: '首页'})
});

module.exports = router;
