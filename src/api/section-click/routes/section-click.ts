/**
 * section-click router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/section-clicks/register',
      handler: 'section-click.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
