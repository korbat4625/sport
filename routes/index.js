const ArticleModel = require('../model/articleModel');
const LinkModel = require('../model/articleLinkList');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('refreshUU', (req, res) => {
  console.log('要給uuid cookie')
  res.cookie('sportUUD', '_uuid()');
  res.send('Check your cookies. One should be in there now');
});

router.get('/getArticle/:articleId', async (req, res) => {
  try {
    const data = await ArticleModel.findOne({ articleId: req.params.articleId });
    console.log(req.params)
    res.status(200);
    res.send({
      code: 'E0000',
      status: 1,
      message: 'success',
      result: data
    })
  } catch (err) {
    res.status(500);
    const response = {
      code: 'E0000',
      status: 1,
      message: err,
      data: {
        result: {}
      }
    }
    res.send(response);
  }
})

router.get('/getAllArticle', async (req, res) => {
  try {
    const allArticle = await ArticleModel.find({}).sort({ firstTimeStamp: 'desc' });
    res.status(200);
    res.send({
      code: 'E0000',
      status: 1,
      message: 'success',
      result: allArticle
    })
  } catch (err) {
    console.log(err);
    res.status(500);
    const response = {
      code: 'E0000',
      status: 1,
      message: err,
      data: {
        result: {}
      }
    }
    res.send(response);
  }
})


router.get('/getLinkedArticle', async (req, res) => {
  try {
    const result = await LinkModel.findOne({ name: 'linkList' });
    const linkArti = [];
    for (linkObj of result.linkList) {
      const theArticleMatchId = await ArticleModel.findOne({ articleId: linkObj.articleId });
      linkArti.push(theArticleMatchId)
    }
    // console.log(linkArti);
    res.status(200);
    res.send({
      code: 'E0000',
      status: 1,
      message: 'success',
      result: linkArti
    })
  } catch (err) {
    console.log(err);
    res.status(500);
    const response = {
      code: 'E0000',
      status: 1,
      message: err,
      data: {
        result: {}
      }
    }
    res.send(response);
  }
})
module.exports = router;
