<template>
  <form class="post-form">
    <div class="post-filed-area">
      <div class="field">
        <label class="label">件名</label>
        <div class="control">
          <input
            v-model="post.title"
            class="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div class="field">
        <label class="label">サブタイトル</label>
        <div class="control">
          <input
            v-model="post.subtitle"
            class="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div class="field">
        <label class="label">絵文字</label>
        <Emoji :emoji="selectedEmoji" :size="48" class="emoji-image" />
        <Picker
          set="apple"
          title=""
          emoji="grinning"
          :show-preview="false"
          color="#00bfa5"
          :i18n="emojiPickerSettings"
          @select="selectEmoji"
        />
      </div>
      <div class="field">
        <label class="label">内容</label>
        <div class="control">
          <textarea
            v-model="post.content"
            class="textarea"
            placeholder=""
          ></textarea>
        </div>
      </div>
      <div class="markdown">
        <label class="label">プレビュー</label>
        <div v-html="compiledMarkdown" class="preview"></div>
      </div>
    </div>
    <button @click.prevent="updatePost" class="button is-primary update-button">
      更新
    </button>
  </form>
</template>

<script>
import { Picker, Emoji } from 'emoji-mart-vue'

export default {
  components: {
    Picker,
    Emoji,
  },
  props: {
    postData: Object,
  },
  data() {
    return {
      post: { ...this.postData },
      selectedEmoji: this.postData.emoji,
      emojiPickerSettings: {
        search: '検索',
        notfound: '絵文字が見つかりません😢',
        categories: {
          search: '検索結果',
          recent: 'よく使う絵文字',
          people: '顔文字・人',
          nature: '動物・自然',
          foods: '食べ物・飲み物',
          activity: '活動',
          places: '旅行・場所',
          objects: '物',
          symbols: 'シンボル',
          flags: '旗',
          custom: 'その他',
        },
      },
    }
  },
  computed: {
    compiledMarkdown() {
      if (process.client) {
        // eslint-disable-next-line no-undef
        return marked(this.post.content, { sanitize: true })
      }
      return ''
    },
  },
  watch: {
    postData(data, oldValue) {
      this.post = { ...data }
      this.selectedEmoji = data.emoji
    },
  },
  methods: {
    updatePost() {
      this.$store.dispatch('post/updatePost', { ...this.post })
    },
    selectEmoji(item) {
      this.selectedEmoji = item.id
      this.post.emoji = item.id
    },
  },
}
</script>
<style lang="scss" scoped>
.post-filed-area {
  margin-top: 12px;
  margin-bottom: 16px;
}
.field {
  margin-bottom: 24px;
}
.preview {
  border: solid 1px #d9d9d9;
  border-radius: 4px;
  padding: 12px;
  min-height: 132px;
}
.update-button {
  display: block;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
  margin-bottom: 15px;
}
.emoji-image {
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
}
</style>
