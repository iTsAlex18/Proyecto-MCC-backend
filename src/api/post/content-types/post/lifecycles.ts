export default {
  async afterCreate(event) {
    const { result } = event;

    // Buscar todos los usuarios confirmados
    const users = await strapi.db
      .query('plugin::users-permissions.user')
      .findMany({
        select: ['email'],
        where: { confirmed: true },
      });

    const emails = users.map(user => user.email).filter(Boolean);

    for (const email of emails) {
      await strapi.plugin('email').service('email').send({
        to: email,
        subject: '📰 Nuevo artículo en el Blog del Museo',
        text: `Se ha publicado un nuevo artículo titulado "${result.title}".`,
        html: `
          <p><strong>Nuevo artículo publicado:</strong> ${result.title}</p>
          <p>${result.content?.slice(0, 100)}...</p>
          <p><a href="https://tu-frontend.com/blog/${result.id}" target="_blank">Leer artículo completo →</a></p>
        `,
      });
    }
  },
};
