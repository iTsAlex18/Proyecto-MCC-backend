export default {
    routes: [
      {
        method: 'POST',
        path: '/posts/:id/like',
        handler: 'post.like',
        config: {
          policies: [],
        },
      },
    ],
  };
  
  