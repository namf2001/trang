import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const countryRouter = createTRPCRouter({
  // Lấy tất cả countries
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      
      const countries = await ctx.db.country.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          _count: {
            select: {
              urls: true,
              xtreams: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (countries.length > limit) {
        const nextItem = countries.pop();
        nextCursor = nextItem!.id;
      }

      return {
        countries,
        nextCursor,
      };
    }),

  // Lấy country theo ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.country.findUnique({
        where: { id: input.id },
        include: {
          urls: {
            orderBy: { id: "desc" },
          },
          xtreams: {
            orderBy: { id: "desc" },
          },
        },
      });
    }),

  // Tìm kiếm countries
  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.country.findMany({
        where: {
          name: { contains: input.query, mode: "insensitive" },
        },
        take: input.limit,
        orderBy: { name: "asc" },
      });
    }),

  // Tạo country mới
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.country.create({
        data: input,
      });
    }),

  // Cập nhật country
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).max(100),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.country.update({
        where: { id },
        data,
      });
    }),

  // Xóa country vĩnh viễn
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.country.delete({
        where: { id: input.id },
      });
    }),
});