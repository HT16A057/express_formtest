var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
    // __dirnameを表示
    dirname: __dirname
  });
});

// postリクエスト
router.post('/', (req, res) => {
  let a = req.body.user_name;
  console.log(a);
})

console.log('clicked');

module.exports = router;
