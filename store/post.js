import Vue from 'vue'
// import INITIAL_DATA from './data/initial_data.json'

// export function fetchPostsAPI() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(INITIAL_DATA.posts)
//     }, 0)
//   })
// }

export const state = () => {
  return {
    items: [],
    archivedPosts: [],
  }
}

export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0
  },
}

export const actions = {
  getArchivedPosts({ commit }) {
    const archivedPosts = localStorage.getItem('archived_posts')
    if (archivedPosts) {
      commit('setArchivedItems', JSON.parse(archivedPosts))
      return archivedPosts
    } else {
      localStorage.setItem('archived_posts', JSON.stringify([]))
      return []
    }
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
    const postIndex = state.items.findIndex((post) => {
      return post._id === postData._id
    })
    if (postIndex !== -1) {
      return this.$axios
        .$patch(`/api/posts/${postData._id}`, postData)
        .then((res) => {
          commit('replacePost', { post: postData, index: postIndex })
        })
    }
  },
  deletePost({ commit, state }, postId) {
    const postIndex = state.items.findIndex((post) => {
      return post._id === postId
    })
    if (postIndex !== -1) {
      return this.$axios.$delete(`/api/posts/${postId}`).then((res) => {
        commit('deletePost', postIndex)
      })
    }
  },
}

export const mutations = {
  getArchivedPosts(state, archivedPosts) {
    state.archivedPosts = archivedPosts
  },
  setPosts(state, posts) {
    state.items = posts
  },
  addPost(state, newPost) {
    state.items.push(newPost)
  },
  replacePost(state, { post, index }) {
    Vue.set(state.items, index, post)
  },
  deletePost(state, index) {
    state.items.splice(index, 1)
  },
}
