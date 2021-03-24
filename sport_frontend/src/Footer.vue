<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col cols="12">
        <footer class="footer-nav">
          <div class="footer-logo__container">
            <img :src="footerLogo" alt="" />
          </div>
          <div class="footer-info text-center">
            <div>
              <a href="">聯絡我們</a> <span class="ml-3">|</span>
              <a href="" class="ml-3">服務條款</a> <span class="ml-3">|</span>
              <a href="" class="ml-3">私隱政策</a> <span class="ml-3">|</span>
              <a href="" class="ml-3">私隱設定</a> <span class="ml-3">|</span>
              <a href="" class="ml-3">職業生涯</a>
            </div>
            <div class="mx-auto mt-3">
              <p>
                @ 版權所有，事前未得到文字授權，不得擅自轉載、廣播、重寫或發佈。
              </p>
            </div>
          </div>
        </footer>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import footerLogo from './assets/logo.png';
export default {
  data() {
    return {
      footerLogo: footerLogo
    };
  }
};
</script>

<style lang="scss">
.footer-nav {
  @extend %header_footer;
  background-image: url('~@/assets/soccer-footer.jpg');
  a {
    color: white;
    &:hover {
      color: darkgray;
    }
  }
  p {
    color: white;
    font-size: 0.7rem;
    margin: 0;
  }
  span {
    color: white;
    font-size: 0.9rem;
  }
}
.footer-logo__container {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    max-width: 100%;
  }
}
.footer-info {
  padding-top: 16rem;
}
</style>
