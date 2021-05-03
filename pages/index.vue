<template>
  <div>
    <NavBar />
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Newest Posts</h1>
                  <hr />
                </div>
                <PostItem />
                <PostItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.post-content {
  font-style: italic;
}

.post {
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
}

.post:hover {
  border-bottom: 2px solid #e8e8e8;
}
</style>
