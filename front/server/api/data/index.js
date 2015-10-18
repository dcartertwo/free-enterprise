'use strict';

var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res) {
  return request('http://localhost:5000/free/api/v1.0/tasks', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });
});

module.exports = router;
