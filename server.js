var express = require('express'),
    app = express(),
    routes = require('./routes'),
    local = require('./routes/local'),
    parse = require('./routes/parse'),
    imgur = require('./routes/imgur'),
    http = require('http'),
    path = require('path');



// all environments
app.set('port', process.env.PORT || 9999);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/', routes.index);

app.get('/list', local.list);
app.get('/clear', local.clear);
app.post('/flag', local.flag);

app.get('/parse', parse.info);
app.get('/parse/push', parse.push);
app.get('/parse/pull', parse.pull);

app.get('/imgur', imgur.info);
app.get('/imgur/pull', imgur.pull);


app.listen(app.get('port'), null, function (err) {
    console.log('imgurScraper, at your service: http://localhost:' + app.get('port'));
});
