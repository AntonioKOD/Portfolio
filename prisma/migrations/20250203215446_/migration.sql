/*
  Warnings:

  - Added the required column `icon` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "featues" TEXT[],
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
