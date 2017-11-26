var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var pages = require('./routes/pages');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function(req, res, next) {
    if (req.method=='GET'){
        if(req.url=='/'||req.url=='/index'){
            index(req,res);
        }else if(req.url==('/updatePassword')){
            users.updatePassword(req,res);
        }else if(req.url==('/login')){
            users.loginUsers(req,res);
        }else if(req.url==('/userlist')){
            users.getnewList(req,res);
        }else if(req.url==('/getUserList')){
            users.getUserList(req,res);
        }else if(req.url==('/getSellList')){
            users.getSellList(req,res);
        }else if(req.url==('/register')){
            users.registerUsers(req,res);
        }else if(req.url==('/getUserInfo')){
            users.getUserInfo(req,res);
        }else if(req.url==('/getGiftInfo')){
            users.getGiftInfo(req,res);
        }else if(req.url==('/getPointDetail')){
            users.getPointDetail(req,res);
        }else if(req.url==('/getCreditDetail')){
            users.getCreditDetail(req,res);
        }else if(req.url==('/getAccountDetail')){
            users.getAccountDetail(req,res);
        }else if(req.url.match(new RegExp('/info*'))){
            pages.message(req,res);
        }
        else if(req.url==('/info')){
            pages.message(req,res);
        }
        else if(req.url.match(new RegExp('/userpage*'))){
            pages.userpage(req,res);
        }
        else if(req.url==('/userinfopage')){
            pages.userinfopage(req,res);
        }
        else if(req.url==('/usersettingpage')){
            pages.usersettingpage(req,res);
        }
        else if(req.url==('/useraccountpage')){
            pages.useraccountpage(req,res);
        }
        else if(req.url==('/userpointspage')){
            pages.userpointspage(req,res);
        }
        else if(req.url==('/usercreditpage')){
            pages.usercreditpage(req,res);
        }
        else if(req.url.match(new RegExp('/sellerpage*'))){
            pages.sellerpage(req,res);
        }
        else if(req.url==('/selleraccountpage')){
            pages.selleraccountpage(req,res);
        }
        else if(req.url==('/sellertransferpage')){
            pages.sellertransferpage(req,res);
        }
        else {
            res.send('Undefined Request!');
        }
    }
    if (req.method=='POST'){
        if(req.url==('/register')){
            users.registerUsers(req,res);
        }else if(req.url==('/insertList')){
            users.insertList(req,res);
        }else if(req.url==('/updateListUser')){
            users.updateListUser(req,res);
        }else if(req.url==('/updateListState')){
            users.updateListState(req,res);
        }else if(req.url==('/updateListFinishTime')){
            users.updateListFinishTime(req,res);
        }else if(req.url==('/updatePassword')){
            users.updatePassword(req,res);
        }else if(req.url==('/login')){
            users.loginUsers(req,res);
        }else if(req.url==('/userlist')){
            users.getnewList(req,res);
        }else if(req.url==('/getUserList')){
            users.getUserList(req,res);
        }else if(req.url==('/getSellList')){
            users.getSellList(req,res);
        }else if(req.url==('/getListBySellerid')){
            users.getListBySellerid(req,res);
        }else if(req.url==('/insertAccountDetail')){
            users.insertAccountDetail(req,res);
        }else if(req.url==('/insertCreditDetail')){
            users.insertCreditDetail(req,res);
        }else if(req.url==('/insertPointDetail')){
            users.insertPointDetail(req,res);
        } else if(req.url==('/updateUserInfo')){
            users.updateUserInfo(req,res);
        }else if(req.url==('/getUserInfo')){
            users.getUserInfo(req,res);
        }else if(req.url==('/getGiftInfo')){
            users.getGiftInfo(req,res);
        }else if(req.url==('/getPointDetail')){
            users.getPointDetail(req,res);
        }else if(req.url==('/getCreditDetail')){
            users.getCreditDetail(req,res);
        }else if(req.url==('/getAccountDetail')){
            users.getAccountDetail(req,res);
        }
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
