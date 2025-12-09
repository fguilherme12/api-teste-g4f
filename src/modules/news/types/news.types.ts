import { Prisma } from '@prisma/client';

export type News = Prisma.NewsGetPayload<{}>;
export type NewsCreateData = Prisma.NewsCreateInput;
export type NewsUpdateData = Prisma.NewsUpdateInput;

