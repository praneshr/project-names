'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3030;

app.get('/names', function (req, res) {
  var _req$query = req.query,
      count = _req$query.count,
      numbered = _req$query.numbered,
      separator = _req$query.separator;

  var name = _generator2.default.constructNames(count, numbered === 'false' ? false : true).joinNames(separator);
  res.send(name);
});
app.get('/names/raw', function (req, res) {
  var _req$query2 = req.query,
      count = _req$query2.count,
      numbered = _req$query2.numbered,
      separator = _req$query2.separator;

  var name = _generator2.default.constructNames(count, numbered === 'false' ? false : true).rawNames();
  res.json(name);
});

app.get('/names/list', function (req, res) {
  var _req$query3 = req.query,
      limit = _req$query3.limit,
      options = _objectWithoutProperties(_req$query3, ['limit']);

  options.numbered = options.numbered === 'false' ? false : true;
  var name = _generator2.default.nameList(limit, options);
  res.json(name);
});

app.get('/names/list/raw', function (req, res) {
  var _req$query4 = req.query,
      limit = _req$query4.limit,
      options = _objectWithoutProperties(_req$query4, ['limit']);

  options.numbered = options.numbered === 'false' ? false : true;
  var name = _generator2.default.nameListRaw(limit, options);
  res.json(name);
});

app.all('*', function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'Not Found'
  });
});

app.listen(port, function () {
  console.log('App running in ' + port);
});