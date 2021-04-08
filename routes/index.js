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
    res.status(200)
    res.send({ message: '成功' })
  })
})

router.get('/getArticleMessage/:articleId', async (req, res) => {
  const MessageModel = mongoose.model('articleMessage', PostMsgSchema)
  const { articleId } = req.params
  console.log(articleId, typeof articleId, req.params)
  const data = await MessageModel.find({ articleId })

  console.log('data::', data)
  res.send(data)
})

module.exports = router;
