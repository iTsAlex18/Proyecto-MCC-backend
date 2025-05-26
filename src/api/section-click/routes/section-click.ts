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
    {
      method: 'GET',
      path: '/section-clicks/resumen',
      handler: 'section-click.resumen',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/section-clicks/top5',
      handler: 'section-click.top5',
      config: {
        auth: false,
      },
    },
  ],
};
