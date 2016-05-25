
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , main = require('./routes/main');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//GET
app.get('/getall',main.getall);
app.get('/getone',main.getone);

//PUT
app.post('/update',main.update);

//POST
app.post('/add',main.add);

//DELETE
app.post('/delete',main.delete);



http.createServer(app).listen(app.get('port'), function(){
  console.log('server started on port number' + app.get('port'));
});
