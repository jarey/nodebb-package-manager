"use strict";

var plugins = {},
	Packages = require('../packages');

plugins.get = function(req, res) {
	Packages.getPlugins(req.query.version, function(err, data) {
		res.json(data);
	});
};

plugins.suggest = function(req, res) {
	Packages.suggest(req.query.package, req.query.version, function(err, version) {
		return res.status(err ? 400 : 200).json(version);
	});
};

plugins.update = function(req, res) {
	Packages.registry.update(req.params.package, function(err) {
		if (err) {
			return res.status(500).json({
				error: err.message
			});
		} else { return res.sendStatus(200); }
	});
}

module.exports = plugins;