var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var compression = require('compression');	// it may not be required if reveres proxy handles compression.
const { master } = require('./config/winston');
// const { web } = require('./config/winston')

const port = 3000;

// add middlewares
app.use(cookieParser('secret'));
app.use(session({
	resave : false,
	saveUninitialized : false,
	secret : 'secret',
	cookie : {
		httpOnly : true,
		secure : false
	},
}));
app.use(express.json());
app.use(compression());
app.use(morgan('combined', { 
	stream : {
		write: function(message, encoding){
			master.d(message);
		}
	}
}));

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
	master.i("Express server has started on port : "+port);
	master.i("")
});
 

