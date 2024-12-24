/** @format */

// config-overrides.js
module.exports = function override(config, env) {
	// Provide fallbacks for Node.js core modules
	config.resolve.fallback = {
		...config.resolve.fallback,
		zlib: require.resolve('browserify-zlib'),
		querystring: require.resolve('querystring-es3'),
		stream: require.resolve('stream-browserify'),
		path: require.resolve('path-browserify'),
		fs: require.resolve('browserify-fs'), // Add fallback for fs
	};

	return config;
};
