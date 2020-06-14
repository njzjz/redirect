var express = require('express');
var domain = require('./domain');
var app = express();
app.use('/', function (req, res) {
	var host = req.get('host');
	var url = req.originalUrl;
	var redirect = domain[host];
	if (!redirect || url=="/robots.txt") redirect = domain['*'];
	res.redirect(301, redirect+url);
})
module.exports = app;
