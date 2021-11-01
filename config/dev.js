module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      port: 80,
      open: false,
      proxy: [
        {
          context: ['/scrm'],
          target: 'https://www.wakecloud.com',
          changeOrigin:true
        }
      ]
    }
  }
}
