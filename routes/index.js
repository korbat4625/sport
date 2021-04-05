var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/postMessage', (req, res) => {
  console.log('request::', req.body)
  // res.status(200)
  res.send({ message: '成功' })
})

module.exports = router;
