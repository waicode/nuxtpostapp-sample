<template>
  <Modal @modalSubmitted="createPost">
    <template #actionButton>
      <a class="button is-danger is-block is-bold">
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
          <label class="label">Content</label>
          <div class="control">
            <textarea
              v-model="form.content"
              class="textarea"
              placeholder="Awesome Content"
            ></textarea>
          </div>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import Modal from '~/components/shared/Modal'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      form: {
        title: '',
        subtitle: '',
        content: '',
      },
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch('post/createPost', this.form)
    },
  },
}
</script>
