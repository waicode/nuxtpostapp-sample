<template>
  <Modal
    @modalSubmitted="createPost"
    title="新しく投稿する"
    save-button-text="新規登録"
    cancel-button-text="キャンセル"
  >
    <template #actionButton>
      <a class="button is-primary is-block is-bold create-button">
        <span class="compose">Create</span>
      </a>
    </template>
    <template #formContent>
      <form class="post-form">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="form.title"
              class="input"
              type="text"
              placeholder="Awesome Title"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Subtitle</label>
          <div class="control">
            <input
              v-model="form.subtitle"
              class="input"
              type="email"
              placeholder="Awesome subtitle"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Emoji</label>
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
          <label class="label">Content</label>
          <div class="control">
            <textarea
              v-model="form.content"
              class="textarea"
              placeholder="Awesome Content"
            ></textarea>
          </div>
        </div>
        <div class="markdown">
          <label class="label">Content Preview</label>
          <div v-html="compiledMarkdown"></div>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { Picker, Emoji } from 'emoji-mart-vue'
import Modal from '~/components/shared/Modal'
export default {
  components: {
    Modal,
    Picker,
    Emoji,
  },
  data() {
    return {
      form: {
        title: '',
        subtitle: '',
        content: '',
        emoji: 'grinning',
      },
      selectedEmoji: 'grinning',
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
        return marked(this.form.content, { sanitize: true })
      }
      return ''
    },
  },
  methods: {
    createPost({ closeModal, data }) {
      this.$store.dispatch('post/createPost', { ...this.form })
      closeModal()
      this.resetForm()
    },
    resetForm() {
      this.form.title = ''
      this.form.subtitle = ''
      this.form.content = ''
      this.form.emoji = 'grinning'
    },
    selectEmoji(item) {
      this.selectedEmoji = item.id
      this.form.emoji = item.id
    },
  },
}
</script>
<style lang="scss" scoped>
.create-button {
  display: block;
  width: 100px;
  margin-right: 0;
  margin-left: auto;
}
.emoji-image {
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 15px;
}
</style>
