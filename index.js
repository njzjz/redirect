var express = require('express');
var domain = require('./domain');
var app = express();
app.use('/', function (req, res) {
	res.setHeader('Cache-Control', 's-max-age=3600000, stale-while-revalidate');
	var host = req.get('host');
	var url = req.originalUrl;
	var redirect = domain[host];
	if (!redirect || url=="/robots.txt") redirect = domain['*'];
	res.redirect(301, redirect+url.substring(1));
})
module.exports = app;
