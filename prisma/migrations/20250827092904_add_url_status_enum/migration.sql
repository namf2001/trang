/*
  Warnings:

  - The `status` column on the `CategoryURL` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `CountryURL` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `XtreamURL` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."UrlStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."CategoryURL" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UrlStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."CountryURL" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UrlStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."XtreamURL" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UrlStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "CategoryURL_status_idx" ON "public"."CategoryURL"("status");

-- CreateIndex
CREATE INDEX "CountryURL_status_idx" ON "public"."CountryURL"("status");

-- CreateIndex
CREATE INDEX "XtreamURL_status_idx" ON "public"."XtreamURL"("status");
