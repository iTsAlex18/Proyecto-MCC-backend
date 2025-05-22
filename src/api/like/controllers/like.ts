/**
 * like controller
 */

'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::like.like', ({ strapi }) => ({
  async toggleLike(ctx) {
    const user = ctx.state.user;
    const { postId } = ctx.request.body;

    if (!user) return ctx.unauthorized('Debes iniciar sesión.');
    if (!postId) return ctx.badRequest('Falta el ID del post.');

    const existing = await strapi.db.query('api::like.like').findOne({
      where: {
        user: user.id,
        post: postId,
      },
    });

    if (existing) {
      await strapi.entityService.delete('api::like.like', existing.id);
      return { message: 'Like eliminado' };
    }

    const nuevoLike = await strapi.entityService.create('api::like.like', {
      data: {
        user: user.id,
        post: postId,
        likedAt: new Date(),
      },
    });

    return nuevoLike;
  },

  async getLikedPostsByUser(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('No autenticado.');

    const likes = await strapi.db.query('api::like.like').findMany({
      where: { user: user.id },
      populate: ['post'],
    });

    const likedPostIds = likes.map((like) => like.post.id);
    return { likedPostIds };
  },

  // ✅ resumenMensual para GraficasLikes
  async resumenMensual(ctx) {
    const knex = strapi.db.connection;

    const results = await knex('likes')
      .select(
        knex.raw(`DATE_FORMAT(liked_at, '%Y-%m') as mes`),
        knex.raw('COUNT(*) as cantidad')
      )
      .groupBy('mes')
      .orderBy('mes');

    type LikeResumenRow = { mes: string; cantidad: number };

    // Mapeo seguro
    const formattedResults: LikeResumenRow[] = results.map((r: any) => ({
      mes: r.mes,
      cantidad: Number(r.cantidad),
    }));

    const months = formattedResults.map((row) => {
      const [year, month] = row.mes.split("-");
      const date = new Date(`${year}-${month}-01`);
      return date.toLocaleString("es-ES", { month: "long" });
    });

    const counts = formattedResults.map((row) => row.cantidad);

    return { months, counts };
  },

  // ✅ likesPorPost para LikesPorPostChart
  async likesPorPost(ctx) {
  const knex = strapi.db.connection;
  const client = strapi.db.connection.client.config.client;

  const dateExpr = client === "mysql"
    ? "DATE_FORMAT(liked_at, '%Y-%m')"
    : "strftime('%Y-%m', liked_at)";

  const results = await knex("likes")
    .select("post_id", knex.raw(`${dateExpr} as mes`), knex.raw("COUNT(*) as cantidad"))
    .groupBy("post_id", "mes")
    .orderBy("post_id");

  const agrupado = {};

  for (const row of results) {
    const pid = row.post_id.toString();
    if (!agrupado[pid]) agrupado[pid] = [];

    const [year, month] = row.mes.split("-");
    const mesNombre = new Date(`${year}-${month}-01`).toLocaleString("es-ES", {
      month: "long",
    });

    agrupado[pid].push({ mes: mesNombre, cantidad: Number(row.cantidad) });
  }

  return { data: agrupado };
}
}));

