<template>
  <div>
    <NavBar />
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Newest Posts</h1>
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
  // async asyncData() {
  //   const posts = await fetchPostsAPI()
  //   return { posts }
  // },
  data() {
    return {
      title: 'My Title',
      form: {
        title: 'some title',
        subtitle: 'some subtitle',
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
