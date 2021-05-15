const mongoose = require('mongoose');
const articleModelName = 'article'

const ArticleSchema = new mongoose.Schema({
  articleId: {
    type: String,
    default: 'slide',
    required: [true, 'need to give slideId.']
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
  }
})

const articleModel = new mongoose.model(articleModelName, ArticleSchema)
module.exports = articleModel
