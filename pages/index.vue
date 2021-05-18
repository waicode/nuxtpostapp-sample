<template>
  <div>
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <div class="section">
                <div class="title">
                  <h1>新規投稿</h1>
                  <hr />
                </div>
                <div v-if="posts && posts.length > 0">
                  <PostItem
                    v-for="post in posts"
                    :key="post._id"
                    :id="post._id"
                    :title="post.title"
                    :subtitle="post.subtitle"
                    :date="post.createdAt"
                    :emoji="post.emoji"
                  />
                </div>
                <div v-else>No Posts :(</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      form: {
        title: '',
        subtitle: '',
      },
    }
  },
  async fetch({ store }) {
    if (store.getters['post/hasEmptyItems']) {
      return await store.dispatch('post/fetchPosts')
    }
  },
  computed: {
    posts() {
      return this.$store.state.post.items
    },
  },
  mounted() {
    this.$store.dispatch('post/getArchivedPosts')
  },
  methods: {
    isFormValid() {
      if (this.form.title) {
        return true
      }
      return false
    },
  },
}
</script>
