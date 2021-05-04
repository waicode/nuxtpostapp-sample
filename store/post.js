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
      _id: '2',
      title: 'ccc',
      subtitle: 'ddd',
      createdAt: new Date(),
      isRead: false,
    },
  ],
}

function fetchPostsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts)
    }, 1000)
  })
}

export const state = () => {
  return {
    items: [],
  }
}

export const actions = {
  fetchPosts({ commit }) {
    return fetchPostsAPI().then((posts) => {
      console.log({ posts })
      console.log('fetchPostsAPI')
      commit('setPosts', posts)
    })
  },
}

export const mutations = {
  setPosts(state, posts) {
    console.log('setPosts')
    console.log({ posts })
    state.items = posts
  },
}
