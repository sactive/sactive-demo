const Di = require('sactive-di');
const Logger = require('../framework/logger');
const utils = require('../utils');
const constants = require('../constants/constants');
const middlewares = require('../middlewares');
const App = require('../app');

const getInjector = (() => {
  let instance = null;
  return function() {
    if (!instance) {
      instance = new Di();
    }
    return instance;
  };
})();

function loadBinders() {
  let injector = getInjector();
  injector.bindClass('app', App);
  injector.bindClass('logger', Logger);
  injector.bindInstance('utils', utils);
  injector.bindInstance('constants', constants);
  injector.bindInstance('middlewares', middlewares);

  // bind instance for router
  let application = injector.getInstance('$$app');
  application.app.bindInstance('log', injector.getInstance('$$logger'));
  application.app.bindInstance('utils', utils);
  return injector;
}

module.exports = {
  injector: getInjector(),
  loadBinders
};