/* eslint-disable global-require */

/**
 * Front-end middleware
 */

import addDevMiddlewares from './addDevMiddlewares';

const frontEndMiddleware = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};

export default frontEndMiddleware;
