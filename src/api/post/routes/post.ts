import customLike from './custom-like';
import customLikesSummary from './custom-likes-summary';

export default {
  routes: [
    // Rutas automáticas generadas por Strapi
    {
      method: 'GET',
      path: '/posts',
      handler: 'post.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/posts/:id',
      handler: 'post.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/posts',
      handler: 'post.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/posts/:id',
      handler: 'post.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/posts/:id',
      handler: 'post.delete',
      config: {
        policies: [],
      },
    },

    // 🔥 Agrega tu ruta personalizada aquí
    ...customLike.routes,
    ...customLikesSummary.routes,
  ],
};
