/*
  Warnings:

  - You are about to drop the column `featues` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "featues",
ADD COLUMN     "features" TEXT[];
