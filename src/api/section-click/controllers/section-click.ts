/**
 * section-click controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::section-click.section-click', ({ strapi }) => ({
  async register(ctx) {
    const { section } = ctx.request.body;

    // Buscar si ya existe un registro para esta sección
    const existing = await strapi.entityService.findMany("api::section-click.section-click", {
      filters: { section },
    });

    if (existing.length > 0) {
      const entry = existing[0];
      await strapi.entityService.update("api::section-click.section-click", entry.id, {
        data: { clicks: entry.clicks + 1 },
      });
      ctx.send({ status: 'updated', section: entry.section, clicks: entry.clicks + 1 });
    } else {
      const created = await strapi.entityService.create("api::section-click.section-click", {
        data: { section, clicks: 1 },
      });
      ctx.send({ status: 'created', section: created.section, clicks: 1 });
    }
  },
}));

