/**
 * section-click controller
 */

/**
 * section-click controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::section-click.section-click', ({ strapi }) => ({
  async register(ctx) {
    const { section } = ctx.request.body;

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

  async resumen(ctx) {
    try {
      const data = await strapi.entityService.findMany('api::section-click.section-click', {
        fields: ['section', 'clicks'],
        sort: { clicks: 'desc' },
        limit: 100
      });

      ctx.send(data);
    } catch (err) {
      ctx.throw(500, 'Error obteniendo resumen de clics');
    }
  },

  async top5(ctx) {
    try {
      const data = await strapi.entityService.findMany('api::section-click.section-click', {
        fields: ['section', 'clicks'],
        sort: { clicks: 'desc' },
        limit: 5
      });

      ctx.send(data);
    } catch (err) {
      ctx.throw(500, 'Error obteniendo Top 5');
    }
  }
}));

