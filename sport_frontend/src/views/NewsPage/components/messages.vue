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
            <b-col cols="2">{{ msgData.__v }}</b-col>
            <b-col cols="10">{{ msgData.postUser }} {{ convertDate(msgData.postTime) }} <span>點滅</span></b-col>
            <b-col cols="12">{{ msgData.message }}</b-col>
            <b-col cols="12">亮了(0)</b-col>
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
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
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
      const result = await axios.get('/getArticleMessage/' + this.newsOrder);
      this.msgBox = result.data
    },
    getMessageLength () {
      return 0;
    },
    async sendMessage () {
      const form = {
        articleId: this.newsId,
        postUser: this.nickName,
        message: this.postMessage
      }
      await axios.post('/postMessage', form)
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
