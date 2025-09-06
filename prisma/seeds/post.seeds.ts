import { PrismaClient } from '@prisma/client';
import { post, post_link, post_image, post_seed_1, post_seed_2, post_seed_3, post_seed_4, post_seed_5, post_seed_6 } from '../../test/__mock__/post';

const prisma = new PrismaClient();

export async function createPost(authorId, courseId, collegeId) {
  const createdPost = [];

  createdPost.push(await prisma.post.create({
    data: post(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_link(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_image(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_1(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_2(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_3(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_4(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_5(authorId, courseId, collegeId)
  }));

  createdPost.push(await prisma.post.create({
    data: post_seed_6(authorId, courseId, collegeId)
  }));

  console.log('====== Posts Criados ======');
  console.log({ post: createdPost });
  return [createdPost.flatMap((post) => post)];
};
