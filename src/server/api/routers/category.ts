import { z } from "zod";
import { CategoryName } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  // Lấy tất cả categories
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      
      const categories = await ctx.db.category.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          _count: {
            select: {
              urls: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (categories.length > limit) {
        const nextItem = categories.pop();
        nextCursor = nextItem!.id;
      }

      return {
        categories,
        nextCursor,
      };
    }),

  // Lấy category theo ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findUnique({
        where: { id: input.id },
        include: {
          urls: {
            orderBy: { id: "desc" },
          },
        },
      });
    }),

  // Lấy category theo name
  getByName: publicProcedure
    .input(z.object({
      name: z.nativeEnum(CategoryName),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findUnique({
        where: {
          name: input.name,
        },
        include: {
          urls: {
            orderBy: { id: "desc" },
          },
        },
      });
    }),

  // Tìm kiếm categories
  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findMany({
        where: {
          name: { in: Object.values(CategoryName).filter(name => 
            name.toLowerCase().includes(input.query.toLowerCase())
          ) },
        },
        take: input.limit,
        orderBy: { name: "asc" },
      });
    }),

  // Tạo category mới
  create: protectedProcedure
    .input(z.object({
      name: z.nativeEnum(CategoryName),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: input,
      });
    }),

  // Cập nhật category
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.nativeEnum(CategoryName),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      
      return ctx.db.category.update({
        where: { id },
        data,
      });
    }),

  // Xóa category vĩnh viễn
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({
        where: { id: input.id },
      });
    }),

  // Lấy enum values
  getEnumValues: publicProcedure
    .query(() => {
      return Object.values(CategoryName);
    }),
});