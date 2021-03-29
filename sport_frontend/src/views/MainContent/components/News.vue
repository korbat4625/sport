<template>
  <b-row>
    <b-col cols="10" offset="1">
      <b-row>
        <b-col lg="4" class="sub-new">
          <div class="news news__second" v-html="news1" @click="gotoNews(1)">
            >
          </div>
        </b-col>
        <b-col lg="4">
          <b-row class="h-100">
            <b-col cols="12 d-flex justify-content-between flex-column">
              <div
                class="news news__third"
                v-html="news2"
                @click="gotoNews(2)"
              ></div>
              <div
                class="news news__third"
                v-html="news3"
                @click="gotoNews(3)"
              ></div>
              <div class="news news__third" v-html="news4" @click="gotoNews(4)">
                >
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4">
          <div
            class="news news__second d-flex justify-content-center align-items-center"
          >
            廣告
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news5" @click="gotoNews(5)">
            >
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news6" @click="gotoNews(6)">
            >
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news7" @click="gotoNews(7)">
            >
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news8" @click="gotoNews(8)">
            >
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news9" @click="gotoNews(9)">
            >
          </div>
        </b-col>
        <b-col lg="4 mt-3">
          <div class="news news__third" v-html="news10" @click="gotoNews(10)">
            >
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="10" offset="1">
      <b-row>
        <b-col cols="12" md="4 text-center my-5" offset-md="4">
          <b-button class="more" :to="{ name: 'MoreNews' }" variant="info">
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
  data() {
    return {
      news1: '',
      news2: '',
      news3: '',
      news4: '',
      news5: '',
      news6: '',
      news7: '',
      news8: '',
      news9: '',
      news10: ''
    };
  },
  created() {
    this.news1 = this.setFirstNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=943',
      title: '新聞標題1新聞標題1新聞標題1',
      footText: '曼聯曼聯曼聯111',
      time: '2020/02/02'
    });
    this.news2 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=46',
      title: '新聞標題222222222新聞標題222222222新聞標題222222222',
      footText: '曼聯曼聯曼聯222',
      time: '2020/02/02'
    });
    this.news3 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=1',
      title: '新聞標題333333333新聞標題333333333新聞標題333333333',
      footText: '曼聯曼聯曼聯333',
      time: '2020/02/02'
    });
    this.news4 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=78',
      title: '新聞標題4新聞標題4新聞標題4',
      footText: '曼聯曼聯曼聯444',
      time: '2020/02/02'
    });
    this.news5 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=65',
      title: '新聞標題5新聞標題5新聞標題5',
      footText: '曼聯曼聯曼聯555',
      time: '2020/02/02'
    });
    this.news6 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=222',
      title: '新聞標題6新聞標題6新聞標題6',
      footText: '曼聯曼聯曼聯666',
      time: '2020/02/02'
    });
    this.news7 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=35',
      title: '新聞標題7新聞標題7新聞標題7',
      footText: '曼聯曼聯曼聯777',
      time: '2020/02/02'
    });
    this.news8 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=67',
      title: '新聞標題4新聞標題8新聞標題8',
      footText: '曼聯曼聯曼聯888',
      time: '2020/02/02'
    });
    this.news9 = this.setNews({
      imgSrc: 'https://picsum.photos/1028/480/?image=73',
      title: '新聞標題4新聞標題9新聞標題9',
      footText: '曼聯曼聯曼聯999',
      time: '2020/02/02'
    });
    this.news10 = this.setNews({
      imgSrc: 'https://picsum.photos/1024/480/?image=30',
      title: '新聞標題4新聞標題10新聞標題10',
      footText: '曼聯曼聯曼聯101010',
      time: '2020/02/02'
    });
  },
  methods: {
    gotoNews(news) {
      router.push('/news/' + news);
    },
    setFirstNews({ imgSrc, title, footText, time }) {
      const html = `
        <div class="news__head d-inline-block"><img
            src="${imgSrc}"
            alt="image slot"
        /></div
        ><div class="news__body d-inline-block">
          <h5>${title}</h5></div
        ><div class="news__foot"
        ><div class="news__foot__content">${footText} <span>${time}</span></div>
        </div>
      `;
      return html;
    },
    setNews({ imgSrc, title, footText, time }) {
      const html = `
        <div class="news__head--third d-inline-block"><img
            src="${imgSrc}"
            alt="image slot"
        /></div
        ><div class="news__body--third d-inline-block">
          <h5>${title}</h5></div
        ><div class="news__foot--third"
        ><div class="news__foot__content">${footText} <span>${time}</span></div>
        </div>
      `;
      return html;
    }
    // setNews(imgSrc, newsTitle, newsFooter) {
    //   const template = `
    //     <div class="news__head--third d-inline-block">
    //       <img
    //         src="${imgSrc}"
    //         alt="image slot"
    //       />
    //     </div>
    //     <div class="news__body--third d-inline-block">
    //       ${newsTitle}
    //     </div>
    //     <div class="news__foot--third">
    //       <div class="news__foot__content">${newsFooter}</div>
    //     </div>
    //   `;
    // },
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
