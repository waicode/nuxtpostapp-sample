import Vue from 'vue'
// import INITIAL_DATA from './data/initial_data.json'

// export function fetchPostsAPI() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(INITIAL_DATA.posts)
//     }, 0)
//   })
// }

const setLocalStorage = (archivedPosts) => {
  localStorage.setItem('archived_posts', JSON.stringify(archivedPosts, null, 2))
}

export const state = () => {
  return {
    items: [],
    archivedItems: [],
    item: {},
  }
}

export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0
  },
}

export const actions = {
  fetchPostById({ commit }, postId) {
    return this.$axios.$get('/api/posts').then((posts) => {
      const selectedPost = posts.find((p) => p._id === postId)
      commit('setPost', selectedPost)
      return selectedPost
    })
  },
  getArchivedPosts({ commit }) {
    const archivedPosts = localStorage.getItem('archived_posts')
    if (archivedPosts) {
      commit('setArchivedPosts', JSON.parse(archivedPosts))
      return archivedPosts
    } else {
      setLocalStorage([])
      return []
    }
  },
  togglePost({ state, commit, dispatch }, postId) {
    if (state.archivedItems.includes(postId)) {
      const index = state.archivedItems.findIndex((id) => id === postId)
      commit('removeArchivedPost', index)
      dispatch('persistArchivedPosts')
      return postId
    } else {
      commit('addArchivedPost', postId)
      dispatch('persistArchivedPosts')
      return postId
    }
  },
  persistArchivedPosts({ state }) {
    setLocalStorage(state.archivedItems)
  },
  fetchPosts({ commit }) {
    return this.$axios.$get('/api/posts').then((posts) => {
      commit('setPosts', posts)
    })
  },
  createPost({ commit }, postData) {
    postData._id = Math.random().toString(36).substr(2, 7)
    postData.createdAt = new Date().getTime()
    return this.$axios.$post('/api/posts', postData).then((res) => {
      commit('addPost', postData)
    })
  },
  updatePost({ commit, state }, postData) {
    const index = state.items.findIndex((post) => {
      return post._id === postData._id
    })
    if (index !== -1) {
      return this.$axios
        .$patch(`/api/posts/${postData._id}`, postData)
        .then((res) => {
          commit('replacePost', { post: postData, index })
        })
    }
  },
  deletePost({ commit, state }, postId) {
    const index = state.items.findIndex((post) => {
      return post._id === postId
    })
    if (index !== -1) {
      return this.$axios.$delete(`/api/posts/${postId}`).then((res) => {
        commit('deletePost', index)
      })
    }
  },
}

export const mutations = {
  setArchivedPosts(state, archivedPosts) {
    state.archivedItems = archivedPosts
  },
  addArchivedPost(state, postId) {
    state.archivedItems.push(postId)
  },
  removeArchivedPost(state, index) {
    state.archivedItems.splice(index, 1)
  },
  setPosts(state, posts) {
    state.items = posts
  },
  addPost(state, newPost) {
    state.items.push(newPost)
  },
  setPost(state, post) {
    state.item = post
  },
  replacePost(state, { post, index }) {
    Vue.set(state.items, index, post)
  },
  deletePost(state, index) {
    state.items.splice(index, 1)
  },
}
