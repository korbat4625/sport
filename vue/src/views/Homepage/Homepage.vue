<template>
  <b-container
    fluid
    class="mt-3"
  >
    <Slide :articles="slideNews"></Slide>
    <News :articles="news"></News>
  </b-container>
</template>

<script>
import Slide from './components/Slide';
import News from './components/News';
export default {
  components: {
    Slide,
    News
  },
  data () {
    return {
      slideNews: [],
      news: [],
      // 投影片和下方小文章的id串聯，之後要用於後台的文章串聯，選擇哪個區塊要串什麼文章，最後存到資料庫
      slideLinks: [],
      newsLinks: []
    }
  },
  created () {
    this.getLinkedArticles().then(response => {
      console.log(response)
      const articles = response.data.result
      for (let i = 0; i < 5; i++) {
        this.slideNews.push(articles[i]);
      }
      for (let i = 5; i < 15; i++) {
        this.news.push(articles[i]);
      }
    })
  },
  methods: {
    getLinkedArticles () {
      return this.$http({
        method: 'get',
        url: '/getAllArticle'
      });
    }
  }
};
</script>

<style lang="scss" scope>
</style>
