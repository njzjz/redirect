const express = require('express');
const domain = require('./domain');
const app = express();
app.use('/', function (req, res) {
	res.setHeader('Cache-Control', 's-maxage=3600000, stale-while-revalidate');
	const host = req.get('host');
	const url = req.originalUrl;
	var redirect = domain[host];
	if (!redirect || url=="/robots.txt") redirect = domain['*'];
	if (host == 'conda.deepmodeling.org' || host == 'conda.deepmodeling.com') {
		// redirect to doc if not conda or mamba
		const agent = req.get('User-Agent');
		if (!(agent.includes('conda')) && !(agent.includes('mamba'))) {
			res.setHeader('Cache-Control', 'no-cache');
			res.redirect(302, "https://docs.deepmodeling.com/projects/deepmd/en/latest/install/easy-install.html#install-with-conda");
		}
	}
	res.redirect(301, redirect+url.substring(1));
})
module.exports = app;
