import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { UrlStatus } from "@prisma/client";
export const categoryUrlRouter = createTRPCRouter({
  // Lấy tất cả category URLs
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().nullish(),
      categoryId: z.string().optional(),
      status: z.nativeEnum(UrlStatus).optional(),
      isExpired: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor, categoryId, status, isExpired } = input;
      
      const urls = await ctx.db.categoryURL.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(categoryId && { categoryId }),
          ...(status && { status: status as UrlStatus }),
          ...(isExpired !== undefined && { isExpired }),
        },
        include: {
          category: true,
        },
        orderBy: { id: "desc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (urls.length > limit) {
        const nextItem = urls.pop();
        nextCursor = nextItem!.id;
      }

      return {
        urls,
        nextCursor,
      };
    }),

  // Lấy URLs theo category
  getByCategory: publicProcedure
    .input(z.object({
      categoryId: z.string(),
      limit: z.number().min(1).max(100).default(50),
      status: z.string().optional(),
      isExpired: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.categoryURL.findMany({
        where: {
          categoryId: input.categoryId,
          ...(input.status && { status: input.status as any }),
          ...(input.isExpired !== undefined && { isExpired: input.isExpired }),
        },
        include: {
          category: true,
        },
        orderBy: { id: "desc" },
        take: input.limit,
      });
    }),

  // Lấy URL theo ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.categoryURL.findUnique({
        where: { id: input.id },
        include: {
          category: true,
        },
      });
    }),

  // Tìm kiếm URLs
  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      limit: z.number().min(1).max(50).default(10),
      categoryId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.categoryURL.findMany({
        where: {
          ...(input.categoryId && { categoryId: input.categoryId }),
          url: { contains: input.query, mode: "insensitive" },
        },
        include: {
          category: true,
        },
        take: input.limit,
        orderBy: { id: "desc" },
      });
    }),

  // Tạo URL mới
  create: protectedProcedure
    .input(z.object({
      categoryId: z.string(),
      url: z.string().url(),
      status: z.nativeEnum(UrlStatus).optional(),
      isExpired: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.create({
        data: input,
        include: {
          category: true,
        },
      });
    }),

  // Tạo nhiều URLs cùng lúc
  createMany: protectedProcedure
    .input(z.object({
      urls: z.array(z.object({
        categoryId: z.string(),
        url: z.string().url(),
        status: z.nativeEnum(UrlStatus).optional(),
        isExpired: z.boolean().default(false),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.createMany({
        data: input.urls,
        skipDuplicates: true,
      });
    }),

  // Cập nhật URL
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      url: z.string().url().optional(),
      status: z.nativeEnum(UrlStatus).optional(),
      isExpired: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.categoryURL.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
    }),

  // Cập nhật status cho nhiều URLs
  updateStatus: protectedProcedure
    .input(z.object({
      ids: z.array(z.string()),
      status: z.string(),
      isExpired: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.updateMany({
        where: {
          id: { in: input.ids },
        },
        data: {
          status: input.status as any,
          ...(input.isExpired !== undefined && { isExpired: input.isExpired }),
        },
      });
    }),

  // Đánh dấu expired
  markAsExpired: protectedProcedure
    .input(z.object({
      ids: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.updateMany({
        where: {
          id: { in: input.ids },
        },
        data: {
          isExpired: true,
          status: UrlStatus.INACTIVE,
        },
      });
    }),

  // Xóa URL
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.delete({
        where: { id: input.id },
      });
    }),

  // Xóa nhiều URLs
  deleteMany: protectedProcedure
    .input(z.object({
      ids: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryURL.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),

  // Lấy thống kê URLs theo status và category
  getStats: publicProcedure
    .input(z.object({
      categoryId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = input.categoryId ? { categoryId: input.categoryId } : {};
      
      const [total, active, expired, byStatus] = await Promise.all([
        ctx.db.categoryURL.count({ where }),
        ctx.db.categoryURL.count({ 
          where: { ...where, isExpired: false } 
        }),
        ctx.db.categoryURL.count({ 
          where: { ...where, isExpired: true } 
        }),
        ctx.db.categoryURL.groupBy({
          by: ['status'],
          where,
          _count: true,
        }),
      ]);

      return {
        total,
        active,
        expired,
        byStatus,
      };
    }),
});