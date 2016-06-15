var express = require('express');
var router = express.Router();
var Link = require('../models/link');

/**
 * @api {get} / Gets the version of the API
 * @apiVersion 0.1.0
 * @apiName GetVersion
 * @apiGroup Version
 *
 * @apiDescription Endpoint to view the current API Version.
 *
 * @apiExample Example usage:
 * curl -i http://domain.tld/api/
 *
 * @apiSuccess {String}  version  Returns the APIs Version
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * {
 * "version": "0.1.0"
 * }
 */
router.get('/', function (req, res) {
	res.status(200).json({
		version: '0.1.0'
	});
});

/**
 * @api {get} / Gets an url by short id
 * @apiVersion 0.1.0
 * @apiName GetId
 * @apiGroup URL
 *
 * @apiDescription Endpoints for manipulating the Short URLs.
 *
 * @apiError 500 Returns Eroor, if an error occurs at the query
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "error": "internal error"
 * }
 * @apiError 404 Returns Not Found when long url can't be found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": "not found"
 * }
 * @apiSuccess (200) {String} domain example.tld
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "domain": "domain.tld"
 * }
 *
 * @apiExample Example usage:
 * curl -i http://domain.tld/api/id/[put an id here]
 *
 */
router.get('/id/:id', function (req, res) {
	Link.findOne({urlId: req.params.id}), function (err, link) {
		if (err) {
			res.status(500).json({error: 'internal error'});
		}

		if (!link) {
			res.status(404).json({error: 'not found'});
		}

		res.status(200).json({
			domain: link.domain
		});
	};
});
module.exports = router;
