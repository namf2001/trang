import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const countryUrlRouter = createTRPCRouter({
  // Lấy tất cả country URLs
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().nullish(),
      countryId: z.string().optional(),
      status: z.string().optional(),
      isExpired: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor, countryId, status, isExpired } = input;
      
      const urls = await ctx.db.countryURL.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(countryId && { countryId }),
          ...(status && { status }),
          ...(isExpired !== undefined && { isExpired }),
        },
        include: {
          country: true,
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

  // Lấy URLs theo country
  getByCountry: publicProcedure
    .input(z.object({
      countryId: z.string(),
      limit: z.number().min(1).max(100).default(50),
      status: z.string().optional(),
      isExpired: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.countryURL.findMany({
        where: {
          countryId: input.countryId,
          ...(input.status && { status: input.status }),
          ...(input.isExpired !== undefined && { isExpired: input.isExpired }),
        },
        include: {
          country: true,
        },
        orderBy: { id: "desc" },
        take: input.limit,
      });
    }),

  // Lấy URL theo ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.countryURL.findUnique({
        where: { id: input.id },
        include: {
          country: true,
        },
      });
    }),

  // Tìm kiếm URLs
  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      limit: z.number().min(1).max(50).default(10),
      countryId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.countryURL.findMany({
        where: {
          ...(input.countryId && { countryId: input.countryId }),
          url: { contains: input.query, mode: "insensitive" },
        },
        include: {
          country: true,
        },
        take: input.limit,
        orderBy: { id: "desc" },
      });
    }),

  // Tạo URL mới
  create: protectedProcedure
    .input(z.object({
      countryId: z.string(),
      url: z.string().url(),
      status: z.string().optional(),
      isExpired: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.countryURL.create({
        data: input,
        include: {
          country: true,
        },
      });
    }),

  // Tạo nhiều URLs cùng lúc
  createMany: protectedProcedure
    .input(z.object({
      urls: z.array(z.object({
        countryId: z.string(),
        url: z.string().url(),
        status: z.string().optional(),
        isExpired: z.boolean().default(false),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.countryURL.createMany({
        data: input.urls,
        skipDuplicates: true,
      });
    }),

  // Cập nhật URL
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      url: z.string().url().optional(),
      status: z.string().optional(),
      isExpired: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.countryURL.update({
        where: { id },
        data,
        include: {
          country: true,
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
      return ctx.db.countryURL.updateMany({
        where: {
          id: { in: input.ids },
        },
        data: {
          status: input.status,
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
      return ctx.db.countryURL.updateMany({
        where: {
          id: { in: input.ids },
        },
        data: {
          isExpired: true,
          status: "EXPIRED",
        },
      });
    }),

  // Xóa URL
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.countryURL.delete({
        where: { id: input.id },
      });
    }),

  // Xóa nhiều URLs
  deleteMany: protectedProcedure
    .input(z.object({
      ids: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.countryURL.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),

  // Lấy thống kê URLs theo status
  getStats: publicProcedure
    .input(z.object({
      countryId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = input.countryId ? { countryId: input.countryId } : {};
      
      const [total, active, expired, byStatus] = await Promise.all([
        ctx.db.countryURL.count({ where }),
        ctx.db.countryURL.count({ 
          where: { ...where, isExpired: false } 
        }),
        ctx.db.countryURL.count({ 
          where: { ...where, isExpired: true } 
        }),
        ctx.db.countryURL.groupBy({
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