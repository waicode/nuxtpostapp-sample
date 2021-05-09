<template>
  <div>
    <div @click="isActive = true">
      <slot name="actionButton">
        <button class="button is-primary is-block is-bold">Open</button>
      </slot>
    </div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button
            class="delete"
            @click="isActive = false"
            aria-label="閉じる"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot name="formContent">Nothing...</slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="emitModalSubmit">
            {{ saveButtonText }}
          </button>
          <button class="button is-text" @click="isActive = false">
            {{ cancelButtonText }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Modal title',
    },
    saveButtonText: {
      type: String,
      default: '保存',
    },
    cancelButtonText: {
      type: String,
      default: 'キャンセル',
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    emitModalSubmit() {
      this.$emit('modalSubmitted', {
        closeModal: this.closeModal,
        data: this.data,
      })
    },
    closeModal() {
      this.isActive = false
    },
  },
}
</script>
