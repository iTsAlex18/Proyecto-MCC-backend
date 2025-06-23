import { enviarCorreo } from "../../../../utils/sendEmail";

export default {
  async afterCreate(event) {
    const { result } = event;

    const users = await strapi.db.query('plugin::users-permissions.user').findMany({
      select: ['email'],
      where: { confirmed: true },
    });

    for (const user of users) {
      if (user.email) {
        await enviarCorreo(user.email, result.title, result.content, result.id);
      }
    }
  },
};

