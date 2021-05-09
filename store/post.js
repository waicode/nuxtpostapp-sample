import Vue from 'vue'
import INITIAL_DATA from './data/initial_data.json'

export function fetchPostsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts)
    }, 0)
  })
}

export const state = () => {
  return {
    items: [],
  }
}

export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0
  },
}

export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsAPI().then((posts) => {
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
        .$patch(`/api/posts/${postIndex}`, postData)
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
      return this.$axios.$delete(`/api/posts/${postIndex}`).then((res) => {
        commit('deletePost', postIndex)
      })
    }
  },
}

export const mutations = {
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
