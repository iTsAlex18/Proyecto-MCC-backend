/**
 * post controller
 */

import { factories } from '@strapi/strapi';

type MediaItem = {
  url: string;
  formats?: {
    medium?: { url: string };
  };
};

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  media: MediaItem[];
};

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;

    const post = await strapi.entityService.findOne('api::post.post', id);
    if (!post) return ctx.notFound('Post no encontrado');

    await strapi.entityService.create('api::like.like', {
      data: {
        likedAt: new Date(),
        post: id,
      },
    });

    return { message: 'Like registrado correctamente' };
  },

  async postsConLikes(ctx) {
    const rawPosts = await strapi.entityService.findMany('api::post.post', {
      populate: ['media'],
      sort: { createdAt: 'desc' },
    }) as unknown[];

    const postsConLikes = await Promise.all(
      rawPosts.map(async (postRaw: any) => {
        const likeCount = await strapi.db.query('api::like.like').count({
          where: { post: postRaw.id },
        });

        return {
          id: postRaw.id,
          title: postRaw.title,
          content: postRaw.content,
          createdAt: postRaw.createdAt,
          media: postRaw.media ?? [],
          likes: likeCount,
        };
      })
    );

    return postsConLikes;
  },
}));


