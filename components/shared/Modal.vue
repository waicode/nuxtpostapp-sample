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
          <p class="modal-card-title">Modal title</p>
          <button
            class="delete"
            @click="isActive = false"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot name="formContent">Nothing...</slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="emitModalSubmit">
            Save changes
          </button>
          <button class="button" @click="isActive = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    emitModalSubmit() {
      this.$emit('modalSubmitted')
    },
  },
}
</script>
