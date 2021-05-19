<template>
  <div>
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="emoji-area">
                  <Emoji :emoji="post.emoji" :size="64" :sheet-size="64" />
                </div>
                <div class="post-content">
                  <h1 class="title">{{ post.title }}</h1>
                  <h2 class="subtitle">{{ post.subtitle }}</h2>
                  <div class="markdown">
                    <div v-html="compiledMarkdown"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Emoji } from 'emoji-mart-vue'
export default {
  components: {
    Emoji,
  },
  fetch({ params, store }) {
    return store.dispatch('post/fetchPostById', params.id)
  },
  computed: {
    post() {
      return this.$store.state.post.item
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
  },
}
</script>
<style lang="scss" scoped>
.emoji-area {
  text-align: center;
  margin: 4px 0 24px;
}
.title {
  margin-bottom: 32px;
}
</style>
