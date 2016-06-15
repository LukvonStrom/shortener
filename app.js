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
 * @api {post} /api/insert Inserts a new URL
 * @apiVersion 0.1.0
 * @apiName InsertURL
 * @apiGroup URL
 *
 * @apiError 403 Returns A forbidden, if the URL is already stored in the Database.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Forbidden
 * {
 * "error": "record exists already"
 * }
 * @apiSuccess (200) {String} success saved successfully
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "success": "saved successfully"
 * }
 * @apiExample Example usage:
 * curl -XPOST -H "Content-Type: application/x-www-form-urlencoded" -d 'url=example.com&name=example' 'domain.tld/api/insert'
 */
app.post('/api/insert', function (req, res) {
	var url = req.body.url;
	var name = req.body.name;
	var newurl = new Link({
		url: url,
		urlId: name
	});

	Link.find({url: url, urlId: name}, function (err, docs) {
		if (docs.length){
			res.status(403).json({error: 'record exists already'});
		}else{
			newurl.save(function (err) {
					if (err) {
						throw err;
					}else{
						res.status(200).json({success: 'saved successfully'});
					}
				}
			)}

		console.log('Another new URL was saved.');
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
