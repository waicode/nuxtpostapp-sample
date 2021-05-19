<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="../">
          <img
            src="@/assets/image/nuxtjs-typo.svg"
            alt="Nuxt JS Sample Post Application"
          />
        </a>
        <div
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          :class="{ 'is-active': isActive }"
          @click="toggleIsActive"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        id="navMenu"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
        @click="toggleIsActive"
      >
        <div class="navbar-end">
          <div
            class="navbar-item has-dropdown"
            :class="{ 'is-active': isActive }"
          >
            <a class="navbar-link"> メニュー </a>
            <div class="navbar-dropdown">
              <nuxt-link to="/" class="navbar-item"> トップ </nuxt-link>
              <nuxt-link to="/manage" class="navbar-item"> 管理 </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggleIsActive() {
      this.isActive = !this.isActive
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar-item img {
  max-height: 1.24rem;
}
</style>
