const mongoose = require('mongoose');
const articleModelName = 'article'
const ArticleSchema = new mongoose.Schema({
  articleId: {
    type: String,
    default: '',
    required: [true, 'need to give articleId.']
  },
  outsideTitle: {
    type: String,
    default: '',
    required: [true, 'need to give outside Title']
  },
  topLink: {
    type: String,
    default: '',
    required: [true, 'need to input topLink.']
  },
  title: {
    type: String,
    default: '',
    required: [true, 'need to input title.']
  },
  author: {
    type: String,
    default: '',
    required: [true, 'need to input text.']
  },
  lastUpdate: {
    type: String,
    default: '',
    required: [true, 'need to input lastUpdate.']
  },
  firstCreate: {
    type: String,
    default: '',
    required: [true, 'need to input firstCreate.']
  },
  firstTimeStamp: {
    type: Number,
    default: 0,
    required: [true, 'need to input firstTimeStamp.']
  },
  lastUpdatTimeStampe: {
    type: Number,
    default: 0,
    required: [true, 'need to input firstTimeStamp.']
  },
  imgSrc: {
    type: String,
    default: '',
    required: [true, 'need to input imgSrc.']
  },
  outsideImgSrc: {
    type: String,
    default: '',
    required: [true, 'need to input outsideImgSrc.']
  },
  tags: {
    type: Array,
    default: [{
      "text": "",
      "to": ""
    }]
  },
  content: {
    type: String,
    default: '',
    required: [true, 'need to input content.']
  },
  sideLinks: {
    type: Array,
    default: [{
      "text": "",
      "to": ""
    }]
  },
  outSideFooterText: {
    type: String,
    default: '',
    required: [true, 'need to input outSideFooterText.']
  },
  outSideFooterTime: {
    type: String,
    default: '',
    required: [true, 'need to input outSideFooterTime.']
  }
})

const ArticleModel = mongoose.model(articleModelName, ArticleSchema)
module.exports = ArticleModel
