const {loadBinders, injector} = require('./src/binders');
// Bind all instances
loadBinders();

// mkdir -p dirs
const {mkdirp, envs} = injector.getInstance('$$utils');
mkdirp(envs('SBOT_LOG_DIR'));

// Init applicatin instance
const app = injector.getInstance('$$app');
app.run();

// Uncaught exception handle
process.on('uncaughtException', err => {
  app.logger.error(`Uncaught exception: ${err.message}`);
  app.logger.error(err);
});

// Unhandled rejection
process.on('unhandledRejection', (reason, p) => {
  app.logger.error(`Uncaught rejection: ${reason}`);
  app.logger.debug(p);
});