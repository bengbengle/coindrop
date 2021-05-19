const rewireMobX = require('react-app-rewire-mobx');
const rewireUglifyjs = require('react-app-rewire-uglifyjs');
/* config-overrides.js */
module.exports = function override(config, env) {
  // add a plugin
  // config = injectBabelPlugin(config)
  
  // use the Preact rewire
  if (env === "production") {
    console.log("⚡ Production build with Preact");
    console.log('env...', env)
    // config.devtool = 'cheap'
    console.log('config...', config )
    // config = rewirePreact(config, env);

    config = rewireUglifyjs(config);
  }
  
  // use the MobX rewire
  config = rewireMobX(config, env);
  
  return config;
}