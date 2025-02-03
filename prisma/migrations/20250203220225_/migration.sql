/*
  Warnings:

  - Added the required column `ImageUrl` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "ImageUrl" TEXT NOT NULL;
