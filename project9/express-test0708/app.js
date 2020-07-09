var createError = require('http-errors'); //处理404和异常情况  给一个相对有好的提示页面  
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 处理 cookie 相当于自己封装的那个函数
var logger = require('morgan'); // 实现日志记录的功能

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); //  实现日志记录的功能
app.use(express.json()); // 把 post 方式传入的数据处理后存在 req.body 里，相当于getPostData()
app.use(express.urlencoded({ extended: false }));// 把其他传入的数据处理后存在 req.body 里，相当于getPostData()
app.use(cookieParser()); // 处理 cookie 相当于自己封装的那个函数
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态文件

app.use('/', indexRouter);// 注册路由 内有注释
app.use('/users', usersRouter);// 注册路由 内有注释
app.use('/api/blog', blogRouter);// 博客路由
app.use('/api/user', userRouter);// 个人中心路由


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

module.exports = app;