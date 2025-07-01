import prisma, { Prisma } from "@/lib/prisma";
import { CommentCreateBody } from "@/types/comment";
import CommentWhereInput = Prisma.CommentWhereInput;

export async function dbCreateComment(data: CommentCreateBody) {
  return prisma.comment.create({ data, include: { user: true } });
}

export async function dbGetAllComments(
  where: CommentWhereInput,
  page: number,
  size: number,
) {
  const [data, totalCount] = await Promise.all([
    prisma.comment.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ createdAt: "asc" }],
      include: { user: true },
    }),
    prisma.comment.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}
