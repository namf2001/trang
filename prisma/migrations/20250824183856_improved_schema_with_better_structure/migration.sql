-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."CategoryName" AS ENUM ('AUTO', 'ANIMATION', 'BUSINESS', 'CLASSIC', 'COMEDY', 'COOKING', 'CULTURE', 'DOCUMENTARY', 'EDUCATION', 'ENTERTAINMENT', 'FAMILY', 'GENERAL', 'KIDS', 'LEGISLATIVE', 'LIFESTYLE', 'MOVIES', 'MUSIC', 'NEWS', 'SPORTS', 'SINGLE_STREAM');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CountryURL" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CountryURL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" "public"."CategoryName" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoryURL" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CategoryURL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."XtreamURL" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "status" TEXT,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "XtreamURL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "public"."Country"("name");

-- CreateIndex
CREATE INDEX "CountryURL_url_idx" ON "public"."CountryURL"("url");

-- CreateIndex
CREATE INDEX "CountryURL_status_idx" ON "public"."CountryURL"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CountryURL_countryId_url_key" ON "public"."CountryURL"("countryId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE INDEX "CategoryURL_url_idx" ON "public"."CategoryURL"("url");

-- CreateIndex
CREATE INDEX "CategoryURL_status_idx" ON "public"."CategoryURL"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryURL_categoryId_url_key" ON "public"."CategoryURL"("categoryId", "url");

-- CreateIndex
CREATE INDEX "XtreamURL_url_idx" ON "public"."XtreamURL"("url");

-- CreateIndex
CREATE INDEX "XtreamURL_status_idx" ON "public"."XtreamURL"("status");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CountryURL" ADD CONSTRAINT "CountryURL_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryURL" ADD CONSTRAINT "CategoryURL_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."XtreamURL" ADD CONSTRAINT "XtreamURL_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
