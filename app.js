"use strict"

require('dotenv').config()
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let flash = require('express-flash');
let session = require('express-session');
const usersRouter = require('./src/routes/users');
const staticRouter = require('./src/routes/static');

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

app.use(flash());

app.use('/', staticRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
app.listen(3000);