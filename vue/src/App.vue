<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {};
  },
  beforeCreate () {
    // const url = 'http://localhost:3000/getAllArticle';
    // console.log('發出fetch')
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // fetch(url, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: headers
    // }).then(res => {
    //   console.log(res)
    // });
  }
};
</script>

<style lang="scss">
html,
body {
  background-color: #e3e5e6 !important;
  // overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

img {
  max-width: 100%;
}

.hovered:hover {
  cursor: pointer;
}
.flex-grow {
  display: flex;
}

.flex-container__message {
  flex-grow: 1;
}
</style>
