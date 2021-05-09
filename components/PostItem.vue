<template>
  <div class="post">
    <div class="post-content">
      <a class="post-header post-header-link clickable">
        <h4 class="title is-4">{{ title }}</h4>
        <h5 class="subtitle is-5">{{ subtitle }}</h5>
      </a>
      <div class="post-footer">
        by Filip Jerga, {{ date | formatDate('LLL') }}
      </div>
    </div>
    <div class="post-right">
      <label class="checkbox">
        <input :checked="isArchived" type="checkbox" @change="togglePost" />Read
      </label>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
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
  &-right {
    float: right;
    justify-content: flex-end;
    align-self: center;
  }
  &-footer {
    font-style: italic;
  }
  &:hover {
    border-bottom: 2px solid #e8e8e8;
  }
}
</style>
