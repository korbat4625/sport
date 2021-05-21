<template>
  <b-row>
    <b-col
      cols="10"
      offset="1"
    >
      <b-row>
        <b-col
          lg="4 mt-3"
          class="sub-new"
        >
          <div
            class="news news__second hovered"
            @click="gotoNews(newsData1.articleId)"
          >
            <div class="news__head d-inline-block"><img
                :src="newsData1.outsideImgSrc"
                alt="image slot"
              /></div>
            <div class="news__body d-inline-block">
              <h5>{{ newsData1.title }}</h5>
            </div>
            <div class="news__foot">
              <div class="news__foot__content">{{ newsData1.outSideFooterText }} <span>{{ newsData1.outSideFooterTime }}</span></div>
            </div>
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <b-row class="h-100">
            <b-col cols="12 d-flex justify-content-between flex-column">
              <div
                class="news news__third mt-lg-0 mt-3 hovered"
                v-for="theNews in newsData3"
                :key="theNews.articleId"
                @click="gotoNews(theNews.articleId)"
              >
                <div class="news__head--third d-inline-block"><img
                    :src="theNews.outsideImgSrc"
                    alt="image slot"
                  /></div>
                <div class="news__body--third d-inline-block">
                  <h5>{{ theNews.title }}</h5>
                </div>
                <div class="news__foot--third">
                  <div class="news__foot__content">{{theNews.outSideFooterText}} <span>{{ theNews.outSideFooterTime }}</span></div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__second d-flex justify-content-center align-items-center">
            廣告
          </div>
        </b-col>

        <b-col
          lg="4 mt-3"
          v-for="theNews in newsData6"
          :key="theNews.articleId"
        >
          <div
            class="news news__third hovered"
            @click="gotoNews(theNews.articleId)"
          >
            <div class="news__head--third d-inline-block"><img
                :src="theNews.outsideImgSrc"
                alt="image slot"
              /></div>
            <div class="news__body--third d-inline-block">
              <h5>{{ theNews.title }}</h5>
            </div>
            <div class="news__foot--third">
              <div class="news__foot__content">{{theNews.outSideFooterText}} <span>{{ theNews.outSideFooterTime }}</span></div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="10"
      offset="1"
    >
      <b-row>
        <b-col
          cols="12"
          md="4 text-center my-5"
          offset-md="4"
        >
          <b-button
            class="more"
            :to="{ name: 'MoreNews' }"
            variant="info"
          >
            更多
          </b-button>
        </b-col>
      </b-row>
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
  watch: {
    articles (newVal) {
      this.newsData1 = newVal[0];
      for (let i = 1; i < 4; i++) {
        this.newsData3.push(newVal[i])
      }
      for (let i = 4; i < newVal.length; i++) {
        this.newsData6.push(newVal[i])
      }
    }
  },
  data () {
    return {
      newsData1: [],
      newsData3: [],
      newsData6: []
    };
  },
  created () {
  },
  methods: {
    gotoNews (news) {
      router.push('/news/' + news);
    }
  }
};
</script>

<style lang="scss">
%foot-style {
  display: flex;
  align-items: center;
}

.news {
  position: relative;
  background-color: #fff;
  transition-duration: 0.2s;
  &:hover {
    transform: scale(1.02);
  }
}
.news__second {
  height: 100%;
  @include pad-width {
    min-height: 300px;
  }
}
.news__third {
  height: 170px;
  @include pad-width {
    min-height: 300px;
  }
}

.news__head {
  width: 100%;
  height: 40%;
  img {
    object-fit: cover;
    max-width: 100%;
    height: 100%;
  }
}
.sub-new {
  height: 600px;
  @include pad-width {
    min-height: 300px;
  }
}
.news__body {
  height: 50%;
  text-align: center;
  padding: 1rem;
  h4 {
    overflow: hidden;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
  }
}
.news__foot {
  border-top: solid 1px #ddd;
  height: 10%;
  padding: 0.3rem;
  @extend %foot-style;
}
.news__head--third {
  vertical-align: top;
  width: 40%;
  height: 60%;
  img {
    object-fit: cover;
    max-width: 100%;
    height: 100%;
  }
}
.news__body--third {
  vertical-align: top;
  width: 60%;
  height: 60%;
  text-align: center;
  padding: 1rem;
  h4 {
    overflow: hidden;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
  }
}
.news__foot--third {
  border-top: solid 1px #ddd;
  height: 40%;
  padding: 0.3rem;
  @extend %foot-style;
}
.more.btn-info {
  width: 100%;
  height: 50px;
  background-color: #00a9ce;
  border-width: 0;
  padding-top: 0.8rem;

  &:hover {
    background-color: #008aaf;
  }
}
</style>
