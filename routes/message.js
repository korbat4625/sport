const _uuid = require('custom-uuid');
const mongoose = require('mongoose');
const MessageModel = require('../model/postModel');
const articleModel = require('../model/articleModel')
const express = require('express');
const router = express.Router();


const opt = {
  runValidators: true
}

function checkSensitive (message) {

}

// 文章下留言，點亮點滅
router.patch('/lightUp', async (req, res) => {
  const { postId, lightUp } = req.body;
  const theMessageLightUp = await MessageModel.findOne({ postId });

  console.log('要被更新的文章:', theMessageLightUp);
  console.log('更新的人:', req.cookies.sportUUD);
  console.log('lightUp:', lightUp);
  // 0 表示此人之前沒有對此留言表示過好壞
  if (theMessageLightUp.lightUp.cookieUserLight.length === 0) {
    if (lightUp === 1) {
      console.log('表示此人之前沒有對此留言表示過好壞，想點好')
      theMessageLightUp.lightUp.quantityPositive += 1;
      theMessageLightUp.lightUp.cookieUserLight = 'fire';
      theMessageLightUp.lightUp.whoPositive.push(req.cookies.sportUUD);
    }
    if (lightUp === -1) {
      console.log('表示此人之前沒有對此留言表示過好壞，想點壞')
      theMessageLightUp.lightUp.quantityNegative += 1;
      theMessageLightUp.lightUp.cookieUserLight = 'ceasefire';
      theMessageLightUp.lightUp.whoNegative.push(req.cookies.sportUUD);
    }
  } else {
    // 此人之前點過正面，又想點正面
    if (theMessageLightUp.lightUp.cookieUserLight === 'fire' && lightUp === 1) {
      console.log('此人之前點過正面，又想點正面')
      return res.send('Do nothing');
    } else if (theMessageLightUp.lightUp.cookieUserLight === 'fire' && lightUp === -1) {
      // 此人之前點過正面，又想點負面，從正面陣列刪除，加入反面陣列
      console.log('此人之前點過正面，又想點負面，從正面陣列刪除，加入反面陣列', theMessageLightUp.lightUp.whoNegative.indexOf(req.cookies.sportUUD));
      if (theMessageLightUp.lightUp.whoNegative.indexOf(req.cookies.sportUUD) === -1) {
        theMessageLightUp.lightUp.whoNegative.push(req.cookies.sportUUD)
      }
      theMessageLightUp.lightUp.whoPositive.splice(theMessageLightUp.lightUp.whoPositive.indexOf(req.cookies.sportUUD), 1);
      theMessageLightUp.lightUp.cookieUserLight = 'ceasefire'
      theMessageLightUp.lightUp.quantityNegative += 1
      theMessageLightUp.lightUp.quantityPositive -= 1
    } else if (theMessageLightUp.lightUp.cookieUserLight === 'ceasefire' && lightUp === -1) {
      // 此人之前點過負面，又想點負面
      console.log('此人之前點過負面，又想點負面')
      return res.send('Do nothing');
    } else if (theMessageLightUp.lightUp.cookieUserLight === 'ceasefire' && lightUp === 1) {
      // 此人之前點過負面，又想點正面，從負面陣列刪除，加入正面陣列
      console.log('此人之前點過負面，又想點正面，從負面陣列刪除，加入正面陣列')
      if (theMessageLightUp.lightUp.whoPositive.indexOf(req.cookies.sportUUD) === -1) {
        theMessageLightUp.lightUp.whoPositive.push(req.cookies.sportUUD)
      }
      theMessageLightUp.lightUp.whoNegative.splice(theMessageLightUp.lightUp.whoPositive.indexOf(req.cookies.sportUUD), 1);
      theMessageLightUp.lightUp.cookieUserLight = 'fire'
      theMessageLightUp.lightUp.quantityNegative -= 1
      theMessageLightUp.lightUp.quantityPositive += 1
    }
  }

  console.log('準備更新的資料', theMessageLightUp)

  // res.end()
  try {
    await MessageModel.updateOne({ postId }, { lightUp: theMessageLightUp.lightUp });
    res.status(200);
    return res.send({
      message: '更新成功',
      result: {}
    });
  } catch (err) {
    console.error(err)
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

router.post('/postArticle', async (req, res) => {
  const { outsideTitle, topLink, title, author, lastUpdate, firstCreate, firstTimeStamp,
    lastUpdatTimeStampe, imgSrc, outsideImgSrc, tags, content, sideLinks, outSideFooterText,
    outSideFooterTime } = req.body
  try {
    await new articleModel({
      articleId: _uuid(),
      outsideTitle,
      topLink,
      title,
      author,
      lastUpdate,
      firstCreate,
      firstTimeStamp,
      lastUpdatTimeStampe,
      imgSrc,
      outsideImgSrc,
      tags,
      content,
      sideLinks,
      outSideFooterText,
      outSideFooterTime
    }).save(opt)
    res.status(200)
    res.send({ message: '成功' })
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send({
      message: '失敗, ' + err.name,
      result: err
    })
  }
})

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
