<template>
  <form class="post-form">
    <div class="post-filed-area">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="post.title"
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
            v-model="post.subtitle"
            class="input"
            type="text"
            placeholder="Awesome subtitle"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea
            v-model="post.content"
            class="textarea"
            placeholder="Awesome Content"
          ></textarea>
        </div>
      </div>
      <div class="markdown">
        <label class="label">Content Preview</label>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
    <button @click.prevent="updatePost" class="button is-primary update-button">
      Update
    </button>
  </form>
</template>

<script>
export default {
  props: {
    postData: Object,
  },
  data() {
    return {
      post: { ...this.postData },
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
    },
  },
  methods: {
    updatePost() {
      this.$store.dispatch('post/updatePost', { ...this.post })
    },
  },
}
</script>
<style lang="scss" scoped>
.post-filed-area {
  margin-top: 12px;
  margin-bottom: 16px;
}
.update-button {
  display: block;
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 15px;
}
</style>
