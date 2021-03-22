<template>
  <b-row>
    <b-col cols="10 mb-3" offset="1" class="slide-head">
      <b-row class="no-gutters">
        <b-col cols="12 mb-3 soccer-title">
          <h2>足球新聞</h2>
        </b-col>
      </b-row>
      <b-carousel
        id="carousel-1"
        v-model="slide"
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
            <div class="img-container">
              <img
                src="https://picsum.photos/1024/480/?image=52"
                alt="image slot"
              />
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide>
          <template #img>
            <div class="img-container">
              <img
                src="https://picsum.photos/1024/480/?image=54"
                alt="image slot"
              />
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide>
          <template #img>
            <div class="img-container">
              <img
                src="https://picsum.photos/1024/480/?image=58"
                alt="image slot"
              />
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <div class="img-container">
              <img
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </div>
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide>
          <template #img>
            <div class="img-container">
              <img
                src="https://picsum.photos/1024/480/?image=51"
                alt="image slot"
              />
            </div>
          </template>
        </b-carousel-slide>
      </b-carousel>

      <!-- <p class="">
        Slide #: {{ slide }}<br />
        Sliding: {{ sliding }}
      </p> -->
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      app: 0
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
      console.log(slide);
    },
    onSlideEnd(slide) {
      this.sliding = false;
      console.log(slide);
    }
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
  display: flex;
  justify-content: flex-end;
}

.img-container {
  position: relative;

  img {
    width: 40% !important;
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
.soccer-title {
  height: 60px;
  background-color: #333;
  color: whitesmoke;
  font-weight: bold;
  // font-size: rem;
  padding: 0.75rem 2rem !important;
}
</style>
