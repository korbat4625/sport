const _uuid = require('custom-uuid');
const mongoose = require('mongoose');
const MessageModel = require('../model/postModel');
const express = require('express');
const router = express.Router();


const opt = {
  runValidators: true
}

function checkSensitive (message) {

}

// 文章下留言，點亮點滅
router.patch('/lightUp', async (req, res) => {
  const { articleId, lightUp } = req.body;
  let updateData = {};
  let findTheLightPersonAtPositive = -1;
  let findTheLightPersonAtNegative = -1;
  try {
    const foundPost = await MessageModel.findOne({ postId: articleId });
    if (foundPost.lightUp === undefined) {
      foundPost.lightUp.quantity = 0;
      foundPost.lightUp.quantity += lightUp;
      foundPost.lightUp.whoPositive = [];
      foundPost.lightUp.whoNegative = [];
    } else {
      // 找此人之前點過亮或滅
      findTheLightPersonAtPositive = foundPost.lightUp.whoPositive.findIndex(
        persons => persons === req.cookies.name
      );

      findTheLightPersonAtNegative = foundPost.lightUp.whoNegative.findIndex(
        persons => persons === req.cookies.name
      );

      // 點亮點滅邏輯
      if (findTheLightPersonAtPositive >= 0 && lightUp === 1) { // 之前點過正面且想點正面
        res.status(200);
        return res.send({
          status: 1,
          message: '成功',
          code: 'DO_NOTHING'
        });
      } else if (findTheLightPersonAtPositive >= 0 && lightUp === -1) { // 之前點過正面且想點負面
        foundPost.lightUp.whoPositive.splice(findTheLightPersonAtPositive, 1);
        foundPost.lightUp.whoNegative.push(req.cookies.name);
        foundPost.lightUp.quantityPositive--;
        foundPost.lightUp.quantityNegative++;
        foundPost.lightUp.cookieUserLight = 'ceasefire'
      } else if (findTheLightPersonAtNegative >= 0 && lightUp === -1) { // 之前點過負面且想點負面
        res.status(200);
        return res.send({
          status: 1,
          message: '成功',
          code: 'DO_NOTHING'
        });
      } else if (findTheLightPersonAtNegative >= 0 && lightUp === 1) { // 之前點過負面且想點正面
        foundPost.lightUp.whoNegative.splice(findTheLightPersonAtNegative, 1);
        foundPost.lightUp.whoPositive.push(req.cookies.name);
        foundPost.lightUp.quantityPositive++;
        foundPost.lightUp.quantityNegative--;
        foundPost.lightUp.cookieUserLight = 'fire'
      } else { // 什麼都沒點過
        if (lightUp === 1) {
          foundPost.lightUp.whoPositive.push(req.cookies.name);
          foundPost.lightUp.cookieUserLight = 'fire'
          foundPost.lightUp.quantityPositive++;
        }
        if (lightUp === -1) {
          foundPost.lightUp.whoNegative.push(req.cookies.name);
          foundPost.lightUp.cookieUserLight = 'ceasefire'
          foundPost.lightUp.quantityNegative--;
        }
      }
      updateData = foundPost.lightUp;
    }
    await MessageModel.updateOne({ postId: articleId }, { lightUp: updateData });
    res.status(200);
    return res.send({
      message: '更新成功',
      result: {}
    });
  } catch (err) {
    res.status(500);
    return res.send({
      message: '錯誤, ' + err.name,
      result: err
    });
  };
});

// router.get('getMessageLightLength/:postId', async (req, res) => {
//   const MessageModel = mongoose.model('articleMessage', PostMsgSchema);
//   const { postId } = req.params;
//   const foundData = MessageModel.findOne({ postId });
//   console.log()
// })

// 新增文章下留言
router.post('/postMessage', async (req, res) => {
  const { articleId, postUser, message } = req.body
  const newPostMessage = new MessageModel({
    articleId: articleId,
    postId: _uuid(),
    postUser: postUser,
    message: message,
    postTime: new Date().getTime()
  })
  try {
    await newPostMessage.save(opt)
    res.status(200)
    res.send({ message: '成功' })
  } catch (err) {
    res.status(500)
    res.send({
      message: '失敗, ' + err.name,
      result: err
    })
  }
})

// 取得文章下留言
router.get('/getArticleMessage/:articleId', async (req, res) => {
  const { articleId } = req.params
  const foundPost = await MessageModel.find({ articleId })
  res.send(foundPost)
})

module.exports = router;
