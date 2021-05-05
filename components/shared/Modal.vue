<template>
  <div>
    <a @click="isActive = true" class="button is-danger is-block is-bold">
      <span class="compose">Create</span>
    </a>
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
          <slot>Nothing...</slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
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
}
</script>
