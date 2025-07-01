import prisma from "@/lib/prisma";
import type { Comment } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type CommentCreateBody = Prisma.Args<
  typeof prisma.comment,
  "create"
>["data"];

export type CommentReadBody = Comment;

export const commentSelect = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    user: {
      select: {
        id: false,
        lastName: true,
        firstName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    },
  },
});

export type CommentReadBodySelect = Prisma.CommentGetPayload<
  typeof commentSelect
>;
