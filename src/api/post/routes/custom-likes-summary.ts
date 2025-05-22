export default {
  routes: [
    {
      method: 'GET',
      path: '/posts-con-likes',
      handler: 'post.postsConLikes',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};

