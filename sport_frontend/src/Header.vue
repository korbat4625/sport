<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col cols="12">
        <header class="header-nav">
          <div class="logo__container">
            <img :src="logo" alt="" />
          </div>
          <b-row>
            <b-col cols="10" offset="1">
              <b-nav>
                <b-nav-item to="/">首頁新聞</b-nav-item>
                <b-nav-item to="/game">測試</b-nav-item>
                <b-nav-item-dropdown text="賽事/盃賽" center>
                  <b-dropdown-item to="#">EN</b-dropdown-item>
                  <b-dropdown-item to="#">ES</b-dropdown-item>
                  <b-dropdown-item to="#">RU</b-dropdown-item>
                  <b-dropdown-item to="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-nav>
            </b-col>
          </b-row>
        </header>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import logo from './assets/logo.png';
export default {
  data() {
    return {
      logo: logo,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-nav {
  @extend %header_footer;
  background-image: url('~@/assets/soccer-field.jpg');
  ul.nav {
    padding-top: 17rem;
  }
}
.logo__container {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 1rem;
  top: 1rem;
  white-space: nowrap;
  overflow: visible;
  img {
    object-fit: cover;
    max-width: 100%;
  }
}
</style>
