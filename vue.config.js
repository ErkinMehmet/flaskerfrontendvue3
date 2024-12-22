const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',  // Your backend server
        changeOrigin: true,  // Modify the Origin header
        pathRewrite: {
          '^/api': '',  // Remove '/api' prefix if needed on backend
        },
      },
    },
  },
});

