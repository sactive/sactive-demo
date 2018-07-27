// x-response-time
const XResponseMiddleware = app => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    app.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    ctx.set('X-Response-Time', `${ms}ms`);
  };
};

const CORSMiddleware = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  next();
};

module.exports = {
  XResponseMiddleware,
  CORSMiddleware
};