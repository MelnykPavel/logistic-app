import type { User } from "@prisma/client";

export type UserReadBody = Omit<User, "passwordHash">;
