<template>
  <b-row class="mt-5">
    <b-col cols="12">
      <section class="message-region">
        <div
          class="text-center"
          v-if="!msgBox.length"
        >
          尚無留言
        </div>
        <div
          v-for="msgData in msgBox"
          :key="msgData._id"
        >
          <b-row>
            <b-col cols="12 d-flex p-2">
              <section
                class="mr-4"
                style="width: 50px;"
              >{{ msgData.__v }}</section>
              <section style="width: 70%;">
                <div class="d-flex m-2">
                  <div>{{ msgData.postUser }}</div>
                  <div class="ml-3">{{ convertDate(msgData.postTime) }}</div>
                </div>
                <div class="text-left m-2">{{ msgData.message }}</div>
                <div class="text-left m-2">
                  <a
                    href="javascript:;"
                    @click="light(msgData.postId, 1)"
                  >
                    亮了( {{ msgData.lightUp.quantityPositive }} )
                    <span v-if="msgData.lightUp.cookieUserLight === 'fire'">(這篇點了亮)</span>
                  </a>
                  <a
                    href="javascript:;"
                    class="ml-2"
                    @click="reply(postId)"
                  >回復</a>
                </div>
              </section>
              <section
                class="text-left"
                style="flex-grow: 1;"
              >
                <a
                  href="javascript:;"
                  @click="light(msgData.postId, -1)"
                >
                  點滅({{ msgData.lightUp.quantityNegative }})
                  <span v-if="msgData.lightUp.cookieUserLight === 'ceasefire'">(這篇點了滅)</span>
                </a>
              </section>
            </b-col>
          </b-row>
        </div>
      </section>
    </b-col>

    <b-col cols="12 mt-5">
      <section class="leaveMessage-region">
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
      </section>
    </b-col>
  </b-row>
</template>


<script>
import StringSearch from '../../../vendor/ToolGood.Words.StringSearch'
// import Pinyin from '../../../vendor/ToolGood.Words.Pinyin.js'
import Translate from '../../../vendor/ToolGood.Words.Translate.js'
import sensitiveData from './sensitive.json'
export default {
  props: ['articleId'],
  data () {
    return {
      msgBox: [],
      postMessage: '',
      nickName: '',
      iwords: null,
      pinyin: null,
      translate: null,
      sensitiveWords: ''
    }
  },
  created () {
    this.getMessages();
    this.iwords = new StringSearch();
    // this.pinyin = new Pinyin();
    this.translate = new Translate();
    // console.log(this.pinyin.GetPinyinForName("壹佰贰拾叁億肆仟伍佰陆拾柒萬捌仟玖佰零壹元壹角贰分"));
    for (let index = 0; index < sensitiveData.length; index++) {
      if (index === sensitiveData.length - 1) {
        this.sensitiveWords += sensitiveData[index]
      } else {
        this.sensitiveWords += sensitiveData[index] + '|'
      }
    }
    this.iwords.SetKeywords(this.sensitiveWords.split('|'));
  },
  methods: {
    async getMessages () {
      const result = await this.$http({
        method: 'GET',
        url: '/getArticleMessage/' + this.articleId
      });
      this.msgBox = result.data;
    },
    sendMessage () {
      if (!this.postMessage.length || !this.nickName.length) return ''

      // const postMessage = this.postMessage.replace(/\s/g, '');
      const words_t = this.translate.ToTraditionalChinese(this.postMessage);
      // const words_s = this.translate.ToSimplifiedChinese(this.postMessage);
      let hasSens = false
      const checkSens = (words_t) => {
        let words = words_t
        let theReplaceSingle = this.iwords.FindFirst(words);
        if (theReplaceSingle === null) {
          return words;
        } else {
          hasSens = true
          words = words.split(theReplaceSingle);
          theReplaceSingle = theReplaceSingle.substring(0, theReplaceSingle.length - 1) + '*';
          words = words[0] + theReplaceSingle + words[1];
          return checkSens(words)
        }
      }
      const sendMsg = async (postMessage) => {
        const form = {
          articleId: this.articleId,
          postUser: this.nickName,
          message: postMessage
        };
        await this.$http({
          method: 'POST',
          url: '/postMessage',
          data: form
        });
        await this.getMessages()
      }

      const filteredText = checkSens(words_t)

      if (hasSens) {
        this.$bvModal.msgBoxConfirm('您輸入的留言含有敏感字詞，若要留言請點選確認。', {
          okTitle: '確認',
          cancelTitle: '取消',
        })
          .then(value => {
            if (value) sendMsg(filteredText)
            else return ''
          })
          .catch(err => {
            console.log(err)
            // An error occurred
          })
      } else sendMsg(filteredText)
    },
    async reply () {
    },
    async light (postId, value) {
      const patchData = {
        postId,
        lightUp: value
      }
      await this.$http({
        method: 'PATCH',
        url: '/lightUp',
        data: patchData
      });
      await this.getMessages()
    },
    convertDate (timeStamp) {
      return new Date(Number(timeStamp)).toLocaleString()
    }
  }
}
</script>

<style lang="scss">
.message-region {
  background-color: #f9f9f9;
}
</style>
