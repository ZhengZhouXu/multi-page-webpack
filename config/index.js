module.exports = {
  dev: {
    port: 3000,
    startPath: '/page/index.html',
    proxy: 'http://localhost:' + this.port
  }
}
