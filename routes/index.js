var express = require('express');
var router = express.Router();
var Link = require('../models/link.js');

/* GET Homepage */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/:id', function(req, res) {
  var urlId = req.params.id;
  console.log('Routing worked, Id: ' + urlId);

  Link.findOne({ urlId: urlId }, function(err, doc) {
    /* Fix by Navo: Missing return Statements */
    if (err) {
      res.status(500).json({error: 'error'});
      return;
    }

    if (!doc) {
      res.status(404).json({error: 'not found'});
      return;
    }

    console.log(doc);
    res.redirect(doc.url);
  });

});

module.exports = router;
