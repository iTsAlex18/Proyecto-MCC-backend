export default {
  routes: [
    {
      method: 'GET',
      path: '/likes/resumen-mensual',
      handler: 'like.resumenMensual',
      config: {
        auth: { scope: [] },
      },
    },
    {
      method: 'GET',
      path: '/likes/por-post',
      handler: 'like.likesPorPost',
      config: {
        auth: { scope: [] },
      },
    },
  ],
};
