<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <div class="section">
            <div class="box">
              <PostCreate />
              <div v-if="posts && posts.length > 0" class="post-cards">
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
                    <div class="columns">
                      <div class="column is-2">
                        <div class="emoji-area">
                          <Emoji :emoji="post.emoji" :size="64" />
                        </div>
                      </div>
                      <div class="column is-10">
                        <div class="msg-subject">
                          <span class="msg-subject">
                            <strong id="fake-subject-1">
                              {{ post.title }}
                            </strong>
                          </span>
                        </div>
                        <div class="msg-snippet">
                          <p id="fake-snippet-1">{{ post.subtitle }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="post-cards no-posts-title"></div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="section">
            <div v-if="activePost" class="box message-preview">
              <button
                class="button is-danger delete-button"
                @click="deletePost"
              >
                削除
              </button>
              <PostUpdate :post-data="activePost" />
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
.column {
  padding: 0.24rem;
}
.section {
  padding: 1.6rem 0.4rem;
}
.post-cards {
  margin-top: 16px;
}
.emoji-area {
  text-align: center;
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
