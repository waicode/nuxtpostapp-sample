<template>
  <div>
    <NavBar />
    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <PostCreate />
        </aside>
        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          <div
            v-if="posts && posts.length > 0"
            id="inbox-messages"
            class="inbox-messages"
          >
            <div
              v-for="post in posts"
              :key="post._id"
              class="card"
              :class="{
                'is-active': activePost && post._id === activePost._id,
              }"
              @click="activatePost(post)"
            >
              <div class="card-content">
                <div class="msg-header">
                  <span class="msg-from"><small>From Filip Jerga</small></span>
                  <span class="msg-timestamp"></span>
                  <span class="msg-attachment"
                    ><i class="fa fa-paperclip"></i
                  ></span>
                </div>
                <div class="msg-subject">
                  <span class="msg-subject"
                    ><strong id="fake-subject-1">{{ post.title }}</strong></span
                  >
                </div>
                <div class="msg-snippet">
                  <p id="fake-snippet-1">{{ post.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="inbox-messages no-posts-title">
            There are no posts :(
          </div>
        </div>
        <div id="message-pane" class="column is-6 message hero is-fullheight">
          <div v-if="activePost" class="box message-preview">
            <button class="button is-danger delete-button" @click="deletePost">
              Delete
            </button>
            <PostUpdate :post-data="activePost" />
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Bulma Templates</strong> by
              <a href="https://github.com/dansup">Daniel Supernault</a>. The
              source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <p>
              <a class="icon" href="https://github.com/dansup/bulma-templates">
                <i class="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activePost: null,
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
  created() {
    this.setInitialActivePost()
  },
  methods: {
    setInitialActivePost() {
      if (this.posts && this.posts.length > 0) {
        this.activePost = this.posts[0]
      } else {
        this.activePost = null
      }
    },
    activatePost(post) {
      this.activePost = post
    },
    deletePost() {
      if (this.activePost) {
        this.$store
          .dispatch('post/deletePost', this.activePost._id)
          .then(() => {
            this.setInitialActivePost()
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.manage-page {
  padding: 30px;
}

.card {
  margin-bottom: 10px;
  &.is-active {
    background-color: #f5f5f5;
  }
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
}

.delete-button {
  display: block;
  width: 100px;
  margin-left: auto;
  margin-right: 0;
}
</style>
