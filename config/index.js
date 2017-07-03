module.exports = {
  prod: {
    env: 'production',
    common: ['jquery']
  },
  dev: {
    port: 3000,
    startPath: '/page/index.html',
    proxyTable: {
      '/test': 'http://localhost:9090/'
    }
  }
}
