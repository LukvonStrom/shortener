var express = require('express');
var router = express.Router();
var Link = require('../models/link');

/**
 * @api {get} / Gets the version of the API
 * @apiVersion 0.1.0
 * @apiName GetVersion
 * @apiGroup Version
 *
 * @apiDescription Gets the current Version of the API.
 *
 * @apiExapmle Example usage:
 * curl -i http://domain.tld/api/
 *
 * @apiSuccess {String}  version  The APIs Version
 */
router.get('/', function(req, res) {
  res.status(200).json({ version: '0.1.0'});
});

/**
 * @api {get} / Gets an url by short id
 * @apiVersion 0.1.0
 * @apiName GetId
 * @apiGroup ID
 *
 * @apiDescription Gets the long url by the id.
 *
 * @apiExample Example usage:
 * curl -i http://domain.tld/api/id/[put an id here]
 *
 * @apiSuccess {String} id The long id
 */
router.get('/id/:id', function(req, res) {
  Link.findOne({urlId: req.params.id}), function(err, link) {
    if(err) {res.status(500).json({ error: 'error'})}
    if(!link){res.status(404).json({ error: 'not found'})}

    link.save(function(){
      res.status(200).json({ domain: link.domain});
    })
  };
});

/*
var postnew = function() {
  var new = new Link({
    url: 'domain.tld',
    urlId: 'input here'
  });

  new.save(function(err) {
    if(err) throw err;

    console.log('And yet another new URL was saved.');
  })
}
*/
module.exports = router;
