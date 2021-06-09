const _uuid = require('custom-uuid');
const mongoose = require('mongoose');
const MessageModel = require('../model/postModel');
const articleModel = require('../model/articleModel');
const express = require('express');
const router = express.Router();

const WordsSearch = require('../vender/ToolGood.Words.WordsSearch');
// const Translate = require('../vender/ToolGood.Words.Translate');
// const sensitiveData = require('../vender/sensitive.json')
// import Pinyin from '../../../vendor/ToolGood.Words.Pinyin.js's
const iwords = new WordsSearch();
// this.pinyin = new Pinyin();
// const translate = new Translate();

const sensitiveWordSchema = new mongoose.Schema({
  sensitiveWords: {
    type: String
  }
});
const sensitiveWordsModel = mongoose.model('sensitiveWord', sensitiveWordSchema);
let sensitiveData = null;
// console.log(this.pinyin.GetPinyinForName("壹佰贰拾叁億肆仟伍佰陆拾柒萬捌仟玖佰零壹元壹角贰分"));
async function feedSensitiveData () {
  sensitiveData = await sensitiveWordsModel.find();
  sensitiveData = sensitiveData[0].sensitiveWords
  sensitiveData = sensitiveData.split(', ')

  iwords.SetKeywords(sensitiveData);
}
feedSensitiveData()

const opt = {
  runValidators: true
};

function checkSensitive (req, res, next) {
  let hasSens = false

  // const checkSens = (wordsMessage) => {
  //   let words = wordsMessage
  //   let theReplaceSingle = iwords.FindFirst(words);
  //   if (theReplaceSingle === null) {
  //     return words;
  //   } else {
  //     hasSens = true
  //     words = words.split(theReplaceSingle);
  //     theReplaceSingle = theReplaceSingle.substring(0, theReplaceSingle.length - 1) + '*';
  //     words = words[0] + theReplaceSingle + words[1];
  //     return checkSens(words)
  //   }
  // }

  function rp (t = '') {
    const tLength = t.length
    t = t.substring(0, tLength - 1)
    return t + '*'
  }
  let text = req.body.message
  let textResult = iwords.FindAll(text);
  // 保留換行和空格
  text = text.replace(new RegExp('\n', 'gm'), '<br>');
  text = text.replace(new RegExp('\s', 'gm'), '&nbsp;');
  if (textResult.length > 0) {
    hasSens = true
    textResult = textResult.filter((thisText, index, originArr) => {
      return index === originArr.findIndex((theText) => (
        theText.Keyword === thisText.Keyword
      ))
    })
    const textFilterLength = textResult.length
    for (let i = 0; i < textFilterLength; i++) {
      text = text.replace(new RegExp(textResult[i].Keyword, 'gm'), rp(textResult[i].Keyword));
    }
  } else {
    hasSens = false
  }

  try {
    res.locals.textData = {
      filteredText: text,
      alwaysSend: req.body.alwaysSend
    };
    if (req.body.alwaysSend) {
      return next();
    }
    if (hasSens) {
      return res.status(200).send({
        code: 'SENSITIVE WORDS FOUND',
        message: 'sensitive words was found',
        result: {},
        status: 0
      });
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}


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
router.post('/postMessage', checkSensitive, async (req, res) => {
  const { articleId, postUser } = req.body;
  const newPostMessage = new MessageModel({
    articleId: articleId,
    postId: _uuid(),
    postUser: postUser,
    message: res.locals.textData.filteredText,
    postTime: new Date().getTime()
  });
  try {
    await newPostMessage.save(opt);
    res.status(200);
    res.send({ message: '成功' });
  } catch (err) {
    res.status(500);
    res.send({
      message: '失敗, ' + err.name,
      result: err
    });
  }
})

// 取得文章下留言
router.get('/getArticleMessage/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const foundPost = await MessageModel.find({ articleId });
  res.send(foundPost);
});

// 文章下留言，點亮點滅
router.patch('/lightUp', async (req, res) => {
  const { postId, lightUp } = req.body;
  const theMessageLightUp = await MessageModel.findOne({ postId });
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

module.exports = router;
