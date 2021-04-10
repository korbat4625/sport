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
                  >亮了( {{ msgData.lightUp.quantity }} ) <span v-if="msgData.lightUp.cookieUserLight === 'fire'">(這篇點了亮)</span></a>

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
                >點滅<span v-if="msgData.lightUp.cookieUserLight === 'ceasefire'">(這篇點了滅)</span></a>
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

export default {
  props: ['newsOrder', 'newsId'],
  data () {
    return {
      msgBox: [],
      postMessage: '',
      nickName: ''
    }
  },
  created () {
    this.getMessages()
  },
  methods: {
    async getMessages () {
      // const result = await axios.get('/getArticleMessage/' + this.newsOrder);
      const result = await this.$http({
        method: 'GET',
        url: '/getArticleMessage/' + this.newsId
      });
      this.msgBox = result.data;
    },
    async sendMessage () {
      const form = {
        articleId: this.newsId,
        postUser: this.nickName,
        message: this.postMessage
      };
      await this.$http({
        method: 'POST',
        url: '/postMessage',
        data: form
      });
      await this.getMessages()
    },
    async reply (postId, value) {
      const patchData = {
        articleId: postId,
        lightUp: value
      }
      console.log(patchData)
      // axios.patch('/lightUp', patchData)
      await this.getMessages()
    },
    async light (postId, value) {
      const patchData = {
        articleId: postId,
        lightUp: value
      }
      await this.$http({
        method: 'PATCH',
        url: '/lightUp',
        data: patchData
      });
      await this.getMessages()
    },
    getMessageLength () {
      // const result = await axios.get('/getMessageLightLength/' + this.newsOrder);
      return 0;
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
