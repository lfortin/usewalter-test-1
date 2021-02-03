const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const { schema: typeDefs }  = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const authService = require('./services/auth');

//var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(async (req, res, next) => {
  let authorization = req.get('Authorization') || '';
  let token = authorization.split(' ')[1];
  try {
    //await authService.verifyToken(token);
    next();
  } catch(err) {
    // render the error page
    res.status(403);
    res.render('error');
  }
});
server.applyMiddleware({ app });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front-end-src/build')));

//app.use('/', indexRouter);
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

module.exports = app;
