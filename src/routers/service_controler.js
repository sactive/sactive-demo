function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports = function() {
  return [
    {
      name: 'sbot-deploy',
      method: 'get',
      path: '/deploy',
      dependencies: ['$$log'],
      handler: function(ctx, next) {
        this.$$log.info('Test deploy');
        return 'Test deploy';
      }
    },
    {
      name: 'sbot-undeploy',
      method: 'get',
      path: '/undeploy',
      dependencies: ['$$log'],
      handler: function(ctx, next) {
        this.$$log.info('Test undeploy');
        return 'Test undeploy';
      }
    },
    {
      name: 'sbot-start',
      method: 'get',
      path: '/start',
      dependencies: ['$$log'],
      handler: function(ctx, next) {
        this.$$log.info('Test start');
        return 'Test start';
      }
    },
    {
      name: 'sbot-stop',
      method: 'get',
      path: '/stop',
      dependencies: ['$$log'],
      handler: function(ctx, next) {
        this.$$log.info('Test stop');
        return 'Test stop';
      }
    },
    {
      name: 'asynctest',
      method: 'get',
      path: '/asynctest',
      dependencies: ['$$log'],
      handler: async function(ctx, next) {
        this.$$log.info('Test async handler');
        await timeout(2000);
        return 'Test async handler';
      }
    }
  ];
};