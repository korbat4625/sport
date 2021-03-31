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
        <b-carousel-slide>
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(100)"
            >
              <div class="img-container">
                <img
                  :src="slide1.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ slide1.title }}</h2>
              </div>
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide>
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(101)"
            >
              <div class="img-container">
                <img
                  :src="slide2.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ slide2.title }}</h2>
              </div>
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide>
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(102)"
            >
              <div class="img-container">
                <img
                  :src="slide3.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ slide3.title }}</h2>
              </div>
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(103)"
            >
              <div class="img-container">
                <img
                  :src="slide4.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ slide4.title }}</h2>
              </div>
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide>
          <template #img>
            <div
              class="d-flex h-100 hovered"
              @click="gotoNews(104)"
            >
              <div class="img-container">
                <img
                  :src="slide5.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="big-title d-flex justify-content-center align-items-center">
                <h2>{{ slide5.title }}</h2>
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
  data () {
    return {
      slide1: {
        imgSrc: 'https://picsum.photos/1024/480/?image=9',
        title:
          '大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1'
      },
      slide2: {
        imgSrc: 'https://picsum.photos/1024/480/?image=69',
        title: '大標題2大標題2大標題2大標題2大標題1大標題1大標題1大標題1'
      },
      slide3: {
        imgSrc: 'https://picsum.photos/1024/480/?image=159',
        title:
          '大標題3大標題3大標題3大標題3大標題3大標題1大標題1大標題1大標題1大標題1'
      },
      slide4: {
        imgSrc: 'https://picsum.photos/1024/480/?image=229',
        title: '大標題4大標題4大標題'
      },
      slide5: {
        imgSrc: 'https://picsum.photos/1024/480/?image=879',
        title:
          '大標題5大標題5大標題5大標題5大標題5大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1大標題1'
      }
    };
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true;
      console.log(slide);
    },
    onSlideEnd (slide) {
      this.sliding = false;
      console.log(slide);
    },
    gotoNews (news) {
      router.push('/news/' + news);
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
