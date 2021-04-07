const PostMsgSchema = require('../model/postModel');
const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

function _uuid () {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

router.post('/postMessage', (req, res) => {
  console.log('request::', req.body)
  const { articleId, postUser, message } = req.body
  // try {
  // } catch (e) {
  //   console.log(e)
  // }
  const MessageModel = mongoose.model('articleMessage', PostMsgSchema)
  const newPostMessage = new MessageModel({
    articleId: articleId,
    postId: _uuid(),
    postUser: postUser,
    message: message,
    postTime: new Date().getTime()
  })
  newPostMessage.save(function (err) {
    if (err) {
      console.log('err:::', err);
      throw err
    }
    console.log('message saved')
    // res.status(200)
    res.send({ message: '成功' })
  })
})

router.get('/getArticleMessage/:aiticleId', (req, res) => {
  console.log(req.body)
})

module.exports = router;
