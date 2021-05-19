<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-2">
          <div class="emoji-area">
            <Emoji :emoji="emoji" :size="64" :sheet-size="64" />
          </div>
        </div>
        <div class="column is-8">
          <div class="post">
            <div class="post-content">
              <nuxt-link
                :to="`/posts/${id}`"
                class="post-header post-header-link clickable"
              >
                <h4 class="title is-4">{{ title }}</h4>
                <h5 class="subtitle is-5">{{ subtitle }}</h5>
              </nuxt-link>
              <div class="post-footer">
                投稿日時： {{ date | formatDate('YYYY-MM-DD HH:mm') }}
              </div>
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="read-checkbox-area">
            <label class="checkbox">
              <input
                :checked="isArchived"
                type="checkbox"
                @change="togglePost"
              />既読
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Emoji } from 'emoji-mart-vue'
import moment from 'moment'
export default {
  components: {
    Emoji,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    date: {
      type: Number,
      required: false,
      default: new Date(),
    },
    emoji: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      moment,
    }
  },
  computed: {
    archivedPosts() {
      return this.$store.state.post.archivedItems
    },
    isArchived() {
      return this.archivedPosts.includes(this.id)
    },
  },
  methods: {
    togglePost() {
      this.$store.dispatch('post/togglePost', this.id)
    },
  },
}
</script>
<style scoped lang="scss">
.card {
  margin: 15px 0;
}
.post {
  padding: 5px;
  border-bottom: 2px solid transparent;
  display: flex;
  flex-direction: row;

  .title {
    margin-bottom: 28px;
  }
  .subtitle {
    margin-bottom: 12px;
  }

  &-content {
    flex: 1;
  }
  &-footer {
    font-style: italic;
  }
  &:hover {
    border-bottom: 2px solid #e8e8e8;
  }
}

.emoji-area {
  text-align: center;
  margin-top: 20px;
}
.read-checkbox-area {
  text-align: right;
  .checkbox input,
  .radio input {
    cursor: pointer;
    margin-right: 4px;
  }
}
</style>
