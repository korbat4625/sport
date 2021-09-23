<template>
  <b-row class="mt-5">
    <b-col cols="12 mt-5">
      <section class="leaveMessage-region">
        <b-form-textarea
          id="textarea"
          v-model="postMessage"
          placeholder="歡迎建議，提問題，共同學習..."
          rows="3"
          max-rows="6"
          class="font12"
        ></b-form-textarea>
        <!-- <b-row class="mt-3">
          <b-col cols="3 d-flex align-items-center">暱稱:</b-col>
          <b-col cols="9">
            <b-form-input
              v-model="nickName"
              placeholder="Enter your name"
            ></b-form-input>
          </b-col>
        </b-row> -->
      </section>
    </b-col>
    <b-col cols="12 text-left">
      <b-button
        class="my-3 std-btn leave-a-msg"
        variant="info"
        @click="sendMessage"
      >提交評論
      </b-button>
    </b-col>

    <b-col cols="12"><div class="splitter"></div></b-col>

    <b-col cols="12 mt-3">
      <section class="message-region">
        <div
          class="text-center"
          v-if="!msgBox.length"
        >
          尚無留言
        </div>
        <div
          v-for="(msgData) in msgBox"
          :key="msgData._id"
        >
          <b-col cols="12 d-flex p-2">
            <section
              class="mr-4"
            >
              <img class="m-2" src="https://picsum.photos/seed/picsum/200/300" alt="" width="50" height="50">
            </section>
            <section style="width: 70%;">
              <div class="d-flex m-2">
                <div class="post-user">
                  <span class="user">{{ msgData.postUser }}</span>
                  <span class="date">{{ convertDate(msgData.postTime) }}</span>
                </div>
              </div>
              <div
                class="text-left m-2"
                v-html="msgData.message"
              ></div>
              <div class="text-left m-2">
                <a
                  href="javascript:;"
                  class="font12"
                  @click="light(msgData.postId, 1)"
                >
                  亮了( {{ msgData.lightUp.quantityPositive }} )
                  <!-- <span v-if="msgData.lightUp.cookieUserLight === 'fire'">(這篇點了亮)</span> -->
                </a>
              </div>
            </section>
            <section
              class="text-left"
              style="flex-grow: 1;"
            >
              <div class="m-2">
                <a
                  href="javascript:;"
                  class="font12"
                  @click="light(msgData.postId, -1)"
                >
                  點滅({{ msgData.lightUp.quantityNegative }})
                  <!-- <span v-if="msgData.lightUp.cookieUserLight === 'ceasefire'">(這篇點了滅)</span> -->
                </a>
                <a
                  href="javascript:;"
                  class="ml-2 font12"
                  @click="reply(msgData.postId)"
                >
                  [回復]
                </a>
              </div>
            </section>
          </b-col>
        </div>
      </section>
    </b-col>
  </b-row>
</template>

<script>
import dayjs from 'dayjs' // ES 2015

export default {
  props: ['articleId'],
  data () {
    return {
      msgBox: [],
      postMessage: '',
      nickName: '',
      sensitiveWords: ''
    }
  },
  created () {
    this.getMessages();
  },
  methods: {
    async getMessages () {
      const result = await this.$http({
        method: 'GET',
        url: '/getArticleMessage/' + this.articleId
      });
      this.msgBox = result.data;
    },
    async sendMessage () {
      if (!this.postMessage.length || !this.nickName.length) return ''

      const sendMsg = async (postMessage, alwaysSend) => {
        let form = {}
        form = {
          articleId: this.articleId,
          postUser: this.nickName,
          message: postMessage,
          alwaysSend: alwaysSend
        };
        return await this.$http({
          method: 'POST',
          url: '/postMessage',
          data: form
        });
      }

      await sendMsg(this.postMessage, false).then(response => {
        if (response.data.code === 'SENSITIVE WORDS FOUND') {
          this.$bvModal.msgBoxConfirm('您輸入的留言含有敏感字詞，若要留言請點選確認。', {
            okTitle: '確認',
            cancelTitle: '取消',
          })
            .then(async clickYes => {
              if (clickYes) {
                await sendMsg(this.postMessage, true)
                this.getMessages()
              }
              else return ''
            })
            .catch(err => {
              console.log(err)
              // An error occurred
            })
        }
        this.getMessages()
      })
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
      // console.log(timeStamp)
      return dayjs(Number(timeStamp)).format('YYYY-MM-DD HH:mm:ss')
      //  new Date(Number(timeStamp)).toLocaleString()
    }
  }
}
</script>

<style lang="scss">
.message-region {
  background-color: #f9f9f9;
}
</style>
