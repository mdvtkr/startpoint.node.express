var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
const port = 3000;

// view engine settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); // ejs engine accepts html files

//router
app.use('/', indexRouter);

// static resources
app.use(express.static(__dirname + '/public'));

// run server
var server = app.listen(port, function () {
    console.log("Express server has started on port : "+port);
});
 
