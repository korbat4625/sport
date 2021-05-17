<template>
  <b-row>
    <b-col
      cols="10 mb-3"
      offset="1"
      class="slide-head"
    >
      <b-row class="no-gutters">
        <b-col cols="12 mb-3 soccer-title">
          <h2>足球新聞</h2>
        </b-col>
      </b-row>
      <b-carousel
        id="carousel-1"
        :interval="4000"
        fade
        indicators
        background="#ccc"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="article in articles"
          :key="article.articleId"
        >
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(article.articleId)"
            >
              <div class="img-container">
                <img
                  :src="article.outsideImgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ article.outsideTitle }}</h2>
              </div>
            </div>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </b-col>
  </b-row>
</template>

<script>
import router from '../../../router';
export default {
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    };
  },
  methods: {
    onSlideStart () {
      this.sliding = true;
      // console.log(slide);
    },
    onSlideEnd () {
      this.sliding = false;
      // console.log(slide);
    },
    gotoNews (id) {
      router.push('/news/' + id);
    },
  }
};
</script>

<style lang="scss">
.slide-head {
  @include pad-width {
    width: 100%;
    padding: 0;
  }
}
.slide {
  height: 300px;
}
.carousel-inner,
.carousel-item,
.img-container {
  height: 100% !important;
}

ol.carousel-indicators {
  margin-left: 58%;
}

.img-container {
  position: relative;
  width: 40%;
  img {
    width: 100% !important;
    height: 100%;
  }

  &::before {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 86.6px 50px 0;
    border-color: transparent #007bff transparent transparent;
    z-index: 999;
  }
}
.big-title {
  width: 60%;
  padding: 1.5rem;
}
.soccer-title {
  height: 60px;
  background-color: #333;
  color: whitesmoke;
  font-weight: bold;
  // font-size: rem;
  padding: 0.75rem 2rem !important;
}
</style>
