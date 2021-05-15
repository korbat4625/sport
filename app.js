var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
// const fs = require('fs')
const listenPort = 3222;
const cors = require('cors')

// const schemas = require('./schemas/postModel');

const indexRouter = require('./routes/index');
const messageRouter = require('./routes/message');
// var usersRouter = require('./routes/users');

const app = express();
const corsConfig = {
  origin: [
    'http://localhost:8080',
    'http://localhost',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.use(cors(corsConfig))
app.use('/', indexRouter, function (err, req, res, next) {
  console.log('indexRouter error...', err)
  next()
});
app.use('/', messageRouter)
// app.use('/users', usersRouter);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose
  .connect(
    'mongodb+srv://admin:sFxwOHpBFQVkTe90@cluster0.dfpa4.mongodb.net/sportDB?serverSelectionTryOnce=true&serverSelectionTimeoutMS=3000&',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('db connected to!');
  })
  .catch((err) => {
    console.log(err);
    console.log('db connected fail.');
  });

// app.get('/', (req, res) => {
//   res.send('apple')
// })

// CORS config here
// app.all('/*', function (req, res, next) {
//   // CORS headers
//   res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   // Set custom headers for CORS
//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//   if (req.method == 'OPTIONS') {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });

// app.listen(listenPort, () => {
//   console.log('listen at ' + listenPort);
// });

module.exports = app;
