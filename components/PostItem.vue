<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-2">
          <div class="emoji-area">
            <Emoji :emoji="emoji" :size="64" :sheet-size="64" />
          </div>
        </div>
        <div class="column is-9">
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
                created at {{ date | formatDate('LLL') }}
              </div>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <label class="checkbox">
            <input
              :checked="isArchived"
              type="checkbox"
              @change="togglePost"
            />Read
          </label>
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
.post {
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
  display: flex;
  flex-direction: row;

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
}
</style>
