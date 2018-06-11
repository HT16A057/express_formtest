var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 追加
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/login', function (req, res) {
  var username = req.param('username');
  var password = req.param('password');
  if (username == password) {
    res.render('index', { title: 'Express Sample', username: username });
  } else {
    res.render('index', { title: 'Express Sample', error: 'Unknown username or password.' });
  }
});

// body-parser関連
app.use(bodyParser.json()); // nodejsでフォームを簡単に使うためのモジュール
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;

