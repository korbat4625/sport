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
        v-for="report in reports"
        :key="report.timeTitle"
        class="news__container"
      >
        <div class="report__timeTitle">
          <h3>{{ report.timeTitle }}</h3>
        </div>
        <b-row>
          <b-col
            cols="6 my-3"
            v-for="content in report.contents"
            :key="content.title"
          >
            <div class="news news__third">
              <div class="news__head--third d-inline-block">
                <img :src="content.imgSrc" alt="image slot" />
              </div>
              <div class="news__body--third d-inline-block">
                <h6>{{ content.title }}</h6>
              </div>
              <div class="news__foot--third">
                <div class="news__foot__content">
                  {{ content.footerText }}
                  <span>{{ content.time }}</span>
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
  components: {},
  data() {
    return {
      reports: [
        {
          timeTitle: this.timeSetting(2020, 3, 14),
          contents: [
            {
              title: '標題一標題一',
              imgSrc: 'https://picsum.photos/1024/480/?image=129',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            },
            {
              title: '標題424標題424標題一',
              imgSrc: 'https://picsum.photos/1024/480/?image=789',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            },
            {
              title: '6652666526',
              imgSrc: 'https://picsum.photos/1024/480/?image=664',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            }
          ]
        },
        {
          timeTitle: this.timeSetting(2020, 3, 12),
          contents: [
            {
              title: '標421題一',
              imgSrc: 'https://picsum.photos/1024/480/?image=799',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            },
            {
              title: '標題4251325424標題一',
              imgSrc: 'https://picsum.photos/1024/480/?image=55',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            },
            {
              title: '66512666526',
              imgSrc: 'https://picsum.photos/1024/480/?image=664',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            },
            {
              title: '66gsfdgs6526',
              imgSrc: 'https://picsum.photos/1024/480/?image=343',
              footerText: '底部文字底部文字',
              time: '2020/02/02'
            }
          ]
        },
        {
          timeTitle: this.timeSetting(2020, 3, 10),
          contents: [
            {
              title: '飛飛飛飛飛高高',
              imgSrc: 'https://picsum.photos/1024/480/?image=144',
              footerText: '飛飛飛飛飛高高',
              time: '2020/02/02'
            }
          ]
        },
        {
          timeTitle: this.timeSetting(2020, 3, 9),
          contents: [
            {
              title: '新聞足球新聞足球',
              imgSrc: 'https://picsum.photos/1024/480/?image=1024',
              footerText: '新聞足球新聞足球',
              time: '2020/02/02'
            },
            {
              title: 'sss',
              imgSrc: 'https://picsum.photos/1024/480/?image=1025',
              footerText: 'sss',
              time: '2020/02/02'
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    timeSetting(year, month, date) {
      console.log(arguments);
      return year + ' 年 ' + month + ' 月 ' + date + ' 日 ';
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
