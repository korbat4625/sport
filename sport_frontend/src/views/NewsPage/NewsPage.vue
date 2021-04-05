<template>
  <b-container class="my-5">
    <b-row>
      <b-col
        cols="12"
        md="8"
      >
        <section class="single_news d-inline-block">
          <section class="single_news__sub-header">
            <a href="javascript:;">{{ getNewsContent(newsOrder).topLink }}</a>
            <hr />
          </section>
          <section class="single_news__header">
            <h1>{{ getNewsContent(newsOrder).title }}</h1>
            <br />
            <p class="text-left">{{ getNewsContent(newsOrder).text }}</p>
            <p class="text-left">上次更新於 {{ getNewsContent(newsOrder).lastUpdate }}</p>
            <hr />
            <section class="text-left my-2 d-flex align-items-center">
              <span>{{ getNewsContent(newsOrder).firstCreate }}</span>
              <span class="ml-3">|</span>
              <b-icon-facebook class="ml-3"></b-icon-facebook>
              <b-icon-twitter class="ml-3"></b-icon-twitter>
              <span class="ml-3">XX</span>
              <b-button
                class="ml-3"
                id="sidebar-toggler"
                v-b-toggle.sidebar-right
              >
                <span>意見</span>
                <span>(0)</span>
              </b-button>
            </section>
            <section>
              <img
                :src="'https://picsum.photos/1024/480/?image=' + (Number(newsOrder) + 165)"
                alt=""
              />
            </section>
          </section>
          <section class="single_news__tags d-flex">
            <div
              v-for="(tag, index) in getNewsContent(newsOrder).tags"
              class="tag"
              :key="'tag' + index"
            >
              <a :href="tag">
                <span style="color: white;">{{ tag.text }}</span>
              </a>
            </div>
          </section>
          <section class="single_news__article">
            <article>
              <p class="text-left">{{ getNewsContent(newsOrder).content }}</p>
            </article>
          </section>
        </section>
      </b-col>
      <b-col
        cols="12"
        md="4"
      >
        <section class="relative_news">
          <h2>
            <span>相關</span>
          </h2>
          <a
            v-for="(link, index) in getNewsContent(newsOrder).sideLinks"
            href="javascript:;"
            :key="'link' + index"
          >
            <a :href="link.to"><span>{{ link.text }}</span></a>
          </a>
        </section>
        <section
          class="mt-4 d-flex justify-content-center align-items-center"
          style="height: 650px; background-color: #fff;"
        >
          廣告
        </section>
      </b-col>
    </b-row>
    <b-sidebar
      id="sidebar-right"
      :title="sidebarTitle"
      right
      shadow
    >
      <div class="px-3 py-2 h-100">
        <div class="h-100 d-flex flex-column justify-content-end">
          <b-form-textarea
            id="textarea"
            v-model="postMessage"
            placeholder="寫些啥吧..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-row class="mt-3">
            <b-col cols="3 d-flex align-items-center">暱稱:</b-col>
            <b-col cols="9">
              <b-form-input
                v-model="nickName"
                placeholder="Enter your name"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-button
            class="mt-3"
            variant="info"
            @click="sendMessage"
          >留下評論</b-button>
        </div>
      </div>
    </b-sidebar>
  </b-container>
</template>

<script>
import newsData from './components/newsData.json'
import axios from 'axios'
export default {
  props: ['newsOrder'],
  data () {
    return {
      newsData: newsData,
      sidebarTitle: '',
      postMessage: '',
      nickName: ''
    }
  },
  created () {
    // console.log(this.newsData)
  },
  methods: {
    getMessageLength () {
      return 0;
    },
    sendMessage () {
      const form = {
        articleId: this.getNewsContent(this.newsOrder).id,
        postUser: this.nickName,
        message: this.postMessage
      }
      axios.post('/postMessage', form)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getNewsContent (newsOrder) {
      // console.log(newsOrder)
      switch (Number(newsOrder)) {
        case 1: return this.newsData.news1
        case 2: return this.newsData.news2
        case 3: return this.newsData.news3
        case 4: return this.newsData.news4
        case 5: return this.newsData.news5
        case 6: return this.newsData.news6
        case 7: return this.newsData.news7
        case 8: return this.newsData.news8
        case 9: return this.newsData.news9
        case 10: return this.newsData.news10
        case 100: return this.newsData.slide1
        case 101: return this.newsData.slide2
        case 102: return this.newsData.slide3
        case 103: return this.newsData.slide4
        case 104: return this.newsData.slide5
        default: break
      }
    }
  }
};
</script>

<style lang="scss">
.news-page {
  // width: 90%;
  margin: 0 auto;
}
.single_news {
  background-color: white;
  .single_news__sub-header {
    padding: 1rem 1rem;
    a {
      color: black;
      font-size: 1.4rem;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .single_news__header {
    padding: 1rem 1rem;
    p {
      margin-bottom: 0.3rem;
    }
    h1 {
      font-weight: bold;
    }
  }
  .single_news__tags,
  .single_news__article {
    padding: 1rem 1rem;
    article {
      font-size: 1.4rem;
      line-height: 1.5;
    }
  }
}

.tag {
  padding: 0 1rem;
  height: 30px;
  background-color: #00000c;
  color: white;
  margin-right: 1rem;
  line-height: 1.9;
  &:last-child {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.relative_news {
  // vertical-align: top;
  width: 100%;
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 3px;
      top: 50%;
      background-color: #a2aaad;
      margin-top: -1px;
      left: 0;
      right: 0;
    }
  }
  h2 span {
    background-color: #e3e5e6;
    display: inline-block;
    position: relative;
    padding: 0 20px;
    max-width: 95%;
    overflow: hidden;
  }
  a {
    display: block;
    color: #081f2c;
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    text-decoration: none;
  }

  a + a {
    border-top: 1px solid #ecf1f0;
  }
}

#sidebar-toggler {
  display: flex;
  background-color: transparent;
  color: black;
  height: 22px;
  line-height: 22px;
  padding: 0 10px;
  border-radius: 0;
}
</style>
