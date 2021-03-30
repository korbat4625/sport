<template>
  <div class="my-5 news-page__container">
    <section class="single_news d-inline-block">
      <section class="single_news__sub-header">
        <a href="javascript:;">英格蘭</a>
        <hr />
      </section>
      <section class="single_news__header">
        <h1>修夫基：軒達臣可能錯過歐國盃</h1>
        <br />
        <p>Goal</p>
        <p>上次更新於...</p>
        <hr />
        <section>
          14:45 2021/03/27 | <b-icon-facebook></b-icon-facebook>
          <b-icon-twitter></b-icon-twitter> XX
        </section>
        <section>
          <img
            :src="
              'https://picsum.photos/1024/480/?image=' + (Number(newsID) + 165)
            "
            alt=""
          />
        </section>
      </section>
      <section class="single_news__tags d-flex">
        <div class="tag">英格蘭</div>
        <div class="tag">LIVERPOOL</div>
        <div class="tag">英格蘭超級聯賽</div>
        <div class="tag">歐洲足球錦標賽</div>
        <div class="tag">佐敦宣達陳</div>
      </section>
      <section class="single_news__article">
        <article>
          英格蘭領隊修夫基擔心中場佐敦軒達臣可能會因腹股溝傷患錯過6月開踢的歐國盃。
          NXGN 2021: 足球神童最佳50人
          利物浦隊長軒達臣上月接受手術，並會休戰至少5星期，但也可能需要更長時間。修夫基說：「只能說軒達臣本身對於手術還有專家給他的預斷十分樂觀。我們也注意到這種性質的傷患，是有所指引和釐清的時間。我們知道將大概是季尾，需要做的就是再看看吧。當然我們知道軒達臣可能會缺少高水平賽事的上陣時間，有很多事情要考慮，不過此刻來說，那是數星期後的決定。」(Goal.com)
        </article>
      </section>
    </section>
    <section class="relative_news d-inline-block">
      <div>相關</div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['newsID']
};
</script>

<style lang="scss">
.news-page {
  // width: 90%;
  margin: 0 auto;
}
.single_news {
  background-color: white;
  width: 650px;
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
  background-color: #00000c;
  color: white;
  margin-right: 1rem;
  &:last-child {
    margin: 0;
  }
}

.relative_news {
  vertical-align: top;
  width: 150px;
}

.news-page__container {
  width: 800px;
  margin: 0 auto;
}
</style>
