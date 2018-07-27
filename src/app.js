const fs = require('fs');
const http = require('http');
const https = require('https');
const App = require('sactive-web');

class Application {
  constructor($$logger, $$utils, $$constants, $$middlewares) {
    this.options = {
      port: $$utils.envs('SBOT_SERVICE_PORT') || $$constants.DEFAULT_SERVICE_OPTIONS.PORT,
      baseUrl: $$utils.envs('SBOT_SERVICE_BASEURL') || $$constants.DEFAULT_SERVICE_OPTIONS.BASEURL,
      enableTransform: true
    };
    this.logger = $$logger;
    this.utils = $$utils;
    this.app = new App(this.options);
    this.app.logger = $$logger;
    this.middlewares = $$middlewares;
  }

  setMiddlewares() {
    this.app.use(this.middlewares.XResponseMiddleware(this.app));
  }

  setRouters() {
    this.app.load(`${__dirname}/routers`);
    this.app.init();
  }

  run() {
    let server = null;
    let options = null;
    let port = typeof this.options.port === 'string' ? Number(this.options.port) : this.options.port;
    let keyFile = this.utils.envs('SBOT_SERVICE_PRIVATEKEY');
    let certFile = this.utils.envs('SBOT_SERVICE_CERTFICATE');
    let caFile = this.utils.envs('SBOT_SERVICE_CA_FILE');
    // Init application
    this.setMiddlewares();
    this.setRouters();

    // validate cert file
    if (!fs.existsSync(certFile) || !fs.existsSync(keyFile)) {
      server = http.createServer(this.app.callback());
    } else {
      options = {
        key: fs.readFileSync(keyFile),
        cert: fs.readFileSync(certFile),
        ca: [fs.readFileSync(caFile)]
      };
      server = https.createServer(options, this.app.callback());
    }

    server.listen(port, () => {
      this.logger.info(`Sbot service Controller started on port ${port}`);
    });

    return {
      app: this.app,
      server: server
    };
  }
}

module.exports = Application;
