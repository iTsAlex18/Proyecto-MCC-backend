/**
 * like router
 */

'use strict';
import customLikesSummary from './custom-likes-summary';


export default {
  routes: [
    {
      method: 'POST',
      path: '/likes',
      handler: 'like.toggleLike',
      config: {
        auth: {
          scope: [], // permite autenticados
        },
      },
    },
    {
  method: 'GET',
  path: '/likes/mis-posts',
  handler: 'like.getLikedPostsByUser',
  config: {
    auth: { scope: [] },
  },
},

// 🔥 Agrega tu ruta personalizada aquí
    ...customLikesSummary.routes,
  ],
};

