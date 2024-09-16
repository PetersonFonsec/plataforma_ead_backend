export const lesson_with_link = (authorId, courseId) => {
  return {
    title: "Tratamento de erros no front com Angular",
    description: "Tratamento de erros no front com Angular",
    urlContent: "3a7c2d29ed2a5efb1465709f14688f83",
    author: {
      connect: { id: Number(authorId) }
    },
    course: {
      connect: { id: Number(courseId) }
    }
  }
}
