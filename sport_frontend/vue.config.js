module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:8080/'
  }
};
