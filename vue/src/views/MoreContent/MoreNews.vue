<template>
  <b-container class="mt-3 page__moreNews">
    <b-row class="no-gutters">
      <b-col cols="12 mb-3 soccer-title">
        <h2>新聞閱覽</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="8"
        v-for="(report, index) in reportss"
        :key="report.timeTitle + index"
        class="news__container"
      >
        <div class="report__timeTitle">
          <h3>{{ report.timeTitle }}</h3>
        </div>
        <b-row>
          <b-col
            cols="6 my-3"
            v-for="(content, inedx) in report.contents"
            :key="content.firstCreate + inedx"
          >
            <div
              class="news news__third"
              @click="gotoNews(content.articleId)"
            >
              <div class="news__head--third d-inline-block">
                <img
                  :src="content.imgSrc"
                  alt="image slot"
                />
              </div>
              <div class="news__body--third d-inline-block">
                <h6>{{ content.title }}</h6>
              </div>
              <div class="news__foot--third">
                <div class="news__foot__content">
                  {{ content.outSideFooterText }}
                  <span>{{ content.outSideFooterTime }}</span>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      reportss: []
    };
  },
  created () {
    this.getLinkedArticles().then(response => {
      const articles = response.data.result;
      let reports = articles.map(arti => {
        return {
          timeTitle: arti.firstCreate.split(' ')[1],
          contents: []
        };
      });

      const articleCage = [reports[0]]
      for (let index = 1; index < reports.length; index++) {
        if (reports[index].timeTitle !== reports[index - 1].timeTitle) articleCage.push(reports[index]);
      }
      // 去重的另一個辦法，比較不直觀但潮
      // var hash = {};
      // reports = reports.reduce(function (item, next) {
      //   hash[next.timeTitle] ? '' : hash[next.timeTitle] = true && item.push(next);
      //   return item;
      // }, []);
      // console.log(articleCage)

      articles.forEach(article => {
        const i = articleCage.findIndex(articleBase => {
          return articleBase.timeTitle === article.firstCreate.split(' ')[1];
        });
        articleCage[i].contents.push(article);
      })
      this.reportss = articleCage;
    })
  },
  mounted () {
    window.scroll({
      top: 0
    });
  },
  methods: {
    getLinkedArticles () {
      return this.$http({
        method: 'get',
        url: '/getAllArticle'
      });
    },
    gotoNews (id) {
      this.$router.push('/news/' + id);
    }
  }
};
</script>

<style lang="scss">
.page__moreNews {
  h6 {
    font-weight: bold;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .news__container {
    margin: 1rem;
  }
  .report__timeTitle {
    text-align: center;
  }
  .news__third {
    height: 120px;
    @include pad-width {
      min-height: 300px;
    }
  }
}
</style>
