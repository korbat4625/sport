const _uuid = require('custom-uuid');
const PostMsgSchema = require('../model/postModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('要給uuid cookie')
  res.cookie('name', '_uuid()');
  res.send('Check your cookies. One should be in there now');
});

module.exports = router;
