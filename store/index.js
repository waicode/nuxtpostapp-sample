const INITIAL_DATA = {
  posts: [
    {
      _id: '1',
      title: 'aaa',
      subtitle: 'bbb',
      createdAt: new Date(),
      isRead: true,
    },
    {
      _id: '1',
      title: 'ccc',
      subtitle: 'ddd',
      createdAt: new Date(),
      isRead: false,
    },
  ],
}

// function fetchPostsAPI() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(INITIAL_DATA.post)
//     }, 1000)
//   })
// }

export const state = () => {
  return {
    posts: [],
  }
}

export const actions = {
  fetchPosts(context) {
    console.log('fetchPosts')
    context.commit('setPosts', INITIAL_DATA.posts)
    return INITIAL_DATA.posts
  },
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
}
