// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        fs: require.resolve("browserify-fs"),
      };
      return webpackConfig;
    },
  },
};
