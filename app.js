var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config.json');

var Link = require('./models/link');
var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

mongoose.connect(config.mongoConnectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Nice, Mongo Connection was successfull!');
});

/**
 *
 */
app.post('/api/:domain', function (req, res) {
	var domain = req.params.domain;
	var name = req.body.name;
	var new_link = new Link({
		url: 'domain.tld',
		urlId: 'input here'
	});

	new_link.save(function (err) {
		if (err)
			throw err;

		console.log('And yet another new URL was saved.');
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
