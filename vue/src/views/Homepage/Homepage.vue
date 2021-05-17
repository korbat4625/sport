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
      slideLinks: [
        'arti-df581ee1-b447-4834-9833-ade9d41b03ca',
        'arti-76c60447-578e-49f5-a839-58302690c452',
        'arti-d70763dc-93a1-4585-98d3-fa4fb2c178b9',
        'arti-a7b367f4-e4f1-4148-a522-faa7c9e57eac',
        'arti-3ec9b671-5179-4285-8589-3acca01bfbae'
      ],
      newsLinks: [
        'arti-ab24ff22-6413-4768-8d67-fd7406149c5b',
        'arti-b200a022-ccd1-42a6-8b40-43e88a6df07d',
        'arti-ef255177-c90b-4735-99e9-1ed4d2ab6e0b',
        'arti-a11565d0-fe5f-475a-a4f5-a5bc5ed5829d',
        'arti-255dfcea-f2f7-4f04-8d92-529412dae66c',
        'arti-757ef749-aa8e-4a8d-80d9-72fcbcf13409',
        'arti-51231bb3-ad85-43bc-859b-6b493eac2566',
        'arti-3a7ec507-32f4-4998-9c4b-637fd6af0864',
        'arti-e39e2931-f43c-4f20-b6b1-d2be458c5632',
        'arti-de2256e3-96bb-41eb-9a97-8c14a7b4e4d5'
      ]
    }
  },
  created () {
    this.getLinkedArticles().then(response => {
      const articles = response.data.result
      const slides = []
      const news = []
      this.slideLinks.forEach(link => {
        slides.push(articles.find(arti => arti.articleId === link))
      })
      this.newsLinks.forEach(link => {
        news.push(articles.find(arti => arti.articleId === link))
      })
      this.slideNews = slides
      this.news = news
    })
  },
  methods: {
    getLinkedArticles () {
      return this.$http({
        method: 'get',
        url: '/getLinkedArticle'
      });
    }
  }
};
</script>

<style lang="scss" scope>
</style>
