import { PrismaClient } from '@prisma/client';
import { post } from '../../test/__mock__/post';

const prisma = new PrismaClient();

export async function createPost(authorId, courseId, collegeId) {
  const createdPost = await prisma.post.create({
    data: post(authorId, courseId, collegeId)
  });

  console.log('====== Posts Criados ======');
  console.log({ post: createdPost });
  return [createdPost];
};
