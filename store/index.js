export const state = () => {
  return {
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
}
